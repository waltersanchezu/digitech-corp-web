// ========================================
// CONFIGURACIÓN DE EMAILJS
// ========================================

// INSTRUCCIONES DE CONFIGURACIÓN:
// 1. Ve a https://www.emailjs.com/ y crea una cuenta gratuita
// 2. Crea un nuevo servicio de email (Gmail, Outlook, etc.)
// 3. Crea una nueva plantilla de email
// 4. Reemplaza los valores de abajo con tus credenciales reales

const EMAILJS_CONFIG = {
    // ID del servicio de EmailJS (ej: service_abc123)
    serviceId: 'service_digitech_contact',
    
    // ID de la plantilla de EmailJS (ej: template_xyz789)
    templateId: 'template_digitech_contact',
    
    // Clave pública de EmailJS (ej: user_public_key_123)
    publicKey: 'YOUR_PUBLIC_KEY'
};

// Plantilla de email sugerida para EmailJS:
/*
Asunto: Nueva consulta de contacto - {{from_name}}

Hola,

Has recibido una nueva consulta desde el formulario de contacto de DIGITECH CORP:

DATOS DEL CLIENTE:
- Nombre: {{from_name}}
- Empresa: {{company}}
- RUC: {{ruc}}
- Email: {{from_email}}
- Teléfono: {{phone}}
- Servicio de interés: {{service}}

DESCRIPCIÓN DEL PROYECTO:
{{message}}

Fecha de consulta: {{date}}

---
Este mensaje fue enviado automáticamente desde el formulario de contacto.
*/

// Exportar configuración
if (typeof module !== 'undefined' && module.exports) {
    module.exports = EMAILJS_CONFIG;
} else {
    window.EMAILJS_CONFIG = EMAILJS_CONFIG;
} 