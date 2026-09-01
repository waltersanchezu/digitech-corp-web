// Manejo de íconos del botón obra360.
// El navbar se inyecta de forma asíncrona (components-loader.js), por eso
// esperamos al evento `componentsLoaded` en lugar de a DOMContentLoaded.

function initObra360Button() {
    const obra360Buttons = document.querySelectorAll('.btn-obra360');
    const navbar = document.getElementById('navbar');

    if (!navbar || obra360Buttons.length === 0) {
        return false;
    }

    // Las páginas de /pages necesitan subir un nivel para llegar a /assets
    const basePath = window.location.pathname.includes('/pages/') ? '../' : '';
    const ICON_WHITE = basePath + 'assets/images/logo/log_white-obra360.png';
    const ICON_COLOR = basePath + 'assets/images/logo/log_color-obra360.png';

    // Precarga para que el swap en hover no parpadee
    [ICON_WHITE, ICON_COLOR].forEach(src => { new Image().src = src; });

    const setIcon = (img, src) => {
        if (img && !img.src.endsWith(src.replace('../', ''))) {
            img.src = src;
        }
    };

    function updateObra360Icons() {
        const isScrolled = navbar.classList.contains('scrolled');
        obra360Buttons.forEach(button => {
            setIcon(button.querySelector('img'), isScrolled ? ICON_COLOR : ICON_WHITE);
        });
    }

    function handleObra360Hover() {
        obra360Buttons.forEach(button => {
            const img = button.querySelector('img');
            if (!img) return;

            button.addEventListener('mouseenter', () => {
                // En hover el ícono se invierte respecto al estado del navbar
                setIcon(img, navbar.classList.contains('scrolled') ? ICON_WHITE : ICON_COLOR);
            });
            button.addEventListener('mouseleave', updateObra360Icons);
        });
    }

    // El navbar cambia de clase al hacer scroll; el observer ya cubre ese caso,
    // por eso no hace falta un listener de scroll adicional.
    new MutationObserver(updateObra360Icons).observe(navbar, {
        attributes: true,
        attributeFilter: ['class']
    });

    updateObra360Icons();
    handleObra360Hover();
    return true;
}

if (!initObra360Button()) {
    window.addEventListener('componentsLoaded', initObra360Button, { once: true });
}
