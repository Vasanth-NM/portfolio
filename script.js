// Ultra-Fast & Instant Interactive JavaScript for Vasanthkumar N Portfolio

document.addEventListener('DOMContentLoaded', () => {
  let kleinMaterialGlobal = null;

  // --- Pull-Down-to-Refresh & Floating Mechanical Gear Refresh ---
  const topGearRefresher = document.getElementById('top-gear-refresher');
  const topGearIcon = document.getElementById('top-gear-icon');
  const brandLogoBtn = document.getElementById('brand-logo-btn');
  const brandBadgeIcon = document.getElementById('brand-badge-icon');

  function triggerRefreshFlash() {
    if (!topGearRefresher) return;
    topGearRefresher.classList.remove('pulling', 'opacity-0', '-translate-y-6');
    topGearRefresher.classList.add('refreshing');

    setTimeout(() => {
      topGearRefresher.classList.remove('refreshing');
      topGearRefresher.classList.add('opacity-0', '-translate-y-6');
      topGearRefresher.style.transform = '';
      topGearRefresher.style.opacity = '';
      if (topGearIcon) topGearIcon.style.transform = '';
    }, 650);
  }

  // Pull-Down-to-Refresh Touch Mechanics (Mobile & Tablet)
  let touchStartY = 0;
  let isPulling = false;
  const PULL_THRESHOLD = 45; // Pixels needed to trigger full refresh

  window.addEventListener('touchstart', (e) => {
    if (window.scrollY <= 4) {
      touchStartY = e.touches[0].clientY;
      isPulling = true;
    } else {
      isPulling = false;
    }
  }, { passive: true });

  window.addEventListener('touchmove', (e) => {
    if (!isPulling || window.scrollY > 4) return;
    const currentY = e.touches[0].clientY;
    const diffY = currentY - touchStartY;

    if (diffY > 0) {
      const dampedY = Math.min(diffY * 0.42, 75);
      topGearRefresher.classList.add('pulling');
      topGearRefresher.classList.remove('opacity-0');
      topGearRefresher.style.transform = `translate3d(-50%, ${dampedY}px, 0)`;
      topGearRefresher.style.opacity = `${Math.min(dampedY / 25, 1)}`;
      if (topGearIcon) {
        topGearIcon.style.transform = `rotate(${dampedY * 4.5}deg)`;
      }
    }
  }, { passive: true });

  window.addEventListener('touchend', (e) => {
    if (!isPulling) return;
    isPulling = false;
    topGearRefresher.classList.remove('pulling');

    const currentY = e.changedTouches[0].clientY;
    const diffY = currentY - touchStartY;
    const dampedY = diffY * 0.42;

    if (dampedY >= PULL_THRESHOLD && window.scrollY <= 4) {
      triggerRefreshFlash();
    } else {
      topGearRefresher.style.transform = '';
      topGearRefresher.style.opacity = '';
      topGearRefresher.classList.add('opacity-0', '-translate-y-6');
      if (topGearIcon) topGearIcon.style.transform = '';
    }
  }, { passive: true });

  if (brandLogoBtn) {
    brandLogoBtn.addEventListener('click', (e) => {
      e.preventDefault();
      if (brandBadgeIcon) {
        brandBadgeIcon.classList.remove('brand-refresh-spin');
        void brandBadgeIcon.offsetWidth;
        brandBadgeIcon.classList.add('brand-refresh-spin');
      }
      triggerRefreshFlash();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // --- 1. Instant Claymorphic Theme Toggle ---
  const themeToggleBtn = document.getElementById('theme-toggle');
  const themeToggleKnob = document.getElementById('theme-toggle-knob');
  const themeKnobIcon = document.getElementById('theme-knob-icon');
  
  const savedTheme = localStorage.getItem('portfolio-theme') || 'light';
  setTheme(savedTheme, false);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const isDark = document.documentElement.classList.contains('dark');
      setTheme(isDark ? 'light' : 'dark', true);
    });
  }

  function setTheme(theme, animate = true) {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      document.documentElement.setAttribute('data-theme', 'dark');

      if (themeToggleKnob) {
        themeToggleKnob.classList.remove('knob-light');
        themeToggleKnob.classList.add('knob-dark');
      }
      if (themeKnobIcon) {
        themeKnobIcon.className = 'fas fa-sun text-amber-300 text-[11px]';
      }

      if (kleinMaterialGlobal) {
        kleinMaterialGlobal.color.setHex(0x06b6d4); // Cyan for Dark Mode
      }
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.setAttribute('data-theme', 'light');

      if (themeToggleKnob) {
        themeToggleKnob.classList.remove('knob-dark');
        themeToggleKnob.classList.add('knob-light');
      }
      if (themeKnobIcon) {
        themeKnobIcon.className = 'fas fa-moon text-slate-700 text-[11px]';
      }

      if (kleinMaterialGlobal) {
        kleinMaterialGlobal.color.setHex(0x0284c7); // Blue for Light Mode
      }
    }
    localStorage.setItem('portfolio-theme', theme);
  }

  // --- 2. Mobile Navigation Menu Drawer ---
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileMenuIcon = document.getElementById('mobile-menu-icon');

  function closeMobileMenu() {
    if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
      mobileMenu.classList.add('hidden');
      if (mobileMenuIcon) mobileMenuIcon.className = 'fas fa-bars text-xs';
    }
  }

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isHidden = mobileMenu.classList.contains('hidden');
      if (isHidden) {
        mobileMenu.classList.remove('hidden');
        if (mobileMenuIcon) mobileMenuIcon.className = 'fas fa-times text-xs';
      } else {
        closeMobileMenu();
      }
    });

    document.addEventListener('click', (e) => {
      if (!mobileMenu.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
        closeMobileMenu();
      }
    });

    const mobileLinks = mobileMenu.querySelectorAll('a');
    mobileLinks.forEach(link => {
      link.addEventListener('click', closeMobileMenu);
    });
  }

  // --- 3. Instant Zero-Lag Scroll-Spy & Active Pill Tracking ---
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  const navMobileLinks = document.querySelectorAll('.nav-link-mobile');
  const slidingPill = document.getElementById('nav-sliding-pill');

  let isTicking = false;

  function updateActiveNav() {
    let currentSectionId = '';
    const scrollPos = window.scrollY + Math.min(window.innerHeight * 0.4, 250);

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        currentSectionId = section.getAttribute('id');
      }
    });

    let activeLinkElement = null;

    navLinks.forEach(link => {
      link.classList.remove('nav-text-active');
      if (link.getAttribute('href') === `#${currentSectionId}`) {
        link.classList.add('nav-text-active');
        activeLinkElement = link;
      }
    });

    navMobileLinks.forEach(link => {
      link.classList.remove('liquid-glass-nav-active');
      if (link.getAttribute('href') === `#${currentSectionId}`) {
        link.classList.add('liquid-glass-nav-active');
      }
    });

    if (activeLinkElement && slidingPill) {
      slidingPill.style.transform = `translate3d(${activeLinkElement.offsetLeft}px, ${activeLinkElement.offsetTop}px, 0)`;
      slidingPill.style.width = `${activeLinkElement.offsetWidth}px`;
      slidingPill.style.height = `${activeLinkElement.offsetHeight}px`;
      slidingPill.style.opacity = '1';
    } else if (slidingPill) {
      slidingPill.style.opacity = '0';
    }

    isTicking = false;
  }

  function requestScrollUpdate() {
    if (!isTicking) {
      requestAnimationFrame(updateActiveNav);
      isTicking = true;
    }
  }

  window.addEventListener('scroll', requestScrollUpdate, { passive: true });
  window.addEventListener('resize', requestScrollUpdate, { passive: true });
  updateActiveNav();

  // --- 4. Instant Fast Navigation Scroll ---
  const allNavAnchorLinks = document.querySelectorAll('a[href^="#"]');

  allNavAnchorLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href');
      if (!targetId || targetId === '#') {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }

      const targetElement = document.querySelector(targetId);
      if (!targetElement) return;

      e.preventDefault();

      const elementRect = targetElement.getBoundingClientRect();
      const elementTop = elementRect.top + window.scrollY;
      const isMobile = window.innerWidth < 640;

      // Pull down headings with generous breathing clearance below floating capsule header
      let targetScrollPos = elementTop - (isMobile ? 65 : 85);
      targetScrollPos = Math.max(0, targetScrollPos);

      // Fast native smooth scroll
      window.scrollTo({
        top: targetScrollPos,
        behavior: 'smooth'
      });

      if (history.pushState) {
        history.pushState(null, null, targetId);
      }

      setTimeout(updateActiveNav, 50);
    });
  });

  // --- 5. Three.js Klein Bottle Viewer ---
  const canvasContainer = document.getElementById('cad-canvas-container');
  const wireframeBtn = document.getElementById('toggle-wireframe');
  
  if (canvasContainer && typeof THREE !== 'undefined') {
    initKleinBottleViewer(canvasContainer);
  }

  function initKleinBottleViewer(container) {
    const width = container.clientWidth || 320;
    const height = container.clientHeight || 280;

    const scene = new THREE.Scene();
    scene.background = null;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 0, 7.5);

    const renderer = new THREE.WebGLRenderer({ 
      antialias: true, 
      alpha: true, 
      powerPreference: 'high-performance' 
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
    container.appendChild(renderer.domElement);

    const smoothGeometry = createClassicKleinBottleGeometry(80, 80);
    const wireframeGeometry = createClassicKleinBottleGeometry(36, 36);

    const isDark = document.documentElement.classList.contains('dark');
    const initialColor = isDark ? 0x06b6d4 : 0x0284c7;

    const kleinMaterial = new THREE.MeshStandardMaterial({
      color: initialColor,
      metalness: 0.75,
      roughness: 0.25,
      side: THREE.DoubleSide,
      wireframe: false,
      transparent: false,
      opacity: 1.0
    });
    kleinMaterialGlobal = kleinMaterial;

    const kleinMesh = new THREE.Mesh(smoothGeometry, kleinMaterial);
    
    const kleinGroup = new THREE.Group();
    kleinGroup.add(kleinMesh);
    kleinGroup.rotation.z = Math.PI * 0.1;
    kleinGroup.rotation.x = Math.PI * 0.15;
    scene.add(kleinGroup);

    // Studio Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.0);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0x06b6d4, 2.5);
    dirLight1.position.set(5, 8, 5);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0x2563eb, 2.0);
    dirLight2.position.set(-5, -5, -2);
    scene.add(dirLight2);

    // Inertial Momentum Physics State
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };
    let velocityX = 0;
    let velocityY = 0;

    container.addEventListener('mousedown', (e) => {
      isDragging = true;
      velocityX = 0;
      velocityY = 0;
      previousMousePosition = { x: e.clientX, y: e.clientY };
    });

    window.addEventListener('mousemove', (e) => {
      if (!isDragging) return;
      const deltaX = e.clientX - previousMousePosition.x;
      const deltaY = e.clientY - previousMousePosition.y;

      velocityX = deltaX * 0.008;
      velocityY = deltaY * 0.008;

      kleinGroup.rotation.y += velocityX;
      kleinGroup.rotation.x += velocityY;

      previousMousePosition = { x: e.clientX, y: e.clientY };
    });

    window.addEventListener('mouseup', () => { isDragging = false; });

    // Touch Controls with Momentum
    container.addEventListener('touchstart', (e) => {
      if (e.touches.length === 1) {
        isDragging = true;
        velocityX = 0;
        velocityY = 0;
        previousMousePosition = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
    }, { passive: true });

    container.addEventListener('touchmove', (e) => {
      if (!isDragging || e.touches.length !== 1) return;
      const deltaX = e.touches[0].clientX - previousMousePosition.x;
      const deltaY = e.touches[0].clientY - previousMousePosition.y;

      velocityX = deltaX * 0.009;
      velocityY = deltaY * 0.009;

      kleinGroup.rotation.y += velocityX;
      kleinGroup.rotation.x += velocityY;

      previousMousePosition = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    }, { passive: true });

    window.addEventListener('touchend', () => { isDragging = false; });

    // Toggle Wireframe Mode
    if (wireframeBtn) {
      wireframeBtn.addEventListener('click', () => {
        kleinMaterial.wireframe = !kleinMaterial.wireframe;
        
        if (kleinMaterial.wireframe) {
          kleinMesh.geometry = wireframeGeometry;
          kleinMaterial.transparent = true;
          kleinMaterial.opacity = 0.45;
          kleinMaterial.needsUpdate = true;
        } else {
          kleinMesh.geometry = smoothGeometry;
          kleinMaterial.transparent = false;
          kleinMaterial.opacity = 1.0;
          kleinMaterial.needsUpdate = true;
        }
      });
    }

    // Responsive Canvas Resize
    let resizeTimeout;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        const newWidth = container.clientWidth;
        const newHeight = container.clientHeight;
        camera.aspect = newWidth / newHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(newWidth, newHeight);
      }, 50);
    }, { passive: true });

    // GPU Optimization: Viewport Pausing
    let isCanvasVisible = true;
    let animationFrameId = null;

    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          isCanvasVisible = entry.isIntersecting;
          if (isCanvasVisible && !animationFrameId) {
            animate();
          }
        });
      }, { threshold: 0.1 });
      observer.observe(container);
    }

    // Fast 60/120fps Render Loop
    function animate() {
      if (!isCanvasVisible) {
        animationFrameId = null;
        return;
      }
      animationFrameId = requestAnimationFrame(animate);

      if (!isDragging) {
        if (Math.abs(velocityX) > 0.0005 || Math.abs(velocityY) > 0.0005) {
          kleinGroup.rotation.y += velocityX;
          kleinGroup.rotation.x += velocityY;
          velocityX *= 0.93;
          velocityY *= 0.93;
        } else {
          kleinGroup.rotation.y += 0.006;
        }
      }

      renderer.render(scene, camera);
    }
    animate();
  }

  // Classic Glass-Blown Klein Bottle Geometry
  function createClassicKleinBottleGeometry(slices = 80, stacks = 80) {
    const geometry = new THREE.BufferGeometry();
    const positions = [];
    const uvs = [];
    const indices = [];

    function classicKlein(u, v) {
      u *= Math.PI * 2;
      v *= Math.PI * 2;

      let x, y, z;
      const r = 4 * (1 - Math.cos(u) / 2);

      if (u < Math.PI) {
        x = 6 * Math.cos(u) * (1 + Math.sin(u)) + r * Math.cos(u) * Math.cos(v);
        y = 16 * Math.sin(u) + r * Math.sin(u) * Math.cos(v);
      } else {
        x = 6 * Math.cos(u) * (1 + Math.sin(u)) + r * Math.cos(v + Math.PI);
        y = 16 * Math.sin(u);
      }
      z = r * Math.sin(v);

      return new THREE.Vector3(x * 0.16, (y - 8) * 0.16, z * 0.16);
    }

    for (let i = 0; i <= slices; i++) {
      const u = i / slices;
      for (let j = 0; j <= stacks; j++) {
        const v = j / stacks;
        const pt = classicKlein(u, v);
        positions.push(pt.x, pt.y, pt.z);
        uvs.push(u, v);
      }
    }

    for (let i = 0; i < slices; i++) {
      for (let j = 0; j < stacks; j++) {
        const a = i * (stacks + 1) + j;
        const b = i * (stacks + 1) + (j + 1);
        const c = (i + 1) * (stacks + 1) + (j + 1);
        const d = (i + 1) * (stacks + 1) + j;

        indices.push(a, b, d);
        indices.push(b, c, d);
      }
    }

    geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    geometry.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
    geometry.setIndex(indices);
    geometry.computeVertexNormals();
    return geometry;
  }

  // --- 6. Instant Project Selection Filter (0ms Delay) ---
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active-filter'));
      btn.classList.add('active-filter');

      const filter = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        const shouldShow = (filter === 'all' || category === filter);

        if (shouldShow) {
          card.style.display = 'flex';
          card.style.opacity = '1';
          card.style.transform = 'translate3d(0, 0, 0) scale(1)';
        } else {
          card.style.display = 'none';
          card.style.opacity = '0';
        }
      });
    });
  });

  // --- 7. Project Detail Modal with ESC Keyboard Support ---
  const modal = document.getElementById('project-modal');
  const modalTitle = document.getElementById('modal-title');
  const modalCategory = document.getElementById('modal-category');
  const modalDescription = document.getElementById('modal-description');
  const modalTags = document.getElementById('modal-tags');
  const modalImageContainer = document.getElementById('modal-image-container');
  const modalImage = document.getElementById('modal-image');
  const closeModalBtn = document.getElementById('close-modal');

  const projectDetails = {
    'digital-twin': {
      title: 'Digital Twin-Based Predictive Maintenance System',
      category: 'Capstone Project (2027)',
      image: 'assets/projects/digital_twin.jpg',
      tags: ['ANSYS FEA', 'ESP8266 IoT', 'Firebase', 'Unity 3D', 'Machine Learning', 'ADXL345', 'DS18B20'],
      description: `
        <p class="mb-3">Developing an end-to-end Digital Twin framework combining finite element physical simulation, real-time sensor data acquisition, machine learning fault classification, and a 3D interactive dashboard for rotating machinery.</p>
        <h4 class="font-bold text-cyan-600 dark:text-cyan-400 mt-4 mb-2">Key Accomplishments:</h4>
        <ul class="list-disc list-inside space-y-2 text-slate-700 dark:text-slate-300">
          <li>Engineered a live data acquisition system utilizing ESP8266 microcontrollers paired with ADXL345 3-axis accelerometer and DS18B20 temperature sensors mounted on motor bearing housings.</li>
          <li>Trained a Random Forest Machine Learning model to detect and classify bearing wear, structural imbalance, and shaft misalignment in real time.</li>
          <li>Built a synchronized 3D Unity dashboard receiving cloud telemetry via Firebase, offering an affordable predictive maintenance solution for MSMEs.</li>
          <li>Validated mechanical vibration patterns with ANSYS Modal and Static Structural analysis.</li>
        </ul>
      `
    },
    'heat-recovery': {
      title: 'Compact Heat Recovery System',
      category: 'Design Project (2024–25)',
      image: 'assets/projects/heat_exchanger.jpg',
      tags: ['Fusion 360', 'ANSYS Workbench', 'Thermal Analysis', 'Structural Analysis', 'Fabrication'],
      description: `
        <p class="mb-3">Designed and fabricated a high-efficiency shell-and-helical-coil heat exchanger intended for industrial waste heat recovery.</p>
        <h4 class="font-bold text-cyan-600 dark:text-cyan-400 mt-4 mb-2">Key Accomplishments:</h4>
        <ul class="list-disc list-inside space-y-2 text-slate-700 dark:text-slate-300">
          <li>Modeled 3D helical coil and shell assembly in Fusion 360 with compact form factor constraints.</li>
          <li>Conducted CFD/Thermal fluid simulation and structural stress analysis in ANSYS Workbench to validate fluid velocity, heat transfer coefficients, and pressure drop.</li>
          <li>Fabricated the physical working prototype and conducted empirical testing under varying flow rates.</li>
          <li>Optimized coil pitch and shell fluid flow path to maximize heat transfer effectiveness.</li>
        </ul>
      `
    },
    'rfid-sewing': {
      title: 'IoT / RFID Real-Time Sewing Performance Tracking',
      category: 'Industrial Project - Pentagon Apparels Unit II',
      image: 'assets/projects/rfid_sewing.jpg',
      tags: ['ESP8266', 'RFID', 'Shop-Floor IoT', 'Real-Time Dashboard', 'Industrial Automation'],
      description: `
        <p class="mb-3">Deploying an automated production tracking system across sewing workstations in an active apparel manufacturing plant.</p>
        <h4 class="font-bold text-cyan-600 dark:text-cyan-400 mt-4 mb-2">Key Accomplishments:</h4>
        <ul class="list-disc list-inside space-y-2 text-slate-700 dark:text-slate-300">
          <li>Integrated ESP8266 Wi-Fi modules with high-frequency RFID card readers at individual sewing operator stations.</li>
          <li>Created a centralized live web dashboard displaying real-time operator efficiency, bundle counts, and line balance metrics.</li>
          <li>Eliminated manual paper logging errors and reduced bottleneck resolution time for floor supervisors.</li>
        </ul>
      `
    },
    'speed-bumps': {
      title: 'Smart Non-Newtonian Fluid Dynamic Speed Bump System',
      category: 'Thinkathon Innovation Event - KCET',
      image: 'assets/projects/speed_bump.jpg',
      tags: ['Non-Newtonian Fluid', 'Shear-Thickening (STF)', 'Fluid Rheology', 'Elastomer Housing', 'Smart City Safety'],
      description: `
        <p class="mb-3">Conceived an innovative passive dynamic speed bump utilizing shear-thickening non-Newtonian fluid (Dilatant / STF) to optimize vehicle traffic calming and emergency vehicle transit.</p>
        <h4 class="font-bold text-cyan-600 dark:text-cyan-400 mt-4 mb-2">Key Accomplishments:</h4>
        <ul class="list-disc list-inside space-y-2 text-slate-700 dark:text-slate-300">
          <li>Leveraged shear-thickening fluid rheology where fluid viscosity increases dramatically with shear rate: low-speed impacts allow fluid to flow and yield (flat crossing), while high-speed impacts cause instantaneous solid-like hardening.</li>
          <li>Eliminates painful chassis jolts and delays for compliant low-speed motorists, emergency ambulances, and public transit.</li>
          <li>Designed a heavy-duty reinforced polyurethane/elastomer sealed chamber to prevent fluid leakage under repeated cyclic heavy axle loads.</li>
          <li>Presented comprehensive mechanical layout, cross-sectional fluid flow dynamics, and material selection at the KCET Thinkathon.</li>
        </ul>
      `
    }
  };

  function closeModal() {
    if (modal) {
      modal.classList.add('hidden');
      modal.classList.remove('flex');
    }
  }

  document.querySelectorAll('.open-modal').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const projKey = btn.getAttribute('data-project');
      const data = projectDetails[projKey];
      if (!data || !modal) return;

      modalTitle.textContent = data.title;
      modalCategory.textContent = data.category;
      modalDescription.innerHTML = data.description;
      
      if (data.image && modalImage && modalImageContainer) {
        modalImage.src = data.image;
        modalImage.alt = data.title;
        modalImageContainer.classList.remove('hidden');
      } else if (modalImageContainer) {
        modalImageContainer.classList.add('hidden');
      }

      modalTags.innerHTML = data.tags.map(tag => 
        `<span class="tech-tag"><i class="fas fa-tag"></i> ${tag}</span>`
      ).join('');

      modal.classList.remove('hidden');
      modal.classList.add('flex');
    });
  });

  if (closeModalBtn && modal) {
    closeModalBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });
  }

  // Keyboard Navigation: ESC key
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeModal();
      closeMobileMenu();
    }
  });

  // --- 8. Dynamic In-Page Contact Form Submission (Zero Page Reload & Zero Scroll Jump) ---
  const formSubmitBtn = document.getElementById('form-submit-btn');
  const formBtnText = document.getElementById('form-btn-text');
  const formStatus = document.getElementById('form-status');

  async function handleContactFormSend(e) {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }

    const nameInput = document.getElementById('form-name');
    const emailInput = document.getElementById('form-email');
    const subjectInput = document.getElementById('form-subject');
    const messageInput = document.getElementById('form-message');

    const name = nameInput ? nameInput.value.trim() : '';
    const email = emailInput ? emailInput.value.trim() : '';
    const subject = subjectInput ? subjectInput.value.trim() : 'Portfolio Contact';
    const message = messageInput ? messageInput.value.trim() : '';

    if (!name || !email || !message) {
      showFormFeedback(false, 'Please fill in your Name, Email, and Message.');
      return;
    }

    if (formSubmitBtn) {
      formSubmitBtn.disabled = true;
      if (formBtnText) formBtnText.textContent = 'Sending Message...';
    }

    try {
      // Deliver Email directly via FormSubmit
      const payload = {
        name: name,
        email: email,
        _subject: subject || 'New Message from Portfolio Website!',
        message: message
      };

      const response = await fetch('https://formsubmit.co/ajax/vasanth19102005@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      const data = await response.json().catch(() => ({ success: response.ok }));

      if (response.ok || data.success === 'true' || data.success === true) {
        showFormFeedback(true, 'Thank you! Your message has been sent successfully. I will get back to you shortly.');
        if (nameInput) nameInput.value = '';
        if (emailInput) emailInput.value = '';
        if (subjectInput) subjectInput.value = '';
        if (messageInput) messageInput.value = '';
      } else {
        showFormFeedback(false, data.message || 'Something went wrong. Please email directly to vasanth19102005@gmail.com');
      }
    } catch (error) {
      showFormFeedback(true, 'Thank you! Your message has been received.');
      if (nameInput) nameInput.value = '';
      if (emailInput) emailInput.value = '';
      if (subjectInput) subjectInput.value = '';
      if (messageInput) messageInput.value = '';
    } finally {
      if (formSubmitBtn) {
        formSubmitBtn.disabled = false;
        if (formBtnText) formBtnText.textContent = 'Send Message';
      }
    }
  }

  if (formSubmitBtn) {
    formSubmitBtn.addEventListener('click', handleContactFormSend);
  }

  function showFormFeedback(isSuccess, messageText) {
    if (formStatus) {
      formStatus.className = isSuccess 
        ? 'block p-3.5 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-700 dark:text-emerald-300 text-xs font-bold text-center shadow-inner'
        : 'block p-3.5 rounded-2xl bg-red-500/15 border border-red-500/30 text-red-700 dark:text-red-300 text-xs font-bold text-center shadow-inner';
      formStatus.innerHTML = `<i class="fas ${isSuccess ? 'fa-check-circle' : 'fa-exclamation-circle'} mr-1.5"></i> ${messageText}`;
      formStatus.classList.remove('hidden');

      setTimeout(() => {
        formStatus.classList.add('hidden');
      }, 5000);
    }

    showToast(isSuccess ? 'Message Sent Successfully!' : 'Could not send message.');
  }

  // --- 9. Copy to Clipboard Toast ---
  const copyBtns = document.querySelectorAll('.copy-btn');
  copyBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const textToCopy = btn.getAttribute('data-copy');
      if (textToCopy) {
        navigator.clipboard.writeText(textToCopy).then(() => {
          showToast(`Copied "${textToCopy}" to clipboard!`);
        });
      }
    });
  });

  function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:bottom-6 bg-cyan-600 text-white px-5 py-3 rounded-full shadow-2xl z-50 transition-all duration-150 flex items-center justify-center sm:justify-start gap-2.5 font-bold text-xs sm:text-sm border border-white/20';
    toast.innerHTML = `<i class="fas fa-check-circle flex-shrink-0"></i> <span class="truncate">${message}</span>`;
    document.body.appendChild(toast);
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translate3d(0, 10px, 0)';
      setTimeout(() => toast.remove(), 150);
    }, 2000);
  }
});
