document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================
       MOBILE NAVIGATION MENU
       ========================================== */
    const menuToggle = document.getElementById('menu-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            const icon = menuToggle.querySelector('i');
            if (icon.classList.contains('fa-bars')) {
                icon.classList.replace('fa-bars', 'fa-xmark');
            } else {
                icon.classList.replace('fa-xmark', 'fa-bars');
            }
        });
    }

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                const icon = menuToggle.querySelector('i');
                icon.classList.replace('fa-xmark', 'fa-bars');
            }
        });
    });

    /* ==========================================
       LIGHT & DARK THEME SWITCHER
       ========================================== */
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    const savedTheme = localStorage.getItem('theme') || 'dark-theme';
    body.className = savedTheme;
    updateThemeIcon(savedTheme);

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            if (body.classList.contains('dark-theme')) {
                body.classList.replace('dark-theme', 'light-theme');
                localStorage.setItem('theme', 'light-theme');
                updateThemeIcon('light-theme');
            } else {
                body.classList.replace('light-theme', 'dark-theme');
                localStorage.setItem('theme', 'dark-theme');
                updateThemeIcon('dark-theme');
            }
        });
    }

    function updateThemeIcon(theme) {
        if (!themeToggle) return;
        const icon = themeToggle.querySelector('i');
        if (theme === 'light-theme') {
            icon.className = 'fa-solid fa-sun';
        } else {
            icon.className = 'fa-solid fa-moon';
        }
    }

    /* ==========================================
       SCROLL PROGRESS BAR
       ========================================== */
    const progressBar = document.getElementById('scroll-progress-bar');
    window.addEventListener('scroll', () => {
        if (!progressBar) return;
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = (scrollTop / docHeight) * 100;
        progressBar.style.width = `${progress}%`;
    }, { passive: true });

    /* ==========================================
       CUSTOM CURSOR
       ========================================== */
    const cursorDot = document.getElementById('cursor-dot');
    const cursorOutline = document.getElementById('cursor-outline');

    if (cursorDot && cursorOutline) {
        let outlineX = 0, outlineY = 0;
        let dotX = 0, dotY = 0;

        window.addEventListener('mousemove', (e) => {
            dotX = e.clientX;
            dotY = e.clientY;
            cursorDot.style.left = `${dotX}px`;
            cursorDot.style.top = `${dotY}px`;
        });

        // Smooth lagging outline cursor
        function animateOutline() {
            outlineX += (dotX - outlineX) * 0.12;
            outlineY += (dotY - outlineY) * 0.12;
            cursorOutline.style.left = `${outlineX}px`;
            cursorOutline.style.top = `${outlineY}px`;
            requestAnimationFrame(animateOutline);
        }
        animateOutline();
    }

    /* ==========================================
       TYPED TEXT ANIMATION
       ========================================== */
    const typedTextEl = document.getElementById('typed-text');
    const phrases = [
        'AI & Robotics Specialist',
        'Computer Vision Engineer',
        'Certified Robotics Trainer',
        'IEEE Leader & Innovator'
    ];
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 80;

    function typeText() {
        if (!typedTextEl) return;
        const currentPhrase = phrases[phraseIndex];

        if (isDeleting) {
            charIndex--;
            typingSpeed = 40;
        } else {
            charIndex++;
            typingSpeed = 80;
        }

        typedTextEl.textContent = currentPhrase.substring(0, charIndex);

        if (!isDeleting && charIndex === currentPhrase.length) {
            isDeleting = true;
            typingSpeed = 1800; // Pause at end
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            typingSpeed = 400; // Pause before next word
        }

        setTimeout(typeText, typingSpeed);
    }

    setTimeout(typeText, 600);

    /* ==========================================
       SKILLS TAB SWITCHER
       ========================================== */
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            tabBtns.forEach(b => b.classList.remove('active'));
            tabPanes.forEach(p => p.classList.remove('active'));
            btn.classList.add('active');
            const targetPane = document.getElementById(`tab-${btn.dataset.tab}`);
            if (targetPane) {
                targetPane.classList.add('active');
                // Animate skill bars in the newly shown tab
                animateSkillBarsInElement(targetPane);
            }
        });
    });

    /* ==========================================
       SCROLL REVEAL — Intersection Observer
       ========================================== */
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                revealObserver.unobserve(entry.target); // Once only
            }
        });
    }, { threshold: 0.12 });

    // Apply reveal classes to key sections dynamically
    const sectionsToReveal = [
        { selector: '.section-header', cls: 'reveal' },
        { selector: '.about-text-content', cls: 'reveal-left' },
        { selector: '.about-skills-content', cls: 'reveal-right' },
        { selector: '.project-spotlight', cls: 'reveal' },
        { selector: '.project-card', cls: 'reveal' },
        { selector: '.timeline-item', cls: 'reveal' },
        { selector: '.achievement-card', cls: 'reveal' },
        { selector: '.gallery-item', cls: 'reveal' },
        { selector: '.contact-card-glass', cls: 'reveal' },
        { selector: '.contact-form-container', cls: 'reveal-right' },
        { selector: '.stat-card', cls: 'reveal' },
    ];

    sectionsToReveal.forEach(({ selector, cls }) => {
        document.querySelectorAll(selector).forEach((el, i) => {
            el.classList.add(cls);
            // Stagger delay for cards
            if (['project-card', 'achievement-card', 'timeline-item', 'gallery-item', 'contact-card-glass', 'stat-card'].some(c => selector.includes(c))) {
                el.style.transitionDelay = `${i * 0.08}s`;
            }
            revealObserver.observe(el);
        });
    });

    /* ==========================================
       ANIMATED NUMBER COUNTERS
       ========================================== */
    const counters = document.querySelectorAll('.counter');
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.closest('.stat-card').dataset.target);
                let current = 0;
                const increment = Math.ceil(target / 40);
                const interval = setInterval(() => {
                    current += increment;
                    if (current >= target) {
                        current = target;
                        clearInterval(interval);
                    }
                    counter.textContent = current;
                }, 35);
                counterObserver.unobserve(counter);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => counterObserver.observe(counter));

    /* ==========================================
       SKILL BAR ANIMATION
       ========================================== */
    function animateSkillBarsInElement(container) {
        const bars = container.querySelectorAll('.skill-progress');
        bars.forEach(bar => {
            // Save target width once (from inline style attribute)
            if (!bar.dataset.targetWidth) {
                bar.dataset.targetWidth = bar.style.width || '0%';
            }
            const target = bar.dataset.targetWidth;

            // Reset to 0, then on next frame animate to target
            bar.style.width = '0%';
            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    bar.style.width = target;
                });
            });
        });
    }

    // Observe the skill tabs area to trigger first tab bars
    const firstTab = document.getElementById('tab-ai');
    if (firstTab) {
        const skillObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Animate the currently active tab pane bars
                    const activePane = document.querySelector('.tab-pane.active');
                    if (activePane) animateSkillBarsInElement(activePane);
                    skillObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });
        skillObserver.observe(firstTab);
    }

    /* ==========================================
       SPOTLIGHT PROJECT CAROUSEL (FlameBot)
       ========================================== */
    const slides = document.querySelectorAll('.carousel-slide');
    const prevBtn = document.querySelector('.carousel-prev');
    const nextBtn = document.querySelector('.carousel-next');
    const indicators = document.querySelectorAll('.carousel-indicators .indicator');
    let currentSlide = 0;

    function showSlide(index) {
        if (slides.length === 0) return;
        if (index >= slides.length) currentSlide = 0;
        else if (index < 0) currentSlide = slides.length - 1;
        else currentSlide = index;

        slides.forEach(slide => slide.classList.remove('active'));
        indicators.forEach(ind => ind.classList.remove('active'));
        slides[currentSlide].classList.add('active');
        if (indicators[currentSlide]) indicators[currentSlide].classList.add('active');
    }

    if (nextBtn) nextBtn.addEventListener('click', () => showSlide(currentSlide + 1));
    if (prevBtn) prevBtn.addEventListener('click', () => showSlide(currentSlide - 1));

    indicators.forEach(ind => {
        ind.addEventListener('click', () => showSlide(parseInt(ind.dataset.index)));
    });

    let autoSlideInterval = setInterval(() => showSlide(currentSlide + 1), 5000);
    const carouselWrapper = document.querySelector('.spotlight-media-carousel');
    if (carouselWrapper) {
        carouselWrapper.addEventListener('mouseenter', () => clearInterval(autoSlideInterval));
        carouselWrapper.addEventListener('mouseleave', () => {
            autoSlideInterval = setInterval(() => showSlide(currentSlide + 1), 5000);
        });
    }

    /* ==========================================
       PHOTO GALLERY FILTER
       ========================================== */
    const filterBtns = document.querySelectorAll('.gallery-filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const filter = btn.dataset.filter;
            galleryItems.forEach(item => {
                if (filter === 'all' || item.dataset.category === filter) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 50);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    setTimeout(() => { item.style.display = 'none'; }, 300);
                }
            });
        });
    });

    /* ==========================================
       LIGHTBOX
       ========================================== */
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const lightboxClose = document.getElementById('lightbox-close');
    const lightboxPrev = document.getElementById('lightbox-prev');
    const lightboxNext = document.getElementById('lightbox-next');

    // Collect all visible gallery images
    let lightboxImages = [];
    let lightboxCurrentIndex = 0;

    function buildLightboxImages() {
        lightboxImages = [];
        document.querySelectorAll('.gallery-item').forEach(item => {
            if (item.style.display !== 'none') {
                const img = item.querySelector('img');
                const caption = item.querySelector('.gallery-overlay p');
                if (img) {
                    lightboxImages.push({
                        src: img.src,
                        alt: img.alt,
                        caption: caption ? caption.textContent : img.alt
                    });
                }
            }
        });
    }

    function openLightbox(index) {
        buildLightboxImages();
        lightboxCurrentIndex = index;
        showLightboxImage(lightboxCurrentIndex);
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }

    function showLightboxImage(index) {
        if (lightboxImages.length === 0) return;
        if (index >= lightboxImages.length) lightboxCurrentIndex = 0;
        else if (index < 0) lightboxCurrentIndex = lightboxImages.length - 1;
        else lightboxCurrentIndex = index;

        const data = lightboxImages[lightboxCurrentIndex];
        lightboxImg.src = data.src;
        lightboxImg.alt = data.alt;
        lightboxCaption.textContent = data.caption;
    }

    // Attach click to each gallery item
    galleryItems.forEach((item, index) => {
        item.addEventListener('click', () => openLightbox(index));
    });

    if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
    if (lightboxPrev) lightboxPrev.addEventListener('click', () => showLightboxImage(lightboxCurrentIndex - 1));
    if (lightboxNext) lightboxNext.addEventListener('click', () => showLightboxImage(lightboxCurrentIndex + 1));

    // Close on backdrop click
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) closeLightbox();
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('active')) return;
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowRight') showLightboxImage(lightboxCurrentIndex + 1);
        if (e.key === 'ArrowLeft') showLightboxImage(lightboxCurrentIndex - 1);
    });

    /* ==========================================
       BACK TO TOP BUTTON
       ========================================== */
    const backToTop = document.getElementById('back-to-top');
    if (backToTop) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 400) {
                backToTop.classList.add('visible');
            } else {
                backToTop.classList.remove('visible');
            }
        }, { passive: true });

        backToTop.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    /* ==========================================
       ACTIVE NAV LINK ON SCROLL
       ========================================== */
    const sections = document.querySelectorAll('section[id]');
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (window.scrollY >= (sectionTop - 150)) {
                current = section.getAttribute('id');
            }
        });
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }, { passive: true });

});
