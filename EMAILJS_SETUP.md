# Configuración de EmailJS para Formulario de Contacto

## 📧 Configuración del Sistema de Envío de Emails

Este documento explica cómo configurar EmailJS para que el formulario de contacto envíe emails automáticamente a `info@digitech-corp.pe`.

## 🚀 Pasos de Configuración

### 1. Crear cuenta en EmailJS
1. Ve a [https://www.emailjs.com/](https://www.emailjs.com/)
2. Crea una cuenta gratuita
3. Confirma tu email

### 2. Crear un Servicio de Email
1. En el dashboard de EmailJS, ve a "Email Services"
2. Haz clic en "Add New Service"
3. Selecciona tu proveedor de email (Gmail, Outlook, etc.)
4. Conecta tu cuenta de email
5. **Guarda el Service ID** (ej: `service_abc123`)

### 3. Crear una Plantilla de Email
1. Ve a "Email Templates"
2. Haz clic en "Create New Template"
3. Usa la siguiente plantilla:

**Asunto:**
```
Nueva consulta de contacto - {{from_name}}
```

**Contenido:**
```html
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
```

4. **Guarda el Template ID** (ej: `template_xyz789`)

### 4. Obtener la Clave Pública
1. Ve a "Account" → "API Keys"
2. Copia tu "Public Key" (ej: `user_public_key_123`)

### 5. Configurar el Código
1. Abre el archivo `scripts/emailjs-config.js`
2. Reemplaza los valores con tus credenciales reales:

```javascript
const EMAILJS_CONFIG = {
    serviceId: 'TU_SERVICE_ID_AQUI',
    templateId: 'TU_TEMPLATE_ID_AQUI',
    publicKey: 'TU_PUBLIC_KEY_AQUI'
};
```

## ✅ Verificación

1. Abre la página de contacto en tu sitio
2. Completa el formulario con datos de prueba
3. Envía el formulario
4. Verifica que recibas el email en `info@digitech-corp.pe`

## 🔧 Solución de Problemas

### Error: "EmailJS is not defined"
- Verifica que el CDN de EmailJS esté cargado correctamente
- Revisa la consola del navegador para errores

### Error: "Service not found"
- Verifica que el Service ID sea correcto
- Asegúrate de que el servicio esté activo en EmailJS

### Error: "Template not found"
- Verifica que el Template ID sea correcto
- Asegúrate de que la plantilla esté publicada

### No se reciben emails
- Verifica la configuración del servicio de email
- Revisa la carpeta de spam
- Confirma que el email de destino sea correcto

## 📞 Soporte

Si tienes problemas con la configuración:
1. Revisa la [documentación oficial de EmailJS](https://www.emailjs.com/docs/)
2. Verifica que todas las credenciales sean correctas
3. Revisa la consola del navegador para errores específicos

## 💰 Plan Gratuito de EmailJS

- **200 emails por mes** (suficiente para la mayoría de sitios)
- **1 servicio de email**
- **Plantillas ilimitadas**
- **Soporte por email**

Para sitios con mayor tráfico, considera actualizar a un plan de pago. 