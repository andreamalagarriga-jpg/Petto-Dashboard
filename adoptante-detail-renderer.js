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

  // Tabs
  document.querySelectorAll('.adoptante-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.adoptante-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const target = tab.dataset.tab;
      document.querySelectorAll('.tab-panel').forEach(p => {
        p.classList.toggle('active', p.dataset.panel === target);
      });
    });
  });

  // Buttons
  document.getElementById('editAdopterBtn')?.addEventListener('click', () => showToast('Modo edición activado'));
  document.getElementById('historyBtn')?.addEventListener('click', () => showToast('Abriendo historial de seguimiento…'));
  document.getElementById('notificationBtn')?.addEventListener('click', () => showToast('No tienes notificaciones nuevas'));

  document.querySelectorAll('.contact-action').forEach(b => b.addEventListener('click', () => showToast('Acción de contacto')));
  document.querySelectorAll('.link-action').forEach(b => b.addEventListener('click', () => showToast('Abriendo documento…')));

  document.querySelector('.logout-btn')?.addEventListener('click', e => {
    e.preventDefault();
    showToast('Cierre de sesión simulado. ¡Hasta pronto!');
  });
});
