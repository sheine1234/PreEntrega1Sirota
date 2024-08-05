// Definir array de objetos con el menú de Aieka
let menuAieka = [
    { id: 1, nombre: 'Hamburguesa', precio: 3500, categoria: 'Comida Rápida', imagen: 'hamburguesa.jpg' },
    { id: 2, nombre: 'Papas Fritas', precio: 2000, categoria: 'Comida Rápida', imagen: 'papas.jpg' },
    { id: 3, nombre: 'Sushi', precio: 5000, categoria: 'Especialidades', imagen: 'sushi.jpg' },
    { id: 4, nombre: 'Sándwich de Milanesa', precio: 3500, categoria: 'Comida Rápida', imagen: 'milanesa.jpg' },
    { id: 5, nombre: 'Ensalada', precio: 3000, categoria: 'Saludable', imagen: 'ensalada.jpg' }
];

// Guardar menú en localStorage
localStorage.setItem('menuAieka', JSON.stringify(menuAieka));

// Función para obtener menú desde localStorage
function obtenerMenu() {
    return JSON.parse(localStorage.getItem('menuAieka')) || [];
}

// Función para mostrar el menú completo en el DOM
function mostrarMenuCompleto() {
    let menu = obtenerMenu();
    let menuDiv = document.getElementById('menuCompleto');
    menuDiv.innerHTML = '';
    menu.forEach(producto => {
        menuDiv.innerHTML += `
            <div class="col-md-4 menu-item">
                <div class="card shadow-sm">
                    <img src="../styles/images/${producto.imagen}" class="card-img-top" alt="${producto.nombre}">
                    <div class="card-body">
                        <h5 class="card-title">${producto.nombre}</h5>
                        <p class="card-text">$${producto.precio}</p>
                        <button class="btn btn-primary add-to-cart" data-id="${producto.id}" data-name="${producto.nombre}" data-price="${producto.precio}">Agregar al Carrito</button>
                    </div>
                </div>
            </div>
        `;
    });

    // Añado event listener a los botones "Agregar al Carrito"
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', function() {
            agregarAlCarrito(parseInt(this.getAttribute('data-id')));
        });
    });
}

// Carrito
let carrito = [];

// Función para agregar productos al carrito
function agregarAlCarrito(id) {
    let menu = obtenerMenu();
    let producto = menu.find(p => p.id === id);
    carrito.push(producto);
    mostrarCarrito();
}

// Función para mostrar el carrito en el DOM
function mostrarCarrito() {
    let carritoDiv = document.getElementById('carrito');
    carritoDiv.innerHTML = '';
    let totalCuenta = 0;
    carrito.forEach(producto => {
        carritoDiv.innerHTML += `
            <div class="col-md-4 menu-item">
                <div class="card shadow-sm">
                    <img src="../styles/images/${producto.imagen}" class="card-img-top" alt="${producto.nombre}">
                    <div class="card-body">
                        <h5 class="card-title">${producto.nombre}</h5>
                        <p class="card-text">$${producto.precio}</p>
                    </div>
                </div>
            </div>
        `;
        totalCuenta += producto.precio;
    });
    document.getElementById('totalCuenta').innerText = `$${totalCuenta}`;
}

// Función para calcular descuento
function calcularDescuento(totalCuenta) {
    let totalConDescuento = totalCuenta;
    if (totalCuenta > 5000) {
        let descuento = totalCuenta * 0.1;
        totalConDescuento = totalCuenta - descuento;
        return { totalConDescuento, descuento: true };
    } else {
        return { totalConDescuento, descuento: false };
    }
}

// Función para calcular propina
function calcularPropina() {
    let totalCuenta = parseFloat(document.getElementById('totalCuenta').innerText.replace('$', ''));
    let porcentajePropina = parseFloat(document.getElementById('porcentajePropina').value);
    let resultadoDiv = document.getElementById('resultadoPropina');
    let { totalConDescuento, descuento } = calcularDescuento(totalCuenta);
    let propina = totalConDescuento * (porcentajePropina / 100);
    let totalConPropina = totalConDescuento + propina;
    resultadoDiv.style.display = 'block';
    resultadoDiv.innerHTML = `La propina es: $${propina.toFixed(2)}<br>El total con propina es: $${totalConPropina.toFixed(2)}<br>`;
    if (descuento) {
        resultadoDiv.innerHTML += `¡Felicidades! Se aplicó un descuento del 10%<br>`;
    } else {
        resultadoDiv.innerHTML += `Lo sentimos, no se aplicó descuento.<br>`;
    }
}

// Añadir event listener al botón "Calcular Propina"
document.getElementById('calcularPropinaBtn').addEventListener('click', calcularPropina);

// Mostrar menú al cargar la página
mostrarMenuCompleto();
