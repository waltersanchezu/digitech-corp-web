// ========================================
// SCRIPT DE PRUEBA PARA EMAILJS
// ========================================

// Función para probar la configuración de EmailJS
function testEmailJSConfig() {
    console.log('=== PRUEBA DE CONFIGURACIÓN EMAILJS ===');
    
    // Verificar que EmailJS esté cargado
    if (typeof emailjs === 'undefined') {
        console.error('❌ EmailJS no está cargado');
        return false;
    } else {
        console.log('✅ EmailJS está cargado correctamente');
    }
    
    // Verificar configuración
    if (!window.EMAILJS_CONFIG) {
        console.error('❌ Configuración de EmailJS no encontrada');
        return false;
    }
    
    const config = window.EMAILJS_CONFIG;
    console.log('📋 Configuración actual:');
    console.log('- Service ID:', config.serviceId);
    console.log('- Template ID:', config.templateId);
    console.log('- Public Key:', config.publicKey);
    
    // Verificar que las credenciales no sean las por defecto
    if (config.publicKey === 'YOUR_PUBLIC_KEY') {
        console.error('❌ EmailJS no está configurado. Usa las credenciales reales.');
        return false;
    }
    
    console.log('✅ Configuración válida');
    return true;
}

// Función para enviar email de prueba
async function sendTestEmail() {
    if (!testEmailJSConfig()) {
        console.error('No se puede enviar email de prueba - configuración inválida');
        return;
    }
    
    const config = window.EMAILJS_CONFIG;
    
    try {
        console.log('📧 Enviando email de prueba...');
        
        const templateParams = {
            to_email: 'info@digitech-corp.pe',
            from_name: 'Prueba Automática',
            from_email: 'test@digitech-corp.pe',
            company: 'DIGITECH CORP',
            ruc: '12345678901',
            phone: '+51 999 999 999',
            service: 'Software a Medida',
            message: 'Este es un email de prueba para verificar que el sistema de envío de emails funciona correctamente.',
            date: new Date().toLocaleString('es-PE')
        };
        
        const response = await emailjs.send(
            config.serviceId,
            config.templateId,
            templateParams
        );
        
        console.log('✅ Email de prueba enviado exitosamente');
        console.log('Response:', response);
        
    } catch (error) {
        console.error('❌ Error al enviar email de prueba:', error);
    }
}

// Función para mostrar instrucciones
function showSetupInstructions() {
    console.log(`
=== INSTRUCCIONES DE CONFIGURACIÓN ===

1. Ve a https://www.emailjs.com/ y crea una cuenta
2. Crea un servicio de email (Gmail, Outlook, etc.)
3. Crea una plantilla de email
4. Obtén tu clave pública
5. Actualiza el archivo scripts/emailjs-config.js con tus credenciales
6. Ejecuta testEmailJSConfig() para verificar
7. Ejecuta sendTestEmail() para probar el envío

Para más detalles, consulta el archivo EMAILJS_SETUP.md
    `);
}

// Exportar funciones para uso en consola
window.testEmailJS = {
    testConfig: testEmailJSConfig,
    sendTest: sendTestEmail,
    showInstructions: showSetupInstructions
};

// Auto-ejecutar prueba si se carga este archivo
if (typeof window !== 'undefined') {
    console.log('🔧 Script de prueba de EmailJS cargado');
    console.log('Usa testEmailJS.testConfig() para verificar la configuración');
    console.log('Usa testEmailJS.sendTest() para enviar un email de prueba');
    console.log('Usa testEmailJS.showInstructions() para ver las instrucciones');
} 