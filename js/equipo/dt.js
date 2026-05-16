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

  bustos: { nombre: "Fabián Bustos", foto: "dts/bustos.png", estilo: asignarEstiloAleatorio() },

  herrera: { nombre: "Hernán Darío Herrera", foto: "dts/herrera.png", estilo: asignarEstiloAleatorio() },

  darias: { nombre: "Diego Arias", foto: "dts/darias.png", estilo: asignarEstiloAleatorio() },

  leonel: { nombre: "Leonel Álvarez", foto: "dts/leonel.png", estilo: asignarEstiloAleatorio() },

  restrepo: { nombre: "Alejandro Restrepo", foto: "dts/restrepo.png", estilo: asignarEstiloAleatorio() },

  arias: { nombre: "Alfredo Arias", foto: "dts/arias.png", estilo: asignarEstiloAleatorio() },

  ayala: { nombre: "Camilo Ayala", foto: "dts/ayala.png", estilo: asignarEstiloAleatorio() },

  lucas: { nombre: "Lucas González", foto: "dts/lucas.png", estilo: asignarEstiloAleatorio() },

  flecha: { nombre: "Jhon Gómez", foto: "dts/flecha.png", estilo: asignarEstiloAleatorio() },

  oliveros: { nombre: "Sebastián Oliveros", foto: "dts/oliveros.png", estilo: asignarEstiloAleatorio() },

  garciajl: { nombre: "José Luis García", foto: "dts/garciajl.png", estilo: asignarEstiloAleatorio() },

  risueño: { nombre: "Jonathan Risueño", foto: "dts/risueño.png", estilo: asignarEstiloAleatorio() },

  valiño: { nombre: "Ricardo Valiño", foto: "dts/valiño.png", estilo: asignarEstiloAleatorio() },

  bodhert: { nombre: "Hubert Bodhert", foto: "dts/bodhert.png", estilo: asignarEstiloAleatorio() },

  silva: { nombre: "Carlos Silva", foto: "dts/silva.png", estilo: asignarEstiloAleatorio() },

  alvaro: { nombre: "Alvaro Hernández", foto: "dts/alvaro.png", estilo: asignarEstiloAleatorio() },

  paez: { nombre: "Richard Paez", foto: "dts/paez.png", estilo: asignarEstiloAleatorio() },

  niño: { nombre: "Juan David Niño", foto: "dts/niño.png", estilo: asignarEstiloAleatorio() },

  rivera: { nombre: "Harold Rivera", foto: "dts/rivera.png", estilo: asignarEstiloAleatorio() },

  orozco: { nombre: "Andrés Orozco", foto: "dts/orozco.png", estilo: asignarEstiloAleatorio() },

  cardenas: { nombre: "Héctor Cardenas", foto: "dts/cardenas.png", estilo: asignarEstiloAleatorio() },

  dayron: { nombre: "Dayron Perez", foto: "dts/dayron.png", estilo: asignarEstiloAleatorio() },

  stiven: { nombre: "Stiven Sanchez", foto: "dts/stiven.png", estilo: asignarEstiloAleatorio() },

  willy: { nombre: "José Manuel Rodríguez", foto: "dts/willy.png", estilo: asignarEstiloAleatorio() },

  repetto: { nombre: "Pablo Repetto", foto: "dts/repetto.png", estilo: asignarEstiloAleatorio() },

  reyes: { nombre: "Arturo Reyes", foto: "dts/reyes.png", estilo: asignarEstiloAleatorio() },

  alexis: { nombre: "Alexis García", foto: "dts/alexis.png", estilo: asignarEstiloAleatorio() },

  viera: { nombre: "Sebastián Viera", foto: "dts/viera.png", estilo: asignarEstiloAleatorio() },

  duda: { nombre: "Rafael Dudamel", foto: "dts/dudamel.png", estilo: asignarEstiloAleatorio() },

//dts con fotos genérica

  rafael: { nombre: "Rafael Rodríguez", foto: "dts/generico.png", estilo: asignarEstiloAleatorio() },

  giraldo: { nombre: "Carlos Giraldo", foto: "dts/generico.png", estilo: asignarEstiloAleatorio() },

  oscar: { nombre: "Oscar Alvarez", foto: "dts/generico.png", estilo: asignarEstiloAleatorio() },

  alejo: { nombre: "Alejandro Arboleda", foto: "dts/generico.png", estilo: asignarEstiloAleatorio() },

  davids: { nombre: "Diego Mazo", foto: "dts/generico.png", estilo: asignarEstiloAleatorio() },

  martinez: { nombre: "Juan Martínez", foto: "dts/generico.png", estilo: asignarEstiloAleatorio() },
 
  botero: { nombre: "Sebastian Botero", foto: "dts/generico.png", estilo: asignarEstiloAleatorio() },

  perea: { nombre: "Wilberth Perea", foto: "dts/generico.png", estilo: asignarEstiloAleatorio() },

  alberto: { nombre: "Alberto Suarez", foto: "dts/generico.png", estilo: asignarEstiloAleatorio() },

  melo: { nombre: "Luis Melo", foto: "dts/generico.png", estilo: asignarEstiloAleatorio() },

  sicacha: { nombre: "Andrés Sicacha", foto: "dts/generico.png", estilo: asignarEstiloAleatorio() },
  
  arquez: { nombre: "Mauricio Arquez", foto: "dts/generico.png", estilo: asignarEstiloAleatorio() },

//con foto y sin equipo
  marquez: { nombre: "Alexis Márquez", foto: "dts/marquez.png", estilo: asignarEstiloAleatorio() },

  juarez: { nombre: "Efraín Juarez", foto: "dts/juarez.png", estilo: asignarEstiloAleatorio() },

  rolo: { nombre: "Nelson Florez", foto: "dts/rolo.png", estilo: asignarEstiloAleatorio() },

  hernan: { nombre: "Hernán Torres", foto: "dts/hernan.png", estilo: asignarEstiloAleatorio() },

  flabio: { nombre: "Flabio Torres", foto: "dts/flabio.png", estilo: asignarEstiloAleatorio() },

  florentin: { nombre: "Gustavo Florentin", foto: "dts/florentin.png", estilo: asignarEstiloAleatorio() },

  corredor: { nombre: "Diego Corredor", foto: "dts/corredor.png", estilo: asignarEstiloAleatorio() },

  rene: { nombre: "René Rosero", foto: "dts/rene.png", estilo: asignarEstiloAleatorio() },

  jco: { nombre: "Juan Carlos Osorio", foto: "dts/jco.png", estilo: asignarEstiloAleatorio() },

  jcr: { nombre: "Juan Cruz Real", foto: "dts/jcr.png", estilo: asignarEstiloAleatorio() },

  pusi: { nombre: "Lucas Pusineri", foto: "dts/pusi.png", estilo: asignarEstiloAleatorio() }
};

// 📌 DTs predeterminados para cada equipo
const dtPorEquipo = {
  "Millonarios": "bustos",
  "Nacional": "darias",
  "América": "gonzalez",
  "Cali": "duda",
  "Junior": "arias",
  "Santa Fe": "repetto",
  "Tolima": "lucas",
  "Medellín": "botero",
  "Once Caldas": "herrera",
  "Pereira": "reyes",
  "Alianza": "ayala",
  "Bucaramanga": "perea",
  "Inter Bogotá": "valiño",
  "Envigado": "alberto",
  "Pasto": "risueño",
  "Águilas": "niño",
  "B.Chico": "flecha",
  "Fortaleza": "oliveros",
  "Llaneros": "garciajl",
  "U.Magdalena": "silva",

  // SEGUNDA DIVISIÓN
  "Jaguares": "bodhert",
  "Real Cartagena": "alvaro",
  "Cucuta": "paez",
  "Ind.Yumbo": "martinez",
  "Patriotas": "giraldo",
  "R.Cundinamarca": "davids",
  "Inter Palmira": "cardenas",
  "Leones": "alejo",
  "Tigres": "rafael",
  "Quindio": "rivera",
  "R.Santander": "oscar",
  "Orsomarso": "arquez",
  "Boca Jrs. Cali": "willy",
  "Barranquilla": "dayron",
  "Atlético FC": "sicacha",
  "Bogotá": "melo",

  //equipos a refundar 
  "A.Petrolera": "gamero",
  "Cortuluá": "hernan",
  "Fiorentina": "flabio",
  "Valledupar": "orozco",
  "U.Popayán": "florentin",
  "Unicosta": "juarez",
  "Uniautonoma": "viera",
  "Expreso Rojo": "rene",
  "R.Sincelejo": "restrepo",
  "Equidad": "alexis",
  "Huila": "corredor",
  "Centauros V.": "jco",
  "Lanceros B.": "rolo",
  "P.Casanare": "stiven",
  "CA Boca Jrs": "marquez",
  "R.San Andres": "jcr",
  "Oro Negro": "leonel",
  "Bajo Cauca": "pusi"
};


// 📌 Relación DT → Equipo actual
let equipoDeDT = {}; // { gamero: "Millonarios", ... }


/*=== CHAT y TABLA de DTS===*/


// Abrir y cerrar modal
const modalDT = document.getElementById("dtModal");
const btnAbrirChat = document.getElementById("abrirChatDT");
const btnCerrarChat = document.querySelector(".dt-modal-cerrar");

btnAbrirChat.onclick = function() {
  if (!dtUsuario) {
    alert("Primero elige un DT.");
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
  p.innerText = (tipo === "dt" ? "Dt " : "Tu ") + texto;
  chat.appendChild(p);
  chat.scrollTop = chat.scrollHeight;
}

// Botón: Cambio de estilo
function cambiarEstiloDT() {
  agregarMensaje("¿Podrías cambiar tu estilo de juego?", "user");

  let nuevo;
  do {
    nuevo = estilosDT[Math.floor(Math.random() * estilosDT.length)];
  } while (nuevo === dtUsuario.estilo);

  dtUsuario.estilo = nuevo;

  document.getElementById("dtEstilo").innerText =
    `Estilo: ${dtUsuario.estilo}`;

  agregarMensaje(
    `He cambiado mi estilo a: ${dtUsuario.estilo}.`,
    "dt"
  );
}
function cambiarEsquemaDT() {

  agregarMensaje("¿Podrías cambiar tu esquema táctico?", "user");

  const listaEsquemas = Object.keys(esquemas);

  const disponibles = listaEsquemas.filter(
    e => e !== esquemaActual
  );

  const nuevoEsquema =
    disponibles[Math.floor(Math.random() * disponibles.length)];

  cambiarEsquema(nuevoEsquema);

  agregarMensaje(
    `He cambiado el esquema táctico a ${nuevoEsquema}.`,
    "dt"
  );

}



function detectarPosicionNecesaria(equipo) {

  // Cantidad mínima ideal por posición
  const minimoPosiciones = {
    PO: 2,
    DFC: 4,
    LI: 2,
    LD: 2,
    MCO: 2,
    MD: 3,
    DC: 3,
    EI: 2,
    ED: 2
  };

  // Contador actual
  const conteo = {};

  Object.keys(minimoPosiciones).forEach(pos => {
    conteo[pos] = 0;
  });

  // Contar jugadores del equipo
  plantillasJugadores[equipo].forEach(jugador => {
    if (conteo[jugador.posicion] !== undefined) {
      conteo[jugador.posicion]++;
    }
  });

  // Buscar posiciones incompletas
  const posicionesNecesarias = [];

  Object.keys(minimoPosiciones).forEach(pos => {
    if (conteo[pos] < minimoPosiciones[pos]) {
      posicionesNecesarias.push(pos);
    }
  });

  // Si todas están completas → devolver null
  if (posicionesNecesarias.length === 0) {
    return null;
  }

  // Elegir una aleatoria de las necesitadas
  return posicionesNecesarias[
    Math.floor(Math.random() * posicionesNecesarias.length)
  ];
}


function nombrePosicion(pos) {
  const nombres = {
    PO: "portero",
    DFC: "defensa central",
    LI: "lateral izquierdo",
    LD: "lateral derecho",
    MCO: "mediocampista ofensivo",
    MD: "mediocampista defensivo",
    DC: "delantero",
    EI: "extremo izquierdo",
    ED: "extremo derecho"
  };

  return nombres[pos] || pos;
}

function fichajesDT() {

  // 👤 Mensaje del presidente
  agregarMensaje("¿Qué jugador te gustaría fichar?", "user");

  const fuerzaEquipo = obtenerFuerzaTotal(equipoUsuario);

  const { min, max } =
    obtenerRangoFichajePorFuerza(fuerzaEquipo);

  // 🧠 Detectar posición necesaria
  const posicionNecesaria =
    detectarPosicionNecesaria(equipoUsuario);

  const candidatos = [];

  // 🔍 Buscar jugadores
  Object.keys(plantillasJugadores).forEach(equipo => {

    if (equipo === equipoUsuario) return;

    plantillasJugadores[equipo].forEach(jugador => {

      const mediaValida =
        jugador.media >= min &&
        jugador.media <= max;

      // Si necesita posición específica
      if (posicionNecesaria) {

        if (
          mediaValida &&
          jugador.posicion === posicionNecesaria
        ) {
          candidatos.push({ jugador, equipo });
        }

      } else {

        // Si no falta ninguna posición
        if (mediaValida) {
          candidatos.push({ jugador, equipo });
        }

      }

    });

  });


  // ❌ Sin candidatos
  if (candidatos.length === 0) {

    
  const mensajesSinFichajes = [
  "He revisado varias opciones, pero no encuentro jugadores que realmente puedan ayudarnos en este momento.",
  "El mercado está complicado ahora mismo. Prefiero esperar antes de traer a alguien que no marque diferencia.",
  "No veo oportunidades claras en este mercado. Creo que debemos ser pacientes.",
  "He estado analizando jugadores, pero ninguno termina de convencerme.",
  "Sinceramente, no creo que haya fichajes adecuados para lo que necesitamos ahora mismo.",
  "No quiero apresurarme con incorporaciones que no mejoren el nivel del equipo.",
  "El mercado no ofrece demasiadas garantías en este momento.",
  "He buscado opciones interesantes, pero todavía no aparece el jugador indicado.",
  "Creo que debemos esperar una mejor oportunidad antes de movernos en el mercado.",
  "No encuentro perfiles que encajen realmente con nuestra idea de juego.",
  "Por ahora prefiero mantener la plantilla como está antes que fichar por fichar.",
  "No hay jugadores disponibles que me generen verdadera confianza.",
  "He seguido algunos nombres, pero ninguno termina de darme seguridad.",
  "No veo un fichaje que realmente eleve el nivel competitivo del equipo.",
  "El mercado está bastante limitado para nuestras necesidades actuales.",
  "Podemos seguir observando el mercado, pero ahora mismo no veo opciones claras.",
  "Prefiero esperar antes de cometer un error en el mercado.",
  "No quiero traer jugadores solo por llenar espacios. Debemos fichar con criterio.",
  "Todavía no aparece ese jugador que realmente nos haga dar un salto de calidad.",
  "Creo que lo mejor es mantenernos atentos y esperar el momento adecuado."
];
  const mensaje =
    mensajesSinFichajes[
    Math.floor(Math.random() * mensajesSinFichajes.length)
  ];

  agregarMensaje(mensaje, "dt");

    return;
  }

  // 🎲 Elegir jugador aleatorio
  const elegido =
    candidatos[Math.floor(Math.random() * candidatos.length)];

  // 🏷️ Nombre bonito posición
  const nombrePos =
    nombrePosicion(elegido.jugador.posicion);

  // 🎭 Frases variadas
  const mensajesDT = [

    `Creo que ${elegido.jugador.nombre} sería un gran refuerzo para la posicion de: ${nombrePos}.`,
    `He estado siguiendo a ${elegido.jugador.nombre} y encajaría muy bien.`,
    `${elegido.jugador.nombre} puede aportarnos mucho esta temporada.`,
    `Necesitamos más profundidad en la posicion de: ${nombrePos}. Me gusta ${elegido.jugador.nombre}.`,
    `Tengo en la mira a ${elegido.jugador.nombre}. Creo que nos ayudaría bastante.`,
    `${elegido.jugador.nombre} sería una incorporación interesante para el equipo.`,
    `Me gustaría contar con ${elegido.jugador.nombre}.`,
    `${elegido.jugador.nombre} tiene características que encajan con nuestra idea.`,
    `Podríamos mejorar mucho con ${elegido.jugador.nombre}.`,
    `Creo que ${elegido.jugador.nombre} nos daría más variantes.`,
    `${elegido.jugador.nombre} sería un fichaje inteligente.`,
    `Veo potencial en ${elegido.jugador.nombre}.`,
    `${elegido.jugador.nombre} puede ayudarnos a competir mejor.`,
    `Necesitamos reforzar la plantilla y ${elegido.jugador.nombre} me convence.`,
    `Confío en que ${elegido.jugador.nombre} puede rendir muy bien aquí.`

  ];

  // 🎲 Elegir frase aleatoria
  const frase =
    mensajesDT[Math.floor(Math.random() * mensajesDT.length)];

  // 💬 Mensaje final
  agregarMensaje(frase, "dt");

}

//despedir
function despedirDT() {
  if (!dtUsuario) {
    alert("No tienes DT para despedir.");
    return;
  }

  agregarMensaje("Quedas despedido.", "user");
  agregarMensaje("Entiendo... fue un placer.", "dt");

  // limpiar DT actual
  dtUsuario = null;

  document.getElementById("fotoDT").src = "";
  document.getElementById("dtNombre").innerText = "Sin DT";
  document.getElementById("dtEstilo").innerText = "Estilo: -";

  // cerrar modal actual
  modalDT.style.display = "none";

  // abrir nuevo modal de contratación
  mostrarOpcionesDT();
}

function obtenerDTsAleatorios(cantidad = 3) {
  const claves = Object.keys(entrenadores);
  const seleccionados = [];

  while (seleccionados.length < cantidad) {
    const random = claves[Math.floor(Math.random() * claves.length)];
    if (!seleccionados.includes(random)) {
      seleccionados.push(random);
    }
  }

  return seleccionados;
}

function mostrarOpcionesDT() {
  const modalOpciones = document.getElementById("modalContratarDT");
  const contenedor = document.getElementById("listaDTs");

  contenedor.innerHTML = "";

  const dts = obtenerDTsAleatorios(3);

  dts.forEach(clave => {
    const dt = entrenadores[clave];

    const div = document.createElement("div");
    div.classList.add("card-dt");

    div.innerHTML = `
      <img src="${dt.foto}" width="80">
      <h4>${dt.nombre}</h4>
      <p>${dt.estilo}</p>
      <button onclick="contratarDT('${clave}')">Contratar</button>
    `;

    contenedor.appendChild(div);
  });

  modalOpciones.style.display = "block";
}

function contratarDT(claveDT) {
  dtUsuario = entrenadores[claveDT];

  document.getElementById("fotoDT").src = dtUsuario.foto;
  document.getElementById("dtNombre").innerText = dtUsuario.nombre;
  document.getElementById("dtEstilo").innerText =
    `Estilo: ${dtUsuario.estilo}`;

  document.getElementById("modalContratarDT").style.display = "none";

  alert("Nuevo DT contratado: " + dtUsuario.nombre);
}



function limpiarDT() {

  // limpiar chat
  document.getElementById("chatMensajes").innerHTML = "";
}


function inicializarDTsPorEquipo() {
  const listaEquipos = [
    ...equiposPrimera.map(e => e.nombre),
    ...equiposSegunda.map(e => e.nombre)
  ];

  listaEquipos.forEach(equipo => {
    const claveDT = dtPorEquipo[equipo];
    if (claveDT) {
      equipoDeDT[claveDT] = equipo;
    }
  });
}
