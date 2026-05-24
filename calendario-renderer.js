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

  // Toggle equipo / voluntario
  document.querySelectorAll('.cal-toggle-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.cal-toggle-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      showToast(`Vista: ${btn.textContent.trim()}`);
    });
  });

  // Month nav
  document.getElementById('prevMonth')?.addEventListener('click', () => showToast('Mes anterior'));
  document.getElementById('nextMonth')?.addEventListener('click', () => showToast('Mes siguiente'));

  // New event
  document.getElementById('newEventBtn')?.addEventListener('click', () => showToast('Abriendo formulario de evento…'));

  // Event click
  document.querySelectorAll('.calendar-grid .event').forEach(ev => {
    ev.addEventListener('click', e => {
      e.stopPropagation();
      showToast(`Evento: ${ev.textContent.trim()}`);
    });
  });

  // Notifications button (consistent with other pages)
  document.getElementById('notificationBtn')?.addEventListener('click', () => showToast('2 notificaciones nuevas'));

  // Todo toggle
  document.querySelectorAll('.todo-check').forEach(c => {
    c.addEventListener('click', e => {
      e.stopPropagation();
      c.style.background = c.style.background ? '' : 'var(--primary-blue)';
      c.style.borderColor = 'var(--primary-blue)';
    });
  });

  // Logout
  document.querySelector('.logout-btn')?.addEventListener('click', e => {
    e.preventDefault();
    showToast('Cierre de sesión simulado. ¡Hasta pronto!');
  });
});
