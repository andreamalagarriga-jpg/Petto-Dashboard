document.addEventListener('DOMContentLoaded', () => {

  const navItems = document.querySelectorAll(
    '.nav-item:not([href="index.html"]):not([href="adoptions.html"]):not([href="adoptantes.html"]):not([href="seguimientos.html"]):not([href="mascotas.html"]):not([href="tareas.html"]):not([href="mensajes.html"]):not([href="calendario.html"]):not([href="equipo.html"]):not([href="perfil.html"]):not(.logout-btn)'
  );
  navItems.forEach(item => {
    item.addEventListener('click', e => {
      e.preventDefault();
      showToast(`Sección "${item.textContent.trim()}" (Simulación de prototipo)`);
    });
  });

  document.querySelector('.logout-btn')?.addEventListener('click', e => {
    e.preventDefault();
    showToast('Cierre de sesión simulado. ¡Hasta pronto!');
  });

  const searchInput = document.getElementById('searchInput');
  const rows = document.querySelectorAll('#tableBody tr');

  searchInput.addEventListener('input', () => {
    const q = searchInput.value.toLowerCase().trim();
    let visible = 0;

    rows.forEach(row => {
      const matches = row.textContent.toLowerCase().includes(q);
      if (matches) {
        row.classList.remove('hidden');
        visible++;
      } else {
        row.classList.add('hidden');
      }
    });

    updateCountLabel(visible);
  });

  document.querySelectorAll('.detail-link').forEach(btn => {
    btn.addEventListener('click', e => {
      e.stopPropagation();
      const name = btn.closest('tr').querySelector('.person-name').textContent;
      window.location.href = 'adoptante-detail.html';
    });
  });

  rows.forEach(row => {
    row.addEventListener('click', () => {
      const name = row.querySelector('.person-name').textContent;
      window.location.href = 'adoptante-detail.html';
    });
  });

  document.getElementById('newAdopterBtn').addEventListener('click', () => {
    showToast('Abriendo formulario de nuevo adoptante…');
  });

  document.getElementById('filterBtn').addEventListener('click', () => {
    showToast('Panel de filtros (próximamente)');
  });

  document.getElementById('sortBtn').addEventListener('click', () => {
    showToast('Ordenando tabla…');
  });

  document.getElementById('notificationBtn')?.addEventListener('click', () => {
    showToast('Tienes 3 nuevas notificaciones.');
  });

  document.querySelectorAll('.page-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.page-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });

  function updateCountLabel(count) {
    const total = rows.length;
    document.getElementById('countLabel').textContent =
      `Mostrando ${count} de ${total} adoptantes`;
  }

  const toast = document.getElementById('successToast');
  const toastMessage = document.getElementById('toastMessage');
  let toastTimeout;

  function showToast(msg) {
    toastMessage.textContent = msg;
    toast.classList.add('active');
    if (toastTimeout) clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => toast.classList.remove('active'), 3000);
  }
});
