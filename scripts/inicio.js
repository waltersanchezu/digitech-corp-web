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
            console.warn('HeroCarousel: No se encontraron slides');
            return;
        }
        
        this.setupEventListeners();
        this.startAutoPlay();
        this.updateIndicators();
        this.triggerSlideAnimations();
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
            console.warn('BackToTop: No se encontró el botón back-to-top');
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
// CLASE INNOVATION ANIMATIONS
// ========================================

class InnovationAnimations {
    constructor() {
        this.section = document.querySelector('.innovation-section');
        this.stats = document.querySelectorAll('.stat-number');
        this.hasAnimated = false;
        
        this.init();
    }
    
    // Método para agregar animaciones a otras secciones
    static addSectionAnimations() {
        // Configuración para secciones con animaciones
        const sections = [
            { selector: '.obra360-section', name: 'Obra360' },
            { selector: '.services-section', name: 'Services' },
            { selector: '.sectors-section', name: 'Sectors' }
        ];
        
        sections.forEach(({ selector, name }) => {
            const section = document.querySelector(selector);
            if (section) {
                // Configuración más sensible para mobile
                const isMobile = window.innerWidth <= 768;
                const options = {
                    threshold: isMobile ? 0.1 : 0.3, // Más sensible en mobile
                    rootMargin: isMobile ? '-30px' : '-50px' // Menos margen en mobile
                };
                
                console.log(`${name} animations: Configurando observer para`, isMobile ? 'mobile' : 'desktop');
                
                const observer = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        console.log(`${name} animations: Intersection ratio:`, entry.intersectionRatio);
                        
                        if (entry.isIntersecting) {
                            console.log(`${name} animations: Activando animaciones`);
                            entry.target.classList.add('animate');
                        } else {
                            console.log(`${name} animations: Desactivando animaciones`);
                            entry.target.classList.remove('animate');
                        }
                    });
                }, options);
                
                observer.observe(section);
                
                // Fallback para mobile: activar animaciones si la sección está visible al cargar
                if (isMobile) {
                    setTimeout(() => {
                        const rect = section.getBoundingClientRect();
                        const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
                        
                        if (isVisible && !section.classList.contains('animate')) {
                            console.log(`${name} animations: Fallback mobile - activando animaciones`);
                            section.classList.add('animate');
                        }
                    }, 1000);
                }
            }
        });
    }
    
    init() {
        if (!this.section) {
            console.warn('InnovationAnimations: No se encontró la sección innovation-section');
            return;
        }
        
        this.setupIntersectionObserver();
        
        // Reajustar en cambios de orientación (especialmente importante en mobile)
        window.addEventListener('resize', () => {
            const isMobile = window.innerWidth <= 768;
            console.log('InnovationAnimations: Resize detectado, mobile:', isMobile);
            
            // Si cambió a mobile y las animaciones no se han activado, intentar activarlas
            if (isMobile && !this.hasAnimated) {
                setTimeout(() => {
                    const rect = this.section.getBoundingClientRect();
                    const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
                    
                    if (isVisible) {
                        console.log('InnovationAnimations: Activando animaciones después de resize');
                        this.triggerAnimations();
                        this.hasAnimated = true;
                    }
                }, 500);
            }
        });
    }
    
    setupIntersectionObserver() {
        // Configuración más sensible para mobile
        const isMobile = window.innerWidth <= 768;
        const options = {
            threshold: isMobile ? 0.1 : 0.3, // Más sensible en mobile
            rootMargin: isMobile ? '-50px' : '-100px' // Menos margen en mobile
        };
        
        console.log('InnovationAnimations: Configurando observer para', isMobile ? 'mobile' : 'desktop');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                console.log('InnovationAnimations: Intersection ratio:', entry.intersectionRatio);
                
                if (entry.isIntersecting && !this.hasAnimated) {
                    console.log('InnovationAnimations: Activando animaciones');
                    this.triggerAnimations();
                    this.hasAnimated = true;
                } else if (!entry.isIntersecting && this.hasAnimated) {
                    console.log('InnovationAnimations: Reseteando animaciones');
                    this.resetAnimations();
                    this.hasAnimated = false;
                }
            });
        }, options);
        
        observer.observe(this.section);
        
        // Fallback para mobile: activar animaciones si la sección está visible al cargar
        if (isMobile) {
            setTimeout(() => {
                const rect = this.section.getBoundingClientRect();
                const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
                
                if (isVisible && !this.hasAnimated) {
                    console.log('InnovationAnimations: Fallback mobile - activando animaciones');
                    this.triggerAnimations();
                    this.hasAnimated = true;
                }
            }, 1000);
        }
    }
    
    triggerAnimations() {
        console.log('InnovationAnimations: Ejecutando triggerAnimations');
        this.section.classList.add('animate');
        this.startCounters();
        
        // Fallback adicional para mobile: forzar animaciones si no se activan
        const isMobile = window.innerWidth <= 768;
        if (isMobile) {
            setTimeout(() => {
                if (!this.section.classList.contains('animate')) {
                    console.log('InnovationAnimations: Fallback - forzando animaciones en mobile');
                    this.section.classList.add('animate');
                    this.startCounters();
                }
            }, 2000);
        }
    }
    
    resetAnimations() {
        this.section.classList.remove('animate');
        this.resetCounters();
    }
    
    startCounters() {
        this.stats.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-target') || '0');
            const duration = 2000; // 2 segundos
            const step = target / (duration / 16); // 60fps
            let current = 0;
            
            const timer = setInterval(() => {
                current += step;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                stat.textContent = '+' + Math.floor(current);
            }, 16);
        });
    }
    
    resetCounters() {
        this.stats.forEach(stat => {
            stat.textContent = '+0';
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
            console.log('ServicesCarousel: Carousel no encontrado');
            return;
        }
        
        console.log('ServicesCarousel: Inicializando carousel');
        this.updateSlidesPerView();
        this.setupEventListeners();
        this.updateControls();
        this.updateIndicators();
    }
    
    updateSlidesPerView() {
        const isTablet = window.innerWidth >= 768 && window.innerWidth < 1024;
        this.slidesPerView = isTablet ? 2 : 1;
        console.log('ServicesCarousel: Slides por vista:', this.slidesPerView);
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
        
        console.log('ServicesCarousel: Slide actual:', this.currentSlide, 'de', this.totalSlides);
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
            console.log('SectorsCarousel: Carousel no encontrado');
            return;
        }
        
        console.log('SectorsCarousel: Inicializando carousel');
        this.updateSlidesPerView();
        this.setupEventListeners();
        this.updateControls();
        this.updateIndicators();
    }
    
    updateSlidesPerView() {
        const isTablet = window.innerWidth >= 768 && window.innerWidth < 1024;
        this.slidesPerView = isTablet ? 2 : 1;
        console.log('SectorsCarousel: Slides por vista:', this.slidesPerView);
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
        
        console.log('SectorsCarousel: Slide actual:', this.currentSlide, 'de', this.totalSlides);
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
        // Inicializar componentes
        const heroCarousel = new HeroCarousel();
        const backToTop = new BackToTop();
        const innovationAnimations = new InnovationAnimations();
        const servicesCarousel = new ServicesCarousel();
        const sectorsCarousel = new SectorsCarousel();
        
        // Agregar animaciones a otras secciones
        InnovationAnimations.addSectionAnimations();
        
        // Reajustar animaciones en cambios de orientación
        window.addEventListener('resize', () => {
            const isMobile = window.innerWidth <= 768;
            console.log('Resize detectado, mobile:', isMobile);
            
            // Recrear las animaciones si cambió el tamaño
            InnovationAnimations.addSectionAnimations();
        });
        
        // Optimizar scroll performance
        const optimizedScrollHandler = Utilities.throttle(() => {
            // Aquí se pueden agregar más optimizaciones de scroll
        }, 16);
        
        window.addEventListener('scroll', optimizedScrollHandler);
        
        // Manejo de errores global
        window.addEventListener('error', (e) => {
            console.error('Error global:', e.error);
        });
        
        // Log de inicialización exitosa
        console.log('✅ DIGITECH CORP - Sitio web inicializado correctamente');
        
    } catch (error) {
        console.error('❌ Error durante la inicialización:', error);
    }
});

// Exportar clases para uso en otros módulos si es necesario
export { HeroCarousel, BackToTop, InnovationAnimations, ServicesCarousel, SectorsCarousel, Utilities };
