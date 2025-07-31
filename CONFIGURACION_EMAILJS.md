# 📧 Configuración de EmailJS y Solución de Problemas - DIGITECH CORP

## 🎯 Objetivo
Este documento explica cómo configurar EmailJS y solucionar problemas comunes como rutas de imágenes y formularios.

## 📋 Configuración de EmailJS

### 1. Crear cuenta en EmailJS
1. Ve a [https://www.emailjs.com/](https://www.emailjs.com/)
2. Crea una cuenta gratuita
3. Verifica tu email

### 2. Crear un Servicio de Email
1. En el dashboard de EmailJS, ve a **Email Services**
2. Haz clic en **Add New Service**
3. Selecciona tu proveedor de email (Gmail, Outlook, etc.)
4. Conecta tu cuenta de email
5. **Guarda el Service ID** (ej: `service_abc123`)

### 3. Crear una Plantilla de Email
1. Ve a **Email Templates**
2. Haz clic en **Create New Template**
3. Usa la siguiente plantilla HTML:

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
1. Ve a **Account** → **API Keys**
2. Copia tu **Public Key** (ej: `user_public_key_123`)

### 5. Actualizar la Configuración
1. Abre el archivo `scripts/emailjs-config.js`
2. Reemplaza las credenciales con tus valores reales:

```javascript
const EMAILJS_CONFIG = {
    serviceId: 'TU_SERVICE_ID_REAL',
    templateId: 'TU_TEMPLATE_ID_REAL',
    publicKey: 'TU_PUBLIC_KEY_REAL'
};
```

## 🔧 Solución de Problemas

### 📧 Problemas con EmailJS

#### Error: "EmailJS no está cargado"
- Verifica que el CDN de EmailJS esté incluido en `contacto.html`
- Asegúrate de que no haya errores de red

#### Error: "Configuración no encontrada"
- Verifica que `emailjs-config.js` esté cargado correctamente
- Revisa que las credenciales estén configuradas

#### Error: "Error de autenticación"
- Verifica que las credenciales sean correctas
- Asegúrate de que el servicio esté activo en EmailJS
- Verifica que tengas créditos disponibles en tu cuenta

### 🖼️ Problemas con Rutas de Imágenes

#### Los logos no aparecen en el servidor
**Problema:** Los logos funcionan en local pero no en el servidor.

**Causas comunes:**
1. Rutas relativas incorrectas
2. Diferencias entre entorno local y servidor
3. Configuración del servidor web

**Soluciones implementadas:**

1. **Manejo automático de rutas:**
   - El sistema detecta automáticamente si está en `/pages/` o en la raíz
   - Ajusta las rutas según la ubicación

2. **Fallbacks para logos:**
   - Si el logo blanco falla, muestra el logo de color
   - Si ambos fallan, muestra texto como fallback

3. **Múltiples intentos de carga:**
   - Intenta diferentes rutas automáticamente
   - Logs detallados en consola para debugging

#### Verificar rutas de imágenes:
```javascript
// En la consola del navegador
console.log('Rutas de imágenes actuales:');
document.querySelectorAll('img').forEach(img => {
    console.log(img.src);
});
```

### 📝 Problemas con Formularios

#### Los datos aparecen en la URL
**Solución implementada:**
- Agregado `method="POST"` y `action="#"` al formulario
- Prevención del comportamiento por defecto con JavaScript

#### El formulario no envía emails
**Verificar:**
1. Credenciales de EmailJS correctas
2. Servicio activo en EmailJS
3. Plantilla publicada
4. Créditos disponibles

## 🧪 Probar la Configuración

### Opción 1: Usar la Consola del Navegador
1. Abre la página de contacto en tu navegador
2. Abre las herramientas de desarrollador (F12)
3. Ve a la pestaña **Console**
4. Ejecuta: `testEmailJS()`

### Opción 2: Usar el Formulario de Prueba
1. En la consola, ejecuta: `testEmailJSWithFormData()`
2. Esto llenará el formulario con datos de prueba
3. Haz clic en "Enviar Correo"

### Opción 3: Verificar Rutas de Imágenes
1. En la consola, ejecuta: `testEmailJSConfig()`
2. Revisa los logs para ver las rutas de imágenes
3. Verifica que no haya errores 404

## 📊 Variables Disponibles en la Plantilla

- `{{from_name}}` - Nombre completo del cliente
- `{{from_email}}` - Email del cliente
- `{{company}}` - Razón social de la empresa
- `{{ruc}}` - Número RUC (o "No proporcionado")
- `{{phone}}` - Número de teléfono
- `{{service}}` - Servicio de interés seleccionado
- `{{message}}` - Descripción del proyecto
- `{{date}}` - Fecha y hora de la consulta

## 🚀 Despliegue

### Para Producción
1. Verifica que todas las credenciales estén configuradas
2. Prueba el formulario en un entorno de producción
3. Monitorea los logs de EmailJS para detectar problemas
4. Verifica que las imágenes se carguen correctamente

### Para Desarrollo
1. Usa el script de prueba para verificar la configuración
2. Revisa la consola del navegador para errores
3. Usa datos de prueba para evitar spam
4. Verifica las rutas de imágenes en diferentes páginas

## 📞 Soporte

Si tienes problemas con la configuración:
1. Revisa los logs en la consola del navegador
2. Verifica la documentación oficial de EmailJS
3. Contacta al equipo de desarrollo

---

**Nota**: Las credenciales actuales en el código son ejemplos. Debes reemplazarlas con tus credenciales reales de EmailJS. 