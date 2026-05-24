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
  const tabs = document.querySelectorAll('.tab-btn');
  const items = document.querySelectorAll('.followup-item');
  const casesCount = document.getElementById('casesCount');

  function applyFilters() {
    const q = searchInput.value.toLowerCase().trim();
    const activeTab = document.querySelector('.tab-btn.active');
    const statusFilter = activeTab?.getAttribute('data-filter') || 'all';
    let visible = 0;

    items.forEach(item => {
      const status = item.getAttribute('data-status');
      const matchesSearch = item.textContent.toLowerCase().includes(q);
      const matchesTab = statusFilter === 'all' || status === statusFilter;
      const show = matchesSearch && matchesTab;

      if (show) {
        item.classList.remove('hidden');
        visible++;
      } else {
        item.classList.add('hidden');
      }
    });

    casesCount.textContent = `(${visible})`;
  }

  searchInput.addEventListener('input', applyFilters);

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      applyFilters();
    });
  });

  const fallbackThumb = 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=96&h=96&fit=crop&auto=format';
  document.querySelectorAll('.pet-thumb').forEach(img => {
    img.addEventListener('error', () => {
      if (img.src !== fallbackThumb) img.src = fallbackThumb;
    });
  });

  items.forEach(item => {
    item.addEventListener('click', () => {
      const status = item.dataset.status || '';
      const alertParam = status === 'alerta' ? '?alert=1' : '';
      window.location.href = 'seguimiento-detail.html' + alertParam;
    });
  });

  document.getElementById('addFollowUpBtn').addEventListener('click', e => {
    e.stopPropagation();
    showToast('Abriendo formulario de nuevo seguimiento…');
  });

  document.getElementById('sortBtn').addEventListener('click', e => {
    e.stopPropagation();
    showToast('Ordenando casos…');
  });

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
