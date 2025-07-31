// ===== Obra360 Page JavaScript =====

document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Obra360 page loaded');
    
    // Inicializar funcionalidades específicas de la página
    initializeObra360Page();
});

function initializeObra360Page() {
    // Smooth scrolling para enlaces internos
    initializeSmoothScrolling();
    
    // Animaciones de entrada para elementos
    initializeEntranceAnimations();
    
    // Carousel de screenshots (si es necesario)
    initializeScreenshotsCarousel();
    
    // Efectos de hover para las tarjetas de características
    initializeFeatureCards();
}

function initializeSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

function initializeEntranceAnimations() {
    // Configurar Intersection Observer para animaciones de entrada
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observar elementos que necesitan animación
    const animatedElements = document.querySelectorAll('.feature-card, .screenshot-item, .store-button');
    animatedElements.forEach(el => {
        observer.observe(el);
    });
}

function initializeScreenshotsCarousel() {
    // Si se implementa un carousel de screenshots en el futuro
    console.log('📱 Screenshots carousel ready for implementation');
}

function initializeFeatureCards() {
    const featureCards = document.querySelectorAll('.feature-card');
    
    featureCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Función para manejar el scroll y efectos parallax
function handleScrollEffects() {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.floating-card, .phone');
    
    parallaxElements.forEach((element, index) => {
        const speed = 0.5 + (index * 0.1);
        const yPos = -(scrolled * speed);
        element.style.transform = `translateY(${yPos}px)`;
    });
}

// Event listener para efectos de scroll
window.addEventListener('scroll', handleScrollEffects);

// Función para manejar el estado de los botones de tienda
function handleStoreButtons() {
    const storeButtons = document.querySelectorAll('.store-button.coming-soon');
    
    storeButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Mostrar mensaje de "próximamente"
            showComingSoonMessage();
        });
    });
}

function showComingSoonMessage() {
    // Crear notificación temporal
    const notification = document.createElement('div');
    notification.className = 'coming-soon-notification';
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-clock"></i>
            <span>Próximamente disponible en las tiendas</span>
        </div>
    `;
    
    // Estilos para la notificación
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, #4CAF50, #45a049);
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 12px;
        box-shadow: 0 8px 25px rgba(76, 175, 80, 0.3);
        z-index: 1000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        font-weight: 500;
    `;
    
    document.body.appendChild(notification);
    
    // Animar entrada
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remover después de 3 segundos
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Inicializar botones de tienda
document.addEventListener('DOMContentLoaded', function() {
    handleStoreButtons();
});

// Función para manejar el formulario de acceso anticipado
function handleEarlyAccessForm() {
    const earlyAccessBtn = document.querySelector('.early-access .btn');
    
    if (earlyAccessBtn) {
        earlyAccessBtn.addEventListener('click', function(e) {
            // Redirigir a la página de contacto con parámetro específico
            const contactUrl = 'contacto.html?service=obra360';
            window.location.href = contactUrl;
        });
    }
}

// Inicializar formulario de acceso anticipado
document.addEventListener('DOMContentLoaded', function() {
    handleEarlyAccessForm();
});

// Función para optimizar imágenes (lazy loading)
function initializeLazyLoading() {
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
document.addEventListener('DOMContentLoaded', function() {
    initializeLazyLoading();
});

// Función para manejar el responsive design
function handleResponsiveDesign() {
    const isMobile = window.innerWidth <= 768;
    
    if (isMobile) {
        // Ajustes específicos para móvil
        const floatingCards = document.querySelectorAll('.floating-card');
        floatingCards.forEach(card => {
            card.style.display = 'none';
        });
    }
}

// Event listener para cambios de tamaño de ventana
window.addEventListener('resize', handleResponsiveDesign);

// Inicializar responsive design
document.addEventListener('DOMContentLoaded', function() {
    handleResponsiveDesign();
});

console.log('✅ Obra360 JavaScript initialized'); 