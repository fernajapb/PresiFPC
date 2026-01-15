
//VARIABLES GLOBALES
let historialPuntos = {};
let temporadaActual = 2026;
let semestreActual = 1;
let descensoPendiente = false;
//tabla anual normal 
let tablaAnual = {};
//Tabla para gyardar
let tablasAnualesPorTemporada = {}; 


// --- SUPERLIGA ---
let campeonesLigaPorTemporada = {}; // { 2025: { I: "Millonarios", II: "Junior" } }
let campeonesSuperliga = [];

let campeones = [];
let tabla = [];
let grupos = { A: [], B: [] };
let finalistas = [];

let equipoUsuario = "";
let equipoJugador = "";
let ligasGanadasPorUsuario = 0;
let copasGanadasPorUsuario = 0;
let superligasGanadasPorUsuario = 0;
let divisionJugador = "";
let fuerzaJugador = 0;

let equiposConsecutivos = {};  
let ultimoCampeon = "";

let dtSeleccionado = "";

let moralHinchada = 50;
let moralEvaluadaEsteSemestre = false;


// RECUPERAR EL NOMBRE DEL PRESIDENTE
const nombrePresidente = localStorage.getItem("nombrePresidente") || "Presidente";

// MOSTRARLO en PANTALLA si TIENES un CONTENEDOR
const encabezado = document.getElementById("nombrePresidenteMostrar");
if (encabezado) {
  encabezado.textContent = `👔 Bienvenido, ${nombrePresidente}`;
}



//EQUIPOS DE PRIMERA 
let equiposPrimera = [
  { nombre: "Nacional", fuerza: 75 },
  { nombre: "Millonarios", fuerza: 74 },
  { nombre: "América", fuerza: 74 },
  { nombre: "Cali", fuerza: 72 },
  { nombre: "Junior", fuerza: 73 },
  { nombre: "Santa Fe", fuerza: 72 },
  { nombre: "Tolima", fuerza: 72 },
  { nombre: "Medellín", fuerza: 72 },
  { nombre: "Once Caldas", fuerza: 69 },
  { nombre: "Pereira", fuerza: 69 },
  { nombre: "Alianza", fuerza: 67 },
  { nombre: "Bucaramanga", fuerza: 69 },
  { nombre: "Inter Bogotá", fuerza: 66 },
  { nombre: "Jaguares", fuerza: 63 },
  { nombre: "Pasto", fuerza: 66 },
  { nombre: "Águilas", fuerza: 66 },
  { nombre: "B.Chico", fuerza: 63 },
  { nombre: "Fortaleza", fuerza: 63 },
  { nombre: "Llaneros", fuerza: 63 },
  { nombre: "Cucuta", fuerza: 63 }
];

//EQUIPOS DE SEGUNDA
let equiposSegunda = [
  { nombre: "Envigado", fuerza: 63 },
  { nombre: "Real Cartagena", fuerza: 63 },
  { nombre: "U.Magdalena", fuerza: 63 },
  { nombre: "Ind.Yumbo", fuerza: 63 },
  { nombre: "Patriotas", fuerza: 63 },
  { nombre: "R.Cundinamarca", fuerza: 61},
  { nombre: "Inter Palmira", fuerza: 61 },
  { nombre: "Leones", fuerza: 58 },
  { nombre: "Tigres", fuerza: 58},
  { nombre: "Quindio", fuerza: 58 },
  { nombre: "R.Santander", fuerza: 58 },
  { nombre: "Orsomarso", fuerza: 58 },
  { nombre: "Boca Jrs. Cali", fuerza: 57 },
  {nombre: "Barranquilla", fuerza: 57 },
  {nombre: "Atlético FC", fuerza: 57 },
  { nombre: "Bogotá", fuerza: 57 }
  
];

// 🆕 Equipos históricos / refundables
const equiposRefundables = [
  "A.Petrolera",
  "Cortuluá",
  "Fiorentina",
  "Valledupar",
  "U.Popayán",
  "Unicosta",
  "Uniautonoma",
  "Expreso Rojo",
  "R.Sincelejo",
  "Equidad",
  "Huila",
  "Centauros V.",
  "Lanceros B.",
  "P.Casanare",
  "CA Boca Jrs"
];

Object.defineProperty(window, "equipos", {
  get() {
    return equiposPrimera.map(e => e.nombre);
  }
});

/*
let equipos = equiposPrimera.map(e => e.nombre);
*/


function calcularSueldoPorFuerza(fuerza) {
  if (fuerza < 59) return 800000;
  if (fuerza < 62) return 1200000;
  if (fuerza < 66) return 1800000;
  if (fuerza < 70) return 2500000;
  if (fuerza < 74) return 3500000;
  return 4500000;
}

function calcularPresupuestoPorFuerza(fuerza) {
  if (fuerza >= 72) return 25000000;
  if (fuerza >= 69) return 20000000;
  if (fuerza >= 67) return 17000000;
  if (fuerza >= 65) return 14000000;
  if (fuerza >= 63) return 11000000;
  if (fuerza >= 60) return 9000000;
  if (fuerza >= 58) return 7000000;
  return 5000000;
}

function formatearPrecio(valor) {
  if (valor >= 1_000_000) {
    let millones = (valor / 1_000_000).toFixed(1);

    // Quitar ".0"
    if (millones.endsWith(".0")) {
      millones = millones.slice(0, -2);
    }

    return `$${millones}M`;
  } else {
    let miles = Math.round(valor / 1_000);
    return `$${miles}K`;
  }
}


function calcularPrecioPorMedia(media) {
  const tabla = [
    { media: 20, precio: 2000},
    { media: 30, precio: 3000 },
    { media: 40, precio: 4000},
    { media: 50, precio: 6000},
    { media: 52, precio: 8000},
    { media: 54, precio: 9500},
    { media: 56, precio: 10000},
    { media: 58, precio: 15000},
    { media: 60, precio: 150000 },
    { media: 65, precio: 350000 },
    { media: 66, precio: 400000},
    { media: 67, precio: 500000},
    { media: 68, precio: 650000},
    { media: 69, precio: 800000},
    { media: 70, precio: 1300000 },
    { media: 71, precio: 1500000},
    { media: 72, precio: 1800000 },
    { media: 73, precio: 2000000 },
    { media: 74, precio: 2500000 },
    { media: 75, precio: 3000000 },
    { media: 76, precio: 4500000},
    { media: 77, precio: 5000000 },
    { media: 80, precio: 7000000 }
  ];

  // Límite inferior
  if (media <= 20) return 20000;
  // Límite superior
  if (media >= 80) return 7000000;

  // Buscar el rango más cercano
  for (let i = 0; i < tabla.length - 1; i++) {
    const actual = tabla[i];
    const siguiente = tabla[i + 1];

    if (media >= actual.media && media <= siguiente.media) {
      // Interpolación lineal entre dos puntos
      const proporcion = (media - actual.media) / (siguiente.media - actual.media);
      const precioInterpolado = actual.precio + proporcion * (siguiente.precio - actual.precio);
      return Math.floor(precioInterpolado);
    }
  }

  return 100000; // por seguridad
}

function seleccionarEquipo(nombreEquipo) {
  equipoUsuario = nombreEquipo;

  // 🔄 Resetear moral
  moralHinchada = 50;
  actualizarMoralHinchadaUI();

  // 👔 Asignar DT
  const claveDT = dtPorEquipo[equipoUsuario];
  if (claveDT) {
    seleccionarDT(claveDT);
    equipoDeDT[claveDT] = equipoUsuario;
  }

  // 🔁 AHORA SÍ recalcular todo
  const fuerza = obtenerFuerzaTotal(nombreEquipo);

  presupuestoVisible = calcularPresupuestoPorFuerza(fuerza);
  actualizarPresupuestoHTML();

  document.getElementById("fuerzaEquipo").innerText = `Fuerza: ${fuerza}`;

  mostrarEstadio(nombreEquipo);
  mostrarTablaDTs();
  actualizarMediaUI();
  mostrarEstrellasPorFuerza(fuerza);
  mostrarPanelFuerzas();
}

/*
function seleccionarEquipo(nombreEquipo) {
  equipoUsuario = nombreEquipo;

  // 🔄 Resetear moral al cambiar de equipo
  moralHinchada = 50;
  actualizarMoralHinchadaUI();

  const fuerza = obtenerFuerzaTotal(nombreEquipo);
  presupuestoVisible = calcularPresupuestoPorFuerza(fuerza);
  actualizarPresupuestoHTML();

  // 👇 Mostrar fuerza numérica
  document.getElementById("fuerzaEquipo").innerText = `Fuerza: ${fuerza}`;
  
  mostrarEstadio(nombreEquipo);
  mostrarTablaDTs();
  actualizarMediaUI();

// 👔 Asignar DT automáticamente según el equipo elegido
    const claveDT = dtPorEquipo[equipoUsuario];
    if (claveDT) {
        seleccionarDT(claveDT); // usa tu función ya existente
    }

equipoDeDT[claveDT] = equipoUsuario;

aplicarBonoDTBase(claveDT);

mostrarEstrellasPorFuerza(fuerza);
mostrarPanelFuerzas();

}
*/

let dificultadActual = "normal"; // valor por defecto

const selectDificultad = document.getElementById("selectDificultad");
selectDificultad.addEventListener("change", (e) => {
  dificultadActual = e.target.value;
});



function obtenerFuerzaEquipo(nombre) {

  let equipo1 = equiposPrimera.find(e => e.nombre === nombre);
  if (equipo1) return equipo1.fuerza;

  let equipo2 = equiposSegunda.find(e => e.nombre === nombre);
  if (equipo2) return equipo2.fuerza;

  return 62; // valor por defecto
}




// 📌 Calcular fuerza total del equipo
function obtenerFuerzaTotal(nombreEquipo) {

let base = obtenerFuerzaEquipo(nombreEquipo);

  const plantilla = plantillasJugadores && plantillasJugadores[nombreEquipo];

  if (!plantilla || plantilla.length < 5) return base;

  const tienePortero = plantilla.some(j => j.posicion && j.posicion.toLowerCase() === "portero");
  if (!tienePortero) return base;

  const mediaPromedio = plantilla.reduce((sum, j) => sum + (Number(j.media) || 0), 0) / plantilla.length;

  // ⚙️ Configuración según dificultad
  let pesoBase = 0.65;
  let pesoMedia = 0.35;
  let multiplicadorBase = 1;

  switch (dificultadActual) {
  case "muy_facil":
    pesoBase = 0.50;
    pesoMedia = 0.50;
    multiplicadorBase = 0.79; // modo muy fácil 50/50 (rivales muy débiles)
    break;

  case "facil":
    pesoBase = 0.60;
    pesoMedia = 0.40;
    multiplicadorBase = 0.93; // rivales más débiles
    break;

  case "normal":
    pesoBase = 0.65;
    pesoMedia = 0.35;
    multiplicadorBase = 1.00; // estándar
    break;

  case "dificil":
    pesoBase = 0.70;
    pesoMedia = 0.30;
    multiplicadorBase = 1.07; // rivales más fuertes
    break;

  case "muy_dificil":
    pesoBase = 0.75;
    pesoMedia = 0.25;
    multiplicadorBase = 1.12; // modo experto (rivales mucho más fuertes)
    break;
}

  // 💥 Solo rivales son afectados por el multiplicador
  if (nombreEquipo !== equipoUsuario) {
    base = base * multiplicadorBase;
  }

  let fuerzaTotal = Math.round(base * pesoBase + mediaPromedio * pesoMedia);

  return fuerzaTotal;
}



function mostrarPanelFuerzas() {
  const contenedor = document.getElementById("contenedorFuerzas");
  contenedor.innerHTML = "";

  const fuerzaUsuario = obtenerFuerzaTotal(equipoUsuario);

  const todosLosEquipos = [
    ...equiposPrimera.map(e => e.nombre),
    ...equiposSegunda.map(e => e.nombre)
  ];

  todosLosEquipos.forEach(nombre => {

    const base = obtenerFuerzaEquipo(nombre);

    const plantilla = plantillasJugadores[nombre] || [];
    const mediaPromedio = plantilla.length > 0
      ? plantilla.reduce((s, j) => s + (Number(j.media) || 0), 0) / plantilla.length
      : 60;

    const fuerzaTotal = obtenerFuerzaTotal(nombre);

    const multiplicador =
      nombre === equipoUsuario ? 1 :
      dificultadActual === "muy_facil" ? 0.79 :
      dificultadActual === "facil" ? 0.93 :
      dificultadActual === "normal" ? 1.00 :
      dificultadActual === "dificil" ? 1.07 :
      dificultadActual === "muy_dificil" ? 1.12 : 1;

    const baseAjustada = nombre === equipoUsuario ? base : base * multiplicador;

    const diferencia = fuerzaTotal - fuerzaUsuario;

    const diffClase =
      diferencia > 0 ? "diff-positiva" :
      diferencia < 0 ? "diff-negativa" :
      "diff-neutra";

    const tarjeta = `
      <div class="tarjeta-fuerza ${nombre === equipoUsuario ? "usuario" : ""}">
        <h4>${nombre}${nombre === equipoUsuario ? " ⭐" : ""}</h4>

        <div class="fila-datos">
          <span>F. Base</span>
          <span>${base}</span>
        </div>

        <div class="fila-datos">
          <span>M. Promedio</span>
          <span>${mediaPromedio.toFixed(1)}</span>
        </div>

        <div class="fila-datos">
          <span>F. Ajustada</span>
          <span>${baseAjustada.toFixed(1)}</span>
        </div>

        <div class="fuerza-total">
          <span>F. Total</span>
          <span>${fuerzaTotal}</span>
        </div>

        <div class="diferencia ${diffClase}">
          Diferencia: ${diferencia > 0 ? "+" : ""}${diferencia.toFixed(1)}
        </div>
      </div>
    `;

    contenedor.insertAdjacentHTML("beforeend", tarjeta);
  });
}



function mostrarEstrellasPorFuerza(fuerza) {
  const contenedor = document.getElementById("estrellasEquipo");
  let imagenEstrella = "";

  // Escala entre 57 y 75 → 6 niveles posibles
  if (fuerza < 62) {
    imagenEstrella = "I-media.png";     // fuerza baja
  } else if (fuerza < 66) {
    imagenEstrella = "II.png";          // fuerza media-baja
  } else if (fuerza < 70) {
    imagenEstrella = "II-media.png";    // fuerza media
  } else if (fuerza < 74) {
    imagenEstrella = "III.png";         // fuerza buena
  } else if (fuerza < 78) {
    imagenEstrella = "III-media.png";   // fuerza muy buena
  } else {
    imagenEstrella = "IIII.png";         // fuerza máxima (75)
  }

  // Mostrar imagen
  contenedor.innerHTML = `<img src="recursos/estrellas/${imagenEstrella}" alt="Estrellas" style="height:40px;">`;
}




// 📌 Calcular fuerza total vieja del equipo
/*
function obtenerFuerzaTotal(nombreEquipo) {
  let base = fuerzaEquipos && fuerzaEquipos[nombreEquipo]
            || (equiposSegunda && equiposSegunda.find(e => e.nombre === nombreEquipo)?.fuerza)
            || 64;

  const plantilla = plantillasJugadores && plantillasJugadores[nombreEquipo];

  if (!plantilla || plantilla.length < 5) return base;

  const tienePortero = plantilla.some(j => j.posicion && j.posicion.toLowerCase() === "portero");
  if (!tienePortero) return base;

  const mediaPromedio = plantilla.reduce((sum, j) => sum + (Number(j.media) || 0), 0) / plantilla.length;
  let fuerzaTotal = Math.round(base * 0.5 + mediaPromedio * 0.5);

  // 👔 Ajuste del DT (solo al equipo del usuario) — sumamos de forma segura
  if (nombreEquipo === equipoUsuario && dtUsuario) {
    const bono = Number(dtUsuario.bono) || 0;
    fuerzaTotal += bono;
  }

  return fuerzaTotal;
}
*/


// 📌 Actualizar fuerza y media en la UI
function actualizarFuerzaUI() {
  if (!equipoUsuario) return;
  const fuerza = Number(obtenerFuerzaTotal(equipoUsuario)) || 0;
  const el = document.getElementById("fuerzaEquipo");
  if (el) el.innerText = `Fuerza: ${fuerza}`;

  // ⭐ Actualizar las estrellas también
  mostrarEstrellasPorFuerza(fuerza);
}


function actualizarMediaUI() {
  if (!equipoUsuario) return;
  const plantilla = plantillasJugadores[equipoUsuario];

  if (!plantilla || plantilla.length === 0) {
    document.getElementById("mediaEquipo").innerText = "Media Promedio: -";
    return;
  }

  const mediaPromedio = plantilla.reduce((sum, j) => sum + (Number(j.media) || 0), 0) / plantilla.length;
  document.getElementById("mediaEquipo").innerText = `Media Promedio: ${mediaPromedio.toFixed(1)}`;
}



function modificarFuerzaEquipo(delta) {

  let equipo1 = equiposPrimera.find(e => e.nombre === equipoUsuario);
  if (equipo1) {
    equipo1.fuerza = Math.max(0, equipo1.fuerza + delta);
    return actualizarFuerzaUI();
  }

  let equipo2 = equiposSegunda.find(e => e.nombre === equipoUsuario);
  if (equipo2) {
    equipo2.fuerza = Math.max(0, equipo2.fuerza + delta);
    return actualizarFuerzaUI();
  }
}



/*
function mostrarTabla(divId, datos, titulo, destacarTop8 = false, lideres = [], marcarDescenso = false) {
  let html = `<h2>${titulo}</h2><table><tr><th>#</th><th>Equipo</th><th>PTS</th><th>DG</th></tr>`;

  datos.forEach((t, i) => {
    let claseFila = "";
    if (divId === "segunda" && i < 1) claseFila = "ascendido";
    else if (divId ==="segunda" && i < 2) claseFila = "repechaje";
    else if (divId ==="segunda" && i < 3) claseFila = "posrepe";
    else if (destacarTop8 && i < 8) claseFila = "clasificado";
    else if (lideres.includes(t.nombre)) claseFila = "lider-grupo";
    else if (marcarDescenso && i >= datos.length - 2) claseFila = "descenso";

    if (t.nombre === equipoUsuario) claseFila += " mi-equipo";

    const dg = (t.gf || 0) - (t.gc || 0);
    const nombreLimpio = t.nombre.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/ /g, "_");
    const escudo = `<img src="escudos/${nombreLimpio}.png" alt="${t.nombre}" class="escudo">`;

    html += `<tr class="${claseFila}"><td>${i + 1}</td><td>${escudo} ${t.nombre}</td><td>${t.pts}</td><td>${dg}</td></tr>`;
  });

  html += "</table>";
  document.getElementById(divId).innerHTML = html;
}
*/



function mostrarTabla(divId, datos, titulo, destacarTop8 = false, lideres = [], marcarDescenso = false) {
  const modoMX = document.getElementById("modoMX")?.checked;

  let html = `<h2>${titulo}</h2><table><tr><th>#</th><th>Equipo</th><th>PTS</th><th>DG</th></tr>`;

  datos.forEach((t, i) => {
    let claseFila = "";

    // ⚽ Primera división (normal)
    if (divId === "segunda" && i < 1) claseFila = "ascendido";
    else if (divId === "segunda" && i < 2) claseFila = "repechaje";
    else if (divId === "segunda" && i < 3) claseFila = "posrepe";
    else if (destacarTop8 && !modoMX && i < 8) claseFila = "clasificado";

    // 🇲🇽 Si el modo MX está activado → cambia colores
    if (modoMX) {
      if (i < 6) claseFila = "clasificadoMX";       // 1 a 6 en verde
      else if (i >= 6 && i < 10) claseFila = "playinMX"; // 7 a 10 en amarillo
    }

    if (lideres.includes(t.nombre)) claseFila = "lider-grupo";
    if (marcarDescenso && i >= datos.length - 2) claseFila = "descenso";
    if (t.nombre === equipoUsuario) claseFila += " mi-equipo";

    const dg = (t.gf || 0) - (t.gc || 0);
    const nombreLimpio = t.nombre
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/ /g, "_");
    const escudo = `<img src="escudos/${nombreLimpio}.png" alt="${t.nombre}" class="escudo">`;

    html += `<tr class="${claseFila}"><td>${i + 1}</td><td>${escudo} ${t.nombre}</td><td>${t.pts}</td><td>${dg}</td></tr>`;
  });

  html += "</table>";
  document.getElementById(divId).innerHTML = html;
}



function resetearVista() {
  document.getElementById("tct").innerHTML = "";
  document.getElementById("tctr").innerHTML = "";
  document.getElementById("playoffs").innerHTML = "";
  document.getElementById("play-in").innerHTML = "";
  document.getElementById("cuadrangulares").innerHTML = "";
  document.getElementById("final").innerHTML = "";
  document.getElementById("segunda").innerHTML = "";
  tabla = []; grupos = { A: [], B: [] }; finalistas = [];
}

function resetearTotal() {
  resetearVista();
  campeones.length = 0; 
  temporadaActual = 2025;
  semestreActual = 1;
  historialPuntos = {};
  descensoPendiente = false;
  equipoUsuario = "";
  document.getElementById("equipoUsuario").value = "";
  document.getElementById("resultado").value = "";
  actualizarHistorial();
  document.getElementById("botones").style.display = "block";
}



function inicializarSelectorEquipos() {
  const select = document.getElementById("equipoUsuario");

  // Opción por defecto (no selecciona ningún equipo)
  const opcionInicial = document.createElement("option");
  opcionInicial.disabled = true;
  opcionInicial.selected = true;
  opcionInicial.value = "";
  opcionInicial.textContent = "--Equipos--";
  select.appendChild(opcionInicial);

  // Unir los nombres desde los objetos de Primera y Segunda
  const todos = [
    ...equiposPrimera.map(e => e.nombre),
    ...equiposSegunda.map(e => e.nombre)
  ];

  todos.forEach(nombre => {
    const option = document.createElement("option");
    option.value = nombre;
    option.textContent = nombre;
    select.appendChild(option);
  });

  select.addEventListener("change", () => {
    equipoUsuario = select.value;
    equipoJugador = equipoUsuario;

    // Determinar división buscando en los arrays de objetos
    if (equiposPrimera.some(e => e.nombre === equipoUsuario)) {
      divisionJugador = "Primera";
      fuerzaJugador = obtenerFuerzaEquipo(equipoUsuario);
    } else {
      divisionJugador = "Segunda";
      fuerzaJugador = obtenerFuerzaEquipo(equipoUsuario);
    }

    seleccionarEquipo(equipoUsuario);

    select.disabled = true;
  });

}


function cargarSelectorPlantillas() {
  const select = document.getElementById("selectorEquipo");
  if (!select) return;

  select.innerHTML = `<option value="">--Plantillas--</option>`;

  const equipos = [
    ...equiposPrimera.map(e => e.nombre),
    ...equiposSegunda.map(e => e.nombre)
  ];

  equipos.forEach(nombre => {
    const option = document.createElement("option");
    option.value = nombre;
    option.textContent = nombre;
    select.appendChild(option);
  });
}


function cargarSelectRefundar() {
  const selectRefundar = document.getElementById("selectEquipoRefundar");
  const selectSegunda = document.getElementById("selectEquipoSegunda");

  if (!selectRefundar || !selectSegunda) return;

  selectRefundar.innerHTML = `<option value="">--Refundar--</option>`;
  selectSegunda.innerHTML = `<option value="">--Fichas--</option>`;

  // 🆕 SOLO equipos refundables
  equiposRefundables.forEach(nombre => {
    const opt = document.createElement("option");
    opt.value = nombre;
    opt.textContent = nombre;
    selectRefundar.appendChild(opt);
  });

  // Equipos actuales de Segunda
  equiposSegunda.forEach(e => {
    const opt = document.createElement("option");
    opt.value = e.nombre;
    opt.textContent = e.nombre;
    selectSegunda.appendChild(opt);
  });
}

function refundarClub() {
  const equipoNuevo = document.getElementById("selectEquipoRefundar").value;
  const equipoReemplazado = document.getElementById("selectEquipoSegunda").value;

  if (!equipoNuevo || !equipoReemplazado) {
    alert("❌ Debes seleccionar ambos equipos.");
    return;
  }

  // 1️⃣ Quitar equipo reemplazado de Segunda
  equiposSegunda = equiposSegunda.filter(e => e.nombre !== equipoReemplazado);

  // 2️⃣ Agregar nuevo equipo refundado
  equiposSegunda.push({
    nombre: equipoNuevo,
    fuerza: 58
  });

  // 3️⃣ Plantilla vacía
  plantillasJugadores[equipoNuevo] = [];

  // 4️⃣ Eliminar de lista de refundables (opcional pero recomendado)
  const index = equiposRefundables.indexOf(equipoNuevo);
  if (index !== -1) equiposRefundables.splice(index, 1);

  // 5️⃣ Reset UI si el usuario estaba usando el equipo eliminado
  if (equipoUsuario === equipoReemplazado) {
    equipoUsuario = "";
    document.getElementById("equipoUsuario").value = "";
  }

  // 6️⃣ Recargar selects
  inicializarSelectorEquipos();
  cargarSelectorPlantillas();
  cargarSelectRefundar();

  alert(`🏟️ ${equipoNuevo} ha sido refundado y entra a la B en la Temporada ${temporadaActual}`);
}



function obtenerDivision(nombreEquipo) {
  if (equiposPrimera.some(e => e.nombre === nombreEquipo)) {
    return "primera";
  } else if (equiposSegunda.some(e => e.nombre === nombreEquipo)) {
    return "segunda";
  }
  return "desconocida";
}


window.onload = () => {
  inicializarSelectorEquipos();
  cargarSelectorPlantillas();
  cargarSelectRefundar();
  inicializarDTsPorEquipo();
  
};