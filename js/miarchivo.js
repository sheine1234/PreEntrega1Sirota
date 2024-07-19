// Definir array de objetos con el menú de Aieka
const menuAieka = [
    { id: 1, nombre: 'Hamburguesa', precio: 3.500, categoria: 'Comida Rápida' },
    { id: 2, nombre: 'Papas Fritas', precio: 2.000, categoria: 'Comida Rápida' },
    { id: 3, nombre: 'Sushi', precio: 5.000, categoria: 'Especialidades' },
    { id: 4, nombre: 'Sándwich de Milanesa', precio: 3.500, categoria: 'Comida Rápida' },
    { id: 5, nombre: 'Ensalada', precio: 3.000, categoria: 'Saludable' }
];

// Categorías disponibles
const categoriasDisponibles = menuAieka.map(producto => producto.categoria.toLowerCase());

// Función para capturar entradas del usuario
function capturarCategoria() {
    let categoria;
    do {
        categoria = prompt("Ingrese la categoría de producto que busca (Comida Rápida, Especialidades, Saludable) o escriba 'salir' para terminar:");
        if (categoria === null || categoria.toLowerCase() === 'salir') {
            return null;
        }
        if (!categoriasDisponibles.includes(categoria.toLowerCase())) {
            alert("Categoría no válida. Por favor, ingrese una categoría válida.");
        }
    } while (!categoria.trim() || !categoriasDisponibles.includes(categoria.toLowerCase()));
    return categoria;
}

// Función para filtrar productos por categoría
function filtrarProductosPorCategoria(categoria) {
    return menuAieka.filter(producto => producto.categoria.toLowerCase() === categoria.toLowerCase());
}

// Función para mostrar productos filtrados en un alert
function mostrarProductosFiltrados(productos) {
    if (productos.length === 0) {
        alert("No hay productos en la categoría seleccionada.");
        return;
    }
    let mensaje = "Productos en la categoríaseleccionada:\n";
    productos.forEach(producto => {
        mensaje += `Nombre: ${producto.nombre}, Precio: $${producto.precio}\n`;
    });
    alert(mensaje);
}

// Función para capturar el total de la cuenta
function capturarTotalCuenta() {
    let totalCuenta;
    do {
        totalCuenta = prompt("Ingrese el total de la cuenta o escriba 'salir' para terminar:");
        if (totalCuenta === null || totalCuenta.toLowerCase() === 'salir') {
            return null;
        }
        totalCuenta = parseFloat(totalCuenta);
        if (isNaN(totalCuenta) || totalCuenta <= 0) {
            alert("Total de la cuenta no válido. Por favor, ingrese un valor numérico positivo.");
        }
    } while (isNaN(totalCuenta) || totalCuenta <= 0);
    return totalCuenta;
}

// Función para capturar el porcentaje de propina
function capturarPorcentajePropina() {
    let porcentajePropina;
    do {
        porcentajePropina = prompt("Ingrese el porcentaje de propina (ejemplo 15 para 15%) o escriba 'salir' para terminar:");
        if (porcentajePropina === null || porcentajePropina.toLowerCase() === 'salir') {
            return null;
        }
        porcentajePropina = parseFloat(porcentajePropina);
        if (isNaN(porcentajePropina) || porcentajePropina < 0) {
            alert("Porcentaje de propina no válido. Por favor, ingrese un valor numérico positivo.");
        }
    } while (isNaN(porcentajePropina) || porcentajePropina < 0);
    return porcentajePropina;
}

// Función para calcular propina y total con propina
function calcularPropinaYTotal(totalCuenta, porcentajePropina) {
    let propina = totalCuenta * (porcentajePropina / 100);
    let totalConPropina = totalCuenta + propina;
    return { propina, totalConPropina };
}

// Función para mostrar resultados de propina
function mostrarResultadosPropina(propina, totalConPropina) {
    alert(`La propina es: $${propina.toFixed(2)}\nEl total con propina es: $${totalConPropina.toFixed(2)}`);
}

// Función para verificar si el cliente obtiene un descuento basado en el total de la cuenta
function verificarDescuento(totalCuenta) {
    let porcentajeDescuento = 10; // Porcentaje de descuento
    let totalConDescuento = totalCuenta;

    if (totalCuenta > 5.000) {
        let descuento = totalCuenta * (porcentajeDescuento / 100);
        totalConDescuento = totalCuenta - descuento;
        alert(`¡Felicidades! Usted obtiene un descuento del ${porcentajeDescuento}%.\nTotal con descuento: $${totalConDescuento.toFixed(2)}`);
    } else {
        alert("Lo sentimos, usted no califica para un descuento.");
    }
    return totalConDescuento;
}

// Ejecución del simulador
let categoriaBuscada = capturarCategoria();
if (categoriaBuscada) {
    // Filtrar productos por la categoría seleccionada
    let productosFiltrados = filtrarProductosPorCategoria(categoriaBuscada);
    // Mostrar productos filtrados en un alert
    mostrarProductosFiltrados(productosFiltrados);
    let totalCuenta = capturarTotalCuenta();
    if (totalCuenta !== null) {
        totalCuenta = verificarDescuento(totalCuenta);

        let porcentajePropina = capturarPorcentajePropina();
        if (porcentajePropina !== null) {
            let resultados = calcularPropinaYTotal(totalCuenta, porcentajePropina);
            mostrarResultadosPropina(resultados.propina, resultados.totalConPropina);
        }
    }
}

alert("Gracias por su compra.");
console.log("Simulación finalizada.");
