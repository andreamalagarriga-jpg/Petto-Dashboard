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
  const tabs = document.querySelectorAll('#categoryTabs .tab-btn');
  const items = document.querySelectorAll('.task-item');
  const summaryLine = document.getElementById('tasksSummaryLine');

  const categories = ['all', 'formularios', 'visitas', 'aprobaciones', 'documentos', 'entregas', 'seguimientos'];

  function updateTabCounts() {
    const q = searchInput.value.toLowerCase().trim();

    categories.forEach(cat => {
      const el = document.querySelector(`[data-tab-count="${cat}"]`);
      if (!el) return;

      let count = 0;
      items.forEach(item => {
        const matchesSearch = item.textContent.toLowerCase().includes(q);
        const matchesCat = cat === 'all' || item.getAttribute('data-category') === cat;
        if (matchesSearch && matchesCat) count++;
      });
      el.textContent = String(count);
    });
  }

  function updateStats(visibleItems) {
    let pending = 0;
    let progress = 0;
    let done = 0;

    visibleItems.forEach(item => {
      const status = item.getAttribute('data-status');
      if (status === 'pendiente') pending++;
      else if (status === 'progreso') progress++;
      else if (status === 'completada') done++;
    });

    const total = visibleItems.length;
    document.getElementById('statTotal').textContent = total;
    document.getElementById('statPending').textContent = pending;
    document.getElementById('statProgress').textContent = progress;
    document.getElementById('statDone').textContent = done;

    if (summaryLine) {
      summaryLine.textContent = `${pending} pendientes • ${progress} en progreso • ${done} completadas`;
    }
  }

  function applyFilters() {
    const q = searchInput.value.toLowerCase().trim();
    const activeTab = document.querySelector('#categoryTabs .tab-btn.active');
    const categoryFilter = activeTab?.getAttribute('data-category') || 'all';
    const visibleItems = [];

    items.forEach(item => {
      const category = item.getAttribute('data-category');
      const matchesSearch = item.textContent.toLowerCase().includes(q);
      const matchesTab = categoryFilter === 'all' || category === categoryFilter;
      const show = matchesSearch && matchesTab;

      if (show) {
        item.classList.remove('hidden');
        visibleItems.push(item);
      } else {
        item.classList.add('hidden');
      }
    });

    updateStats(visibleItems);
    updateTabCounts();
  }

  searchInput.addEventListener('input', applyFilters);

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      applyFilters();
    });
  });

  items.forEach(item => {
    item.addEventListener('click', () => {
      const title = item.querySelector('.task-title').textContent;
      showToast(`Abriendo tarea: ${title}…`);
    });
  });

  document.getElementById('newTaskBtn').addEventListener('click', e => {
    e.stopPropagation();
    showToast('Abriendo formulario de nueva tarea…');
  });

  document.getElementById('filtersBtn').addEventListener('click', e => {
    e.stopPropagation();
    showToast('Filtros avanzados (próximamente)…');
  });

  const toast = document.getElementById('successToast');
  const toastMessage = document.getElementById('toastMessage');

  function showToast(message) {
    toastMessage.textContent = message;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 3000);
  }

  applyFilters();
});
