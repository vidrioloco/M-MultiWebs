// Script para validar el formulario de contacto y enviarlo con EmailJS

document.addEventListener('DOMContentLoaded', function() {
    // Inicializar EmailJS con tu clave pública
    // Debes registrarte en EmailJS (https://www.emailjs.com/) y obtener tu clave pública
    emailjs.init("Clv5YzIZrpwzNcJzL");
    
    // Obtener referencia al formulario
    const formularioContacto = document.querySelector('.email_text');
    const botonEnviar = document.querySelector('.send_btn a');
    
    // Agregar evento de clic al botón de enviar
    botonEnviar.addEventListener('click', function(event) {
        event.preventDefault();
        
        // Obtener valores de los campos
        const nombre = document.querySelector('.email-bt[placeholder="Nombre"]').value.trim();
        const email = document.querySelector('.email-bt[placeholder="Email"]').value.trim();
        const mensaje = document.querySelector('.massage-bt').value.trim();
        
        // Validar campos
        if (!validarFormulario(nombre, email, mensaje)) {
            return false;
        }
        
        // Mostrar indicador de carga
        botonEnviar.textContent = "Enviando...";
        botonEnviar.style.pointerEvents = "none";
        
        // Preparar datos para EmailJS
        const datosFormulario = {
            nombre: nombre,
            email: email,
            mensaje: mensaje
        };
        
        // Enviar email usando EmailJS
        // Debes configurar una plantilla en EmailJS y obtener el ID de servicio y plantilla
        emailjs.send('service_966aetj', 'template_xzsr7gc', datosFormulario)
            .then(function(response) {
                console.log('Éxito!', response.status, response.text);
                mostrarMensaje('¡Mensaje enviado con éxito! Nos pondremos en contacto contigo pronto.', 'success');
                limpiarFormulario();
            }, function(error) {
                console.log('Error...', error);
                mostrarMensaje('Error al enviar el mensaje. Por favor, inténtalo de nuevo más tarde.', 'error');
            })
            .finally(function() {
                // Restaurar botón
                botonEnviar.textContent = "Enviar";
                botonEnviar.style.pointerEvents = "auto";
            });
    });
    
    // Función para validar el formulario
    function validarFormulario(nombre, email, mensaje) {
        // Validar nombre
        if (nombre === '') {
            mostrarMensaje('Por favor, introduce tu nombre', 'error');
            return false;
        }
        
        
        // Validar email
        const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!regexEmail.test(email)) {
            mostrarMensaje('Por favor, introduce un correo electrónico válido', 'error');
            return false;
        }
        
        // Validar mensaje
        if (mensaje === '') {
            mostrarMensaje('Por favor, escribe tu mensaje', 'error');
            return false;
        }
        
        return true;
    }
    
    // Función para mostrar mensajes de error o éxito
    function mostrarMensaje(texto, tipo) {
        // Verificar si ya existe un mensaje y eliminarlo
        const mensajeExistente = document.querySelector('.mensaje-alerta');
        if (mensajeExistente) {
            mensajeExistente.remove();
        }
        
        // Crear elemento para el mensaje
        const mensajeDiv = document.createElement('div');
        mensajeDiv.className = `mensaje-alerta mensaje-${tipo}`;
        mensajeDiv.textContent = texto;
        
        // Insertar mensaje después del formulario
        formularioContacto.parentNode.insertBefore(mensajeDiv, formularioContacto.nextSibling);
        
        // Eliminar mensaje después de 5 segundos
        setTimeout(function() {
            mensajeDiv.remove();
        }, 5000);
    }
    
    // Función para limpiar el formulario
    function limpiarFormulario() {
        document.querySelector('.email-bt[placeholder="Nombre"]').value = '';
        document.querySelector('.email-bt[placeholder="Email"]').value = '';
        document.querySelector('.massage-bt').value = '';
    }
}); 