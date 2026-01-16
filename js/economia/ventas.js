

// --- FUNCIÓN VENTA DE CAMISETAS SEGÚN EL EQUIPO DEL USUARIO ---

function venderCamisetas() {
  const contenedor = document.getElementById("ventaCamisetasContainer");
  contenedor.innerHTML = ""; 

  if (!equipoUsuario) {
    mostrarMensaje("Primero debes seleccionar un equipo.", "error");
    return;
  }

  const fuerza = obtenerFuerzaEquipo(equipoUsuario);

  if (!fuerza) {
    mostrarMensaje("El equipo no tiene fuerza definida.", "error");
    return;
  }

  // -----------------------------
  // VALIDACIÓN SEGÚN FUERZA
  // -----------------------------
  let minUnidades, maxUnidades, minPrecio, maxPrecio;

  if (fuerza >= 72) {
    minUnidades = 50; maxUnidades = 200;
    minPrecio = 120000; maxPrecio = 200000;

  } else if (fuerza >= 67) {
    minUnidades = 30; maxUnidades = 120;
    minPrecio = 110000; maxPrecio = 180000;

  } else if (fuerza >= 63) {
    minUnidades = 15; maxUnidades = 80;
    minPrecio = 100000; maxPrecio = 160000;

  } else if (fuerza >= 60) {
    minUnidades = 5; maxUnidades = 50;
    minPrecio = 90000; maxPrecio = 150000;

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

  // Mostrar tarjeta
  mostrarTarjetaVenta(equipoUsuario, cantidadVendida, precioCamiseta, totalRecaudado);
}

function mostrarTarjetaVenta(equipo, cantidad, precioCamiseta, totalVentas) {
  const contenedor = document.getElementById("ventaCamisetasContainer");

  const nombreNormalizado = equipo
  .toLowerCase()
  .replace(/\s+/g, "_")
  .replace(/[áéíóú]/g, (m) => ({ á: "a", é: "e", í: "i", ó: "o", ú: "u" }[m]));

  const logoPath = `escudos/${nombreNormalizado}.png`;


  const tarjetaHTML = `
    <div class="tarjeta-venta">
      <h2>🛍️ Venta de Camisetas</h2>
      <img src="${logoPath}" alt="${equipo}" class="logo-equipo">
      <h3>${equipo}</h3>
      <p><strong>Precio por camiseta:</strong> $${precioCamiseta.toLocaleString()}</p>
      <p><strong>Cantidad vendida:</strong> ${cantidad.toLocaleString()} unidades</p>
      <p><strong>Total recaudado:</strong> $${totalVentas.toLocaleString()}</p>
    </div>
  `;

  contenedor.innerHTML = tarjetaHTML;
}

function mostrarMensaje(texto, tipo = "info") {
  const contenedor = document.getElementById("ventaCamisetasContainer");
  const color = tipo === "error" ? "#ff4444" : "#0066ff";
  contenedor.innerHTML = `<div class="mensaje" style="color:${color};padding:8px;">${texto}</div>`;
}