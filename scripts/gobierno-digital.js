// ========================================
// GOBIERNO DIGITAL - FUNCIONALIDADES
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    // Inicializar todas las funcionalidades
    initScrollAnimations();
    initBackToTop();
    initSmoothScrolling();
    initDashboardAnimations();
    initFloatingElements();
    initHoverEffects();
    initPerformanceOptimizations();
});

// Animaciones de scroll
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observar elementos animables
    const animatedElements = document.querySelectorAll('.hero-badge, .hero-title, .hero-description, .hero-features, .hero-actions, .government-visualization');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(el);
    });
}

// Botón back to top
function initBackToTop() {
    const backToTopBtn = document.getElementById('backToTop');
    
    if (!backToTopBtn) return;

    window.addEventListener('scroll', throttle(() => {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    }, 100));

    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Scroll suave para enlaces internos
function initSmoothScrolling() {
    const internalLinks = document.querySelectorAll('a[href^="#"]');
    
    internalLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80; // Ajuste para navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Animaciones del dashboard PCM
function initDashboardAnimations() {
    const dashboard = document.querySelector('.pcm-dashboard');
    const metricItems = document.querySelectorAll('.metric-item');
    
    if (!dashboard) return;

    // Animación de entrada del dashboard
    setTimeout(() => {
        dashboard.style.transform = 'scale(1)';
        dashboard.style.opacity = '1';
    }, 1000);

    // Animación de métricas
    metricItems.forEach((item, index) => {
        setTimeout(() => {
            item.style.transform = 'translateX(0)';
            item.style.opacity = '1';
        }, 1200 + (index * 200));
    });
}

// Elementos flotantes
function initFloatingElements() {
    const floatingCards = document.querySelectorAll('.floating-card');
    
    floatingCards.forEach((card, index) => {
        // Animación de entrada
        setTimeout(() => {
            card.style.transform = 'translateY(0)';
            card.style.opacity = '1';
        }, 1500 + (index * 300));

        // Efecto parallax en scroll
        window.addEventListener('scroll', throttle(() => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            card.style.transform = `translateY(${rate}px)`;
        }, 16));
    });
}

// Efectos hover
function initHoverEffects() {
    const interactiveElements = document.querySelectorAll('.feature-item, .btn, .metric-item');
    
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
            this.style.boxShadow = '0 8px 25px rgba(0, 119, 204, 0.3)';
        });

        element.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = 'none';
        });
    });
}

// Optimizaciones de performance
function initPerformanceOptimizations() {
    // Throttle para eventos de scroll
    let ticking = false;
    
    function updateOnScroll() {
        // Actualizar elementos que necesiten scroll
        ticking = false;
    }
    
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(updateOnScroll);
            ticking = true;
        }
    });

    // Debounce para resize
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            // Recalcular elementos que dependan del tamaño de ventana
        }, 250);
    });
}

// Función throttle para optimizar eventos
function throttle(func, limit) {
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

// Función debounce para optimizar eventos
function debounce(func, wait, immediate) {
    let timeout;
    return function() {
        const context = this, args = arguments;
        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

// Animaciones adicionales para elementos específicos
function initAdditionalAnimations() {
    // Contador animado para métricas
    const metricValues = document.querySelectorAll('.metric-value');
    
    metricValues.forEach(value => {
        const finalValue = value.textContent;
        const isNumber = /^\d+/.test(finalValue);
        
        if (isNumber) {
            const targetNumber = parseInt(finalValue);
            animateCounter(value, 0, targetNumber, 2000);
        }
    });
}

// Función para animar contadores
function animateCounter(element, start, end, duration) {
    const startTime = performance.now();
    
    function updateCounter(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        const current = Math.floor(start + (end - start) * progress);
        element.textContent = current;
        
        if (progress < 1) {
            requestAnimationFrame(updateCounter);
        }
    }
    
    requestAnimationFrame(updateCounter);
}

// Inicializar animaciones adicionales después de un delay
setTimeout(initAdditionalAnimations, 2000);

// Lazy loading para imágenes (si se agregan en el futuro)
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
}

// Inicializar lazy loading
initLazyLoading();

// Navegación por teclado
function initKeyboardNavigation() {
    document.addEventListener('keydown', (e) => {
        // Escape para cerrar modales (si se implementan)
        if (e.key === 'Escape') {
            // Cerrar modales o overlays
        }
        
        // Enter para activar botones focuseados
        if (e.key === 'Enter') {
            const focusedElement = document.activeElement;
            if (focusedElement && focusedElement.classList.contains('btn')) {
                focusedElement.click();
            }
        }
    });
}

// Inicializar navegación por teclado
initKeyboardNavigation();

// Mensajes de notificación (para futuras funcionalidades)
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Exportar funciones para uso global (si es necesario)
window.GobiernoDigital = {
    showNotification,
    animateCounter
}; 