// ========================================
// CONFIGURACIÓN DE EMAILJS
// ========================================

// INSTRUCCIONES DE CONFIGURACIÓN:
// 1. Ve a https://www.emailjs.com/ y crea una cuenta gratuita
// 2. Crea un nuevo servicio de email (Gmail, Outlook, etc.)
// 3. Crea una nueva plantilla de email usando la plantilla sugerida abajo
// 4. Reemplaza los valores de abajo con tus credenciales reales

const EMAILJS_CONFIG = {
    // ID del servicio de EmailJS (ej: service_abc123)
    // Obtener en: Dashboard → Email Services → Tu servicio
    serviceId: 'service_ki80grd',
    
    // ID de la plantilla de EmailJS (ej: template_xyz789)
    // Obtener en: Dashboard → Email Templates → Tu plantilla
    templateId: 'template_ih1jsik',
    
    // Clave pública de EmailJS (ej: user_public_key_123)
    // Obtener en: Dashboard → Account → API Keys → Public Key
    publicKey: 'f19p9Dhcjhaa4d9H8'
};

// Verificar que las credenciales estén configuradas correctamente

// Validar que las credenciales no sean placeholders
if (EMAILJS_CONFIG.serviceId === 'service_digitech_contact' || 
    EMAILJS_CONFIG.templateId === 'template_digitech_contact' || 
    EMAILJS_CONFIG.publicKey === 'YOUR_PUBLIC_KEY') {
    console.error('❌ ERROR: Las credenciales de EmailJS no están configuradas correctamente');
    console.error('Por favor, actualiza las credenciales en este archivo con los valores reales de tu cuenta EmailJS');
} else {
}

// ========================================
// PLANTILLA DE EMAIL SUGERIDA PARA EMAILJS
// ========================================

/*
ASUNTO:
Nueva consulta de contacto - {{from_name}}

CONTENIDO HTML:
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Nueva Consulta de Contacto</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
    <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
        <h2 style="color: #0075C5;">Nueva Consulta de Contacto - DIGITECH CORP</h2>
        
        <p>Has recibido una nueva consulta desde el formulario de contacto:</p>
        
        <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #0075C5; margin-top: 0;">DATOS DEL CLIENTE</h3>
            <p><strong>Nombre:</strong> {{from_name}}</p>
            <p><strong>Empresa:</strong> {{company}}</p>
            <p><strong>RUC:</strong> {{ruc}}</p>
            <p><strong>Email:</strong> {{from_email}}</p>
            <p><strong>Teléfono:</strong> {{phone}}</p>
            <p><strong>Servicio de interés:</strong> {{service}}</p>
        </div>
        
        <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #0075C5; margin-top: 0;">DESCRIPCIÓN DEL PROYECTO</h3>
            <p>{{message}}</p>
        </div>
        
        <div style="background: #e9ecef; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <p style="margin: 0;"><strong>Fecha de consulta:</strong> {{date}}</p>
        </div>
        
        <hr style="border: none; border-top: 1px solid #dee2e6; margin: 30px 0;">
        <p style="color: #6c757d; font-size: 14px;">
            Este mensaje fue enviado automáticamente desde el formulario de contacto de DIGITECH CORP.
        </p>
    </div>
</body>
</html>
*/

// ========================================
// VARIABLES DISPONIBLES EN LA PLANTILLA
// ========================================

/*
Variables que se envían automáticamente:
- {{from_name}}: Nombre completo del cliente
- {{from_email}}: Email del cliente
- {{company}}: Razón social de la empresa
- {{ruc}}: Número RUC (o "No proporcionado")
- {{phone}}: Número de teléfono
- {{service}}: Servicio de interés seleccionado
- {{message}}: Descripción del proyecto
- {{date}}: Fecha y hora de la consulta
*/

// Exportar configuración
if (typeof module !== 'undefined' && module.exports) {
    module.exports = EMAILJS_CONFIG;
} else {
    window.EMAILJS_CONFIG = EMAILJS_CONFIG;
} 