// Petto sidebar injector — replaces #sidebar-slot with the standard sidebar.
// Usage: <div id="sidebar-slot" data-active="perfil"></div>
//        <script src="petto-sidebar.js"></script>
(function () {
  const slot = document.getElementById('sidebar-slot');
  if (!slot) return;
  const active = slot.dataset.active || '';

  const items = [
    { key: 'inicio', href: 'index.html', label: 'Inicio',
      svg: '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><path d="M9 22V12h6v10"/></svg>' },
    { key: 'adopciones', href: 'adoptions.html', label: 'Adopciones',
      svg: '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M10 9H8"/><path d="M16 13H8"/><path d="M16 17H8"/></svg>' },
    { key: 'adoptantes', href: 'adoptantes.html', label: 'Adoptantes',
      svg: '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><polyline points="16 11 18 13 22 9"/></svg>' },
    { key: 'seguimientos', href: 'seguimientos.html', label: 'Seguimientos',
      svg: '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>' },
    { key: 'mascotas', href: 'mascotas.html', label: 'Mascotas',
      svg: '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5c.67 0 1.2-.32 1.6-.75a3 3 0 0 0-4.8 0c.4.43.93.75 1.6.75Z"/><path d="M19 8c.67 0 1.2-.32 1.6-.75a3 3 0 0 0-4.8 0c.4.43.93.75 1.6.75Z"/><path d="M5 8c.67 0 1.2-.32 1.6-.75a3 3 0 0 0-4.8 0c.4.43.93.75 1.6.75Z"/><path d="M12 12c-2.2 0-4 1.8-4 4s1.8 4 4 4 4-1.8 4-4-1.8-4-4-4Z"/><path d="M19 14c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2Z"/><path d="M5 14c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2Z"/></svg>' },
    { key: 'calendario', href: 'calendario.html', label: 'Calendario',
      svg: '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>' },
    { key: 'mensajes', href: 'mensajes.html', label: 'Mensajes',
      svg: '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>' },
    { key: 'tareas', href: 'tareas.html', label: 'Mis tareas',
      svg: '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="6" height="6" rx="1"/><path d="m3 17 2 2 4-4"/><path d="M13 6h8"/><path d="M13 12h8"/><path d="M13 18h8"/></svg>' },
    { key: 'equipo', href: 'equipo.html', label: 'Equipo',
      svg: '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>' },
  ];

  const navHTML = items.map(it => `
    <a href="${it.href}" class="nav-item${active === it.key ? ' active' : ''}" data-tab="${it.key}">
      <span class="icon">${it.svg}</span>
      ${it.label}
    </a>`).join('');

  slot.outerHTML = `
    <aside class="sidebar">
      <div class="sidebar-top">
        <div class="logo"><h2>Petto</h2></div>
        <nav class="nav-menu">${navHTML}</nav>
      </div>
      <div class="sidebar-bottom">
        <a href="#" class="nav-item logout-btn">
          <span class="icon"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" x2="9" y1="12" y2="12"/></svg></span>
          Cerrar sesión
        </a>
        <a href="perfil.html" class="profile-widget" style="text-decoration:none;">
          <div class="avatar">AP</div>
          <div class="profile-info">
            <span class="name">Andrea Perez</span>
            <span class="role">Admin</span>
          </div>
        </a>
      </div>
    </aside>`;
})();
