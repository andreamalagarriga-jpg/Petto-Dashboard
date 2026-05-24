const DEFAULT_TIMELINE = [
  {
    title: 'Formulario completado',
    desc: 'Pendiente por revisión',
    state: 'active',
    status: 'Pendiente',
    action: { label: 'Ver formulario', type: 'review' }
  },
  {
    title: 'Visita domiciliaria',
    desc: 'Evaluación del hogar del adoptante',
    state: 'pending',
    status: 'Pendiente',
    meta: [
      { icon: 'calendar', text: '2026-05-02' },
      { icon: 'sun', text: 'En la mañana' }
    ],
    action: { label: 'Ver en Calendario', type: 'calendar' }
  },
  {
    title: 'Aprobación de adopción',
    desc: 'Revisión final del expediente',
    state: 'pending',
    status: 'Pendiente'
  },
  {
    title: 'Entrega de documentos del adoptante',
    desc: 'INE, comprobante de domicilio y referencias',
    state: 'pending',
    status: 'Pendiente',
    action: { label: 'Subir documentos', type: 'upload' }
  },
  {
    title: 'Firma de contrato',
    desc: 'Contrato de adopción responsable',
    state: 'pending',
    status: 'Pendiente'
  },
  {
    title: 'Visita de entrega del animal',
    desc: 'Entrega de la mascota al nuevo hogar',
    state: 'pending',
    status: 'Pendiente',
    meta: [
      { icon: 'calendar', text: '2026-05-15' },
      { icon: 'sun', text: 'En la tarde' }
    ],
    action: { label: 'Ver en Calendario', type: 'calendar' }
  },
  {
    title: 'Primer seguimiento',
    desc: 'Seguimiento a los 7 días de la adopción',
    state: 'pending',
    status: 'Pendiente'
  }
];

const ADOPTIONS = {
  '0001': {
    pet: 'Max', petBreed: 'Perro • Labrador', petAge: '3 años', petImage: 'assets/pets/max.jpg', petInitial: 'M',
    adopter: 'María García', adopterInitials: 'MG', email: 'maria@email.com', phone: '555-0101',
    created: '2026-04-20', updated: '2026-04-27',
    status: 'En proceso', statusKey: 'proceso', stage: 'Revisión de documentos', progress: 60,
    documents: [
      { name: 'Formulario de adopción', date: '2026-04-20', status: 'Pendiente' },
      { name: 'Identificación oficial', date: '—', status: 'Sin subir' }
    ],
    timeline: DEFAULT_TIMELINE
  },
  '0002': {
    pet: 'Luna', petBreed: 'Gato • Mestiza', petAge: '2 años', petImage: 'assets/pets/luna.jpg', petInitial: 'L',
    adopter: 'Juan Pérez', adopterInitials: 'JP', email: 'juan@email.com', phone: '555-0102',
    created: '2026-04-18', updated: '2026-04-25',
    status: 'Aprobada', statusKey: 'aprobada', stage: 'Completado', progress: 100,
    documents: [
      { name: 'Contrato firmado', date: '2026-04-22', status: 'Aprobado' },
      { name: 'Comprobante de domicilio', date: '2026-04-19', status: 'Aprobado' }
    ],
    timeline: DEFAULT_TIMELINE.map((s, i) => ({
      ...s,
      state: i < 6 ? 'done' : 'done',
      status: 'Completado',
      action: null,
      desc: i === 0 ? 'Formulario revisado y aprobado' : s.desc
    }))
  },
  '0003': {
    pet: 'Rocky', petBreed: 'Perro • Mestizo', petAge: '4 años', petImage: 'assets/pets/rocky.jpg', petInitial: 'R',
    adopter: 'Ana Rodríguez', adopterInitials: 'AR', email: 'ana@email.com', phone: '555-0103',
    created: '2026-04-22', updated: '2026-04-26',
    status: 'En proceso', statusKey: 'proceso', stage: 'Visita domiciliaria', progress: 35,
    documents: [{ name: 'Formulario de adopción', date: '2026-04-22', status: 'Aprobado' }],
    timeline: DEFAULT_TIMELINE.map((s, i) => ({
      ...s,
      state: i === 0 ? 'done' : i === 1 ? 'active' : 'pending',
      status: i === 0 ? 'Completado' : 'Pendiente'
    }))
  },
  '0004': {
    pet: 'Bella', petBreed: 'Perro • Golden', petAge: '5 años', petImage: 'assets/pets/bella.jpg', petInitial: 'B',
    adopter: 'Carlos López', adopterInitials: 'CL', email: 'carlos@email.com', phone: '555-0104',
    created: '2026-04-21', updated: '2026-04-24',
    status: 'En proceso', statusKey: 'proceso', stage: 'Solicitud de adopción', progress: 15,
    documents: [],
    timeline: DEFAULT_TIMELINE
  },
  '0005': {
    pet: 'Charlie', petBreed: 'Perro • Beagle', petAge: '2 años', petImage: 'assets/pets/coco.jpg', petInitial: 'C',
    adopter: 'Laura Martínez', adopterInitials: 'LM', email: 'laura@email.com', phone: '555-0105',
    created: '2026-04-15', updated: '2026-04-23',
    status: 'Aprobada', statusKey: 'aprobada', stage: 'Completado', progress: 100,
    documents: [{ name: 'Expediente completo', date: '2026-04-20', status: 'Archivado' }],
    timeline: DEFAULT_TIMELINE.map(s => ({ ...s, state: 'done', status: 'Completado', action: null }))
  },
  '0006': {
    pet: 'Toby', petBreed: 'Perro • Chihuahua', petAge: '6 años', petImage: 'assets/pets/toby.jpg', petInitial: 'T',
    adopter: 'Andrea Ruiz', adopterInitials: 'AR', email: 'andrea@email.com', phone: '555-0106',
    created: '2026-04-10', updated: '2026-04-12',
    status: 'Rechazada', statusKey: 'rechazada', stage: 'Solicitud de adopción', progress: 10,
    documents: [{ name: 'Formulario de adopción', date: '2026-04-10', status: 'Rechazado' }],
    timeline: [
      { title: 'Formulario completado', desc: 'No cumple requisitos del refugio', state: 'done', status: 'Rechazado' },
      { title: 'Revisión de solicitud', desc: 'Proceso cerrado', state: 'pending', status: 'Cancelado' }
    ]
  },
  '0007': {
    pet: 'Coco', petBreed: 'Perro • Mestizo', petAge: '2 años', petImage: 'assets/pets/coco.jpg', petInitial: 'C',
    adopter: 'Pedro Sánchez', adopterInitials: 'PS', email: 'pedro@email.com', phone: '555-0107',
    created: '2026-04-19', updated: '2026-04-27',
    status: 'En proceso', statusKey: 'proceso', stage: 'Visita domiciliaria', progress: 40,
    documents: [{ name: 'Formulario de adopción', date: '2026-04-19', status: 'Aprobado' }],
    timeline: DEFAULT_TIMELINE.map((s, i) => ({
      ...s,
      state: i === 0 ? 'done' : i === 1 ? 'active' : 'pending',
      status: i === 0 ? 'Completado' : 'Pendiente'
    }))
  },
  '0008': {
    pet: 'Mía', petBreed: 'Gato • Siamés', petAge: '1 año', petImage: 'assets/pets/nala.jpg', petInitial: 'M',
    adopter: 'Carmen Flores', adopterInitials: 'CF', email: 'carmen@email.com', phone: '555-0108',
    created: '2026-04-12', updated: '2026-04-20',
    status: 'Aprobada', statusKey: 'aprobada', stage: 'Completado', progress: 100,
    documents: [{ name: 'Contrato firmado', date: '2026-04-18', status: 'Aprobado' }],
    timeline: DEFAULT_TIMELINE.map(s => ({ ...s, state: 'done', status: 'Completado', action: null }))
  },
  '0009': {
    pet: 'Zeus', petBreed: 'Perro • Pastor', petAge: '4 años', petImage: 'assets/pets/simba.jpg', petInitial: 'Z',
    adopter: 'Roberto Kim', adopterInitials: 'RK', email: 'roberto@email.com', phone: '555-0109',
    created: '2026-04-08', updated: '2026-04-11',
    status: 'Rechazada', statusKey: 'rechazada', stage: 'Formulario', progress: 8,
    documents: [],
    timeline: [
      { title: 'Formulario completado', desc: 'Documentación incompleta', state: 'active', status: 'Rechazado', action: { label: 'Revisar', type: 'review' } }
    ]
  },
  '0010': {
    pet: 'Lola', petBreed: 'Gato • Mestiza', petAge: '2 años', petImage: 'assets/pets/lola.jpg', petInitial: 'L',
    adopter: 'Sofía Torres', adopterInitials: 'ST', email: 'sofia@email.com', phone: '555-0110',
    created: '2026-04-23', updated: '2026-04-27',
    status: 'En proceso', statusKey: 'proceso', stage: 'Contrato firmado', progress: 75,
    documents: [
      { name: 'Contrato de adopción', date: '2026-04-26', status: 'Firmado' },
      { name: 'Identificación oficial', date: '2026-04-24', status: 'Aprobado' }
    ],
    timeline: DEFAULT_TIMELINE.map((s, i) => ({
      ...s,
      state: i < 4 ? 'done' : i === 4 ? 'active' : 'pending',
      status: i < 4 ? 'Completado' : 'Pendiente'
    }))
  }
};

const ICONS = {
  calendar: '<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>',
  sun: '<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>',
  clock: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>',
  dot: '<span style="width:8px;height:8px;border-radius:50%;background:currentColor;display:block;"></span>',
  check: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>'
};

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

  const params = new URLSearchParams(window.location.search);
  const id = params.get('id') || '0001';
  const data = ADOPTIONS[id] || ADOPTIONS['0001'];

  const toast = document.getElementById('successToast');
  const toastMessage = document.getElementById('toastMessage');

  function showToast(message) {
    toastMessage.textContent = message;
    toast.classList.add('active');
    setTimeout(() => toast.classList.remove('active'), 3000);
  }

  const formModal = initAdoptionFormModal({ onToast: showToast });

  document.title = `Petto – Adopción ${id}`;
  document.getElementById('adoptionTitle').textContent = `Adopción ${id}`;
  document.getElementById('adoptionSubtitle').textContent =
    `Creada el ${data.created} • Última actualización: ${data.updated}`;
  document.getElementById('statusLabel').textContent = data.status;
  document.getElementById('stageLabel').textContent = `Etapa actual: ${data.stage}`;
  document.getElementById('progressPct').textContent = `${data.progress}%`;
  document.getElementById('progressFill').style.width = `${data.progress}%`;

  const banner = document.getElementById('statusBanner');
  if (data.statusKey === 'aprobada') {
    banner.style.backgroundColor = 'var(--icon-green-bg)';
    banner.style.borderColor = '#b8e6cc';
  } else if (data.statusKey === 'rechazada') {
    banner.style.backgroundColor = '#fee2e2';
    banner.style.borderColor = '#fecaca';
  }

  document.getElementById('adopterName').textContent = data.adopter;
  document.getElementById('adopterInitials').textContent = data.adopterInitials;
  document.getElementById('adopterEmail').textContent = data.email;
  document.getElementById('adopterPhone').textContent = data.phone;

  document.getElementById('petName').textContent = data.pet;
  document.getElementById('petBreed').textContent = data.petBreed;
  document.getElementById('petAge').textContent = data.petAge;

  const petAvatar = document.getElementById('petAvatar');
  const petImg = document.getElementById('petImage');
  if (data.petImage) {
    petImg.src = data.petImage;
    petImg.alt = data.pet;
    petImg.style.display = 'block';
    petImg.addEventListener('error', () => {
      petImg.style.display = 'none';
      if (!petAvatar.querySelector('.profile-initials')) {
        const span = document.createElement('span');
        span.className = 'profile-initials';
        span.textContent = data.petInitial || data.pet.charAt(0);
        petAvatar.appendChild(span);
      }
    });
  } else {
    petImg.style.display = 'none';
  }

  renderTimeline(data.timeline);
  renderDocuments(data.documents);

  document.querySelectorAll('#detailTabGroup .tab-btn').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('#detailTabGroup .tab-btn').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const key = tab.getAttribute('data-detail-tab');
      document.getElementById('panelTimeline').classList.toggle('active', key === 'timeline');
      document.getElementById('panelDocuments').classList.toggle('active', key === 'documents');
    });
  });

  document.getElementById('sendMessageBtn').addEventListener('click', () => {
    showToast(`Abriendo mensaje con ${data.adopter}…`);
  });

  document.getElementById('scheduleVisitBtn').addEventListener('click', () => {
    showToast('Abriendo calendario para agendar visita…');
  });

  document.getElementById('adopterProfileLink').addEventListener('click', e => {
    e.preventDefault();
    showToast(`Perfil de ${data.adopter}`);
  });

  document.getElementById('petProfileLink').addEventListener('click', e => {
    e.preventDefault();
    showToast(`Ficha de ${data.pet}`);
  });

  function renderTimeline(steps) {
    const container = document.getElementById('adoptionTimeline');
    container.innerHTML = '';

    steps.forEach(step => {
      const item = document.createElement('div');
      item.className = `timeline-item is-${step.state}`;

      let nodeInner = ICONS.dot;
      if (step.state === 'active') nodeInner = ICONS.clock;
      if (step.state === 'done') nodeInner = ICONS.check;

      let metaHtml = '';
      if (step.meta?.length) {
        metaHtml = `<div class="timeline-meta">${step.meta.map(m =>
          `<span class="timeline-meta-item">${ICONS[m.icon] || ''} ${m.text}</span>`
        ).join('')}</div>`;
      }

      let actionHtml = '';
      if (step.action) {
        actionHtml = `<button type="button" class="timeline-action" data-action="${step.action.type}">${step.action.label}</button>`;
      }

      item.innerHTML = `
        <div class="timeline-node">${nodeInner}</div>
        <div class="timeline-body">
          <h4>${step.title}</h4>
          <p>${step.desc}</p>
          ${metaHtml}
          ${actionHtml}
        </div>
        <span class="timeline-status">${step.status}</span>
      `;

      const actionBtn = item.querySelector('.timeline-action');
      actionBtn?.addEventListener('click', e => {
        e.preventDefault();
        e.stopPropagation();
        if (step.action.type === 'review') {
          formModal?.open(id, {
            adopter: data.adopter,
            pet: data.pet,
            petInitial: data.petInitial
          });
          return;
        }
        const labels = {
          calendar: 'Abriendo evento en calendario…',
          upload: 'Abriendo carga de documentos…'
        };
        showToast(labels[step.action.type] || 'Acción completada');
      });

      container.appendChild(item);
    });
  }

  function renderDocuments(docs) {
    const container = document.getElementById('documentsContainer');
    if (!docs.length) {
      container.innerHTML = '<p class="documents-empty">No hay documentos cargados para esta adopción.</p>';
      return;
    }

    container.innerHTML = `<div class="documents-list">${docs.map(doc => `
      <div class="document-row">
        <div class="document-row-left">
          <span class="document-icon" aria-hidden="true">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/></svg>
          </span>
          <div class="document-info">
            <h4>${doc.name}</h4>
            <p>${doc.date} · ${doc.status}</p>
          </div>
        </div>
        <button type="button" class="action-link doc-view-btn">Ver</button>
      </div>
    `).join('')}</div>`;

    container.querySelectorAll('.doc-view-btn').forEach(btn => {
      btn.addEventListener('click', () => showToast('Abriendo documento…'));
    });
  }

});
