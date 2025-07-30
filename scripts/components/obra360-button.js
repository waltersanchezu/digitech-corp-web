// Manejo de íconos del botón obra360
function initObra360Button() {
    const obra360Buttons = document.querySelectorAll('.btn-obra360');
    const navbar = document.getElementById('navbar');
    
    if (!navbar) {
        console.error('Obra360: Navbar not found');
        return;
    }
    
    console.log('Obra360 script loaded. Found buttons:', obra360Buttons.length);
    
    // Función para actualizar íconos según el estado del navbar
    function updateObra360Icons() {
        const isScrolled = navbar.classList.contains('scrolled');
        console.log('Updating Obra360 icons. Navbar scrolled:', isScrolled);
        
        obra360Buttons.forEach((button, index) => {
            const img = button.querySelector('img');
            if (!img) {
                console.log(`No img found in button ${index}`);
                return;
            }
            
            // Estado normal (navbar transparente)
            if (!isScrolled) {
                img.src = 'assets/images/logo/log_white-obra360.png';
                console.log(`Button ${index}: Set white icon for transparent navbar`);
            } else {
                // Estado scrolled (navbar blanco)
                img.src = 'assets/images/logo/log_color-obra360.png';
                console.log(`Button ${index}: Set blue icon for white navbar`);
            }
        });
    }
    
    // Función para manejar hover del botón obra360
    function handleObra360Hover() {
        obra360Buttons.forEach((button, index) => {
            const img = button.querySelector('img');
            if (!img) {
                console.log(`No img found in button ${index} for hover events`);
                return;
            }
            
            button.addEventListener('mouseenter', function() {
                const isScrolled = navbar.classList.contains('scrolled');
                console.log(`Button ${index}: Obra360 hover enter. Navbar scrolled:`, isScrolled);
                
                if (!isScrolled) {
                    // Hover con navbar transparente - ícono azul
                    img.src = 'assets/images/logo/log_color-obra360.png';
                    console.log(`Button ${index}: Set blue icon for hover (transparent navbar)`);
                } else {
                    // Hover con navbar blanco - ícono blanco
                    img.src = 'assets/images/logo/log_white-obra360.png';
                    console.log(`Button ${index}: Set white icon for hover (white navbar)`);
                }
            });
            
            button.addEventListener('mouseleave', function() {
                console.log(`Button ${index}: Obra360 hover leave`);
                updateObra360Icons();
            });
        });
    }
    
    // Observar cambios en la clase del navbar
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                updateObra360Icons();
            }
        });
    });
    
    // Inicializar
    updateObra360Icons();
    handleObra360Hover();
    
    // Observar cambios en el navbar
    observer.observe(navbar, {
        attributes: true,
        attributeFilter: ['class']
    });
    
    // También actualizar cuando se hace scroll
    window.addEventListener('scroll', function() {
        updateObra360Icons();
    });
}

// Inicializar cuando el DOM esté listo
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initObra360Button);
} else {
    initObra360Button();
} 