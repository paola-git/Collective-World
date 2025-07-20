document.addEventListener('DOMContentLoaded', function () {
    cargarCarrito();

    // Botones para agregar productos
    let botonesAgregar = document.getElementsByClassName('agregar-carrito');
    for (let i = 0; i < botonesAgregar.length; i++) {
        botonesAgregar[i].addEventListener('click', agregarProducto);
    }

    // Botón para vaciar el carrito
    document.getElementById('vaciar-carrito').addEventListener('click', function () {
        localStorage.removeItem('carrito');
        cargarCarrito();
    });

    // Botón para pagar
    document.getElementById('btnPagar').addEventListener('click', pagar);
});

function agregarProducto(event) {
    let producto = {
        id: event.target.getAttribute('data-id'),
        nombre: event.target.getAttribute('data-nombre'),
        precio: event.target.getAttribute('data-precio')
    };

    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    carrito.push(producto);
    localStorage.setItem('carrito', JSON.stringify(carrito));
    cargarCarrito();
}

function cargarCarrito() {
    let listaCarrito = document.getElementById('lista-carrito');
    let totalCarrito = document.getElementById('total-carrito');
    listaCarrito.innerHTML = '';
    totalCarrito.textContent = '0';

    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    let total = 0;

    for (let i = 0; i < carrito.length; i++) {
        let producto = carrito[i];
        let li = document.createElement('li');
        li.textContent = producto.nombre + ' - $' + producto.precio;
        listaCarrito.appendChild(li);
        total += parseFloat(producto.precio) || 0;
    }

    totalCarrito.textContent = total.toFixed(2);
}

function pagar() {
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

    if (carrito.length === 0) {
        alert("El carrito está vacío");
        return;
    }

    let total = 0;
    for (let i = 0; i < carrito.length; i++) {
        total += parseFloat(carrito[i].precio) || 0;
    }

    localStorage.setItem('productos', JSON.stringify(carrito));
    localStorage.setItem('total', total.toFixed(2));

    alert(`Total a pagar: $${total.toFixed(2)}`);
    window.location.href = "compra.html"; // Asegurate de que este archivo exista
}