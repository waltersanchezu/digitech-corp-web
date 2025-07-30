/**
 * Component Loader - Carga dinámicamente componentes reutilizables
 * Versión refactorizada para el nuevo navbar
 */
class ComponentLoader {
    constructor() {
        this.basePath = this.getBasePath();
        this.navbar = null;
        this.mobileMenu = null;
        this.navbarToggler = null;
        this.mobileClose = null;
        this.dropdownToggles = [];
        this.mobileDropdownToggles = [];
    }

    /**
     * Determina la ruta base según la ubicación de la página
     */
    getBasePath() {
        const currentPath = window.location.pathname;
        const pathSegments = currentPath.split('/').filter(segment => segment !== '');
        
        // If at root (index.html)
        if (pathSegments.length === 0 || pathSegments[0] === 'index.html') {
            return '';
        }
        
        // If in a subfolder (pages/contacto/contacto.html)
        const depth = pathSegments.length - 1;
        return '../'.repeat(depth);
    }

    /**
     * Carga un componente desde un archivo HTML
     */
    async loadComponent(componentName, targetSelector) {
        try {
            const response = await fetch(`${this.basePath}components/${componentName}.html`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const html = await response.text();
            
            const target = document.querySelector(targetSelector);
            if (target) {
                target.innerHTML = html;
                this.adjustRelativePaths(target);
                target.setAttribute('data-component-loaded', 'true');
                console.log(`✅ Componente ${componentName} cargado exitosamente`);
                return true;
            } else {
                console.error(`❌ Selector ${targetSelector} no encontrado`);
                return false;
            }
        } catch (error) {
            console.error(`❌ Error cargando componente ${componentName}:`, error);
            return false;
        }
    }

    /**
     * Ajusta las rutas relativas en el componente cargado
     */
    adjustRelativePaths(container) {
        const elementsWithSrc = container.querySelectorAll('img[src]');
        elementsWithSrc.forEach(el => {
            if (el.src.includes('assets/') && !el.src.startsWith('http')) {
                el.src = el.src.replace(/^.*?assets\//, `${this.basePath}assets/`);
            }
        });

        const elementsWithHref = container.querySelectorAll('a[href]');
        elementsWithHref.forEach(el => {
            if (el.href.includes('pages/') && !el.href.startsWith('http')) {
                el.href = el.href.replace(/^.*?pages\//, `${this.basePath}pages/`);
            }
            if (el.href.includes('index.html') && !el.href.startsWith('http')) {
                el.href = el.href.replace(/^.*?index\.html/, `${this.basePath}index.html`);
            }
        });
    }

    async loadNavbar() { return await this.loadComponent('navbar', '#navbar-container'); }
    async loadFooter() { return await this.loadComponent('footer', '#footer-container'); }

    async loadAllComponents() {
        console.log('🔄 Cargando componentes...');
        const navbarLoaded = await this.loadNavbar();
        const footerLoaded = await this.loadFooter();
        if (navbarLoaded && footerLoaded) {
            console.log('✅ Todos los componentes cargados exitosamente');
            this.initializeNavbar();
            window.dispatchEvent(new CustomEvent('componentsLoaded'));
        } else {
            console.error('❌ Error cargando algunos componentes');
        }
    }

    /**
     * Inicializa toda la funcionalidad del navbar
     */
    initializeNavbar() {
        // Obtener elementos del DOM
        this.navbar = document.querySelector('.navbar');
        this.mobileMenu = document.querySelector('.mobile-menu');
        this.navbarToggler = document.querySelector('.navbar-toggler');
        this.dropdownToggles = document.querySelectorAll('.navbar-nav .dropdown-toggle');
        this.mobileDropdownToggles = document.querySelectorAll('.mobile-menu .dropdown-toggle');

        // Inicializar funcionalidades
        this.initializeScrollEffect();
        this.initializeMobileMenu();
        this.initializeDesktopDropdowns();
        this.initializeMobileDropdowns();
        this.initializeKeyboardSupport();
        this.initializeClickOutside();
        
        console.log('🎯 Navbar inicializado correctamente');
    }

    /**
     * Efecto de scroll para cambiar el fondo del navbar
     */
    initializeScrollEffect() {
        if (!this.navbar) return;

        const handleScroll = () => {
            if (window.scrollY > 120) {
                this.navbar.classList.add('scrolled');
            } else {
                this.navbar.classList.remove('scrolled');
            }
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll(); // Ejecutar inmediatamente para el estado inicial
    }

    /**
     * Funcionalidad del menú móvil
     */
    initializeMobileMenu() {
        if (!this.navbarToggler || !this.mobileMenu) return;

        // Toggle menú con hamburguesa (abrir/cerrar)
        this.navbarToggler.addEventListener('click', () => {
            const isActive = this.mobileMenu.classList.contains('active');
            
            if (isActive) {
                this.closeMobileMenu();
            } else {
                this.openMobileMenu();
            }
        });
    }

    /**
     * Abrir menú móvil
     */
    openMobileMenu() {
        if (!this.mobileMenu || !this.navbarToggler) return;

        this.mobileMenu.classList.add('active');
        this.navbarToggler.classList.add('active');
        this.navbarToggler.setAttribute('aria-expanded', 'true');
        document.body.style.overflow = 'hidden';
        
        console.log('📱 Menú móvil abierto');
    }

    /**
     * Cerrar menú móvil
     */
    closeMobileMenu() {
        if (!this.mobileMenu || !this.navbarToggler) return;

        this.mobileMenu.classList.remove('active');
        this.navbarToggler.classList.remove('active');
        this.navbarToggler.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
        
        // Cerrar todos los dropdowns móviles
        this.closeAllMobileDropdowns();
        
        console.log('📱 Menú móvil cerrado');
    }

    /**
     * Cerrar todos los dropdowns móviles
     */
    closeAllMobileDropdowns() {
        this.mobileDropdownToggles.forEach(toggle => {
            toggle.setAttribute('aria-expanded', 'false');
            toggle.classList.remove('active');
            
            const dropdown = toggle.nextElementSibling;
            if (dropdown && dropdown.classList.contains('mobile-dropdown')) {
                dropdown.classList.remove('active');
            }
            
            const icon = toggle.querySelector('i');
            if (icon) {
                icon.style.transform = 'rotate(0deg)';
            }
        });
    }

    /**
     * Dropdowns de desktop
     */
    initializeDesktopDropdowns() {
        this.dropdownToggles.forEach(toggle => {
            toggle.addEventListener('click', (e) => {
                e.preventDefault();
                this.toggleDesktopDropdown(toggle);
            });
        });
    }

    /**
     * Toggle dropdown de desktop
     */
    toggleDesktopDropdown(toggle) {
        const dropdown = toggle.nextElementSibling;
        const isExpanded = toggle.getAttribute('aria-expanded') === 'true';
        
        // Cerrar todos los dropdowns de desktop
        this.dropdownToggles.forEach(otherToggle => {
            if (otherToggle !== toggle) {
                otherToggle.setAttribute('aria-expanded', 'false');
                otherToggle.nextElementSibling.classList.remove('show');
            }
        });
        
        // Toggle del dropdown actual
        if (isExpanded) {
            toggle.setAttribute('aria-expanded', 'false');
            dropdown.classList.remove('show');
        } else {
            toggle.setAttribute('aria-expanded', 'true');
            dropdown.classList.add('show');
        }
    }

    /**
     * Dropdowns móviles
     */
    initializeMobileDropdowns() {
        this.mobileDropdownToggles.forEach(toggle => {
            toggle.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                this.toggleMobileDropdown(toggle);
            });
        });
    }

    /**
     * Toggle dropdown móvil
     */
    toggleMobileDropdown(toggle) {
        const dropdown = toggle.nextElementSibling;
        const isExpanded = toggle.getAttribute('aria-expanded') === 'true';
        const icon = toggle.querySelector('i');
        
        // Cerrar todos los dropdowns móviles excepto el actual
        this.mobileDropdownToggles.forEach(otherToggle => {
            if (otherToggle !== toggle) {
                otherToggle.setAttribute('aria-expanded', 'false');
                otherToggle.classList.remove('active');
                
                const otherDropdown = otherToggle.nextElementSibling;
                if (otherDropdown && otherDropdown.classList.contains('mobile-dropdown')) {
                    otherDropdown.classList.remove('active');
                }
                
                const otherIcon = otherToggle.querySelector('i');
                if (otherIcon) {
                    otherIcon.style.transform = 'rotate(0deg)';
                }
            }
        });
        
        // Toggle del dropdown actual
        if (isExpanded) {
            // Cerrar dropdown
            toggle.setAttribute('aria-expanded', 'false');
            toggle.classList.remove('active');
            dropdown.classList.remove('active');
            if (icon) {
                icon.style.transform = 'rotate(0deg)';
            }
            console.log('📱 Dropdown móvil cerrado');
        } else {
            // Abrir dropdown
            toggle.setAttribute('aria-expanded', 'true');
            toggle.classList.add('active');
            dropdown.classList.add('active');
            if (icon) {
                icon.style.transform = 'rotate(180deg)';
            }
            console.log('📱 Dropdown móvil abierto');
        }
    }

    /**
     * Soporte para teclado
     */
    initializeKeyboardSupport() {
        // Cerrar menú móvil con Escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                if (this.mobileMenu && this.mobileMenu.classList.contains('active')) {
                    this.closeMobileMenu();
                }
                
                // Cerrar dropdowns de desktop
                this.dropdownToggles.forEach(toggle => {
                    toggle.setAttribute('aria-expanded', 'false');
                    toggle.nextElementSibling.classList.remove('show');
                });
            }
        });
    }

    /**
     * Cerrar al hacer clic fuera
     */
    initializeClickOutside() {
        document.addEventListener('click', (e) => {
            // Cerrar dropdowns de desktop al hacer clic fuera
            if (!e.target.closest('.dropdown')) {
                this.dropdownToggles.forEach(toggle => {
                    toggle.setAttribute('aria-expanded', 'false');
                    toggle.nextElementSibling.classList.remove('show');
                });
            }
            
            // Cerrar menú móvil al hacer clic fuera
            if (this.mobileMenu && this.mobileMenu.classList.contains('active')) {
                if (!e.target.closest('.mobile-menu') && !e.target.closest('.navbar-toggler')) {
                    this.closeMobileMenu();
                }
            }
        });
    }
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    const componentLoader = new ComponentLoader();
    componentLoader.loadAllComponents();
});

// Exportar para uso en otros scripts
window.ComponentLoader = ComponentLoader; 