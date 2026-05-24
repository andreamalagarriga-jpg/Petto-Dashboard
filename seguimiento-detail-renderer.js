document.addEventListener('DOMContentLoaded', () => {
  const toast = document.getElementById('successToast');
  const toastMessage = document.getElementById('toastMessage');
  let toastTimeout;
  function showToast(msg) {
    toastMessage.textContent = msg;
    toast.classList.add('active');
    if (toastTimeout) clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => toast.classList.remove('active'), 2400);
  }

  // Show alert state via URL ?alert=1
  if (new URLSearchParams(location.search).get('alert') === '1') {
    document.getElementById('alertPill').hidden = false;
  }

  function openModal(id) { document.getElementById(id)?.classList.add('active'); }
  function closeModal(el) { el?.classList.remove('active'); }

  document.querySelectorAll('[data-close-modal]').forEach(btn => {
    btn.addEventListener('click', () => closeModal(btn.closest('.modal-overlay')));
  });
  document.querySelectorAll('.modal-overlay').forEach(o => {
    o.addEventListener('click', e => { if (e.target === o) closeModal(o); });
  });

  document.getElementById('requestVisitBtn')?.addEventListener('click', () => openModal('confirmVisitModal'));
  document.getElementById('confirmSendVisit')?.addEventListener('click', () => {
    closeModal(document.getElementById('confirmVisitModal'));
    setTimeout(() => openModal('visitSentModal'), 250);
  });

  document.getElementById('openHistoryBtn')?.addEventListener('click', () => openModal('historyModal'));

  document.getElementById('chatBtn')?.addEventListener('click', () => openModal('chatModal'));

  document.getElementById('chatForm')?.addEventListener('submit', e => {
    e.preventDefault();
    const input = document.getElementById('chatInput');
    const text = input.value.trim();
    if (!text) return;
    const body = document.getElementById('chatMessages');
    const msg = document.createElement('div');
    msg.className = 'chat-msg out';
    const time = new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
    msg.innerHTML = '<p></p><span class="chat-msg-time"></span>';
    msg.querySelector('p').textContent = text;
    msg.querySelector('.chat-msg-time').textContent = time;
    body.appendChild(msg);
    input.value = '';
    body.scrollTop = body.scrollHeight;
  });

  document.getElementById('markReviewedBtn')?.addEventListener('click', e => {
    const c = e.currentTarget.querySelector('.check-box');
    if (c) {
      c.style.background = 'var(--primary-blue)';
      c.style.borderColor = 'var(--primary-blue)';
    }
    showToast('Marcado como revisado');
  });

  // History filter
  document.querySelectorAll('.history-modal-tabs .tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.history-modal-tabs .tab-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const f = btn.dataset.filter;
      document.querySelectorAll('.history-row').forEach(row => {
        const show = f === 'all' || row.dataset.status === f;
        row.style.display = show ? '' : 'none';
      });
    });
  });

  document.querySelectorAll('.link-action').forEach(b => b.addEventListener('click', () => showToast('Detalle del seguimiento')));

  document.querySelector('.logout-btn')?.addEventListener('click', e => { e.preventDefault(); showToast('Cierre de sesión simulado'); });
});
