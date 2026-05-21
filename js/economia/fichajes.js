function simularMercadoFichajesNuevo() {
  const mercadoDiv = document.getElementById("mercadoFichajes");
  mercadoDiv.innerHTML = "<h3>💸 Mercado de Fichajes</h3><ul>";

  mercadoDiv.innerHTML += `
  <div class="nota-mercado">
    💸 <strong>Aviso del mercado:</strong> Los valores mostrados están redondeados y pueden variar levemente por comisiones, impuestos o cláusulas. Esas "pequeñas diferencias" son parte del negocio. ⚽
  </div>
`;

  const todosLosEquipos = [
  ...equiposPrimera.map(e => e.nombre),
  ...equiposSegunda.map(e => e.nombre)
];

const equiposVendedores = [
  ...todosLosEquipos,
  "Extranjero"
];


  // Inicializar presupuestos si no existen
  todosLosEquipos.forEach(eq => {
    if (!presupuestosEquipos[eq]) {
      presupuestosEquipos[eq] = calcularPresupuestoPorFuerza(obtenerFuerzaTotal(eq));
    }
  });

  // Cada equipo intenta hacer 1 o 2 operaciones
    //todosLosEquipos.forEach(equipo => {

  todosLosEquipos
  .filter(equipo => equipo !== equipoUsuario)
  .forEach(equipo => {

    const plantilla = plantillasJugadores[equipo];
    if (!plantilla || plantilla.length === 0) return;

    const operaciones = Math.floor(Math.random() * 2) + 1;

    for (let i = 0; i < operaciones; i++) {

      const vendedores = equiposVendedores.filter(e => e !== equipo && plantillasJugadores[e]?.length > 0);

      if (vendedores.length === 0) continue;

      const vendedor = vendedores[Math.floor(Math.random() * vendedores.length)];
      const jugador = plantillasJugadores[vendedor][Math.floor(Math.random() * plantillasJugadores[vendedor].length)];
      if (!jugador) continue;

      const precio = calcularPrecioJugador(jugador);

      // Verificar presupuesto
/*
      if (equipo === equipoUsuario) {
        if (presupuestoVisible < precio) {
          mercadoDiv.innerHTML += `<li>${equipoUsuario} no tiene presupuesto para fichar a <b>${jugador.nombre}</b>.</li>`;
          continue;
        }
      } 
*/
      if (presupuestosEquipos[equipo] < precio) {
        continue; // IA sin presupuesto no compra
      }

      // Transferencia
      plantillasJugadores[vendedor].splice(plantillasJugadores[vendedor].indexOf(jugador), 1);
      plantillasJugadores[equipo].push(jugador);

      delete sueldosEquipos[vendedor];
      delete sueldosEquipos[equipo];

      // Ajustar presupuestos
/*
      if (equipo === equipoUsuario) {
        presupuestosEquipos[equipoUsuario] -= precio;
        restarPresupuesto(precio);
        balanceEconomico.compras -= precio;
      } 
*/
      if (vendedor === equipoUsuario) {
        presupuestosEquipos[equipoUsuario] += precio;
        sumarPresupuesto(precio);
        balanceEconomico.ventas += precio;
      } else {
        presupuestosEquipos[equipo] -= precio;
        presupuestosEquipos[vendedor] += precio;
      }

      // 📌 Escudos en lugar de nombres
      //const foto = jugador.foto || "img/jugadores/default.png";
      const foto = getFotoJugador(jugador);

      //const vendedorLimpio = vendedor.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/ /g, "_");
      //const equipoLimpio = equipo.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/ /g, "_");
      
      /*
       const escudoVendedor = vendedor === "Extranjero"
       ? "🌍 Exterior"
       : `<img src="escudos/${vendedorLimpio}.png" class="escudos">`;
        <b>${jugador.nombre}</b> pasó de ${escudoVendedor} a ${escudoComprador}
       */

       const escudoVendedor = vendedor === "Extranjero"
       ? "🌍 Exterior"
       : `<img src="${getEscudoEquipo(vendedor)}" 
       onerror="this.src='escudos/default.png'" 
       class="escudos">`;

      //const escudoComprador = `<img src="escudos/${equipoLimpio}.png" alt="${equipo}" class="escudos">`;

      const escudoComprador = `
      <img src="${getEscudoEquipo(equipo)}" 
      onerror="this.src='escudos/default.png'" 
      class="escudos">`;

      mercadoDiv.innerHTML += `
        <li>
          <img src="${foto}" alt="${jugador.nombre}" class="fotoJugador">  
          <b>${jugador.nombre}</b> pasó de ${escudoVendedor} <span class="nombreEquipo">
             ${vendedor}</span> a ${escudoComprador} <span class="nombreEquipo">${equipo}</span>
          por ${formatearPrecio(precio)}
        </li>`;

       // 🐦 Publicación tipo Twitter
publicarNoticiaTwitter(equipo, jugador.nombre, precio);

    }
  });

  mercadoDiv.innerHTML += "</ul>";
}

//FICHAJES USUARIO
function abrirChatDirector() {
    if (!equipoUsuario) {
    alert("⚠️ Debes seleccionar un equipo antes de iniciar la simulación.");
    return;
  }

  document.getElementById("modalDirector").classList.add("activo");
}

function cerrarChatDirector() {
  document.getElementById("modalDirector").classList.remove("activo");
}


function limpiarChatDirector() {
  document.getElementById("chatDirector").innerHTML =
    `<p><b>Director:</b> Empecemos de nuevo, presidente.</p>`;
  document.getElementById("opcionesDirector").innerHTML = "";
}


let fichajesUsuarioRealizados = 0;
const LIMITE_FICHAJES_USUARIO = 6;

function directorMejoresJugadores() {
  const chat = document.getElementById("chatDirector");
  const opcionesDiv = document.getElementById("opcionesDirector");

  opcionesDiv.innerHTML = "";

  const fuerzaEquipo = obtenerFuerzaTotal(equipoUsuario);
  const { min, max } = obtenerRangoFichajePorFuerza(fuerzaEquipo);

  chat.innerHTML += `
    <p><b>Director:</b> Según nuestro nivel actual (${fuerzaEquipo}),
    podemos fichar jugadores entre <b>${min}</b> y <b>${max}</b> de media.</p>
  `;

  const candidatos = [];

  Object.keys(plantillasJugadores).forEach(equipo => {
    if (equipo === equipoUsuario) return;

    plantillasJugadores[equipo].forEach(jugador => {
      if (jugador.media >= min && jugador.media <= max) {
        candidatos.push({ jugador, equipo });
      }
    });
  });

  if (candidatos.length === 0) {
    opcionesDiv.innerHTML = `
      <p>No hay jugadores disponibles dentro de nuestro rango actual.</p>
    `;
    return;
  }

  // 🔀 Aleatoriedad leve (no siempre los mismos)
  candidatos.sort(() => Math.random() - 0.5);

  const seleccion = candidatos.slice(0, 6);

  seleccion.forEach(({ jugador, equipo }) => {
    const precio = calcularPrecioJugador(jugador);
    //const foto = jugador.foto || "img/jugadores/default.png";
     //<img src="${foto}" class="fotoJugador"></img>
    opcionesDiv.innerHTML += `
      <div class="opcion-jugador">
        <img src="${getFotoJugador(jugador)}"
        onerror="this.src='img/jugadores/default.png'"
        class="fotoJugador">
        <br>
        <b>${jugador.nombre}</b> (${jugador.media})<br>
        Equipo actual: ${equipo}<br>
        💰 ${formatearPrecio(precio)}<br>
        <button onclick="confirmarFichajeDirector('${jugador.nombre}','${equipo}',${precio})">
          Contratar
        </button>
      </div>
    `;
  });
}


function obtenerRangoFichajePorFuerza(fuerza) {
  // límites de seguridad
  fuerza = Math.max(57, Math.min(fuerza, 86));

  let margenInferior;
  let margenSuperior;

  if (fuerza <= 60) {
    margenInferior = 0;
    margenSuperior = 3;
  } else if (fuerza <= 65) {
    margenInferior = 1;
    margenSuperior = 4;
  } else if (fuerza <= 70) {
    margenInferior = 2;
    margenSuperior = 5;
  } else if (fuerza <= 75) {
    margenInferior = 3;
    margenSuperior = 6;
  } else if (fuerza <= 80) {
    margenInferior = 4;
    margenSuperior = 7;
  } else {
    margenInferior = 5;
    margenSuperior = 8;
  }

  const min = fuerza - margenInferior;
  const max = fuerza + margenSuperior;

  return { min, max };
}

function confirmarFichajeDirector(nombreJugador, equipoVendedor, precio) {
  const chat = document.getElementById("chatDirector");

  // Límite de fichajes
  if (fichajesUsuarioRealizados >= LIMITE_FICHAJES_USUARIO) {
    chat.innerHTML += `
      <p><b>Director:</b> Ya hemos alcanzado el límite de fichajes (${LIMITE_FICHAJES_USUARIO}).</p>
    `;
    return;
  }

  if (presupuestoVisible < precio) {
    chat.innerHTML += `
      <p><b>Director:</b> No tenemos presupuesto suficiente.</p>
    `;
    return;
  }

  const jugador = plantillasJugadores[equipoVendedor]
    .find(j => j.nombre === nombreJugador);

  if (!jugador) return;

  const fuerzaEquipo = obtenerFuerzaTotal(equipoUsuario);
const rango = obtenerRangoFichajePorFuerza(fuerzaEquipo);

if (jugador.media < rango.min || jugador.media > rango.max) {
  chat.innerHTML += `
    <p><b>Director:</b> ❌ ${jugador.nombre} está fuera de nuestro alcance actual.</p>
    <p><b>Director:</b> Nuestro nivel permite fichar jugadores entre ${rango.min} y ${rango.max}.</p>
  `;
  return;
}

  // ✅ TRANSFERENCIA REAL
  plantillasJugadores[equipoVendedor] =
    plantillasJugadores[equipoVendedor].filter(j => j !== jugador);

  plantillasJugadores[equipoUsuario].push(jugador);

  delete sueldosEquipos[equipoVendedor];
  delete sueldosEquipos[equipoUsuario];

  presupuestosEquipos[equipoVendedor] += precio;
  presupuestosEquipos[equipoUsuario] -= precio;

  restarPresupuesto(precio);
  balanceEconomico.compras -= precio;
  actualizarBalanceUI();
  fichajesUsuarioRealizados++;

  chat.innerHTML += `
    <p><b>Director:</b> ✅ Fichaje cerrado. ${jugador.nombre} es nuevo jugador del club.</p>
    <p><b>Director:</b> Fichajes realizados: ${fichajesUsuarioRealizados}/${LIMITE_FICHAJES_USUARIO}</p>
  `;

  // 🗞️ Twitter
  publicarNoticiaTwitter(equipoUsuario, jugador.nombre, precio);

  // Refrescar mercado visual
  //simularMercadoFichajesNuevo();
}



function directorBuscarPorNombreUI() {
  const chat = document.getElementById("chatDirector");
  const opcionesDiv = document.getElementById("opcionesDirector");

  chat.innerHTML += `
    <p><b>Director:</b> Dígame el nombre del jugador que desea fichar.</p>
  `;

  opcionesDiv.innerHTML = `
    <div class="opcion-jugador">
      <input type="text" id="inputNombreJugador" placeholder="Nombre del jugador">
      <button onclick="directorBuscarPorNombre()">Buscar</button>
    </div>
  `;
}

function directorBuscarPorNombre() {
  const nombreBuscado = document
    .getElementById("inputNombreJugador")
    .value
    .trim()
    .toLowerCase();

  const chat = document.getElementById("chatDirector");
  const opcionesDiv = document.getElementById("opcionesDirector");

  if (!nombreBuscado) return;

  let encontrado = null;

  Object.keys(plantillasJugadores).forEach(equipo => {
    if (equipo === equipoUsuario) return;

    plantillasJugadores[equipo].forEach(jugador => {
      if (jugador.nombre.toLowerCase() === nombreBuscado) {
        encontrado = { jugador, equipo };
      }
    });
  });

  opcionesDiv.innerHTML = "";

  if (!encontrado) {
    chat.innerHTML += `
      <p><b>Director:</b> No he encontrado a ese jugador en el mercado.</p>
    `;
    return;
  }

  const { jugador, equipo } = encontrado;
  const precio = calcularPrecioJugador(jugador);
  //const foto = jugador.foto || "img/jugadores/default.png";

  chat.innerHTML += `
    <p><b>Director:</b> He encontrado al jugador solicitado.</p>
  `;
  //<img src="${foto}" class="fotoJugador"></img>
  opcionesDiv.innerHTML = `
    <div class="opcion-jugador">
      <img src="${getFotoJugador(jugador)}"
      onerror="this.src='img/jugadores/default.png'"
      class="fotoJugador"><br>
      <b>${jugador.nombre}</b> (${jugador.media})<br>
      Equipo actual: ${equipo}<br>
      💰 ${formatearPrecio(precio)}<br><br>
      <button onclick="confirmarFichajeDirector('${jugador.nombre}','${equipo}',${precio})">
        Contratar
      </button>
    </div>
  `;
}

function reiniciarMercadoFichajes() {
  fichajesUsuarioRealizados = 0;
}

// =========================
// 📌 VENTAS USUARIO
// =========================

let ventasUsuarioRealizadas = 0;
const LIMITE_VENTAS_USUARIO = 4;

function reiniciarVentas() {
  ventasUsuarioRealizadas = 0;
}


function cerrarModalVentaJugador() {
  document.getElementById("modalVentaJugador").style.display = "none";
}

function venderJugador(nombreJugador) {

  // =========================
  // LIMITE DE VENTAS
  // =========================
  if (ventasUsuarioRealizadas >= LIMITE_VENTAS_USUARIO) {

    alert(
      `⚠️ Ya alcanzaste el límite de ventas (${LIMITE_VENTAS_USUARIO})`
    );

    return;
  }

  // =========================
  // BUSCAR JUGADOR
  // =========================
  const jugador = plantillasJugadores[equipoUsuario]
    .find(j => j.nombre === nombreJugador);

  if (!jugador) return;

  // =========================
  // EVITAR QUEDARSE SIN PORTERO
  // =========================
  if (jugador.posicion === "PO") {

    const porteros = plantillasJugadores[equipoUsuario]
      .filter(j => j.posicion === "PO");

    if (porteros.length <= 1) {

      alert("⚠️ No puedes vender tu único portero.");

      return;
    }
  }

  // =========================
  // EQUIPOS COMPRADORES
  // =========================
  /*
  const compradores = Object.keys(plantillasJugadores)
    .filter(eq => {

      if (eq === equipoUsuario) return false;

      const presupuesto = presupuestosEquipos[eq] || 0;

      return presupuesto > jugador.valor * 0.5;
    });

  if (!compradores.length) {

    alert("❌ No hay equipos interesados.");

    return;
  }
*/

const compradores = Object.keys(plantillasJugadores)
  .filter(eq => eq !== equipoUsuario);

  // =========================
  // EQUIPO ALEATORIO
  // =========================
  const equipoComprador =
    compradores[
      Math.floor(Math.random() * compradores.length)
    ];

  // =========================
  // PRECIO DE VENTA
  // =========================
  const factor = 0.70 + Math.random() * 0.15;

  /*
  const precioVenta = Math.round(
    jugador.valor * factor
  );
*/
  const valorJugador =
  jugador.valor || calcularPrecioJugador(jugador);

  const precioVenta = Math.round(
  valorJugador * factor
);

  // =========================
  // TRANSFERENCIA
  // =========================

  plantillasJugadores[equipoUsuario] =
    plantillasJugadores[equipoUsuario]
      .filter(j => j !== jugador);

  plantillasJugadores[equipoComprador]
    .push(jugador);


  presupuestosEquipos[equipoUsuario] += precioVenta;

  presupuestosEquipos[equipoComprador] -= precioVenta;


  delete sueldosEquipos[equipoUsuario];

  delete sueldosEquipos[equipoComprador];


  balanceEconomico.ventas += precioVenta;
  actualizarBalanceUI();

  ventasUsuarioRealizadas++;

  cerrarModal();

  mostrarPlantilla(equipoUsuario);

  // =========================
  // MOSTRAR MODAL VENTA
  // =========================
  mostrarModalVentaJugador(
    jugador,
    equipoComprador,
    precioVenta
  );
}

function mostrarModalVentaJugador(
  jugador,
  equipoComprador,
  precioVenta
) {

  const modal =
    document.getElementById("modalVentaJugador");

  const contenido =
    document.getElementById("contenidoVentaJugador");

  const escudo =
    getEscudoEquipo(equipoComprador);

  contenido.innerHTML = `

    <div class="ventaJugadorCard">

      <h2>✅ Jugador vendido</h2>

      <img
        src="${getFotoJugador(jugador)}"
        onerror="this.src='img/jugadores/default.png'"
        class="fotoVentaJugador"
      >

      <h3>${jugador.nombre}</h3>

      <p>
        Fue vendido a:
      </p>

      <div class="equipoVenta">

        <img
          src="${escudo}"
          class="escudoVenta"
        >

        <span>${equipoComprador}</span>

      </div>

      <h3>
        💰 ${formatearPrecio(precioVenta)}
      </h3>

      <p>
        Ventas realizadas:
        ${ventasUsuarioRealizadas}/${LIMITE_VENTAS_USUARIO}
      </p>

    </div>

  `;

  modal.style.display = "flex";
}
