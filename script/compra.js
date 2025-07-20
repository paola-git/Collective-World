document.addEventListener("DOMContentLoaded", function () {
    const productos = JSON.parse(localStorage.getItem('productos')) || [];
    const total = localStorage.getItem('total') || 0;
    const totalNumerico = parseFloat(total) || 0;
    const totalFormateado = totalNumerico.toFixed(2);

    const resumenDiv = document.getElementById("detalle");

    let resumenTextoHTML = "<h3>Resumen de tu Compra:</h3><ul>";

    for (let i = 0; i < productos.length; i++) {
        const productoActual = productos[i]; 
        resumenTextoHTML += `<li>${productoActual.nombre}: $${parseFloat(productoActual.precio).toFixed(2)}</li>`;
    }

    resumenTextoHTML += `</ul><p><strong>Total a pagar: $${totalFormateado}</strong></p>`;
    resumenDiv.innerHTML = resumenTextoHTML;

    const botonEnviar = document.getElementById('botonEnviar');

    if (botonEnviar) {
        botonEnviar.addEventListener('click', function (event) {
            event.preventDefault();

            const nombreContacto = document.getElementById('nombre').value.trim();
            const emailContacto = document.getElementById('contactoEmail').value.trim();
            const telefonoContacto = document.getElementById('telefono').value.trim();

            if (!nombreContacto || !emailContacto || !telefonoContacto) {
                alert("Por favor, completa todos los campos de contacto antes de enviar.");
                return;
            }

            let detallesCarritoParaEnvio = '';
            for (let i = 0; i < productos.length; i++) {
                const productoActual = productos[i];
                detallesCarritoParaEnvio += `${productoActual.nombre} - $${parseFloat(productoActual.precio).toFixed(2)}\n`;
            }

            document.getElementById('carritoData').value = detallesCarritoParaEnvio;
            document.getElementById('totalCarrito').value = `$${totalFormateado}`;
            document.getElementById('formulario').submit();
        });
    } else {
        console.warn("ADVERTENCIA: No se encontró el botón con ID 'botonEnviar'.");
    }
});