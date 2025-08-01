/**
 * Footer Enhancements - DIGITECH CORP
 * Mejoras de funcionalidad y accesibilidad para el footer
 */

class FooterEnhancements {
    constructor() {
        this.footer = document.querySelector('.footer');
        this.socialLinks = document.querySelectorAll('.social-item');
        this.footerLinks = document.querySelectorAll('.footer-links a');
        
        this.init();
    }
    
    init() {
        if (!this.footer) {
            console.warn('Footer no encontrado');
            return;
        }
        
        console.log('Footer enhancements inicializados');
        
        this.setupSocialLinks();
        this.setupFooterLinks();
        this.setupAccessibility();
        this.setupAnimations();
        this.setupContactInfo();
    }
    
    /**
     * Configura los enlaces de redes sociales
     */
    setupSocialLinks() {
        this.socialLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const platform = link.getAttribute('aria-label').toLowerCase();
                this.handleSocialClick(platform);
            });
            
            // Mejorar accesibilidad
            link.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    const platform = link.getAttribute('aria-label').toLowerCase();
                    this.handleSocialClick(platform);
                }
            });
        });
    }
    
    /**
     * Maneja los clicks en redes sociales
     */
    handleSocialClick(platform) {
        const socialUrls = {
            facebook: 'https://facebook.com/digitechcorp',
            linkedin: 'https://linkedin.com/company/digitech-corp',
            instagram: 'https://instagram.com/digitechcorp',
            youtube: 'https://youtube.com/@digitechcorp'
        };
        
        const url = socialUrls[platform];
        
        if (url) {
            // Mostrar mensaje temporal
            this.showNotification(`Redirigiendo a ${platform}...`, 'info');
            
            // Abrir en nueva pestaña después de un breve delay
            setTimeout(() => {
                window.open(url, '_blank', 'noopener,noreferrer');
            }, 500);
        } else {
            this.showNotification('Enlace de red social no configurado', 'warning');
        }
    }
    
    /**
     * Configura los enlaces del footer
     */
    setupFooterLinks() {
        this.footerLinks.forEach(link => {
            // Agregar indicador de enlace externo si es necesario
            if (link.hostname !== window.location.hostname) {
                link.setAttribute('target', '_blank');
                link.setAttribute('rel', 'noopener noreferrer');
                
                // Agregar icono de enlace externo
                const externalIcon = document.createElement('i');
                externalIcon.className = 'fas fa-external-link-alt';
                externalIcon.style.marginLeft = '0.5rem';
                externalIcon.style.fontSize = '0.8em';
                externalIcon.setAttribute('aria-hidden', 'true');
                link.appendChild(externalIcon);
            }
            
            // Agregar tracking de clicks
            link.addEventListener('click', (e) => {
                this.trackFooterLinkClick(link.href, link.textContent.trim());
            });
        });
    }
    
    /**
     * Configura mejoras de accesibilidad
     */
    setupAccessibility() {
        // Agregar skip link para el footer
        const skipLink = document.createElement('a');
        skipLink.href = '#footer-skip';
        skipLink.className = 'skip-link';
        skipLink.textContent = 'Saltar al contenido del footer';
        skipLink.style.cssText = `
            position: absolute;
            top: -40px;
            left: 6px;
            background: #1e293b;
            color: white;
            padding: 8px;
            text-decoration: none;
            border-radius: 4px;
            z-index: 1000;
            transition: top 0.3s;
        `;
        
        skipLink.addEventListener('focus', () => {
            skipLink.style.top = '6px';
        });
        
        skipLink.addEventListener('blur', () => {
            skipLink.style.top = '-40px';
        });
        
        this.footer.insertBefore(skipLink, this.footer.firstChild);
        
        // Agregar ID para el skip link
        const footerMain = this.footer.querySelector('.footer-main');
        if (footerMain) {
            footerMain.id = 'footer-skip';
        }
        
        // Mejorar navegación por teclado
        this.footer.addEventListener('keydown', (e) => {
            if (e.key === 'Tab') {
                this.footer.classList.add('keyboard-navigation');
            }
        });
        
        this.footer.addEventListener('mousedown', () => {
            this.footer.classList.remove('keyboard-navigation');
        });
    }
    
    /**
     * Configura animaciones del footer
     */
    setupAnimations() {
        // Animación de entrada cuando el footer es visible
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('footer-visible');
                }
            });
        }, {
            threshold: 0.1
        });
        
        observer.observe(this.footer);
        
        // Animación de hover en elementos del footer
        const footerSections = this.footer.querySelectorAll('.footer-section');
        footerSections.forEach(section => {
            section.addEventListener('mouseenter', () => {
                section.style.transform = 'translateY(-2px)';
            });
            
            section.addEventListener('mouseleave', () => {
                section.style.transform = 'translateY(0)';
            });
        });
    }
    
    /**
     * Configura la información de contacto
     */
    setupContactInfo() {
        const contactItems = this.footer.querySelectorAll('.contact-item');
        
        contactItems.forEach(item => {
            const icon = item.querySelector('i');
            const value = item.querySelector('.contact-value, span');
            
            if (icon && value) {
                // Hacer el email clickeable
                if (icon.classList.contains('fa-envelope')) {
                    const email = value.textContent.trim();
                    value.style.cursor = 'pointer';
                    value.style.textDecoration = 'underline';
                    value.style.textDecorationColor = 'transparent';
                    value.style.transition = 'text-decoration-color 0.3s';
                    
                    value.addEventListener('click', () => {
                        window.location.href = `mailto:${email}`;
                    });
                    
                    value.addEventListener('mouseenter', () => {
                        value.style.textDecorationColor = 'currentColor';
                    });
                    
                    value.addEventListener('mouseleave', () => {
                        value.style.textDecorationColor = 'transparent';
                    });
                }
                
                // Hacer el teléfono clickeable
                if (icon.classList.contains('fa-phone')) {
                    const phone = value.textContent.trim();
                    value.style.cursor = 'pointer';
                    value.style.textDecoration = 'underline';
                    value.style.textDecorationColor = 'transparent';
                    value.style.transition = 'text-decoration-color 0.3s';
                    
                    value.addEventListener('click', () => {
                        window.location.href = `tel:${phone.replace(/\s/g, '')}`;
                    });
                    
                    value.addEventListener('mouseenter', () => {
                        value.style.textDecorationColor = 'currentColor';
                    });
                    
                    value.addEventListener('mouseleave', () => {
                        value.style.textDecorationColor = 'transparent';
                    });
                }
            }
        });
    }
    
    /**
     * Trackea los clicks en enlaces del footer
     */
    trackFooterLinkClick(url, text) {
        console.log(`Footer link clicked: ${text} -> ${url}`);
        
        // Aquí puedes agregar analytics tracking
        if (typeof gtag !== 'undefined') {
            gtag('event', 'footer_link_click', {
                'link_text': text,
                'link_url': url
            });
        }
    }
    
    /**
     * Muestra notificaciones temporales
     */
    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `footer-notification footer-notification-${type}`;
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            background: ${type === 'info' ? '#3b82f6' : '#f59e0b'};
            color: white;
            padding: 12px 20px;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            z-index: 1000;
            transform: translateX(100%);
            transition: transform 0.3s ease;
            max-width: 300px;
            font-size: 14px;
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
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    new FooterEnhancements();
});

// Exportar para uso global si es necesario
window.FooterEnhancements = FooterEnhancements; 