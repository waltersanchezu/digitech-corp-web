// ========================================
// SCRIPT DE PRUEBA PARA EMAILJS
// ========================================

// Este script permite probar la configuración de EmailJS
// desde la consola del navegador

document.addEventListener('DOMContentLoaded', function() {
    // Agregar función global para pruebas
    window.testEmailJS = testEmailJS;
    window.testEmailJSConfig = testEmailJSConfig;
    window.testEmailJSWithFormData = testEmailJSWithFormData;
    
    console.log('✅ Script de prueba de EmailJS cargado');
    console.log('📧 Para probar EmailJS, ejecuta en la consola: testEmailJS()');
    console.log('🔧 Para verificar configuración, ejecuta: testEmailJSConfig()');
    console.log('📝 Para llenar formulario con datos de prueba: testEmailJSWithFormData()');
    
    // Ejecutar verificación automática
    setTimeout(() => {
        testEmailJSConfig();
    }, 1000);
});

function testEmailJSConfig() {
    console.log('🔧 Verificando configuración de EmailJS...');
    
    // Verificar que EmailJS esté cargado
    if (typeof emailjs === 'undefined') {
        console.error('❌ EmailJS no está cargado. Verifica que el CDN esté incluido.');
        console.log('💡 Solución: Asegúrate de que el script de EmailJS esté cargado antes de este script');
        return false;
    }
    
    // Verificar configuración
    if (!window.EMAILJS_CONFIG) {
        console.error('❌ Configuración de EmailJS no encontrada.');
        console.log('💡 Solución: Verifica que emailjs-config.js esté cargado correctamente');
        return false;
    }
    
    const config = window.EMAILJS_CONFIG;
    
    console.log('📋 Configuración actual:');
    console.log('- Service ID:', config.serviceId);
    console.log('- Template ID:', config.templateId);
    console.log('- Public Key:', config.publicKey);
    
    // Verificar si las credenciales están configuradas
    if (config.publicKey === 'YOUR_PUBLIC_KEY') {
        console.error('❌ EmailJS no está configurado. Por favor, configura las credenciales en emailjs-config.js');
        return false;
    }
    
    if (config.serviceId === 'service_digitech_contact') {
        console.warn('⚠️ Service ID parece ser un placeholder. Verifica que sea el ID real.');
    }
    
    if (config.templateId === 'template_digitech_contact') {
        console.warn('⚠️ Template ID parece ser un placeholder. Verifica que sea el ID real.');
    }
    
    console.log('✅ Configuración verificada');
    return true;
}

async function testEmailJS() {
    console.log('🧪 Iniciando prueba de EmailJS...');
    
    // Verificar configuración primero
    if (!testEmailJSConfig()) {
        return;
    }
    
    try {
        // Inicializar EmailJS
        emailjs.init(window.EMAILJS_CONFIG.publicKey);
        console.log('✅ EmailJS inicializado');
        
        // Datos de prueba
        const testData = {
            to_email: 'info@digitech-corp.pe',
            from_name: 'Prueba EmailJS',
            from_email: 'test@digitech-corp.pe',
            company: 'DIGITECH CORP - Prueba',
            ruc: '12345678901',
            phone: '+51 989 975 369',
            service: 'Software a Medida',
            message: 'Esta es una prueba del sistema de envío de emails desde el formulario de contacto. Si recibes este mensaje, significa que EmailJS está configurado correctamente.',
            date: new Date().toLocaleString('es-PE')
        };
        
        console.log('📤 Enviando email de prueba...');
        console.log('📧 Datos de prueba:', testData);
        
        // Enviar email de prueba
        const response = await emailjs.send(
            window.EMAILJS_CONFIG.serviceId,
            window.EMAILJS_CONFIG.templateId,
            testData
        );
        
        if (response.status === 200) {
            console.log('✅ Email de prueba enviado exitosamente!');
            console.log('📧 Verifica tu bandeja de entrada en info@digitech-corp.pe');
            console.log('📋 Response:', response);
        } else {
            console.error('❌ Error en el envío:', response);
        }
        
    } catch (error) {
        console.error('❌ Error durante la prueba:', error);
        console.log('🔧 Posibles soluciones:');
        console.log('1. Verifica que las credenciales sean correctas');
        console.log('2. Verifica que el servicio esté activo en EmailJS');
        console.log('3. Verifica que la plantilla esté publicada');
        console.log('4. Revisa la consola para errores específicos');
        console.log('5. Verifica que tu cuenta EmailJS tenga créditos disponibles');
    }
}

// Función para probar con datos del formulario
function testEmailJSWithFormData() {
    console.log('🧪 Probando EmailJS con datos del formulario...');
    
    const form = document.getElementById('contactForm');
    if (!form) {
        console.error('❌ Formulario de contacto no encontrado');
        return;
    }
    
    // Llenar formulario con datos de prueba
    const testData = {
        fullName: 'Juan Pérez',
        company: 'Empresa de Prueba S.A.C.',
        ruc: '12345678901',
        email: 'juan.perez@empresa.com',
        phone: '+51 989 975 369',
        service: 'software-medida',
        message: 'Necesitamos un sistema de gestión para nuestra empresa. Esta es una prueba del formulario de contacto.'
    };
    
    // Llenar campos del formulario
    Object.keys(testData).forEach(key => {
        const field = form.querySelector(`[name="${key}"]`);
        if (field) {
            field.value = testData[key];
            console.log(`✅ Campo ${key} llenado con: ${testData[key]}`);
        }
    });
    
    // Marcar checkbox de privacidad
    const privacyCheckbox = form.querySelector('#privacy');
    if (privacyCheckbox) {
        privacyCheckbox.checked = true;
        console.log('✅ Checkbox de privacidad marcado');
    }
    
    console.log('✅ Formulario llenado con datos de prueba');
    console.log('📝 Ahora puedes hacer clic en "Enviar Correo" para probar el envío real');
}

// Mostrar instrucciones en consola
console.log(`
📧 CONFIGURACIÓN DE EMAILJS - DIGITECH CORP

Para configurar EmailJS:

1. Ve a https://www.emailjs.com/ y crea una cuenta
2. Crea un servicio de email (Gmail, Outlook, etc.)
3. Crea una plantilla usando el código HTML en emailjs-config.js
4. Obtén tus credenciales (Service ID, Template ID, Public Key)
5. Actualiza emailjs-config.js con tus credenciales reales

Comandos disponibles:
- testEmailJSConfig() - Verificar configuración
- testEmailJS() - Enviar email de prueba
- testEmailJSWithFormData() - Llenar formulario con datos de prueba

Para más información, revisa EMAILJS_SETUP.md
`); 