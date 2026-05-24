document.addEventListener('DOMContentLoaded', () => {

  const navItems = document.querySelectorAll(
    '.nav-item:not([href="index.html"]):not([href="adoptions.html"]):not([href="adoptantes.html"]):not([href="seguimientos.html"]):not([href="mascotas.html"]):not([href="tareas.html"]):not([href="mensajes.html"]):not(.logout-btn)'
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
  const tabs = document.querySelectorAll('#tabGroup .tab-btn');
  const cards = document.querySelectorAll('.pet-card');
  const casesCount = document.getElementById('casesCount');
  const petsGrid = document.getElementById('petsGrid');
  const petsTableWrap = document.getElementById('petsTableWrap');
  const tableBody = document.getElementById('tableBody');
  const gridViewBtn = document.getElementById('gridViewBtn');
  const tableViewBtn = document.getElementById('tableViewBtn');

  const fallbackDog = 'assets/pets/rocky.jpg';
  const fallbackCat = 'assets/pets/nala.jpg';

  document.querySelectorAll('.pet-card-image').forEach(img => {
    img.addEventListener('error', () => {
      const card = img.closest('.pet-card');
      const species = card?.dataset.species;
      const fallback = species === 'Gato' ? fallbackCat : fallbackDog;
      if (!img.src.endsWith(fallback.split('/').pop())) img.src = fallback;
    });
  });

  function buildTableFromCards() {
    tableBody.innerHTML = '';
    cards.forEach(card => {
      const name = card.querySelector('.pet-card-name').textContent;
      const species = card.dataset.species;
      const age = card.dataset.age;
      const status = card.dataset.status;
      const adoptionEl = card.querySelector('.pet-card-adoption');
      const adoptionText = adoptionEl.classList.contains('is-available')
        ? '—'
        : adoptionEl.textContent.replace('Adoptado: ', '');
      const imgSrc = card.querySelector('.pet-card-image').src;

      const tr = document.createElement('tr');
      tr.dataset.status = status;
      tr.className = card.classList.contains('hidden') ? 'hidden' : '';

      const statusLabel = status === 'adoptado' ? 'Adoptado' : 'Disponible';
      const badgeClass = status === 'adoptado' ? 'neutral-tag' : 'success-tag';

      tr.innerHTML = `
        <td>
          <div class="pet-table-cell">
            <img class="pet-table-thumb" src="${imgSrc}" alt="${name}">
            <span class="pet-table-name">${name}</span>
          </div>
        </td>
        <td>${species}</td>
        <td>${age} años</td>
        <td><span class="status-badge ${badgeClass}">${statusLabel}</span></td>
        <td class="muted-cell">${adoptionText}</td>
        <td><button type="button" class="action-link detail-link">Ver ficha</button></td>
      `;
      tr.addEventListener('click', () => showToast(`Abriendo ficha de ${name}…`));
      tr.querySelector('.detail-link').addEventListener('click', e => {
        e.stopPropagation();
        showToast(`Abriendo ficha de ${name}…`);
      });
      tableBody.appendChild(tr);
    });
  }

  buildTableFromCards();

  function applyFilters() {
    const q = searchInput.value.toLowerCase().trim();
    const activeTab = document.querySelector('#tabGroup .tab-btn.active');
    const statusFilter = activeTab?.getAttribute('data-filter') || 'all';
    let visible = 0;

    cards.forEach(card => {
      const status = card.dataset.status;
      const matchesSearch = card.textContent.toLowerCase().includes(q);
      const matchesTab = statusFilter === 'all' || status === statusFilter;
      const show = matchesSearch && matchesTab;

      card.classList.toggle('hidden', !show);
      if (show) visible++;
    });

    const rows = tableBody.querySelectorAll('tr');
    cards.forEach((card, i) => {
      if (rows[i]) rows[i].classList.toggle('hidden', card.classList.contains('hidden'));
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

  cards.forEach(card => {
    card.addEventListener('click', () => {
      const name = card.querySelector('.pet-card-name').textContent;
      showToast(`Abriendo ficha de ${name}…`);
    });
  });

  function setView(mode) {
    const isGrid = mode === 'grid';
    petsGrid.classList.toggle('hidden', !isGrid);
    petsTableWrap.classList.toggle('hidden', isGrid);
    gridViewBtn.classList.toggle('active', isGrid);
    tableViewBtn.classList.toggle('active', !isGrid);
    gridViewBtn.setAttribute('aria-pressed', isGrid);
    tableViewBtn.setAttribute('aria-pressed', !isGrid);
  }

  gridViewBtn.addEventListener('click', () => setView('grid'));
  tableViewBtn.addEventListener('click', () => setView('table'));

  document.getElementById('addPetBtn').addEventListener('click', () => {
    showToast('Abriendo formulario de nueva mascota…');
  });

  document.getElementById('sortBtn').addEventListener('click', () => {
    showToast('Ordenando mascotas…');
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
