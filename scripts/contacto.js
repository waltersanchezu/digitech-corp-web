// ========================================
// SCRIPT PARA PÁGINA DE CONTACTO
// ========================================

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    
    // Inicializar EmailJS primero
    if (typeof emailjs !== 'undefined') {
        // Usar la configuración global de emailjs-config.js
        if (window.EMAILJS_CONFIG) {
            emailjs.init(window.EMAILJS_CONFIG.publicKey);
        } else {
            console.error('❌ Configuración de EmailJS no encontrada');
            return;
        }
    } else {
        console.error('❌ EmailJS no está cargado');
        return;
    }
    
    // Buscar y configurar el formulario
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        setupContactForm(contactForm);
    } else {
        console.error('❌ Formulario no encontrado');
    }
    
    // Configurar formateo de campos
    setupFieldFormatting();
});

function setupContactForm(form) {
    
    // Agregar event listener para el envío
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Obtener datos del formulario
        const formData = new FormData(form);
        const data = {
            fullName: formData.get('fullName'),
            company: formData.get('company'),
            ruc: formData.get('ruc'),
            email: formData.get('email'),
            phone: formData.get('phone'),
            service: formData.get('service'),
            message: formData.get('message'),
            privacy: formData.get('privacy') === 'on'
        };
        
        
        // Validar datos requeridos
        if (!data.fullName) {
            showNotification('Por favor, ingresa tu nombre completo', 'error');
            return;
        }
        if (!data.company) {
            showNotification('Por favor, ingresa la razón social', 'error');
            return;
        }
        if (!data.email) {
            showNotification('Por favor, ingresa tu correo electrónico', 'error');
            return;
        }
        if (!data.phone) {
            showNotification('Por favor, ingresa tu número de teléfono', 'error');
            return;
        }
        if (!data.service) {
            showNotification('Por favor, selecciona un servicio de interés', 'error');
            return;
        }
        if (!data.privacy) {
            showNotification('Debes aceptar la Política de Privacidad para continuar', 'error');
            return;
        }
        
        // Cambiar estado del botón
        const submitBtn = form.querySelector('.submit-btn');
        const originalText = submitBtn.innerHTML;
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando correo...';
        
        try {
            // Preparar datos para EmailJS
            const templateParams = {
                to_email: 'info@digitech-corp.com',
                from_name: data.fullName,
                from_email: data.email,
                company: data.company,
                ruc: data.ruc || 'No proporcionado',
                phone: data.phone,
                service: getServiceName(data.service),
                message: data.message || 'No se proporcionó descripción del proyecto.',
                date: new Date().toLocaleString('es-PE')
            };
            
            
            // Verificar que EmailJS esté configurado
            if (!window.EMAILJS_CONFIG) {
                throw new Error('Configuración de EmailJS no encontrada');
            }
            
            // Enviar email
            const response = await emailjs.send(
                window.EMAILJS_CONFIG.serviceId,
                window.EMAILJS_CONFIG.templateId,
                templateParams
            );
            
            if (response.status === 200) {
                showNotification('¡Gracias por tu consulta! Te contactaremos pronto.', 'success');
                form.reset();
            } else {
                throw new Error(`Error en el envío del email: ${response.status}`);
            }
            
        } catch (error) {
            console.error('❌ Error al enviar email:', error);
            
            // Mostrar mensaje de error más específico
            let errorMessage = 'Hubo un error al enviar el formulario. Por favor, inténtalo nuevamente.';
            
            if (error.message.includes('Configuración')) {
                errorMessage = 'Error de configuración del sistema de envío. Por favor, contacta al administrador.';
            } else if (error.message.includes('network')) {
                errorMessage = 'Error de conexión. Verifica tu conexión a internet e inténtalo nuevamente.';
            } else if (error.message.includes('400') || error.message.includes('401')) {
                errorMessage = 'Error de autenticación. Por favor, contacta al administrador.';
            }
            
            showNotification(errorMessage, 'error');
        } finally {
            // Restaurar botón
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalText;
        }
    });
    
}

function getServiceName(serviceKey) {
    const serviceNames = {
        'software-medida': 'Software a Medida',
        'apps-moviles': 'App\'s Móviles',
        'gobierno-digital': 'Gobierno Digital',
        'metodologia-bim': 'Metodología BIM',
        'transformacion-digital': 'Transformación Digital',
        'consultoria-tecnologica': 'Consultoría Tecnológica',
        'obra360': 'Obra360',
        'multiple': 'Múltiples Servicios'
    };
    
    return serviceNames[serviceKey] || serviceKey;
}

function showNotification(message, type = 'info') {
    // Crear elemento de notificación
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    
    // Determinar color y icono
    let color, icon;
    switch (type) {
        case 'success':
            color = '#28a745';
            icon = '✅';
            break;
        case 'error':
            color = '#dc3545';
            icon = '❌';
            break;
        default:
            color = '#0075C5';
            icon = 'ℹ️';
    }
    
    notification.innerHTML = `
        <div style="display: flex; align-items: center; gap: 10px;">
            <span>${icon}</span>
            <span>${message}</span>
        </div>
        <button onclick="this.parentElement.remove()" style="background: none; border: none; color: white; cursor: pointer; margin-left: 10px;">✕</button>
    `;
    
    // Estilos de la notificación
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${color};
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 10000;
        display: flex;
        align-items: center;
        max-width: 400px;
        font-family: Arial, sans-serif;
        font-size: 14px;
    `;
    
    // Agregar al DOM
    document.body.appendChild(notification);
    
    // Auto-remover después de 5 segundos
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 5000);
}

function setupFieldFormatting() {
    // Formateo del campo de teléfono
    const phoneInput = document.getElementById('phone');
    if (phoneInput) {
        phoneInput.addEventListener('input', function() {
            // Solo permitir números y algunos caracteres especiales
            this.value = this.value.replace(/[^\d\s\-\+\(\)]/g, '');
        });
    }
    
    // Formateo del campo RUC
    const rucInput = document.getElementById('ruc');
    if (rucInput) {
        rucInput.addEventListener('input', function() {
            // Solo permitir números
            this.value = this.value.replace(/\D/g, '');
        });
    }
} 