// ========================================
// SCRIPT PARA PÁGINA DE CONTACTO
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        initializeContactForm();
    }
});

function initializeContactForm() {
    const form = document.getElementById('contactForm');
    const submitBtn = form.querySelector('.submit-btn');
    
    // Validación en tiempo real
    const inputs = form.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
        input.addEventListener('blur', validateField);
        input.addEventListener('input', clearFieldError);
    });
    
    // Manejo del envío del formulario
    form.addEventListener('submit', handleFormSubmit);
    
    // Validación del checkbox de privacidad
    const privacyCheckbox = document.getElementById('privacy');
    if (privacyCheckbox) {
        privacyCheckbox.addEventListener('change', validatePrivacy);
    }
}

function validateField(event) {
    const field = event.target;
    const value = field.value.trim();
    const fieldName = field.name;
    
    // Remover errores previos
    clearFieldError(event);
    
    // Validaciones específicas por campo
    let isValid = true;
    let errorMessage = '';
    
    switch (fieldName) {
        case 'fullName':
            if (value.length < 2) {
                isValid = false;
                errorMessage = 'El nombre debe tener al menos 2 caracteres';
            } else if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(value)) {
                isValid = false;
                errorMessage = 'El nombre solo debe contener letras';
            }
            break;
            
        case 'company':
            if (value.length < 2) {
                isValid = false;
                errorMessage = 'La razón social debe tener al menos 2 caracteres';
            }
            break;
            
        case 'email':
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                isValid = false;
                errorMessage = 'Ingresa un correo electrónico válido';
            }
            break;
            
        case 'phone':
            const phoneRegex = /^[\+]?[0-9\s\-\(\)]{9,15}$/;
            if (!phoneRegex.test(value)) {
                isValid = false;
                errorMessage = 'Ingresa un número de teléfono válido';
            }
            break;
            
        case 'service':
            if (value === '') {
                isValid = false;
                errorMessage = 'Selecciona un servicio de interés';
            }
            break;
            
        case 'ruc':
            if (value !== '' && !/^\d{11}$/.test(value)) {
                isValid = false;
                errorMessage = 'El RUC debe tener exactamente 11 dígitos';
            }
            break;
    }
    
    if (!isValid) {
        showFieldError(field, errorMessage);
    }
    
    return isValid;
}

function clearFieldError(event) {
    const field = event.target;
    field.classList.remove('error');
    
    // Remover mensaje de error si existe
    const errorElement = field.parentNode.querySelector('.error-message');
    if (errorElement) {
        errorElement.remove();
    }
}

function showFieldError(field, message) {
    field.classList.add('error');
    
    // Crear elemento de error
    const errorElement = document.createElement('div');
    errorElement.className = 'error-message';
    errorElement.textContent = message;
    errorElement.style.cssText = `
        color: var(--contact-error);
        font-size: 0.85rem;
        margin-top: 0.25rem;
        font-family: 'Be Vietnam Pro', sans-serif;
    `;
    
    field.parentNode.appendChild(errorElement);
}

function validatePrivacy() {
    const privacyCheckbox = document.getElementById('privacy');
    const checkboxGroup = privacyCheckbox.closest('.checkbox-group');
    
    // Remover error previo
    const errorElement = checkboxGroup.querySelector('.error-message');
    if (errorElement) {
        errorElement.remove();
    }
    
    if (!privacyCheckbox.checked) {
        const errorElement = document.createElement('div');
        errorElement.className = 'error-message';
        errorElement.textContent = 'Debes aceptar la política de privacidad';
        errorElement.style.cssText = `
            color: var(--contact-error);
            font-size: 0.85rem;
            margin-top: 0.5rem;
            font-family: 'Be Vietnam Pro', sans-serif;
        `;
        
        checkboxGroup.appendChild(errorElement);
        return false;
    }
    
    return true;
}

function validateForm() {
    const form = document.getElementById('contactForm');
    const fields = form.querySelectorAll('input[required], select[required], textarea[required]');
    let isValid = true;
    
    // Validar campos requeridos
    fields.forEach(field => {
        if (!validateField({ target: field })) {
            isValid = false;
        }
    });
    
    // Validar checkbox de privacidad
    if (!validatePrivacy()) {
        isValid = false;
    }
    
    return isValid;
}

async function handleFormSubmit(event) {
    event.preventDefault();
    
    const form = event.target;
    const submitBtn = form.querySelector('.submit-btn');
    const originalText = submitBtn.innerHTML;
    
    // Validar formulario
    if (!validateForm()) {
        showNotification('Por favor, corrige los errores en el formulario', 'error');
        return;
    }
    
    // Cambiar estado del botón
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
    
    try {
        // Recopilar datos del formulario
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
        
        // Enviar email usando mailto (solución temporal)
        const emailBody = formatEmailBody(data);
        const mailtoLink = `mailto:info@digitech-corp.pe?subject=Nueva consulta de ${encodeURIComponent(data.fullName)}&body=${encodeURIComponent(emailBody)}`;
        
        // Abrir cliente de email
        window.location.href = mailtoLink;
        
        // Mostrar mensaje de éxito
        showNotification('¡Gracias por tu consulta! Te contactaremos pronto.', 'success');
        
        // Resetear formulario
        form.reset();
        
    } catch (error) {
        console.error('Error al enviar formulario:', error);
        showNotification('Hubo un error al enviar el formulario. Por favor, inténtalo nuevamente.', 'error');
    } finally {
        // Restaurar botón
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
    }
}

function formatEmailBody(data) {
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
    
    return `
Nueva consulta recibida desde el formulario de contacto:

DATOS DEL CLIENTE:
- Nombre Completo: ${data.fullName}
- Razón Social: ${data.company}
- RUC: ${data.ruc || 'No proporcionado'}
- Correo Electrónico: ${data.email}
- Número Celular: ${data.phone}
- Servicio de Interés: ${serviceNames[data.service] || data.service}

DESCRIPCIÓN DEL PROYECTO:
${data.message || 'No se proporcionó descripción del proyecto.'}

INFORMACIÓN ADICIONAL:
- Fecha de consulta: ${new Date().toLocaleString('es-PE')}
- Aceptó política de privacidad: ${data.privacy ? 'Sí' : 'No'}

---
Este mensaje fue enviado automáticamente desde el formulario de contacto de DIGITECH CORP.
    `.trim();
}

function showNotification(message, type = 'info') {
    // Crear elemento de notificación
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${getNotificationIcon(type)}"></i>
            <span>${message}</span>
        </div>
        <button class="notification-close" onclick="this.parentElement.remove()">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    // Estilos de la notificación
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${getNotificationColor(type)};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 12px;
        box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
        z-index: 1000;
        display: flex;
        align-items: center;
        gap: 1rem;
        max-width: 400px;
        animation: slideInRight 0.3s ease-out;
        font-family: 'Be Vietnam Pro', sans-serif;
    `;
    
    // Agregar al DOM
    document.body.appendChild(notification);
    
    // Auto-remover después de 5 segundos
    setTimeout(() => {
        if (notification.parentElement) {
            notification.style.animation = 'slideOutRight 0.3s ease-out';
            setTimeout(() => {
                if (notification.parentElement) {
                    notification.remove();
                }
            }, 300);
        }
    }, 5000);
}

function getNotificationIcon(type) {
    switch (type) {
        case 'success': return 'fa-check-circle';
        case 'error': return 'fa-exclamation-circle';
        case 'warning': return 'fa-exclamation-triangle';
        default: return 'fa-info-circle';
    }
}

function getNotificationColor(type) {
    switch (type) {
        case 'success': return 'var(--contact-success)';
        case 'error': return 'var(--contact-error)';
        case 'warning': return 'var(--contact-warning)';
        default: return 'var(--contact-primary)';
    }
}

// Animaciones para notificaciones
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        flex: 1;
    }
    
    .notification-close {
        background: none;
        border: none;
        color: white;
        cursor: pointer;
        padding: 0.25rem;
        border-radius: 4px;
        transition: background-color 0.2s ease;
    }
    
    .notification-close:hover {
        background: rgba(255, 255, 255, 0.2);
    }
`;
document.head.appendChild(style);

// Función para formatear número de teléfono
function formatPhoneNumber(input) {
    let value = input.value.replace(/\D/g, '');
    
    if (value.length > 0) {
        if (value.startsWith('51')) {
            value = '+' + value;
        } else if (value.startsWith('9')) {
            value = '+51' + value;
        } else if (value.length >= 9) {
            value = '+51' + value;
        }
    }
    
    input.value = value;
}

// Aplicar formateo al campo de teléfono
document.addEventListener('DOMContentLoaded', function() {
    const phoneInput = document.getElementById('phone');
    if (phoneInput) {
        phoneInput.addEventListener('input', function() {
            formatPhoneNumber(this);
        });
    }
    
    // Aplicar formateo al campo RUC
    const rucInput = document.getElementById('ruc');
    if (rucInput) {
        rucInput.addEventListener('input', function() {
            // Solo permitir números
            this.value = this.value.replace(/\D/g, '');
        });
    }
});

// Función para limpiar formulario
function resetForm() {
    const form = document.getElementById('contactForm');
    if (form) {
        form.reset();
        
        // Limpiar errores
        const errorElements = form.querySelectorAll('.error-message');
        errorElements.forEach(element => element.remove());
        
        const errorFields = form.querySelectorAll('.error');
        errorFields.forEach(field => field.classList.remove('error'));
    }
}

// Exportar funciones para uso global
window.contactFormUtils = {
    validateForm,
    resetForm,
    showNotification
}; 