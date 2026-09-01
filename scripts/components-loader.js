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
        
        
        // Si estamos en la raíz (index.html o /)
        if (pathSegments.length === 0 || pathSegments[0] === 'index.html') {
            return '';
        }
        
        // Si estamos en la carpeta pages (pages/contacto.html, etc.)
        if (pathSegments.includes('pages')) {
            return '../';
        }
        
        // Si estamos en otras subcarpetas
        const depth = pathSegments.length - 1;
        const result = '../'.repeat(depth);
        return result;
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
        
        // Ajustar todas las imágenes
        const images = container.querySelectorAll('img[src]');
        images.forEach(img => {
            const src = img.getAttribute('src');
            if (src && !src.startsWith('http') && !src.startsWith('data:')) {
                let newSrc = src;
                
                // Si estamos en una página dentro de pages/ y la imagen ya tiene assets/, ajustar la ruta
                if (this.basePath === '../' && src.startsWith('assets/')) {
                    newSrc = this.basePath + src;
                } 
                // Si estamos en la raíz y la imagen tiene assets/, mantener la ruta original
                else if (this.basePath === '' && src.startsWith('assets/')) {
                    newSrc = src;
                }
                // Si estamos en la raíz y la imagen NO tiene assets/, agregar assets/
                else if (this.basePath === '' && !src.startsWith('assets/')) {
                    newSrc = 'assets/' + src.replace(/^\/+/, '');
                }
                
                // Asegurar que la ruta sea absoluta desde la raíz del sitio
                if (!newSrc.startsWith('/') && !newSrc.startsWith('http')) {
                    // Si estamos en pages/, necesitamos subir un nivel
                    if (this.basePath === '../') {
                        newSrc = '../' + newSrc;
                    }
                }
                
                img.setAttribute('src', newSrc);
            }
        });

        // Ajustar todos los enlaces
        const links = container.querySelectorAll('a[href]');
        links.forEach(link => {
            const href = link.getAttribute('href');
            if (href && !href.startsWith('http') && !href.startsWith('#') && !href.startsWith('mailto:') && !href.startsWith('tel:')) {
                let newHref = href;
                
                // Si estamos en una página dentro de pages/ y el enlace ya tiene pages/, quitar pages/
                if (this.basePath === '../' && href.startsWith('pages/')) {
                    newHref = href.replace('pages/', '');
                } 
                // Si estamos en una página dentro de pages/ y el enlace NO tiene pages/, agregar ../
                else if (!href.startsWith('pages/') && this.basePath === '../') {
                    newHref = this.basePath + href;
                }
                // Si estamos en la raíz, mantener la ruta original
                else if (this.basePath === '') {
                    newHref = href;
                }
                
                link.setAttribute('href', newHref);
            }
        });
        
        // Aplicar corrección de rutas de imágenes
        this.fixImagePaths(container);
    }

    /**
     * Verifica y corrige las rutas de las imágenes
     */
    fixImagePaths(container) {
        const images = container.querySelectorAll('img[src]');
        images.forEach(img => {
            const originalSrc = img.getAttribute('src');
            
            // Función para intentar cargar la imagen
            const tryLoadImage = (src) => {
                return new Promise((resolve, reject) => {
                    const testImg = new Image();
                    testImg.onload = () => resolve(src);
                    testImg.onerror = () => reject(src);
                    testImg.src = src;
                });
            };
            
            // Función para manejar errores de imagen
            const handleImageError = (img, attemptedSrc) => {
                console.error(`❌ Error cargando imagen: ${attemptedSrc}`);
                
                // Si es un logo, intentar rutas alternativas
                if (img.classList.contains('logo-white') || img.classList.contains('logo-color')) {
                    const alternatives = [
                        attemptedSrc.replace('../', ''),
                        attemptedSrc.replace('assets/', '../assets/'),
                        attemptedSrc.replace('../assets/', 'assets/'),
                        '/assets/images/logo/logo-white.png',
                        '/assets/images/logo/logo-color.png'
                    ];
                    
                    // Intentar cada alternativa
                    alternatives.forEach((altSrc, index) => {
                        if (altSrc !== attemptedSrc) {
                            setTimeout(() => {
                                tryLoadImage(altSrc).then(() => {
                                    img.src = altSrc;
                                }).catch(() => {
                                    if (index === alternatives.length - 1) {
                                        // Si todas fallan, mostrar fallback
                                        if (img.classList.contains('logo-white')) {
                                            img.style.display = 'none';
                                            const colorLogo = img.nextElementSibling;
                                            if (colorLogo && colorLogo.classList.contains('logo-color')) {
                                                colorLogo.style.display = 'block';
                                            }
                                        } else if (img.classList.contains('logo-color')) {
                                            img.style.display = 'none';
                                            const whiteLogo = img.previousElementSibling;
                                            if (whiteLogo && whiteLogo.classList.contains('logo-white')) {
                                                whiteLogo.style.display = 'block';
                                            }
                                        }
                                    }
                                });
                            }, index * 100);
                        }
                    });
                }
            };
            
            // Intentar cargar la imagen original
            tryLoadImage(originalSrc).catch(() => {
                handleImageError(img, originalSrc);
            });
        });
    }

    async loadNavbar() { return await this.loadComponent('navbar', '#navbar-container'); }
    async loadFooter() { return await this.loadComponent('footer', '#footer-container'); }

    async loadAllComponents() {
        const navbarLoaded = await this.loadNavbar();
        const footerLoaded = await this.loadFooter();
        if (navbarLoaded && footerLoaded) {
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
        } else {
            // Abrir dropdown
            toggle.setAttribute('aria-expanded', 'true');
            toggle.classList.add('active');
            dropdown.classList.add('active');
            if (icon) {
                icon.style.transform = 'rotate(180deg)';
            }
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