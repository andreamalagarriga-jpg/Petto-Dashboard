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

  document.getElementById('chatBtn')?.addEventListener('click', () => {
    window.location.href = 'mensajes.html';
  });

  document.getElementById('markReviewedBtn')?.addEventListener('click', e => {
    const c = e.currentTarget.querySelector('.check-circle');
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

  // Page-level filter tabs (top)
  document.querySelectorAll('.seg-tabs-bar .tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.seg-tabs-bar .tab-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      showToast(`Filtro: ${btn.textContent.trim()}`);
    });
  });

  document.querySelectorAll('.link-action').forEach(b => b.addEventListener('click', () => showToast('Detalle del seguimiento')));

  document.querySelector('.logout-btn')?.addEventListener('click', e => { e.preventDefault(); showToast('Cierre de sesión simulado'); });
});
