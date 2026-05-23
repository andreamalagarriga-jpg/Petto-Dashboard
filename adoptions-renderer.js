document.addEventListener('DOMContentLoaded', () => {

  // ─── SIDEBAR NAV (non-link items) ────────────────────────────────────────
  const navItems = document.querySelectorAll('.nav-item:not([href="index.html"]):not([href="adoptions.html"]):not(.logout-btn)');
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

  // ─── SEARCH ───────────────────────────────────────────────────────────────
  const searchInput = document.getElementById('searchInput');
  searchInput.addEventListener('input', () => {
    const q = searchInput.value.toLowerCase().trim();
    const rows = document.querySelectorAll('#tableBody tr');
    let visible = 0;

    rows.forEach(row => {
      const text = row.textContent.toLowerCase();
      const matches = text.includes(q);
      if (matches) { row.classList.remove('hidden'); visible++; }
      else          { row.classList.add('hidden'); }
    });

    updateCountLabel(visible);
  });

  // ─── TAB FILTERING ────────────────────────────────────────────────────────
  const tabs   = document.querySelectorAll('.tab-btn');
  const rows   = document.querySelectorAll('#tableBody tr');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const filter = tab.getAttribute('data-filter');

      // Fade all rows out first
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

  // ─── DETAIL BUTTONS ───────────────────────────────────────────────────────
  document.querySelectorAll('.detail-btn').forEach(btn => {
    btn.addEventListener('click', e => {
      e.stopPropagation();
      const row  = btn.closest('tr');
      const name = row.querySelector('.pet-name').textContent;
      showToast(`Abriendo detalles de ${name}…`);
    });
  });

  // Row click (whole row)
  rows.forEach(row => {
    row.addEventListener('click', () => {
      const name = row.querySelector('.pet-name').textContent;
      showToast(`Ficha de adopción: ${name}`);
    });
  });

  // ─── ACTION BUTTONS ───────────────────────────────────────────────────────
  document.getElementById('newAdoptionBtn').addEventListener('click', () => {
    showToast('Abriendo formulario de nueva adopción…');
  });

  document.getElementById('filterBtn').addEventListener('click', () => {
    showToast('Panel de filtros (próximamente)');
  });

  document.getElementById('sortBtn').addEventListener('click', () => {
    showToast('Ordenando tabla…');
  });

  // ─── NOTIFICATION BELL ────────────────────────────────────────────────────
  document.getElementById('notificationBtn')?.addEventListener('click', () => {
    showToast('Sin notificaciones nuevas');
  });

  // ─── PAGINATION ───────────────────────────────────────────────────────────
  document.querySelectorAll('.page-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.page-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });

  // ─── COUNT LABEL ──────────────────────────────────────────────────────────
  function updateCountLabel(count) {
    const total = rows.length;
    document.getElementById('countLabel').textContent =
      `Mostrando ${count} de ${total} adopciones`;
  }

  // ─── TOAST ────────────────────────────────────────────────────────────────
  const toast        = document.getElementById('successToast');
  const toastMessage = document.getElementById('toastMessage');
  let toastTimeout;

  function showToast(msg) {
    toastMessage.textContent = msg;
    toast.classList.add('active');
    if (toastTimeout) clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => toast.classList.remove('active'), 3000);
  }
});
