

// --- FUNCIÓN VENTA DE CAMISETAS SEGÚN EL EQUIPO DEL USUARIO ---

let yaVendioCamisetas = false;

function venderCamisetas() {
  const contenedor = document.getElementById("ventaCamisetasContainer");
  contenedor.innerHTML = ""; 

  if (!equipoUsuario) {
    mostrarMensaje("Primero debes seleccionar un equipo.", "error");
    return;
  }

  if (!camisetaCreada) {
  mostrarMensaje("⚠️ Primero debes diseñar una camiseta.", "error");
  return;
 }

 if (yaVendioCamisetas) {
  mostrarMensaje("⚠️ Ya vendiste camisetas este semestre.", "error");
  return;
}

  const fuerza = obtenerFuerzaTotal(equipoUsuario);

  if (!fuerza) {
    mostrarMensaje("El equipo no tiene fuerza definida.", "error");
    return;
  }

  // -----------------------------
  // VALIDACIÓN SEGÚN FUERZA
  // -----------------------------
  let minUnidades, maxUnidades, minPrecio, maxPrecio;

  if (fuerza >= 69) {
  minUnidades = 20; maxUnidades = 80;
  minPrecio = 120000; maxPrecio = 180000;

} else if (fuerza >= 66) {
  minUnidades = 10; maxUnidades = 50;
  minPrecio = 100000; maxPrecio = 150000;

} else if (fuerza >= 63) {
  minUnidades = 5; maxUnidades = 25;
  minPrecio = 80000; maxPrecio = 130000;

} else {
  mostrarMensaje(`${equipoUsuario} no genera ventas de camisetas (poca hinchada).`, "error");
  return;
}

  // -----------------------------
  // GENERACIÓN DE VALORES
  // -----------------------------
  const cantidadVendida = Math.floor(Math.random() * (maxUnidades - minUnidades + 1)) + minUnidades;
  const precioCamiseta = Math.floor(Math.random() * (maxPrecio - minPrecio + 1)) + minPrecio;

  // TOTAL = CANTIDAD × PRECIO
  const totalRecaudado = cantidadVendida * precioCamiseta;

  // Sumar al presupuesto
   sumarPresupuesto(totalRecaudado);

   balanceEconomico.camisetas += totalRecaudado;
   actualizarBalanceUI();

   yaVendioCamisetas = true;

  // Mostrar tarjeta
  mostrarTarjetaVenta(equipoUsuario, cantidadVendida, precioCamiseta, totalRecaudado);
}

function mostrarTarjetaVenta(equipo, cantidad, precioCamiseta, totalVentas) {
  const contenedor = document.getElementById("ventaCamisetasContainer");

  const tarjetaHTML = `
    <div class="tarjeta-venta">
      <h2>Resumen de Ventas</h2>

      <div class="fila">
        <span>Precio por camiseta</span>
        <strong>$${precioCamiseta.toLocaleString()}</strong>
      </div>

      <div class="fila">
        <span>Cantidad vendida</span>
        <strong>${cantidad.toLocaleString()} unidades</strong>
      </div>

      <hr>

      <div class="fila total">
        <span>Total recaudado</span>
        <strong>$${totalVentas.toLocaleString()}</strong>
      </div>
    </div>
  `;

  contenedor.innerHTML = tarjetaHTML;
}

function mostrarMensaje(texto, tipo = "info") {
  const contenedor = document.getElementById("ventaCamisetasContainer");
  const color = tipo === "error" ? "#ff4444" : "#0066ff";
  contenedor.innerHTML = `<div class="mensaje" style="color:${color};padding:8px;">${texto}</div>`;
}