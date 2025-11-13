
//VARIABLES GLOBALES
let historialPuntos = {};
let temporadaActual = 2025;
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


//EQUIPOS DE PRIMERA 
let equiposPrimera = [
  "Nacional", "Millonarios", "América", "Cali", "Junior", "Santa Fe", "Tolima", "Medellín",
  "Once Caldas", "Pereira", "Alianza", "Bucaramanga", "La Equidad", "Envigado", "Pasto",
  "Águilas", "Chico", "Fortaleza", "Llaneros", "Union M."
];


//EQUIPOS DE SEGUNDA +FUERZA
let equiposSegunda = [
  { nombre: "Jaguares", fuerza: 63 },
  { nombre: "Real Cartagena", fuerza: 63 },
  { nombre: "Cucuta", fuerza: 63 },
  { nombre: "Huila", fuerza: 63 },
  { nombre: "Patriotas", fuerza: 63 },
  { nombre: "Real Cundi", fuerza: 61},
  { nombre: "Inter Palmira", fuerza: 61 },
  { nombre: "Leones", fuerza: 58 },
  { nombre: "Tigres", fuerza: 58},
  { nombre: "Quindio", fuerza: 59 },
  { nombre: "Real Santander", fuerza: 58 },
  { nombre: "Orsomarso", fuerza: 58 },
  { nombre: "Boca Jrs. Cali", fuerza: 57 },
  {nombre: "Barranquilla", fuerza: 57 },
  {nombre: "Atlético FC", fuerza: 57 },
  { nombre: "Bogotá", fuerza: 57 }
  
];

//FUERZA EQUIPOS DE PRIMERA
let equipos = [...equiposPrimera];

const fuerzaEquipos = {
  // 🏆 Grandes tradicionales
  "Nacional": 75,
  "Millonarios": 74,
  "América": 74,
  "Junior": 73,

  // 🔝 Competitivos altos
  "Santa Fe": 72,
  "Tolima": 72,
  "Medellín": 72,
  "Cali": 72, 

  // 💪 Nivel medio-alto
  "Once Caldas": 69,
  "Bucaramanga": 69,
  "Pereira": 69,

  // ⚖️ Clase media sólida
  "Alianza": 67,
  "La Equidad": 66,
  "Pasto": 66,
  "Águilas": 66,

  // ⚠️ Zona baja / intermitentes
  "Fortaleza": 63,
  "Envigado": 63,
  "Chico": 63,
  "Llaneros": 63,
  "Union M.": 63
};



// RECUPERAR EL NOMBRE DEL PRESIDENTE
const nombrePresidente = localStorage.getItem("nombrePresidente") || "Presidente";

// MOSTRARLO en PANTALLA si TIENES un CONTENEDOR
const encabezado = document.getElementById("nombrePresidenteMostrar");
if (encabezado) {
  encabezado.textContent = `👔 Bienvenido, ${nombrePresidente}`;
}



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
  actualizarMediaUI();
  mostrarEstadio(nombreEquipo);

  // ⭐ Mostrar estrellas y panel
  mostrarEstrellasPorFuerza(fuerza);
  mostrarPanelFuerzas();
}


let dificultadActual = "normal"; // valor por defecto

const selectDificultad = document.getElementById("selectDificultad");
selectDificultad.addEventListener("change", (e) => {
  dificultadActual = e.target.value;
});


function obtenerFuerzaEquipo(nombre) {
  if (fuerzaEquipos[nombre] !== undefined) return fuerzaEquipos[nombre];

  const equipo2da = equiposSegunda.find(e => e.nombre === nombre);
  return equipo2da ? equipo2da.fuerza : 63; // valor por defecto si no existe
}



// 📌 Calcular fuerza total del equipo
function obtenerFuerzaTotal(nombreEquipo) {

let base = 
      (fuerzaEquipos && fuerzaEquipos[nombreEquipo]) ||
      (equiposSegunda && equiposSegunda.find(e => e.nombre === nombreEquipo)?.fuerza) || 64;


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

  // 👔 Bono del DT (si aplica)
  if (nombreEquipo === equipoUsuario && dtUsuario) {
    const bono = estilosDT[dtUsuario.estilo] || 0;
    fuerzaTotal += bono;
  }

  return fuerzaTotal;
}

function mostrarPanelFuerzas() {
  const tabla = document.getElementById("tablaFuerzas");
  tabla.innerHTML = "";

  // Calcular la fuerza total del equipo del usuario
  const fuerzaUsuario = obtenerFuerzaTotal(equipoUsuario);

  // Unir primera y segunda división
  const todosLosEquipos = [
    ...equiposPrimera,
    ...equiposSegunda.map(e => e.nombre)
  ];

  todosLosEquipos.forEach(nombre => {
    const base = 
      (fuerzaEquipos && fuerzaEquipos[nombre]) ||
      (equiposSegunda && equiposSegunda.find(e => e.nombre === nombre)?.fuerza) || 
      64;

    const plantilla = plantillasJugadores[nombre] || [];
    const mediaPromedio = plantilla.length > 0
      ? plantilla.reduce((s, j) => s + (Number(j.media) || 0), 0) / plantilla.length
      : 64;

    const fuerzaTotal = obtenerFuerzaTotal(nombre);

    // Multiplicador según dificultad
    const multiplicador =
      nombre === equipoUsuario ? 1 :
      dificultadActual === "muy_facil" ? 0.79 :
      dificultadActual === "facil" ? 0.93 :
      dificultadActual === "normal" ? 1.00 :
      dificultadActual === "dificil" ? 1.07 :
      dificultadActual === "muy_dificil" ? 1.12 : 1;

    const baseAjustada = nombre === equipoUsuario ? base : base * multiplicador;

    // Diferencia frente al usuario
    const diferencia = fuerzaTotal - fuerzaUsuario;
    const colorDiff = diferencia > 0 ? "red" : (diferencia < 0 ? "green" : "gray");

    const fila = `
      <tr>
        <td>${nombre === equipoUsuario ? `<b>${nombre} ⭐</b>` : nombre}</td>
        <td>${base}</td>
        <td>${mediaPromedio.toFixed(1)}</td>
        <td>${baseAjustada.toFixed(1)}</td>
        <td><b>${fuerzaTotal}</b></td>
        <td style="color:${colorDiff}">${diferencia.toFixed(1)}</td>
      </tr>
    `;
    tabla.insertAdjacentHTML("beforeend", fila);
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
  contenedor.innerHTML = `<img src="estrellas/${imagenEstrella}" alt="Estrellas" style="height:40px;">`;
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
  // 🔎 Si el equipo es de Primera
  if (fuerzaEquipos[equipoUsuario] !== undefined) {
    fuerzaEquipos[equipoUsuario] = Math.max(0, fuerzaEquipos[equipoUsuario] + delta);
  } else {
    // 🔎 Si es de Segunda
    const equipo = equiposSegunda.find(e => e.nombre === equipoUsuario);
    if (equipo) {
      equipo.fuerza = Math.max(0, equipo.fuerza + delta);
    }
  }

  actualizarFuerzaUI();
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




function resetearVistatct() {
  document.getElementById("tct").innerHTML = "";
}

function resetearVistacu() {
  document.getElementById("cuadrangulares").innerHTML = "";
}

function resetearVistafi() {
  document.getElementById("final").innerHTML = "";
}

function resetearVista() {
  document.getElementById("tct").innerHTML = "";
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

  const todos = [...equiposPrimera, ...equiposSegunda.map(e => e.nombre)];

  todos.forEach(nombre => {
    const option = document.createElement("option");
    option.value = nombre;
    option.textContent = nombre;
    select.appendChild(option);
  });

  select.addEventListener("change", () => {
    equipoUsuario = select.value;
    equipoJugador = equipoUsuario;

    if (equiposPrimera.includes(equipoUsuario)) {
      divisionJugador = "Primera";
      fuerzaJugador = fuerzaEquipos[equipoUsuario];
    } else {
      divisionJugador = "Segunda";
      fuerzaJugador = equiposSegunda.find(e => e.nombre === equipoUsuario)?.fuerza || 63;
    }

    seleccionarEquipo(equipoUsuario); // ✅ Mostrar presupuesto después de la elección
  });
}

function obtenerDivision(nombreEquipo) {
  if (equiposPrimera.includes(nombreEquipo)) {
    return "primera";
  } else if (equiposSegunda.some(e => e.nombre === nombreEquipo)) {
    return "segunda";
  }
  return "desconocida";
}


window.onload = () => {
  inicializarSelectorEquipos();

};
