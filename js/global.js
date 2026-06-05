
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
let libertadoresGanadasPorUsuario = 0;
let primerabGanadasPorUsuario = 0;
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
  { nombre: "Nacional", fuerza: 72 },
  { nombre: "Junior", fuerza: 72 },
  { nombre: "América", fuerza: 70 },
  { nombre: "Tolima", fuerza: 70 },
  { nombre: "Santa Fe", fuerza: 70 },
  { nombre: "Medellín", fuerza: 70 },
  { nombre: "Millonarios", fuerza: 70 },
  { nombre: "Cali", fuerza: 69 },
  { nombre: "Bucaramanga", fuerza: 68 },
  { nombre: "Once Caldas", fuerza: 67 },
  { nombre: "Inter Bogotá", fuerza: 66 },
  { nombre: "Pasto", fuerza: 66 },
  { nombre: "Águilas", fuerza: 65 },
  { nombre: "Fortaleza", fuerza: 65 },
  { nombre: "Cucuta", fuerza: 63 },
  { nombre: "Llaneros", fuerza: 63 },
  { nombre: "Alianza", fuerza: 63 },
  { nombre: "Pereira", fuerza: 63 },
  { nombre: "Jaguares", fuerza: 63 },
  { nombre: "B.Chico", fuerza: 63 }
  
];

//EQUIPOS DE SEGUNDA
let equiposSegunda = [
  { nombre: "Envigado", fuerza: 62 },
  { nombre: "Real Cartagena", fuerza: 62 },
  { nombre: "U.Magdalena", fuerza: 62 },
  { nombre: "Inter Palmira", fuerza: 61 },
  { nombre: "Quindio", fuerza: 61 },
  { nombre: "Ind.Yumbo", fuerza: 58 },
  { nombre: "Patriotas", fuerza: 58 },
  { nombre: "Bogotá", fuerza: 55 },
  { nombre: "Orsomarso", fuerza: 55 },
  { nombre: "Barranquilla", fuerza: 55 },
  { nombre: "R.Cundinamarca", fuerza: 55}, 
  { nombre: "Tigres", fuerza: 55},
  { nombre: "Leones", fuerza: 52 },
  { nombre: "Atlético FC", fuerza: 52 },
  { nombre: "Boca Jrs. Cali", fuerza: 52},
  { nombre: "R.Santander", fuerza: 50 }
  
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
  "CA Boca Jrs",
  "Oro Negro",
  "Bajo Cauca",
  "R.San Andres"
];


Object.defineProperty(window, "equipos", {
  get() {
    return equiposPrimera.map(e => e.nombre);
  }
});

const fundaciones = {
  "Nacional": "7 de marzo de 1947",
  "Junior": "7 de agosto de 1924",
  "América": "13 de febrero de 1927",
  "Tolima": "18 de diciembre de 1954",
  "Santa Fe": "28 de febrero de 1941",
  "Medellín": "14 de noviembre de 1913",
  "Millonarios": "18 de junio de 1946",
  "Cali": "23 de noviembre de 1912",
  "Bucaramanga": "11 de mayo de 1949",
  "Once Caldas": "15 de enero de 1961",
  "Inter Bogotá": "10 de diciembre de 2025",
  "Pasto": "12 de octubre de 1949",
  "Águilas": "16 de julio de 2008",
  "Fortaleza": "15 de noviembre de 2010",
  "Cucuta": "10 de septiembre de 1924",
  "Llaneros": "20 de abril de 2012",
  "Alianza": "16 de enero de 2024",
  "Pereira": "12 de febrero de 1944",
  "Jaguares": "5 de diciembre de 2012",
  "B.Chico": "26 de marzo de 2002",

  "Envigado": "14 de octubre de 1989",
  "Real Cartagena": "2 de febrero de 1992",
  "U.Magdalena": "19 de abril de 1953",
  "Patriotas": "18 de febrero de 2003",
  "Inter Palmira": "10 de enero de 2024",
  "Ind.Yumbo": "11 de diciembre de 2025",
  "Tigres": "20 de enero de 2016",
  "Boca Jrs. Cali": "15 de junio de 2019",
  "Atlético FC": "15 de diciembre de 2015",
  "R.Cundinamarca": "10 de julio de 2023",
  "Leones": "1 de enero de 2015",
  "Quindio": "8 de enero de 1951",
  "Barranquilla": "8 de abril de 2005",
  "Bogotá": "18 de marzo de 2003",
  "R.Santander": "18 de enero de 2006",
  "Orsomarso": "25 de julio de 2012",
};



/*
let equipos = equiposPrimera.map(e => e.nombre);
*/


function calcularPresupuestoPorFuerza(fuerza) {
  if (fuerza >= 70) return 30000000;
  if (fuerza >= 69) return 25000000;
  if (fuerza >= 66) return 20000000;
  if (fuerza >= 64) return 15000000;
  if (fuerza >= 60) return 12000000;
  if (fuerza >= 56) return 10000000;
  if (fuerza >= 54) return 7000000;
  return 5000000;
}

function calcularSueldoPorFuerza(fuerza) {
  const presupuesto = calcularPresupuestoPorFuerza(fuerza);

  let porcentaje = 0.35;

  if (fuerza >= 70) porcentaje = 0.60;
  else if (fuerza >= 68) porcentaje = 0.55;
  else if (fuerza >= 65) porcentaje = 0.50;
  else if (fuerza >= 60) porcentaje = 0.45;
  else if (fuerza >= 56) porcentaje = 0.40;

  //return Math.round(presupuesto * porcentaje);
  return Math.round(presupuesto * (0.30 + fuerza / 200));
}

function formatearPrecios(valor) {
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


function formatearPrecio(valor) {
  const absValor = Math.abs(valor);

  if (absValor >= 1_000_000) {
    let millones = (absValor / 1_000_000).toFixed(1);

    // quitar .0
    if (millones.endsWith(".0")) {
      millones = millones.slice(0, -2);
    }

    return `${valor < 0 ? "-$" : "$"}${millones}M`;
  } else {
    let miles = Math.round(absValor / 1000);
    return `${valor < 0 ? "-$" : "$"}${miles}K`;
  }
}

function formatearSalarioMensual(valor) {
  if (valor >= 1000) {
    return `$${valor.toLocaleString()}`;
  }
  return `$${valor}`;
}

function calcularPrecioPorMedia(media) {
  const tabla = [
  { media: 20, precio: 2000 },
  { media: 30, precio: 5000 },
  { media: 40, precio: 12000 },
  { media: 50, precio: 30000 },
  { media: 52, precio: 45000 },
  { media: 54, precio: 65000 },
  { media: 56, precio: 90000 },
  { media: 58, precio: 130000 },
  { media: 60, precio: 200000 },
  { media: 65, precio: 500000 },
  { media: 66, precio: 650000 },
  { media: 67, precio: 850000 },
  { media: 68, precio: 1100000 },
  { media: 69, precio: 1400000 },
  { media: 70, precio: 1800000 },
  { media: 71, precio: 2200000 },
  { media: 72, precio: 2700000 },
  { media: 73, precio: 3300000 },
  { media: 74, precio: 4000000 },
  { media: 75, precio: 4800000 },
  { media: 76, precio: 5800000 },
  { media: 77, precio: 6900000 },
  { media: 78, precio: 8200000 },
  { media: 80, precio: 10000000 },
  { media: 81, precio: 15000000 },
  { media: 82, precio: 20000000 },
  { media: 83, precio: 25000000 }
];

  // Límite inferior
  if (media <= 20) return 20000;
  // Límite superior
  if (media >= 84) return 60000000;

  // Buscar el rango más cercano
  for (let i = 0; i < tabla.length - 1; i++) {
    const actual = tabla[i];
    const siguiente = tabla[i + 1];

    if (media >= actual.media && media <= siguiente.media) {
      // Interpolación lineal entre dos puntos
      const proporcion = (media - actual.media) / (siguiente.media - actual.media);
      const precioInterpolado = actual.precio + proporcion * (siguiente.precio - actual.precio);
      return Math.floor(precioInterpolado *3);
    }
  }

  return 100000; // por seguridad
}

function generarFactorJugador(nombre) {
  let hash = 0;

  for (let i = 0; i < nombre.length; i++) {
    hash += nombre.charCodeAt(i);
  }

  // valor entre 0.9 y 1.1
  return 0.9 + (hash % 20) / 100;
}

function calcularPrecioJugador(jugador) {
  const base = calcularPrecioPorMedia(jugador.media);

  const factor = generarFactorJugador(jugador.nombre);

  // Ajuste por edad (MUY importante)
  let factorEdad = 1;

  if (jugador.edad < 21) factorEdad = 1.3;
  else if (jugador.edad < 25) factorEdad = 1.15;
  else if (jugador.edad > 30) factorEdad = 0.85;
  else if (jugador.edad > 34) factorEdad = 0.7;

  return Math.round(base * factor * factorEdad);
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

  mostrarEstadio(nombreEquipo);
  mostrarEstrellasPorFuerza(fuerza);
  mostrarPanelFuerzas();
}



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

  const tienePortero = plantilla.some(j => j.posicion && j.posicion.toLowerCase() === "po");
  if (!tienePortero) return base;

 // const mediaPromedio = plantilla.reduce((sum, j) => sum + (Number(j.media) || 0), 0) / plantilla.length;

  const mediaPromedio = plantilla.reduce((sum, j) => {
  const media = Number(j.media) || 0;
  const forma = Number(j.forma) || 0;
  return sum + (media + forma);
}, 0) / plantilla.length;

  // ⚽ Sistema único
const pesoBase = 0.30;
const pesoMedia = 0.70;

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

    const diferencia = fuerzaTotal - fuerzaUsuario;

    const diffClase =
      diferencia > 0 ? "diff-positiva" :
      diferencia < 0 ? "diff-negativa" :
      "diff-neutra";

/*
      <div class="tarjeta-fuerza ${nombre === equipoUsuario ? "usuario" : ""}">
        <h4>${nombre}${nombre === equipoUsuario ? " ⭐" : ""}</h4>

        <div class="fila-datos">
          <span>F.B.A.</span>
          <span>${baseAjustada.toFixed(1)}</span>
        </div>
        */
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


// 📌 Actualizar fuerza y media en la UI
function actualizarFuerzaUI() {
  if (!equipoUsuario) return;
  const fuerza = Number(obtenerFuerzaTotal(equipoUsuario)) || 0;
  const el = document.getElementById("fuerzaEquipo");
  if (el) el.innerText = `Fuerza: ${fuerza}`;

  // ⭐ Actualizar las estrellas también
  mostrarEstrellasPorFuerza(fuerza);
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

function modificarFuerzaEquipoIA(nombreEquipo, delta) {

  let equipo = equiposPrimera.find(e => e.nombre === nombreEquipo)
           || equiposSegunda.find(e => e.nombre === nombreEquipo);

  if (equipo) {
    equipo.fuerza = Math.max(0, equipo.fuerza + delta);
  }
}



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

    const escudo = `<img src="${getEscudoEquipo(t.nombre)}" 
     onerror="this.src='escudos/default.png'" 
     class="escudo">`;

    /*
    const nombreLimpio = t.nombre
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/ /g, "_");
    const escudo = `<img src="escudos/${nombreLimpio}.png" alt="${t.nombre}" class="escudo">`;
*/
    html += `<tr class="${claseFila}"><td>${i + 1}</td><td>${escudo} ${t.nombre}</td><td>${t.pts}</td><td>${dg}</td></tr>`;
  });

  html += "</table>";
  document.getElementById(divId).innerHTML = html;
}



function resetearVista() {
  document.getElementById("tct").innerHTML = "";
  document.getElementById("tctr").innerHTML = "";
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
   ...equiposSegunda.map(e => e.nombre),

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



function renderEquipos() {
  const contenedor = document.getElementById("listaEquipos");

  contenedor.innerHTML = `
    <h3>Primera A</h3>
    <div class="grid-equiposA">
      ${equiposPrimera.map(e => `
       <button class="equipo-btnA" onclick="mostrarPlantilla('${e.nombre}')">
        ${e.nombre}
       </button>
      `).join("")}
    </div>

    <h3>Segunda</h3>
    <div class="grid-equiposB">
      ${equiposSegunda.map(e => `
        <button class="equipo-btnB" onclick="mostrarPlantilla('${e.nombre}')">
         ${e.nombre}
        </button>
      `).join("")}
    </div>
  `;
}


function actualizarTodo() {

  // 🔥 limpiar cache de TODOS los equipos
  Object.keys(sueldosEquipos).forEach(e => {
    delete sueldosEquipos[e];
  });

  // 🔄 volver a renderizar el equipo actual
  const selector = document.getElementById("selectorEquipo");
  if (selector && selector.value) {
    mostrarPlantilla(selector.value);
  }

  console.log("✅ Todo actualizado");
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
    fuerza: 55
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
  cargarSelectRefundar();

  alert(`🏟️ ${equipoNuevo} ha sido refundado y entra a la B en la Temporada ${temporadaActual}`);
}

function inicializarFormaPlantillas() {
  for (let equipo in plantillasJugadores) {
    plantillasJugadores[equipo].forEach(j => {
      if (j.forma === undefined) {
        j.forma = 0;
      }
    });
  }
}


function obtenerDivision(nombreEquipo) {
  if (equiposPrimera.some(e => e.nombre === nombreEquipo)) {
    return "primera";
  } else if (equiposSegunda.some(e => e.nombre === nombreEquipo)) {
    return "segunda";
  }
  return "desconocida";
}




//let fotosDesbloqueadas = localStorage.getItem("fotosDesbloqueadas") === "true";

const FOTO_GENERICA = "img/jugadores/default.png";
const FONDO_SIN_LICENCIA = "img/fondos/fondo-azul.png";
const FONDO_CON_LICENCIA = "img/fondos/fondo-premium.png";


const SECRET_KEY = "clave_super_secreta_123"; // misma del generador

let fotosDesbloqueadas = localStorage.getItem("fotosDesbloqueadas") === "true";


function getFotoJugador(jugador) {
  if (fotosDesbloqueadas && jugador.foto) {
    return jugador.foto;
  }
  return FOTO_GENERICA;
}


function getEscudoEquipo(nombre) {
  const limpio = nombre
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/ /g, "_");

  const esColombiano =
    equiposPrimera.some(e => e.nombre === nombre) ||
    equiposSegunda.some(e => e.nombre === nombre);

  // 🇨🇴 COLOMBIA (con licencia)
  if (esColombiano) {
    if (!fotosDesbloqueadas) {
      return "escudos/default.png";
    }
    return `escudos/${limpio}.png`;
  }

  // 🌎 LIBERTADORES (SIEMPRE visibles)
  return `escudos-lib/${limpio}.png`;
}

function actualizarFondo() {
  if (fotosDesbloqueadas) {
    document.body.style.backgroundImage = `url('${FONDO_CON_LICENCIA}')`;
  } else {
    document.body.style.backgroundImage = `url('${FONDO_SIN_LICENCIA}')`;
  }
}

// 🔐 Generar firma (igual que en el generador)
async function generarFirma(texto) {
const encoder = new TextEncoder();
const data = encoder.encode(texto + SECRET_KEY);

const hashBuffer = await crypto.subtle.digest("SHA-256", data);
const hashArray = Array.from(new Uint8Array(hashBuffer));

return hashArray.map(b => b.toString(16).padStart(2, "0")).join("");
}

// 📂 Leer archivo licencia
document.getElementById("inputLicencia").addEventListener("change", async function(e) {
const archivo = e.target.files[0];
if (!archivo) return;

const reader = new FileReader();

reader.onload = async function(event) {
try {
const data = JSON.parse(event.target.result);


  // 🔎 Validar estructura
  if (!data.unlockPhotos || !data.firma) {
    alert("Licencia inválida");
    return;
  }

  // 🔐 Recalcular firma
  const copia = {
    usuario: data.usuario,
    unlockPhotos: data.unlockPhotos
  };

  const textoBase = JSON.stringify(copia);
  const firmaCalculada = await generarFirma(textoBase);

  // ✅ Comparar firmas
  if (firmaCalculada === data.firma) {
    fotosDesbloqueadas = true;
    localStorage.setItem("fotosDesbloqueadas", "true");
    actualizarFondo();
    alert("✅ Licencia válida - Fotos desbloqueadas");
  } else {
    alert("❌ Licencia falsa o modificada");
  }

} catch {
  alert("Error al leer archivo");
}


};

reader.readAsText(archivo);
});



/*
document.getElementById("inputLicencia").addEventListener("change", function(e) {
  const archivo = e.target.files[0];
  if (!archivo) return;

  const reader = new FileReader();

  reader.onload = function(event) {
    try {
      const data = JSON.parse(event.target.result);

      if (data.unlockPhotos === true) {
        fotosDesbloqueadas = true;
        localStorage.setItem("fotosDesbloqueadas", "true");
        alert("Fotos desbloqueadas");
      } else {
        alert("Archivo inválido");
      }
    } catch {
      alert("Error al leer archivo");
    }
  };

  reader.readAsText(archivo);
});
*/


window.onload = () => {
  inicializarSelectorEquipos();
  renderEquipos();
  cargarSelectRefundar();
  inicializarDTsPorEquipo();
  inicializarFormaPlantillas();
  actualizarFondo();
  
};