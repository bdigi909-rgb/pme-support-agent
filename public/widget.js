(function () {
  const script = document.currentScript;
  const ownerId = script.getAttribute('data-owner');
  const baseUrl = 'https://pme-support-agent.vercel.app';

  if (!ownerId) {
    console.error('SupportAgent widget: attribut data-owner manquant.');
    return;
  }

  const bubble = document.createElement('button');
  bubble.innerText = 'Chat';
  bubble.setAttribute('aria-label', 'Ouvrir le support client');
  bubble.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    width: 56px;
    height: 56px;
    border-radius: 50%;
    background: #4f46e5;
    color: white;
    border: none;
    font-size: 13px;
    font-weight: 600;
    cursor: pointer;
    box-shadow: 0 4px 12px rgba(0,0,0,0.2);
    z-index: 999999;
  `;

  const iframe = document.createElement('iframe');
  iframe.src = `${baseUrl}/widget?owner=${encodeURIComponent(ownerId)}`;
  iframe.style.cssText = `
    position: fixed;
    bottom: 90px;
    right: 20px;
    width: 360px;
    height: 500px;
    max-height: 70vh;
    border: none;
    border-radius: 16px;
    box-shadow: 0 8px 30px rgba(0,0,0,0.25);
    z-index: 999999;
    display: none;
  `;

  let isOpen = false;

  bubble.addEventListener('click', function () {
    isOpen = !isOpen;
    iframe.style.display = isOpen ? 'block' : 'none';
    bubble.innerText = isOpen ? 'X' : 'Chat';
  });

  document.body.appendChild(iframe);
  document.body.appendChild(bubble);
})();