const estilosDT = [
  "ofensivo",
  "defensivo",
  "equilibrado",
  "motivador",
  "posesion",
  "juego por bandas",
  "juego interior",
  "vertical",
  "conservador",
  "juego lento",
  "atrevido",
  "experimental",
  "creativo",
  "contragolpe",
  "presión alta",
  "intensidad alta",
  "transiciones rápidas"
];

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
}

function asignarEstiloAleatorio() {
  return estilosDT[Math.floor(Math.random() * estilosDT.length)];
}


// 📌 Lista de entrenadores (los mismos del <select>)
const entrenadores = {
  gamero: { nombre: "Alberto Gamero", foto: "dts/gamero.png", estilo: asignarEstiloAleatorio() },

  gonzalez: { nombre: "David González", foto: "dts/gonzalez.png", estilo: asignarEstiloAleatorio() },

  hernan: { nombre: "Hernán Torres", foto: "dts/hernan.png", estilo: asignarEstiloAleatorio() },

  herrera: { nombre: "Hernán Darío Herrera", foto: "dts/herrera.png", estilo: asignarEstiloAleatorio() },

  darias: { nombre: "Diego Arias", foto: "dts/darias.png", estilo: asignarEstiloAleatorio() },

  leonel: { nombre: "Leonel Álvarez", foto: "dts/leonel.png", estilo: asignarEstiloAleatorio() },

  restrepo: { nombre: "Alejandro Restrepo", foto: "dts/restrepo.png", estilo: asignarEstiloAleatorio() },

  arias: { nombre: "Alfredo Arias", foto: "dts/arias.png", estilo: asignarEstiloAleatorio() },

  bodhert: { nombre: "Hubert Bodhert", foto: "dts/bodhert.png", estilo: asignarEstiloAleatorio() },

  lucas: { nombre: "Lucas González", foto: "dts/lucas.png", estilo: asignarEstiloAleatorio() },

  flabio: { nombre: "Flabio Torres", foto: "dts/flabio.png", estilo: asignarEstiloAleatorio() },

  oliveros: { nombre: "Sebastián Oliveros", foto: "dts/oliveros.png", estilo: asignarEstiloAleatorio() },

  garciajl: { nombre: "José Luis García", foto: "dts/garciajl.png", estilo: asignarEstiloAleatorio() },

  risueño: { nombre: "Jonathan Risueño", foto: "dts/risueño.png", estilo: asignarEstiloAleatorio() },

  valiño: { nombre: "Ricardo Valiño", foto: "dts/valiño.png", estilo: asignarEstiloAleatorio() },

  marquez: { nombre: "Alexis Márquez", foto: "dts/marquez.png", estilo: asignarEstiloAleatorio() },

  silva: { nombre: "Carlos Silva", foto: "dts/silva.png", estilo: asignarEstiloAleatorio() },

  alvaro: { nombre: "Alvaro Hernández", foto: "dts/alvaro.png", estilo: asignarEstiloAleatorio() },

  rolo: { nombre: "Nelson Florez", foto: "dts/rolo.png", estilo: asignarEstiloAleatorio() },

  niño: { nombre: "Juan David Niño", foto: "dts/niño.png", estilo: asignarEstiloAleatorio() },

  rivera: { nombre: "Harold Rivera", foto: "dts/rivera.png", estilo: asignarEstiloAleatorio() },

  orozco: { nombre: "Andrés Orozco", foto: "dts/orozco.png", estilo: asignarEstiloAleatorio() },

  cardenas: { nombre: "Héctor Cardenas", foto: "dts/cardenas.png", estilo: asignarEstiloAleatorio() },

  dayron: { nombre: "Dayron Perez", foto: "dts/dayron.png", estilo: asignarEstiloAleatorio() },

  stiven: { nombre: "Stiven Sanchez", foto: "dts/stiven.png", estilo: asignarEstiloAleatorio() },

  willy: { nombre: "José Manuel Rodríguez", foto: "dts/willy.png", estilo: asignarEstiloAleatorio() },

  melo: { nombre: "Luis Melo", foto: "dts/melo.png", estilo: asignarEstiloAleatorio() },

  sicacha: { nombre: "Andrés Sicacha", foto: "dts/sicacha.png", estilo: asignarEstiloAleatorio() },

  repetto: { nombre: "Pablo Repetto", foto: "dts/repetto.png", estilo: asignarEstiloAleatorio() },

  reyes: { nombre: "Arturo Reyes", foto: "dts/reyes.png", estilo: asignarEstiloAleatorio() },

  alexis: { nombre: "Alexis García", foto: "dts/alexis.png", estilo: asignarEstiloAleatorio() },

  viera: { nombre: "Sebastián Viera", foto: "dts/viera.png", estilo: asignarEstiloAleatorio() },


//dts con fotos genérica

  rafael: { nombre: "Rafael Rodríguez", foto: "dts/generico.png", estilo: asignarEstiloAleatorio() },

  giraldo: { nombre: "Carlos Giraldo", foto: "dts/generico.png", estilo: asignarEstiloAleatorio() },

  oscar: { nombre: "Oscar Alvarez", foto: "dts/generico.png", estilo: asignarEstiloAleatorio() },

  alejo: { nombre: "Alejandro Arboleda", foto: "dts/generico.png", estilo: asignarEstiloAleatorio() },

  davids: { nombre: "David Suarez", foto: "dts/generico.png", estilo: asignarEstiloAleatorio() },

  martinez: { nombre: "Juan Martínez", foto: "dts/generico.png", estilo: asignarEstiloAleatorio() },
  
  rafa: { nombre: "Rafael Londoño", foto: "dts/generico.png", estilo: asignarEstiloAleatorio() },

  montoya: { nombre: "Diego Montoya", foto: "dts/generico.png", estilo: asignarEstiloAleatorio() },

  barragan: { nombre: "Julián Barragán", foto: "dts/generico.png", estilo: asignarEstiloAleatorio() },

  bernal: { nombre: "José Luis Bernal", foto: "dts/generico.png", estilo: asignarEstiloAleatorio() },

  bedoya: { nombre: "Gerardo Bedoya", foto: "dts/generico.png", estilo: asignarEstiloAleatorio() },

  joce: { nombre: "Joce Blanco", foto: "dts/generico.png", estilo: asignarEstiloAleatorio() },

  dlp: { nombre: "Jaime De la Pava", foto: "dts/generico.png", estilo: asignarEstiloAleatorio() },

  cesar: { nombre: "Cesar Torres", foto: "dts/generico.png", estilo: asignarEstiloAleatorio() },

  bolillo: { nombre: "Hernán Darío Gomez", foto: "dts/generico.png", estilo: asignarEstiloAleatorio() },

  paz: { nombre: "Luis Paz", foto: "dts/generico.png", estilo: asignarEstiloAleatorio() },

  gio: { nombre: "Giovanni Hernández", foto: "dts/generico.png", estilo: asignarEstiloAleatorio() },

  nestor: { nombre: "Nestor Craviotto", foto: "dts/generico.png", estilo: asignarEstiloAleatorio() },

  guerrero: { nombre: "Alejandro Guerrero", foto: "dts/generico.png", estilo: asignarEstiloAleatorio() }
  
};

// 📌 DTs predeterminados para cada equipo
const dtPorEquipo = {
  "Millonarios": "hernan",
  "Nacional": "darias",
  "América": "gonzalez",
  "Cali": "gamero",
  "Junior": "arias",
  "Santa Fe": "repetto",
  "Tolima": "lucas",
  "Medellín": "restrepo",
  "Once Caldas": "herrera",
  "Pereira": "reyes",
  "Alianza": "bodhert",
  "Bucaramanga": "leonel",
  "Inter Bogotá": "valiño",
  "Envigado": "orozco",
  "Pasto": "risueño",
  "Águilas": "niño",
  "B.Chico": "flabio",
  "Fortaleza": "oliveros",
  "Llaneros": "garciajl",
  "U.Magdalena": "silva",

  // SEGUNDA DIVISIÓN
  "Jaguares": "marquez",
  "Real Cartagena": "alvaro",
  "Cucuta": "rolo",
  "Ind.Yumbo": "martinez",
  "Patriotas": "giraldo",
  "R.Cundinamarca": "davids",
  "Inter Palmira": "cardenas",
  "Leones": "alejo",
  "Tigres": "rafael",
  "Quindio": "rivera",
  "R.Santander": "oscar",
  "Orsomarso": "stiven",
  "Boca Jrs. Cali": "willy",
  "Barranquilla": "dayron",
  "Atlético FC": "sicacha",
  "Bogotá": "melo",

  //equipos a refundar 
  "A.Petrolera":"cesar",
  "Cortuluá":"dlp",
  "Fiorentina":"montoya",
  "Valledupar":"barragan",
  "U.Popayán":"guerrero",
  "Unicosta":"gio",
  "Uniautonoma":"viera",
  "Expreso Rojo":"bernal",
  "R.Sincelejo": "bolillo",
  "Equidad":"alexis",
  "Huila":"nestor",
  "Centauros V.":"bedoya",
  "Lanceros B.":"paz",
  "P.Casanare":"joce",
  "CA Boca Jrs":"rafa"
};


// 📌 Relación DT → Equipo actual
let equipoDeDT = {}; // { gamero: "Millonarios", ... }

