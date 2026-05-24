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

  // Modal open / close
  const modal = document.getElementById('addMemberModal');
  document.getElementById('addMemberBtn')?.addEventListener('click', () => modal.classList.add('active'));
  document.getElementById('closeMemberModal')?.addEventListener('click', () => modal.classList.remove('active'));
  modal.addEventListener('click', e => { if (e.target === modal) modal.classList.remove('active'); });

  document.getElementById('addMemberForm')?.addEventListener('submit', e => {
    e.preventDefault();
    modal.classList.remove('active');
    showToast('Miembro agregado al equipo');
    e.target.reset();
  });

  // Search
  const search = document.getElementById('teamSearch');
  search?.addEventListener('input', () => {
    const q = search.value.toLowerCase().trim();
    document.querySelectorAll('.member-card').forEach(card => {
      const name = (card.dataset.name || '').toLowerCase();
      const role = card.querySelector('.member-role')?.textContent.toLowerCase() || '';
      const match = !q || name.includes(q) || role.includes(q);
      card.style.display = match ? '' : 'none';
    });
  });

  // View toggle
  document.querySelectorAll('.view-toggle-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.view-toggle-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const grid = document.getElementById('teamGrid');
      grid.classList.toggle('list-view', btn.dataset.view === 'list');
    });
  });

  // Card click
  document.querySelectorAll('.member-card').forEach(card => {
    card.addEventListener('click', e => {
      if (e.target.closest('.member-more')) return;
      showToast(`Abriendo perfil de ${card.dataset.name}…`);
    });
  });

  document.querySelectorAll('.member-more').forEach(btn => {
    btn.addEventListener('click', e => {
      e.stopPropagation();
      showToast('Opciones del miembro');
    });
  });

  document.querySelector('.logout-btn')?.addEventListener('click', e => {
    e.preventDefault();
    showToast('Cierre de sesión simulado. ¡Hasta pronto!');
  });
});
