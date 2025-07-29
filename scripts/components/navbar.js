// scripts/components/navbar.js
(function() {
    const navbar = document.getElementById('navbar');
    const navbarToggle = document.getElementById('navbarToggle');
    const navbarClose = document.getElementById('navbarClose');
    const mobileMenu = document.getElementById('mobileMenu');

    if (!navbar || !navbarToggle || !mobileMenu) return;

    // Accesibilidad: roles y aria
    navbar.setAttribute('role', 'navigation');
    navbarToggle.setAttribute('aria-label', 'Abrir menú de navegación');
    navbarToggle.setAttribute('aria-controls', 'mobileMenu');
    navbarToggle.setAttribute('aria-expanded', 'false');
    if (navbarClose) {
        navbarClose.setAttribute('aria-label', 'Cerrar menú de navegación');
        navbarClose.setAttribute('aria-controls', 'mobileMenu');
        navbarClose.setAttribute('aria-expanded', 'false');
    }
    mobileMenu.setAttribute('role', 'menu');

    // Función para cerrar el menú móvil
    function closeMobileMenu() {
        navbarToggle.classList.remove('active');
        navbarToggle.classList.remove('menu-open');
        if (navbarClose) {
            navbarClose.classList.remove('active');
        }
        mobileMenu.classList.remove('active');
        navbarToggle.setAttribute('aria-expanded', 'false');
        if (navbarClose) {
            navbarClose.setAttribute('aria-expanded', 'false');
        }
        document.body.style.overflow = '';
        
        // Cerrar todos los dropdowns y quitar estados activos
        const mobileDropdowns = mobileMenu.querySelectorAll('.dropdown-menu');
        const mobileDropdownLinks = mobileMenu.querySelectorAll('.nav-link[data-dropdown]');
        const allLinks = mobileMenu.querySelectorAll('a, .nav-link');
        
        mobileDropdowns.forEach(dropdown => dropdown.classList.remove('active'));
        mobileDropdownLinks.forEach(link => {
            link.classList.remove('active');
            link.setAttribute('aria-expanded', 'false');
        });
        allLinks.forEach(link => link.classList.remove('active', 'focus', 'hover'));
    }

    // Función para manejar el scroll
    function handleScroll() {
        if (window.scrollY > 150) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }

    // Función para manejar el menú móvil
    function toggleMobileMenu() {
        navbarToggle.classList.toggle('active');
        if (navbarClose) {
            navbarClose.classList.toggle('active');
        }
        mobileMenu.classList.toggle('active');
        const expanded = mobileMenu.classList.contains('active');
        navbarToggle.setAttribute('aria-expanded', expanded ? 'true' : 'false');
        if (navbarClose) {
            navbarClose.setAttribute('aria-expanded', expanded ? 'true' : 'false');
        }
        
        if (expanded) {
            navbarToggle.classList.add('menu-open');
            document.body.style.overflow = 'hidden';
            // Quitar todos los active de links y dropdowns
            const mobileDropdowns = mobileMenu.querySelectorAll('.dropdown-menu');
            const mobileDropdownLinks = mobileMenu.querySelectorAll('.nav-link[data-dropdown]');
            const allLinks = mobileMenu.querySelectorAll('a, .nav-link');
            mobileDropdowns.forEach(dropdown => dropdown.classList.remove('active'));
            mobileDropdownLinks.forEach(link => {
                link.classList.remove('active');
                link.setAttribute('aria-expanded', 'false');
            });
            allLinks.forEach(link => link.classList.remove('active', 'focus', 'hover'));
        } else {
            navbarToggle.classList.remove('menu-open');
            document.body.style.overflow = '';
        }
    }

    // Función para manejar dropdowns en móvil
    function handleMobileDropdowns() {
        const dropdownLinks = mobileMenu.querySelectorAll('.nav-link[data-dropdown]');

        dropdownLinks.forEach(link => {
            link.setAttribute('aria-haspopup', 'true');
            link.setAttribute('aria-expanded', 'false');
            link.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation(); // Prevenir propagación del evento
                
                const dropdownId = this.getAttribute('data-dropdown');
                const dropdown = document.getElementById(dropdownId + '-dropdown');
                
                // Cerrar otros dropdowns abiertos
                dropdownLinks.forEach(otherLink => {
                    if (otherLink !== this) {
                        otherLink.classList.remove('active');
                        otherLink.setAttribute('aria-expanded', 'false');
                        const otherDropdownId = otherLink.getAttribute('data-dropdown');
                        const otherDropdown = document.getElementById(otherDropdownId + '-dropdown');
                        if (otherDropdown) {
                            otherDropdown.classList.remove('active');
                        }
                    }
                });
                
                // Toggle del dropdown actual
                const isActive = this.classList.toggle('active');
                dropdown.classList.toggle('active');
                this.setAttribute('aria-expanded', isActive ? 'true' : 'false');
                
                // Prevenir que se active el hover en otros elementos
                setTimeout(() => {
                    const allLinks = mobileMenu.querySelectorAll('a, .nav-link');
                    allLinks.forEach(link => {
                        if (link !== this && !link.closest('.dropdown-menu')) {
                            link.classList.remove('active', 'focus', 'hover');
                        }
                    });
                }, 10);
            });
        });
    }

    // Accesibilidad: cerrar menú con Escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
            closeMobileMenu();
        }
    });

    // Event listeners
    window.addEventListener('scroll', handleScroll);
    navbarToggle.addEventListener('click', toggleMobileMenu);
    
    // Event listener para el botón cerrar
    if (navbarClose) {
        navbarClose.addEventListener('click', closeMobileMenu);
    }
    
    handleMobileDropdowns();

    // Cerrar menú móvil al hacer click en un enlace (excepto dropdowns)
    const mobileLinks = mobileMenu.querySelectorAll('a:not([data-dropdown])');
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            closeMobileMenu();
        });
    });

    // Cerrar menú móvil al hacer click fuera
    document.addEventListener('click', (e) => {
        if (!navbar.contains(e.target) && !mobileMenu.contains(e.target) && mobileMenu.classList.contains('active')) {
            closeMobileMenu();
        }
    });

    // Cerrar menú móvil al redimensionar
    window.addEventListener('resize', () => {
        if (window.innerWidth >= 1024) {
            closeMobileMenu();
        }
    });

    // Inicializar navbar
    function initializeNavbar() {
        if (window.scrollY <= 150) {
            navbar.classList.remove('scrolled');
        }
        // Cerrar todos los dropdowns y resetear estados activos
        const mobileDropdowns = mobileMenu.querySelectorAll('.dropdown-menu');
        const mobileDropdownLinks = mobileMenu.querySelectorAll('.nav-link[data-dropdown]');
        const allLinks = mobileMenu.querySelectorAll('a, .nav-link');
        mobileDropdowns.forEach(dropdown => dropdown.classList.remove('active'));
        mobileDropdownLinks.forEach(link => {
            link.classList.remove('active');
            link.setAttribute('aria-expanded', 'false');
        });
        allLinks.forEach(link => link.classList.remove('active', 'focus', 'hover'));
    }

    // Inicializar navbar
    initializeNavbar();
})(); 