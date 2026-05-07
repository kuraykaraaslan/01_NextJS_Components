export function printTicketById(ticketId: string) {
  const STYLE_ID = '__ticket-print-style__';
  document.getElementById(STYLE_ID)?.remove();

  const style = document.createElement('style');
  style.id = STYLE_ID;
  style.textContent = `
    @media print {
      body > * { display: none !important; }
      #ticket-print-${CSS.escape(ticketId)} { display: block !important; position: fixed; inset: 0; padding: 24px; }
    }
  `;
  document.head.appendChild(style);
  window.print();
  window.addEventListener('afterprint', () => style.remove(), { once: true });
}
