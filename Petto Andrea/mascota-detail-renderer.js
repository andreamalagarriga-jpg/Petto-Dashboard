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

  // Quick data swap based on query string
  const PETS = {
    max:  { name: 'Max',  meta: 'Perro • Labrador • 3 años • ID: 1', img: 'assets/pets/max.jpg' },
    luna: { name: 'Luna', meta: 'Perro • Husky • 1 año • ID: 2', img: 'assets/pets/luna.jpg' },
    bella: { name: 'Bella', meta: 'Perro • Mestiza • 1 año • ID: 3', img: 'assets/pets/bella.jpg' },
    rocky: { name: 'Rocky', meta: 'Perro • Bulldog • 4 años • ID: 4', img: 'assets/pets/rocky.jpg' },
    milo: { name: 'Milo', meta: 'Gato • Persa • 3 años • ID: 5', img: 'assets/pets/milo.jpg' },
    nala: { name: 'Nala', meta: 'Gato • Mestiza • 2 años • ID: 6', img: 'assets/pets/nala.jpg' },
    simba: { name: 'Simba', meta: 'Gato • Siamés • 3 años • ID: 7', img: 'assets/pets/simba.jpg' },
    toby: { name: 'Toby', meta: 'Perro • Pastor Alemán • 5 años • ID: 8', img: 'assets/pets/toby.jpg' },
    coco: { name: 'Coco', meta: 'Perro • Caniche • 2 años • ID: 9', img: 'assets/pets/coco.jpg' },
    lola: { name: 'Lola', meta: 'Gata • Mestiza • 4 años • ID: 10', img: 'assets/pets/lola.jpg' },
  };
  const id = new URLSearchParams(window.location.search).get('id');
  if (id && PETS[id]) {
    const pet = PETS[id];
    document.getElementById('petName').textContent = pet.name;
    document.getElementById('petMeta').textContent = pet.meta;
    document.getElementById('petPhoto').src = pet.img;
    document.title = `Petto – ${pet.name}`;
  }

  // Tabs
  document.querySelectorAll('.adoptante-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.adoptante-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const target = tab.dataset.tab;
      document.querySelectorAll('.tab-panel').forEach(p => p.classList.toggle('active', p.dataset.panel === target));
    });
  });

  document.getElementById('editPetBtn')?.addEventListener('click', () => showToast('Modo edición activado'));
  document.getElementById('notificationBtn')?.addEventListener('click', () => showToast('2 notificaciones nuevas'));
  document.querySelectorAll('.link-action').forEach(b => b.addEventListener('click', () => showToast('Abriendo documento…')));
  document.querySelector('.logout-btn')?.addEventListener('click', e => { e.preventDefault(); showToast('Cierre de sesión simulado'); });
});
