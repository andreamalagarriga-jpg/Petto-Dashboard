// WAITING FOR DOM LOAD
document.addEventListener('DOMContentLoaded', () => {
  
  // 1. SIDEBAR NAVIGATION
  const navItems = document.querySelectorAll('.nav-item:not(.logout-btn)');
  const pageTitle = document.querySelector('.page-title');
  
  navItems.forEach(item => {
    item.addEventListener('click', (e) => {
      const href = item.getAttribute('href');
      if (href && href !== '#') {
        return;
      }
      e.preventDefault();
      
      // Remove active class from all
      navItems.forEach(nav => nav.classList.remove('active'));
      
      // Add active to clicked
      item.classList.add('active');
      
      // Change header page title
      const tabName = item.getAttribute('data-tab');
      const formattedTitle = item.textContent.trim();
      pageTitle.textContent = formattedTitle;
      
      // Play transition effect on title
      pageTitle.style.animation = 'none';
      pageTitle.offsetHeight; // trigger reflow
      pageTitle.style.animation = 'slideDown 0.3s ease-out';
      
      // Show subtle feedback if page other than 'Inicio'
      if (tabName !== 'inicio') {
        showToast(`Navegando a la sección de ${formattedTitle} (Simulación de prototipo)`);
      } else {
        showToast(`Regresando al Panel de Inicio`);
      }
    });
  });

  // Logout button feedback
  const logoutBtn = document.querySelector('.logout-btn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', (e) => {
      e.preventDefault();
      showToast('Cierre de sesión simulado. ¡Hasta pronto!');
    });
  }


  // 2. SEARCH BOX FILTERING
  const searchInput = document.getElementById('searchInput');
  const activityItems = document.querySelectorAll('.activity-item');
  
  searchInput.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase().trim();
    
    activityItems.forEach(item => {
      const searchData = item.getAttribute('data-search').toLowerCase();
      
      if (searchData.includes(query)) {
        item.style.display = 'flex';
        // Fade in back
        item.style.opacity = '1';
        item.style.transform = 'scale(1)';
      } else {
        // Soft fade out
        item.style.opacity = '0';
        item.style.transform = 'scale(0.95)';
        // Wait for transition before hiding completely
        setTimeout(() => {
          if (item.style.opacity === '0') {
            item.style.display = 'none';
          }
        }, 150);
      }
    });
  });


  // 3. GRAPH INTERACTIVE BARS & TOOLTIPS
  const barWrappers = document.querySelectorAll('.chart-bar-wrapper');
  const tooltip = document.getElementById('chartTooltip');
  const totalAdoptionsTitle = document.getElementById('totalAdoptionsTitle');
  const chartContainer = document.querySelector('.chart-container');

  // Store original YTD data for resetting
  const originalData = [
    { month: 'Ene', val: 28, height: '50%' },
    { month: 'Feb', val: 42, height: '75%' },
    { month: 'Mar', val: 25, height: '45%' },
    { month: 'Abr', val: 36, height: '65%' },
    { month: 'May', val: 18, height: '32%' },
    { month: 'Jun', val: 60, height: '98%' },
    { month: 'Jul', val: 48, height: '85%' },
    { month: 'Ago', val: 50, height: '88%' },
    { month: 'Sep', val: 22, height: '40%' },
    { month: 'Oct', val: 38, height: '70%' },
    { month: 'Nov', val: 28, height: '50%' },
    { month: 'Dic', val: 25, height: '45%' }
  ];

  let currentViewIsMonthly = true;

  // Helper: Generate simulated data with skewed distribution for high visual variance
  function generateSimulatedData(total, count = 12) {
    // Use an exponential-biased weighting so some bars spike and some stay low
    let weights = Array.from({ length: count }, () => Math.pow(Math.random(), 0.5));
    const weightSum = weights.reduce((a, b) => a + b, 0);
    
    // First pass: assign fractional amounts
    let data = weights.map(w => Math.floor((w / weightSum) * total));
    
    // Fix any rounding remainder
    let assigned = data.reduce((a, b) => a + b, 0);
    let diff = total - assigned;
    // Add remainder to the highest-weighted bars
    const sortedIdx = weights
      .map((w, i) => ({ w, i }))
      .sort((a, b) => b.w - a.w);
    for (let i = 0; i < diff; i++) {
      data[sortedIdx[i % count].i]++;
    }
    
    return data;
  }

  // Update chart bars with true proportional heights (allows near-zero for low values)
  function updateChartBars(dataArray, labelPrefix = '') {
    const maxVal = Math.max(...dataArray, 1);
    
    barWrappers.forEach((wrapper, index) => {
      const newVal = dataArray[index];
      
      // Map 0 → 5%, max → 95%, everything else scales linearly
      const percentHeight = newVal === 0
        ? 5
        : Math.round(5 + (newVal / maxVal) * 90);
      
      // Update element attributes
      wrapper.setAttribute('data-val', newVal);
      
      // Update styling to trigger animated transition
      const bar = wrapper.querySelector('.chart-bar');
      bar.style.setProperty('--bar-height', `${percentHeight}%`);
      bar.style.height = `${percentHeight}%`;
      
      // Update label
      const label = wrapper.querySelector('.month-label');
      if (labelPrefix) {
        label.textContent = `${labelPrefix}${index + 1}`;
      } else {
        label.textContent = originalData[index].month;
      }
    });
  }

  barWrappers.forEach(barWrapper => {
    // Tooltip Hover logic - dynamic text reading
    barWrapper.addEventListener('mousemove', (e) => {
      const currentVal = barWrapper.getAttribute('data-val');
      tooltip.textContent = `${currentVal} Adopciones`;
      tooltip.style.opacity = '1';
      
      const containerRect = chartContainer.getBoundingClientRect();
      const wrapperRect = barWrapper.getBoundingClientRect();
      
      const left = (wrapperRect.left - containerRect.left) + (wrapperRect.width / 2);
      const top = (wrapperRect.top - containerRect.top);
      
      tooltip.style.left = `${left}px`;
      tooltip.style.top = `${top}px`;
    });
    
    barWrapper.addEventListener('mouseleave', () => {
      tooltip.style.opacity = '0';
    });
    
    // Click on bar updates main total and triggers sub-data animations
    barWrapper.addEventListener('click', () => {
      const val = parseInt(barWrapper.getAttribute('data-val'));
      const month = barWrapper.getAttribute('data-month');
      
      // Prevent nesting breakdowns infinitely
      if (!currentViewIsMonthly) {
        showToast('Presione "Todo el año" para regresar a la vista mensual');
        return;
      }

      currentViewIsMonthly = false;

      // Toggle active states
      barWrappers.forEach(b => b.classList.remove('active'));
      barWrapper.classList.add('active');
      
      // Update heading text
      totalAdoptionsTitle.innerHTML = `<span class="count">${val}</span> Adopciones`;
      
      const subtitle = totalAdoptionsTitle.nextElementSibling;
      let monthFull = "";
      switch (month) {
        case 'Ene': monthFull = 'Enero'; break;
        case 'Feb': monthFull = 'Febrero'; break;
        case 'Mar': monthFull = 'Marzo'; break;
        case 'Abr': monthFull = 'Abril'; break;
        case 'May': monthFull = 'Mayo'; break;
        case 'Jun': monthFull = 'Junio'; break;
        case 'Jul': monthFull = 'Julio'; break;
        case 'Ago': monthFull = 'Agosto'; break;
        case 'Sep': monthFull = 'Septiembre'; break;
        case 'Oct': monthFull = 'Octubre'; break;
        case 'Nov': monthFull = 'Noviembre'; break;
        case 'Dic': monthFull = 'Diciembre'; break;
      }
      subtitle.textContent = `Tendencia semanal - ${monthFull} 2026`;
      
      // Animate header pulse
      const headingCount = totalAdoptionsTitle.querySelector('.count');
      headingCount.style.transform = 'scale(1.2)';
      headingCount.style.transition = 'transform 0.15s ease-out';
      setTimeout(() => {
        headingCount.style.transform = 'scale(1)';
      }, 150);

      // Generate simulated weekly/period variations for the month
      const simulatedWeeklyData = generateSimulatedData(val, 12);
      updateChartBars(simulatedWeeklyData, 'S'); // 'S' for Semana/Period
      showToast(`Mostrando desglose de ${monthFull} (${val} adopciones)`);
    });
  });

  // Clicking outside graph reset (Todo el año trigger)
  const dropdownTrigger = document.querySelector('.dropdown-trigger');
  dropdownTrigger.addEventListener('click', (e) => {
    e.stopPropagation();
    currentViewIsMonthly = true;

    // Reset graph selection
    barWrappers.forEach(b => b.classList.remove('active'));
    
    // Set default month June back to active
    const juneWrapper = document.querySelector('[data-month="Jun"]');
    juneWrapper.classList.add('active');
    
    // Reset heading
    totalAdoptionsTitle.innerHTML = `<span class="count">420</span> Adopciones`;
    totalAdoptionsTitle.nextElementSibling.textContent = 'Enero-Diciembre 2026';
    
    // Restore original monthly chart values and height properties
    const originalVals = originalData.map(d => d.val);
    updateChartBars(originalVals);
    
    showToast('Gráfico restablecido al total anual');
  });


  // 4. INTERACTIVE CALENDAR SELECTION
  const calendarDays = document.querySelectorAll('.dates-grid span');
  const dateFilterDisplay = document.getElementById('currentDateDisplay');
  
  calendarDays.forEach(day => {
    day.addEventListener('click', () => {
      // Ignore click on prev/next month days for this demo, or support them
      const isPrev = day.classList.contains('prev-month');
      const isNext = day.classList.contains('next-month');
      
      // Remove selected class
      calendarDays.forEach(d => d.classList.remove('current-day'));
      day.classList.add('current-day');
      
      let dateString = '';
      if (isPrev) {
        dateString = `${day.textContent} de Marzo 2026`;
        dateFilterDisplay.textContent = 'Marzo 2026';
      } else if (isNext) {
        dateString = `${day.textContent} de Mayo 2026`;
        dateFilterDisplay.textContent = 'Mayo 2026';
      } else {
        dateString = `${day.textContent} de Abril 2026`;
        dateFilterDisplay.textContent = 'Abril 2026';
      }
      
      showToast(`Fecha seleccionada: ${dateString}`);
      
      // Update stats count briefly to simulate daily filter
      animateCounter(document.querySelector('[data-stat="solicitudes"] .stat-number'), Math.floor(Math.random() * 15) + 2);
      animateCounter(document.querySelector('[data-stat="formularios"] .stat-number'), Math.floor(Math.random() * 10) + 1);
      animateCounter(document.querySelector('[data-stat="visitas"] .stat-number'), Math.floor(Math.random() * 8) + 1);
    });
  });


  // 5. ADD ANIMAL MODAL & SUBMIT
  const addAnimalBanner = document.getElementById('addAnimalBanner');
  const addAnimalModal = document.getElementById('addAnimalModal');
  const closeModalBtn = document.getElementById('closeModalBtn');
  const addAnimalForm = document.getElementById('addAnimalForm');
  const availablePetsCount = document.getElementById('availablePetsCount');
  const activityList = document.getElementById('activityList');
  
  // Open modal
  addAnimalBanner.addEventListener('click', () => {
    addAnimalModal.classList.add('active');
    document.getElementById('petName').focus();
  });
  
  // Close modal
  closeModalBtn.addEventListener('click', () => {
    addAnimalModal.classList.remove('active');
  });
  
  // Close modal clicking outside
  addAnimalModal.addEventListener('click', (e) => {
    if (e.target === addAnimalModal) {
      addAnimalModal.classList.remove('active');
    }
  });

  // Submit new animal
  addAnimalForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const petName = document.getElementById('petName').value.trim();
    const petType = document.getElementById('petType').value;
    const petSize = document.getElementById('petSize').value;
    const adopterName = document.getElementById('adopterName').value.trim();
    const petStatus = document.getElementById('petStatus').value;
    
    // 1. Close Modal
    addAnimalModal.classList.remove('active');
    
    // 2. Animate counter of available pets (increment by 1)
    const currentVal = parseInt(availablePetsCount.textContent);
    animateCounter(availablePetsCount, currentVal + 1);
    
    // 3. Prepend new activity item in DOM
    const newItem = document.createElement('div');
    newItem.className = 'activity-item';
    
    // Define type-specific styling
    let iconBgClass = 'blue-bg';
    let statusClass = 'alert-tag';
    let iconSvg = '';
    
    // Setup Icon based on type
    if (petType === 'Perro') {
      iconBgClass = 'blue-bg';
      iconSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5c.67 0 1.2-.32 1.6-.75a3 3 0 0 0-4.8 0c.4.43.93.75 1.6.75Z"/><path d="M19 8c.67 0 1.2-.32 1.6-.75a3 3 0 0 0-4.8 0c.4.43.93.75 1.6.75Z"/><path d="M5 8c.67 0 1.2-.32 1.6-.75a3 3 0 0 0-4.8 0c.4.43.93.75 1.6.75Z"/><path d="M12 12c-2.2 0-4 1.8-4 4s1.8 4 4 4 4-1.8 4-4-1.8-4-4-4Z"/><path d="M19 14c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2Z"/><path d="M5 14c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2Z"/></svg>`;
    } else if (petType === 'Gato') {
      iconBgClass = 'pink-bg';
      iconSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2c-.67 0-1.2.32-1.6.75a3 3 0 0 0 4.8 0c-.4-.43-.93-.75-1.6-.75Z"/><circle cx="12" cy="13" r="5"/><path d="M12 18v2"/></svg>`;
    } else {
      iconBgClass = 'orange-bg';
      iconSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 8v4"/><path d="M12 16h.01"/></svg>`;
    }
    
    // Status Badge class setup
    if (petStatus === 'En proceso') statusClass = 'progress-tag';
    else if (petStatus === 'Completada') statusClass = 'success-tag';
    else statusClass = 'alert-tag';
    
    // Formulate details and search index tags
    const titleText = adopterName ? 'Nueva solicitud de adopción' : 'Nuevo registro de mascota';
    const detailText = adopterName ? `${adopterName} - ${petName} (${petSize})` : `${petName} - Registro directo (${petSize})`;
    
    newItem.setAttribute('data-search', `${titleText} ${detailText} ${petStatus}`.toLowerCase());
    
    newItem.innerHTML = `
      <div class="activity-left">
        <div class="activity-icon ${iconBgClass}">
          ${iconSvg}
        </div>
        <div class="activity-text">
          <h4 class="title">${titleText}</h4>
          <p class="details">${detailText}</p>
        </div>
      </div>
      <div class="activity-right">
        <span class="status-badge ${statusClass}">${petStatus}</span>
        <span class="time">1m</span>
      </div>
    `;
    
    // Style for initial animation state (slid up/collapsed)
    newItem.style.maxHeight = '0px';
    newItem.style.opacity = '0';
    newItem.style.padding = '0px 16px';
    newItem.style.overflow = 'hidden';
    newItem.style.borderBottom = 'none';
    newItem.style.transition = 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
    
    // Add to top of list
    activityList.insertBefore(newItem, activityList.firstChild);
    
    // Trigger animation to expand and slide in
    setTimeout(() => {
      newItem.style.maxHeight = '80px';
      newItem.style.opacity = '1';
      newItem.style.padding = '14px 16px';
      newItem.style.borderBottom = '1.5px solid var(--border-color)';
    }, 50);
    
    // Reset form fields
    addAnimalForm.reset();
    document.getElementById('petStatus').value = 'Pendiente';
    document.getElementById('petSize').value = 'Perro mediano';
    document.getElementById('petType').value = 'Perro';
    
    // 4. Show custom Toast
    showToast(`¡${petName} ha sido agregado con éxito!`);
  });


  // 6. BELL NOTIFICATION DROPDOWN
  const notificationBtn = document.getElementById('notificationBtn');
  const notificationDropdown = document.getElementById('notificationDropdown');
  const notificationBadge = document.getElementById('notificationBadge');
  const clearNotifications = document.getElementById('clearNotifications');
  
  notificationBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    notificationDropdown.classList.toggle('active');
  });
  
  // Click item marks it read
  const notificationItems = document.querySelectorAll('.notification-item');
  notificationItems.forEach(item => {
    item.addEventListener('click', (e) => {
      e.stopPropagation();
      if (!item.classList.contains('read')) {
        item.classList.add('read');
        decrementBadge();
      }
    });
  });
  
  // Clear all notifications
  clearNotifications.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    notificationItems.forEach(item => {
      if (!item.classList.contains('read')) {
        item.classList.add('read');
      }
    });
    
    notificationBadge.style.display = 'none';
    showToast('Todas las notificaciones marcadas como leídas');
    notificationDropdown.classList.remove('active');
  });
  
  // Close dropdown on click outside
  document.addEventListener('click', () => {
    notificationDropdown.classList.remove('active');
  });
  
  notificationDropdown.addEventListener('click', (e) => {
    e.stopPropagation(); // prevent closing when clicking inside panel
  });


  // HELPER FUNCTIONS
  
  // Animate counter values
  function animateCounter(element, targetValue) {
    const startValue = parseInt(element.textContent);
    const duration = 800; // ms
    const startTime = performance.now();
    
    function updateCounter(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Ease out quad formula
      const easeProgress = progress * (2 - progress);
      const currentValue = Math.floor(startValue + (targetValue - startValue) * easeProgress);
      
      element.textContent = currentValue;
      
      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      } else {
        element.textContent = targetValue;
      }
    }
    
    requestAnimationFrame(updateCounter);
  }

  // Toast notifier
  const toast = document.getElementById('successToast');
  const toastMessage = document.getElementById('toastMessage');
  let toastTimeout;
  
  function showToast(message) {
    toastMessage.textContent = message;
    toast.classList.add('active');
    
    // Clear previous timeout if user triggers multiple toasts rapidly
    if (toastTimeout) clearTimeout(toastTimeout);
    
    toastTimeout = setTimeout(() => {
      toast.classList.remove('active');
    }, 3000);
  }
  
  // Decrement notifications badge
  function decrementBadge() {
    const currentVal = parseInt(notificationBadge.textContent);
    if (currentVal > 1) {
      notificationBadge.textContent = currentVal - 1;
    } else {
      notificationBadge.style.display = 'none';
    }
  }

});
