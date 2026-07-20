import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

Deno.serve(async (req) => {
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  }

  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { messages, widgetOwnerId, queryEmbedding } = await req.json()

    let context = ''
    let targetUserId: string | null = null

    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
    )

    if (widgetOwnerId) {
      targetUserId = widgetOwnerId
    } else {
      const authHeader = req.headers.get('Authorization')

      const supabaseClient = createClient(
        Deno.env.get('SUPABASE_URL') ?? '',
        Deno.env.get('SUPABASE_ANON_KEY') ?? '',
        { global: { headers: { Authorization: authHeader ?? '' } } },
      )

      const { data: { user } } = await supabaseClient.auth.getUser()
      targetUserId = user?.id ?? null
    }

    if (targetUserId && queryEmbedding) {
      const { data: chunks } = await supabaseAdmin.rpc('match_document_chunks', {
        query_embedding: queryEmbedding,
        match_user_id: targetUserId,
        match_count: 5,
      })

      if (chunks && chunks.length > 0) {
        context = chunks
          .map((chunk: { content: string }) => chunk.content)
          .join('\n\n---\n\n')
      }
    }

    const systemMessage = context
      ? {
          role: 'system',
          content: `Tu es un agent de support client. Reponds aux questions en te basant sur les extraits de documents suivants fournis par l'entreprise. Si la reponse ne se trouve pas dans ces extraits, dis-le clairement plutot que d'inventer une reponse.\n\n${context}`,
        }
      : {
          role: 'system',
          content: 'Tu es un agent de support client utile et professionnel.',
        }

    const groqApiKey = Deno.env.get('GROQ_API_KEY')

    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${groqApiKey}`,
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        messages: [systemMessage, ...messages],
      }),
    })

    const data = await response.json()

    return new Response(JSON.stringify(data), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  } catch (error) {
    return new Response(JSON.stringify({ error: String(error) }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }
})