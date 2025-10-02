//EQUIPOS DE PRIMERA 
let equiposPrimera = [
  "Nacional", "Millonarios", "América", "Cali", "Junior", "Santa Fe", "Tolima", "Medellín",
  "Once Caldas", "Pereira", "Alianza", "Bucaramanga", "La Equidad", "Envigado", "Pasto",
  "Águilas", "Chico", "Fortaleza", "Llaneros", "Union M."
];

//EQUIPOS DE SEGUNDA +FUERZA
let equiposSegunda = [
  { nombre: "Jaguares", fuerza: 62 },
  { nombre: "Real Cartagena", fuerza: 62 },
  { nombre: "Cucuta", fuerza: 62 },
  { nombre: "Huila", fuerza: 62 },
  { nombre: "Patriotas", fuerza: 62 },
  { nombre: "Real Cundi", fuerza: 60},
  { nombre: "Inter Palmira", fuerza: 60 },
  { nombre: "Leones", fuerza: 58 },
  { nombre: "Tigres", fuerza: 58},
  { nombre: "Quindio", fuerza: 59 },
  { nombre: "Real Santander", fuerza: 58 },
  { nombre: "Orsomarso", fuerza: 58 },
  { nombre: "Boca Jrs. Cali", fuerza: 57 },
  {nombre: "Barranquilla", fuerza: 57 },
  {nombre: "Atlético FC", fuerza: 57 },
  { nombre: "Bogotá", fuerza: 56 }
  
];

//FUERZA EQUIPOS DE PRIMERA
let equipos = [...equiposPrimera];

const fuerzaEquipos = {
  "Nacional": 72, 
  "Millonarios": 72, 
  "América": 71, 
  "Junior": 71, 
  "Santa Fe": 71,
  "Cali": 69, 
  "Medellín": 69, 
  "Tolima": 68, 
  "Once Caldas": 67, 
  "Pereira": 66,
  "Pasto": 66, 
  "Bucaramanga": 66, 
  "Alianza": 65, 
  "La Equidad": 64,
  "Águilas": 64,
  "Fortaleza": 63, 
  "Llaneros": 62, 
  "Union M.": 62,
  "Chico": 62,
  "Envigado": 62
   
};


//VARIABLES GLOBALES
let historialPuntos = {};
let temporadaActual = 2025;
let semestreActual = 1;
let descensoPendiente = false;
let tablaAnual = {};

// --- SUPERLIGA ---
let campeonesLigaPorTemporada = {}; // { 2025: { I: "Millonarios", II: "Junior" } }
let campeonesSuperliga = [];        // Historial [{nombre, temporada}]

let campeones = [];
let tabla = [];
let grupos = { A: [], B: [] };
let finalistas = [];

let equipoUsuario = "";
let equipoJugador = "";
let ligasGanadasPorUsuario = 0;
let divisionJugador = "";
let fuerzaJugador = 0;

let equiposConsecutivos = {};  
// Guarda t铆tulos consecutivos por equipo
let ultimoCampeon = "";// 脷ltimo campe贸n

let dtSeleccionado = ""; // antes de elegir

let moralHinchada = 30; // valor inicial medio
let moralEvaluadaEsteSemestre = false;



const estilosDT = {
  // 📌 Estilos fijos (consistentes)
  ofensivo: 3,
  defensivo: 2,
  equilibrado: 0,
  motivador: 1,
  posesion: 3,
  juegoBandas: 1,
  juegoInterior: 1,
  vertical: 2,
  conservador: -1,
  juegoLento: -1,

  // 🎲 Estilos cambiantes (volátiles)
  atrevido: Math.floor(Math.random() * 5) - 2,        // entre -2 y +2
  experimental: Math.floor(Math.random() * 9) - 4,    // entre -4 y +4
  creativo: Math.floor(Math.random() * 5) - 1,        // entre -1 y +3
  contragolpe: Math.floor(Math.random() * 4),         // entre 0 y +3
  presionAlta: Math.floor(Math.random() * 5) - 1,     // entre -1 y +3
  intensidadAlta: Math.floor(Math.random() * 6) - 2,  // entre -2 y +3
  transicionesRapidas: Math.floor(Math.random() * 3)  // entre 0 y +2
};

// 📌 Variable global para guardar el DT del usuario
let dtUsuario = null;

// 📌 Seleccionar DT desde el <select>
function seleccionarDT(claveDT) {
  dtUsuario = entrenadores[claveDT];
  if (dtUsuario) {

  dtSeleccionado = dtUsuario.nombre;

    document.getElementById("fotoDT").src = dtUsuario.foto;
document.getElementById("dtNombre").innerText = dtUsuario.nombre;
document.getElementById("dtEstilo").innerText = `Estilo: ${dtUsuario.estilo}`;
  }
actualizarFuerzaUI() 
}


// 📌 Calcular fuerza total del equipo
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

// 📌 Actualizar fuerza en la UI
function actualizarFuerzaUI() {
  if (!equipoUsuario) return;
  const fuerza = Number(obtenerFuerzaTotal(equipoUsuario)) || 0;
  const el = document.getElementById("fuerzaEquipo");
  if (el) el.innerText = `Fuerza: ${fuerza}`;
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

function asignarEstiloAleatorio() {
  const keys = Object.keys(estilosDT);
  return keys[Math.floor(Math.random() * keys.length)];
}

// 📌 Lista de entrenadores (los mismos del <select>)
const entrenadores = {
  gamero: { nombre: "Alberto Gamero", foto: "dts/gamero.png", estilo: asignarEstiloAleatorio() },
  gonzalez: { nombre: "David González", foto: "dts/gonzalez.png", estilo: asignarEstiloAleatorio() },
  hernan: { nombre: "Hernán Torres", foto: "dts/hernan.png", estilo: asignarEstiloAleatorio() },
  bava: { nombre: "Jorge Bava", foto: "dts/bava.png", estilo: asignarEstiloAleatorio() },
  herrera: { nombre: "Hernán Darío Herrera", foto: "dts/herrera.png", estilo: asignarEstiloAleatorio() },
  leonel: { nombre: "Leonel Álvarez", foto: "dts/leonel.png", estilo: asignarEstiloAleatorio() },
  restrepo: { nombre: "Alejandro Restrepo", foto: "dts/restrepo.png", estilo: asignarEstiloAleatorio() },
  arias: { nombre: "Alfredo Arias", foto: "dts/arias.png", estilo: asignarEstiloAleatorio() },
  duda: { nombre: "Rafael Dudamel", foto: "dts/dudamel.png", estilo: asignarEstiloAleatorio() },
  bodhert: { nombre: "Hubert Bodhert", foto: "dts/bodhert.png", estilo: asignarEstiloAleatorio() },
  lucas: { nombre: "Lucas González", foto: "dts/lucas.png", estilo: asignarEstiloAleatorio() },
  flabio: { nombre: "Flabio Torres", foto: "dts/flabio.png", estilo: asignarEstiloAleatorio() },
  oliveros: { nombre: "Sebastián Oliveros", foto: "dts/oliveros.png", estilo: asignarEstiloAleatorio() },
  merino: { nombre: "Diego Merino", foto: "dts/merino.png", estilo: asignarEstiloAleatorio() },
  garciajl: { nombre: "José Luis García", foto: "dts/garciajl.png", estilo: asignarEstiloAleatorio() },
  ayala: { nombre: "Camilo Ayala", foto: "dts/ayala.png", estilo: asignarEstiloAleatorio() },
  orozco: { nombre: "Andrés Orozco", foto: "dts/orozco.png", estilo: asignarEstiloAleatorio() },

  silva: { nombre: "Carlos Silva", foto: "dts/silva.png", estilo: asignarEstiloAleatorio() },
  alvaro: { nombre: "Alvaro Hernández", foto: "dts/alvaro.png", estilo: asignarEstiloAleatorio() },
  rolo: { nombre: "Nelson Florez", foto: "dts/rolo.png", estilo: asignarEstiloAleatorio() },
  niño: { nombre: "Juan David Niño", foto: "dts/niño.png", estilo: asignarEstiloAleatorio() },
  rivera: { nombre: "Harold Rivera", foto: "dts/rivera.png", estilo: asignarEstiloAleatorio() },
  garcia: { nombre: "Alexis García", foto: "dts/garcia.png", estilo: asignarEstiloAleatorio() },
  cardenas: { nombre: "Héctor Cardenas", foto: "dts/cardenas.png", estilo: asignarEstiloAleatorio() },
  corredor: { nombre: "Diego Corredor", foto: "dts/corredor.png", estilo: asignarEstiloAleatorio() },
  craviotto: { nombre: "Néstor Craviotto", foto: "dts/craviotto.png", estilo: asignarEstiloAleatorio() },
  viera: { nombre: "Sebastián Viera", foto: "dts/viera.png", estilo: asignarEstiloAleatorio() },
  osorio: { nombre: "Juan Carlos Osorio", foto: "dts/osorio.png", estilo: asignarEstiloAleatorio() },
  gandolfi: { nombre: "Javier Gandolfi", foto: "dts/gandolfi.png", estilo: asignarEstiloAleatorio() },
  cruzreal: { nombre: "Juan Cruz Real", foto: "dts/cruzreal.png", estilo: asignarEstiloAleatorio() },
  pusineri: { nombre: "Lucas Pusineri", foto: "dts/pusineri.png", estilo: asignarEstiloAleatorio() }
  
};


// RECUPERAR EL NOMBRE DEL PRESIDENTE
const nombrePresidente = localStorage.getItem("nombrePresidente") || "Presidente";

// MOSTRARLO en PANTALLA si TIENES un CONTENEDOR
const encabezado = document.getElementById("nombrePresidenteMostrar");
if (encabezado) {
  encabezado.textContent = `👔 Bienvenido, ${nombrePresidente}`;
}



//PLANTILLAS
const plantillasJugadores = {
  "Nacional": [
  { nombre: "D.Ospina", edad: 36, media: 73, posicion: "Portero" , foto: "img/jugadores/nacional/ospina.png"},
  { nombre: "H.Castillo", edad: 31, media: 68, posicion: "Portero" , foto: "img/jugadores/nacional/castillo.png"},

  { nombre: "A.Roman", edad: 29, media: 72, posicion: "Defensa" , foto: "img/jugadores/nacional/roman.png"},
  { nombre: "C.Candido", edad: 30, media: 68, posicion: "Defensa" , foto: "img/jugadores/nacional/candido.png"},
  { nombre: "W.Tesillo", edad: 35, media: 72, posicion: "Defensa" , foto: "img/jugadores/nacional/tesillo.png" },
  { nombre: "C.Haydar", edad: 24, media: 69, posicion: "Defensa" , foto: "img/jugadores/nacional/haydar.png"},

  { nombre: "E.Cardona", edad: 32, media: 73, posicion: "Volante" , foto: "img/jugadores/nacional/cardona.png" },
  { nombre: "J.Bauza", edad: 29, media: 69, posicion: "Volante" , foto: "img/jugadores/nacional/bauza.png"},
  { nombre: "M.Uribe", edad: 34, media: 74, posicion: "Pivote" , foto: "img/jugadores/nacional/uribe.png"},
  { nombre: "J.Campuzano", edad: 29, media: 71, posicion: "Pivote" , foto: "img/jugadores/nacional/campuzano.png" },

  { nombre: "A.Morelos", edad: 29, media: 71, posicion: "Delantero" , foto: "img/jugadores/nacional/morelos.png"},
  { nombre: "M.Hinestroza", edad: 23, media: 77, posicion: "Delantero" , foto: "img/jugadores/nacional/marino.png"},
  { nombre: "M.Moreno", edad: 28, media: 76, posicion: "Delantero" , foto: "img/jugadores/nacional/marlos.png"},
  { nombre: "F.Batista", edad: 26, media: 68, posicion: "Delantero" , foto: "img/jugadores/nacional/batista.png"},
  { nombre: "B.Arce", edad: 27, media: 69, posicion: "Delantero" , foto: "img/jugadores/nacional/arce.png"}
],

"Millonarios": [
  { nombre: "G.de Amores", edad: 30, media: 68, posicion: "Portero"  , foto: "img/jugadores/millonarios/amores.png" },
  { nombre: "D.Novoa", edad: 36, media: 65, posicion: "Portero"  , foto: "img/jugadores/millonarios/novoa.png"},

  { nombre: "H.Palacios", edad: 32, media: 69, posicion: "Defensa"  , foto: "img/jugadores/millonarios/helibelton.png"},
  { nombre: "A.Llinás", edad: 27, media: 72, posicion: "Defensa" , foto: "img/jugadores/millonarios/llinas.png" },
  { nombre: "D.Banguero", edad: 35, media: 68, posicion: "Defensa"  , foto: "img/jugadores/millonarios/banguero.png"},
  { nombre: "S.Mosquera", edad: 31, media: 69, posicion: "Defensa"  , foto: "img/jugadores/millonarios/mosquera.png"},
  { nombre: "J.Arias", edad: 32, media: 68, posicion: "Defensa" , foto: "img/jugadores/millonarios/jarias.png"},

  { nombre: "D.Mackalister", edad: 38, media: 70, posicion: "Volante"  , foto: "img/jugadores/millonarios/maca.png"},
  { nombre: "N.Arevalo", edad: 22, media: 69, posicion: "Pivote"  , foto: "img/jugadores/millonarios/arevalo.png"},
  { nombre: "B.Savio", edad: 31, media: 70, posicion: "Volante"  , foto: "img/jugadores/millonarios/savio.png"},

  { nombre: "Leo Castro", edad: 33, media: 72, posicion: "Delantero" , foto: "img/jugadores/millonarios/leo.png" },
  { nombre: "S.Giordana", edad: 30, media: 69, posicion: "Delantero"  , foto: "img/jugadores/millonarios/giordana.png"},
  { nombre: "A.Castro", edad: 31, media: 67, posicion: "Delantero" , foto: "img/jugadores/millonarios/alex.png" },
  { nombre: "Beckham C.", edad: 21, media: 68, posicion: "Delantero" , foto: "img/jugadores/millonarios/beckham.png"},
  { nombre: "C.Cañozales", edad: 26, media: 66, posicion: "Delantero"  , foto: "img/jugadores/millonarios/canozales.png"}
],

"América": [
  { nombre: "J.Soto", edad: 31, media: 69, posicion: "Portero"  , foto: "img/jugadores/america/soto.png"},
  { nombre: "S.Silva", edad: 26, media: 64, posicion: "Portero"  , foto: "img/jugadores/america/silva.png"},

  { nombre: "Y.Candelo", edad: 33, media: 69, posicion: "Defensa"  , foto: "img/jugadores/america/candelo.png"},
  { nombre: "D.Bocanegra", edad: 38, media: 68, posicion: "Defensa" , foto: "img/jugadores/america/bocanegra.png" },
  { nombre: "M.Mina", edad: 26, media: 66, posicion: "Defensa" , foto: "img/jugadores/america/mina.png" },
  { nombre: "C.Tovar", edad: 27, media: 67, posicion: "Defensa"  , foto: "img/jugadores/america/tovar.png"},
  { nombre: "J.Escobar", edad: 20, media: 65, posicion: "Defensa" , foto: "img/jugadores/america/josen.png"},

  { nombre: "R.Carrascal", edad: 27, media: 71, posicion: "Volante"  , foto: "img/jugadores/america/carrascal.png"},
  { nombre: "E.Balanta", edad: 32, media: 67, posicion: "Pivote" , foto: "img/jugadores/america/balanta.png" },
  { nombre: "L.Paz", edad: 36, media: 66, posicion: "Pivote" , foto: "img/jugadores/america/paz.png" },
  { nombre: "S.Navarro", edad: 25, media: 67, posicion: "Volante" , foto: "img/jugadores/america/navarro.png"},

  { nombre: "C.Barrios", edad: 27, media: 71, posicion: "Delantero"  , foto: "img/jugadores/america/barrios.png"},
  { nombre: "R.Holgado", edad: 30, media: 70, posicion: "Delantero" , foto: "img/jugadores/america/holgado.png" },
  { nombre: "J.Murillo", edad: 29, media: 72, posicion: "Delantero" , foto: "img/jugadores/america/murillo.png" },
  { nombre: "D.Borrero", edad: 23, media: 66, posicion: "Delantero"  , foto: "img/jugadores/america/borrero.png"}
],

"Junior": [
  { nombre: "M.Silveira", edad: 25, media: 71, posicion: "Portero"  , foto: "img/jugadores/junior/silveira.png"},
  { nombre: "J.Martinez", edad: 31, media: 67, posicion: "Portero" , foto: "img/jugadores/junior/jeferson.png" },

  { nombre: "J.Guerrero", edad: 24, media: 65, posicion: "Defensa"  , foto: "img/jugadores/junior/jhomier.png"},
  { nombre: "J.Peña", edad: 25, media: 67, posicion: "Defensa"  , foto: "img/jugadores/junior/zidane.png"},
  { nombre: "Y.Suarez", edad: 28, media: 67, posicion: "Defensa"  , foto: "img/jugadores/junior/yeison.png"},
  { nombre: "J.Baez", edad: 35, media: 69, posicion: "Defensa" , foto: "img/jugadores/junior/baez.png" },
   { nombre: "D.Rivera", edad: 26, media: 65, posicion: "Defensa"  , foto: "img/jugadores/junior/drivera.png"},

  { nombre: "Y.Chara", edad: 34, media: 71, posicion: "Volante" , foto: "img/jugadores/junior/chara.png" },
  { nombre: "D.Moreno", edad: 33, media: 68, posicion: "Pivote"  , foto: "img/jugadores/junior/didier.png"},
  { nombre: "G.Celis", edad: 32, media: 68, posicion: "Pivote" , foto: "img/jugadores/junior/celis.png" },
  { nombre: "C.Esparragoza", edad: 26, media: 64, posicion: "Volante"  , foto: "img/jugadores/junior/esparragoza.png"},

  { nombre: "G.Paiva", edad: 27, media: 70, posicion: "Delantero"  , foto: "img/jugadores/junior/paiva.png"},
  { nombre: "C.Bacca", edad: 38, media: 70, posicion: "Delantero"  , foto: "img/jugadores/junior/bacca.png"},
  { nombre: "S.Rodriguez", edad: 28, media: 68, posicion: "Delantero"  , foto: "img/jugadores/junior/titi.png"},
  { nombre: "T.Gutierrez", edad: 40, media: 69, posicion: "Delantero" , foto: "img/jugadores/junior/teo.png" }
],

"Santa Fe": [
  { nombre: "A.Marmolejo", edad: 33, media: 73, posicion: "Portero"  , foto: "img/jugadores/santafe/marmolejo.png"},
  { nombre: "W.Asprilla", edad: 26, media: 66, posicion: "Portero"  , foto: "img/jugadores/santafe/weimar.png"},

  { nombre: "E.Perlaza", edad: 36, media: 68, posicion: "Defensa"  , foto: "img/jugadores/santafe/elvis.png"},
  { nombre: "V.Moreno", edad: 30, media: 67, posicion: "Defensa"  , foto: "img/jugadores/santafe/victor.png"},
  { nombre: "J.Sosa", edad: 23, media: 67, posicion: "Defensa"  , foto: "img/jugadores/santafe/sosa.png"},
  { nombre: "I.Scarpeta", edad: 29, media: 68, posicion: "Defensa"  , foto: "img/jugadores/santafe/scarpeta.png"},

  { nombre: "Y.Velasquez", edad: 25, media: 68, posicion: "Pivote" , foto: "img/jugadores/santafe/yilmar.png" },
  { nombre: "D.Torres", edad: 35, media: 68, posicion: "Pivote"  , foto: "img/jugadores/santafe/danito.png"},
  { nombre: "A.Zapata", edad: 30, media: 67, posicion: "Volante"  , foto: "img/jugadores/santafe/zapata.png"},
  { nombre: "E.Murillo", edad: 25, media: 67,   posicion: "Pivote" , foto: "img/jugadores/santafe/ewil.png" },

  { nombre: "H.Rodallega", edad: 40, media: 70, posicion: "Delantero"  , foto: "img/jugadores/santafe/hugol.png"},
  { nombre: "Angelo R.", edad: 36, media: 67,   posicion: "Delantero" , foto: "img/jugadores/santafe/angelo.png" },
  { nombre: "O.Frasica", edad: 32, media: 69, posicion: "Delantero"  , foto: "img/jugadores/santafe/frasika.png"},
  { nombre: "H.Mosquera", edad: 30, media: 71, posicion: "Delantero"  , foto: "img/jugadores/santafe/santimosquera.png"}
],

 "Cali": [
  { nombre: "A.Rodriguez", edad: 24, media: 69, posicion: "Portero", foto: "img/jugadores/cali/alejo.png" },
  { nombre: "M.Espindola", edad: 27, media: 64, posicion: "Portero" , foto: "img/jugadores/cali/espindola.png"},

  { nombre: "F.Viafara", edad: 33, media: 68, posicion: "Defensa", foto: "img/jugadores/cali/viafara.png" },
  { nombre: "G.Corujo", edad: 28, media: 68, posicion: "Defensa" , foto: "img/jugadores/cali/corujo.png"},
  { nombre: "J.Varela", edad: 27, media: 67, posicion: "Defensa", foto: "img/jugadores/cali/varela.png" },
  { nombre: "F.Aguilar", edad: 32, media: 66, posicion: "Defensa" , foto: "img/jugadores/cali/aguilar.png"},
  { nombre: "J.Quiñones", edad: 35, media: 66, posicion: "Defensa" , foto: "img/jugadores/cali/juliqui.png"},

  { nombre: "A.Colorado", edad: 26, media: 68, posicion: "Pivote" , foto: "img/jugadores/cali/colorado.png"},
  { nombre: "Y.Gordillo", edad: 33, media: 67, posicion: "Pivote" , foto: "img/jugadores/cali/gordillo.png"},
  { nombre: "Yani Q.", edad: 23, media: 66, posicion: "Pivote", foto: "img/jugadores/cali/yani.png" },
  { nombre: "J.Reina", edad: 36, media: 67, posicion: "Volante", foto: "img/jugadores/cali/reina.png" },
  { nombre: "J.Martinez", edad: 23, media: 67, posicion: "Volante" , foto: "img/jugadores/cali/johanm.png"},

  { nombre: "A.Estupiñan", edad: 31, media: 68, posicion: "Delantero" , foto: "img/jugadores/cali/andrey.png"},
  { nombre: "F.Mimbacas", edad: 23, media: 64, posicion: "Delantero", foto: "img/jugadores/cali/mimbacas.png" },
  { nombre: "A.Hurtado", edad: 38, media: 66, posicion: "Delantero" , foto: "img/jugadores/cali/aviles.png"}
],

"Medellín": [
  { "nombre": "W.Aguerre", "edad": 32, "media": 71, "posicion": "Portero"  , foto: "img/jugadores/dim/aguerre.png"},
  { "nombre": "E.Chaux", "edad": 33, "media": 67, "posicion": "Portero" , foto: "img/jugadores/dim/chaux.png" },

  { "nombre": "J.Ortiz", "edad": 26, "media": 68, "posicion": "Defensa"  , foto: "img/jugadores/dim/ortiz.png"},
  { "nombre": "D.Londoño", "edad": 30, "media": 67, "posicion": "Defensa"  , foto: "img/jugadores/dim/londono.png"},
  { "nombre": "F.Torijano", "edad": 36, "media": 66, "posicion": "Defensa" , foto: "img/jugadores/dim/torijano.png" },
  { "nombre": "K.Mantilla", "edad": 22, "media": 67, "posicion": "Defensa" , foto: "img/jugadores/dim/kmantilla.png" },
  
  { "nombre": "J.Barrera", "edad": 29, "media": 68, "posicion": "Volante" , foto: "img/jugadores/dim/jarlan.png" },
  { "nombre": "E.Mena", "edad": 27, "media": 67, "posicion": "Volante" , foto: "img/jugadores/dim/esneyder.png" },
  { "nombre": "L.Berrio", "edad": 27, "media": 67, "posicion": "Volante" , foto: "img/jugadores/dim/leider.png" },
  { "nombre": "J.Alvarado", "edad": 26, "media": 66, "posicion": "Pivote" , foto: "img/jugadores/dim/alvarado.png" },
  { "nombre": "Baldomero P.", "edad": 33, "media": 66, "posicion": "Volante" , foto: "img/jugadores/dim/baldomero.png" },

  { "nombre": "Jader V.", "edad": 25, "media": 67, "posicion": "Delantero"  , foto: "img/jugadores/dim/jader.png"},
  { "nombre": "F.Fydrizewski", "edad": 32, "media": 68, "posicion": "Delantero"  , foto: "img/jugadores/dim/polaco.png"},
  { "nombre": "F.Chaverra", "edad": 25, "media": 67, "posicion": "Delantero" , foto: "img/jugadores/dim/chaverra.png" },
  { "nombre": "L.Sandoval", "edad": 26, "media": 67, "posicion": "Delantero" , foto: "img/jugadores/dim/sandoval.png" }
],

"Tolima": [
  { nombre: "C.Fiermarin", edad: 27, media: 69, posicion:"Portero" , foto: "img/jugadores/tolima/fiermarin.png"  },
  { nombre: "N.Volpi", edad: 33, media: 67, posicion: "Portero" , foto: "img/jugadores/tolima/volpi.png"  },

  { nombre: "Y.Hurtado", edad: 28,  media: 69, posicion: "Defensa"  , foto: "img/jugadores/tolima/yhormar.png" },
  { nombre: "M.Torres", edad: 29,  media: 68, posicion: "Defensa" , foto: "img/jugadores/tolima/marlon.png"  },
  { nombre: "A.Angulo", edad: 29,   media: 67,  posicion: "Defensa", foto: "img/jugadores/tolima/aangulo.png" },
  { nombre: "S.Velasquez", edad: 22,  media: 65, posicion: "Defensa", foto: "img/jugadores/tolima/samuel.png"   },

  { nombre: "J.Nieto",  edad: 32,  media: 68, posicion: "Pivote", foto: "img/jugadores/tolima/nieto.png"   },
  { nombre: "J.Quiñonez", edad: 24, media: 67,   posicion: "Pivote" , foto: "img/jugadores/tolima/jader.png" },
  { nombre: "J.Torres", edad: 21, media: 65,   posicion: "Volante" , foto: "img/jugadores/tolima/tatay.png" },
  { nombre: "B.Rovira", edad: 29,  media: 68, posicion: "Volante"  , foto: "img/jugadores/tolima/rovira.png" },
  { nombre: "J.Gonzalez", edad: 23,  media: 68, posicion: "Volante"  , foto: "img/jugadores/tolima/jersson.png" },

  { nombre: "G.Lencina", edad: 27, media: 70, posicion: "Delantero" , foto: "img/jugadores/tolima/lencina.png" },
  { nombre: "J.Fuentes", edad: 20,  media: 65, posicion: "Delantero", foto: "img/jugadores/tolima/fuentes.png"   },
  { nombre: "A.Parra", edad: 28, media: 65,  posicion: "Delantero" , foto: "img/jugadores/tolima/parra.png"  }
],

"Once Caldas": [
  { nombre: "J.Aguirre", edad: 33, media: 66, posicion: "Portero" , foto: "img/jugadores/once/aguirre.png" },
  { nombre: "J.Parra", edad: 25, media: 66, posicion: "Portero" , foto: "img/jugadores/once/joan.png" },

  { nombre: "J.Castaño", edad: 26, media: 65, posicion: "Defensa" , foto: "img/jugadores/once/castano.png" },
  { nombre: "K.Cuesta", edad: 25, media: 65, posicion: "Defensa"  , foto: "img/jugadores/once/kcuesta.png"},
  { nombre: "J.Riquett", edad: 35, media: 66, posicion: "Defensa" , foto: "img/jugadores/once/riquett.png" },
  { nombre: "J.Cuesta", edad: 27, media: 67, posicion: "Defensa"  , foto: "img/jugadores/once/jcuesta.png"},

  { nombre: "A.Garcia", edad: 24, media: 64, posicion: "Volante"  , foto: "img/jugadores/once/agarcia.png"},
  { nombre: "Niche Sanchez", edad: 24, media: 67, posicion: "Volante"  , foto: "img/jugadores/once/niche.png"},
  { nombre: "I.Rojas", edad: 28, media: 66, posicion: "Pivote"  , foto: "img/jugadores/once/rojas.png"},
  { nombre: "M.Garcia", edad: 26, media: 67, posicion: "Volante" , foto: "img/jugadores/once/mateog.png" },

  { nombre: "D.Moreno", edad: 39, media: 70, posicion: "Delantero" , foto: "img/jugadores/once/dayro.png" },
  { nombre: "M.Zuleta", edad: 23, media: 67, posicion: "Delantero"  , foto: "img/jugadores/once/zuleta.png"},
  { nombre: "J.Zapata", edad: 25, media: 67, posicion: "Delantero" , foto: "img/jugadores/once/jefry.png" },
  { nombre: "Pipe Gomez", edad: 25, media: 66, posicion: "Delantero" , foto: "img/jugadores/once/pipe.png" },
  { nombre: "M.Barrios", edad: 34, media: 66, posicion: "Delantero"  , foto: "img/jugadores/once/michael.png"}
],

"Pereira": [
  { nombre: "S.Ichazo", edad: 33, media: 68, posicion: "Portero" , foto: "img/jugadores/pereira/ichazo.png" },
  { nombre: "F.Mosquera", edad: 26, media: 63, posicion: "Portero", foto: "img/jugadores/pereira/franklin.png"  },

  { nombre: "J.Moya", edad: 32, media: 68, posicion: "Defensa" , foto: "img/jugadores/pereira/moya.png" },
  { nombre: "J.S.Quintero", edad: 30, media: 68, posicion: "Defensa", foto: "img/jugadores/pereira/jsquintero.png"  },
  { nombre: "E.Velasco", edad: 33, media: 68, posicion: "Defensa", foto: "img/jugadores/pereira/velasco.png"  },
  { nombre: "W.Pacheco", edad: 30, media: 69, posicion: "Defensa" , foto: "img/jugadores/pereira/walmer.png" },

  { nombre: "Darwin Quintero", edad: 37, media: 72, posicion: "Volante" , foto: "img/jugadores/pereira/darwin.png" },
  { nombre: "V.Mejia", edad: 32, media: 66, posicion: "Pivote" , foto: "img/jugadores/pereira/mejia.png" },
  { nombre: "Y.Cabrera", edad: 34, media: 69, posicion: "Volante" , foto: "img/jugadores/pereira/yesus.png" },
  { nombre: "K.Osorio", edad: 31, media: 67, posicion: "Pivote", foto: "img/jugadores/pereira/kelvin.png"  },
  { nombre: "J.Rios", edad: 33, media: 67, posicion: "Pivote" , foto: "img/jugadores/pereira/jrios.png" },

  { nombre: "M.Perez", edad: 34, media: 67, posicion: "Delantero" , foto: "img/jugadores/pereira/marco.png" },
  { nombre: "Y.Quiñones", edad: 22, media: 66, posicion: "Delantero" , foto: "img/jugadores/pereira/yuber.png" },
  { nombre: "S.Merheg", edad: 18, media: 66, posicion: "Delantero" , foto: "img/jugadores/pereira/merheg.png" },
  { nombre: "G.Torres", edad: 29, media: 67, posicion: "Delantero" , foto: "img/jugadores/pereira/gtorres.png" }
],
  "Pasto": [
  { nombre: "D.Martinez", edad: 35, media: 64, posicion: "Portero", foto: "img/jugadores/pasto/dmarti.png"  },
  { nombre: "A.Cabezas", edad: 27, media: 65, posicion: "Portero", foto: "img/jugadores/pasto/cabezas.png"  },

  { nombre: "N.Gil", edad: 28, media: 65, posicion: "Defensa", foto: "img/jugadores/pasto/giln.png"  },
  { nombre: "J.Ossa", edad: 27, media: 66, posicion: "Defensa", foto: "img/jugadores/pasto/ossa.png"  },
  { nombre: "A.Alarcon", edad: 24, media: 65, posicion: "Defensa" , foto: "img/jugadores/pasto/alarcon.png" },
  { nombre: "S.Jimenez", edad: 27, media: 66, posicion: "Defensa" , foto: "img/jugadores/pasto/jimenez.png" },

  { nombre: "F.Jaramillo", edad: 29, media: 67, posicion: "Pivote" , foto: "img/jugadores/pasto/jaramillo.png" },
  { nombre: "K.Rendon", edad: 32, media: 66, posicion: "Volante", foto: "img/jugadores/pasto/rendon.png"  },
  { nombre: "G.Ritacco", edad: 32, media: 66, posicion: "Volante" , foto: "img/jugadores/pasto/ritacco.png" },

  { nombre: "F.Bone", edad: 29, media: 70, posicion: "Delantero", foto: "img/jugadores/pasto/bone.png"  },
  { nombre: "J.Rivas", edad: 28, media: 66, posicion: "Delantero", foto: "img/jugadores/pasto/rivas.png"  },
  { nombre: "D.Camacho", edad: 28, media: 66, posicion: "Delantero" , foto: "img/jugadores/pasto/camacho.png" },
  { nombre: "J.Valois", edad: 20, media: 64, posicion: "Delantero" , foto: "img/jugadores/pasto/valois.png" }
],

"Bucaramanga": [
  { nombre: "A.Quintana", edad: 30, media: 72, posicion: "Portero" , foto: "img/jugadores/bucaramanga/aldair.png" },
  { nombre: "L.Vasquez", edad: 29, media: 66, posicion: "Portero" , foto: "img/jugadores/bucaramanga/erney.png" },

  { nombre: "J.Mena", edad: 36, media: 66, posicion: "Defensa", foto: "img/jugadores/bucaramanga/mena.png"  },
  { nombre: "C.de las Salas", edad: 27, media: 65, posicion: "Defensa" , foto: "img/jugadores/bucaramanga/cdls.png" },
  { nombre: "J.Garcia", edad: 22, media: 65, posicion: "Defensa", foto: "img/jugadores/bucaramanga/joseg.png"  },
  { nombre: "C.Henao", edad: 36, media: 66, posicion: "Defensa", foto: "img/jugadores/bucaramanga/henao.png"  },
  { nombre: "C.Romaña", edad: 25, media: 65, posicion: "Defensa", foto: "img/jugadores/bucaramanga/romana.png"  },

  { nombre: "F.Sambueza", edad: 36, media: 71, posicion: "Volante", foto: "img/jugadores/bucaramanga/sambueza.png"  },
  { nombre: "F.Castro", edad: 33, media: 69, posicion: "Pivote", foto: "img/jugadores/bucaramanga/fabry.png"  },
  { nombre: "L.Florez", edad: 30, media: 64, posicion: "Pivote", foto: "img/jugadores/bucaramanga/leoflo.png"  },
  { nombre: "K.Londoño", edad: 31, media: 66, posicion: "Volante" , foto: "img/jugadores/bucaramanga/klondono.png" },

  { nombre: "L.Pons", edad: 35, media: 71, posicion: "Delantero", foto: "img/jugadores/bucaramanga/pons.png"  },
  { nombre: "Faber Gil", edad: 30, media: 67, posicion: "Delantero", foto: "img/jugadores/bucaramanga/gil.png"  },
  { nombre: "F.Hinestroza", edad: 35, media: 66, posicion: "Delantero" , foto: "img/jugadores/bucaramanga/fredy.png" },
  { nombre: "J.Vasquez", edad: 30, media: 66, posicion: "Delantero" , foto: "img/jugadores/bucaramanga/jhonva.png" }
],

"Alianza": [
  { nombre: "J.Chaverra", edad: 34, media: 66, posicion: "Portero" , foto: "img/jugadores/alianza/jchaverra.png" },
  { nombre: "J.Wallens", edad: 32, media: 64, posicion: "Portero", foto: "img/jugadores/alianza/wallens.png"  },

  { nombre: "P.Franco", edad: 34, media: 66, posicion: "Defensa" , foto: "img/jugadores/alianza/pefranco.png" },
  { nombre: "J.Figueroa", edad: 29, media: 66, posicion: "Defensa" , foto: "img/jugadores/alianza/figueroa.png" },
  { nombre: "J.Garcia", edad: 36, media: 65, posicion: "Defensa" , foto: "img/jugadores/alianza/jhongar.png" },
  { nombre: "K.Suarez", edad: 23, media: 66, posicion: "Defensa" , foto: "img/jugadores/alianza/kalazan.png" },

  { nombre: "R.Manjarrez", edad: 25, media: 67, posicion: "Volante" , foto: "img/jugadores/alianza/manjarrez.png" },
  { nombre: "L.F.Perez", edad: 29, media: 65, posicion: "Pivote", foto: "img/jugadores/alianza/perez.png"  },
  { nombre: "W.Fernandez", edad: 27, media: 66, posicion: "Defensa" , foto: "img/jugadores/alianza/wiston.png" },

  { nombre: "F.Pardo", edad: 35, media: 69, posicion: "Delantero" , foto: "img/jugadores/alianza/pardo.png" },
  { nombre: "C.Lucumi", edad: 25, media: 66, posicion: "Delantero" , foto: "img/jugadores/alianza/lucumi.png" },
  { nombre: "E.Torres", edad: 27, media: 65, posicion: "Delantero", foto: "img/jugadores/alianza/torres.png"  },
  { nombre: "A.del Valle", edad: 36, media: 66, posicion: "Delantero", foto: "img/jugadores/alianza/ayron.png"  }
],

"La Equidad": [
  { nombre: "E.Esteban", edad: 25, media: 68, posicion: "Portero" , foto: "img/jugadores/equidad/eduar.png" },
  { nombre: "Y.Gomez", edad: 25, media: 63, posicion: "Portero" , foto: "img/jugadores/equidad/yimy.png" },

  { nombre: "M.Rodas", edad: 27, media: 66, posicion: "Defensa" , foto: "img/jugadores/equidad/rodas.png" },
  { nombre: "C.Vivas", edad: 23, media: 66, posicion: "Defensa", foto: "img/jugadores/equidad/vivas.png"  },
  { nombre: "Y.Gomez", edad: 28, media: 66, posicion: "Defensa" , foto: "img/jugadores/equidad/yulian.png" },
  { nombre: "Y.Abonia", edad: 25, media: 64, posicion: "Defensa", foto: "img/jugadores/equidad/abonia.png"  },

  { nombre: "J.Castilla", edad: 20, media: 68, posicion: "Pivote" , foto: "img/jugadores/equidad/castilla.png" },
  { nombre: "J.Colorado", edad: 24, media: 66, posicion: "Pivote" , foto: "img/jugadores/equidad/colorado.png" },
  { nombre: "M.Monaco" , edad: 23, media: 67, posicion: "Volante", foto: "img/jugadores/equidad/monaco.png"  },
  { nombre: "J.Masllorens", edad: 24, media: 68, posicion: "Pivote" , foto: "img/jugadores/equidad/masllorens.png" },

  { nombre: "J.Valencia", edad: 21, media: 66, posicion: "Delantero", foto: "img/jugadores/equidad/valencia.png"  },
  { nombre: "J.Bolivar", edad: 23, media: 63, posicion: "Delantero" , foto: "img/jugadores/equidad/bolivar.png" },
  { nombre: "K.Parra", edad: 22, media: 66, posicion: "Delantero" , foto: "img/jugadores/equidad/parra.png" }
],

"Águilas": [
  { nombre: "W.Fariñez", edad: 27, media: 68, posicion: "Portero", foto: "img/jugadores/aguilas/farinez.png"  },
  { nombre: "S.Guerra", edad: 24, media: 64, posicion: "Portero" , foto: "img/jugadores/aguilas/guerra.png" },

  { nombre: "D.Hernandez", edad: 25, media: 65, posicion: "Defensa" , foto: "img/jugadores/aguilas/hernandez.png" },
  { nombre: "S.Rodriguez", edad: 24, media: 65, posicion: "Defensa" , foto: "img/jugadores/aguilas/sebastian.png" },
  { nombre: "D.Alfonzo", edad: 24, media: 67, posicion: "Defensa" , foto: "img/jugadores/aguilas/delvin.png" },
  { nombre: "J.Mena", edad: 20, media: 64, posicion: "Defensa" , foto: "img/jugadores/aguilas/mena.png" },

  { nombre: "J.Pineda", edad: 27, media: 67, posicion: "Volante", foto: "img/jugadores/aguilas/pineda.png"  },
  { nombre: "F.Lozano", edad: 32, media: 67, posicion: "Pivote" , foto: "img/jugadores/aguilas/lozano.png" },
  { nombre: "H.Mansilla", edad: 33, media: 65, posicion: "Pivote" , foto: "img/jugadores/aguilas/mansilla.png" },

  { nombre: "W.Morelo", edad: 38, media: 67, posicion: "Delantero", foto: "img/jugadores/aguilas/morelo.png"  },
  { nombre: "J.Rivaldo", edad: 21, media: 66, posicion: "Delantero" , foto: "img/jugadores/aguilas/rivaldo.png" },
  { nombre: "Y.Gonzalez", edad: 30, media: 69, posicion: "Delantero", foto: "img/jugadores/aguilas/yony.png"  }
],

"Fortaleza": [
  { nombre: "J.Garcia", edad: 20, media: 64, posicion: "Portero", foto: "img/jugadores/fortaleza/jordan.png"  },
  { nombre: "C.Santander", edad: 21, media: 60, posicion: "Portero", foto: "img/jugadores/fortaleza/santander.png"  },

  { nombre: "Y.Diaz", edad: 27, media: 65, posicion: "Defensa" , foto: "img/jugadores/fortaleza/yesid.png" },
  { nombre: "J.Marulanda", edad: 29, media: 66, posicion: "Defensa" , foto: "img/jugadores/fortaleza/marulanda.png" },
  { nombre: "L.Escorcia", edad: 21, media: 66, posicion: "Defensa" , foto: "img/jugadores/fortaleza/escorcia.png" },
  { nombre: "S.Valencia", edad: 29, media: 65, posicion: "Defensa" , foto: "img/jugadores/fortaleza/sval.png" },

  { nombre: "A.Ricaurte", edad: 33, media: 67, posicion: "Pivote" , foto: "img/jugadores/fortaleza/ricaurte.png" },
  { nombre: "L.Pico", edad: 33, media: 67, posicion: "Pivote" , foto: "img/jugadores/fortaleza/pico.png" },
  { nombre: "J.Velasquez", edad: 20, media: 68, posicion: "Volante" , foto: "img/jugadores/fortaleza/velasquez.png" },
  { nombre: "R.Pajaro", edad: 20, media: 68, posicion: "Pivote" , foto: "img/jugadores/fortaleza/pajaro.png" },

  { nombre: "Emilio A.", edad: 19, media: 65, posicion: "Delantero" , foto: "img/jugadores/fortaleza/emilio.png" },
  { nombre: "A.Amaya", edad: 24, media: 65, posicion: "Delantero" , foto: "img/jugadores/fortaleza/amaya.png" }
],

"Llaneros": [
  { nombre: "M.Ortega", edad: 30, media: 65, posicion: "Portero" , foto: "img/jugadores/llaneros/ortega.png" },
  { nombre: "R.Romaña", edad: 28, media: 60, posicion: "Portero" },

  { nombre: "F.Meza", edad: 33, media: 65, posicion: "Defensa", foto: "img/jugadores/llaneros/meza.png"  },
  { nombre: "O.Cabezas", edad: 28, media: 64, posicion: "Defensa" , foto: "img/jugadores/llaneros/cabezas.png" },
  { nombre: "H.Mena", edad: 24, media: 68, posicion: "Defensa" , foto: "img/jugadores/llaneros/mena.png" },

  { nombre: "C.Sierra", edad: 34, media: 68, posicion: "Pivote" , foto: "img/jugadores/llaneros/csierra.png" },
  { nombre: "Y.Goez", edad: 25, media: 66, posicion: "Pivote" , foto: "img/jugadores/llaneros/goez.png" },
  { nombre: "M.Sierra", edad: 30, media: 66, posicion: "Pivote" , foto: "img/jugadores/llaneros/msierra.png" },
  { nombre: "A.Lopez", edad: 22, media: 66, posicion: "Pivote", foto: "img/jugadores/llaneros/lopez.png"  },
   { nombre: "B.Urueña", edad: 31, media: 66, posicion: "Volante" , foto: "img/jugadores/llaneros/uruena.png" },

  { nombre: "M.Rangel", edad: 34, media: 67, posicion: "Delantero" , foto: "img/jugadores/llaneros/rangel.png" },
  { nombre: "D.Mantilla", edad: 28, media: 67, posicion: "Delantero" , foto: "img/jugadores/llaneros/mantilla.png" },
  { nombre: "E.Bodencer", edad: 25, media: 66, posicion: "Delantero" , foto: "img/jugadores/llaneros/bodencer.png" },
  { nombre: "J.Angulo", edad: 23, media: 67, posicion: "Delantero", foto: "img/jugadores/llaneros/jas.png"  }
 
],

"Union M.": [
  { nombre: "J.Mattalia", edad: 33, media: 65, posicion: "Portero"  , foto: "img/jugadores/union/mattalia.png"},
  { nombre: "M.Tasso", edad: 24, media: 64, posicion: "Portero"  , foto: "img/jugadores/union/tasso.png"},

  { nombre: "N.Ramos", edad: 26, media: 65, posicion: "Defensa"  , foto: "img/jugadores/union/ramos.png"},
  { nombre: "H.Urrego", edad: 32, media: 65, posicion: "Defensa"  , foto: "img/jugadores/union/urrego.png"},
  { nombre: "D.Mosquera", edad: 33, media: 64, posicion: "Defensa" , foto: "img/jugadores/union/dairon.png" },
  { nombre: "J.Lerma", edad: 22, media: 66, posicion: "Defensa"  , foto: "img/jugadores/union/lerma.png"},

  { nombre: "J.Sarmiento", edad: 25, media: 67, posicion: "Volante"  , foto: "img/jugadores/union/sarmiento.png"},
  { nombre: "F.Cantillo", edad: 27, media: 66, posicion: "Pivote" , foto: "img/jugadores/union/cantillo.png" },
   { nombre: "J.Congo", edad: 27, media: 65, posicion: "Pivote" , foto: "img/jugadores/union/congo.png" },

  { nombre: "R.Marquez", edad: 27, media: 66, posicion: "Delantero" , foto: "img/jugadores/union/marquez.png" },
  { nombre: "R.Hinojosa", edad: 26, media: 65, posicion: "Delantero" , foto: "img/jugadores/union/hinojosa.png" },
  { nombre: "M.Martinez", edad: 27, media: 65, posicion: "Delantero"  , foto: "img/jugadores/union/misael.png"}
],

"Chico": [
  { nombre: "D.Denis", edad: 33, media: 62, posicion: "Portero", foto: "img/jugadores/chico/denis.png" },
  { nombre: "R.Caicedo", edad: 31, media: 61, posicion: "Portero" , foto: "img/jugadores/chico/rogerio.png"},

  { nombre: "F.Salas", edad: 27, media: 64, posicion: "Defensa", foto: "img/jugadores/chico/salas.png" },
  { nombre: "E.Peralta", edad: 24, media: 64, posicion: "Defensa", foto: "img/jugadores/chico/peralta.png" },
  { nombre: "J.Ampudia", edad: 25, media: 65, posicion: "Defensa" , foto: "img/jugadores/chico/ampudia.png"},
  { nombre: "Y.Lopez", edad: 26, media: 63, posicion: "Defensa", foto: "img/jugadores/chico/yael.png" },

  { nombre: "D.Ramirez", edad: 24, media: 65, posicion: "Volante", foto: "img/jugadores/chico/delio.png" },
  { nombre: "E.Camargo", edad: 23, media: 65, posicion: "Pivote", foto: "img/jugadores/chico/camargo.png" },
  { nombre: "F.Cortes", edad: 22, media: 65, posicion: "Volante", foto: "img/jugadores/chico/cortes.png" },

  { nombre: "M.Gomez", edad: 28, media: 64, posicion: "Delantero", foto: "img/jugadores/chico/nike.png" },
  { nombre: "V.Hernandez", edad: 36, media: 69, posicion: "Delantero" , foto: "img/jugadores/chico/vladimir.png"},
  { nombre: "J.Molina", edad: 32, media: 67, posicion: "Delantero" , foto: "img/jugadores/chico/molina.png"}
],

"Envigado": [
  { nombre: "A.Tovar", edad: 19, media: 63, posicion: "Portero", foto: "img/jugadores/envigado/tovar.png" },
  { nombre: "J.P.Montoya", edad: 26, media: 65, posicion: "Portero" , foto: "img/jugadores/envigado/juanpa.png"},

  { nombre: "J.Gamboa", edad: 24, media: 63, posicion: "Defensa" , foto: "img/jugadores/envigado/gamboa.png"},
  { nombre: "D.Palacios", edad: 21, media: 62, posicion: "Defensa", foto: "img/jugadores/envigado/dipal.png" },
  { nombre: "Neymar U.", edad: 21, media: 63, posicion: "Defensa" , foto: "img/jugadores/envigado/neymar.png"},
  { nombre: "B.Agron", edad: 24, media: 62, posicion: "Defensa", foto: "img/jugadores/envigado/agron.png" },

  { nombre: "W.Hurtado", edad: 21, media: 62, posicion: "Volante" , foto: "img/jugadores/envigado/hurtado.png"},
  { nombre: "E.Lopez", edad: 25, media: 64, posicion: "Volante", foto: "img/jugadores/envigado/elopez.png" },
  { nombre: "L.Angulo", edad: 23, media: 64, posicion: "Pivote", foto: "img/jugadores/envigado/angulo.png" },

  { nombre: "S.Londoño", edad: 17, media: 64, posicion: "Delantero" , foto: "img/jugadores/envigado/londono.png"},
  { nombre: "B.Garces", edad: 32, media: 66, posicion: "Delantero" , foto: "img/jugadores/envigado/garces.png"},
  { nombre: "L.Diaz", edad: 21, media: 64, posicion: "Delantero", foto: "img/jugadores/envigado/diaz.png" }
],
  
  // Segunda División 
   "Jaguares": [
  { nombre: "J.Figueroa", edad: 32, media: 66, posicion: "Portero" , foto: "img/jugadores/jaguares/figue.png"},
  { nombre: "V.Brid", edad: 24, media: 63, posicion: "Portero", foto: "img/jugadores/jaguares/brid.png" },

  { nombre: "K.Saucedo", edad: 25, media: 64, posicion: "Defensa" , foto: "img/jugadores/jaguares/saucedo.png"},
  { nombre: "J.Altamiranda", edad: 25, media: 65, posicion: "Defensa", foto: "img/jugadores/jaguares/alta.png" },
  { nombre: "J.Herrera", edad: 24, media: 64, posicion: "Defensa", foto: "img/jugadores/jaguares/herrera.png" },

  { nombre: "J.Andrade", edad: 29, media: 64, posicion: "Volante", foto: "img/jugadores/jaguares/andrade.png" },
  { nombre: "J.Maza", edad: 30, media: 64, posicion: "Volante" , foto: "img/jugadores/jaguares/maza.png"},
  { nombre: "J.Roa", edad: 30, media: 65, posicion: "Pivote", foto: "img/jugadores/jaguares/roa.png" },
  { nombre: "D.Padilla", edad: 31, media: 63, posicion: "Pivote" , foto: "img/jugadores/jaguares/padilla.png"},

  { nombre: "D.Ceter", edad: 27, media: 66, posicion: "Delantero" , foto: "img/jugadores/jaguares/ceter.png"},
  { nombre: "K.Lenis", edad: 23, media: 65, posicion: "Delantero" , foto: "img/jugadores/jaguares/lenis.png"},
  { nombre: "A.Renteria", edad: 32, media: 68, posicion: "Delantero" , foto: "img/jugadores/jaguares/topo.png"}
],

"Real Cartagena": [
  { nombre: "K.Armesto", edad: 28, media: 64, posicion: "Portero", foto: "img/jugadores/cartagena/armesto.png" },
  { nombre: "A.Montes", edad: 25, media: 63, posicion: "Portero", foto: "img/jugadores/cartagena/montes.png" },

  { nombre: "C.Ramirez", edad: 37, media: 64, posicion: "Defensa", foto: "img/jugadores/cartagena/caliche.png" },
  { nombre: "A.Moralez", edad: 24, media: 65, posicion: "Defensa" , foto: "img/jugadores/cartagena/moralez.png"},
  { nombre: "G.Pedroza", edad: 31, media: 63, posicion: "Defensa" },
  { nombre: "J.Solarte", edad: 24, media: 64, posicion: "Defensa" },
  { nombre: "O.Acosta", edad: 25, media: 63, posicion: "Defensa" , foto: "img/jugadores/cartagena/onel.png"},

  { nombre: "J.Rodriguez", edad: 32, media: 66, posicion: "Pivote", foto: "img/jugadores/cartagena/jrod.png" },
  { nombre: "F.Acosta", edad: 31, media: 65, posicion: "Pivote" , foto: "img/jugadores/cartagena/acosta.png"},
  { nombre: "C.Marrugo", edad: 40, media: 68, posicion: "Volante", foto: "img/jugadores/cartagena/marrugo.png" },

  { nombre: "F.Montero", edad: 38, media: 69, posicion: "Delantero" , foto: "img/jugadores/cartagena/montero.png"},
  { nombre: "A.Melendez", edad: 28, media: 65, posicion: "Delantero" , foto: "img/jugadores/cartagena/melendez.png"},
  { nombre: "W.de la Rosa", edad: 32, media: 66, posicion: "Delantero", foto: "img/jugadores/cartagena/dlarosa.png" },
  { nombre: "M.Murillo", edad: 31, media: 64, posicion: "Delantero", foto: "img/jugadores/cartagena/murillo.png" }
],

"Cucuta": [
  { nombre: "J.Ramirez", edad: 28, media: 66, posicion: "Portero", foto: "img/jugadores/cucuta/ramirez.png" },
  { nombre: "R.Sanchez", edad: 41, media: 63, posicion: "Portero" , foto: "img/jugadores/cucuta/ramiro.png"},

  { nombre: "H.Plazas", edad: 32, media: 64, posicion: "Defensa", foto: "img/jugadores/cucuta/plazas.png" },
  { nombre: "L.Payares", edad: 35, media: 63, posicion: "Defensa" , foto: "img/jugadores/cucuta/payares.png"},
  { nombre: "D.Calcaterra", edad: 24, media: 64, posicion: "Defensa", foto: "img/jugadores/cucuta/calcaterra.png" },
  { nombre: "A.Torralvo", edad: 31, media: 65, posicion: "Defensa", foto: "img/jugadores/cucuta/amaury.png" },

  { nombre: "S.Tamara", edad: 29, media: 66, posicion: "Volante", foto: "img/jugadores/cucuta/tamara.png" },
  { nombre: "C.Alvarez", edad: 32, media: 68, posicion: "Volante", foto: "img/jugadores/cucuta/jopito.png" },
  { nombre: "L.Rios", edad: 27, media: 66, posicion: "Volante" , foto: "img/jugadores/cucuta/lucas.png"},

  { nombre: "M.Pisano", edad: 33, media: 68, posicion: "Delantero" , foto: "img/jugadores/cucuta/pisano.png"},
  { nombre: "J.Peralta", edad: 20, media: 65, posicion: "Delantero", foto: "img/jugadores/cucuta/peralta.png" },
  { nombre: "J.Agudelo", edad: 32, media: 65, posicion: "Delantero" , foto: "img/jugadores/cucuta/agudelo.png"}
],

"Huila": [
  { nombre: "J.Mendez", edad: 24, media: 65, posicion: "Portero" , foto: "img/jugadores/huila/mendez.png"},
  { nombre: "L.Mena", edad: 20, media: 59, posicion: "Portero" },

  { nombre: "L.Ospina", edad: 34, media: 65, posicion: "Defensa", foto: "img/jugadores/huila/lospina.png" },
  { nombre: "F.Arbelaez", edad: 28, media: 66, posicion: "Defensa" , foto: "img/jugadores/huila/arbelaez.png"},
  { nombre: "J.Rodriguez", edad: 22, media: 64, posicion: "Defensa" },
  { nombre: "K.Navas", edad: 22, media: 64, posicion: "Defensa" , foto: "img/jugadores/huila/killiam.png"},

  { nombre: "S.Hernandez", edad: 38, media: 66, posicion: "Volante" , foto: "img/jugadores/huila/shern.png"},
  { nombre: "F.Rodriguez", edad: 38, media: 63, posicion: "Pivote" , foto: "img/jugadores/huila/frod.png"},
  { nombre: "A.Ararat", edad: 19, media: 64, posicion: "Pivote" , foto: "img/jugadores/huila/ararat.png"},
   
  { nombre: "S.Lora", edad: 29, media: 65, posicion: "Delantero" , foto: "img/jugadores/huila/lora.png"},
  { nombre: "B.Castro", edad: 23, media: 63, posicion: "Delantero" , foto: "img/jugadores/huila/castro.png"},
  { nombre: "O.Duarte", edad: 30, media: 67, posicion: "Delantero", foto: "img/jugadores/huila/omar.png" }
],

"Patriotas": [
  { nombre: "J.Espitia", edad: 25, media: 63, posicion: "Portero", foto: "img/jugadores/patriotas/espitia.png" },
  { nombre: "J.Amaya", edad: 22, media: 60, posicion: "Portero" },

  { nombre: "M.Garavito", edad: 24, media: 65, posicion: "Defensa", foto: "img/jugadores/patriotas/garavito.png" },
  { nombre: "L.Renteria", edad: 19, media: 61, posicion: "Defensa" , foto: "img/jugadores/patriotas/renteria.png"},
  { nombre: "V.Perea", edad: 28, media: 64, posicion: "Defensa", foto: "img/jugadores/patriotas/perea.png" },

  { nombre: "M.Figueroa", edad: 27, media: 63, posicion: "Volante" , foto: "img/jugadores/patriotas/maclein.png"}, 
  { nombre: "K.Alvarez", edad: 20, media: 65, posicion: "Volante" , foto: "img/jugadores/patriotas/kevin.png"},
  
  { nombre: "B.Fernandez", edad: 33, media: 64, posicion: "Delantero" , foto: "img/jugadores/patriotas/brayan.png"},
  { nombre: "E.Sarria", edad: 24, media: 65, posicion: "Delantero" , foto: "img/jugadores/patriotas/sarria.png"}
],

"Real Cundi": [
  { nombre: "K.Cataño", edad: 22, media: 64, posicion: "Portero", foto: "img/jugadores/cundi/catano.png" },
  { nombre: "K.Hinestroza", edad: 20, media: 58, posicion: "Portero" },

  { nombre: "J.Viveros", edad: 21, media: 61, posicion: "Defensa" , foto: "img/jugadores/cundi/viveros.png" },
  { nombre: "J.Cajares", edad: 22, media: 62, posicion: "Defensa" , foto: "img/jugadores/cundi/cajares.png" },
  { nombre: "S.Barbosa", edad: 21, media: 61, posicion: "Defensa" , foto: "img/jugadores/cundi/barbosa.png" },

  { nombre: "M.Castaño", edad: 26, media: 64, posicion: "Volante" , foto: "img/jugadores/cundi/castano.png" },
  { nombre: "W.Davila", edad: 24, media: 62, posicion: "Volante" , foto: "img/jugadores/cundi/davila.png" },

  { nombre: "J.Asprilla", edad: 22, media: 66, posicion: "Delantero", foto: "img/jugadores/cundi/asprilla.png"  },
  { nombre: "A.Rocha", edad: 21, media: 66, posicion: "Delantero", foto: "img/jugadores/cundi/rocha.png"  }
],

"Inter Palmira": [
  { nombre: "J.Escobar", edad: 37, media: 59, posicion: "Portero" , foto: "img/jugadores/palmira/huber.png" },
  { nombre: "A.Cadavid", edad: 34, media: 62, posicion: "Portero", foto: "img/jugadores/palmira/arled.png"  },

  { nombre: "G.Perea", edad: 33, media: 64, posicion: "Defensa", foto: "img/jugadores/palmira/geisson.png"  },
  { nombre: "D.Quiñones", edad: 29, media: 65, posicion: "Defensa" , foto: "img/jugadores/palmira/raton.png" },
  { nombre: "Y.Gonzalez", edad: 35, media: 65, posicion: "Defensa", foto: "img/jugadores/palmira/yoiver.png"  },

  { nombre: "H.Angulo", edad: 25, media: 64, posicion: "Pivote", foto: "img/jugadores/palmira/hermes.png"  },
  { nombre: "C.Franco", edad: 21, media: 63, posicion: "Pivote" , foto: "img/jugadores/palmira/franco.png" },
  { nombre: "H.Suarez", edad: 31, media: 64, posicion: "Pivote" , foto: "img/jugadores/palmira/harlin.png" },
  { nombre: "J.Guzman", edad: 20, media: 64, posicion: "Volante" , foto: "img/jugadores/palmira/guzman.png" },

  { nombre: "J.Arango", edad: 34, media: 67, posicion: "Delantero" , foto: "img/jugadores/palmira/arango.png" },
  { nombre: "V.Ibarbo", edad: 35, media: 67, posicion: "Delantero", foto: "img/jugadores/palmira/ibarbo.png"  },
  { nombre: "D.Rodriguez", edad: 30, media: 65, posicion: "Delantero", foto: "img/jugadores/palmira/dario.png"  },
  { nombre: "D.Riascos", edad: 39, media: 64, posicion: "Delantero" , foto: "img/jugadores/palmira/duvier.png" }
],
  "Leones": [
    { nombre: "C.Holguin", edad: 21, media: 58, posicion: "Portero" , foto: "img/jugadores/leones/holguin.png" },
    { nombre: "J.Arboleda", edad: 20, media: 60, posicion: "Portero" , foto: "img/jugadores/leones/arboleda.png" },
    { nombre: "D.Marmolejo", edad: 21, media: 60, posicion: "Defensa", foto: "img/jugadores/leones/dmarmo.png"  },
    { nombre: "A.Ceballos", edad: 21, media: 59, posicion: "Volante", foto: "img/jugadores/leones/ceballos.png"  },
    { nombre: "J.P.Arteaga", edad: 21, media: 62, posicion: "Volante", foto: "img/jugadores/leones/jparte.png"  },
    { nombre: "J.Ibargüen", edad: 19, media: 58, posicion: "Delantero" , foto: "img/jugadores/leones/ibarguen.png" },
    { nombre: "C.Rodriguez", edad: 23, media: 61, posicion: "Delantero" , foto: "img/jugadores/leones/cristian.png" },
    
  ],
  "Tigres": [
    { nombre: "J.Huertas", edad: 24, media: 62, posicion: "Portero" },
    { nombre: "E.Arrechea", edad: 20, media: 60, posicion: "Defensa", foto: "img/jugadores/tigota/arrechea.png"  },
    { nombre: "C.Ibarra", edad: 22, media: 63, posicion: "Delantero" , foto: "img/jugadores/tigota/ibarra.png" },
    { nombre: "L.Palacios", edad: 20, media: 64, posicion: "Delantero", foto: "img/jugadores/tigota/palacios.png"  },
    { nombre: "M.Frigerio", edad: 28, media: 62, posicion: "Delantero" , foto: "img/jugadores/tigota/frigerio.png" }
  ],
  "Quindio": [
    { nombre: "M.Jimenez", edad: 29, media: 63, posicion: "Portero" , foto: "img/jugadores/quinboca/jimenez.png" },

    { nombre: "K.Hurtado", edad: 20, media: 58, posicion: "Defensa", foto: "img/jugadores/quinboca/hurtado.png"  },
    { nombre: "U.Rovira", edad: 19, media: 61, posicion: "Defensa", foto: "img/jugadores/quinboca/uberney.png"  },
    { nombre: "D.Palomeque", edad: 32, media: 63, posicion: "Defensa", foto: "img/jugadores/quinboca/palomeque.png"  },

    { nombre: "W.Arango", edad: 27, media: 64, posicion: "Volante", foto: "img/jugadores/quinboca/arango.png"  },
    { nombre: "Y.Torres", edad: 26, media: 63, posicion: "Pivote", foto: "img/jugadores/quinboca/yosimarc.png" },

    { nombre: "J.Lloreda", edad: 31, media: 64, posicion: "Delantero" , foto: "img/jugadores/quinboca/lloreda.png" },
    { nombre: "J.Rodriguez", edad: 29, media: 64, posicion: "Delantero" , foto: "img/jugadores/quinboca/joao.png" }
  ],
  "Bogotá": [
    { nombre: "W.Agamez", edad: 22, media: 57, posicion: "Portero" },
    { nombre: "D.Aguilar", edad: 21, media: 59, posicion: "Portero", foto: "img/jugadores/tigota/aguilar.png"  },
    { nombre: "S.Ruiz R.", edad: 28, media: 61, posicion: "Defensa", foto: "img/jugadores/tigota/srr.png"  },
    { nombre: "D.Montien", edad: 24, media: 60, posicion: "Defensa" },
    { nombre: "F.Moreno", edad: 20, media: 62, posicion: "Volante", foto: "img/jugadores/tigota/freilin.png"  },
    { nombre: "C.Huerfano", edad: 29, media: 63, posicion: "Delantero", foto: "img/jugadores/tigota/huerfano.png"  }
  ],
  "Boca Jrs. Cali": [
    { nombre: "E.Obando", edad: 23, media: 61, posicion: "Portero" , foto: "img/jugadores/quinboca/obando.png" },
    { nombre: "J.Monsalve", edad: 26, media: 63, posicion: "Delantero" , foto: "img/jugadores/quinboca/monsalve.png" },
    { nombre: "C.Paternina", edad: 21, media: 62, posicion: "Volante" },
    { nombre: "J.Jaramillo", edad: 20, media: 60, posicion: "Delantero", foto: "img/jugadores/quinboca/jaramillo.png"  },
    { nombre: "A.Andrade", edad: 36, media: 67, posicion: "Volante", foto: "img/jugadores/quinboca/rifle.png"  },
    { nombre: "H.Ortiz", edad: 21, media: 61, posicion: "Defensa", foto: "img/jugadores/quinboca/ortiz.png"  },
    { nombre: "J.Mendoza", edad: 22, media: 60, posicion: "Volante" , foto: "img/jugadores/quinboca/mendoza.png" }
  ],
  "Orsomarso": [
    { nombre: "B.Benitez", edad: 22, media: 59, posicion: "Portero", foto: "img/jugadores/orsonder/benitez.png" },
    { nombre: "D.Barrios", edad: 21, media: 62, posicion: "Defensa", foto: "img/jugadores/orsonder/deivi.png" },
    { nombre: "J.J.Salcedo", edad: 32, media: 66, posicion: "Delantero" , foto: "img/jugadores/orsonder/salcedo.png"},
    { nombre: "S.Girado", edad: 20, media: 65, posicion: "Delantero", foto: "img/jugadores/orsonder/girado.png" },
    { nombre: "A.Montaño", edad: 24, media: 60, posicion: "Volante", foto: "img/jugadores/orsonder/montano.png" }
  ],
  "Barranquilla": [
    { nombre: "J.Lemus", edad: 26, media: 58, posicion: "Portero" , foto: "img/jugadores/atlilla/lemus.png" },
    { nombre: "J.Caicedo", edad: 24, media: 62, posicion: "Defensa", foto: "img/jugadores/atlilla/josec.png"  },
    { nombre: "E.Herazo", edad: 16, media: 54, posicion: "Defensa" , foto: "img/jugadores/atlilla/herazo.png" },
    { nombre: "C.Peñate", edad: 20, media: 60, posicion: "Delantero" , foto: "img/jugadores/atlilla/penate.png" },
    { nombre: "L.Berdugo", edad: 23, media: 63, posicion: "Volante" , foto: "img/jugadores/atlilla/berdugo.png" },
    { nombre: "J.Velez", edad: 22, media: 65, posicion: "Pivote" , foto: "img/jugadores/atlilla/velez.png" },
    { nombre: "C.Cantillo", edad: 22, media: 62, posicion: "Pivote", foto: "img/jugadores/atlilla/cantillo.png"  },
    { nombre: "M.Bacca", edad: 21, media: 62, posicion: "Delantero" , foto: "img/jugadores/atlilla/bacca.png" }
  ],
  "Atlético FC": [
    { nombre: "J.Jaramillo", edad: 25, media: 60, posicion: "Portero", foto: "img/jugadores/atlilla/jaramillo.png"  },
    { nombre: "M.Suarez", edad: 26, media: 60, posicion: "Portero", foto: "img/jugadores/atlilla/suarez.png"  },
    { nombre: "J.Alomia", edad: 26, media: 61, posicion: "Defensa", foto: "img/jugadores/atlilla/alomia.png"  },
    { nombre: "N.Mosorongo", edad: 23, media: 60, posicion: "Volante" , foto: "img/jugadores/atlilla/mosorongo.png" },
    { nombre: "J.Farias", edad: 21, media: 59, posicion: "Delantero" , foto: "img/jugadores/atlilla/farias.png" },
    { nombre: "J.Escobar", edad: 27, media: 60, posicion: "Delantero", foto: "img/jugadores/atlilla/escobar.png"  },
    { nombre: "J.Aguas", edad: 24, media: 58, posicion: "Volante"},
    { nombre: "D.Reales", edad: 24, media: 60, posicion: "Defensa", foto: "img/jugadores/atlilla/reales.png" }   
  ],
  "Real Santander": [
    { nombre: "J.Mora", edad: 28, media: 60, posicion: "Portero", foto: "img/jugadores/orsonder/mora.png" },
    { nombre: "J.Pertuz", edad: 20, media: 60, posicion: "Defensa", foto: "img/jugadores/orsonder/pertuz.png" },
    { nombre: "S.Orejuela", edad: 24, media: 60, posicion: "Defensa", foto: "img/jugadores/orsonder/orejuela.png" },
    { nombre: "F.Mendoza", edad: 24, media: 60, posicion: "Volante", foto: "img/jugadores/orsonder/faiber.png" },
    { nombre: "S.Rey", edad: 20, media: 57, posicion: "Delantero" , foto: "img/jugadores/orsonder/rey.png"},
    { nombre: "L.Yanes", edad: 18, media: 59, posicion: "Delantero" , foto: "img/jugadores/orsonder/yanes.png"}
  ]
};

//PALMARES
let palmaresEquipos = {
  "Nacional": { ligas: 18, copas: 7, superligas:4 },
  "Millonarios": { ligas: 16, copas: 3, superligas:2 },
  "América": { ligas: 15, copas: 0, superligas:0},
  "Cali": { ligas: 10, copas: 1, superligas:1 },
  "Junior": { ligas: 10, copas: 2, superligas:2 },
  "Santa Fe": { ligas: 10, copas: 2, superligas:4 },
  "Tolima": { ligas: 3, copas: 1, superligas:1 },
  "Medellín": { ligas: 6, copas: 3, superligas:0},
  "Once Caldas": { ligas: 4, copas: 1 , superligas:0},
  "Pereira": { ligas: 1, copas: 0 , superligas:0},
  "Bucaramanga": { ligas: 1, copas: 0 , superligas:0},
  "Alianza": { ligas: 0, copas: 0 , superligas:0},
  "La Equidad": { ligas: 0, copas: 1, superligas:0 },
  "Pasto": { ligas: 1, copas: 0 , superligas:0},
  "Envigado": { ligas: 0, copas: 0 , superligas:0},
  "Chico": { ligas: 1, copas: 0 , superligas:0},
  "Águilas": { ligas: 0, copas: 0 , superligas:0},
  "Fortaleza": { ligas: 0, copas: 0 , superligas:0},
  "Llaneros": { ligas: 0, copas: 0 , superligas:0},
  "Union M.": { ligas: 1, copas: 0 , superligas:0},
  "Cucuta": { ligas: 1, copas: 0 , superligas:0},
  "Quindio": { ligas: 1, copas: 0 , superligas:0},
  "Boca Jrs. cali": { ligas: 0, copas: 1, superligas:0 }
};

//ACTUALIZAR PALMARES 
function agregarTituloLiga(equipo) {
  if (!palmaresEquipos[equipo]) {
    palmaresEquipos[equipo] = { ligas: 0, copas: 0 , superligas: 0 };
  }
  palmaresEquipos[equipo].ligas++;
}

function agregarTituloCopa(equipo) {
  if (!palmaresEquipos[equipo]) {
    palmaresEquipos[equipo] = { ligas: 0, copas: 0 , superligas: 0 };
  }
  palmaresEquipos[equipo].copas++;
}

function agregarTituloSuperliga(equipo) {
  if (!palmaresEquipos[equipo]) {
    palmaresEquipos[equipo] = { ligas: 0, copas: 0, superligas: 0 };
  }
  if (palmaresEquipos[equipo].superligas == null) palmaresEquipos[equipo].superligas = 0;
  palmaresEquipos[equipo].superligas++;
}

// Asegurar compatibilidad hacia atrás en todo el palmarés
Object.keys(palmaresEquipos).forEach(k => {
  if (palmaresEquipos[k].superligas == null) palmaresEquipos[k].superligas = 0;
});


//PRESUPUESTO
let presupuestosEquipos = {};

let presupuestoVisible = 0;

function sumarPresupuesto(monto) {
  presupuestoVisible += monto;
  document.getElementById("Presupuesto").textContent = `Presupuesto: $${presupuestoVisible.toLocaleString()}`;
actualizarPresupuestoHTML() ;
}

function restarPresupuesto(monto) {
  presupuestoVisible -= monto; // ✅ Puede quedar en negativo
  document.getElementById("Presupuesto").textContent = `Presupuesto: $${presupuestoVisible.toLocaleString()}`;

  verificarPresupuestoNegativo(); // ✅ Llamada automática
  actualizarPresupuestoHTML() 
}


let presupuestoNegativoDetectado = false;
let alertaPresupuestoSinResolver = false;

function verificarPresupuestoNegativo() {
  if (presupuestoVisible < 0 && !presupuestoNegativoDetectado && !palancaUsadaEstaCrisis) {
    presupuestoNegativoDetectado = true;

    const botonPalanca = document.getElementById("botonPalanca");
    if (botonPalanca) {
      botonPalanca.disabled = false;
      botonPalanca.classList.add("activo");
    }
  }
}

let palancaUsadaEstaCrisis = false;

function desactivarPalanca() {
  const boton = document.getElementById("botonPalanca");
  if (boton) {
    boton.disabled = true;
    boton.classList.remove("activo");
  }

  palancaUsadaEstaCrisis = true; // ⛔ evita que se active otra vez en la misma crisis
}



function actualizarPresupuestoHTML() {
  const elemento = document.getElementById("Presupuesto");

  if (elemento) {
    const valor = presupuestoVisible.toLocaleString();
    elemento.textContent = `Presupuesto: $${valor}`;

    // 🧼 Primero eliminamos todas las clases posibles
    elemento.classList.remove("presupuesto-rojo", "presupuesto-naranja", "presupuesto-verde");

    // 🎨 Luego agregamos solo la clase que corresponde
    if (presupuestoVisible < 0) {
      elemento.classList.add("presupuesto-rojo");
    } else if (presupuestoVisible === 0) {
      elemento.classList.add("presupuesto-naranja");
    } else {
      elemento.classList.add("presupuesto-verde");

      // 🔁 Resetear flags si saliste de la crisis
      desactivarPalanca();
      presupuestoNegativoDetectado = false;
      palancaUsadaEstaCrisis = false;
    }
  }
}

//MORAL EQUIPO
function ajustarMoralHinchada(resultado) {
  if (resultado === "ganado") moralHinchada = Math.min(200, moralHinchada + 20);
  else if (resultado === "empatado") moralHinchada = Math.min(200, moralHinchada + 2);
  else if (resultado === "perdido") moralHinchada = Math.max(0, moralHinchada - 20);

  //evaluarMoralHinchada(); // 👈 llamada aquí
}


function actualizarMoralHinchadaUI() {
  const moralUI = document.getElementById("moralHinchada");
  const barra = document.getElementById("barraMoral");

  let emoji = "😬";
  let color = "#f1c40f"; // amarillo

  if (moralHinchada >= 120) {
    emoji = "🤩";
    color = "#27ae60"; // verde
  } else if (moralHinchada <= 40) {
    emoji = "🤬";
    color = "#c0392b"; // rojo
  }

  moralUI.textContent = `Moral Hinchada: ${emoji} ${moralHinchada}`;

  // Actualizar ancho y color de la barra
  barra.style.width = `${(moralHinchada / 200) * 100}%`; // normalizado a 100%
  barra.style.backgroundColor = color;
}


// =======================
// 📩 Sistema de buzón
// =======================

let notificacionPendiente = null; // almacena el mensaje
let mensajesPendientes = 0;
let esDespido = false; // 🔒 flag para saber si el mensaje es de despido

function evaluarMoralHinchada() {
  if (moralEvaluadaEsteSemestre) return;

  if (moralHinchada <= 10) {
    notificacionPendiente = "🟥 La Junta Directiva te ha destituido como Presidente. La crisis es insostenible.";
    esDespido = true;
  } else if (moralHinchada <= 20) {
    notificacionPendiente = "🟧 La presión de la hinchada es insoportable. Has sido removido de la presidencia.";
    esDespido = true;
  } else if (moralHinchada <= 30) {
    notificacionPendiente = "😡 La hinchada exige la salida del Dt inmediata. Su gestión está en ruinas.";
    esDespido = false;
  } else if (moralHinchada <= 40) {
    notificacionPendiente = "😠 El enojo de la hinchada es total. La paciencia se ha agotado.";
    esDespido = false;
  } else if (moralHinchada <= 50) {
    notificacionPendiente = "😟 La hinchada está muy decepcionada y desconfía de cada decisión.";
    esDespido = false;
  } else if (moralHinchada <= 60) {
    notificacionPendiente = "☹️ El ambiente es hostil. Cada error aumenta las críticas.";
    esDespido = false;
  } else if (moralHinchada <= 70) {
    notificacionPendiente = "😕 La paciencia de la hinchada es muy limitada. Necesitas resultados urgentes.";
    esDespido = false;
  } else if (moralHinchada <= 80) {
    notificacionPendiente = "😐 La hinchada está dividida, sin plena confianza en tu gestión.";
    esDespido = false;
  } else if (moralHinchada <= 90) {
    notificacionPendiente = "😶 El club se mantiene estable, pero el respaldo es débil.";
    esDespido = false;
  } else if (moralHinchada <= 100) {
    notificacionPendiente = "🙂 La situación es neutral. Cumples, pero no convences.";
    esDespido = false;
  } else if (moralHinchada <= 110) {
    notificacionPendiente = "😌 Poco a poco mejoras la relación con la hinchada. El ambiente se calma.";
    esDespido = false;
  } else if (moralHinchada <= 120) {
    notificacionPendiente = "😊 La hinchada reconoce avances, aunque esperan continuidad.";
    esDespido = false;
  } else if (moralHinchada <= 130) {
    notificacionPendiente = "😀 El proyecto comienza a dar frutos. La confianza crece.";
    esDespido = false;
  } else if (moralHinchada <= 140) {
    notificacionPendiente = "📈 La hinchada empieza a ilusionarse con el futuro del club.";
    esDespido = false;
  } else if (moralHinchada <= 150) {
    notificacionPendiente = "💪 El respaldo es sólido. Creen en tu liderazgo.";
    esDespido = false;
  } else if (moralHinchada <= 160) {
    notificacionPendiente = "🔥 La hinchada se muestra entusiasmada. El proyecto motiva a todos.";
    esDespido = false;
  } else if (moralHinchada <= 170) {
    notificacionPendiente = "🎉 La afición celebra tu gestión. Tienes un gran respaldo social.";
    esDespido = false;
  } else if (moralHinchada <= 180) {
    notificacionPendiente = "🏆 La hinchada ve en ti al presidente que está llevando al club a la gloria.";
    esDespido = false;
  } else if (moralHinchada <= 190) {
    notificacionPendiente = "🌟 Tu gestión es un referente. Eres considerado un gran presidente.";
    esDespido = false;
  } else if (moralHinchada <= 200) {
    notificacionPendiente = "🏟️ Eres recordado como un presidente histórico y símbolo del club.";
    esDespido = false;
  }

  if (notificacionPendiente) {
    mensajesPendientes++;
    actualizarBuzon();
  }

  moralEvaluadaEsteSemestre = true; // 🔒 se bloquea hasta el próximo semestre
}


function MostrarModal() {
  if (!notificacionPendiente) return;

  document.getElementById("notificacionTexto").innerText = notificacionPendiente;
  document.getElementById("buzonModal").style.display = "flex";

  // al abrir modal, se consume un mensaje
  mensajesPendientes--;
  notificacionPendiente = null;
  actualizarBuzon();
}

document.getElementById("cerrarModal").onclick = function () {
  document.getElementById("buzonModal").style.display = "none";

  // ✅ ahora depende del flag, no del texto
  if (esDespido) {
    location.reload();
  }
// Si fue despedido, reinicia
  if (document.getElementById("notificacionTexto").innerText.includes("despedido")) {
    location.reload();
}
};

document.getElementById("buzonNotificaciones").onclick = MostrarModal;




function actualizarBuzon() {
  const buzon = document.getElementById("buzonNotificaciones");
  const contador = document.getElementById("contadorBuzon");

  if (mensajesPendientes > 0) {
    buzon.style.display = "block";
    contador.style.display = "inline-block";
    contador.innerText = mensajesPendientes;
  } else {
    buzon.style.display = "none";
    contador.style.display = "none";
  }
}


function obtenerFuerzaEquipo(nombre) {
  if (fuerzaEquipos[nombre] !== undefined) return fuerzaEquipos[nombre];

  const equipo2da = equiposSegunda.find(e => e.nombre === nombre);
  return equipo2da ? equipo2da.fuerza : 63; // valor por defecto si no existe
}


function calcularPresupuestoPorFuerza(fuerza) {
  if (fuerza >= 69) return 15000000;
  if (fuerza >= 67) return 13000000;
  if (fuerza >= 65) return 10000000;
  if (fuerza >= 63) return 7000000;
  if (fuerza >= 60) return 5000000;
  if (fuerza >= 58) return 3500000;
  return 2500000;
}

function seleccionarEquipo(nombreEquipo) {
  equipoUsuario = nombreEquipo;

  // 🔄 Resetear moral al cambiar de equipo
  moralHinchada = 50;
  actualizarMoralHinchadaUI();

  const fuerza = obtenerFuerzaTotal(nombreEquipo);
  presupuestoVisible = calcularPresupuestoPorFuerza(fuerza);
  actualizarPresupuestoHTML();

  // 👇 Mostrar fuerza en pantalla
  document.getElementById("fuerzaEquipo").innerText = `Fuerza: ${fuerza}`;
  actualizarMediaUI();
}


// Probabilidad de gol seg煤n posici贸n
const probabilidadGolPorPosicion = {
  "portero": 0,
  "defensa": 2,
  "volante": 4,
  "pivote": 3,
  "delantero": 6
};

// Elegir goleador con peso seg煤n posici贸n
function elegirGoleadorPorPeso(plantilla) {
  if (!plantilla || plantilla.length === 0) return "Jugador an贸nimo";

  const pool = [];

  for (let jugador of plantilla) {
    const posicion = jugador.posicion?.toLowerCase() || "volante";
    const peso = probabilidadGolPorPosicion[posicion] || 1;

    for (let i = 0; i < peso; i++) {
      pool.push(jugador.nombre);
    }
  }

  if (pool.length === 0) return "Jugador an贸nimo";
  const idx = Math.floor(Math.random() * pool.length);
  return pool[idx];
}

//Patrocinadores
const patrocinadores = [
  { nombre: "Postobon", dinero: 6000000, fuerzaExtra: 1, duracion: 4, nivel: "grande" },
  { nombre: "BetPlay", dinero: 5000000, fuerzaExtra: 1, duracion: 4, nivel: "grande" },
  { nombre: "Aguila", dinero: 6000000, fuerzaExtra: 1, duracion: 4, nivel: "grande" },
  { nombre: "Andina", dinero: 6000000, fuerzaExtra: 1, duracion: 4, nivel: "grande" },
  { nombre: "Stake", dinero: 8000000, fuerzaExtra: 1, duracion: 6, nivel: "grande" },
  { nombre: "Betsson", dinero: 5000000, fuerzaExtra: 0, duracion: 6, nivel: "mediano" },
  { nombre: "Olimpica", dinero: 2000000, fuerzaExtra: 0, duracion: 3, nivel: "mediano" },
  { nombre: "Pepsi", dinero: 3000000, fuerzaExtra: 0, duracion: 2, nivel: "mediano" },
  { nombre: "Wplay.co", dinero: 3000000, fuerzaExtra: 0, duracion: 5, nivel: "mediano" },
  { nombre: "Colanta", dinero: 1000000, fuerzaExtra: 0, duracion: 3, nivel: "chico" },
  { nombre: "Pool", dinero: 1000000, fuerzaExtra: 0, duracion: 2, nivel: "chico" },
  { nombre: "Cafe Aguila Roja", dinero: 1000000, fuerzaExtra: 0, duracion: 2, nivel: "chico" },
  { nombre: "Pastaslm", dinero: 4000000, fuerzaExtra: 0, duracion: 2, nivel: "chico" },
  { nombre: "Rivalo", dinero: 2000000, fuerzaExtra: 0, duracion: 2, nivel: "chico" },
  { nombre: "Megatiendas", dinero: 500000, fuerzaExtra: 0, duracion: 1, nivel: "chico" }
];

let patrocinadorActivo = null;
let semestresRestantesPatro = 0;

function nivelEquipoUsuario() {
  const fuerza = obtenerFuerzaTotal(equipoUsuario);
  if (fuerza >= 68) return "grande";
  if (fuerza >= 64) return "mediano";
  if (fuerza >= 60) return "chico";
  return "muy_chico";
}

function mostrarPatrocinadores() {
  if (patrocinadorActivo) {
    alert("Ya tienes un patrocinador activo.");
    return;
  }

  const nivel = nivelEquipoUsuario();
  if (nivel === "muy_chico") {
    alert("⚠️ Tu club es muy chico, no tienes patrocinadores disponibles.");
    return;
  }

  const disponibles = patrocinadores.filter(p => {
    if (nivel === "grande") return true;
    if (nivel === "mediano") return p.nivel !== "grande";
    if (nivel === "chico") return p.nivel === "chico";
  });

  const ofertas = disponibles.sort(() => 0.5 - Math.random()).slice(0, 4);
  const lista = document.getElementById("listaPatrocinadores");
  lista.innerHTML = "";

  ofertas.forEach(p => {
    const div = document.createElement("div");
    div.className = "patro-card";
    div.innerHTML = `
      <img src="logos/${p.nombre.toLowerCase().replace(/ /g,"_")}.png" alt="${p.nombre}">
      <div>
        <strong>${p.nombre}</strong><br>
        💰 $${(p.dinero/1e6).toFixed(1)}M<br>
        📅 ${p.duracion} semestres
      </div>
    `;
    div.onclick = () => contratarPatrocinador(p);
    lista.appendChild(div);
  });

  document.getElementById("modalPatrocinadores").style.display = "flex";
}

function cerrarModalPatrocinadores() {
  document.getElementById("modalPatrocinadores").style.display = "none";
}

function contratarPatrocinador(p) {
  patrocinadorActivo = p;
  semestresRestantesPatro = p.duracion;
  sumarPresupuesto(p.dinero);
  if (p.fuerzaExtra) modificarFuerzaEquipo(p.fuerzaExtra);

  actualizarPatrocinadorActivo();
  cerrarModalPatrocinadores();
  alert(`✅ ${p.nombre} ahora patrocina a tu club por ${p.duracion} semestres.`);
}

function actualizarPatrocinadorActivo() {
  const cont = document.getElementById("patrocinadorActivo");
  if (!cont) return;

  if (!patrocinadorActivo) {
    cont.className = "empty";
    cont.innerHTML = "⚠️ No tienes patrocinador activo.";
    return;
  }

  cont.className = "";
  cont.innerHTML = `
    <div class="patro-card-active">
      <img src="logos/${patrocinadorActivo.nombre.toLowerCase().replace(/ /g,"_")}.png" 
           alt="${patrocinadorActivo.nombre}">
      <div class="patro-info">
        <div class="patro-nombre">${patrocinadorActivo.nombre}</div>
        <div class="patro-duracion">
          Contrato activo 
          <span class="patro-semestres-badge">${semestresRestantesPatro} sem</span>
        </div>
      </div>
    </div>
  `;
}

function procesarSemestrePatrocinio() {
  if (!patrocinadorActivo) return;

  semestresRestantesPatro--;
  if (semestresRestantesPatro <= 0) {
    const renovar = confirm(`🔁 El contrato con ${patrocinadorActivo.nombre} terminó. ¿Renovar por ${patrocinadorActivo.duracion} semestres más?`);
    if (renovar) {
      semestresRestantesPatro = patrocinadorActivo.duracion;
      sumarPresupuesto(patrocinadorActivo.dinero);
      if (patrocinadorActivo.fuerzaExtra) modificarFuerzaEquipo(patrocinadorActivo.fuerzaExtra);
    } else {
      alert(`🏁 ${patrocinadorActivo.nombre} ya no es tu patrocinador.`);
      patrocinadorActivo = null;
    }
  }
  actualizarPatrocinadorActivo();
}







// --- FUNCIÓN VENTA DE CAMISETAS SEGÚN EL EQUIPO DEL USUARIO ---
function venderCamisetas() {
  if (!equipoUsuario) {
    alert("Primero debes seleccionar un equipo.");
    return;
  }

  const fuerza = obtenerFuerzaEquipo(equipoUsuario);
  if (!fuerza) {
    alert("El equipo no tiene fuerza definida.");
    return;
  }

  // 🚫 Si el equipo es menor a 60 de fuerza, no vende camisetas
  if (fuerza < 60) {
    alert(`${equipoUsuario} no genera ventas de camisetas (poca hinchada).`);
    return;
  }

  // ✅ Fórmula de ventas
  // Base proporcional a la fuerza, amplificada con potencia para marcar diferencia
  let factorAleatorio = (Math.random() * 0.6) + 0.7; // entre 0.7 y 1.3
  let ventas = Math.floor(((fuerza - 59) ** 2) * factorAleatorio * 1200);

  // Sumar al presupuesto
  sumarPresupuesto(ventas);

  // Mostrar mensaje
  alert(`${equipoUsuario} vendió camisetas por $${ventas.toLocaleString()}`);
}






function simularPartido(equipoA, equipoB) {
  const fuerzaA = obtenerFuerzaTotal(equipoA);
  const fuerzaB = obtenerFuerzaTotal(equipoB);
  const diferencia = fuerzaA - fuerzaB;

  const base = Math.random() * 1.5 + Math.random() * 1.5;
  const ventaja = Math.tanh(diferencia / 30);
  const ruidoA = Math.random() * 1.6 - 0.8;
  const ruidoB = Math.random() * 1.6 - 0.8;

  const golesA = Math.round(Math.max(0, base + ventaja + ruidoA));
  const golesB = Math.round(Math.max(0, base - ventaja + ruidoB));

  const plantillaA = plantillasJugadores[equipoA];
  const plantillaB = plantillasJugadores[equipoB];

  const goleadoresA = Array.from({ length: golesA }, () => elegirGoleadorPorPeso(plantillaA));
  const goleadoresB = Array.from({ length: golesB }, () => elegirGoleadorPorPeso(plantillaB));

  let puntosA = 0, puntosB = 0;
  if (golesA > golesB) puntosA = 3;
  else if (golesB > golesA) puntosB = 3;
  else puntosA = puntosB = 1;

  // ✅ Ajustar moral antes del return
  if (equipoUsuario === equipoA || equipoUsuario === equipoB) {
    const esA = equipoUsuario === equipoA;
    const golesPropios = esA ? golesA : golesB;
    const golesRivales = esA ? golesB : golesA;

    if (golesPropios > golesRivales) ajustarMoralHinchada("ganado");
    else if (golesPropios < golesRivales) ajustarMoralHinchada("perdido");
    else ajustarMoralHinchada("empatado");

    actualizarMoralHinchadaUI();
  }

  return { golesA, golesB, puntosA, puntosB, goleadoresA, goleadoresB };
}




function verificarEleccionesPresidenciales() {
  const cadaCuantosAnios = 3;

  if ((temporadaActual - 2028) % cadaCuantosAnios !== 0 || temporadaActual < 2028) return;

  const base = moralHinchada;
  const azar = Math.floor(Math.random() * 20) - 10;
  const apoyoFinal = base + azar;

  alert("🗳️ ¡Es año de elecciones presidenciales!");

  if (apoyoFinal >= 50) {
    alert(`✅ Ganaste las elecciones con un apoyo del ${apoyoFinal}%. La hinchada te respalda.`);
  } else {
    alert(`❌ Perdiste las elecciones con solo ${apoyoFinal}%. Otro presidente toma el cargo...`);
    location.reload();
  }
}

let mensajesSimulacion = [];
let indiceMensaje = 0;

function mostrarModalSimulacion() {
  const modal = document.getElementById("modalSimulacion");
  const contenido = document.getElementById("modalContenido");
  const titulo = document.getElementById("modalTitulo");

  if (indiceMensaje < mensajesSimulacion.length) {
    let msg = mensajesSimulacion[indiceMensaje];
    titulo.textContent = msg.titulo;
    contenido.textContent = msg.texto;
    modal.style.display = "flex";

    // Si el mensaje incluye tabla parcial → actualizar tabla en pantalla
    if (msg.tabla) {
      mostrarTabla("tct", msg.tabla, `Temporada ${temporadaActual} - Semestre ${semestreActual}`, true, [], false);
    }
  } else {
    document.getElementById("btnSiguiente").style.display = "none";
  }
}

document.getElementById("btnSiguiente").addEventListener("click", () => {
  indiceMensaje++;
  mostrarModalSimulacion();
  
});

document.getElementById("btnCerrar").addEventListener("click", () => {
  document.getElementById("modalSimulacion").style.display = "none";
  indiceMensaje = 0;
  mensajesSimulacion = [];
  document.getElementById("btnSiguiente").style.display = "inline-block";


});


//versión clásicos
function simularTCT() {
  if (!equipoUsuario) {
    alert("⚠️ Debes seleccionar un equipo antes de iniciar la simulación.");
    return;
  }

  document.getElementById("mercadoFichajes").innerHTML = "";
  document.getElementById("superliga").innerHTML = "";


  resetearVista();
  tabla = equipos.map(e => ({ nombre: e, pts: 0, gf: 0, gc: 0 }));

  const tablaGoleadores = {};
  const totalEquipos = [...equipos];

  // 📌 Definición de clásicos
  const clasicos = [
    ["Nacional", "Medellín"],
    ["Santa Fe", "Millonarios"],
    ["Cali", "América"],
    ["Once Caldas", "Pereira"],
    ["Junior", "Union M."],
    ["Fortaleza", "La Equidad"],
    ["Águilas", "Envigado"],
    ["Bucaramanga", "Cucuta"],
    ["Chico", "Patriotas"],
    ["Tolima", "Huila"]
  ];

  // Mezclar equipos al azar
  for (let i = totalEquipos.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [totalEquipos[i], totalEquipos[j]] = [totalEquipos[j], totalEquipos[i]];
  }

  // Algoritmo round-robin
  if (totalEquipos.length % 2 !== 0) totalEquipos.push("DESCANSA");
  const n = totalEquipos.length;
  const jornadas = n - 1;
  const mitad = n / 2;

  let lista = [...totalEquipos];
  let partidosPorEquipo = {};
  equipos.forEach(e => partidosPorEquipo[e] = { local: 0, visita: 0 });

  mensajesSimulacion = []; // para el modal
  const partidosPorFecha = [];

  // 🔹 Simular las 19 fechas del round robin
  for (let fecha = 1; fecha <= jornadas; fecha++) {
    const partidos = [];

    for (let i = 0; i < mitad; i++) {
      let equipoA = lista[i];
      let equipoB = lista[n - 1 - i];
      if (equipoA === "DESCANSA" || equipoB === "DESCANSA") continue;

      let invertir = (fecha + i) % 2 === 0;
      let local = invertir ? equipoB : equipoA;
      let visita = invertir ? equipoA : equipoB;

      const limiteLocal = semestreActual === 1 ? 10 : 9;
      const limiteVisita = semestreActual === 1 ? 9 : 10;

      if (partidosPorEquipo[local].local >= limiteLocal || partidosPorEquipo[visita].visita >= limiteVisita) {
        let temp = local;
        local = visita;
        visita = temp;
      }

      partidosPorEquipo[local].local++;
      partidosPorEquipo[visita].visita++;

      const resultado = simularPartido(local, visita);

      let equipoObjA = tabla.find(t => t.nombre === local);
      let equipoObjB = tabla.find(t => t.nombre === visita);

      equipoObjA.pts += resultado.puntosA;
      equipoObjA.gf += resultado.golesA;
      equipoObjA.gc += resultado.golesB;

      equipoObjB.pts += resultado.puntosB;
      equipoObjB.gf += resultado.golesB;
      equipoObjB.gc += resultado.golesA;

      resultado.goleadoresA.forEach(j => {
        const key = `${j} (${local})`;
        tablaGoleadores[key] = (tablaGoleadores[key] || 0) + 1;
      });

      resultado.goleadoresB.forEach(j => {
        const key = `${j} (${visita})`;
        tablaGoleadores[key] = (tablaGoleadores[key] || 0) + 1;
      });

      partidos.push({
        equipoA: local,
        equipoB: visita,
        golesA: resultado.golesA,
        golesB: resultado.golesB
      });
    }

    partidosPorFecha.push({ numero: fecha, partidos });

    // Rotación
    const fijo = lista[0];
    const resto = lista.slice(1);
    resto.unshift(resto.pop());
    lista = [fijo, ...resto];
  }

  // 🔹 Fecha extra de clásicos (siempre será la número 20)
  const partidosClasicos = [];
  let usados = new Set();

  clasicos.forEach(([e1, e2]) => {
    if (equipos.includes(e1) && equipos.includes(e2)) {
      partidosClasicos.push({ equipoA: e1, equipoB: e2 });
      usados.add(e1);
      usados.add(e2);
    }
  });

  let libres = equipos.filter(e => !usados.has(e));
  for (let i = libres.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [libres[i], libres[j]] = [libres[j], libres[i]];
  }
  while (libres.length >= 2) {
    let e1 = libres.pop();
    let e2 = libres.pop();
    partidosClasicos.push({ equipoA: e1, equipoB: e2 });
  }

  for (let p of partidosClasicos) {
    const resultado = simularPartido(p.equipoA, p.equipoB);

    let equipoObjA = tabla.find(t => t.nombre === p.equipoA);
    let equipoObjB = tabla.find(t => t.nombre === p.equipoB);

    equipoObjA.pts += resultado.puntosA;
    equipoObjA.gf += resultado.golesA;
    equipoObjA.gc += resultado.golesB;

    equipoObjB.pts += resultado.puntosB;
    equipoObjB.gf += resultado.golesB;
    equipoObjB.gc += resultado.golesA;

    resultado.goleadoresA.forEach(j => {
      const key = `${j} (${p.equipoA})`;
      tablaGoleadores[key] = (tablaGoleadores[key] || 0) + 1;
    });

    resultado.goleadoresB.forEach(j => {
      const key = `${j} (${p.equipoB})`;
      tablaGoleadores[key] = (tablaGoleadores[key] || 0) + 1;
    });

    p.golesA = resultado.golesA;
    p.golesB = resultado.golesB;
  }

  partidosPorFecha.push({ numero: 20, partidos: partidosClasicos });

  // 🔹 Guardar mensajes para el modal
  let tablaTemporal = equipos.map(e => ({ nombre: e, pts: 0, gf: 0, gc: 0 }));
  for (let fecha of partidosPorFecha) {
    let texto = `📅 Fecha ${fecha.numero}\n`;
    for (let p of fecha.partidos) {
      texto += `${p.equipoA} ${p.golesA} - ${p.golesB} ${p.equipoB}\n`;

      // acumular puntos en tablaTemporal
      let eqA = tablaTemporal.find(t => t.nombre === p.equipoA);
      let eqB = tablaTemporal.find(t => t.nombre === p.equipoB);
      eqA.pts += (p.golesA > p.golesB ? 3 : p.golesA === p.golesB ? 1 : 0);
      eqB.pts += (p.golesB > p.golesA ? 3 : p.golesA === p.golesB ? 1 : 0);
      eqA.gf += p.golesA; eqA.gc += p.golesB;
      eqB.gf += p.golesB; eqB.gc += p.golesA;
    }

    mensajesSimulacion.push({ titulo: `📅 Fecha ${fecha.numero}`, texto: texto.trim() });

    let tablaParcial = JSON.parse(JSON.stringify(tablaTemporal));
    tablaParcial.sort((a, b) => b.pts - a.pts || (b.gf - b.gc) - (a.gf - a.gc));

    let tablaTexto = "📊 Tabla de posiciones\n";
    tablaParcial.forEach((t, i) => {
      const dg = (t.gf || 0) - (t.gc || 0);
      tablaTexto += `${i + 1}. ${t.nombre} - ${t.pts} pts (DG: ${dg})\n`;
    });

    mensajesSimulacion.push({
      titulo: `📊 Tabla tras Fecha ${fecha.numero}`,
      texto: tablaTexto.trim(),
      tabla: tablaParcial
    });
  }

  // 🔹 Top 10 goleadores
  let goleadoresTexto = "🏆 Goleadores (Top 10)\n";
  const listaG = Object.entries(tablaGoleadores)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(([nombre, goles]) => `${nombre}: ${goles}`);
  goleadoresTexto += listaG.join("\n");

  mensajesSimulacion.push({ titulo: "🏆 Goleadores", texto: goleadoresTexto });

  // Iniciar modal
  indiceMensaje = 0;
  mostrarModalSimulacion();

  //Tabla final en pantalla normal
  tabla.sort((a, b) => b.pts - a.pts || (b.gf - b.gc) - (a.gf - a.gc));
  mostrarTabla("tct", tabla, `Temporada ${temporadaActual} - Semestre ${semestreActual}`, true, [], false);
  

  tabla.forEach(e => {
    if (!tablaAnual[e.nombre]) tablaAnual[e.nombre] = { nombre: e.nombre, pts: 0, gf: 0, gc: 0 };
    tablaAnual[e.nombre].pts += e.pts;
    tablaAnual[e.nombre].gf += e.gf;
    tablaAnual[e.nombre].gc += e.gc;
  });

  descensoPendiente = true;
   
   moralEvaluadaEsteSemestre = false;
   actualizarFuerzaUI();
   actualizarMediaUI();
   verificarPresupuestoNegativo();
}
  
function iniciarFaseFinal() {
  const usarPlayoffs = document.getElementById("modoPlayoffs").checked;

  if (usarPlayoffs) {
    simularPlayoffs();
  } else {
    simularCuadrangulares();
    simularFinal();
  }
}

// ------------------ Playoffs (cuartos -> semis -> final) ------------------

// Inicia la fase final según el checkbox (modo Playoffs o Cuadrangulares)
/*
function iniciarFaseFinal() {
  const usarPlayoffs = document.getElementById("modoPlayoffs")?.checked;
  if (usarPlayoffs) simularPlayoffs();
  else simularCuadrangulares();
}
*/

// Helper: devuelve HTML del escudo (usa nombre formateado para el archivo)
function obtenerEscudo(nombre) {
  if (!nombre) return `<img src="escudos/default.png" class="escudo-bracket" alt="-">`;
  const nombreLimpio = nombre.toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, "_")
    .replace(/\./g, "")
    .replace(/ñ/g, "n");
  return `<img src="escudos/${nombreLimpio}.png" alt="${nombre}" class="escudo-bracket" onerror="this.src='escudos/default.png'">`;
}

// Render brackets (solo escudos y líneas)
function mostrarBrackets(cuartos, semis, finalRes, campeon) {
  const cont = document.getElementById('playoffs') || document.getElementById('final');
  if (!cont) return;

  const escudo = (nombre) => obtenerEscudo(nombre);

  // Cuartos (8 equipos → 4 llaves)
  const htmlCuartos = cuartos.map(p => `
    <div class="team">${escudo(p.equipo1)}<div class="connector-h"></div></div>
    <div class="team">${escudo(p.equipo2)}<div class="connector-h"></div></div>
  `).join('');

  // Semis (4 equipos → 2 llaves)
  const htmlSemis = semis.map(p => `
    <div class="team">${escudo(p.equipo1)}<div class="connector-h"></div></div>
    <div class="team">${escudo(p.equipo2)}<div class="connector-h"></div></div>
  `).join('');

  // Final (2 equipos)
  const htmlFinal = `
    <div class="team">${escudo(finalRes.equipo1)}</div>
    <div class="team">${escudo(finalRes.equipo2)}</div>
  `;

  cont.innerHTML = `
    <h2>Playoffs</h2>
    <div class="bracket">
      <div class="round cuartos">${htmlCuartos}</div>
      <div class="round semis">${htmlSemis}</div>
      <div class="round final">${htmlFinal}</div>
    </div>
    
  `;
}


/*
function mostrarBrackets(cuartos, semis, finalRes, campeon) {
<div class="champion">🏆 Campeón: ${escudo(campeon)} ${campeon}</div>
  addBracketStyles();
  const cont = document.getElementById('playoffs') || document.getElementById('cuadrangulares') || document.getElementById('final');
  if (!cont) return;

  // Cuartos (4), Semis (2), Final (1)
  const htmlCuartos = cuartos.map((p, i) => `
    <div class="match q${i+1}">
      <div class="team top">${obtenerEscudo(p.equipo1)}<div class="h-line"></div></div>
      <div class="team bottom">${obtenerEscudo(p.equipo2)}<div class="h-line"></div></div>
    </div>
  `).join('');

  const htmlSemis = semis.map((p, i) => `
    <div class="match s${i+1}">
      <div class="team top">${obtenerEscudo(p.equipo1)}<div class="h-line"></div></div>
      <div class="team bottom">${obtenerEscudo(p.equipo2)}<div class="h-line"></div></div>
      <div class="v-connector" style="height: ${i===0? '80px':'80px'}; top: -40px"></div>
    </div>
  `).join('');

  const htmlFinal = `
    <div class="match final-match">
      <div class="team top">${obtenerEscudo(finalRes.equipo1)}<div class="h-line"></div></div>
      <div class="team bottom">${obtenerEscudo(finalRes.equipo2)}<div class="h-line"></div></div>
    </div>
  `;

  cont.innerHTML = `
    <h2>Playoffs</h2>
    <div class="bracket">
      <div class="column col-cuartos">${htmlCuartos}</div>
      <div class="column col-semis">${htmlSemis}</div>
      <div class="column col-final">${htmlFinal}</div>
    </div>
    <div class="champion" style="display:flex;align-items:center;gap:12px;justify-content:center;margin-top:12px;">
      <strong>Campeón:</strong> ${obtenerEscudo(campeon)} <span style="font-weight:bold;">${campeon}</span>
    </div>
  `;
}
*/

// Simula Playoffs completo (cuartos - semis - final) y replica TODO lo que hace simularFinal
function simularPlayoffs() {
  const clasificados = tabla.slice(0, 8);
  if (!clasificados || clasificados.length < 8) {
    alert('Necesitas al menos 8 equipos en tabla para jugar Playoffs.');
    return;
  }

  // Cruces: 1v8, 4v5, 2v7, 3v6
  const cuartos = [
    simularPartidoIdaVuelta(clasificados[0].nombre, clasificados[7].nombre),
    simularPartidoIdaVuelta(clasificados[3].nombre, clasificados[4].nombre),
    simularPartidoIdaVuelta(clasificados[1].nombre, clasificados[6].nombre),
    simularPartidoIdaVuelta(clasificados[2].nombre, clasificados[5].nombre)
  ];

  const semis = [
    simularPartidoIdaVuelta(cuartos[0].ganador, cuartos[1].ganador),
    simularPartidoIdaVuelta(cuartos[2].ganador, cuartos[3].ganador)
  ];

  const finalRes = simularPartidoIdaVuelta(semis[0].ganador, semis[1].ganador);
  const campeon = finalRes.ganador;

  // --- Guardar campeón por semestre para la Superliga (igual que en simularFinal) ---
  if (!campeonesLigaPorTemporada[temporadaActual]) {
    campeonesLigaPorTemporada[temporadaActual] = { I: null, II: null };
  }
  const tagSem = semestreActual === 1 ? 'I' : 'II';
  campeonesLigaPorTemporada[temporadaActual][tagSem] = campeon;

  // --- Añadir título, efectos, premio y reproducir audio ---
  try { agregarTituloLiga(campeon); } catch (e) { console.warn('agregarTituloLiga no encontrada'); }

  if (campeon === equipoUsuario) {
    sumarPresupuesto(500000);
    alert(`🎉 ¡Felicidades! ${campeon} es el campeón de liga\n💰 Recibes $500.000 de premio.`);
  }

  const audiosPorEquipo = {
    "millonarios": "audios/millonarios.mp3",
    "santa fe": "audios/santafe.mp3",
    "nacional": "audios/nacional.mp3",
    "america": "audios/america.mp3",
    "cali": "audios/cali.mp3",
    "junior": "audios/junior.mp3",
    "medellin": "audios/dim.mp3",
    "tolima": "audios/tolima.wav",
    "bucaramanga": "audios/bucaramanga.mp3",
    "once caldas": "audios/oncecaldas.mp3",
    "pereira": "audios/pereira.mp3",
    "chico": "audios/chico.mp3",
    "pasto": "audios/pasto.mp3",
    "cucuta": "audios/cucuta.mp3"
  };

  const claveAudio = campeon.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  const rutaAudio = audiosPorEquipo[claveAudio] || 'audios/winner.mp3';
  try { const audio = new Audio(rutaAudio); audio.play(); } catch (e) { console.warn('No se pudo reproducir audio', e); }

  // --- Historial y títulos ---
  campeones.push(`🏆 ${temporadaActual}-${tagSem}: ${campeon}`);

  if (campeon === equipoUsuario) {
    ligasGanadasPorUsuario++;
    const elTitulos = document.getElementById('titulos');
    if (elTitulos) elTitulos.innerText = `Titulo ganados: ${ligasGanadasPorUsuario}`;
    if (ligasGanadasPorUsuario === 13) {
      alert('🎉 🏆Felicidades! Has ganado 13 titulos y recibes el premio Gabriel Ochoa Uribe');
    }
  }

  // Rachas consecutivas
  if (campeon === ultimoCampeon) {
    equiposConsecutivos[campeon] = (equiposConsecutivos[campeon] || 1) + 1;
  } else {
    equiposConsecutivos[campeon] = 1;
  }

  switch (equiposConsecutivos[campeon]) {
    case 2: alert(`🚨 ¡${campeon} es Bicampeón! 🏆🏆`); break;
    case 3: alert(`🚨 ¡${campeon} es Tricampeón! 🏆🏆🏆`); break;
    case 4: alert(`🚨 ¡${campeon} es Tetracampeón! 🏆🏆🏆🏆`); break;
    case 5: alert(`🚨 ¡${campeon} es Pentacampeon! 🏆🏆🏆🏆🏆`); break;
  }
  ultimoCampeon = campeon;

  // Actualizar historial UI si tienes esa función
  try { actualizarHistorial(); } catch (e) { console.warn('actualizarHistorial no encontrada'); }

  // Render brackets y detalle final
  mostrarBrackets(cuartos, semis, finalRes, campeon);

  try {
    const escudo1 = obtenerEscudo(finalRes.equipo1);
    const escudo2 = obtenerEscudo(finalRes.equipo2);
    document.getElementById('final').innerHTML = `
      <h2>Final</h2>
      <p>${escudo1} ${finalRes.equipo1} ${finalRes.resultadoIda} ${finalRes.equipo2} ${escudo2} (IDA)</p>
      <p>${escudo2} ${finalRes.equipo2} ${finalRes.resultadoVuelta} ${finalRes.equipo1} ${escudo1} (VUELTA)</p>
      <h3>🏆⭐ Campeón: ${obtenerEscudo(campeon)} ${campeon}</h3>
    `;
  } catch (e) { console.warn('No se pudo renderizar detalle final', e); }

  // Limpiezas y actualizaciones finales (si existen)
  try { resetearVistacu(); } catch(e) {}
  try { actualizarBuzon(); } catch(e) {}
  try { evaluarMoralHinchada(); } catch(e) {}
  try { actualizarFuerzaUI(); } catch(e) {}
}






function simularMercadoFichajesNuevo() {
  const mercadoDiv = document.getElementById("mercadoFichajes");
  mercadoDiv.innerHTML = "<h3>💸 Mercado de Fichajes</h3><ul>";

  mercadoDiv.innerHTML += `
  <div class="nota-mercado">
    💸 <strong>Aviso del mercado:</strong> Los valores mostrados están redondeados y pueden variar levemente por comisiones, impuestos o cláusulas. Esas "pequeñas diferencias" son parte del negocio. ⚽
  </div>
`;

  const todosLosEquipos = [...equiposPrimera, ...equiposSegunda.map(e => e.nombre)];

  // Inicializar presupuestos si no existen
  todosLosEquipos.forEach(eq => {
    if (!presupuestosEquipos[eq]) {
      presupuestosEquipos[eq] = calcularPresupuestoPorFuerza(obtenerFuerzaEquipo(eq));
    }
  });

  // Cada equipo intenta hacer 1 o 2 operaciones
  todosLosEquipos.forEach(equipo => {
    const plantilla = plantillasJugadores[equipo];
    if (!plantilla || plantilla.length === 0) return;

    const operaciones = Math.floor(Math.random() * 2) + 1;

    for (let i = 0; i < operaciones; i++) {
      const vendedores = todosLosEquipos.filter(e => e !== equipo && plantillasJugadores[e]?.length > 0);
      if (vendedores.length === 0) continue;

      const vendedor = vendedores[Math.floor(Math.random() * vendedores.length)];
      const jugador = plantillasJugadores[vendedor][Math.floor(Math.random() * plantillasJugadores[vendedor].length)];
      if (!jugador) continue;

      const precio = calcularPrecioPorMedia(jugador.media);

      // Verificar presupuesto
      if (equipo === equipoUsuario) {
        if (presupuestoVisible < precio) {
          mercadoDiv.innerHTML += `<li>🔴 ${equipoUsuario} no tiene presupuesto para fichar a <b>${jugador.nombre}</b>.</li>`;
          continue;
        }
      } else if (presupuestosEquipos[equipo] < precio) {
        continue; // IA sin presupuesto no compra
      }

      // Transferencia
      plantillasJugadores[vendedor].splice(plantillasJugadores[vendedor].indexOf(jugador), 1);
      plantillasJugadores[equipo].push(jugador);

      // Ajustar presupuestos
      if (equipo === equipoUsuario) {
        presupuestosEquipos[equipoUsuario] -= precio;
        restarPresupuesto(precio);
      } else if (vendedor === equipoUsuario) {
        presupuestosEquipos[equipoUsuario] += precio;
        sumarPresupuesto(precio);
      } else {
        presupuestosEquipos[equipo] -= precio;
        presupuestosEquipos[vendedor] += precio;
      }

      // 📌 Escudos en lugar de nombres
      const foto = jugador.foto || "img/jugadores/default.png";

      const vendedorLimpio = vendedor.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/ /g, "_");
      const equipoLimpio = equipo.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/ /g, "_");

      const escudoVendedor = `<img src="escudos/${vendedorLimpio}.png" alt="${vendedor}" class="escudos">`;
      const escudoComprador = `<img src="escudos/${equipoLimpio}.png" alt="${equipo}" class="escudos">`;

      mercadoDiv.innerHTML += `
        <li>⚽ 
          <img src="${foto}" alt="${jugador.nombre}" class="fotoJugador"> 
          <b>${jugador.nombre}</b> pasó de ${escudoVendedor} a ${escudoComprador} 
          por ${formatearPrecio(precio)}
        </li>`;
    }
  });

  mercadoDiv.innerHTML += "</ul>";
}





function formatearPrecio(valor) {
  if (valor >= 1_000_000) {
    return `$${(valor / 1_000_000).toFixed(1)}M`;
  } else {
    return `$${Math.round(valor / 1_000)}K`;
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


// =========================
// 📌 Esquemas tácticos
// =========================
const esquemas = {
  "4-3-3": { defensas: 4, medios: 3, delanteros: 3 },
  "4-4-2": { defensas: 4, medios: 4, delanteros: 2 },
  "3-4-3": { defensas: 3, medios: 4, delanteros: 3 },
  "4-2-4": { defensas: 4, medios: 2, delanteros: 4 },
  "4-2-3-1": { defensas: 4, medios: 3, delanteros: 3 }
};

let esquemaActual = "4-3-3";

// =========================
// 📌 Procesar plantilla (se asegura de usar la que ya está modificada con retiros/ascensos)
// =========================
function procesarPlantilla(nombreEquipo) {
  return plantillasJugadores[nombreEquipo] || [];
}

// =========================
// 📌 Cambiar esquema táctico
// =========================
function cambiarEsquema(nuevoEsquema) {
  if (esquemas[nuevoEsquema]) {
    esquemaActual = nuevoEsquema;
    mostrarPlantilla(equipoUsuario); 
  }
}

// =========================
// 📌 Mostrar info del jugador (Modal)
// =========================

function mostrarInfoJugador(jugador) {
  const modal = document.getElementById("modalJugador");
  const contenido = document.getElementById("modalContenidoJugador");

  contenido.innerHTML = `
    <img src="${jugador.foto || 'img/jugadores/default.png'}" 
         alt="${jugador.nombre}" 
         class="fotoJugadorModal">
    <h2>${jugador.nombre}</h2>
    <p><b>Posición:</b> ${jugador.posicion}</p>
    <p><b>Edad:</b> ${jugador.edad} años</p>
    <p><b>Media:</b> ${jugador.media}</p>
  `;

  modal.style.display = "flex";
}


function cerrarModal() {
  document.getElementById("modalJugador").style.display = "none";
}

// =========================
// 📌 Mostrar plantilla en el campo
// =========================

let vistaActual = "cancha"; // puede ser "cancha" o "lista"

function toggleVista() {
  vistaActual = vistaActual === "cancha" ? "lista" : "cancha";
  mostrarPlantilla();
}

function mostrarPlantilla(nombreEquipo) {
  if (!nombreEquipo) {
    const selector = document.getElementById("selectorEquipo");
    if (!selector) return alert("❓ Selector no encontrado.");
    nombreEquipo = selector.value;
  }

  const plantilla = procesarPlantilla(nombreEquipo);
  const contenedor = document.getElementById("alineacion") || document.getElementById("plantillaJugadores");

  if (!contenedor) {
    alert("❌ No hay contenedor para mostrar la plantilla.");
    return;
  }

  if (!plantilla.length) {
    contenedor.innerHTML = `<p>❌ Este equipo no tiene plantilla registrada.</p>`;
    return;
  }

  // 👉 VISTA CANCHA
  if (vistaActual === "cancha") {
    const esquema = esquemas[esquemaActual];

    const porteroTitular = plantilla.filter(j => j.posicion.toLowerCase() === "portero")
                                    .sort((a, b) => b.media - a.media)[0];

    const defensasTitulares = plantilla.filter(j => j.posicion.toLowerCase() === "defensa")
                                       .sort((a, b) => b.media - a.media)
                                       .slice(0, esquema.defensas);

    const mediosTitulares = plantilla.filter(j => {
      const pos = j.posicion.toLowerCase();
      return pos.includes("volante") || pos.includes("pivote");
    })
    .sort((a, b) => b.media - a.media)
    .slice(0, esquema.medios);

    const delanterosTitulares = plantilla.filter(j => j.posicion.toLowerCase().includes("delantero"))
                                         .sort((a, b) => b.media - a.media)
                                         .slice(0, esquema.delanteros);

    const titulares = [porteroTitular, ...defensasTitulares, ...mediosTitulares, ...delanterosTitulares].filter(Boolean);

    const suplentes = plantilla.filter(j => !titulares.includes(j));

    contenedor.innerHTML = `
      <h3 class="campo">${nombreEquipo} - (${esquemaActual})</h3>
      <div class="campo">
        <div class="linea portero">
          ${porteroTitular ? `<div class="jugador titular" onclick='mostrarInfoJugador(${JSON.stringify(porteroTitular)})'>${porteroTitular.nombre}</div>` : ""}
        </div>
        <div class="linea defensa">
          ${defensasTitulares.map(j => `<div class="jugador titular" onclick='mostrarInfoJugador(${JSON.stringify(j)})'>${j.nombre}</div>`).join("")}
        </div>
        <div class="linea medio">
          ${mediosTitulares.map(j => `<div class="jugador titular" onclick='mostrarInfoJugador(${JSON.stringify(j)})'>${j.nombre}</div>`).join("")}
        </div>
        <div class="linea delantero">
          ${delanterosTitulares.map(j => `<div class="jugador titular" onclick='mostrarInfoJugador(${JSON.stringify(j)})'>${j.nombre}</div>`).join("")}
        </div>
      </div>

      <h4 class="suplentes-text">🪑 Suplentes</h4>
      <div class="suplentes">
        ${suplentes.map(j => 
          `<div class="jugador suplente" onclick='mostrarInfoJugador(${JSON.stringify(j)})'>${j.nombre} (${j.posicion})</div>`
        ).join("")}
      </div>

      <div class="selectorEsquema">
        ${Object.keys(esquemas).map(e => 
          `<button onclick="cambiarEsquema('${e}')">${e}</button>`
        ).join(" ")}
      </div>

      <button class="cambiar-vista"  onclick="toggleVista()">📋 Ver en lista</button>
    `;
  } 
   // 👉 VISTA LISTA (para presidente)
   // 👉 VISTA LISTA (para presidente)
else {
  const sueldoSemestral = equiposPrimera.includes(nombreEquipo) ? 5000000 : 2000000;

  // Calcular la suma de medias de toda la plantilla
  const sumaMedias = plantilla.reduce((acc, j) => acc + j.media, 0);

  // Asignar sueldo proporcional a cada jugador
  const plantillaConSueldos = plantilla.map(j => {
    const proporcion = j.media / sumaMedias;
    const salario = Math.round(sueldoSemestral * proporcion);
    return { ...j, salario };
  });

  contenedor.innerHTML = `
    <h3 class="nombre-equipo">${nombreEquipo} - Plantilla completa</h3>
    <table class="tablaPlantilla">
      <thead>
        <tr>
          <th>Media</th>
          <th>Valor</th>
          <th>Salario</th>
        </tr>
      </thead>
      <tbody>
        ${plantillaConSueldos.map(j => `
          <tr onclick='mostrarInfoJugador(${JSON.stringify(j)})'>
            <td>${j.media}</td>
            <td>${formatearPrecio(calcularPrecioPorMedia(j.media))}</td>
            <td>${formatearPrecio(j.salario)}</td>
          </tr>
        `).join("")}
      </tbody>
    </table>

    <div class="info-presupuesto">
      🏟️ División: ${equiposPrimera.includes(nombreEquipo) ? "Primera A" : "Segunda"}<br>
      💵 Sueldo anual total: ${formatearPrecio(sueldoSemestral)}
    </div>

    <button class="cambiar-vista" onclick="toggleVista()">⚽ Ver en cancha</button>
  `;
}
}



/*
  else {
    const sueldoSemestral = equiposPrimera.includes(nombreEquipo) ? 5000000 : 2000000;
    const sueldoPorJugador = Math.floor(sueldoSemestral / plantilla.length);

    contenedor.innerHTML = `
      <h3 class="nombre-equipo">${nombreEquipo} - Plantilla</h3>
      <table class="tablaPlantilla">
        <thead>
          <tr>
            <th>Media</th>
            <th>Valor</th>
            <th>Salario</th>
          </tr>
        </thead>
        <tbody>
          ${plantilla.map(j => `
            <tr onclick='mostrarInfoJugador(${JSON.stringify(j)})'>
              <td>${j.media}</td>
              <td>${formatearPrecio(calcularPrecioPorMedia(j.media))}</td>
              <td>${formatearPrecio(sueldoPorJugador)}</td>
            </tr>
          `).join("")}
        </tbody>
      </table>

      <div class="info-presupuesto">
        🏟️ División: ${equiposPrimera.includes(nombreEquipo) ? "Primera A" : "Segunda"}<br>
        💵 Sueldo Anual total: ${formatearPrecio(sueldoSemestral)}
      </div>

      <button class="cambiar-vista" onclick="toggleVista()">⚽ Ver en cancha</button>
    `;
  }
}
*/



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

  actualizarFuerzaUI(); // 👈 refrescar la interfaz
}

let castigoPorCorrupcion = null;
preguntaHechaEstaTemporada = false;
let decisionCorrupcionDebut = false;


function preguntaAleatoria() {
  if (preguntaHechaEstaTemporada) return;
  preguntaHechaEstaTemporada = true;

  const preguntas = [
  {
    texto: "💼 Un empresario quiere invertir en tu club. ¿Aceptar el dinero?",
    si: () => {
      castigoPorCorrupcion = equipoUsuario;
      sumarPresupuesto(20000000);
      notificacionPendiente = "💸 Recibiste los 20 millones...";
      mensajesPendientes++;
      actualizarBuzon();
    },
    no: () => {
      notificacionPendiente = "👏 Rechazaste el trato y protegiste la reputación del club.";
      mensajesPendientes++;
      actualizarBuzon();
    }
  },
  {
    texto: "🧪 Un jugador fue pillado dopándose. ¿Encubrirlo?",
    si: () => {
      castigoPorCorrupcion = equipoUsuario;
      notificacionPendiente = "🙊 Lo encubriste... veremos si te descubren.";
      mensajesPendientes++;
      actualizarBuzon();
    },
    no: () => {
      const plantilla = plantillasJugadores[equipoUsuario];
      if (plantilla.length > 0) {
        const sancionado = plantilla[Math.floor(Math.random() * plantilla.length)];
        sancionado.media = Math.max(1, sancionado.media - 2);
        notificacionPendiente = `⚠️ ${sancionado.nombre} fue suspendido. Pierde -2 de media.`;
        mensajesPendientes++;
        actualizarBuzon();
      }
    }
  },
  {
    texto: `⚽ El DT ${dtSeleccionado} propone un entrenamiento intensivo para todo el plantel. ¿Aceptar?`,
    si: () => {
      plantillasJugadores[equipoUsuario].forEach(j => j.media++);
      notificacionPendiente = `✅ Entrenamiento aprobado por ${dtSeleccionado}. Todos los jugadores suben +1 de media.`;
      mensajesPendientes++;
      actualizarBuzon();
    },
    no: () => {
      notificacionPendiente = `❌ Rechazaste el plan de ${dtSeleccionado}. Nada cambia.`;
      mensajesPendientes++;
      actualizarBuzon();
    }
  },
  {
    texto: "🏟️ Un empresario quiere cambiar el nombre del estadio a cambio de Nuevos Patrocinios. ¿Aceptar?",
    si: () => {
      plantillasJugadores[equipoUsuario].forEach(j => j.media++);
      notificacionPendiente = "💵 Mejoraron las taquillas. Todos suben +1 de media.";
      mensajesPendientes++;
      actualizarBuzon();
    },
    no: () => {
      notificacionPendiente = "🙅‍♂️ Preferiste conservar el nombre. Sin cambios.";
      mensajesPendientes++;
      actualizarBuzon();
    }
  },
  {
    texto: `🧤 El DT ${dtSeleccionado} propone un programa intensivo solo para porteros. ¿Aprobar su plan?`,
    si: () => {
      plantillasJugadores[equipoUsuario].forEach(j => {
        if (j.posicion.toLowerCase() === "portero") j.media++;
      });
      notificacionPendiente = `✅ ${dtSeleccionado} aplicó el plan. Los porteros ganan +1 de media.`;
      mensajesPendientes++;
      actualizarBuzon();
    },
    no: () => {
      notificacionPendiente = `❌ Rechazaste el plan de ${dtSeleccionado}. Nada cambia.`;
      mensajesPendientes++;
      actualizarBuzon();
    }
  },
  {
    texto: `🎯 El DT ${dtSeleccionado} quiere entrenar a los delanteros por separado para mejorar su precisión. ¿Aceptar?`,
    si: () => {
      plantillasJugadores[equipoUsuario].forEach(j => {
        if (j.posicion.toLowerCase().includes("delantero")) j.media++;
      });
      notificacionPendiente = "✅ Entrenamiento especializado aprobado. Los delanteros ganan +1 de media.";
      mensajesPendientes++;
      actualizarBuzon();
    },
    no: () => {
      notificacionPendiente = "❌ Se rechazó la propuesta de entrenamiento. Nada cambia.";
      mensajesPendientes++;
      actualizarBuzon();
    }
  },
  {
    texto: `🧠 ${dtSeleccionado} sugiere sesiones privadas con un psicólogo solo para mediocampistas. ¿Aceptar su sugerencia?`,
    si: () => {
      plantillasJugadores[equipoUsuario].forEach(j => {
        if (j.posicion.toLowerCase().includes("volante")) j.media++;
      });
      notificacionPendiente = `✅ ${dtSeleccionado} mejoró el enfoque mental. Mediocampistas +1 de media.`;
      mensajesPendientes++;
      actualizarBuzon();
    },
    no: () => {
      notificacionPendiente = `❌ No autorizaste el enfoque psicológico. Nada cambia.`;
      mensajesPendientes++;
      actualizarBuzon();
    }
  },
  // Preguntas 21 a 30
  {
    texto: "🏥 El jefe médico advirtió sobre riesgo de lesiones si no se invierte en recuperación. ¿Ignorarlo?",
    si: () => {
      const plantilla = plantillasJugadores[equipoUsuario];
      const lesionado = plantilla[Math.floor(Math.random() * plantilla.length)];
      lesionado.media = Math.max(1, lesionado.media - 4);
      notificacionPendiente = `🚑 ${lesionado.nombre} se lesionó por sobrecarga. Pierde -4 de media.`;
      mensajesPendientes++;
      actualizarBuzon();
    },
    no: () => {
      notificacionPendiente = "✅ Aprobaste los refuerzos médicos. El equipo estará más protegido.";
      mensajesPendientes++;
      actualizarBuzon();
    }
  },
  {
    texto: "🚨 Se descubrió que uno de tus jugadores está involucrado en apuestas ilegales. ¿Denunciarlo a la federación?",
    si: () => {
      const plantilla = plantillasJugadores[equipoUsuario];
      const jugadorInvolucrado = plantilla[Math.floor(Math.random() * plantilla.length)];
      const index = plantilla.indexOf(jugadorInvolucrado);
      if (index !== -1) plantilla.splice(index, 1);
      notificacionPendiente = `🚫 ${jugadorInvolucrado.nombre} fue denunciado y expulsado del torneo. No podrá volver a jugar en la temporada.`;
      mensajesPendientes++;
      actualizarBuzon();
    },
    no: () => {
      fuerzaEquipos[equipoUsuario] = Math.max(0, fuerzaEquipos[equipoUsuario] - 3);
      notificacionPendiente = "❌ Decidiste encubrir el escándalo. El vestuario se llenó de tensión. Pierdes -3 de fuerza.";
      mensajesPendientes++;
      actualizarBuzon();
    }
  },
  {
    texto: "💼 Un empresario ofrece 10 millones como inversión privada. ¿Aceptar?",
    si: () => {
      sumarPresupuesto(10000000);
      notificacionPendiente = "💰 Recibiste 10 millones. ¡Presupuesto aumentado!";
      mensajesPendientes++;
      actualizarBuzon();
    },
    no: () => {
      notificacionPendiente = "🙅‍♂️ Rechazaste la inversión. No hay cambios.";
      mensajesPendientes++;
      actualizarBuzon();
    }
  },
  {
    texto: "📩 Una carta sin remitente ofrece un 'bono' si el club acepta sus condiciones. ¿Aceptar?",
    si: () => {
      const resultado = Math.random();
      if (resultado < 0.3) {
        castigoPorCorrupcion = equipoUsuario;
        notificacionPendiente = "💸 El bono era dinero ilícito. ¡Corrupción detectada!";
      } else {
        sumarPresupuesto(3000000);
        modificarFuerzaEquipo(1);
        notificacionPendiente = "📈 El bono era legal y útil. +$3M y +1 fuerza.";
      }
      mensajesPendientes++;
      actualizarBuzon();
      
    },
    no: () => {
      notificacionPendiente = "🙅 Ignoraste la carta. Sigues en regla.";
      mensajesPendientes++;
      actualizarBuzon();
    }
  },
  {
    texto: "🏋️‍♀️ El cuerpo técnico solicita remodelar el gimnasio del club. ¿Aprobar los fondos?",
    si: () => {
      const costo = 2000000;
      if (presupuestoVisible >= costo) {
        restarPresupuesto(costo);
        notificacionPendiente = "💪 Renovaste el gimnasio. Mejora en entrenamientos físicos.";
      } else {
        notificacionPendiente = "❌ No tienes suficiente presupuesto para remodelar el gimnasio.";
      }
      mensajesPendientes++;
      actualizarBuzon();
    },
    no: () => {
      notificacionPendiente = "🏚️ Mantuviste el gimnasio viejo. Nada cambia.";
      mensajesPendientes++;
      actualizarBuzon();
    }
  },
  {
    texto: "🏦 Un banco quiere aparecer en la manga de la camiseta. ¿Aceptar el nuevo patrocinio?",
    si: () => {
      sumarPresupuesto(3000000);
      notificacionPendiente = "💵 Firmaste el acuerdo. Ingresas $3M.";
      mensajesPendientes++;
      actualizarBuzon();
    },
    no: () => {
      notificacionPendiente = "❌ Rechazaste el acuerdo. Nada cambia.";
      mensajesPendientes++;
      actualizarBuzon();
    }
  },
  // Preguntas 31 a 40
  {
    texto: `🎤 El sponsor principal te pidió participar en un comercial con el DT ${dtSeleccionado}. ¿Aceptar el pedido?`,
    si: () => {
      notificacionPendiente = `📹 El DT ${dtSeleccionado} y tú grabaron el anuncio. La relación con el sponsor se mantiene fuerte.`;
      mensajesPendientes++;
      actualizarBuzon();
    },
    no: () => {
      const penalizacion = 2000000;
      if (presupuestoVisible >= penalizacion) {
        restarPresupuesto(penalizacion);
        notificacionPendiente = "😒 El sponsor se molestó. Retiró parte de su aporte. Pierdes $2M.";
      } else {
        notificacionPendiente = "🚫 No cumpliste con el compromiso y no tienes fondos para afrontar la penalización.\n🧨 La junta directiva ha decidido removerte del cargo. Has sido despedido.";
      }
      mensajesPendientes++;
      actualizarBuzon();
    }
  },
  {
    texto: "🧬 Un laboratorio ofrece suplementación avanzada legal para mejorar el rendimiento de tu plantilla por $2M. ¿Aceptar?",
    si: () => {
      const costo = 2000000;
      if (presupuestosEquipos[equipoUsuario] >= costo) {
        restarPresupuesto(costo);
        const plantilla = plantillasJugadores[equipoUsuario];
        plantilla.forEach(j => j.media += 5);
        notificacionPendiente = "💪 La suplementación funcionó: todos los jugadores suben +5 de media.";
      } else {
        notificacionPendiente = "❌ No tienes suficiente presupuesto para pagar la mejora.";
      }
      mensajesPendientes++;
      actualizarBuzon();
    },
    no: () => {
      notificacionPendiente = "🚫 Rechazaste la propuesta. No hay cambios.";
      mensajesPendientes++;
      actualizarBuzon();
    }
  },
  {
    texto: "🧠 Un Empresario árabe ofrece dar una charla técnica a cambio de derechos de imagen. ¿Aceptar?",
    si: () => {
      presupuestoVisible += 3000000;
      actualizarPresupuestoHTML();
      notificacionPendiente = "💰 Recibiste $3M por el acuerdo con el club árabe.";
      mensajesPendientes++;
      actualizarBuzon();
    },
    no: () => {
      notificacionPendiente = "🤝 Rechazaste la propuesta por mantener tu independencia.";
      mensajesPendientes++;
      actualizarBuzon();
    }
  },
  {
    texto: "🎲 Un aficionado millonario ofrece una donación por amor al club. ¿Aceptar el dinero sin hacer preguntas?",
    si: () => {
      presupuestoVisible += 2500000;
      actualizarPresupuestoHTML();
      notificacionPendiente = "💸 Aceptaste el dinero misterioso. Sumaste $2.5M.";
      mensajesPendientes++;
      actualizarBuzon();
    },
    no: () => {
      notificacionPendiente = "🧼 Actuaste con ética. El presupuesto sigue igual.";
      mensajesPendientes++;
      actualizarBuzon();
    }
  },
  {
    texto: "🏛️ El alcalde lanza un subsidio para clubes con impacto juvenil. ¿Postularte?",
    si: () => {
      presupuestoVisible += 2000000;
      actualizarPresupuestoHTML();
      notificacionPendiente = "🏅 El club recibió el subsidio. Sumaste $2M.";
      mensajesPendientes++;
      actualizarBuzon();
    },
    no: () => {
      notificacionPendiente = "🙃 Dejaste pasar la oportunidad por burocracia.";
      mensajesPendientes++;
      actualizarBuzon();
    }
  },
  {
    texto: "📱 Los hinchas exigen cambios en redes sociales. ¿Contratar un community manager por $1M?",
    si: () => {
      if (presupuestoVisible >= 1000000) {
        restarPresupuesto(1000000);
        notificacionPendiente = "📱 Imagen digital mejorada. Pagaste $1M.";
      } else {
        notificacionPendiente = "📉 No tenías dinero y los fans están molestos.";
      }
      mensajesPendientes++;
      actualizarBuzon();
    },
    no: () => {
      notificacionPendiente = "🙈 Ignoraste el reclamo. Nada cambia.";
      mensajesPendientes++;
      actualizarBuzon();
    }
  },
  {
    texto: "🧬 Se implementa una innovadora rutina de nutrición. ¿Aplicarla?",
    si: () => {
      const plantilla = plantillasJugadores[equipoUsuario];
      plantilla.forEach(j => j.fuerza += 3);
      notificacionPendiente = "🥗 Mejora física: todos ganan +3 de fuerza.";
      mensajesPendientes++;
      actualizarBuzon();
    },
    no: () => {
      notificacionPendiente = "🍔 Mantienes el plan de siempre. Todo sigue igual.";
      mensajesPendientes++;
      actualizarBuzon();
    }
  },
  // Preguntas 41 a 50
  {
    texto: "🎭 Un escándalo de redes sociales afecta la concentración del equipo. ¿Ignorar y no tomar medidas?",
    si: () => {
      const plantilla = plantillasJugadores[equipoUsuario];
      plantilla.forEach(j => {
        j.media = Math.max(1, j.media - 2);
        j.fuerza = Math.max(1, j.fuerza - 1);
      });
      notificacionPendiente = "😓 La crisis afectó al grupo. -2 media y -1 fuerza.";
      mensajesPendientes++;
      actualizarBuzon();
    },
    no: () => {
      notificacionPendiente = "📵 Implementaste un protocolo de comunicación. El equipo se mantiene firme.";
      mensajesPendientes++;
      actualizarBuzon();
    }
  },
  {
    texto: "🧪 Un método de recuperación muscular experimental promete +6 de media. ¿Autorizarlo?",
    si: () => {
      const plantilla = plantillasJugadores[equipoUsuario];
      plantilla.forEach(j => j.media += 6);
      notificacionPendiente = "⚡ Tus jugadores ganaron +6 de media… aunque aún no está aprobado por la FIFA.";
      mensajesPendientes++;
      actualizarBuzon();
    },
    no: () => {
      notificacionPendiente = "😅 Decidiste no arriesgar la salud de tus jugadores.";
      mensajesPendientes++;
      actualizarBuzon();
    }
  },
  {
    texto: "🧬 Un tratamiento cognitivo mejora la toma de decisiones en cancha. ¿Implementarlo?",
    si: () => {
      const plantilla = plantillasJugadores[equipoUsuario];
      plantilla.forEach(j => j.media += 4);
      notificacionPendiente = "🧠 Todos los jugadores ganaron +4 de media gracias al nuevo enfoque mental.";
      mensajesPendientes++;
      actualizarBuzon();
    },
    no: () => {
      notificacionPendiente = "🤔 Preferiste seguir con métodos tradicionales.";
      mensajesPendientes++;
      actualizarBuzon();
    }
  },
  {
    texto: "🏟️ Un festival musical quiere usar tu estadio durante el receso. Ofrecen $6M de alquiler. ¿Aceptar?",
    si: () => {
      sumarPresupuesto(6000000);
      notificacionPendiente = "🎶 El evento fue un éxito. El club ganó $6 millones sin afectar la cancha.";
      mensajesPendientes++;
      actualizarBuzon();
    },
    no: () => {
      notificacionPendiente = "🤷 Rechazaste el alquiler. El estadio quedó vacío durante el receso… y sin ingresos.";
      mensajesPendientes++;
      actualizarBuzon();
    }
  },
  {
    texto: "💼 Un grupo de empresarios quiere comprar el 15% del club por $12M. No intervendrán en decisiones deportivas. ¿Aceptar?",
    si: () => {
      sumarPresupuesto(12000000);
      notificacionPendiente = "✅ Recibiste $12 millones sin ceder control deportivo. Gran negocio.";
      mensajesPendientes++;
      actualizarBuzon();
    },
    no: () => {
      notificacionPendiente = "❌ Rechazaste la oferta. Algunos en la junta creen que desaprovechaste una gran oportunidad.";
      mensajesPendientes++;
      actualizarBuzon();
    }
  },
  {
    texto: "🟥 La liga te penalizó por acumular tarjetas y comportamiento antideportivo. ¿Pagar multa de $3M?",
    si: () => {
      restarPresupuesto(3000000);
      notificacionPendiente = "💸 Se descontaron $3M por sanción disciplinaria.";
      mensajesPendientes++;
      actualizarBuzon();
    },
    no: () => {
      notificacionPendiente = "🟨 Aceptaste el expediente. Te dejaron pasar esta vez sin castigo extra.";
      mensajesPendientes++;
      actualizarBuzon();
    }
  },
  {
    texto: "📺 La televisora te multó por no cumplir con entrevistas obligatorias. ¿Pagar $2M?",
    si: () => {
      restarPresupuesto(2000000);
      notificacionPendiente = "🎙️ Pagaste la multa. Las relaciones con la prensa se mantienen.";
      mensajesPendientes++;
      actualizarBuzon();
    },
    no: () => {
      notificacionPendiente = "😶 Ignoraste el reclamo. El club queda en mala relación con los medios.";
      mensajesPendientes++;
      actualizarBuzon();
    }
  },
  {
  texto: "📣 La hinchada exige resultados. ¿Aceptar presión y cambiar táctica?",
  si: () => {
    modificarFuerzaEquipo(2);
    notificacionPendiente = "📈 Táctica arriesgada. +2 fuerza a tu equipo.";
    mensajesPendientes++;
    actualizarBuzon();
  },
  no: () => {
    modificarFuerzaEquipo(-1);
    notificacionPendiente = "😓 No cambiaste nada. Tu equipo pierde -1 de fuerza por presión.";
    mensajesPendientes++;
    actualizarBuzon();
  }
},
{
  texto: "🧯 Los hinchas organizaron una protesta en el entrenamiento. ¿Reunirte con ellos?",
  si: () => {
    modificarFuerzaEquipo(1);
    notificacionPendiente = "🫱🤝🫲 Dialogaste con la hinchada. Subís +1 de fuerza por respaldo.";
    mensajesPendientes++;
    actualizarBuzon();
  },
  no: () => {
    modificarFuerzaEquipo(-2);
    notificacionPendiente = "🙈 Ignoraste a los hinchas. Perdés -2 de fuerza.";
    mensajesPendientes++;
    actualizarBuzon();
  }
},
{
  texto: "📸 Rumores de fiestas antes de los partidos. ¿Ignorar (Cancelar) o sancionar (Aceptar)?",
  si: () => {
    modificarFuerzaEquipo(-2);
    notificacionPendiente = "🍾 Tu equipo se descontrola. Pierdes -2 fuerza.";
    mensajesPendientes++;
    actualizarBuzon();
  },
  no: () => {
    notificacionPendiente = "👏 Actuaste a tiempo.";
    mensajesPendientes++;
    actualizarBuzon();
  }
},
{
  texto: "🎲 La Dimayor propone una regla experimental que aumenta el ritmo de juego. ¿Apoyas la idea?",
  si: () => {
    modificarFuerzaEquipo(1);
    notificacionPendiente = "⚡ La nueva regla favorece tu estilo. +1 fuerza al equipo.";
    mensajesPendientes++;
    actualizarBuzon();
  },
  no: () => {
    modificarFuerzaEquipo(-1);
    notificacionPendiente = "📉 Tu equipo se adapta mal al cambio. -1 fuerza.";
    mensajesPendientes++;
    actualizarBuzon();
  }
},
{
  texto: "💢 Un jugador veterano se enfrentó al DT. Como Presidente, ¿apoyas al DT (Aceptar) o al jugador (Cancelar)?",
  si: () => {
    modificarFuerzaEquipo(3);
    notificacionPendiente = "✅ Defendiste la autoridad del DT. El equipo gana +3 de fuerza.";
    mensajesPendientes++;
    actualizarBuzon();
  },
  no: () => {
    const plantilla = plantillasJugadores[equipoUsuario];
    if (plantilla.length > 0) {
      const afectado = plantilla[Math.floor(Math.random() * plantilla.length)];
      afectado.media = Math.max(1, afectado.media - 1);
      notificacionPendiente = `⚠️ El conflicto desmotivó a ${afectado.nombre}. Pierde -1 de media.`;
      mensajesPendientes++;
      actualizarBuzon();
    }
  }
},
{
  texto: "🧑‍⚖️ Un directivo sugiere imponer multas a los jugadores por bajo rendimiento en el semestre. ¿Aprobar la medida?",
  si: () => {
    modificarFuerzaEquipo(1);
    notificacionPendiente = "✅ La disciplina interna mejoró la actitud. Verás más intensidad en el segundo semestre.";
    mensajesPendientes++;
    actualizarBuzon();
  },
  no: () => {
    notificacionPendiente = "❌ Decidiste evitar el castigo. El grupo sigue igual… por ahora.";
    mensajesPendientes++;
    actualizarBuzon();
  }
},
{
  texto: "📰 La prensa difunde rumores que afectan la concentración del plantel. ¿Enfrentar públicamente los rumores?",
  si: () => {
    modificarFuerzaEquipo(1);
    notificacionPendiente = "✅ Tu respuesta firme calmó al entorno. El equipo recupera foco.";
    mensajesPendientes++;
    actualizarBuzon();
  },
  no: () => {
    modificarFuerzaEquipo(-1);
    notificacionPendiente = "❌ El silencio alimentó la tensión. El equipo pierde concentración.";
    mensajesPendientes++;
    actualizarBuzon();
  }
},
{
  texto: `🎯 El DT ${dtSeleccionado} cree que el actual capitán no lidera bien. ¿Cambiar el capitán del equipo?`,
  si: () => {
    modificarFuerzaEquipo(1);
    notificacionPendiente = "✅ El nuevo capitán inspira al grupo. Se verá reflejado en el segundo semestre.";
    mensajesPendientes++;
    actualizarBuzon();
  },
  no: () => {
    notificacionPendiente = "❌ Mantuviste al capitán actual. El ambiente se mantiene estable.";
    mensajesPendientes++;
    actualizarBuzon();
  }
},
{
  texto: "🌐 Tu equipo es invitado a un torneo amistoso internacional. ¿Aceptar?",
  si: () => {
    modificarFuerzaEquipo(5);
    notificacionPendiente = "🌍 El roce internacional sube tu nivel. +5 fuerza.";
    mensajesPendientes++;
    actualizarBuzon();
  },
  no: () => {
    modificarFuerzaEquipo(-1);
    notificacionPendiente = "📉 Perdiste visibilidad. -1 fuerza.";
    mensajesPendientes++;
    actualizarBuzon();
  }
},
{
  texto: "🎁 Un fanático anónimo envió un paquete especial al club. ¿Abrirlo?",
  si: () => {
    const resultado = Math.floor(Math.random() * 3);
    if (resultado === 0) {
      modificarFuerzaEquipo(2);
      notificacionPendiente = "📦 ¡Sorpresa! Contenía material táctico avanzado. +2 fuerza.";
    } else if (resultado === 1) {
      plantillasJugadores[equipoUsuario].forEach(j => j.media++);
      notificacionPendiente = "📦 ¡Wow! Era equipamiento de élite. Todos suben +1 de media.";
    } else {
      const jugador = plantillasJugadores[equipoUsuario][Math.floor(Math.random() * plantillasJugadores[equipoUsuario].length)];
      jugador.media = Math.max(1, jugador.media - 2);
      notificacionPendiente = `📦 ¡Oh no! ${jugador.nombre} sufrió una lesión con el regalo. -2 de media.`;
    }
    mensajesPendientes++;
    actualizarBuzon();
  },
  no: () => {
    notificacionPendiente = "🙅 Decidiste no abrir el paquete. Mejor prevenir que lamentar.";
    mensajesPendientes++;
    actualizarBuzon();
  }
},
{
  texto: "🕴️ Un agente te ofrece 20 millones si haces debutar a un jugador. ¿Aceptar el trato?",
  si: () => {
    modificarFuerzaEquipo(2); 
    sumarPresupuesto(20000000);        
    notificacionPendiente = "✅ El dinero ya está en la cuenta del club.";
    decisionCorrupcionDebut = true;    
    mensajesPendientes++;
    actualizarBuzon();
  },
  no: () => {
    notificacionPendiente = "👏 Rechazaste la oferta y protegiste la integridad del club.";
    mensajesPendientes++;
    actualizarBuzon();
  }
},
{
  texto: "💼 Un empresario con mucho dinero quiere invertir en tu club. Promete mejorar todo sin pedir nada a cambio. ¿Aceptar el dinero?",
  si: () => {
    sumarPresupuesto(10000000);
    modificarFuerzaEquipo(2);
    plantillasJugadores[equipoUsuario].forEach(j => j.media++);
    notificacionPendiente = "✅ Era una inversión legal. Tu club mejora: +1 media a todos, +2 fuerza y +$10M al presupuesto.";
    mensajesPendientes++;
    actualizarBuzon();
  },
  no: () => {
    notificacionPendiente = "❌ Rechazaste la oferta. Tal vez perdiste una oportunidad legítima...";
    mensajesPendientes++;
    actualizarBuzon();
  }
},
{
  texto: "🌧️ Las fuertes lluvias han afectado el campo. ¿Invertir en mejoras urgentes?",
  si: () => {
    const costo = 2000000;
    if (presupuestoVisible >= costo) {
      restarPresupuesto(costo);
      modificarFuerzaEquipo(1);
      notificacionPendiente = "✅ El campo fue restaurado. +1 fuerza.";
    } else {
      notificacionPendiente = "❌ No tienes suficiente presupuesto para invertir en las mejoras del campo.";
    }
    mensajesPendientes++;
    actualizarBuzon();
  },
  no: () => {
    modificarFuerzaEquipo(-3);
    notificacionPendiente = "❌ El terreno sigue irregular. -3 de fuerza.";
    mensajesPendientes++;
    actualizarBuzon();
  }
},
{
  texto: "🏢 Tu patrocinador principal quiere aparecer más en camisetas y redes. ¿Rechazar sus condiciones?",
  si: () => {
    const penalizacion = 5000000;
    if (presupuestoVisible >= penalizacion) {
      restarPresupuesto(penalizacion);
      modificarFuerzaEquipo(-4);
      notificacionPendiente = "💥 El patrocinador rompió el contrato. Pierdes $5M y -4 de fuerza por tensión institucional.";
    } else {
      notificacionPendiente = "🚫 No tienes fondos para asumir la pérdida del patrocinador.\n🧨 La junta directiva ha decidido removerte del cargo. Has sido despedido.";
    }
    mensajesPendientes++;
    actualizarBuzon();
  },
  no: () => {
    notificacionPendiente = "🤝 Aceptaste las condiciones del patrocinador. El apoyo económico continúa.";
    mensajesPendientes++;
    actualizarBuzon();
  }
},
{
  texto: "🚐 El transporte de los juveniles es obsoleto. ¿Adquirir una nueva van por $1.5M?",
  si: () => {
    const costo = 1500000;
    if (presupuestoVisible >= costo) {
      restarPresupuesto(costo);
      notificacionPendiente = "🚌 Aprobaste la renovación del vehículo. Mejor logística para los juveniles.";
    } else {
      notificacionPendiente = "❌ No tienes fondos para renovar el transporte.";
    }
    mensajesPendientes++;
    actualizarBuzon();
  },
  no: () => {
    modificarFuerzaEquipo(-2);
    notificacionPendiente = "🚧 El transporte ineficiente afecta el desarrollo de juveniles. -2 de fuerza.";
    mensajesPendientes++;
    actualizarBuzon();
  }
},
{
  texto: "🔥 Se rompió el sistema eléctrico del estadio. ¿Cubrir el costo de la reparación?",
  si: () => {
    if (presupuestoVisible >= 1500000) {
      restarPresupuesto(1500000);
      notificacionPendiente = "🔧 Se reparó el sistema. $1.5M menos.";
    } else {
      notificacionPendiente = "💥 No tienes fondos. El estadio quedó dañado.";
    }
    mensajesPendientes++;
    actualizarBuzon();
  },
  no: () => {
    modificarFuerzaEquipo(-2);
    notificacionPendiente = "📉 No se reparó el estadio. Pierdes -2 de fuerza.";
    mensajesPendientes++;
    actualizarBuzon();
  }
},
{
  texto: "🏗️ Se filtró el techo del vestuario. ¿Repararlo?",
  si: () => {
    if (presupuestoVisible >= 100000) {
      restarPresupuesto(100000);
      notificacionPendiente = "🚿 Techo reparado. Higiene recuperada.";
    } else {
      notificacionPendiente = "🚨 No tienes fondos y los jugadores están incómodos.";
    }
    mensajesPendientes++;
    actualizarBuzon();
  },
  no: () => {
    modificarFuerzaEquipo(-1);
    notificacionPendiente = "🤢 Vestuario deteriorado. Pierdes -1 de fuerza.";
    mensajesPendientes++;
    actualizarBuzon();
  }
},
{
  texto: "📚 Un prestigioso preparador físico ofrece una capacitación avanzada. ¿Pagar $3M?",
  si: () => {
    if (presupuestoVisible >= 3000000) {
      restarPresupuesto(3000000);
      const plantilla = plantillasJugadores[equipoUsuario];
      plantilla.forEach(j => {
        j.media += 3;
        j.fuerza += 2;
      });
      notificacionPendiente = "💪 Todo el plantel ganó +3 media y +2 fuerza.";
    } else {
      notificacionPendiente = "❌ No tienes dinero para la capacitación.";
    }
    mensajesPendientes++;
    actualizarBuzon();
  },
  no: () => {
    notificacionPendiente = "👎 Rechazaste la oportunidad de formación.";
    mensajesPendientes++;
    actualizarBuzon();
  }
},
{
  texto: "🌋 Una crisis nacional afecta a todos los equipos. ¿Donar fondos a la Dimayor para apoyar al fútbol?",
  si: () => {
    if (presupuestoVisible >= 4000000) {
      restarPresupuesto(4000000);
      notificacionPendiente = "🤝 Donaste $4M. La Dimayor reconoce tu compromiso.";
    } else {
      notificacionPendiente = "❌ No tienes fondos suficientes para participar en la ayuda.";
    }
    mensajesPendientes++;
    actualizarBuzon();
  },
  no: () => {
    modificarFuerzaEquipo(-3);
    notificacionPendiente = "🧊 El club fue criticado por no ayudar. Pierdes -3 de fuerza.";
    mensajesPendientes++;
    actualizarBuzon();
  }
},
{
  texto: "🎟️ La asistencia al estadio creció un 30% este semestre. La Junta directiva te sugiere subir el precio de las entradas. ¿Aceptar?",
  si: () => {
    modificarFuerzaEquipo(-3);
    notificacionPendiente = "😡 Subiste los precios y los hinchas se sintieron traicionados. Pierdes -3 de fuerza.";
    mensajesPendientes++;
    actualizarBuzon();
  },
  no: () => {
    modificarFuerzaEquipo(1);
    notificacionPendiente = "🙌 Mantuviste los precios populares. La hinchada está orgullosa y más comprometida. Ganas +1 de fuerza.";
    mensajesPendientes++;
    actualizarBuzon();
  }
},
{
  texto: "🎮 Un sponsor importante quiere lanzar un equipo de e-sports con tu escudo. Ofrecen $5M de patrocinio. ¿Aceptar?",
  si: () => {
    sumarPresupuesto(5000000);
    modificarFuerzaEquipo(1);
    notificacionPendiente = "📈 El proyecto e-sports elevó tu imagen y sumaste $5M. También ganas +1 de fuerza institucional.";
    mensajesPendientes++;
    actualizarBuzon();
  },
  no: () => {
    notificacionPendiente = "🚫 Rechazaste la propuesta gamer. El club sigue sin presencia digital.";
    mensajesPendientes++;
    actualizarBuzon();
  }
},
{
  texto: "⚖️ La Dimayor multó a tu club por incidentes con la hinchada. ¿Pagar $4M de sanción?",
  si: () => {
    restarPresupuesto(4000000);
    notificacionPendiente = "💸 Pagaste la multa a Dimayor. Presupuesto reducido.";
    mensajesPendientes++;
    actualizarBuzon();
  },
  no: () => {
    modificarFuerzaEquipo(-2);
    notificacionPendiente = "⚠️ No pagaste. La sanción fue deportiva: pierdes -2 de fuerza.";
    mensajesPendientes++;
    actualizarBuzon();
  }
},
{
  texto: "📉 Una auditoría encontró fallas en tus reportes financieros. ¿Pagar $5M para evitar sanciones mayores?",
  si: () => {
    restarPresupuesto(5000000);
    notificacionPendiente = "💰 Pagaste la auditoría. El club evitó problemas mayores.";
    mensajesPendientes++;
    actualizarBuzon();
  },
  no: () => {
    modificarFuerzaEquipo(-3);
    notificacionPendiente = "🔍 Ocultaste el error. El escándalo afectó al equipo: -3 de fuerza.";
    mensajesPendientes++;
    actualizarBuzon();
  }
},
{
  texto: "🏟️ El estadio fue clausurado temporalmente por problemas de seguridad. ¿Pagar $6M para reabrirlo?",
  si: () => {
    restarPresupuesto(6000000);
    notificacionPendiente = "🔓 Pagaste la adecuación del estadio. Se reabre para el próximo partido.";
    mensajesPendientes++;
    actualizarBuzon();
  },
  no: () => {
    modificarFuerzaEquipo(-4);
    notificacionPendiente = "🚧 Jugaste a puerta cerrada. El equipo sufre sin apoyo: -4 de fuerza.";
    mensajesPendientes++;
    actualizarBuzon();
  }
}
  
];

  const pregunta = preguntas[Math.floor(Math.random() * preguntas.length)];

  // Mostrar modal en vez de confirm
  document.getElementById("textoPregunta").innerText = pregunta.texto;
  document.getElementById("buzonPregunta").style.display = "flex";

  
  // Botón aceptar
  document.getElementById("btnAceptar").onclick = () => {
    pregunta.si(); // ejecuta acción "sí"
    document.getElementById("buzonPregunta").style.display = "none";
  };

  // Botón cancelar
  document.getElementById("btnCancelar").onclick = () => {
    pregunta.no(); // ejecuta acción "no"
    document.getElementById("buzonPregunta").style.display = "none";
  };
}




function activarPalanca() {
  if (presupuestoVisible >= 0) {
    alert("✅ No estás en crisis. La palanca solo se activa con presupuesto negativo.");
    return;
  }

  const preguntasCrisis = [
    {
      texto: "🏟️ ¿Vender el nombre del estadio a una marca por $10M?",
      si: () => {
        sumarPresupuesto(10000000);
        alert("💸 Vendiste los derechos del estadio. El club respira con $10 millones más.");
       desactivarPalanca() ;
        document.getElementById("botonPalanca").disabled = true;
      },
      no: () => {
        alert("😬 Mantuviste el nombre histórico. Pero la crisis sigue.");
      }
    },
    {
      texto: "👕 ¿Subastar camisetas históricas por $4M?",
      si: () => {
        sumarPresupuesto(4000000);
        alert("🧤 Vendiste reliquias. Doloroso pero útil. Sumas $4M.");
        desactivarPalanca() ;
        document.getElementById("botonPalanca").disabled = true;
      },
      no: () => {
        alert("😭 Decidiste conservar la historia. Aún sin fondos.");
      }
    },
    {
      texto: "🏫 ¿Alquilar parte del club para eventos y oficinas externas por $6M?",
      si: () => {
        sumarPresupuesto(6000000);
        alert("💼 Alquilaste espacio del club. Ganas $6M y calmas la crisis.");
        desactivarPalanca() ;
        document.getElementById("botonPalanca").disabled = true;
      },
      no: () => {
        alert("🤷‍♂️ Rechazaste la oferta. El déficit continúa.");
      }
    },
    {
      texto: "🐷 ¿Vender el bus oficial del plantel y usar uno alquilado por ahora? Ganas $3M.",
      si: () => {
        sumarPresupuesto(3000000);
        alert("🚐 Vendiste el bus oficial. Sumas $3M pero el club quedó sin vehículo propio.");
        desactivarPalanca() ;
        document.getElementById("botonPalanca").disabled = true;
      },
      no: () => {
        alert("🚫 Rechazaste la venta. El bus se mantiene, pero no hay ingreso.");
      }
    },
   {
  texto: "👔 Estás en números rojos. Una opción rápida es despedir personal de la junta directiva para ahorrar costos. ¿Recortar sueldos?",
  si: () => {
    presupuestoVisible += 10000000;
    actualizarPresupuestoHTML();
    alert("📉 Recortaste personal y recuperaste $10 millones. El club sigue, aunque con menos apoyo administrativo.");
  },
  no: () => {
    alertaPresupuestoSinResolver = true;
    alert("⚠️ No resolviste el déficit. Esto puede traer problemas al club en el futuro...");
  }
}
  ];

  // Elegir una aleatoria
  const pregunta = preguntasCrisis[Math.floor(Math.random() * preguntasCrisis.length)];
  const confirmar = confirm(pregunta.texto);
  if (confirmar) pregunta.si();
  else pregunta.no();
}







let campeonesCopaColombia = []; // Historial de campeones

// Función para mostrar modal en lugar de alert
function mostrarModal(mensaje) {
  return new Promise(resolve => {
    const modal = document.getElementById("modalCopa");
    const modalTexto = document.getElementById("modalTexto");
    const modalBtn = document.getElementById("modalBtn");

    modalTexto.textContent = mensaje;
    modal.style.display = "flex"; // Mostrar modal (flex para centrar)

    modalBtn.onclick = () => {
      modal.style.display = "none";
      resolve();
    };
  });
}

async function simularCopaColombiaNuevoFormato() {
  await mostrarModal("⚽ Copa Colombia: ¡Comienza el torneo nacional!");

  const mezclaPrimera = [...equiposPrimera];
  const mezclaSegunda = [...equiposSegunda.map(e => e.nombre)];
  shuffleArray(mezclaPrimera);
  shuffleArray(mezclaSegunda);

  // FASE 1 - Segunda + 4 de primera
  const fase1Primera = mezclaPrimera.slice(0, 4);
  const fase1Equipos = [...mezclaSegunda, ...fase1Primera]; // 20 equipos

  // FASE 2 - Resto de primera
  const fase2Equipos = mezclaPrimera.slice(4); // 16 equipos

  // FASE 1 - Grupos (4 de 5 equipos)
  const grupos = [[], [], [], []];
  shuffleArray(fase1Equipos);
  for (let i = 0; i < fase1Equipos.length; i++) {
    grupos[i % 4].push(fase1Equipos[i]);
  }

  const clasificadosFase1 = [];
  for (let index = 0; index < grupos.length; index++) {
    const grupo = grupos[index];
    const tabla = grupo.map(nombre => ({ nombre, pts: 0, gf: 0, gc: 0 }));

    for (let i = 0; i < grupo.length; i++) {
      for (let j = i + 1; j < grupo.length; j++) {
        const eq1 = grupo[i];
        const eq2 = grupo[j];
        const resultado = simularPartido(eq1, eq2);

        const e1 = tabla.find(t => t.nombre === eq1);
        const e2 = tabla.find(t => t.nombre === eq2);

        e1.gf += resultado.golesA;
        e1.gc += resultado.golesB;
        e2.gf += resultado.golesB;
        e2.gc += resultado.golesA;

        e1.pts += resultado.puntosA;
        e2.pts += resultado.puntosB;
      }
    }

    tabla.sort((a, b) => b.pts - a.pts || (b.gf - b.gc) - (a.gf - a.gc));
    clasificadosFase1.push(tabla[0].nombre, tabla[1].nombre);

    let texto = `📊 Grupo ${String.fromCharCode(65 + index)}\n`;
    tabla.forEach(t => {
      texto += `${t.nombre}: ${t.pts} pts, DG: ${t.gf - t.gc}\n`;
    });
    await mostrarModal(texto.trim());
  }

  // FASE 2 - Eliminatoria directa entre los 16 restantes de primera
  shuffleArray(fase2Equipos);
  const clasificadosFase2 = [];
  const textoF2 = [];

  for (let i = 0; i < fase2Equipos.length; i += 2) {
    const eq1 = fase2Equipos[i];
    const eq2 = fase2Equipos[i + 1];

    const ida = simularPartido(eq1, eq2);
    const vuelta = simularPartido(eq2, eq1);

    const total1 = ida.golesA + vuelta.golesB;
    const total2 = ida.golesB + vuelta.golesA;
    const ganador = total1 > total2 ? eq1 : total2 > total1 ? eq2 : (Math.random() < 0.5 ? eq1 : eq2);

    clasificadosFase2.push(ganador);

    textoF2.push(
      `${eq1} ${ida.golesA}-${ida.golesB} ${eq2} (Ida)\n` +
      `${eq2} ${vuelta.golesA}-${vuelta.golesB} ${eq1} (Vuelta)\n➡️ Pasa: ${ganador}`
    );
  }

  await mostrarModal("🧩 Fase 2 - Eliminatoria directa (1/2)\n\n" + textoF2.slice(0, 4).join("\n\n"));
  await mostrarModal("🧩 Fase 2 - Eliminatoria directa (2/2)\n\n" + textoF2.slice(4).join("\n\n"));

  // FASE 3 - Octavos de final
  const octavos = [...clasificadosFase1, ...clasificadosFase2];
  shuffleArray(octavos);
  const cuartofinalistas = [];
  const textoF3 = [];

  for (let i = 0; i < octavos.length; i += 2) {
    const eq1 = octavos[i];
    const eq2 = octavos[i + 1];
    const ida = simularPartido(eq1, eq2);
    const vuelta = simularPartido(eq2, eq1);
    const total1 = ida.golesA + vuelta.golesB;
    const total2 = ida.golesB + vuelta.golesA;
    const ganador = total1 > total2 ? eq1 : total2 > total1 ? eq2 : (Math.random() < 0.5 ? eq1 : eq2);
    cuartofinalistas.push(ganador);

    textoF3.push(
      `${eq1} ${ida.golesA}-${ida.golesB} ${eq2}\n` +
      `${eq2} ${vuelta.golesA}-${vuelta.golesB} ${eq1}\n➡️ Clasifica: ${ganador}`
    );
  }

  await mostrarModal("🔶 Fase 3 - Octavos (1/2)\n\n" + textoF3.slice(0, 4).join("\n\n"));
  await mostrarModal("🔶 Fase 3 - Octavos (2/2)\n\n" + textoF3.slice(4).join("\n\n"));

  // FASE FINAL - Cuartos, Semis y Final
  const avanzar = async (ronda, equipos) => {
    const ganadores = [];
    shuffleArray(equipos);
    let texto = `📅 ${ronda}\n`;
    for (let i = 0; i < equipos.length; i += 2) {
      const eq1 = equipos[i];
      const eq2 = equipos[i + 1];
      const ida = simularPartido(eq1, eq2);
      const vuelta = simularPartido(eq2, eq1);
      const total1 = ida.golesA + vuelta.golesB;
      const total2 = ida.golesB + vuelta.golesA;
      const ganador = total1 > total2 ? eq1 : total2 > total1 ? eq2 : (Math.random() < 0.5 ? eq1 : eq2);
      ganadores.push(ganador);
      texto += `\n${eq1} ${ida.golesA}-${ida.golesB} ${eq2} / ${eq2} ${vuelta.golesA}-${vuelta.golesB} ${eq1}\n➡️ ${ganador} clasifica\n`;
    }
    await mostrarModal(texto.trim());
    return ganadores;
  };

  const semifinalistas = await avanzar("Cuartos de final", cuartofinalistas);
  const finalistas = await avanzar("Semifinal", semifinalistas);
  const campeon = (await avanzar("🏆 Final", finalistas))[0];
  agregarTituloCopa(campeon);
  campeonesCopaColombia.push({ nombre: campeon, temporada: temporadaActual });
   actualizarHistorialCopa();

  if (campeon === equipoUsuario) {
    sumarPresupuesto(250000);
    await mostrarModal(`🎉 ¡Felicidades! ${campeon} es el campeón de la Copa Colombia\n💰 Recibes $250.000 de premio.`);
  } else {
    await mostrarModal(`🏆 ${campeon} es el campeón de la Copa Colombia`);
  }
}


// Mezclar array
function shuffleArray(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
}

function mostrarHistorialCopaColombia() {
  if (campeonesCopaColombia.length === 0) {
    alert("📜 Aún no hay campeones en la Copa Colombia.");
    return;
  }

  let texto = "🏆 Historial de Campeones Copa Colombia:\n\n";
  campeonesCopaColombia.forEach((c, i) => {
    texto += `Temporada ${c.temporada}: ${c.nombre}\n`;
  });
  alert(texto.trim());
}

function simularSuperliga() {
  const cont = document.getElementById("superliga");
  cont.innerHTML = ""; // limpiar antes

  const temporadaBase = temporadaActual - 1;
  const registro = campeonesLigaPorTemporada[temporadaBase];

  if (!registro || !registro.I || !registro.II) {
    cont.innerHTML = `<p>ℹ️ No hay datos completos de campeones ${temporadaBase} para disputar la Superliga.</p>`;
    return;
  }

  const eq1 = registro.I;
  const eq2 = registro.II;

  let html = `<h2>🏟️ Superliga ${temporadaBase}</h2>`;
  html += `<p><strong>${eq1}</strong> vs <strong>${eq2}</strong> (ida y vuelta)</p>`;

  const ida = simularPartido(eq1, eq2);    // eq1 local
  const vuelta = simularPartido(eq2, eq1); // eq2 local

  const total1 = ida.golesA + vuelta.golesB;
  const total2 = ida.golesB + vuelta.golesA;

  let ganador;
  if (total1 !== total2) {
    ganador = total1 > total2 ? eq1 : eq2;
  } else {
    ganador = Math.random() < 0.5 ? eq1 : eq2; // desempate simple
  }



  html += `
    <p>📄 Ida: ${eq1} ${ida.golesA}-${ida.golesB} ${eq2}</p>
    <p>📄 Vuelta:${eq2} ${vuelta.golesA}-${vuelta.golesB} ${eq1}</p>
    <p><strong>Global:</strong> ${total1} - ${total2}</p>
    <h3>🏆 Campeón Superliga ${temporadaBase}: ${ganador}</h3>
  `;

  cont.innerHTML = html;

  // Palmarés + historial
  agregarTituloSuperliga(ganador);
  campeonesSuperliga.push({ nombre: ganador, temporada: temporadaBase });
  actualizarHistorialSuperliga();

  // Premio opcional
  if (ganador === equipoUsuario) {
    sumarPresupuesto(200000);
    cont.innerHTML += `<p>💰 Premio Superliga para ${ganador}: $200.000</p>`;
  }
}


function mostrarPalmares() {
  const contenedor = document.getElementById("palmares");
  if (!contenedor) return; // seguridad, por si no existe
  contenedor.innerHTML = ""; // limpiar antes

  let equiposOrdenados = Object.entries(palmaresEquipos)
    .map(([nombre, { ligas, copas, superligas }]) => ({
      nombre,
      ligas,
      copas,
      superligas,
      total: ligas + copas + (superligas || 0)
    }))
    .sort((a, b) => b.total - a.total || b.ligas - a.ligas);

  let html = `<h2>🏆 Palmarés Histórico</h2>`;

  equiposOrdenados.forEach((equipo, i) => {
    const nombreLimpio = equipo.nombre
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/ /g, "_");

    const escudo = `<img src="escudos/${nombreLimpio}.png" alt="${equipo.nombre}" class="escudo" width="40">`;

  html += `
      <div class="card-palmares">
        <div class="header">
          <span class="posicion">#${i + 1}</span>
          ${escudo} <span class="nombre">${equipo.nombre}</span>
        </div>
        <div class="trofeos">
          <img src="trofeos/liga.png"  alt="Liga"      class="icono-trofeo"> <span>${equipo.ligas}</span>
          <img src="trofeos/copa.png"  alt="Copa"      class="icono-trofeo"> <span>${equipo.copas}</span>
          <img src="trofeos/super.png" alt="Superliga" class="icono-trofeo"> <span>${equipo.superligas}</span>
        </div>
      </div>
    `;
  });

  contenedor.innerHTML = html;
}


function penalizarPorNoPagarSueldos() {
  const plantilla = plantillasJugadores[equipoUsuario];
  if (plantilla && plantilla.length > 0) {
    plantilla.forEach(jugador => {
      modificarFuerzaEquipo(-10);
      jugador.media = Math.max(1, jugador.media - 5);
    });
    alert("⚠️ No pagaste los sueldos. Todos los jugadores de tu plantilla perdieron -10 de fuerza y -5 de media.");
  }
}


function descenso() {
  if (!descensoPendiente) {
    alert("⚠️ Debes simular al menos un semestre antes de hacer descenso.");
    return;
  }

  // ✅ Fin del semestre 1
  if (semestreActual < 2) {
    semestreActual++;
    preguntaAleatoria();
     simularMercadoFichajesNuevo() ;
    campeon1S = obtenerCampeonSemestre(); // Guardar campeón 1S
    alert("✅ Fin del semestre 1. Ahora puedes simular el segundo semestre.");
    simularCopaColombiaNuevoFormato();
   procesarSemestrePatrocinio();
    return;
    
  }


  // ✅ Fin de temporada (semestre 2)
  
  campeon2S = obtenerCampeonSemestre(); // Guardar campeón 2S
  procesarSemestrePatrocinio();

  // Calcular tabla anual
  let anual = Object.values(tablaAnual).map(e => ({
    ...e,
    pts: parseFloat((e.pts / 40).toFixed(3))
  }));
  anual.sort((a, b) => b.pts - a.pts || (b.gf - b.gc) - (a.gf - a.gc));
  mostrarTabla("tct", anual, `📉 Reclasificación - Descenso ${temporadaActual}`, false, [], true);

  let descendidos = anual.slice(-2).map(e => e.nombre);

  // ⚠️ Castigos por corrupción
  if (castigoPorCorrupcion) {
    alert(`🚨 ESCÁNDALO: ${castigoPorCorrupcion} fue sancionado por corrupción. -20M y -15 de media todos tus jugadores.`);
    if (castigoPorCorrupcion === equipoUsuario) {
      presupuestoVisible -= 20000000;
      actualizarPresupuestoHTML();
    } else {
      if (!presupuestosEquipos[castigoPorCorrupcion]) presupuestosEquipos[castigoPorCorrupcion] = 0;
      presupuestosEquipos[castigoPorCorrupcion] -= 20000000;
    }
    const plantilla = plantillasJugadores[castigoPorCorrupcion];
    if (plantilla) {
      plantilla.forEach(j => j.media = Math.max(1, j.media - 15));
    }
    castigoPorCorrupcion = null;
  }

  // ⚠️ Expulsión por deuda financiera
  if (alertaPresupuestoSinResolver) {
    alert("🚨 Tu equipo fue expulsado por deuda financiera.");
    const idx = anual.findIndex(e => e.nombre === equipoUsuario);
    if (idx !== -1) anual.splice(idx, 1);
    alert("📄 COMUNICADO DIMAYOR: Tu club perdió su ficha profesional.");
    location.reload();
    alertaPresupuestoSinResolver = false;
    return;
  }

  // 🔼 Sistema realista de ascenso FPC
  const {
    equiposQueAscienden,
    repechaje: repechajeResultado
  } = simularAscensoRealista();

  const ascendidos = equiposSegunda.filter(e =>
    equiposQueAscienden.includes(e.nombre)
  );

  // Mensaje final
  let mensajeFinal = `🔴 Descendieron: ${descendidos.join(", ")}` +
                     `\n🟢 Ascienden directamente: ${equiposQueAscienden.slice(0, 2).join(", ")}`;

  if (repechajeResultado) {
    mensajeFinal += `\n🎟️ Repechaje de Ascenso:` +
                    `\n  Ida: ${repechajeResultado.equipo1} ${repechajeResultado.resultadoIda} ${repechajeResultado.equipo2}` +
                    `\n  Vuelta: ${repechajeResultado.equipo2} ${repechajeResultado.resultadoVuelta} ${repechajeResultado.equipo1}` +
                    `\n  Global: ${repechajeResultado.resultadoGlobal}` +
                    `\n  Ganador: ${repechajeResultado.ganador}`;
  }

  alert(mensajeFinal);

  // Actualizar ligas
  equipos = equipos.filter(e => !descendidos.includes(e)).concat(equiposQueAscienden);
  equiposSegunda = equiposSegunda
    .filter(e => !equiposQueAscienden.includes(e.nombre))
    .concat(descendidos.map(nombre => ({ nombre, fuerza: 60 })));
    
     // 🔄 Sincronizar listas y fuerzas tras ascensos/descensos

// 1. Actualizar la lista de primera
equiposPrimera = [...equipos];

// 2. Limpiar fuerzas de descendidos
descendidos.forEach(nombre => {
  delete fuerzaEquipos[nombre];
});

// 3. Asignar fuerza inicial a los ascendidos si no la tienen
equiposQueAscienden.forEach(nombre => {
  if (!fuerzaEquipos[nombre]) {
    fuerzaEquipos[nombre] = 62; // fuerza base para los recién ascendidos
  }
});

  // Sumar 1.5M al presupuesto del equipo del usuario
const montoDerechosTV = 1500000;

if (!presupuestosEquipos[equipoUsuario]) {
  presupuestosEquipos[equipoUsuario] = 0;
}

presupuestosEquipos[equipoUsuario] += montoDerechosTV;
sumarPresupuesto(montoDerechosTV);
alert("📺 Derechos de TV pagados + 1.5M");


// Sueldos semestrales (solo usuario)
let sueldoSemestral;
if (equiposPrimera.includes(equipoUsuario)) {
  sueldoSemestral = 5000000; // Primera A
} else {
  sueldoSemestral = 2000000; // Segunda
}

// Preguntar al usuario si quiere pagar
const quierePagar = confirm(`¿Deseas pagar los sueldos de la plantilla de ${equipoUsuario} por $${sueldoSemestral.toLocaleString()}?`);

if (quierePagar) {
  if (presupuestoVisible >= sueldoSemestral) {
    restarPresupuesto(sueldoSemestral);
    alert(`💵 Sueldos del 2do semestre pagados: $${sueldoSemestral.toLocaleString()} a la plantilla de ${equipoUsuario}.`);
  } else {
    alert("❌ No tienes suficiente presupuesto para pagar los sueldos. Se aplicará la penalización.");
    penalizarPorNoPagarSueldos();
  }
} else {
  penalizarPorNoPagarSueldos();
}


  // 🧹 Reset
  semestreActual = 1;
  temporadaActual++;
  tablaAnual = {};
  descensoPendiente = false;
  preguntaHechaEstaTemporada = false;

  // Limpieza
  resetearVistacu();
  resetearVistafi();
  procesarRetirosYAltas();
  simularMercadoFichajesNuevo() ;
  actualizarFuerzaUI()
  evaluarMoralHinchada();
  verificarEleccionesPresidenciales();
  presupuestoNegativoDetectado = false;

  // Castigo por corrupción al debutar
  if (decisionCorrupcionDebut) {
    alert("🚨 ESCÁNDALO: Aceptaste soborno para hacer debutar un jugador.");
    alert("📉 Has sido despedido como presidente.");
    location.reload();
    decisionCorrupcionDebut = false;
  }
}



function simularCuadrangulares() {
  const clasificados = tabla.slice(0, 8);
  grupos.A = [];
  grupos.B = [];

  clasificados.forEach((equipo, i) => {
    if (i % 2 === 0) grupos.A.push(equipo);
    else grupos.B.push(equipo);
  });

  let resultados = {};
  let partidosGrupos = { A: [], B: [] };

  const calendario = [
    [[0, 1], [2, 3]], // Fecha 1
    [[2, 0], [3, 1]], // Fecha 2
    [[1, 2], [3, 0]], // Fecha 3
    [[1, 0], [3, 2]], // Fecha 4
    [[0, 2], [1, 3]], // Fecha 5
    [[2, 1], [0, 3]]  // Fecha 6
  ];

  ["A", "B"].forEach(g => {
    const grupo = grupos[g];
    resultados[g] = grupo.map(e => ({
      nombre: e.nombre, pts: 0, gf: 0, gc: 0, pj: 0
    }));

    calendario.forEach((fechaPartidos, fechaIndex) => {
      let texto = `📅 Fecha ${fechaIndex + 1} - Grupo ${g}\n`;

      fechaPartidos.forEach(([localIdx, visitaIdx]) => {
        const equipoLocal = grupo[localIdx].nombre;
        const equipoVisita = grupo[visitaIdx].nombre;

        const idxLocal = resultados[g].findIndex(e => e.nombre === equipoLocal);
        const idxVisita = resultados[g].findIndex(e => e.nombre === equipoVisita);

        const partido = simularPartido(equipoLocal, equipoVisita);

        resultados[g][idxLocal].pts += partido.puntosA;
        resultados[g][idxLocal].gf += partido.golesA;
        resultados[g][idxLocal].gc += partido.golesB;
        resultados[g][idxLocal].pj += 1;

        resultados[g][idxVisita].pts += partido.puntosB;
        resultados[g][idxVisita].gf += partido.golesB;
        resultados[g][idxVisita].gc += partido.golesA;
        resultados[g][idxVisita].pj += 1;

        partidosGrupos[g].push({
          fecha: fechaIndex + 1,
          local: equipoLocal,
          visitante: equipoVisita,
          golesLocal: partido.golesA,
          golesVisitante: partido.golesB
        });

        texto += `${equipoLocal} ${partido.golesA} - ${partido.golesB} ${equipoVisita}\n`;
      });

      alert(texto.trim());
    });

    resultados[g].sort((a, b) => b.pts - a.pts || (b.gf - b.gc) - (a.gf - a.gc));
  });

  finalistas = [resultados.A[0], resultados.B[0]];

  document.getElementById("cuadrangulares").innerHTML = `
    <div class="grupos-container">
      <div class="grupo" id="grupoA"></div>
      <div class="grupo" id="grupoB"></div>
    </div>
  `;

  mostrarTabla("grupoA", resultados.A, "Grupo A", false, [resultados.A[0].nombre], false);
  mostrarTabla("grupoB", resultados.B, "Grupo B", false, [resultados.B[0].nombre], false);

  mostrarPartidos("grupoA", partidosGrupos.A);
  mostrarPartidos("grupoB", partidosGrupos.B);
}


function mostrarPartidos(id, partidos) {
  const contenedor = document.getElementById(id);

  // Agrupar partidos por fecha
  const fechas = {};
  partidos.forEach(p => {
    if (!fechas[p.fecha]) fechas[p.fecha] = [];
    fechas[p.fecha].push(p);
  });

  let html = "<h4 style='margin-top:10px;'>Resultados por Fecha:</h4>";
  for (let i = 1; i <= 6; i++) {
    if (!fechas[i]) continue;
    html += `<div class="fecha"><strong>Fecha ${i}:</strong><ul>`;
    fechas[i].forEach(p => {
      html += `<li>${p.local} ${p.golesLocal} - ${p.golesVisitante} ${p.visitante}</li>`;
    });
    html += `</ul></div>`;
  }

  contenedor.innerHTML += html;

  resetearVistatct();
}


function simularFinal() {
  const [equipo1, equipo2] = finalistas;
  const ida = simularPartido(equipo1.nombre, equipo2.nombre);
  const vuelta = simularPartido(equipo2.nombre, equipo1.nombre);

  const goles1 = ida.golesA + vuelta.golesB;
  const goles2 = ida.golesB + vuelta.golesA;
  const campeon = goles1 > goles2 ? equipo1.nombre : equipo2.nombre;
  
   // Registrar campeón por semestre para la Superliga
if (!campeonesLigaPorTemporada[temporadaActual]) {
  campeonesLigaPorTemporada[temporadaActual] = { I: null, II: null };
}
const tagSem = semestreActual === 1 ? "I" : "II";
campeonesLigaPorTemporada[temporadaActual][tagSem] = campeon;


  agregarTituloLiga(campeon);

    
  if (campeon === equipoUsuario) {
    sumarPresupuesto(500000);
    alert(`🎉 ¡Felicidades! ${campeon} es el campeón de liga\n💰 Recibes $500.000 de premio.`);
  } /*else {
    alert(`🏆 ${campeon} es el campeón de la Copa Colombia`);
  }
*/


  // 馃攰 Reproducir audio personalizado por equipo campe贸n
 const audiosPorEquipo = {
  "millonarios": "audios/millonarios.mp3",
  "santa fe": "audios/santafe.mp3",
  "nacional": "audios/nacional.mp3",
  "america": "audios/america.mp3",
  "cali": "audios/cali.mp3",
  "junior": "audios/junior.mp3",
  "medellin": "audios/dim.mp3",
  "tolima": "audios/tolima.wav",
  "bucaramanga": "audios/bucaramanga.mp3",
  "once caldas": "audios/oncecaldas.mp3",
  "pereira": "audios/pereira.mp3",
  "chico": "audios/chico.mp3",
  "pasto": "audios/pasto.mp3",
  "quindio": "audios/cucuta.mp3",
  // Agrega más equipos...
};

// normaliza el nombre del campeón
const claveAudio = campeon
  .toLowerCase()
  .normalize("NFD")
  .replace(/[\u0300-\u036f]/g, "");

// si no existe, usa un audio default
const rutaAudio = audiosPorEquipo[claveAudio] || "audios/winner.mp3";

const audio = new Audio(rutaAudio);
audio.play();

/*
  const audiosPorEquipo = {
    "millonarios": "audios/millonarios.wav",
    "santa fe": "audios/santafe.wav",
    "nacional": "audios/nacional.wav",
    "america": "audios/america.wav",
    "cali": "audios/cali.wav",
    "junior": "audios/junior.wav",
    "medellin": "audios/dim.wav",
    "tolima": "audios/tolima.wav",
    "bucaramanga": "audios/bucaramanga.wav",
    "once caldas": "audios/oncecaldas.wav",
    "pereira": "audios/pereira.wav",
    "chico": "audios/chico.wav",
    "pasto": "audios/pasto.wav",
    "quindio": "audios/quindio.wav",
    // Agrega mas equipos segun tus audios
  };

  const claveAudio = campeon.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  if (audiosPorEquipo[claveAudio]) {
    const audio = new Audio(audiosPorEquipo[claveAudio]);
    audio.play();
  }
*/

  alert(`🎉 La DIMAYOR felicita al Club: ${campeon} por ser campeón 🥇⭐`);

  const sufijoSemestre = semestreActual === 1 ? "I" : "II";
  campeones.push(`🏆 ${temporadaActual}-${sufijoSemestre}: ${campeon}`);


  if (campeon === equipoUsuario) {
    ligasGanadasPorUsuario++;
    document.getElementById("titulos").innerText = `Titulo ganados: ${ligasGanadasPorUsuario}`;

    if (ligasGanadasPorUsuario === 13) {
      alert("🎉 🏆Felicidades! Has ganado 13 titulos y recibes el premio Gabriel Ochoa Uribe");
    }
  }

  // 馃弳 Verificar t铆tulos consecutivos de cualquier equipo
  if (campeon === ultimoCampeon) {
    equiposConsecutivos[campeon] = (equiposConsecutivos[campeon] || 1) + 1;
  } else {
    equiposConsecutivos[campeon] = 1;
  }

  // 馃摙 Alertas por racha consecutiva
  switch (equiposConsecutivos[campeon]) {
    case 2:
      alert(`🚨 ¡${campeon} es Bicampeón! 🏆🏆`);
      break;
    case 3:
      alert(`🚨 ¡${campeon} es Tricampeón! 🏆🏆🏆`);
      break;
    case 4:
      alert(`🚨 ¡${campeon} es Tetracampeón! 🏆🏆🏆🏆`);
      break;
    case 5:
      alert(`🚨 ¡${campeon} es Pentacampeon! 🏆🏆🏆🏆🏆`);
      break;
  }

  ultimoCampeon = campeon;



  actualizarHistorial();

  function obtenerEscudo(nombre) {
    const nombreLimpio = nombre.toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/ /g, "_");
    return `<img src="escudos/${nombreLimpio}.png" alt="${nombre}" class="escudo">`;
  }

  const escudo1 = obtenerEscudo(equipo1.nombre);
  const escudo2 = obtenerEscudo(equipo2.nombre);
  const escudoCampeon = obtenerEscudo(campeon);

  document.getElementById("final").innerHTML = `
    <h2>Final</h2>
    <p>${escudo1} ${equipo1.nombre} ${ida.golesA} - ${ida.golesB} ${equipo2.nombre} ${escudo2} (IDA)</p>
    <p>${escudo2} ${equipo2.nombre} ${vuelta.golesA} - ${vuelta.golesB} ${equipo1.nombre} ${escudo1} (VUELTA)</p>
    <h3>🏆⭐ Campeón: ${escudoCampeon} ${campeon}</h3>
  `;
   
actualizarBuzon()
evaluarMoralHinchada();
   
}


// ==========================
// 📌 TORNEO DE LA B
// ==========================
let campeonB1S = {};
let campeonB2S = {};

function simularTorneoB(semestre) {
 if (!equipoUsuario) {
    alert("⚠️ Debes seleccionar un equipo antes de iniciar la simulación.");
    return;
  }

   document.getElementById("playoffs").innerHTML = "";
   resetearVista();
   
  // Tabla inicial
  let tablaB = equiposSegunda.map(e => ({
    nombre: e.nombre,
    pts: 0, gf: 0, gc: 0
  }));

  // Round robin (ida simple)
  for (let i = 0; i < equiposSegunda.length; i++) {
    for (let j = i + 1; j < equiposSegunda.length; j++) {
      const local = equiposSegunda[i].nombre;
      const visita = equiposSegunda[j].nombre;
      const resultado = simularPartido(local, visita);

      let eqLocal = tablaB.find(t => t.nombre === local);
      let eqVisita = tablaB.find(t => t.nombre === visita);

      eqLocal.pts += resultado.puntosA;
      eqLocal.gf += resultado.golesA;
      eqLocal.gc += resultado.golesB;

      eqVisita.pts += resultado.puntosB;
      eqVisita.gf += resultado.golesB;
      eqVisita.gc += resultado.golesA;
    }
  }

  // Ordenar
  tablaB.sort((a, b) => b.pts - a.pts || (b.gf - b.gc) - (a.gf - a.gc));

  // Mostrar tabla del semestre en pantalla
  mostrarTabla("tablaB", tablaB, `📊 Primera B - Semestre ${semestre} (${temporadaActual})`, true);

  // Clasificados a cuadrangulares
  const clasificados = tablaB.slice(0, 8);

  // Simular cuadrangulares
  const campeon = simularCuadrangularesB(clasificados);

  // Guardar campeón según semestre
  if (semestre === 1) {
    campeonB1S[temporadaActual] = campeon;
  } else {
    campeonB2S[temporadaActual] = campeon;
  }
   actualizarHistorialB();
  alert(`🏆 Campeón Primera B - Semestre ${semestre}: ${campeon}`);
 
if (semestre === 1) {
  tablaB1 = tablaB;
} else {
  tablaB2 = tablaB;
}

  return campeon;
}

// ==========================
// 📌 CUADRANGULARES DE LA B
// ==========================
function simularCuadrangularesB(clasificados) {
  let gruposB = { A: [], B: [] };
  clasificados.forEach((equipo, i) => {
    if (i % 2 === 0) gruposB.A.push(equipo);
    else gruposB.B.push(equipo);
  });

  const calendario = [
    [[0, 1], [2, 3]],
    [[2, 0], [3, 1]],
    [[1, 2], [3, 0]],
    [[1, 0], [3, 2]],
    [[0, 2], [1, 3]],
    [[2, 1], [0, 3]]
  ];

  let resultados = { A: [], B: [] };

  ["A", "B"].forEach(g => {
    const grupo = gruposB[g];
    resultados[g] = grupo.map(e => ({
      nombre: e.nombre, pts: 0, gf: 0, gc: 0
    }));

    calendario.forEach(partidos => {
      partidos.forEach(([localIdx, visitaIdx]) => {
        const equipoLocal = grupo[localIdx].nombre;
        const equipoVisita = grupo[visitaIdx].nombre;

        const idxLocal = resultados[g].findIndex(e => e.nombre === equipoLocal);
        const idxVisita = resultados[g].findIndex(e => e.nombre === equipoVisita);

        const partido = simularPartido(equipoLocal, equipoVisita);

        resultados[g][idxLocal].pts += partido.puntosA;
        resultados[g][idxLocal].gf += partido.golesA;
        resultados[g][idxLocal].gc += partido.golesB;

        resultados[g][idxVisita].pts += partido.puntosB;
        resultados[g][idxVisita].gf += partido.golesB;
        resultados[g][idxVisita].gc += partido.golesA;
      });
    });

    resultados[g].sort((a, b) => b.pts - a.pts || (b.gf - b.gc) - (a.gf - a.gc));
  });

  // Finalistas
  const finalistasB = [resultados.A[0], resultados.B[0]];

  // Mostrar cuadrangulares en pantalla
   mostrarTabla("cuadrangularesB_A", resultados.A, "📊 Grupo A - Cuadrangulares B", false, [resultados.A[0].nombre]);
   mostrarTabla("cuadrangularesB_B", resultados.B, "📊 Grupo B - Cuadrangulares B", false, [resultados.B[0].nombre]);
/*
  document.getElementById("cuadrangularesB").innerHTML = `
    <h3>⚔️ Cuadrangulares - Primera B</h3>

    <div style="display:flex; gap:20px;">
      <div>${mostrarTablaHTML(resultados.A, "Grupo A")}</div>
      <div>${mostrarTablaHTML(resultados.B, "Grupo B")}</div>
    </div>
  `;
*/
  return simularFinalB(finalistasB);
}

// ==========================
// 📌 FINAL DE LA B
// ==========================
function simularFinalB(finalistas) {
  const [equipo1, equipo2] = finalistas;
  const ida = simularPartido(equipo1.nombre, equipo2.nombre);
  const vuelta = simularPartido(equipo2.nombre, equipo1.nombre);

  const goles1 = ida.golesA + vuelta.golesB;
  const goles2 = ida.golesB + vuelta.golesA;

  let campeon;
  if (goles1 > goles2) campeon = equipo1.nombre;
  else if (goles2 > goles1) campeon = equipo2.nombre;
  else campeon = Math.random() < 0.5 ? equipo1.nombre : equipo2.nombre;


  function obtenerEscudo(nombre) {
    const nombreLimpio = nombre.toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/ /g, "_");
    return `<img src="escudos/${nombreLimpio}.png" alt="${nombre}" class="escudo">`;
  }

  const escudo1 = obtenerEscudo(equipo1.nombre);
  const escudo2 = obtenerEscudo(equipo2.nombre);
  const escudoCampeon = obtenerEscudo(campeon);


  // Mostrar en pantalla
  document.getElementById("finalB").innerHTML = `
    <h3>🏆 Final - Primera B</h3>
    <p>${escudo1} ${equipo1.nombre} ${ida.golesA}-${ida.golesB} ${equipo2.nombre}${escudo2} (Ida)</p>
    <p>${escudo2} ${equipo2.nombre} ${vuelta.golesA}-${vuelta.golesB} ${equipo1.nombre}${escudo1} (Vuelta)</p>
    <h4>⭐ Campeón: ${escudoCampeon} ${campeon}</h4>
  `;

  return campeon;

}

function mostrarTablaHTML(tabla, titulo) {
  let html = `<h4>${titulo}</h4><table border="1"><tr><th>Equipo</th><th>Pts</th><th>GF</th><th>GC</th></tr>`;
  tabla.forEach(t => {
    html += `<tr><td>${t.nombre}</td><td>${t.pts}</td><td>${t.gf}</td><td>${t.gc}</td></tr>`;
  });
  html += `</table>`;
  return html;
}

// ==========================
// 📌 ASCENSO REALISTA ACTUALIZADO
// ==========================
function simularAscensoRealista() {
  // Campeones de semestre ya simulados
  const campeon1S = campeonB1S[temporadaActual] || simularTorneoB(1);
  const campeon2S = campeonB2S[temporadaActual] || simularTorneoB(2);

  // 📊 Obtener tabla anual real sumando semestres
  let tablaAscenso = obtenerTablaAnualB();
  const tablaOrdenada = tablaAscenso.map(e => e.nombre);
  const top1 = tablaOrdenada[0];
  const top2 = tablaOrdenada[1];

  let equiposQueAscienden = [];
  let repechajeResultado = null;

  // ⚽ Lógica de ascenso
  if (campeon1S === campeon2S) {
    equiposQueAscienden.push(campeon1S);
    const [r1, r2] = tablaOrdenada.filter(e => e !== campeon1S);
    repechajeResultado = simularPartidoIdaVuelta(r1, r2);
    equiposQueAscienden.push(repechajeResultado.ganador);

  } else if ((campeon1S === top1 || campeon1S === top2) && (campeon2S === top1 || campeon2S === top2)) {
    equiposQueAscienden.push(campeon1S, campeon2S);

  } else if ((campeon1S === top1 || campeon1S === top2) || (campeon2S === top1 || campeon2S === top2)) {
    const ascendidoDirecto = (campeon1S === top1 || campeon1S === top2) ? campeon1S : campeon2S;
    const otroCampeon = ascendidoDirecto === campeon1S ? campeon2S : campeon1S;
    equiposQueAscienden.push(ascendidoDirecto);

    const mejorNoCampeon = tablaOrdenada.find(e => e !== campeon1S && e !== campeon2S);
    repechajeResultado = simularPartidoIdaVuelta(otroCampeon, mejorNoCampeon);
    equiposQueAscienden.push(repechajeResultado.ganador);

  } else {
    const final = simularPartidoIdaVuelta(campeon1S, campeon2S);
    const ganadorFinal = final.ganador;
    const perdedorFinal = ganadorFinal === campeon1S ? campeon2S : campeon1S;
    equiposQueAscienden.push(ganadorFinal);

    const mejorTabla = tablaOrdenada.find(e => e !== campeon1S && e !== campeon2S);
    repechajeResultado = simularPartidoIdaVuelta(perdedorFinal, mejorTabla);
    equiposQueAscienden.push(repechajeResultado.ganador);
  }

  // 📊 Mostrar en pantalla la tabla anual de la B
  mostrarTabla("segunda", tablaAscenso, `📊 Primera B - Reclasificación - ${temporadaActual}`, false, equiposQueAscienden);

  return { tablaAscenso, equiposQueAscienden, repechaje: repechajeResultado };
}


let tablaB1 = [];
let tablaB2 = [];

function obtenerTablaAnualB() {
  let anual = {};

  [tablaB1, tablaB2].forEach(tabla => {
    tabla.forEach(e => {
      if (!anual[e.nombre]) {
        anual[e.nombre] = { nombre: e.nombre, pts: 0, gf: 0, gc: 0 };
      }
      anual[e.nombre].pts += e.pts;
      anual[e.nombre].gf += e.gf;
      anual[e.nombre].gc += e.gc;
    });
  });

  return Object.values(anual).sort((a, b) => 
    b.pts - a.pts || (b.gf - b.gc) - (a.gf - a.gc)
  );
}








function simularPartidoIdaVuelta(equipo1, equipo2) {
  const ida = simularPartido(equipo1, equipo2); // equipo1 local
  const vuelta = simularPartido(equipo2, equipo1); // equipo2 local

  const goles1 = ida.golesA + vuelta.golesB;
  const goles2 = ida.golesB + vuelta.golesA;
  const golesVisita1 = vuelta.golesB;
  const golesVisita2 = ida.golesB;

  let ganador;
  if (goles1 > goles2) {
    ganador = equipo1;
  } else if (goles2 > goles1) {
    ganador = equipo2;
  } else {
    if (golesVisita1 > golesVisita2) {
      ganador = equipo1;
    } else if (golesVisita2 > golesVisita1) {
      ganador = equipo2;
    } else {
      ganador = Math.random() < 0.5 ? equipo1 : equipo2;
    }
  }

  return {
    equipo1,
    equipo2,
    resultadoIda: `${ida.golesA} - ${ida.golesB}`,
    resultadoVuelta: `${vuelta.golesA} - ${vuelta.golesB}`,
    resultadoGlobal: `${goles1} - ${goles2}`,
    ganador
  };
}

function obtenerCampeonSemestre(semestre) {
  const pesos = [0.32, 0.16, 0.14, 0.13, 0.13, 0.12]; // pesos por posición 1–6
  const acumulado = pesos.map((p, i) => pesos.slice(0, i + 1).reduce((a, b) => a + b));

  const r = Math.random();
  let index = acumulado.findIndex(p => r <= p);
  if (index === -1) index = 0; // seguridad

  return equiposSegunda[index].nombre;
}

function procesarRetirosYAltas() {
  const posiciones = ["Defensa", "Volante", "Delantero", "Pivote"];
  
  const nombres = [
  // 🇨🇴 Colombianos
  "Gómez", "Rodríguez", "Martínez", "López", "Pérez", "Ramírez", "Moreno", "Romero",
  "Hernández", "Vargas", "Jiménez", "Torres", "Silva", "Ruiz", "Mendoza", "Delgado",
  "Serrano", "Navarro", "Ortega", "Aguilar", "Suárez", "Peña", "Flores", "Campos",
  "Herrera", "García", "Fernández", "Sánchez", "Álvarez", "Molina", "Montoya", 
  "Blanco", "Ibarra", "Castaño", "Mosquera", "Murillo", "Valencia", "Córdoba", 
  "Palacios", "Rincón", "Cuesta", "Mejía", "Pardo", "Angulo", "Arboleda", "Castro",
  "Zapata", "Arias", "Bermúdez", "Chávez", "Forero", "Gallego", "Guerrero", "León",
  "Marín", "Montero", "Nieto", "Parra", "Quintero", "Reyes", "Salazar", "Urbina",
  "Velásquez", "Quiñones", "Bonilla", "Pineda",

  // 🌎 Extranjeros comunes (sin cracks reales)
  // Argentina / Uruguay
  "Fernández", "González", "Martínez", "Domínguez", "Pereyra", "Cáceres", "Varela",
  "Suárez", "Peralta", "Sosa", "Benítez", "Ortega", "Maldonado", "Caballero",
  // Brasil
  "Silva", "Souza", "Oliveira", "Lima", "Ferreira", "Carvalho", "Santana", "Barbosa",
  "Correia", "Nogueira", "Cardoso", "Mendes", "Teixeira", "Pinto",
  // Italia / España / Portugal
  "Rossi", "Bianchi", "Romano", "Moretti", "Costa", "Vieira", "Torres", "López",
  "Santos", "Fonseca", "Machado", "Pereira", "Gomes", "Almeida",
  // Francia
  "Dubois", "Laurent", "Moreau", "Simon", "Mercier", "Garcia", "Martel", "Blanc",
  // África francófona
  "Diop", "Traoré", "Diallo", "Koné", "Cissé", "Sow", "Keita", "Fofana"
];

  const nombresCortos = [
  // 🇨🇴 Colombianos
  "Juan", "Luis", "Carlos", "Andrés", "Mateo", "Sebastián", "Camilo", "Santiago", 
  "Tomás", "Esteban", "Lucas", "Emilio", "Iván", "Fernando", "Mario", "Julián",
  "Samuel", "David", "Miguel", "José", "Antonio", "Eduardo", "Francisco", "Felipe",
  "Cristian", "Edwin", "Jhon", "Jeison", "Yeferson", "Yimmi", "Yairo", "Fredy",
  "Oscar", "Harold", "Kevin", "Brayan", "Johan", "Darwin", "Duván", "Anderson",
  "Wilson", "Héctor", "Nelson", "Ángel", "Fabián", "Wilmar", "James", "Radamel",
  "Teófilo", "Ómar", "Leonardo", "Álvaro",

  // 🌎 Extranjeros comunes (sin nombres de cracks)
  "Diego", "Gonzalo", "Pablo", "Martín", "Nahuel", "Matías", "Lautaro", "Agustín", // Argentina
  "Thiago", "Rafael", "Bruno", "Pedro", "Luiz", "João", "Rodrigo", "Marcos",       // Brasil
  "Facundo", "Nicolás", "Enzo", "Maximiliano", "Franco", "Ezequiel", "Germán",     // Uruguay
  "Marco", "Giovanni", "Alessandro", "Francesco", "Paolo", "Antonio", "Salvatore", // Italia
  "Pierre", "Lucas", "Julien", "Antoine", "Hugo", "Adrien", "Mathieu",             // Francia
  "Ousmane", "Moussa", "Mamadou", "Souleymane", "Idrissa", "Didier", "Emmanuel"    // África francófona
];

  // 👉 Listas globales
  let retirosTotales = [];
  let canteranosPorEquipo = {}; // { equipo: cantidad }

  for (const equipo in plantillasJugadores) {
    let plantilla = plantillasJugadores[equipo];
    let porteroReemplazado = false;
    let nuevosCanteranos = 0; // contador local por equipo

    // ✅ Procesar retiros
    plantilla = plantilla.map(jugador => {
      jugador.edad += 1;
      const probRetiro = calcularProbabilidadRetiro(jugador.edad);
      if (Math.random() < probRetiro) {
        if (jugador.posicion.toLowerCase() === "portero") {
          porteroReemplazado = true;
        }
        retirosTotales.push(`👴 ${jugador.nombre} (${jugador.posicion}, ${jugador.edad}) se retira de ${equipo}`);
        return null;
      }
      return jugador;
    }).filter(j => j !== null);

    // ✅ Verificar si queda portero
    const tienePortero = plantilla.some(j => j.posicion.toLowerCase() === "portero");
    if (!tienePortero || porteroReemplazado) {
      const nuevoPortero = generarJugador("Portero", nombresCortos, nombres);
      plantilla.push(nuevoPortero);
      nuevosCanteranos++;
    }

    // ✅ Rellenar hasta 18 jugadores
    while (plantilla.length < 18) {
      const nuevo = generarJugador(null, nombresCortos, nombres);
      plantilla.push(nuevo);
      nuevosCanteranos++;
    }

    // Guardar la cuenta de canteranos ascendidos por equipo
    if (nuevosCanteranos > 0) {
      if (!canteranosPorEquipo[equipo]) {
        canteranosPorEquipo[equipo] = 0;
      }
      canteranosPorEquipo[equipo] += nuevosCanteranos;
    }

    plantillasJugadores[equipo] = plantilla;
  }

  // 🆕 Construir mensaje unificado
  let mensajeFinal = "";

  if (retirosTotales.length > 0) {
    mensajeFinal += "📋 Retiros:\n" + retirosTotales.join("\n") + "\n\n";
  }

  const equiposCanteranos = Object.keys(canteranosPorEquipo);
  if (equiposCanteranos.length > 0) {
    mensajeFinal += "🌱 Canteranos ascendidos:\n";
    equiposCanteranos.forEach(eq => {
      mensajeFinal += `${eq} (${canteranosPorEquipo[eq]}),`;
    });
  }

  if (mensajeFinal !== "") {
    notificacionPendiente = mensajeFinal.trim();
    mensajesPendientes++;
    actualizarBuzon();
  }
}

// Probabilidad de retiro según edad
function calcularProbabilidadRetiro(edad) {
  if (edad < 34) return 0;
  if (edad === 34) return 0;
  if (edad === 35) return 0.01;
  if (edad === 36) return 0.02;
  if (edad === 37) return 0.05;
  if (edad === 38) return 0.07;
  if (edad === 39) return 0.10;
  if (edad >= 40 && edad < 43) return 0.15;
  if (edad >= 43 && edad < 46) return 0.30;
  if (edad >= 46 && edad < 50) return 0.50;
  if (edad >= 50) return 1.0; // 100% chance de retiro
}


// Genera un jugador aleatorio
function generarJugador(posicionFija, nombresCortos, nombres) {
  const posiciones = ["Defensa", "Volante", "Delantero", "Pivote"];

  // 🎲 Decidir nacionalidad con pesos
  const prob = Math.random();
  let nombrePropio, apellido;

  if (prob < 0.7) {
    // 70% Colombiano
    nombrePropio = nombresCortos[Math.floor(Math.random() * 54)]; // primeros 54 = colombianos
    apellido = nombres[Math.floor(Math.random() * 70)];           // primeros 70 = colombianos
  } else if (prob < 0.9) {
    // 20% Sudamericano extra (Argentina, Uruguay, Brasil)
    nombrePropio = nombresCortos[54 + Math.floor(Math.random() * 20)];
    apellido = nombres[70 + Math.floor(Math.random() * 30)];
  } else {
    // 10% Europeo / Africano
    nombrePropio = nombresCortos[74 + Math.floor(Math.random() * 20)];
    apellido = nombres[100 + Math.floor(Math.random() * 20)];
  }

  const nombre = `${nombrePropio} ${apellido}`;
  const edad = Math.floor(Math.random() * 5) + 18;

  // 🎯 Chance de ser promesa
  const r = Math.random();
  let media;
  let esPromesa = false;

  if (r < 0.03) {
    // 3% -> Promesa élite
    media = Math.floor(Math.random() * 6) + 77; // 77–82
    esPromesa = true;
  } else if (r < 0.075) {
    // 4.5% -> Promesa común
    media = Math.floor(Math.random() * 5) + 70; // 70–74
    esPromesa = true;
  } else {
    // 92.5% -> Jugador normal
    media = Math.floor(Math.random() * 10) + 58; // 58–67
  }

  const posicion = posicionFija || posiciones[Math.floor(Math.random() * posiciones.length)];

  return {
    nombre,
    edad,
    media,
    posicion,
    promesa: esPromesa
  };
}


function actualizarHistorial() {
  const lista = document.getElementById("listaHistorial");
  lista.innerHTML = "";

  campeones.forEach(c => {
    // Extraemos el nombre del campe贸n
    const partes = c.split(": ");
    const temporada = partes[0];
    const nombreCampeon = partes[1];

    const nombreLimpio = nombreCampeon.toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/ /g, "_");

    const escudo = `<img src="escudos/${nombreLimpio}.png" alt="${nombreCampeon}" class="escudo">`;

    const li = document.createElement("li");
    li.innerHTML = `${temporada}: ${escudo} ${nombreCampeon}`;
    lista.appendChild(li);
  });
}

// 📜 Historial Copa Colombia
function actualizarHistorialCopa() {
  const lista = document.getElementById("listaHistorialcopa");
  lista.innerHTML = "";

  campeonesCopaColombia.forEach(c => {
    const nombreLimpio = c.nombre.toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/ /g, "_");

    const escudo = `<img src="escudos/${nombreLimpio}.png" alt="${c.nombre}" class="escudo">`;

    const li = document.createElement("li");
    li.innerHTML = `${c.temporada}: ${escudo} ${c.nombre}`;
    lista.appendChild(li);
  });
}

// 📜 Historial Superliga
function actualizarHistorialSuperliga() {
  const lista = document.getElementById("listaHistorialsuper");
  lista.innerHTML = "";

  campeonesSuperliga.forEach(c => {
    const nombreLimpio = c.nombre.toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/ /g, "_");

    const escudo = `<img src="escudos/${nombreLimpio}.png" alt="${c.nombre}" class="escudo">`;

    const li = document.createElement("li");
    li.innerHTML = `${c.temporada}: ${escudo} ${c.nombre}`;
    lista.appendChild(li);
  });
}

// ==========================
// 📜 HISTORIAL PRIMERA B
// ==========================
function actualizarHistorialB() {
  const lista = document.getElementById("listaHistorialB");
  lista.innerHTML = "";

  // Unimos todas las temporadas que tengan campeones en I o II
  const temporadas = new Set([
    ...Object.keys(campeonB1S),
    ...Object.keys(campeonB2S)
  ]);

  // Ordenamos las temporadas de menor a mayor
  const ordenadas = Array.from(temporadas).sort((a, b) => a - b);

  ordenadas.forEach(temp => {
    const campeon1 = campeonB1S[temp];
    const campeon2 = campeonB2S[temp];

    if (campeon1) {
      const nombreLimpio = campeon1.toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/ /g, "_");
      const escudo = `<img src="escudos/${nombreLimpio}.png" alt="${campeon1}" class="escudo">`;

      const li = document.createElement("li");
      li.innerHTML = `🏆 ${temp}-I: ${escudo} ${campeon1}`;
      lista.appendChild(li);
    }

    if (campeon2) {
      const nombreLimpio = campeon2.toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/ /g, "_");
      const escudo = `<img src="escudos/${nombreLimpio}.png" alt="${campeon2}" class="escudo">`;

      const li = document.createElement("li");
      li.innerHTML = `🏆 ${temp}-II: ${escudo} ${campeon2}`;
      lista.appendChild(li);
    }
  });
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


// Abrir y cerrar modal
const modalDT = document.getElementById("dtModal");
const btnAbrirChat = document.getElementById("abrirChatDT");
const btnCerrarChat = document.querySelector(".dt-modal-cerrar");

btnAbrirChat.onclick = function() {
  if (!dtUsuario) {
    alert("⚠️ Primero elige un DT.");
    return;
  }
  document.getElementById("chatFotoDT").src = dtUsuario.foto;
  document.getElementById("chatNombreDT").innerText = dtUsuario.nombre;
  modalDT.style.display = "block";
}

btnCerrarChat.onclick = function() {
  modalDT.style.display = "none";
}

// Función para enviar mensajes al chat
function agregarMensaje(texto, tipo="dt") {
  const chat = document.getElementById("chatMensajes");
  const p = document.createElement("p");
  p.innerText = (tipo === "dt" ? "👔 " : "🧑‍💼 ") + texto;
  chat.appendChild(p);
  chat.scrollTop = chat.scrollHeight;
}

// Botón: Cambio de estilo
function cambiarEstiloDT() {
  agregarMensaje("¿Podrías cambiar tu estilo de juego?", "user");

  const estilos = Object.keys(estilosDT);
  let nuevo;
  do {
    nuevo = estilos[Math.floor(Math.random() * estilos.length)];
  } while (nuevo === dtUsuario.estilo);

  dtUsuario.estilo = nuevo;
  document.getElementById("dtEstilo").innerText = `Estilo: ${dtUsuario.estilo}`;
  agregarMensaje(`He cambiado mi estilo a: ${dtUsuario.estilo}.`, "dt");
}

// Abrir modal de contrataciones con 3 DTs al azar
function abrirContrataciones() {
  const modal = document.getElementById("modalContrataciones");
  const lista = document.getElementById("listaCandidatos");
  lista.innerHTML = "";

  // Obtener 3 entrenadores aleatorios
  const claves = Object.keys(entrenadores);
  const seleccionados = [];

  while (seleccionados.length < 3) {
    const random = claves[Math.floor(Math.random() * claves.length)];
    if (!seleccionados.includes(random)) {
      seleccionados.push(random);
    }
  }

  // Renderizar candidatos
  seleccionados.forEach(clave => {
    const dt = entrenadores[clave];
    const card = document.createElement("div");
    card.className = "candidato-card";
    card.innerHTML = `
      <img src="${dt.foto}" alt="${dt.nombre}">
      <h3>${dt.nombre}</h3>
      <button onclick="contratarDT('${clave}')">Contratar</button>
    `;
    lista.appendChild(card);
  });

  modal.style.display = "block";
}

// Contratar un DT desde el modal
function contratarDT(claveDT) {
  dtUsuario = entrenadores[claveDT];
  dtSeleccionado = dtUsuario.nombre;

  document.getElementById("fotoDT").src = dtUsuario.foto;
  document.getElementById("dtNombre").innerText = dtUsuario.nombre;
  document.getElementById("dtEstilo").innerText = `Estilo: ${dtUsuario.estilo}`;

  // Cerrar modal
  document.getElementById("modalContrataciones").style.display = "none";
}

// Cerrar modal con la X
document.querySelector(".modal-contrataciones-cerrar").onclick = function() {
  document.getElementById("modalContrataciones").style.display = "none";
};




// 📌 Objetivos del semestre (1ra y 2da división)
/*
function objetivosSemestre() {
  agregarMensaje("¿Qué objetivos piensas que debemos alcanzar este semestre?", "user");

  const fuerza = obtenerFuerzaTotal(equipoUsuario);
  const division = obtenerDivision(equipoUsuario);
  let objetivo;

  if (division === "primera") {
    if (fuerza > 80) {
      objetivo = "🔥 Nuestro objetivo es conseguir el bicampeonato.";
    } else if (fuerza >= 73) {
      objetivo = "🥇 Nuestro objetivo es ser campeón de liga.";
    } else if (fuerza >= 71) {
      objetivo = "4️⃣ Apuntemos a quedar en el Top 4 Anual";
    } else if (fuerza >= 69) {
      objetivo = "🏆 Nuestro objetivo es ser campeón de copa.";
    } else if (fuerza >= 67) {
      objetivo = "⚽ Debemos clasificar a cuadrangulares.";
    } else if (fuerza >= 65) {
      objetivo = "🔟 Apuntemos a quedar en el Top 10 Semestral.";
    } else if (fuerza >= 63) {
      objetivo = "🔢 Apuntemos a quedar en el Top 15 Anual.";
    } else if (fuerza >= 60) {
      objetivo = "🛡️ El objetivo es evitar el descenso.";
    }
  } else if (division === "segunda") {
    if (fuerza >= 62) {
      objetivo = "⬆️ Nuestro objetivo es ascender.";
    } else if (fuerza >= 61) {
      objetivo = "🚀 Debemos competir por ascender.";
    } else if (fuerza >= 58) {
      objetivo = "📊 Progresar luchando en mitad de tabla.";
    } else {
      objetivo = "📉 Progresar evitando quedar últimos.";
    }
  } else {
    objetivo = "🤔 No estoy seguro, debemos definir nuestros objetivos.";
  }

  agregarMensaje(objetivo, "dt");
}
*/

function objetivosSemestre() {
  agregarMensaje("¿Qué objetivos piensas que debemos alcanzar este semestre?", "user");

  const fuerza = obtenerFuerzaTotal(equipoUsuario);
  const division = obtenerDivision(equipoUsuario);
  let objetivo;

  // Función para elegir un elemento al azar de un arreglo
  function elegirAlAzar(lista) {
    return lista[Math.floor(Math.random() * lista.length)];
  }

  // Definimos las categorías de primera y segunda
  const categorias = {
    primera: [
      { 
        nombre: "Gigante",  min: 81, max: Infinity, 
        objetivos: [
          "🔥 Nuestro objetivo es conseguir el bicampeonato.",
          "🔥 Ganar al menos 14 partidos del semestre.",
          "💪 Terminar con 39 puntos o más.",
          "⚡ Mantener una racha de 10 partidos sin perder."
        ] 
      },
      { 
        nombre: "Grande", min: 71, max: 80, 
        objetivos: [
          "🥇 Nuestro objetivo es ser campeón de liga.",
          "🏆 Nuestro objetivo es ser campeón de copa.",
          "4️⃣ Apuntemos a quedar en el Top 4 de la reclasificación",
          "🔟 Ganar al menos 10 partidos del semestre.",
          "💪 Terminar con 30 puntos o más.",
          "⚽ Clasificar a una final.",
          "⚡ Mantener una racha de 7 partidos sin perder."
        ] 
      },
      { 
        nombre: "Mediano", min: 68,  max: 70, 
        objetivos: [
          "⚽ Clasificar a cuadrangulares.",
         "🥉Llegar a semifinales en copa.",
          "⚽ Ganar al menos 7 partidos del semestre.",
          "📈 Terminar con 28 puntos o más.",
          "🏋️‍♂️ Mantener una racha de 5 partidos sin perder."
        ] 
      },
      {
       nombre: "Medio", min: 65,  max: 67, 
        objetivos: [
          "⚽ Pelear por clasificar a cuadrangulares.",
          "🔟Terminar en mitad de tabla de reclasificación.",
          "🔢 Apuntemos a quedar en el Top 12 Semestral.",
          "⚽ Ganar al menos 5 partidos del semestre.",
          "📈 Terminar con 20 puntos o más.",
          "🏋️‍♂️ Mantener una racha de 3 partidos sin perder."
        ] 
      },
      { 
        nombre: "Chico", min: 0,  max: 64, 
        objetivos: [
          "🛡️ El objetivo es evitar el descenso.",
          "🛡️ Ganar al menos 4 partidos del semestre.",
          "📉 Terminar con 17 puntos o más.",
          "⚠️ Evitar quedar en los últimos 4 puestos."
        ] 
      }
    ],
    segunda: [
      { 
        nombre: "Ascenso",  min: 62,  max: 65, 
        objetivos: [
          "⬆️ Nuestro objetivo es ascender.",
          "🚀 Debemos competir por ascender.",
          "⬆️ Terminar entre los 2 primeros de la tabla Anual o Semestral",
          "🚀 Sumar 25 puntos o más en el semestre.",
          "🏆 Clasificar a cuadrangulares o final de semestre.",
         "➡️ Avanzar hasta 1/8 de copa."
        ] 
      },
      { 
        nombre: "Proceso",  min: 58, max: 61, 
        objetivos: [
          "📊 Progresar luchando en mitad de tabla.",
          "📊 Terminar en la mitad superior de la tabla (puestos 4-8).",
          "⚡ Sumar 18 puntos o más en el semestre."
        ] 
      },
      { 
        nombre: "Pequeño",  min: 0, max: 57, 
        objetivos: [
          "📉 Progresar evitando quedar últimos.",
          "📉 Evitar quedar en los últimos 3 puestos.",
          "🛡️ Sumar 14 puntos o más en el semestre."
        ] 
      }
    ]
};

  if (division === "primera" || division === "segunda") {
    // Buscamos la categoría que corresponda según la fuerza
    const categoria = categorias[division].find(cat => fuerza >= cat.min && fuerza <= cat.max);
    objetivo = elegirAlAzar(categoria.objetivos);
  } else {
    objetivo = "🤔 No estoy seguro, debemos definir nuestros objetivos.";
  }

  agregarMensaje(objetivo, "dt");
}



function noCumplimosDT() {
  agregarMensaje("No cumplimos los objetivos este semestre.", "user");

  const fuerza = obtenerFuerzaTotal(equipoUsuario);

  const frasesAltas = [
    "📋 Presidente, no alcanzamos el objetivo, pero sé que con su respaldo podremos revertir la situación.",
    "Presidente, estuvimos cerca. Si me da otra oportunidad, confío en que el equipo responderá.",
    "Sé que no es el resultado esperado, presidente, pero estoy convencido de que podemos mejorar."
  ];

  const frasesOportunidad = [
    "🙏 Presidente, confíe en mí, con tiempo lograremos enderezar el rumbo.",
    "Presidente, le pido paciencia. Estoy seguro de que este proceso dará frutos.",
    "Presidente, déjeme una temporada más y verá resultados."
  ];

  const frasesRenuncia = [
    "😞 Presidente, no cumplimos lo pactado. Presento mi renuncia y agradezco la oportunidad.",
    "Presidente, asumo la responsabilidad y pongo mi cargo a disposición. Gracias por confiar en mí.",
    "Ha sido un honor dirigir, presidente, pero los resultados no acompañaron. Renuncio a mi cargo."
  ];

  // 🔴 Si la moral está en 21–40, renuncia directo
  if (moralHinchada >= 21 && moralHinchada <= 40) {
    const frase = frasesRenuncia[Math.floor(Math.random() * frasesRenuncia.length)];
    agregarMensaje(frase, "dt");

    setTimeout(() => {
      limpiarDT();
      abrirContrataciones();
    }, 1200);
    return;
  }

  // ⚽ Si el objetivo era alto (campeón/cuadrangulares)
  if (fuerza > 64) {
    const frase = frasesAltas[Math.floor(Math.random() * frasesAltas.length)];
    agregarMensaje(frase, "dt");
  } else {
    const decision = Math.random() < 0.5 ? "oportunidad" : "renuncia";

    if (decision === "oportunidad") {
      const frase = frasesOportunidad[Math.floor(Math.random() * frasesOportunidad.length)];
      agregarMensaje(frase, "dt");
    } else {
      const frase = frasesRenuncia[Math.floor(Math.random() * frasesRenuncia.length)];
      agregarMensaje(frase, "dt");

      setTimeout(() => {
        limpiarDT();
        abrirContrataciones();
      }, 1200);
    }
  }
}



// Botón: Despedir
function despedirDT() {
  agregarMensaje("Creo que deberías irte del club.", "user");

  // 🔴 Si la moral está en 21–40, acepta siempre
  if (moralHinchada >= 21 && moralHinchada <= 40) {
    agregarMensaje("😞 Acepto el despido, la situación es insostenible.", "dt");

    setTimeout(() => {
      limpiarDT();
      abrirContrataciones();
    }, 1200);
    return;
  }

  const decision = Math.random() < 0.5 ? "acepta" : "pide";
  
  if (decision === "acepta") {
    agregarMensaje("Acepto el despido. Gracias por la oportunidad.", "dt");
    
    setTimeout(() => {
      limpiarDT();
      abrirContrataciones();
    }, 1200);
  } else {
    agregarMensaje("🙏 Por favor, dame una oportunidad más. Puedo mejorar.", "dt");
  }
}



function felicitarDT() {
  agregarMensaje("¡Felicitaciones por cumplir los objetivos del semestre!", "user");

  const respuestas = [
    "🙏 Gracias, siempre confié en este grupo.",
    "💪 Fue un gran trabajo de todo el equipo.",
    "🔥 Esto es solo el comienzo, vamos por más."
  ];

  const respuesta = respuestas[Math.floor(Math.random() * respuestas.length)];
  agregarMensaje(respuesta, "dt");
}

function limpiarDT() {
  // limpiar card
  document.getElementById("fotoDT").src = "";
  document.getElementById("dtNombre").innerText = "";
  document.getElementById("dtEstilo").innerText = "";

  // limpiar variables
  dtUsuario = null;
  dtSeleccionado = "";

  // limpiar chat
  document.getElementById("chatMensajes").innerHTML = "";
}


window.onload = () => {
  inicializarSelectorEquipos();

};
