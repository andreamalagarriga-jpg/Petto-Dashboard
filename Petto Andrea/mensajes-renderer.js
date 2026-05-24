const CONVERSATIONS = [
  { status: 'sin-asignar', name: 'María García', initials: 'MG', tone: 'blue', time: '5 min', snippet: 'Hola, quería preguntar sobre el proceso de adopción de Max.', assignee: null, unread: 2 },
  { status: 'sin-asignar', name: 'Juan Pérez', initials: 'JP', tone: 'green', time: '12 min', snippet: '¿Cuándo podrían agendar la visita domiciliaria?', assignee: null, unread: 1 },
  { status: 'sin-asignar', name: 'Ana Rodríguez', initials: 'AR', tone: 'pink', time: '25 min', snippet: 'Adjunto el formulario completado para revisión.', assignee: null, unread: 3 },
  { status: 'sin-asignar', name: 'Carlos Méndez', initials: 'CM', tone: 'lavender', time: '1 h', snippet: 'Tengo dudas sobre los requisitos para adoptar un gato.', assignee: null, unread: 1 },
  { status: 'sin-asignar', name: 'Laura Sánchez', initials: 'LS', tone: 'mint', time: '2 h', snippet: 'Buenos días, ¿Rocky sigue disponible para adopción?', assignee: null, unread: 2 },

  { status: 'espera', name: 'Patricia López', initials: 'PL', tone: 'peach', time: '8 min', snippet: 'Gracias por la información, lo consulto con mi familia.', assignee: 'Ana Voluntaria', unread: 0 },
  { status: 'espera', name: 'Rodrigo Rodríguez', initials: 'RR', tone: 'sky', time: '20 min', snippet: '¿Me confirman la fecha de la entrega de Bella?', assignee: 'Luis Coordinador', unread: 0 },
  { status: 'espera', name: 'Sofía Martín', initials: 'SM', tone: 'blue', time: '35 min', snippet: 'Envío los documentos que faltaban esta tarde.', assignee: 'Ana Voluntaria', unread: 0 },
  { status: 'espera', name: 'Diego Herrera', initials: 'DH', tone: 'green', time: '45 min', snippet: 'Quedo atento a su respuesta sobre la visita.', assignee: 'María Admin', unread: 0 },
  { status: 'espera', name: 'Elena Ruiz', initials: 'ER', tone: 'pink', time: '1 h', snippet: '¿Recibieron el informe veterinario de Nala?', assignee: 'Ana Voluntaria', unread: 0 },
  { status: 'espera', name: 'Miguel Torres', initials: 'MT', tone: 'lavender', time: '2 h', snippet: 'Perfecto, espero su confirmación entonces.', assignee: 'Luis Coordinador', unread: 0 },

  { status: 'conversacion', name: 'Isabel Vega', initials: 'IV', tone: 'mint', time: '3 min', snippet: 'La visita fue muy bien, el espacio es adecuado para Toby.', assignee: 'María Admin', unread: 4 },
  { status: 'conversacion', name: 'Carmen Díaz', initials: 'CD', tone: 'peach', time: '10 min', snippet: 'Podemos coordinar el transporte para el sábado.', assignee: 'Ana Voluntaria', unread: 2 },
  { status: 'conversacion', name: 'Roberto Flores', initials: 'RF', tone: 'sky', time: '18 min', snippet: 'Mi esposa también quiere participar en la visita.', assignee: 'Luis Coordinador', unread: 1 },
  { status: 'conversacion', name: 'Gabriela Ortiz', initials: 'GO', tone: 'blue', time: '30 min', snippet: '¿Qué incluye el kit de bienvenida para la adopción?', assignee: 'Ana Voluntaria', unread: 3 },
  { status: 'conversacion', name: 'Fernando Castro', initials: 'FC', tone: 'green', time: '50 min', snippet: 'Simba se está adaptando muy bien, les comparto fotos.', assignee: 'María Admin', unread: 1 },
  { status: 'conversacion', name: 'Valentina Ríos', initials: 'VR', tone: 'pink', time: '1 h', snippet: 'Tengo una pregunta sobre el seguimiento post-adopción.', assignee: 'Ana Voluntaria', unread: 2 },
  { status: 'conversacion', name: 'Andrés Morales', initials: 'AM', tone: 'lavender', time: '2 h', snippet: '¿Pueden enviarme el contrato para revisarlo?', assignee: 'Luis Coordinador', unread: 0 },

  { status: 'resuelta', name: 'Lucía Fernández', initials: 'LF', tone: 'mint', time: 'Ayer', snippet: 'Muchas gracias por todo el apoyo en la adopción de Luna.', assignee: 'María Admin', unread: 0 },
  { status: 'resuelta', name: 'Pablo Jiménez', initials: 'PJ', tone: 'peach', time: 'Ayer', snippet: 'Confirmado, la entrega quedó registrada correctamente.', assignee: 'Ana Voluntaria', unread: 0 },
  { status: 'resuelta', name: 'Daniela Vargas', initials: 'DV', tone: 'sky', time: '2 d', snippet: 'El formulario fue aprobado, gracias por la gestión.', assignee: 'Luis Coordinador', unread: 0 },
  { status: 'resuelta', name: 'Héctor Ramos', initials: 'HR', tone: 'blue', time: '2 d', snippet: 'Visita domiciliaria completada con resultado favorable.', assignee: 'María Admin', unread: 0 },
  { status: 'resuelta', name: 'Claudia Peña', initials: 'CP', tone: 'green', time: '3 d', snippet: 'Documentación validada, listos para la siguiente fase.', assignee: 'Ana Voluntaria', unread: 0 },
  { status: 'resuelta', name: 'Óscar Delgado', initials: 'OD', tone: 'pink', time: '3 d', snippet: 'Excelente servicio, Milo está feliz en su nuevo hogar.', assignee: 'Ana Voluntaria', unread: 0 },
  { status: 'resuelta', name: 'Natalia Cruz', initials: 'NC', tone: 'lavender', time: '4 d', snippet: 'Seguimiento de 7 días registrado sin eventualidades.', assignee: 'María Admin', unread: 0 },
  { status: 'resuelta', name: 'Ricardo Soto', initials: 'RS', tone: 'mint', time: '5 d', snippet: 'Contrato firmado y archivado correctamente.', assignee: 'Luis Coordinador', unread: 0 },

  { status: 'archivada', name: 'Teresa Aguilar', initials: 'TA', tone: 'peach', time: '1 sem', snippet: 'Conversación cerrada — adopción finalizada.', assignee: 'María Admin', unread: 0 },
  { status: 'archivada', name: 'Jorge Mendoza', initials: 'JM', tone: 'sky', time: '2 sem', snippet: 'Archivado: solicitante no continuó el proceso.', assignee: 'Ana Voluntaria', unread: 0 },
  { status: 'archivada', name: 'Silvia Romero', initials: 'SR', tone: 'blue', time: '3 sem', snippet: 'Caso resuelto y archivado por inactividad.', assignee: 'Luis Coordinador', unread: 0 },
  { status: 'archivada', name: 'Arturo Navarro', initials: 'AN', tone: 'green', time: '1 mes', snippet: 'Historial guardado — referencia para futuras adopciones.', assignee: 'María Admin', unread: 0 }
];

const STATUS_BADGES = {
  'sin-asignar': { label: 'Sin asignar', tag: 'neutral-tag' },
  espera: { label: 'En espera', tag: 'alert-tag' },
  conversacion: { label: 'En conversación', tag: 'progress-tag' },
  resuelta: { label: 'Resuelta', tag: 'success-tag' },
  archivada: { label: 'Archivada', tag: 'neutral-tag' }
};

const CHAT_ICON = '<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>';
const USER_ICON = '<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="19" x2="19" y1="8" y2="14"/><line x1="22" x2="16" y1="11" y2="11"/></svg>';

const TAB_FILTERS = ['all', 'sin-asignar', 'espera', 'conversacion', 'resuelta', 'archivada'];

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
  const tabs = document.querySelectorAll('#tabGroup .tab-btn');
  const grid = document.getElementById('conversationsGrid');
  const toast = document.getElementById('successToast');
  const toastMessage = document.getElementById('toastMessage');
  let allCards = [];

  function showToast(message) {
    toastMessage.textContent = message;
    toast.classList.add('active');
    setTimeout(() => toast.classList.remove('active'), 3000);
  }

  function buildCard(conv) {
    const assigneeText = conv.assignee || 'Sin asignar';
    const assigneeClass = conv.assignee ? '' : 'is-unassigned';
    const unreadClass = conv.unread > 0 ? '' : 'is-hidden';
    const unreadHtml = conv.unread > 0 ? String(conv.unread) : '';
    const badge = STATUS_BADGES[conv.status];

    const article = document.createElement('article');
    article.className = 'chat-card';
    article.setAttribute('data-status', conv.status);
    article.setAttribute('data-search', `${conv.name} ${conv.snippet} ${assigneeText}`.toLowerCase());

    article.innerHTML = `
      <div class="chat-card-top">
        <span class="status-badge ${badge.tag}">${badge.label}</span>
        <span class="chat-unread ${unreadClass}">${unreadHtml}</span>
      </div>
      <div class="chat-card-header">
        <div class="chat-avatar tone-${conv.tone}">${conv.initials}</div>
        <div class="chat-card-title">
          <span class="chat-name">${conv.name}</span>
          <span class="chat-time">${conv.time}</span>
        </div>
      </div>
      <p class="chat-snippet">${conv.snippet}</p>
      <p class="chat-assignee ${assigneeClass}">${conv.assignee ? `Asignado a ${conv.assignee}` : assigneeText}</p>
      <div class="chat-card-actions">
        <button type="button" class="chat-action chat-open-btn">${CHAT_ICON} Abrir chat</button>
        <button type="button" class="chat-action chat-assign-btn">${USER_ICON} Asignar</button>
      </div>
    `;

    article.querySelector('.chat-open-btn').addEventListener('click', e => {
      e.stopPropagation();
      showToast(`Abriendo chat con ${conv.name}…`);
    });

    article.querySelector('.chat-assign-btn').addEventListener('click', e => {
      e.stopPropagation();
      showToast(`Asignar conversación de ${conv.name}…`);
    });

    return article;
  }

  function renderGrid() {
    grid.innerHTML = '';
    allCards = CONVERSATIONS.map(conv => {
      const card = buildCard(conv);
      grid.appendChild(card);
      return card;
    });
  }

  function matchesSearch(card, q) {
    return card.getAttribute('data-search').includes(q);
  }

  function updateTabCounts() {
    const q = searchInput.value.toLowerCase().trim();

    TAB_FILTERS.forEach(filter => {
      const el = document.querySelector(`[data-tab-count="${filter}"]`);
      if (!el) return;

      let count = 0;
      allCards.forEach(card => {
        const status = card.getAttribute('data-status');
        const matchesTab = filter === 'all' || status === filter;
        if (matchesTab && matchesSearch(card, q)) count++;
      });
      el.textContent = String(count);
    });
  }

  function updateSummary() {
    const q = searchInput.value.toLowerCase().trim();
    let active = 0;
    let unassigned = 0;
    let waiting = 0;

    allCards.forEach(card => {
      if (!matchesSearch(card, q)) return;
      const status = card.getAttribute('data-status');
      if (status !== 'archivada') active++;
      if (status === 'sin-asignar') unassigned++;
      if (status === 'espera') waiting++;
    });

    document.getElementById('summaryActive').textContent =
      `${active} conversaciones activas`;
    document.getElementById('summaryUnassigned').textContent =
      `${unassigned} sin asignar`;
    document.getElementById('summaryWaiting').textContent =
      `${waiting} esperando respuesta`;
  }

  function applyFilters() {
    const q = searchInput.value.toLowerCase().trim();
    const activeTab = document.querySelector('#tabGroup .tab-btn.active');
    const statusFilter = activeTab?.getAttribute('data-filter') || 'all';

    allCards.forEach(card => {
      const status = card.getAttribute('data-status');
      const matchesTab = statusFilter === 'all' || status === statusFilter;
      const matches = matchesTab && matchesSearch(card, q);
      card.classList.toggle('hidden', !matches);
    });

    updateTabCounts();
    updateSummary();
  }

  searchInput.addEventListener('input', applyFilters);

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      applyFilters();
    });
  });

  document.getElementById('filtersBtn').addEventListener('click', () => {
    showToast('Filtros avanzados (próximamente)…');
  });

  document.getElementById('newConversationBtn').addEventListener('click', () => {
    showToast('Abriendo formulario de nueva conversación…');
  });

  renderGrid();
  applyFilters();
});
