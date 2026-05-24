document.addEventListener('DOMContentLoaded', () => {

  const navItems = document.querySelectorAll('.nav-item:not([href="index.html"]):not([href="adoptions.html"]):not([href="adoptantes.html"]):not([href="seguimientos.html"]):not([href="mascotas.html"]):not([href="tareas.html"]):not([href="mensajes.html"]):not([href="calendario.html"]):not([href="equipo.html"]):not([href="perfil.html"]):not(.logout-btn)');
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
  const tabs = document.querySelectorAll('.tab-btn');
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

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const filter = tab.getAttribute('data-filter');
      rows.forEach(row => row.classList.add('fading'));

      setTimeout(() => {
        let visible = 0;
        rows.forEach(row => {
          row.classList.remove('fading');
          const status = row.getAttribute('data-status');
          const show = filter === 'all' || status === filter;
          if (show) {
            row.classList.remove('hidden');
            row.classList.add('visible');
            visible++;
          } else {
            row.classList.add('hidden');
            row.classList.remove('visible');
          }
        });
        updateCountLabel(visible);
        searchInput.value = '';
      }, 180);
    });
  });

  function openAdoptionDetail(row) {
    const code = row.querySelector('.code-cell')?.textContent.trim() || '0001';
    window.location.href = `adoption-detail.html?id=${encodeURIComponent(code)}`;
  }

  function getRowFormContext(row) {
    return {
      adopter: row.querySelector('.adopter-name')?.textContent.trim() || '',
      pet: row.querySelector('.pet-name')?.textContent.trim() || '',
      petInitial: row.querySelector('.pet-initial')?.textContent.trim() || 'M'
    };
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

  const formModal = initAdoptionFormModal({ onToast: showToast });

  document.querySelectorAll('.form-link').forEach(btn => {
    btn.addEventListener('click', e => {
      e.stopPropagation();
      const row = btn.closest('tr');
      const code = row.querySelector('.code-cell')?.textContent.trim() || '0001';
      formModal?.open(code, getRowFormContext(row));
    });
  });

  document.querySelectorAll('.detail-link').forEach(btn => {
    btn.addEventListener('click', e => {
      e.stopPropagation();
      openAdoptionDetail(btn.closest('tr'));
    });
  });

  rows.forEach(row => {
    row.style.cursor = 'pointer';
    row.addEventListener('click', () => openAdoptionDetail(row));
  });

  document.getElementById('newAdoptionBtn').addEventListener('click', () => {
    showToast('Abriendo formulario de nueva adopción…');
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
      `Mostrando ${count} de ${total} adopciones`;
  }

});
