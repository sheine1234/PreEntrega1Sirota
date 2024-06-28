// Consigna 1:Crear un algoritmo con un condicional.
// Función para verificar si el cliente obtiene un descuento
function verificarDescuento() {
    let totalPedido = parseFloat(prompt("Ingrese el total de su pedido:"));
    if (isNaN(totalPedido) || totalPedido <= 0) {
        alert("Por favor, ingrese un monto válido.");
        return;
    }
    if (totalPedido >= 10000) {
        let descuento = totalPedido * 0.10;
        let totalConDescuento = totalPedido - descuento;
        alert(`¡Felicidades! Usted califica para un descuento del 10%.\nTotal del pedido: $${totalPedido}\nDescuento aplicado: $${descuento}\nTotal con descuento: $${totalConDescuento}`);
    } else {
        let faltante = 10000 - totalPedido;
        alert(`Lo sentimos, su pedido no califica para un descuento.\nTotal del pedido: $${totalPedido}\nFaltan $${faltante} para calificar para un descuento.`);
    }
}
verificarDescuento();

// Consigna 2: Crear un algoritmo utilizando un ciclo:
// Función para calcular la cuenta total con propina
function calculoCuentaTotal() {
    let numeroPlatos = parseInt(prompt("¿Cuántos platos ha pedido?"));
    let total = 0;
    let porcentajePropina = parseInt(prompt("Ingrese el porcentaje de propina (por ejemplo, 10 para 10%):"));

    if (isNaN(numeroPlatos) || numeroPlatos <= 0) {
        alert("Por favor, ingrese un número válido de platos.");
        return;
    }
    if (isNaN(porcentajePropina) || porcentajePropina < 0) {
        alert("Por favor, ingrese un porcentaje de propina válido.");
        return;
    }
    for (let i = 0; i < numeroPlatos; i++) {
        let precio = parseFloat(prompt(`Ingrese el precio del plato ${i + 1}:`));
        while (isNaN(precio) || precio <= 0) {
            alert("Por favor, ingrese un precio válido.");
            precio = parseFloat(prompt(`Ingrese el precio del plato ${i + 1}:`));
        }
        total += precio;
    }

    let propina = (total * porcentajePropina) / 100;
    let finalTotal = total + propina;

    alert(`Total sin propina: $${total}\nPropina (${porcentajePropina}%): $${propina}\nTotal con propina: $${finalTotal}`);
}
calculoCuentaTotal();

