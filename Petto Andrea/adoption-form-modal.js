const ADOPTION_FORMS = {
  '0001': {
    adopter: 'María García',
    pet: 'Max',
    petMeta: 'Labrador • Mascota en adopción',
    petInitial: 'M',
    formBadge: { text: 'Formulario completado', tag: 'success-tag' },
    submitted: '2026-04-20',
    personal: [
      { label: 'Nombre completo', value: 'María García' },
      { label: 'Correo electrónico', value: 'm.garcia@gmail.com' },
      { label: 'Teléfono', value: '555-0101' },
      { label: 'Dirección', value: 'Calle 123 #45-67, Bogotá' },
      { label: 'Ocupación', value: 'Profesional independiente' }
    ],
    housing: [
      { label: 'Tipo de vivienda', value: 'Casa propia' },
      { label: 'Espacio disponible', value: 'Amplio — jardín privado' },
      { label: 'Otros animales en casa', value: 'No' },
      { label: 'Niños en el hogar', value: 'Sí, 1 niño de 8 años' }
    ],
    experience: [
      { label: 'Experiencia previa con mascotas', value: 'Sí, 5 años con un Labrador' },
      { label: 'Motivo de adopción', value: 'Brindar un hogar amoroso a una mascota necesitada' },
      { label: 'Horas solas al día', value: '4 horas' },
      { label: 'Responsable del cuidado', value: 'María García' }
    ],
    comments: 'Soy una persona muy comprometida con el bienestar animal. He tenido mascotas toda mi vida y entiendo la responsabilidad que implica. Tengo tiempo, espacio y amor para ofrecer a Max.'
  },
  '0002': {
    adopter: 'Juan Pérez',
    pet: 'Luna',
    petMeta: 'Gato • Mestiza',
    petInitial: 'L',
    formBadge: { text: 'Formulario aprobado', tag: 'success-tag' },
    submitted: '2026-04-18',
    personal: [
      { label: 'Nombre completo', value: 'Juan Pérez' },
      { label: 'Correo electrónico', value: 'juan.perez@email.com' },
      { label: 'Teléfono', value: '555-0102' },
      { label: 'Dirección', value: 'Carrera 15 #80-20, Bogotá' },
      { label: 'Ocupación', value: 'Ingeniero de sistemas' }
    ],
    housing: [
      { label: 'Tipo de vivienda', value: 'Apartamento' },
      { label: 'Espacio disponible', value: 'Mediano — balcón amplio' },
      { label: 'Otros animales en casa', value: 'No' },
      { label: 'Niños en el hogar', value: 'No' }
    ],
    experience: [
      { label: 'Experiencia previa con mascotas', value: 'Sí, gatos durante 3 años' },
      { label: 'Motivo de adopción', value: 'Compañía y apoyo emocional' },
      { label: 'Horas solas al día', value: '6 horas' },
      { label: 'Responsable del cuidado', value: 'Juan Pérez' }
    ],
    comments: 'Busco adoptar a Luna para darle un hogar tranquilo y seguro.'
  }
};

function getDefaultForm(code, adopter, pet, petInitial) {
  return {
    adopter,
    pet,
    petMeta: 'Mascota en adopción',
    petInitial,
    formBadge: { text: 'Formulario completado', tag: 'progress-tag' },
    submitted: '2026-04-20',
    personal: [
      { label: 'Nombre completo', value: adopter },
      { label: 'Correo electrónico', value: 'contacto@email.com' },
      { label: 'Teléfono', value: '555-0000' },
      { label: 'Dirección', value: 'Por confirmar' },
      { label: 'Ocupación', value: 'Por confirmar' }
    ],
    housing: [
      { label: 'Tipo de vivienda', value: 'Por confirmar' },
      { label: 'Espacio disponible', value: 'Por confirmar' },
      { label: 'Otros animales en casa', value: 'Por confirmar' },
      { label: 'Niños en el hogar', value: 'Por confirmar' }
    ],
    experience: [
      { label: 'Experiencia previa con mascotas', value: 'Por confirmar' },
      { label: 'Motivo de adopción', value: 'Por confirmar' },
      { label: 'Horas solas al día', value: 'Por confirmar' },
      { label: 'Responsable del cuidado', value: adopter }
    ],
    comments: 'Formulario pendiente de revisión detallada.'
  };
}

function renderInfoBlock(rows) {
  return `<div class="form-info-block">${rows.map(row => `
    <div class="form-info-row">
      <span class="form-info-label">${row.label}</span>
      <span class="form-info-value">${row.value}</span>
    </div>
  `).join('')}</div>`;
}

function renderAdoptionFormBody(form, code) {
  return `
    <div class="form-pet-summary">
      <div class="form-pet-avatar">${form.petInitial}</div>
      <div class="form-pet-text">
        <p class="pet-name">${form.pet}</p>
        <p class="pet-meta">${form.petMeta}</p>
      </div>
      <span class="status-badge ${form.formBadge.tag}">${form.formBadge.text}</span>
    </div>

    <div class="form-section">
      <h3 class="form-section-title">Información personal</h3>
      ${renderInfoBlock(form.personal)}
    </div>

    <div class="form-section">
      <h3 class="form-section-title">Información sobre la vivienda</h3>
      ${renderInfoBlock(form.housing)}
    </div>

    <div class="form-section">
      <h3 class="form-section-title">Experiencia y motivación</h3>
      ${renderInfoBlock(form.experience)}
    </div>

    <div class="form-section">
      <h3 class="form-section-title">Comentarios del adoptante</h3>
      <div class="form-info-block">
        <p class="form-comments-block">${form.comments}</p>
      </div>
    </div>
  `;
}

function initAdoptionFormModal(options = {}) {
  const overlay = document.getElementById('adoptionFormModal');
  if (!overlay) return null;

  const bodyEl = document.getElementById('adoptionFormBody');
  const subtitleEl = document.getElementById('formModalSubtitle');
  const submittedEl = document.getElementById('formSubmittedDate');
  const closeBtn = document.getElementById('closeFormModalBtn');
  const rejectBtn = document.getElementById('rejectFormBtn');
  const approveBtn = document.getElementById('approveFormBtn');
  const onToast = options.onToast || (() => {});

  let currentCode = '0001';

  function close() {
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  function open(code, fallback = {}) {
    currentCode = code;
    const form = ADOPTION_FORMS[code] || getDefaultForm(
      code,
      fallback.adopter || 'Adoptante',
      fallback.pet || 'Mascota',
      fallback.petInitial || 'M'
    );

    subtitleEl.textContent = `Adopción ${code} • ${form.adopter}`;
    submittedEl.textContent = `Enviado el ${form.submitted}`;
    bodyEl.innerHTML = renderAdoptionFormBody(form, code);

    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  closeBtn?.addEventListener('click', close);

  overlay.addEventListener('click', e => {
    if (e.target === overlay) close();
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && overlay.classList.contains('active')) close();
  });

  rejectBtn?.addEventListener('click', () => {
    close();
    onToast(`Formulario de adopción ${currentCode} rechazado.`);
  });

  approveBtn?.addEventListener('click', () => {
    close();
    onToast(`Formulario de adopción ${currentCode} aprobado.`);
  });

  return { open, close };
}
