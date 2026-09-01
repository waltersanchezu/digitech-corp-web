// ========================================
// SCRIPT PRINCIPAL - INDEX.HTML
// ========================================

// Importar el componente navbar
import './components/navbar.js';

// Importar el componente obra360 button
import './components/obra360-button.js';

// ========================================
// CLASE HERO CAROUSEL
// ========================================

class HeroCarousel {
    constructor() {
        this.currentSlide = 0;
        this.slides = document.querySelectorAll('.carousel-slide');
        this.indicators = document.querySelectorAll('.indicator');
        this.prevBtn = document.getElementById('carouselPrev');
        this.nextBtn = document.getElementById('carouselNext');
        this.autoPlayInterval = null;
        this.autoPlayDelay = 5000; // 5 segundos
        
        this.init();
    }
    
    init() {
        if (this.slides.length === 0) {
            return;
        }
        
        this.setupEventListeners();
        this.startAutoPlay();
        this.updateIndicators();
        this.triggerSlideAnimations();
        this.cargarFondosRestantes();
    }

    /**
     * Los slides 2 a 6 tienen su fondo detras de la clase .heroes-listos
     * (ver inicio.css). Se activa una vez terminada la carga inicial para
     * que la primera pantalla solo descargue la imagen que se ve.
     */
    cargarFondosRestantes() {
        const activar = () => document.querySelector('.hero-carousel')?.classList.add('heroes-listos');
        if (document.readyState === 'complete') {
            activar();
        } else {
            window.addEventListener('load', activar, { once: true });
        }
    }
    
    setupEventListeners() {
        // Event listeners para indicadores
        this.indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => {
                this.goToSlide(index);
                this.restartAutoPlay();
            });
        });
        
        // Event listeners para botones de navegación
        if (this.prevBtn) {
            this.prevBtn.addEventListener('click', () => {
                this.prevSlide();
                this.restartAutoPlay();
            });
        }
        
        if (this.nextBtn) {
            this.nextBtn.addEventListener('click', () => {
                this.nextSlide();
                this.restartAutoPlay();
            });
        }
        
        // Pausar autoplay en hover
        const carousel = document.querySelector('.hero-carousel');
        if (carousel) {
            carousel.addEventListener('mouseenter', () => this.stopAutoPlay());
            carousel.addEventListener('mouseleave', () => this.startAutoPlay());
        }
        
        // Pausar autoplay cuando la pestaña no está visible
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                this.stopAutoPlay();
            } else {
                this.startAutoPlay();
            }
        });
    }
    
    goToSlide(index) {
        if (index < 0 || index >= this.slides.length) return;
        
        // Ocultar slide actual
        this.slides[this.currentSlide].classList.remove('active');
        this.indicators[this.currentSlide].classList.remove('active');
        
        // Mostrar nuevo slide
        this.currentSlide = index;
        this.slides[this.currentSlide].classList.add('active');
        this.indicators[this.currentSlide].classList.add('active');
        
        // Reiniciar animaciones del nuevo slide
        this.triggerSlideAnimations();
    }

    triggerSlideAnimations() {
        const activeSlide = this.slides[this.currentSlide];
        if (!activeSlide) return;
        
        // Solo reiniciar animaciones si es el primer slide
        if (activeSlide.getAttribute('data-slide') === '1') {
            activeSlide.classList.remove('active');
            setTimeout(() => {
                activeSlide.classList.add('active');
            }, 50);
        }
    }
    
    nextSlide() {
        const nextIndex = (this.currentSlide + 1) % this.slides.length;
        this.goToSlide(nextIndex);
    }
    
    prevSlide() {
        const prevIndex = (this.currentSlide - 1 + this.slides.length) % this.slides.length;
        this.goToSlide(prevIndex);
    }
    
    updateIndicators() {
        this.indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === this.currentSlide);
        });
    }
    
    startAutoPlay() {
        if (this.autoPlayInterval) return;
        
        this.autoPlayInterval = setInterval(() => {
            this.nextSlide();
        }, this.autoPlayDelay);
    }
    
    stopAutoPlay() {
        if (this.autoPlayInterval) {
            clearInterval(this.autoPlayInterval);
            this.autoPlayInterval = null;
        }
    }
    
    restartAutoPlay() {
        this.stopAutoPlay();
        this.startAutoPlay();
    }
    
    destroy() {
        this.stopAutoPlay();
        // Remover event listeners si es necesario
    }
}

// ========================================
// CLASE BACK TO TOP
// ========================================

class BackToTop {
    constructor() {
        this.button = document.querySelector('.back-to-top');
        this.scrollThreshold = 300;
        
        this.init();
    }
    
    init() {
        if (!this.button) {
            return;
        }
        
        this.setupEventListeners();
    }
    
    setupEventListeners() {
        // Mostrar/ocultar botón en scroll
        window.addEventListener('scroll', () => {
            this.toggleVisibility();
        });
        
        // Scroll suave al hacer click
        this.button.addEventListener('click', (e) => {
            e.preventDefault();
            this.scrollToTop();
        });
        
        // Manejo de teclado para accesibilidad
        this.button.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.scrollToTop();
            }
        });
    }
    
    toggleVisibility() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > this.scrollThreshold) {
            this.button.classList.add('visible');
        } else {
            this.button.classList.remove('visible');
        }
    }
    
    scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
}

// ========================================
// REVELADO AL SCROLL Y CONTADORES
// ========================================

class ScrollReveal {
    /**
     * Qué se anima y cómo. Cada grupo se resuelve dentro de su sección y
     * recibe un escalonado propio, así el orden de aparición sigue la
     * lectura natural en lugar de depender de nth-child en el CSS.
     *
     *   efecto : dirección de entrada (up | left | right | zoom)
     *   paso   : ms entre elementos del mismo grupo
     *   tope   : nº de elementos tras el cual el retardo deja de crecer
     */
    static GRUPOS = [
        { seccion: '.innovation-section', grupos: [
            { sel: '.innovation-title, .innovation-description', efecto: 'left' },
            { sel: '.innovation-stats .stat-item', efecto: 'up', paso: 80 },
            { sel: '.innovation-visual', efecto: 'right' }
        ]},
        { seccion: '.obra360-section', grupos: [
            { sel: '.obra360-logo, .obra360-title, .obra360-subtitle', efecto: 'left', paso: 80 },
            { sel: '.obra360-benefits h3, .benefit-item', efecto: 'up', paso: 70 },
            { sel: '.obra360-results h3, .result-item', efecto: 'up', paso: 70 },
            { sel: '.obra360-actions', efecto: 'up' },
            { sel: '.obra360-visual', efecto: 'right' }
        ]},
        { seccion: '.services-section', grupos: [
            { sel: '.services-title, .services-subtitle', efecto: 'left', paso: 80 },
            { sel: '.service-card', efecto: 'zoom', paso: 70 }
        ]},
        { seccion: '.sectors-section', grupos: [
            { sel: '.sectors-title, .sectors-subtitle', efecto: 'left', paso: 80 },
            { sel: '.sector-card', efecto: 'zoom', paso: 70 }
        ]},
        { seccion: '.clients-section', grupos: [
            { sel: '.clients-title, .clients-subtitle', efecto: 'left', paso: 80 },
            { sel: '.client-logo', efecto: 'zoom', paso: 60 }
        ]},
        { seccion: '.cta-section', grupos: [
            { sel: '.cta-title, .cta-description', efecto: 'up', paso: 80 },
            { sel: '.benefit-item', efecto: 'up', paso: 70 },
            { sel: '.cta-button, .cta-note', efecto: 'up', paso: 80 }
        ]}
    ];

    constructor() {
        this.observer = null;
        this.pendientes = [];
        this.chequeoEnCola = false;
        this.init();
    }

    init() {
        const elementos = this.marcarElementos();
        if (elementos.length === 0) return;

        // Solo a partir de aquí el CSS puede ocultar: ya hay un mecanismo
        // capaz de revelar. Si algo falla antes, el contenido queda visible.
        document.documentElement.classList.add('js-reveal');
        this.pendientes = elementos;

        // Vía principal: IntersectionObserver.
        if ('IntersectionObserver' in window) {
            this.observer = new IntersectionObserver(
                entradas => {
                    entradas.forEach(entrada => {
                        if (entrada.isIntersecting) this.revelar(entrada.target);
                    });
                },
                {
                    // Se dispara cuando el elemento asoma un 12% desde abajo,
                    // no cuando la sección ocupa un porcentaje del viewport:
                    // eso era lo que hacía parpadear las secciones altas.
                    threshold: 0,
                    rootMargin: '0px 0px -12% 0px'
                }
            );
            elementos.forEach(el => this.observer.observe(el));
        }

        // Red de seguridad: si el observer no llega a disparar (navegador raro,
        // pestaña en segundo plano, política de ahorro de energía), el scroll
        // resuelve la visibilidad a mano. Se apaga solo al terminar.
        this.onScroll = () => this.programarChequeo();
        window.addEventListener('scroll', this.onScroll, { passive: true });
        window.addEventListener('resize', this.onScroll, { passive: true });

        this.chequear();

        // Al terminar de cargar las imágenes el layout cambia de alto, así que
        // se repasa: puede haber quedado algo visible que antes no lo estaba.
        if (document.readyState !== 'complete') {
            window.addEventListener('load', () => this.chequear(), { once: true });
        }
    }

    /** Etiqueta los elementos con data-reveal y su retardo escalonado. */
    marcarElementos() {
        const marcados = [];
        ScrollReveal.GRUPOS.forEach(({ seccion, grupos }) => {
            const contenedor = document.querySelector(seccion);
            if (!contenedor) return;

            grupos.forEach(({ sel, efecto, paso = 0, tope = 5 }) => {
                contenedor.querySelectorAll(sel).forEach((el, i) => {
                    if (el.hasAttribute('data-reveal')) return;
                    el.setAttribute('data-reveal', efecto);
                    if (paso) {
                        el.style.setProperty('--reveal-delay', `${Math.min(i, tope) * paso}ms`);
                    }
                    marcados.push(el);
                });
            });
        });
        return marcados;
    }

    programarChequeo() {
        if (this.chequeoEnCola) return;
        this.chequeoEnCola = true;
        requestAnimationFrame(() => {
            this.chequeoEnCola = false;
            this.chequear();
        });
    }

    /** Revela lo que ya asoma en pantalla. */
    chequear() {
        const limite = window.innerHeight * 0.88;
        this.pendientes
            .filter(el => {
                const r = el.getBoundingClientRect();
                return r.top < limite && r.bottom > 0;
            })
            .forEach(el => this.revelar(el));
    }

    revelar(el) {
        if (el.classList.contains('is-visible')) return;
        el.classList.add('is-visible');
        // Una vez revelado no se vuelve a tocar: nada lo puede ocultar de nuevo.
        if (this.observer) this.observer.unobserve(el);
        this.pendientes = this.pendientes.filter(x => x !== el);
        if (this.pendientes.length === 0) this.desmontar();
    }

    desmontar() {
        window.removeEventListener('scroll', this.onScroll);
        window.removeEventListener('resize', this.onScroll);
        if (this.observer) {
            this.observer.disconnect();
            this.observer = null;
        }
    }
}

class ContadoresInnovacion {
    constructor() {
        this.stats = document.querySelectorAll('.stat-number');
        this.yaCorrio = false;
        this.init();
    }

    init() {
        if (this.stats.length === 0) return;

        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            this.mostrarValoresFinales();
            return;
        }

        this.arrancarSiSeVe = () => {
            if (this.yaCorrio) return;
            const r = this.stats[0].getBoundingClientRect();
            // Basta con que el bloque asome por la mitad inferior de la pantalla
            if (r.top < window.innerHeight * 0.85 && r.bottom > 0) this.arrancar();
        };

        if ('IntersectionObserver' in window) {
            this.observer = new IntersectionObserver(entradas => {
                if (entradas.some(e => e.isIntersecting)) this.arrancar();
            }, { threshold: 0.4 });
            this.observer.observe(this.stats[0]);
        }

        // Mismo criterio que el revelado: el scroll es la red de seguridad,
        // así los contadores nunca se quedan clavados en +0.
        window.addEventListener('scroll', this.arrancarSiSeVe, { passive: true });
        this.arrancarSiSeVe();
    }

    arrancar() {
        if (this.yaCorrio) return;
        this.yaCorrio = true;
        window.removeEventListener('scroll', this.arrancarSiSeVe);
        if (this.observer) this.observer.disconnect();
        this.contar();
    }

    mostrarValoresFinales() {
        this.stats.forEach(s => {
            s.textContent = '+' + (parseInt(s.dataset.target, 10) || 0);
        });
    }

    /**
     * Cuenta con requestAnimationFrame en lugar de setInterval: no acumula
     * temporizadores si se llama dos veces y no salta fotogramas.
     */
    contar() {
        const DURACION = 1600;
        this.stats.forEach(stat => {
            const destino = parseInt(stat.dataset.target, 10) || 0;
            const inicio = performance.now();
            const paso = ahora => {
                const t = Math.min((ahora - inicio) / DURACION, 1);
                // Desaceleración al final para que no se corte en seco
                const eased = 1 - Math.pow(1 - t, 3);
                stat.textContent = '+' + Math.round(destino * eased);
                if (t < 1) requestAnimationFrame(paso);
            };
            requestAnimationFrame(paso);
        });
    }
}

// ========================================
// CLASE SERVICES CAROUSEL
// ========================================

class ServicesCarousel {
    constructor() {
        this.carousel = document.querySelector('.services-carousel');
        this.track = this.carousel?.querySelector('.carousel-track');
        this.cards = this.track?.querySelectorAll('.service-card');
        this.prevBtn = this.carousel?.querySelector('.carousel-prev');
        this.nextBtn = this.carousel?.querySelector('.carousel-next');
        this.indicators = this.carousel?.querySelectorAll('.indicator');
        
        this.currentSlide = 0;
        this.slidesPerView = 1;
        this.totalSlides = this.cards?.length || 0;
        
        this.init();
    }
    
    init() {
        if (!this.carousel || !this.track) {
            return;
        }
        
        this.updateSlidesPerView();
        this.setupEventListeners();
        this.updateControls();
        this.updateIndicators();
    }
    
    updateSlidesPerView() {
        const isTablet = window.innerWidth >= 768 && window.innerWidth < 1024;
        this.slidesPerView = isTablet ? 2 : 1;
    }
    
    setupEventListeners() {
        // Botones de navegación
        this.prevBtn?.addEventListener('click', () => this.prevSlide());
        this.nextBtn?.addEventListener('click', () => this.nextSlide());
        
        // Indicadores
        this.indicators?.forEach((indicator, index) => {
            indicator.addEventListener('click', () => this.goToSlide(index));
        });
        
        // Touch events para mobile
        let startX = 0;
        let endX = 0;
        
        this.track.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
        });
        
        this.track.addEventListener('touchend', (e) => {
            endX = e.changedTouches[0].clientX;
            this.handleSwipe(startX, endX);
        });
        
        // Resize para actualizar slides por vista
        window.addEventListener('resize', () => {
            this.updateSlidesPerView();
            this.updateControls();
        });
    }
    
    handleSwipe(startX, endX) {
        const swipeThreshold = 50;
        const diff = startX - endX;
        
        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                this.nextSlide();
            } else {
                this.prevSlide();
            }
        }
    }
    
    prevSlide() {
        this.currentSlide--;
        
        // Carousel infinito: ir al final si estamos al inicio
        if (this.currentSlide < 0) {
            this.currentSlide = this.totalSlides - 1;
        }
        
        this.updateCarousel();
    }
    
    nextSlide() {
        this.currentSlide++;
        
        // Carousel infinito: volver al inicio si llegamos al final
        if (this.currentSlide >= this.totalSlides) {
            this.currentSlide = 0;
        }
        
        this.updateCarousel();
    }
    
    goToSlide(index) {
        this.currentSlide = index;
        this.updateCarousel();
    }
    
    updateCarousel() {
        const cardWidth = this.cards[0]?.offsetWidth || 0;
        const isTablet = window.innerWidth >= 768 && window.innerWidth < 1024;
        const gap = isTablet ? 32 : 0; // 2rem en tablet, 0 en mobile
        const translateX = -(this.currentSlide * (cardWidth + gap));
        
        this.track.style.transform = `translateX(${translateX}px)`;
        this.updateControls();
        this.updateIndicators();
        
    }
    
    updateControls() {
        // En un carousel infinito, los botones nunca se deshabilitan
        if (this.prevBtn) {
            this.prevBtn.disabled = false;
        }
        
        if (this.nextBtn) {
            this.nextBtn.disabled = false;
        }
    }
    
    updateIndicators() {
        this.indicators?.forEach((indicator, index) => {
            // Para carousel infinito, mostrar el indicador correspondiente al slide actual
            const activeIndex = this.currentSlide % this.totalSlides;
            indicator.classList.toggle('active', index === activeIndex);
        });
    }
}

// ========================================
// CLASE SECTORS CAROUSEL
// ========================================

class SectorsCarousel {
    constructor() {
        this.carousel = document.querySelector('.sectors-carousel');
        this.track = this.carousel?.querySelector('.carousel-track');
        this.cards = this.track?.querySelectorAll('.sector-card');
        this.prevBtn = this.carousel?.querySelector('.carousel-prev');
        this.nextBtn = this.carousel?.querySelector('.carousel-next');
        this.indicators = this.carousel?.querySelectorAll('.indicator');
        
        this.currentSlide = 0;
        this.slidesPerView = 1;
        this.totalSlides = this.cards?.length || 0;
        
        this.init();
    }
    
    init() {
        if (!this.carousel || !this.track) {
            return;
        }
        
        this.updateSlidesPerView();
        this.setupEventListeners();
        this.updateControls();
        this.updateIndicators();
    }
    
    updateSlidesPerView() {
        const isTablet = window.innerWidth >= 768 && window.innerWidth < 1024;
        this.slidesPerView = isTablet ? 2 : 1;
    }
    
    setupEventListeners() {
        // Botones de navegación
        this.prevBtn?.addEventListener('click', () => this.prevSlide());
        this.nextBtn?.addEventListener('click', () => this.nextSlide());
        
        // Indicadores
        this.indicators?.forEach((indicator, index) => {
            indicator.addEventListener('click', () => this.goToSlide(index));
        });
        
        // Touch events para mobile
        let startX = 0;
        let endX = 0;
        
        this.track.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
        });
        
        this.track.addEventListener('touchend', (e) => {
            endX = e.changedTouches[0].clientX;
            this.handleSwipe(startX, endX);
        });
        
        // Resize para actualizar slides por vista
        window.addEventListener('resize', () => {
            this.updateSlidesPerView();
            this.updateControls();
        });
    }
    
    handleSwipe(startX, endX) {
        const swipeThreshold = 50;
        const diff = startX - endX;
        
        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                this.nextSlide();
            } else {
                this.prevSlide();
            }
        }
    }
    
    prevSlide() {
        this.currentSlide--;
        
        // Carousel infinito: ir al final si estamos al inicio
        if (this.currentSlide < 0) {
            this.currentSlide = this.totalSlides - 1;
        }
        
        this.updateCarousel();
    }
    
    nextSlide() {
        this.currentSlide++;
        
        // Carousel infinito: volver al inicio si llegamos al final
        if (this.currentSlide >= this.totalSlides) {
            this.currentSlide = 0;
        }
        
        this.updateCarousel();
    }
    
    goToSlide(index) {
        this.currentSlide = index;
        this.updateCarousel();
    }
    
    updateCarousel() {
        const cardWidth = this.cards[0]?.offsetWidth || 0;
        const isTablet = window.innerWidth >= 768 && window.innerWidth < 1024;
        const gap = isTablet ? 32 : 0; // 2rem en tablet, 0 en mobile
        const translateX = -(this.currentSlide * (cardWidth + gap));
        
        this.track.style.transform = `translateX(${translateX}px)`;
        this.updateControls();
        this.updateIndicators();
        
    }
    
    updateControls() {
        // En un carousel infinito, los botones nunca se deshabilitan
        if (this.prevBtn) {
            this.prevBtn.disabled = false;
        }
        
        if (this.nextBtn) {
            this.nextBtn.disabled = false;
        }
    }
    
    updateIndicators() {
        this.indicators?.forEach((indicator, index) => {
            // Para carousel infinito, mostrar el indicador correspondiente al slide actual
            const activeIndex = this.currentSlide % this.totalSlides;
            indicator.classList.toggle('active', index === activeIndex);
        });
    }
}

// ========================================
// CLASE CLIENTS CAROUSEL
// ========================================

class ClientsCarousel {
    constructor() {
        this.carousel = document.querySelector('.clients-carousel');
        this.track = this.carousel?.querySelector('.carousel-track');
        this.logos = this.track?.querySelectorAll('.client-logo');
        this.prevBtn = this.carousel?.querySelector('.carousel-prev');
        this.nextBtn = this.carousel?.querySelector('.carousel-next');
        this.indicators = this.carousel?.querySelectorAll('.indicator');
        
        this.currentSlide = 0;
        this.slidesPerView = 1;
        this.totalSlides = this.logos?.length || 0;
        
        this.init();
    }
    
    init() {
        if (!this.carousel || !this.track) {
            return;
        }
        
        this.updateSlidesPerView();
        this.setupEventListeners();
        this.updateControls();
        this.updateIndicators();
    }
    
    updateSlidesPerView() {
        const isTablet = window.innerWidth >= 768 && window.innerWidth < 1024;
        const isDesktop = window.innerWidth >= 1024;
        
        if (isDesktop) {
            this.slidesPerView = 4;
        } else if (isTablet) {
            this.slidesPerView = 2;
        } else {
            this.slidesPerView = 1;
        }
        
    }
    
    setupEventListeners() {
        // Botones de navegación
        this.prevBtn?.addEventListener('click', () => this.prevSlide());
        this.nextBtn?.addEventListener('click', () => this.nextSlide());
        
        // Indicadores
        this.indicators?.forEach((indicator, index) => {
            indicator.addEventListener('click', () => this.goToSlide(index));
        });
        
        // Touch events para mobile
        let startX = 0;
        let endX = 0;
        
        this.track.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
        });
        
        this.track.addEventListener('touchend', (e) => {
            endX = e.changedTouches[0].clientX;
            this.handleSwipe(startX, endX);
        });
        
        // Resize para actualizar slides por vista
        window.addEventListener('resize', () => {
            this.updateSlidesPerView();
            this.updateControls();
        });
    }
    
    handleSwipe(startX, endX) {
        const swipeThreshold = 50;
        const diff = startX - endX;
        
        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                this.nextSlide();
            } else {
                this.prevSlide();
            }
        }
    }
    
    prevSlide() {
        this.currentSlide--;
        
        // Carousel infinito: ir al final si estamos al inicio
        if (this.currentSlide < 0) {
            this.currentSlide = this.totalSlides - 1;
        }
        
        this.updateCarousel();
    }
    
    nextSlide() {
        this.currentSlide++;
        
        // Carousel infinito: volver al inicio si llegamos al final
        if (this.currentSlide >= this.totalSlides) {
            this.currentSlide = 0;
        }
        
        this.updateCarousel();
    }
    
    goToSlide(index) {
        this.currentSlide = index;
        this.updateCarousel();
    }
    
    updateCarousel() {
        const logoWidth = this.logos[0]?.offsetWidth || 0;
        const isTablet = window.innerWidth >= 768 && window.innerWidth < 1024;
        const isDesktop = window.innerWidth >= 1024;
        
        let gap = 0;
        if (isDesktop) {
            gap = 64; // 4rem
        } else if (isTablet) {
            gap = 48; // 3rem
        }
        
        const translateX = -(this.currentSlide * (logoWidth + gap));
        
        this.track.style.transform = `translateX(${translateX}px)`;
        this.updateControls();
        this.updateIndicators();
        
    }
    
    updateControls() {
        // En un carousel infinito, los botones nunca se deshabilitan
        if (this.prevBtn) {
            this.prevBtn.disabled = false;
        }
        
        if (this.nextBtn) {
            this.nextBtn.disabled = false;
        }
    }
    
    updateIndicators() {
        this.indicators?.forEach((indicator, index) => {
            // Para carousel infinito, mostrar el indicador correspondiente al slide actual
            const activeIndex = this.currentSlide % this.totalSlides;
            indicator.classList.toggle('active', index === activeIndex);
        });
    }
}

// ========================================
// CLASE UTILITIES
// ========================================

class Utilities {
    static debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
    
    static throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }
    
    static isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }
}

// ========================================
// INICIALIZACIÓN
// ========================================

document.addEventListener('DOMContentLoaded', () => {
    try {
        new HeroCarousel();
        new BackToTop();
        new ServicesCarousel();
        new SectorsCarousel();
        new ClientsCarousel();

        // El revelado se monta una sola vez: el observer sigue a los propios
        // elementos, así que un resize no obliga a reconstruirlo (antes se
        // recreaba en cada resize y los observers se acumulaban).
        new ScrollReveal();
        new ContadoresInnovacion();

        window.addEventListener('error', (e) => {
            console.error('Error global:', e.error);
        });

    } catch (error) {
        console.error('❌ Error durante la inicialización:', error);
    }
});

// Exportar clases para uso en otros módulos si es necesario
export { HeroCarousel, BackToTop, ScrollReveal, ContadoresInnovacion, ServicesCarousel, SectorsCarousel, ClientsCarousel, Utilities };
