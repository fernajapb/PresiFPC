function abrirRenuncia() {
  if (!equipoUsuario) {
    alert("No has elegido un equipo todavia.");
    return;
  }

  const confirmar = confirm(`Seguro que deseas renunciar como Presidente del ${equipoUsuario}?`);
  if (!confirmar) return;

  // 📅 Fecha actual real
  const fechaActual = `Temporada ${temporadaActual} - Semestre ${semestreActual}`;

  // 🏆 Escudo del equipo
  const nombreLimpio = equipoUsuario
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/ /g, "_");

  document.getElementById("fechaRenuncia").innerText = fechaActual;
  document.getElementById("nombreEquipoCarta").innerText = equipoUsuario;
  document.getElementById("escudoEquipo").src = `escudos/${nombreLimpio}.png`;

  // 🪶 Carta formal
  const textoFormal = `
    Por medio de la presente, comunico mi decision irrevocable de presentar mi renuncia al cargo de Presidente del club ${equipoUsuario}.
    <br><br>
    Ha sido un honor representar y liderar esta institucion, pero considero que es momento de dar un paso al costado para permitir una nueva direccion.
    <br><br>
    Agradezco profundamente a la directiva, jugadores, cuerpo tecnico y aficion por el apoyo brindado durante mi gestion.
    <br><br>
    Sin otro particular, me despido con el mayor de los respetos.
    <br><br>
    Atentamente,
  `;
  document.getElementById("textoCarta").innerHTML = textoFormal;

  // 🪟 Mostrar modal
  document.getElementById("modalRenuncia").style.display = "flex";
}

function enviarRenuncia() {
  const firma = document.getElementById("firmaInput").value.trim();

  if (firma === "") {
    alert("Por favor, escribe tu firma antes de enviar.");
    return;
  }

  alert(`Gracias por tu gestion, ${firma}. La directiva del ${equipoUsuario} te desea lo mejor en tu futuro.`);
  document.getElementById("modalRenuncia").style.display = "none";
  location.reload();
}

function cerrarmodalRenuncia() {
  document.getElementById("modalRenuncia").style.display = "none";
}


function abrirDespido() {
  if (!equipoUsuario) return;

  // 📅 Fecha actual real
  const fechaActual = `Temporada ${temporadaActual} - Semestre ${semestreActual}`;

  // 🏆 Escudo del equipo
  const nombreLimpio = equipoUsuario
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/ /g, "_");

  document.getElementById("fechaRenuncia").innerText = fechaActual;
  document.getElementById("nombreEquipoCarta").innerText = equipoUsuario;
  document.getElementById("escudoEquipo").src = `escudos/${nombreLimpio}.png`;

  // 🧾 Texto de despido
  const textoDespido = `
    Por medio de la presente, la directiva del club ${equipoUsuario} le comunica su <strong>desvinculacion inmediata</strong> del cargo de Presidente.
    <br><br>
    Esta decision se toma tras una evaluacion exhaustiva del desempeno institucional y deportivo durante su gestion.
    <br><br>
    Agradecemos los servicios prestados y le deseamos Exitos en sus futuros proyectos.
    <br><br>
    Atentamente,<br>
    <strong>La Junta Directiva</strong>
  `;
  document.getElementById("textoCarta").innerHTML = textoDespido;

  // 🪟 Mostrar modal
  document.getElementById("modalRenuncia").style.display = "flex";

  // 🛑 Desactivar el botón "Cancelar"
  const btnCancelar = document.getElementById("btnCancell");
  btnCancelar.disabled = true;
  btnCancelar.style.opacity = "0.5";
  btnCancelar.style.cursor = "not-allowed";
}

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
  pacho: { nombre: "Francisco Lopez", foto: "dts/pacho.png", estilo: asignarEstiloAleatorio() },
  darias: { nombre: "Diego Arias", foto: "dts/darias.png", estilo: asignarEstiloAleatorio() },
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
  rene: { nombre: "René Rosero", foto: "dts/rene.png", estilo: asignarEstiloAleatorio() },
  risueño: { nombre: "Jonathan Risueño", foto: "dts/risueño.png", estilo: asignarEstiloAleatorio() },

  silva: { nombre: "Carlos Silva", foto: "dts/silva.png", estilo: asignarEstiloAleatorio() },
  alvaro: { nombre: "Alvaro Hernández", foto: "dts/alvaro.png", estilo: asignarEstiloAleatorio() },
  rolo: { nombre: "Nelson Florez", foto: "dts/rolo.png", estilo: asignarEstiloAleatorio() },
  niño: { nombre: "Juan David Niño", foto: "dts/niño.png", estilo: asignarEstiloAleatorio() },
  rivera: { nombre: "Harold Rivera", foto: "dts/rivera.png", estilo: asignarEstiloAleatorio() },
  garcia: { nombre: "Alexis García", foto: "dts/garcia.png", estilo: asignarEstiloAleatorio() },
  cardenas: { nombre: "Héctor Cardenas", foto: "dts/cardenas.png", estilo: asignarEstiloAleatorio() },
  corredor: { nombre: "Diego Corredor", foto: "dts/corredor.png", estilo: asignarEstiloAleatorio() },
  craviotto: { nombre: "Néstor Craviotto", foto: "dts/craviotto.png", estilo: asignarEstiloAleatorio() },
  grigori: { nombre: "Grigori Mendez", foto: "dts/grigori.png", estilo: asignarEstiloAleatorio() },
  dayron: { nombre: "Dayron Perez", foto: "dts/dayron.png", estilo: asignarEstiloAleatorio() },
  stiven: { nombre: "Stiven Sanchez", foto: "dts/stiven.png", estilo: asignarEstiloAleatorio() },
  willy: { nombre: "José Manuel Rodríguez", foto: "dts/willy.png", estilo: asignarEstiloAleatorio() },

  viera: { nombre: "Sebastián Viera", foto: "dts/viera.png", estilo: asignarEstiloAleatorio() },
  osorio: { nombre: "Juan Carlos Osorio", foto: "dts/osorio.png", estilo: asignarEstiloAleatorio() },
  gandolfi: { nombre: "Javier Gandolfi", foto: "dts/gandolfi.png", estilo: asignarEstiloAleatorio() },
  cruzreal: { nombre: "Juan Cruz Real", foto: "dts/cruzreal.png", estilo: asignarEstiloAleatorio() },
  repetto: { nombre: "Pablo Repetto", foto: "dts/repetto.png", estilo: asignarEstiloAleatorio() },
  juarez: { nombre: "Efraín Juarez", foto: "dts/juarez.png", estilo: asignarEstiloAleatorio() },
  pusineri: { nombre: "Lucas Pusineri", foto: "dts/pusineri.png", estilo: asignarEstiloAleatorio() }
  
};



//PLANTILLAS
const plantillasJugadores = {
  "Nacional": [
  { nombre: "D.Ospina", edad: 37, media: 73, posicion: "Portero" , foto: "img/jugadores/nacional/ospina.png"},
  { nombre: "H.Castillo", edad: 32, media: 68, posicion: "Portero" , foto: "img/jugadores/nacional/castillo.png"},
  { nombre: "L.Marquinez", edad: 22, media: 65, posicion: "Portero" , foto: "img/jugadores/nacional/marquinez.png"},

  { nombre: "A.Roman", edad: 30, media: 72, posicion: "Defensa" , foto: "img/jugadores/nacional/roman.png"},
  { nombre: "C.Candido", edad: 30, media: 68, posicion: "Defensa" , foto: "img/jugadores/nacional/candido.png"},
  { nombre: "W.Tesillo", edad: 35, media: 72, posicion: "Defensa" , foto: "img/jugadores/nacional/tesillo.png" },
  { nombre: "J.J.Arias", edad: 21, media: 64, posicion: "Defensa" , foto: "img/jugadores/nacional/jjarias.png"},
  { nombre: "C.Haydar", edad: 24, media: 66, posicion: "Defensa" , foto: "img/jugadores/nacional/haydar.png"},

  { nombre: "E.Cardona", edad: 32, media: 73, posicion: "Volante" , foto: "img/jugadores/nacional/cardona.png" },
  { nombre: "J.Bauza", edad: 29, media: 69, posicion: "Volante" , foto: "img/jugadores/nacional/bauza.png"},
  { nombre: "M.Uribe", edad: 34, media: 73, posicion: "Pivote" , foto: "img/jugadores/nacional/uribe.png"},
  { nombre: "J.Campuzano", edad: 29, media: 73, posicion: "Pivote" , foto: "img/jugadores/nacional/campuzano.png" },
  { nombre: "J.Rengifo", edad: 20, media: 64, posicion: "Volante" },
  { nombre: "E.Rivero", edad: 19, media: 64, posicion: "Pivote" , foto: "img/jugadores/nacional/rivero.png"},

  { nombre: "A.Morelos", edad: 29, media: 72, posicion: "Delantero" , foto: "img/jugadores/nacional/morelos.png"},
  { nombre: "A.Sarmiento", edad: 27, media: 68, posicion: "Delantero" , foto: "img/jugadores/nacional/sarmiento.png"},
  { nombre: "D.Asprilla", edad: 33, media: 68, posicion: "Delantero" , foto: "img/jugadores/nacional/asprilla.png"},
  { nombre: "M.Hinestroza", edad: 23, media: 77, posicion: "Delantero" , foto: "img/jugadores/nacional/marino.png"},
  { nombre: "M.Moreno", edad: 29, media: 76, posicion: "Delantero" , foto: "img/jugadores/nacional/marlos.png"},
  { nombre: "F.Batista", edad: 26, media: 67, posicion: "Delantero" , foto: "img/jugadores/nacional/batista.png"},
  { nombre: "B.Arce", edad: 27, media: 67, posicion: "Delantero" , foto: "img/jugadores/nacional/arce.png"}
],

"Millonarios": [
  { nombre: "G.de Amores", edad: 31, media: 66, posicion: "Portero"  , foto: "img/jugadores/millonarios/amores.png" },
  { nombre: "D.Novoa", edad: 36, media: 67, posicion: "Portero"  , foto: "img/jugadores/millonarios/novoa.png"},

  { nombre: "H.Palacios", edad: 32, media: 69, posicion: "Defensa"  , foto: "img/jugadores/millonarios/helibelton.png"},
  { nombre: "A.Llinás", edad: 28, media: 72, posicion: "Defensa" , foto: "img/jugadores/millonarios/llinas.png" },
  { nombre: "D.Banguero", edad: 36, media: 68, posicion: "Defensa"  , foto: "img/jugadores/millonarios/banguero.png"},
  { nombre: "S.Mosquera", edad: 31, media: 69, posicion: "Defensa"  , foto: "img/jugadores/millonarios/mosquera.png"},
  { nombre: "J.Arias", edad: 32, media: 68, posicion: "Defensa" , foto: "img/jugadores/millonarios/jarias.png"},

  { nombre: "D.Macalister", edad: 38, media: 70, posicion: "Volante"  , foto: "img/jugadores/millonarios/maca.png"},
  { nombre: "N.Arevalo", edad: 22, media: 69, posicion: "Pivote"  , foto: "img/jugadores/millonarios/arevalo.png"},
  { nombre: "B.Savio", edad: 31, media: 70, posicion: "Volante"  , foto: "img/jugadores/millonarios/savio.png"},

  { nombre: "Leo Castro", edad: 33, media: 72, posicion: "Delantero" , foto: "img/jugadores/millonarios/leo.png" },
  { nombre: "S.Giordana", edad: 30, media: 69, posicion: "Delantero"  , foto: "img/jugadores/millonarios/giordana.png"},
  { nombre: "A.Castro", edad: 31, media: 67, posicion: "Delantero" , foto: "img/jugadores/millonarios/alex.png" },
  { nombre: "Beckham C.", edad: 22, media: 68, posicion: "Delantero" , foto: "img/jugadores/millonarios/beckham.png"},
  { nombre: "C.Cañozales", edad: 26, media: 66, posicion: "Delantero"  , foto: "img/jugadores/millonarios/canozales.png"}
],

"América": [
  { nombre: "J.Soto", edad: 31, media: 69, posicion: "Portero"  , foto: "img/jugadores/america/soto.png"},
  { nombre: "S.Silva", edad: 26, media: 64, posicion: "Portero"  , foto: "img/jugadores/america/silva.png"},

  { nombre: "Y.Candelo", edad: 33, media: 69, posicion: "Defensa"  , foto: "img/jugadores/america/candelo.png"},
  { nombre: "D.Bocanegra", edad: 38, media: 68, posicion: "Defensa" , foto: "img/jugadores/america/bocanegra.png" },
  { nombre: "M.Mina", edad: 27, media: 66, posicion: "Defensa" , foto: "img/jugadores/america/mina.png" },
  { nombre: "C.Tovar", edad: 27, media: 67, posicion: "Defensa"  , foto: "img/jugadores/america/tovar.png"},
  { nombre: "J.Pestaña", edad: 28, media: 68, posicion: "Defensa" , foto: "img/jugadores/america/jeanpes.png"},

  { nombre: "J.Escobar", edad: 20, media: 65, posicion: "Pivote" , foto: "img/jugadores/america/josen.png"},
  { nombre: "R.Carrascal", edad: 32, media: 71, posicion: "Volante"  , foto: "img/jugadores/america/carrascal.png"},
  { nombre: "E.Balanta", edad: 32, media: 67, posicion: "Pivote" , foto: "img/jugadores/america/balanta.png" },
  { nombre: "L.Paz", edad: 37, media: 64, posicion: "Pivote" , foto: "img/jugadores/america/paz.png" },
  { nombre: "S.Navarro", edad: 25, media: 66, posicion: "Volante" , foto: "img/jugadores/america/navarro.png"},
  { nombre: "A.Roa", edad: 32, media: 68, posicion: "Volante" , foto: "img/jugadores/america/roa.png"},

  { nombre: "C.Barrios", edad: 27, media: 71, posicion: "Delantero"  , foto: "img/jugadores/america/barrios.png"},
  { nombre: "Y.Garces", edad: 19, media: 64, posicion: "Delantero" , foto: "img/jugadores/america/papula.png" },
  { nombre: "A.Ramos", edad: 39, media: 70, posicion: "Delantero" , foto: "img/jugadores/america/adrian.png"},
  { nombre: "L.Ramos", edad: 25, media: 70, posicion: "Delantero" , foto: "img/jugadores/america/ramos.png"},
  { nombre: "J.Murillo", edad: 29, media: 67, posicion: "Delantero" , foto: "img/jugadores/america/murillo.png" },
  { nombre: "D.Borrero", edad: 23, media: 68, posicion: "Delantero"  , foto: "img/jugadores/america/borrero.png"}
],

"Junior": [
  { nombre: "M.Silveira", edad: 25, media: 69, posicion: "Portero"  , foto: "img/jugadores/junior/silveira.png"},
  { nombre: "J.Martinez", edad: 32, media: 68, posicion: "Portero" , foto: "img/jugadores/junior/jeferson.png" },

  { nombre: "J.Guerrero", edad: 24, media: 65, posicion: "Defensa"  , foto: "img/jugadores/junior/jhomier.png"},
  { nombre: "J.Peña", edad: 26, media: 67, posicion: "Defensa"  , foto: "img/jugadores/junior/zidane.png"},
  { nombre: "Y.Suarez", edad: 28, media: 67, posicion: "Defensa"  , foto: "img/jugadores/junior/yeison.png"},
  { nombre: "J.Baez", edad: 35, media: 69, posicion: "Defensa" , foto: "img/jugadores/junior/baez.png" },
   { nombre: "D.Rivera", edad: 26, media: 65, posicion: "Defensa"  , foto: "img/jugadores/junior/drivera.png"},

  { nombre: "Y.Chara", edad: 34, media: 71, posicion: "Volante" , foto: "img/jugadores/junior/chara.png" },
  { nombre: "D.Moreno", edad: 34, media: 68, posicion: "Pivote"  , foto: "img/jugadores/junior/didier.png"},
  { nombre: "G.Celis", edad: 32, media: 68, posicion: "Pivote" , foto: "img/jugadores/junior/celis.png" },
  { nombre: "C.Esparragoza", edad: 26, media: 64, posicion: "Volante"  , foto: "img/jugadores/junior/esparragoza.png"},

  { nombre: "G.Paiva", edad: 28, media: 68, posicion: "Delantero"  , foto: "img/jugadores/junior/paiva.png"},
  { nombre: "J.Enamorado", edad: 26, media: 70, posicion: "Delantero"  , foto: "img/jugadores/junior/enamorado.png"},
  { nombre: "B.Castrillon", edad: 26, media: 67, posicion: "Delantero"  , foto: "img/jugadores/junior/castrillon.png"},
  { nombre: "C.Bacca", edad: 39, media: 68, posicion: "Delantero"  , foto: "img/jugadores/junior/bacca.png"},
  { nombre: "S.Rodriguez", edad: 27, media: 68, posicion: "Delantero"  , foto: "img/jugadores/junior/titi.png"},
  { nombre: "T.Gutierrez", edad: 40, media: 69, posicion: "Delantero" , foto: "img/jugadores/junior/teo.png" }
],

"Santa Fe": [
  { nombre: "A.Marmolejo", edad: 34, media: 73, posicion: "Portero"  , foto: "img/jugadores/santafe/marmolejo.png"},
  { nombre: "W.Asprilla", edad: 26, media: 68, posicion: "Portero"  , foto: "img/jugadores/santafe/weimar.png"},

  { nombre: "E.Perlaza", edad: 36, media: 67, posicion: "Defensa"  , foto: "img/jugadores/santafe/elvis.png"},
  { nombre: "V.Moreno", edad: 31, media: 67, posicion: "Defensa"  , foto: "img/jugadores/santafe/victor.png"},
  { nombre: "J.Sosa", edad: 23, media: 66, posicion: "Defensa"  , foto: "img/jugadores/santafe/sosa.png"},
  { nombre: "E.Olivera", edad: 35, media: 68, posicion: "Defensa"  , foto: "img/jugadores/santafe/turro.png"},
  { nombre: "I.Scarpeta", edad: 29, media: 67, posicion: "Defensa"  , foto: "img/jugadores/santafe/scarpeta.png"},
  { nombre: "C.Mafla", edad: 32, media: 68, posicion: "Defensa"  , foto: "img/jugadores/santafe/mafla.png"},

  { nombre: "Y.Velasquez", edad: 26, media: 68, posicion: "Pivote" , foto: "img/jugadores/santafe/yilmar.png" },
  { nombre: "D.Torres", edad: 35, media: 68, posicion: "Pivote"  , foto: "img/jugadores/santafe/danito.png"},
  { nombre: "A.Zapata", edad: 30, media: 67, posicion: "Volante"  , foto: "img/jugadores/santafe/zapata.png"},
  { nombre: "E.Murillo", edad: 25, media: 67,   posicion: "Pivote" , foto: "img/jugadores/santafe/ewil.png" },
  { nombre: "J.Torres", edad: 22, media: 67, posicion: "Volante"  , foto: "img/jugadores/santafe/kante.png"},
  { nombre: "M.Meli", edad: 33, media: 66, posicion: "Volante"  , foto: "img/jugadores/santafe/meli.png"},

  { nombre: "H.Rodallega", edad: 40, media: 70, posicion: "Delantero"  , foto: "img/jugadores/santafe/hugol.png"},
  { nombre: "Angelo R.", edad: 36, media: 66,   posicion: "Delantero" , foto: "img/jugadores/santafe/angelo.png" },
  { nombre: "E.Lopez", edad: 30, media: 68, posicion: "Delantero"  , foto: "img/jugadores/santafe/lopez.png"},
  { nombre: "O.Frasica", edad: 32, media: 67, posicion: "Delantero"  , foto: "img/jugadores/santafe/frasika.png"},
  { nombre: "H.Mosquera", edad: 30, media: 71, posicion: "Delantero"  , foto: "img/jugadores/santafe/santimosquera.png"}
],

 "Cali": [
  { nombre: "A.Rodriguez", edad: 24, media: 67, posicion: "Portero", foto: "img/jugadores/cali/alejo.png" },
  { nombre: "M.Espindola", edad: 27, media: 64, posicion: "Portero" , foto: "img/jugadores/cali/espindola.png"},

  { nombre: "F.Viafara", edad: 33, media: 68, posicion: "Defensa", foto: "img/jugadores/cali/viafara.png" },
  { nombre: "G.Corujo", edad: 28, media: 68, posicion: "Defensa" , foto: "img/jugadores/cali/corujo.png"},
  { nombre: "J.Varela", edad: 27, media: 67, posicion: "Defensa", foto: "img/jugadores/cali/varela.png" },
  { nombre: "F.Aguilar", edad: 32, media: 66, posicion: "Defensa" , foto: "img/jugadores/cali/aguilar.png"},
  { nombre: "J.Quiñones", edad: 36, media: 66, posicion: "Defensa" , foto: "img/jugadores/cali/juliqui.png"},

  { nombre: "A.Colorado", edad: 26, media: 67, posicion: "Pivote" , foto: "img/jugadores/cali/colorado.png"},
  { nombre: "Y.Gordillo", edad: 33, media: 67, posicion: "Pivote" , foto: "img/jugadores/cali/gordillo.png"},
  { nombre: "Yani Q.", edad: 23, media: 66, posicion: "Pivote", foto: "img/jugadores/cali/yani.png" },
  { nombre: "S.Colonia", edad: 18, media: 60, posicion: "Volante" },
  { nombre: "J.Martinez", edad: 23, media: 67, posicion: "Volante" , foto: "img/jugadores/cali/johanm.png"},

  { nombre: "J.Aponza", edad: 20, media: 63, posicion: "Delantero" },
  { nombre: "F.Mimbacas", edad: 23, media: 64, posicion: "Delantero", foto: "img/jugadores/cali/mimbacas.png" },
  { nombre: "A.Hurtado", edad: 38, media: 66, posicion: "Delantero" , foto: "img/jugadores/cali/aviles.png"}
],

"Medellín": [
  { "nombre": "W.Aguerre", "edad": 32, "media": 71, "posicion": "Portero"  , foto: "img/jugadores/dim/aguerre.png"},
  { "nombre": "E.Chaux", "edad": 33, "media": 67, "posicion": "Portero" , foto: "img/jugadores/dim/chaux.png" },

  { "nombre": "J.Ortiz", "edad": 26, "media": 68, "posicion": "Defensa"  , foto: "img/jugadores/dim/ortiz.png"},
  { "nombre": "D.Londoño", "edad": 30, "media": 67, "posicion": "Defensa"  , foto: "img/jugadores/dim/londono.png"},
  { "nombre": "F.Torijano", "edad": 37, "media": 67, "posicion": "Defensa" , foto: "img/jugadores/dim/torijano.png" },
  { "nombre": "K.Mantilla", "edad": 22, "media": 66, "posicion": "Defensa" , foto: "img/jugadores/dim/kmantilla.png" },
  { "nombre": "L.Chaverra", "edad": 28, "media": 67, "posicion": "Defensa"  , foto: "img/jugadores/dim/leyser.png"},
  
  { "nombre": "J.Barrera", "edad": 30, "media": 69, "posicion": "Volante" , foto: "img/jugadores/dim/jarlan.png" },
  { "nombre": "E.Mena", "edad": 28, "media": 67, "posicion": "Defensa" , foto: "img/jugadores/dim/esneyder.png" },
  { "nombre": "L.Berrio", "edad": 27, "media": 67, "posicion": "Volante" , foto: "img/jugadores/dim/leider.png" },
  { "nombre": "J.Alvarado", "edad": 26, "media": 66, "posicion": "Pivote" , foto: "img/jugadores/dim/alvarado.png" },
  { "nombre": "Baldomero P.", "edad": 33, "media": 66, "posicion": "Volante" , foto: "img/jugadores/dim/baldomero.png" },

  { "nombre": "Jader V.", "edad": 25, "media": 66, "posicion": "Delantero"  , foto: "img/jugadores/dim/jader.png"},
  { "nombre": "B.Leon", "edad": 25, "media": 67, "posicion": "Delantero"  , foto: "img/jugadores/dim/leon.png"},
  { "nombre": "F.Fydrizewski", "edad": 32, "media": 69, "posicion": "Delantero"  , foto: "img/jugadores/dim/polaco.png"},
  { "nombre": "F.Chaverra", "edad": 25, "media": 67, "posicion": "Delantero" , foto: "img/jugadores/dim/chaverra.png" },
  { "nombre": "L.Sandoval", "edad": 26, "media": 66, "posicion": "Delantero" , foto: "img/jugadores/dim/sandoval.png" }
],

"Tolima": [
  { nombre: "C.Fiermarin", edad: 27, media: 68, posicion:"Portero" , foto: "img/jugadores/tolima/fiermarin.png"  },
  { nombre: "N.Volpi", edad: 33, media: 67, posicion: "Portero" , foto: "img/jugadores/tolima/volpi.png"  },

  { nombre: "Y.Hurtado", edad: 28,  media: 68, posicion: "Defensa"  , foto: "img/jugadores/tolima/yhormar.png" },
  { nombre: "M.Torres", edad: 29,  media: 68, posicion: "Defensa" , foto: "img/jugadores/tolima/marlon.png"  },
  { nombre: "J.Mera", edad: 23,  media: 65, posicion: "Defensa"  , foto: "img/jugadores/tolima/mera.png" },
  { nombre: "A.Angulo", edad: 29,   media: 67,  posicion: "Defensa", foto: "img/jugadores/tolima/aangulo.png" },
  { nombre: "S.Velasquez", edad: 22,  media: 66, posicion: "Defensa", foto: "img/jugadores/tolima/samuel.png"   },

  { nombre: "J.Nieto",  edad: 32,  media: 67, posicion: "Pivote", foto: "img/jugadores/tolima/nieto.png"   },
  { nombre: "J.Quiñonez", edad: 24, media: 67,   posicion: "Pivote" , foto: "img/jugadores/tolima/jader.png" },
  { nombre: "J.Torres", edad: 21, media: 67,   posicion: "Volante" , foto: "img/jugadores/tolima/tatay.png" },
  { nombre: "B.Rovira", edad: 28,  media: 66, posicion: "Volante"  , foto: "img/jugadores/tolima/rovira.png" },

  { nombre: "J.Gonzalez", edad: 24,  media: 68, posicion: "Delantero"  , foto: "img/jugadores/tolima/jersson.png" },
  { nombre: "G.Lencina", edad: 28, media: 68, posicion: "Delantero" , foto: "img/jugadores/tolima/lencina.png" },
  { nombre: "B.Larregui", edad: 24,  media: 67, posicion: "Delantero", foto: "img/jugadores/tolima/larregui.png"   },
  { nombre: "A.Parra", edad: 28, media: 65,  posicion: "Delantero" , foto: "img/jugadores/tolima/parra.png"  }
],

"Once Caldas": [
  { nombre: "J.Aguirre", edad: 33, media: 66, posicion: "Portero" , foto: "img/jugadores/once/aguirre.png" },
  { nombre: "J.Parra", edad: 25, media: 66, posicion: "Portero" , foto: "img/jugadores/once/joan.png" },

  { nombre: "J.Castaño", edad: 27, media: 65, posicion: "Defensa" , foto: "img/jugadores/once/castano.png" },
  { nombre: "K.Cuesta", edad: 25, media: 65, posicion: "Defensa"  , foto: "img/jugadores/once/kcuesta.png"},
  { nombre: "J.Riquett", edad: 35, media: 66, posicion: "Defensa" , foto: "img/jugadores/once/riquett.png" },
  { nombre: "J.Cuesta", edad: 27, media: 67, posicion: "Defensa"  , foto: "img/jugadores/once/jcuesta.png"},

  { nombre: "A.Garcia", edad: 24, media: 64, posicion: "Volante"  , foto: "img/jugadores/once/agarcia.png"},
  { nombre: "Niche Sanchez", edad: 25, media: 67, posicion: "Volante"  , foto: "img/jugadores/once/niche.png"},
  { nombre: "I.Rojas", edad: 28, media: 66, posicion: "Pivote"  , foto: "img/jugadores/once/rojas.png"},
  { nombre: "M.Garcia", edad: 27, media: 67, posicion: "Volante" , foto: "img/jugadores/once/mateog.png" },

  { nombre: "D.Moreno", edad: 40, media: 70, posicion: "Delantero" , foto: "img/jugadores/once/dayro.png" },
  { nombre: "M.Zuleta", edad: 23, media: 67, posicion: "Delantero"  , foto: "img/jugadores/once/zuleta.png"},
  { nombre: "J.Zapata", edad: 25, media: 67, posicion: "Delantero" , foto: "img/jugadores/once/jefry.png" },
  { nombre: "Pipe Gomez", edad: 26, media: 66, posicion: "Delantero" , foto: "img/jugadores/once/pipe.png" },
  { nombre: "M.Barrios", edad: 34, media: 66, posicion: "Delantero"  , foto: "img/jugadores/once/michael.png"}
],

"Pereira": [
  { nombre: "S.Ichazo", edad: 33, media: 68, posicion: "Portero" , foto: "img/jugadores/pereira/ichazo.png" },
  { nombre: "F.Mosquera", edad: 26, media: 63, posicion: "Portero", foto: "img/jugadores/pereira/franklin.png"  },

  { nombre: "J.Moya", edad: 33, media: 66, posicion: "Defensa" , foto: "img/jugadores/pereira/moya.png" },
  { nombre: "J.S.Quintero", edad: 30, media: 66, posicion: "Defensa", foto: "img/jugadores/pereira/jsquintero.png"  },
  { nombre: "E.Velasco", edad: 34, media: 67, posicion: "Defensa", foto: "img/jugadores/pereira/velasco.png"  },
  { nombre: "W.Pacheco", edad: 30, media: 66, posicion: "Defensa" , foto: "img/jugadores/pereira/walmer.png" },

  { nombre: "Darwin Quintero", edad: 38, media: 70, posicion: "Volante" , foto: "img/jugadores/pereira/darwin.png" },
  { nombre: "V.Mejia", edad: 32, media: 66, posicion: "Pivote" , foto: "img/jugadores/pereira/mejia.png" },
  { nombre: "Y.Cabrera", edad: 35, media: 67, posicion: "Volante" , foto: "img/jugadores/pereira/yesus.png" },
  { nombre: "K.Osorio", edad: 32, media: 66, posicion: "Pivote", foto: "img/jugadores/pereira/kelvin.png"  },
  { nombre: "J.Rios", edad: 34, media: 65, posicion: "Pivote" , foto: "img/jugadores/pereira/jrios.png" },

  { nombre: "M.Perez", edad: 35, media: 65, posicion: "Delantero" , foto: "img/jugadores/pereira/marco.png" },
  { nombre: "Y.Quiñones", edad: 23, media: 66, posicion: "Delantero" , foto: "img/jugadores/pereira/yuber.png" },
  { nombre: "S.Merheg", edad: 18, media: 65, posicion: "Delantero" , foto: "img/jugadores/pereira/merheg.png" },
  { nombre: "G.Torres", edad: 29, media: 66, posicion: "Delantero" , foto: "img/jugadores/pereira/gtorres.png" }
],
  "Pasto": [
  { nombre: "D.Martinez", edad: 35, media: 64, posicion: "Portero", foto: "img/jugadores/pasto/dmarti.png"  },
  { nombre: "A.Cabezas", edad: 28, media: 64, posicion: "Portero", foto: "img/jugadores/pasto/cabezas.png"  },

  { nombre: "N.Gil", edad: 28, media: 65, posicion: "Defensa", foto: "img/jugadores/pasto/giln.png"  },
  { nombre: "J.Ossa", edad: 27, media: 65, posicion: "Defensa", foto: "img/jugadores/pasto/ossa.png"  },
  { nombre: "M.Castaño", edad: 31, media: 65, posicion: "Defensa" , foto: "img/jugadores/pasto/castaño.png" },
  { nombre: "S.Jimenez", edad: 27, media: 66, posicion: "Defensa" , foto: "img/jugadores/pasto/jimenez.png" },

  { nombre: "F.Jaramillo", edad: 29, media: 67, posicion: "Pivote" , foto: "img/jugadores/pasto/jaramillo.png" },
  { nombre: "K.Rendon", edad: 32, media: 66, posicion: "Volante", foto: "img/jugadores/pasto/rendon.png"  },
  { nombre: "G.Ritacco", edad: 32, media: 64, posicion: "Volante" , foto: "img/jugadores/pasto/ritacco.png" },

  { nombre: "F.Bone", edad: 29, media: 70, posicion: "Delantero", foto: "img/jugadores/pasto/bone.png"  },
  { nombre: "J.Rivas", edad: 28, media: 65, posicion: "Delantero", foto: "img/jugadores/pasto/rivas.png"  },
  { nombre: "D.Camacho", edad: 28, media: 66, posicion: "Delantero" , foto: "img/jugadores/pasto/camacho.png" },
  { nombre: "J.Valois", edad: 21, media: 66, posicion: "Delantero" , foto: "img/jugadores/pasto/valois.png" }
],

"Bucaramanga": [
  { nombre: "A.Quintana", edad: 31, media: 72, posicion: "Portero" , foto: "img/jugadores/bucaramanga/aldair.png" },
  { nombre: "L.Vasquez", edad: 29, media: 66, posicion: "Portero" , foto: "img/jugadores/bucaramanga/erney.png" },

  { nombre: "J.Mena", edad: 36, media: 66, posicion: "Defensa", foto: "img/jugadores/bucaramanga/mena.png"  },
  { nombre: "C.de las Salas", edad: 27, media: 65, posicion: "Defensa" , foto: "img/jugadores/bucaramanga/cdls.png" },
  { nombre: "J.Garcia", edad: 22, media: 65, posicion: "Defensa", foto: "img/jugadores/bucaramanga/joseg.png"  },
  { nombre: "C.Henao", edad: 36, media: 66, posicion: "Defensa", foto: "img/jugadores/bucaramanga/henao.png"  },
  { nombre: "C.Romaña", edad: 25, media: 65, posicion: "Defensa", foto: "img/jugadores/bucaramanga/romana.png"  },
  { nombre: "B.Duarte", edad: 22, media: 65, posicion: "Defensa" , foto: "img/jugadores/bucaramanga/duarte.png" },

  { nombre: "F.Sambueza", edad: 37, media: 71, posicion: "Volante", foto: "img/jugadores/bucaramanga/sambueza.png"  },
  { nombre: "F.Castro", edad: 33, media: 67, posicion: "Pivote", foto: "img/jugadores/bucaramanga/fabry.png"  },
  { nombre: "L.Florez", edad: 30, media: 65, posicion: "Pivote", foto: "img/jugadores/bucaramanga/leoflo.png"  },
  { nombre: "K.Londoño", edad: 31, media: 66, posicion: "Volante" , foto: "img/jugadores/bucaramanga/klondono.png" },
  { nombre: "N.Moreno", edad: 28, media: 67, posicion: "Volante", foto: "img/jugadores/bucaramanga/neyder.png"  },
  { nombre: "F.Charrupi", edad: 24, media: 65, posicion: "Volante", foto: "img/jugadores/bucaramanga/felix.png"  },
  { nombre: "G.Charrupi", edad: 21, media: 65, posicion: "Volante" , foto: "img/jugadores/bucaramanga/gustavo.png" },

  { nombre: "L.Pons", edad: 35, media: 71, posicion: "Delantero", foto: "img/jugadores/bucaramanga/pons.png"  },
  { nombre: "Faber Gil", edad: 30, media: 66, posicion: "Delantero", foto: "img/jugadores/bucaramanga/gil.png"  },
  { nombre: "F.Hinestroza", edad: 35, media: 66, posicion: "Delantero" , foto: "img/jugadores/bucaramanga/fredy.png" },
  { nombre: "J.Vasquez", edad: 30, media: 66, posicion: "Delantero" , foto: "img/jugadores/bucaramanga/jhonva.png" }
],

"Alianza": [
  { nombre: "J.Chaverra", edad: 32, media: 65, posicion: "Portero" , foto: "img/jugadores/alianza/jchaverra.png" },
  { nombre: "J.Wallens", edad: 33, media: 65, posicion: "Portero", foto: "img/jugadores/alianza/wallens.png"  },

  { nombre: "P.Franco", edad: 34, media: 66, posicion: "Defensa" , foto: "img/jugadores/alianza/pefranco.png" },
  { nombre: "J.Figueroa", edad: 29, media: 66, posicion: "Defensa" , foto: "img/jugadores/alianza/figueroa.png" },
  { nombre: "J.Garcia", edad: 36, media: 65, posicion: "Defensa" , foto: "img/jugadores/alianza/jhongar.png" },
  { nombre: "K.Suarez", edad: 23, media: 65, posicion: "Defensa" , foto: "img/jugadores/alianza/kalazan.png" },

  { nombre: "R.Manjarrez", edad: 25, media: 65, posicion: "Volante" , foto: "img/jugadores/alianza/manjarrez.png" },
  { nombre: "L.F.Perez", edad: 29, media: 65, posicion: "Pivote", foto: "img/jugadores/alianza/perez.png"  },
  { nombre: "W.Fernandez", edad: 27, media: 65, posicion: "Pivote" , foto: "img/jugadores/alianza/wiston.png" },

  { nombre: "F.Pardo", edad: 35, media: 68, posicion: "Delantero" , foto: "img/jugadores/alianza/pardo.png" },
  { nombre: "C.Lucumi", edad: 25, media: 67, posicion: "Delantero" , foto: "img/jugadores/alianza/lucumi.png" },
  { nombre: "E.Torres", edad: 27, media: 67, posicion: "Delantero", foto: "img/jugadores/alianza/torres.png"  },
  { nombre: "A.del Valle", edad: 36, media: 65, posicion: "Delantero", foto: "img/jugadores/alianza/ayron.png"  }
],

"La Equidad": [
  { nombre: "E.Esteban", edad: 25, media: 66, posicion: "Portero" , foto: "img/jugadores/equidad/eduar.png" },
  { nombre: "Y.Gomez", edad: 26, media: 66, posicion: "Portero" , foto: "img/jugadores/equidad/yimy.png" },

  { nombre: "M.Rodas", edad: 27, media: 65, posicion: "Defensa" , foto: "img/jugadores/equidad/rodas.png" },
  { nombre: "C.Vivas", edad: 23, media: 65, posicion: "Defensa", foto: "img/jugadores/equidad/vivas.png"  },
  { nombre: "Y.Gomez", edad: 28, media: 66, posicion: "Defensa" , foto: "img/jugadores/equidad/yulian.png" },
  { nombre: "Y.Abonia", edad: 25, media: 64, posicion: "Defensa", foto: "img/jugadores/equidad/abonia.png"  },

  { nombre: "J.Castilla", edad: 21, media: 66, posicion: "Pivote" , foto: "img/jugadores/equidad/castilla.png" },
  { nombre: "J.Colorado", edad: 25, media: 66, posicion: "Pivote" , foto: "img/jugadores/equidad/colorado.png" },
  { nombre: "M.Monaco" , edad: 23, media: 65, posicion: "Volante", foto: "img/jugadores/equidad/monaco.png"  },
  { nombre: "J.Masllorens", edad: 24, media: 65, posicion: "Pivote" , foto: "img/jugadores/equidad/masllorens.png" },
  { nombre: "S.Mayo", edad: 22, media: 64, posicion: "Pivote" , foto: "img/jugadores/equidad/mayo.png" },
  { nombre: "F.Gonzalez", edad: 21, media: 66, posicion: "Volante" , foto: "img/jugadores/equidad/cepillo.png" },

  { nombre: "J.Valencia", edad: 21, media: 65, posicion: "Delantero", foto: "img/jugadores/equidad/valencia.png"  },
  { nombre: "J.Bolivar", edad: 23, media: 63, posicion: "Delantero" , foto: "img/jugadores/equidad/bolivar.png" },
  { nombre: "K.Parra", edad: 22, media: 66, posicion: "Delantero" , foto: "img/jugadores/equidad/parra.png" }
],

"Águilas": [
  { nombre: "W.Fariñez", edad: 27, media: 67, posicion: "Portero", foto: "img/jugadores/aguilas/farinez.png"  },
  { nombre: "G.Banguera", edad: 29, media: 66, posicion: "Portero" , foto: "img/jugadores/aguilas/banguera.png" },

  { nombre: "D.Hernandez", edad: 25, media: 65, posicion: "Defensa" , foto: "img/jugadores/aguilas/hernandez.png" },
  { nombre: "S.Rodriguez", edad: 24, media: 65, posicion: "Defensa" , foto: "img/jugadores/aguilas/sebastian.png" },
  { nombre: "H.Lopez", edad: 34, media: 65, posicion: "Defensa" , foto: "img/jugadores/aguilas/lopez.png" },
  { nombre: "M.Puerta", edad: 28, media: 66, posicion: "Defensa" , foto: "img/jugadores/aguilas/puerta.png" },
  { nombre: "D.Alfonzo", edad: 25, media: 66, posicion: "Defensa" , foto: "img/jugadores/aguilas/delvin.png" },
  { nombre: "J.Mena", edad: 20, media: 64, posicion: "Defensa" , foto: "img/jugadores/aguilas/mena.png" },

  { nombre: "J.Pineda", edad: 28, media: 67, posicion: "Volante", foto: "img/jugadores/aguilas/pineda.png"  },
  { nombre: "F.Lozano", edad: 32, media: 67, posicion: "Pivote" , foto: "img/jugadores/aguilas/lozano.png" },
  { nombre: "H.Mansilla", edad: 33, media: 65, posicion: "Pivote" , foto: "img/jugadores/aguilas/mansilla.png" },

  { nombre: "W.Morelo", edad: 38, media: 67, posicion: "Delantero", foto: "img/jugadores/aguilas/morelo.png"  },
  { nombre: "J.Rivaldo", edad: 22, media: 66, posicion: "Delantero" , foto: "img/jugadores/aguilas/rivaldo.png" },
  { nombre: "Y.Gonzalez", edad: 31, media: 68, posicion: "Delantero", foto: "img/jugadores/aguilas/yony.png"  },
  { nombre: "J.Obregon", edad: 28, media: 66, posicion: "Delantero", foto: "img/jugadores/aguilas/obregon.png"  },
  { nombre: "M.Ramirez", edad: 26, media: 67, posicion: "Delantero" , foto: "img/jugadores/aguilas/matias.png" },
  { nombre: "J.Caballero", edad: 27, media: 66, posicion: "Delantero", foto: "img/jugadores/aguilas/pino.png"  }
],

"Fortaleza": [
  { nombre: "J.Garcia", edad: 20, media: 64, posicion: "Portero", foto: "img/jugadores/fortaleza/jordan.png"  },
  { nombre: "C.Santander", edad: 22, media: 62, posicion: "Portero", foto: "img/jugadores/fortaleza/santander.png"  },

  { nombre: "Y.Diaz", edad: 28, media: 65, posicion: "Defensa" , foto: "img/jugadores/fortaleza/yesid.png" },
  { nombre: "J.Marulanda", edad: 29, media: 66, posicion: "Defensa" , foto: "img/jugadores/fortaleza/marulanda.png" },
  { nombre: "L.Escorcia", edad: 21, media: 66, posicion: "Defensa" , foto: "img/jugadores/fortaleza/escorcia.png" },
  { nombre: "S.Valencia", edad: 29, media: 65, posicion: "Defensa" , foto: "img/jugadores/fortaleza/sval.png" },

  { nombre: "A.Ricaurte", edad: 34, media: 67, posicion: "Pivote" , foto: "img/jugadores/fortaleza/ricaurte.png" },
  { nombre: "L.Pico", edad: 34, media: 67, posicion: "Pivote" , foto: "img/jugadores/fortaleza/pico.png" },
  { nombre: "A.Arroyo", edad: 23, media: 66, posicion: "Volante" , foto: "img/jugadores/fortaleza/arroyo.png" },
  { nombre: "J.Velasquez", edad: 30, media: 66, posicion: "Volante" , foto: "img/jugadores/fortaleza/velasquez.png" },
  { nombre: "R.Pajaro", edad: 23, media: 65, posicion: "Pivote" , foto: "img/jugadores/fortaleza/pajaro.png" },

  { nombre: "Emilio A.", edad: 20, media: 65, posicion: "Delantero" , foto: "img/jugadores/fortaleza/emilio.png" },
  { nombre: "A.Amaya", edad: 24, media: 65, posicion: "Delantero" , foto: "img/jugadores/fortaleza/amaya.png" }
],

"Llaneros": [
  { nombre: "M.Ortega", edad: 30, media: 65, posicion: "Portero" , foto: "img/jugadores/llaneros/ortega.png" },
  { nombre: "R.Romaña", edad: 28, media: 60, posicion: "Portero" },

  { nombre: "F.Meza", edad: 34, media: 67, posicion: "Defensa", foto: "img/jugadores/llaneros/meza.png"  },
  { nombre: "O.Cabezas", edad: 28, media: 65, posicion: "Defensa" , foto: "img/jugadores/llaneros/cabezas.png" },
  { nombre: "H.Mena", edad: 24, media: 66, posicion: "Defensa" , foto: "img/jugadores/llaneros/mena.png" },
  { nombre: "A.Mojica", edad: 27, media: 65, posicion: "Defensa" , foto: "img/jugadores/llaneros/mojica.png" },

  { nombre: "C.Sierra", edad: 35, media: 67, posicion: "Pivote" , foto: "img/jugadores/llaneros/csierra.png" },
  { nombre: "Y.Goez", edad: 26, media: 66, posicion: "Pivote" , foto: "img/jugadores/llaneros/goez.png" },
  { nombre: "M.Sierra", edad: 31, media: 65, posicion: "Pivote" , foto: "img/jugadores/llaneros/msierra.png" },
  { nombre: "A.Lopez", edad: 22, media: 65, posicion: "Pivote", foto: "img/jugadores/llaneros/lopez.png"  },
   { nombre: "B.Urueña", edad: 33, media: 66, posicion: "Volante" , foto: "img/jugadores/llaneros/uruena.png" },

  { nombre: "M.Rangel", edad: 34, media: 67, posicion: "Delantero" , foto: "img/jugadores/llaneros/rangel.png" },
  { nombre: "D.Mantilla", edad: 28, media: 67, posicion: "Delantero" , foto: "img/jugadores/llaneros/mantilla.png" },
  { nombre: "E.Bodencer", edad: 25, media: 66, posicion: "Delantero" , foto: "img/jugadores/llaneros/bodencer.png" },
  { nombre: "J.Angulo", edad: 23, media: 67, posicion: "Delantero", foto: "img/jugadores/llaneros/jas.png"  }
 
],

"Union M.": [
  { nombre: "J.Mattalia", edad: 33, media: 63, posicion: "Portero"  , foto: "img/jugadores/union/mattalia.png"},
  { nombre: "M.Tasso", edad: 24, media: 60, posicion: "Portero"  , foto: "img/jugadores/union/tasso.png"},

  { nombre: "N.Ramos", edad: 26, media: 65, posicion: "Defensa"  , foto: "img/jugadores/union/ramos.png"},
  { nombre: "H.Urrego", edad: 32, media: 63, posicion: "Defensa"  , foto: "img/jugadores/union/urrego.png"},
  { nombre: "D.Mosquera", edad: 33, media: 63, posicion: "Defensa" , foto: "img/jugadores/union/dairon.png" },
  { nombre: "J.Lerma", edad: 22, media: 63, posicion: "Defensa"  , foto: "img/jugadores/union/lerma.png"},

  { nombre: "J.Sarmiento", edad: 26, media: 67, posicion: "Volante"  , foto: "img/jugadores/union/sarmiento.png"},
  { nombre: "F.Cantillo", edad: 28, media: 67, posicion: "Pivote" , foto: "img/jugadores/union/cantillo.png" },
   { nombre: "J.Congo", edad: 27, media: 65, posicion: "Pivote" , foto: "img/jugadores/union/congo.png" },

  { nombre: "R.Marquez", edad: 27, media: 66, posicion: "Delantero" , foto: "img/jugadores/union/marquez.png" },
  { nombre: "R.Hinojosa", edad: 26, media: 65, posicion: "Volante" , foto: "img/jugadores/union/hinojosa.png" },
  { nombre: "M.Martinez", edad: 27, media: 65, posicion: "Delantero"  , foto: "img/jugadores/union/misael.png"}
],

"Chico": [
  { nombre: "D.Denis", edad: 33, media: 62, posicion: "Portero", foto: "img/jugadores/chico/denis.png" },
  { nombre: "R.Caicedo", edad: 31, media: 61, posicion: "Portero" , foto: "img/jugadores/chico/rogerio.png"},

  { nombre: "F.Salas", edad: 28, media: 64, posicion: "Defensa", foto: "img/jugadores/chico/salas.png" },
  { nombre: "E.Peralta", edad: 24, media: 64, posicion: "Defensa", foto: "img/jugadores/chico/peralta.png" },
  { nombre: "J.Ampudia", edad: 25, media: 65, posicion: "Defensa" , foto: "img/jugadores/chico/ampudia.png"},
  { nombre: "K.Cortes", edad: 22, media: 63, posicion: "Pivote", foto: "img/jugadores/chico/cortes.png" },

  { nombre: "D.Ramirez", edad: 24, media: 65, posicion: "Volante", foto: "img/jugadores/chico/delio.png" },
  { nombre: "E.Camargo", edad: 23, media: 63, posicion: "Pivote", foto: "img/jugadores/chico/camargo.png" },
  { nombre: "J.Bocanegra", edad: 27, media: 65, posicion: "Volante", foto: "img/jugadores/chico/bocanegra.png" },

  { nombre: "M.Gomez", edad: 28, media: 64, posicion: "Delantero", foto: "img/jugadores/chico/nike.png" },
  { nombre: "V.Hernandez", edad: 36, media: 69, posicion: "Delantero" , foto: "img/jugadores/chico/vladimir.png"},
  { nombre: "J.Molina", edad: 32, media: 67, posicion: "Delantero" , foto: "img/jugadores/chico/molina.png"}
],

"Envigado": [
  { nombre: "A.Tovar", edad: 19, media: 63, posicion: "Portero", foto: "img/jugadores/envigado/tovar.png" },
  { nombre: "J.P.Montoya", edad: 27, media: 65, posicion: "Portero" , foto: "img/jugadores/envigado/juanpa.png"},

  { nombre: "J.Gamboa", edad: 24, media: 63, posicion: "Defensa" , foto: "img/jugadores/envigado/gamboa.png"},
  { nombre: "D.Palacios", edad: 21, media: 62, posicion: "Defensa", foto: "img/jugadores/envigado/dipal.png" },
  { nombre: "Neymar U.", edad: 21, media: 63, posicion: "Defensa" , foto: "img/jugadores/envigado/neymar.png"},
  { nombre: "B.Agron", edad: 24, media: 62, posicion: "Defensa", foto: "img/jugadores/envigado/agron.png" },

  { nombre: "W.Hurtado", edad: 21, media: 60, posicion: "Volante" , foto: "img/jugadores/envigado/hurtado.png"},
  { nombre: "Edison L.", edad: 26, media: 64, posicion: "Volante", foto: "img/jugadores/envigado/elopez.png" },
  { nombre: "L.Angulo", edad: 24, media: 62, posicion: "Pivote", foto: "img/jugadores/envigado/angulo.png" },

  { nombre: "S.Londoño", edad: 17, media: 64, posicion: "Delantero" , foto: "img/jugadores/envigado/londono.png"},
  { nombre: "B.Garces", edad: 32, media: 65, posicion: "Delantero" , foto: "img/jugadores/envigado/garces.png"},
  { nombre: "L.Diaz", edad: 21, media: 64, posicion: "Delantero", foto: "img/jugadores/envigado/diaz.png" }
],
  
  // Segunda División 
   "Jaguares": [
  { nombre: "J.Figueroa", edad: 32, media: 66, posicion: "Portero" , foto: "img/jugadores/jaguares/figue.png"},
  { nombre: "V.Brid", edad: 25, media: 60, posicion: "Portero", foto: "img/jugadores/jaguares/brid.png" },

  { nombre: "K.Saucedo", edad: 25, media: 64, posicion: "Defensa" , foto: "img/jugadores/jaguares/saucedo.png"},
  { nombre: "J.Altamiranda", edad: 25, media: 65, posicion: "Defensa", foto: "img/jugadores/jaguares/alta.png" },
  { nombre: "R.Lora", edad: 28, media: 64, posicion: "Defensa", foto: "img/jugadores/jaguares/lora.png" },
  { nombre: "J.Herrera", edad: 24, media: 64, posicion: "Defensa", foto: "img/jugadores/jaguares/herrera.png" },

  { nombre: "J.Andrade", edad: 29, media: 64, posicion: "Volante", foto: "img/jugadores/jaguares/andrade.png" },
  { nombre: "J.Maza", edad: 31, media: 64, posicion: "Delantero" , foto: "img/jugadores/jaguares/maza.png"},
  { nombre: "J.Roa", edad: 31, media: 64, posicion: "Pivote", foto: "img/jugadores/jaguares/roa.png" },
  { nombre: "D.Pino", edad: 30, media: 64, posicion: "Pivote", foto: "img/jugadores/jaguares/pino.png" },
  { nombre: "D.Padilla", edad: 31, media: 63, posicion: "Pivote" , foto: "img/jugadores/jaguares/padilla.png"},

  { nombre: "D.Ceter", edad: 28, media: 65, posicion: "Delantero" , foto: "img/jugadores/jaguares/ceter.png"},
  { nombre: "K.Lenis", edad: 24, media: 63, posicion: "Delantero" , foto: "img/jugadores/jaguares/lenis.png"},
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

  { nombre: "J.Rodriguez", edad: 33, media: 66, posicion: "Pivote", foto: "img/jugadores/cartagena/jrod.png" },
  { nombre: "F.Acosta", edad: 31, media: 65, posicion: "Pivote" , foto: "img/jugadores/cartagena/acosta.png"},
  { nombre: "C.Marrugo", edad: 40, media: 68, posicion: "Volante", foto: "img/jugadores/cartagena/marrugo.png" },
  { nombre: "M.Ortega", edad: 34, media: 65, posicion: "Volante", foto: "img/jugadores/cartagena/ortega.png" },

  { nombre: "F.Montero", edad: 38, media: 69, posicion: "Delantero" , foto: "img/jugadores/cartagena/montero.png"},
  { nombre: "A.Melendez", edad: 28, media: 65, posicion: "Delantero" , foto: "img/jugadores/cartagena/melendez.png"},
  { nombre: "W.de la Rosa", edad: 32, media: 66, posicion: "Delantero", foto: "img/jugadores/cartagena/dlarosa.png" },
  { nombre: "M.Murillo", edad: 32, media: 64, posicion: "Delantero", foto: "img/jugadores/cartagena/murillo.png" },
  { nombre: "S.Gomez", edad: 29, media: 65, posicion: "Delantero", foto: "img/jugadores/cartagena/gomez.png" }
],

"Cucuta": [
  { nombre: "J.Ramirez", edad: 28, media: 63, posicion: "Portero", foto: "img/jugadores/cucuta/ramirez.png" },
  { nombre: "R.Sanchez", edad: 42, media: 64, posicion: "Portero" , foto: "img/jugadores/cucuta/ramiro.png"},
  { nombre: "S.Roman", edad: 30, media: 63, posicion: "Portero", foto: "img/jugadores/cucuta/roman.png" },

  { nombre: "H.Plazas", edad: 32, media: 64, posicion: "Defensa", foto: "img/jugadores/cucuta/plazas.png" },
  { nombre: "L.Payares", edad: 35, media: 63, posicion: "Defensa" , foto: "img/jugadores/cucuta/payares.png"},
  { nombre: "D.Calcaterra", edad: 24, media: 64, posicion: "Defensa", foto: "img/jugadores/cucuta/calcaterra.png" },
  { nombre: "L.Hinestroza", edad: 22, media: 63, posicion: "Defensa" },
  { nombre: "M.Duarte", edad: 33, media: 63, posicion: "Defensa", foto: "img/jugadores/cucuta/mao.png" },

  { nombre: "S.Tamara", edad: 29, media: 66, posicion: "Volante", foto: "img/jugadores/cucuta/tamara.png" },
  { nombre: "J.Ceballos", edad: 26, media: 65, posicion: "Volante", foto: "img/jugadores/cucuta/ceballos.png" },
  { nombre: "C.Alvarez", edad: 33, media: 68, posicion: "Volante", foto: "img/jugadores/cucuta/jopito.png" },
  { nombre: "L.Rios", edad: 27, media: 66, posicion: "Volante" , foto: "img/jugadores/cucuta/lucas.png"},
  { nombre: "S.Orozco", edad: 29, media: 64, posicion: "Volante", foto: "img/jugadores/cucuta/orozco.png" },

   { nombre: "W.Cruz", edad: 32, media: 66, posicion: "Delantero", foto: "img/jugadores/cucuta/cruz.png" },
  { nombre: "M.Pisano", edad: 33, media: 68, posicion: "Delantero" , foto: "img/jugadores/cucuta/pisano.png"},
  { nombre: "J.Peralta", edad: 20, media: 65, posicion: "Delantero", foto: "img/jugadores/cucuta/peralta.png" },
  { nombre: "J.Agudelo", edad: 32, media: 65, posicion: "Delantero" , foto: "img/jugadores/cucuta/agudelo.png"}
],

"Huila": [
  { nombre: "J.Mendez", edad: 25, media: 65, posicion: "Portero" , foto: "img/jugadores/huila/mendez.png"},
  { nombre: "L.Mena", edad: 20, media: 62, posicion: "Portero" , foto: "img/jugadores/huila/mena.png" },

  { nombre: "A.Mejia", edad: 29, media: 63, posicion: "Defensa", foto: "img/jugadores/huila/amejia.png" },
  { nombre: "F.Arbelaez", edad: 29, media: 64, posicion: "Defensa" , foto: "img/jugadores/huila/arbelaez.png"},
  { nombre: "J.Rodriguez", edad: 22, media: 64, posicion: "Defensa" },
  { nombre: "D.Ferrer", edad: 19, media: 63, posicion: "Defensa" },

  { nombre: "S.Hernandez", edad: 39, media: 65, posicion: "Volante" , foto: "img/jugadores/huila/shern.png"},
  { nombre: "F.Rodriguez", edad: 38, media: 63, posicion: "Defensa" , foto: "img/jugadores/huila/frod.png"},
  { nombre: "D.Villa", edad: 23, media: 63, posicion: "Pivote" , foto: "img/jugadores/huila/villa.png"},
  { nombre: "A.Ararat", edad: 19, media: 65, posicion: "Pivote" , foto: "img/jugadores/huila/ararat.png"},
   
  { nombre: "S.Lora", edad: 29, media: 63, posicion: "Delantero" , foto: "img/jugadores/huila/lora.png"},
  { nombre: "B.Moya", edad: 22, media: 63, posicion: "Delantero" },
  { nombre: "T.Diaz", edad: 20, media: 63, posicion: "Delantero" },
  { nombre: "H.Mena", edad: 25, media: 62, posicion: "Delantero" , foto: "img/jugadores/huila/hmena.png"  },
  { nombre: "J.Montes", edad: 28, media: 63, posicion: "Delantero" , foto: "img/jugadores/huila/montes.png"},
  { nombre: "O.Duarte", edad: 30, media: 67, posicion: "Delantero", foto: "img/jugadores/huila/omar.png" }
],

"Patriotas": [
  { nombre: "J.Espitia", edad: 25, media: 63, posicion: "Portero", foto: "img/jugadores/patriotas/espitia.png" },
  { nombre: "J.Amaya", edad: 23, media: 60, posicion: "Portero" },

  { nombre: "M.Garavito", edad: 25, media: 64, posicion: "Defensa", foto: "img/jugadores/patriotas/garavito.png" },
  { nombre: "J.Hurtado", edad: 27, media: 63, posicion: "Defensa", foto: "img/jugadores/patriotas/hurtado.png" },
  { nombre: "L.Renteria", edad: 19, media: 63, posicion: "Defensa" , foto: "img/jugadores/patriotas/renteria.png"},
  { nombre: "V.Perea", edad: 28, media: 63, posicion: "Defensa", foto: "img/jugadores/patriotas/perea.png" },

  { nombre: "M.Figueroa", edad: 27, media: 63, posicion: "Volante" , foto: "img/jugadores/patriotas/maclein.png"}, 
  { nombre: "K.Alvarez", edad: 20, media: 65, posicion: "Volante" , foto: "img/jugadores/patriotas/kevin.png"},
  { nombre: "K.Salazar", edad: 28, media: 65, posicion: "Pivote" , foto: "img/jugadores/patriotas/brayan.png"},
  { nombre: "J.Aristizabal", edad: 24, media: 62, posicion: "Volante" , foto: "img/jugadores/patriotas/aristisabal.png"},
  
  { nombre: "B.Fernandez", edad: 33, media: 63, posicion: "Delantero" , foto: "img/jugadores/patriotas/brayan.png"},
  { nombre: "E.Sarria", edad: 25, media: 63, posicion: "Delantero" , foto: "img/jugadores/patriotas/sarria.png"},
  { nombre: "R.Rivas", edad: 28, media: 63, posicion: "Delantero" , foto: "img/jugadores/patriotas/rivas.png"},
  { nombre: "D.Conejero", edad: 22, media: 63, posicion: "Delantero"}
],

"Real Cundi": [
  { nombre: "K.Cataño", edad: 22, media: 64, posicion: "Portero", foto: "img/jugadores/cundi/catano.png" },
  { nombre: "K.Hinestroza", edad: 20, media: 58, posicion: "Portero"  },

  { nombre: "J.Viveros", edad: 22, media: 63, posicion: "Defensa" , foto: "img/jugadores/cundi/viveros.png" },
  { nombre: "B.Suaza", edad: 23, media: 63, posicion: "Defensa" , foto: "img/jugadores/cundi/suaza.png" },
  { nombre: "S.Moreno", edad: 22, media: 63, posicion: "Defensa" },
  { nombre: "J.Cajares", edad: 22, media: 63, posicion: "Defensa" , foto: "img/jugadores/cundi/cajares.png" },
  { nombre: "S.Barbosa", edad: 21, media: 63, posicion: "Defensa" , foto: "img/jugadores/cundi/barbosa.png" },

  { nombre: "M.Castaño", edad: 26, media: 64, posicion: "Volante" , foto: "img/jugadores/cundi/castano.png" },
  { nombre: "W.Davila", edad: 24, media: 62, posicion: "Volante" , foto: "img/jugadores/cundi/davila.png" },
  { nombre: "I.Camacho", edad: 21, media: 62, posicion: "Pivote" , foto: "img/jugadores/cundi/camacho.png" },
  { nombre: "J.Rubiano", edad: 23, media: 63, posicion: "Volante" , foto: "img/jugadores/cundi/rubiano.png" },

  { nombre: "J.Asprilla", edad: 22, media: 65, posicion: "Delantero", foto: "img/jugadores/cundi/asprilla.png"  },
  { nombre: "C.Negrete", edad: 18, media: 62, posicion: "Delantero" },
  { nombre: "A.Rocha", edad: 22, media: 65, posicion: "Delantero", foto: "img/jugadores/cundi/rocha.png"  }
],

"Inter Palmira": [
  { nombre: "J.Escobar", edad: 38, media: 60, posicion: "Portero" , foto: "img/jugadores/palmira/huber.png" },
  { nombre: "A.Cadavid", edad: 34, media: 63, posicion: "Portero", foto: "img/jugadores/palmira/arled.png"  },

  { nombre: "G.Perea", edad: 34, media: 64, posicion: "Defensa", foto: "img/jugadores/palmira/geisson.png"  },
  { nombre: "D.Quiñones", edad: 26, media: 65, posicion: "Defensa" , foto: "img/jugadores/palmira/raton.png" },
  { nombre: "Y.Gonzalez", edad: 35, media: 65, posicion: "Defensa", foto: "img/jugadores/palmira/yoiver.png"  },

  { nombre: "H.Angulo", edad: 25, media: 63, posicion: "Pivote", foto: "img/jugadores/palmira/hermes.png"  },
  { nombre: "C.Franco", edad: 21, media: 63, posicion: "Pivote" , foto: "img/jugadores/palmira/franco.png" },
  { nombre: "H.Suarez", edad: 31, media: 63, posicion: "Pivote" , foto: "img/jugadores/palmira/harlin.png" },
  { nombre: "J.Guzman", edad: 20, media: 63, posicion: "Volante" , foto: "img/jugadores/palmira/guzman.png" },

  { nombre: "J.Arango", edad: 34, media: 66, posicion: "Delantero" , foto: "img/jugadores/palmira/arango.png" },
  { nombre: "V.Ibarbo", edad: 35, media: 66, posicion: "Delantero", foto: "img/jugadores/palmira/ibarbo.png"  },
  { nombre: "D.Rodriguez", edad: 30, media: 65, posicion: "Delantero", foto: "img/jugadores/palmira/dario.png"  },
  { nombre: "D.Orozco", edad: 30, media: 66, posicion: "Delantero", foto: "img/jugadores/palmira/doroz.png"  },
  { nombre: "D.Riascos", edad: 39, media: 61, posicion: "Delantero" , foto: "img/jugadores/palmira/duvier.png" }
],

"Boca Jrs. Cali": [
    { nombre: "E.Obando", edad: 23, media: 63, posicion: "Portero" , foto: "img/jugadores/quinboca/obando.png" },
    { nombre: "S.Hoyos", edad: 21, media: 60, posicion: "Portero" },

    { nombre: "H.Ortiz", edad: 21, media: 61, posicion: "Defensa", foto: "img/jugadores/quinboca/ortiz.png"  },
    { nombre: "J.Madrid", edad: 23, media: 61, posicion: "Defensa" , foto: "img/jugadores/quinboca/madrid.png" },
    { nombre: "J.Arcila", edad: 25, media: 61, posicion: "Defensa" , foto: "img/jugadores/quinboca/arcila.png" },

    { nombre: "C.Paternina", edad: 21, media: 62, posicion: "Volante" },
    { nombre: "A.Andrade", edad: 36, media: 67, posicion: "Volante", foto: "img/jugadores/quinboca/rifle.png"  },

    { nombre: "J.Mendoza", edad: 22, media: 63, posicion: "Delantero" , foto: "img/jugadores/quinboca/mendoza.png" },
    { nombre: "J.Monsalve", edad: 21, media: 60, posicion: "Delantero" , foto: "img/jugadores/quinboca/monsalve.png" },
    { nombre: "H.Romaña", edad: 21, media: 61, posicion: "Volante" },
    { nombre: "J.Jaramillo", edad: 21, media: 61, posicion: "Delantero", foto: "img/jugadores/quinboca/jaramillo.png"  }
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
    { nombre: "M.Jimenez", edad: 29, media: 62, posicion: "Portero" , foto: "img/jugadores/quinboca/jimenez.png" },
    { nombre: "S.Pabon", edad: 29, media: 61, posicion: "Portero" },

    { nombre: "K.Hurtado", edad: 20, media: 61, posicion: "Defensa", foto: "img/jugadores/quinboca/hurtado.png"  },
    { nombre: "U.Rovira", edad: 20, media: 61, posicion: "Defensa", foto: "img/jugadores/quinboca/uberney.png"  },
    { nombre: "D.Palomeque", edad: 32, media: 62, posicion: "Defensa", foto: "img/jugadores/quinboca/palomeque.png"  },

    { nombre: "W.Arango", edad: 27, media: 64, posicion: "Volante", foto: "img/jugadores/quinboca/arango.png"  },
    { nombre: "Y.Torres", edad: 26, media: 61, posicion: "Pivote", foto: "img/jugadores/quinboca/yosimarc.png" },

    { nombre: "J.Lloreda", edad: 31, media: 64, posicion: "Delantero" , foto: "img/jugadores/quinboca/lloreda.png" },
    { nombre: "J.Rodriguez", edad: 29, media: 63, posicion: "Delantero" , foto: "img/jugadores/quinboca/joao.png" }
  ],
  "Bogotá": [
    { nombre: "W.Agamez", edad: 22, media: 57, posicion: "Portero" },
    { nombre: "D.Aguilar", edad: 21, media: 59, posicion: "Portero", foto: "img/jugadores/tigota/aguilar.png"  },
    { nombre: "S.Ruiz R.", edad: 28, media: 61, posicion: "Defensa", foto: "img/jugadores/tigota/srr.png"  },
    { nombre: "D.Montien", edad: 24, media: 60, posicion: "Defensa" },
    { nombre: "F.Moreno", edad: 20, media: 62, posicion: "Volante", foto: "img/jugadores/tigota/freilin.png"  },
    { nombre: "C.Huerfano", edad: 29, media: 63, posicion: "Delantero", foto: "img/jugadores/tigota/huerfano.png"  }
  ],
  
  "Orsomarso": [
    { nombre: "B.Benitez", edad: 22, media: 59, posicion: "Portero", foto: "img/jugadores/orsonder/benitez.png" },
    { nombre: "H.Arango", edad: 23, media: 61, posicion: "Portero", foto: "img/jugadores/orsonder/arango.png" },

    { nombre: "D.Barrios", edad: 21, media: 62, posicion: "Defensa", foto: "img/jugadores/orsonder/deivi.png" },

    { nombre: "A.Montaño", edad: 25, media: 60, posicion: "Volante", foto: "img/jugadores/orsonder/montano.png" },
    { nombre: "S.Lopez", edad: 23, media: 62, posicion: "Volante", foto: "img/jugadores/orsonder/lopez.png" },
    { nombre: "N.Rengifo", edad: 21, media: 62, posicion: "Volante", foto: "img/jugadores/orsonder/rengifo.png" },

    { nombre: "J.J.Salcedo", edad: 32, media: 66, posicion: "Delantero" , foto: "img/jugadores/orsonder/salcedo.png"},
    { nombre: "S.Girado", edad: 21, media: 65, posicion: "Delantero", foto: "img/jugadores/orsonder/girado.png" }
   
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



function calcularPresupuestoPorFuerza(fuerza) {
  if (fuerza >= 69) return 15000000;
  if (fuerza >= 67) return 13000000;
  if (fuerza >= 65) return 10000000;
  if (fuerza >= 63) return 7000000;
  if (fuerza >= 60) return 5000000;
  if (fuerza >= 58) return 3500000;
  return 2500000;
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
        $${(p.dinero/1e6).toFixed(1)}M<br>
        ${p.duracion} semestres
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
  alert(` ${p.nombre} ahora patrocina a tu club por ${p.duracion} semestres.`);
}

function actualizarPatrocinadorActivo() {
  const cont = document.getElementById("patrocinadorActivo");
  if (!cont) return;

  if (!patrocinadorActivo) {
    cont.className = "empty";
    cont.innerHTML = "No tienes patrocinador activo.";
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
    const renovar = confirm(` El contrato con ${patrocinadorActivo.nombre} terminó. ¿Renovar por ${patrocinadorActivo.duracion} semestres más?`);
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



// ==========================
// ASAMBLEA DIMAYOR
// ==========================

let patrocinadorLiga = "BetPlay";
let derechosTV = { canal: "WIN Sports", monto: 1500000, logo: "logos/win.png" };
let ultimaAsamblea = 2025;
let temaActual = null;
let equiposLiga = equiposPrimera.length; // 👈 ahora vale 20

function verificarAsambleaDimayor() {
  // Cada 2 años (4 semestres)
  if ((temporadaActual - ultimaAsamblea) >= 2 && semestreActual === 1) {
    mostrarModalAsamblea();
    ultimaAsamblea = temporadaActual;
  }
}

function mostrarModalAsamblea() {
  const modal = document.createElement("div");
  modal.id = "modalAsamblea";
  modal.className = "modal-asamblea";
  modal.innerHTML = `
    <div class="modal-content-asamblea">
      <h2>Asamblea Dimayor ${temporadaActual}</h2>
      <p><strong>Liga actual:</strong> Liga ${patrocinadorLiga} Dimayor</p>
      <p><img src="${derechosTV.logo}" alt="logo" style="height:25px;"> 
      <strong>Derechos TV:</strong> ${derechosTV.canal} - Monto: $${derechosTV.monto.toLocaleString()}</p>
      <button id="btnIniciarAsamblea">Empezar Asamblea</button>
    </div>
  `;
  document.body.appendChild(modal);
  document.getElementById("btnIniciarAsamblea").onclick = iniciarAsambleaDimayor;
}

// 📋 Lista fija de propuestas (puedes agregar todas las que quieras)
const temasAsamblea = [
  // 🔹 Patrocinadores
  { tipo: "patrocinador", propuesta: "Cambiar patrocinador principal a Postobon" },
  { tipo: "patrocinador", propuesta: "Cambiar patrocinador principal: Stake" },
  { tipo: "patrocinador", propuesta: "Cambiar patrocinador principal: Betsson" },
  { tipo: "patrocinador", propuesta: "Cambiar patrocinador principal: Aguila" },
  { tipo: "patrocinador", propuesta: "Cambiar patrocinador principal: Wplay" },

  // 🔹 Televisión
  { tipo: "tv", propuesta: "Firmar contrato de TV con Gol Caracol" },
  { tipo: "tv", propuesta: "Firmar contrato de TV con WIN Sports" },
  { tipo: "tv", propuesta: "Firmar contrato de TV con ESPN" },
  { tipo: "tv", propuesta: "Firmar contrato de TV con RCN Deportes" },
  { tipo: "tv", propuesta: "Firmar contrato de TV con DirecTV" },
  { tipo: "tv", propuesta: "Firmar contrato de TV con RTVC" },
  { tipo: "tv", propuesta: "Crear Nuevo Canal de TV ,  Dimayor TV" },
  { tipo: "tv", propuesta: "Firmar contrato con Netflix por transmision exclusiva" },
  { tipo: "tv", propuesta: "Firmar contrato con Disney+ para derechos internacionales" },

   // 🔹 Formatos
  { tipo: "formato", propuesta: "Reducir la liga a 18 equipos" },
  { tipo: "formato", propuesta: "Aumentar la liga a 22 equipos" },

  // 🔹 Simbólicos (sin efecto real)
  { tipo: "var", propuesta: "Invertir en la implementacion del VAR   para segunda division" }

];

function iniciarAsambleaDimayor() {
  const modal = document.querySelector("#modalAsamblea .modal-content-asamblea");

  // 🧠 Filtra los temas para no repetir patrocinador o canal actual
  const temasFiltrados = temasAsamblea.filter(t => {
  if (t.tipo === "tv" && t.propuesta.includes(derechosTV.canal)) return false;
  if (t.tipo === "patrocinador" && t.propuesta.includes(patrocinadorLiga)) return false;
  if (t.tipo === "formato" && equiposLiga === 18 && t.propuesta.includes("18 equipos")) return false;
  if (t.tipo === "formato" && equiposLiga === 22 && t.propuesta.includes("22 equipos")) return false;
  return true;
});

  // ✄1�7 Si después del filtro no queda ninguno, usar todos (por seguridad)
  const temasDisponibles = temasFiltrados.length > 0 ? temasFiltrados : temasAsamblea;

  // 🎲 Escoge un tema aleatorio del grupo disponible
  const tema = temasDisponibles[Math.floor(Math.random() * temasDisponibles.length)];

  // Guardar tipo y texto de la propuesta
  temaActual = tema.tipo;
  propuestaActual = tema.propuesta;

  // 🧾 Interfaz del modal
  modal.innerHTML = `
    <h3>Presidente Dimayor:</h3>
    <p id="temaAsamblea">Propuesta: ${tema.propuesta}</p>
    <div id="votacionAsamblea" style="margin-top:10px;">
      <button id="btnSi">Si</button>
      <button id="btnNo">No</button>
    </div>
    <div id="resultadoAsamblea" style="margin-top:10px;"></div>
  `;

  // 🗳︄1�7 Votación (usuario)
  document.getElementById("btnSi").onclick = () => simularVotacion(true);
  document.getElementById("btnNo").onclick = () => simularVotacion(false);
}

function simularVotacion(votoUsuario) {
  const totalPresidentesIA = 35; // 35 presidentes IA + tú = 36
  let votosSi = 0;
  let votosNo = 0;

  // 🎯 Ajustar probabilidad de voto "Sí" según el tipo de tema
  let probabilidadSi = 0.5;
  switch (temaActual) {
    case "patrocinador":
      probabilidadSi = 0.7; // 💰 Suelen aprobar patrocinadores nuevos
      break;
    case "tv":
      probabilidadSi = 0.6; // 📺 TV genera debate pero se aprueba con frecuencia
      break;
    case "formato":
      probabilidadSi = 0.55; // ⚄1�7 Cambios de formato son más discutidos
      break;
    case "var":
      probabilidadSi = 0.65; // 🖥︄1�7 Mejora tecnológica, suele aprobarse
      break;
  }

  // 🧠 Cada presidente IA vota una vez
  for (let i = 0; i < totalPresidentesIA; i++) {
    const voto = Math.random() < probabilidadSi;
    if (voto) votosSi++;
    else votosNo++;
  }

  // 👤 Agregar el voto del usuario
  if (votoUsuario) votosSi++;
  else votosNo++;

  // 📊 Mostrar resultado total
  const resultado = document.getElementById("resultadoAsamblea");
  resultado.innerHTML = `
    <p>Votos a favor: ${votosSi}</p>
    <p>Votos en contra: ${votosNo}</p>
    <p>= Total votos: ${votosSi + votosNo} (35 IA + Tú)</p>
  `;

  // ⚖️ Evaluar resultado (24 votos o más = aprobado)
  if (votosSi >= 24) {
    resultado.innerHTML += `<p>Aprobado por mayoría calificada (${votosSi} votos a favor)</p>`;
    aplicarDecisionAsamblea();
  } else {
    resultado.innerHTML += `<p>No aprobado (se requieren 24 votos a favor)</p>`;
  }

  // ⏄1�7 Cierra el modal después de unos segundos
  setTimeout(() => cerrarAsamblea(), 8000);
}



function aplicarDecisionAsamblea() {
  if (temaActual === "patrocinador") {
    if (propuestaActual.includes("Postobon")) patrocinadorLiga = "Postobon";
    else if (propuestaActual.includes("Stake")) patrocinadorLiga = "Stake";
    else if (propuestaActual.includes("Betsson")) patrocinadorLiga = "Betsson";
    else if (propuestaActual.includes("Aguila")) patrocinadorLiga = "Aguila";
    else if (propuestaActual.includes("Wplay")) patrocinadorLiga = "Wplay";
  } 
  else if (temaActual === "tv") {
    if (propuestaActual.includes("Gol Caracol")) derechosTV = { canal: "Gol Caracol", monto: 1100000, logo: "logos/caracol.png" };
    else if (propuestaActual.includes("RCN")) derechosTV = { canal: "RCN Deportes", monto: 1000000, logo: "logos/rcn.png" };
    else if (propuestaActual.includes("Netflix")) derechosTV = { canal: "Netflix", monto: 970000, logo: "logos/netflix.png" };
    else if (propuestaActual.includes("Disney")) derechosTV = { canal: "Disney+", monto: 1900000, logo: "logos/disney.png" };
    else if (propuestaActual.includes("WIN Sports")) derechosTV = { canal: "WIN Sports", monto: 1500000, logo: "logos/win.png" };
    else if (propuestaActual.includes("DirecTV")) derechosTV = { canal: "DirecTV", monto: 1400000, logo: "logos/directv.png" };
    else if (propuestaActual.includes("ESPN")) derechosTV = { canal: "ESPN", monto: 2000000, logo: "logos/espn.png" };
    else if (propuestaActual.includes("RTVC")) derechosTV = { canal: "RTVC", monto: 600000, logo: "logos/rtvc.png" };
    else if (propuestaActual.includes("Dimayor")) derechosTV = { canal: "Dimayor TV", monto: 1400000, logo: "logos/dimayor.png" };
  } 
   else if (temaActual === "formato") {
   if (propuestaActual.includes("18 equipos")) {
    alert("Se aprobo reducir la liga a 18 equipos. Habra mas descendidos esta temporada.");
    numeroDescensos = -4; // 👈 por ejemplo, 4 descendidos
  }
   else if (propuestaActual.includes("22 equipos")) {
  alert("Se aprobo aumentar la liga a 22 equipos. Subiran mas clubes esta temporada.");
  numeroAscensosExtra = 2; // por ejemplo, 2 ascensos adicionales
}
}
  else if (temaActual === "var") {
    alert("La Dimayor aprobo inversión en el sistema VAR. Transparencia al arbitraje!");
  }
  

  actualizarDatosLigaEnPantalla();
}

function cerrarAsamblea() {
  const modal = document.getElementById("modalAsamblea");
  if (modal) modal.remove();
}

function actualizarDatosLigaEnPantalla() {
  const cont = document.getElementById("infoLiga");
  if (cont) {
    cont.innerHTML = `
      <p><strong>Liga:</strong> Liga ${patrocinadorLiga} Dimayor</p>
      <p><img src="${derechosTV.logo}" alt="logo" style="height:25px;"> 
      <strong>Derechos TV:</strong> ${derechosTV.canal} - $: $${derechosTV.monto.toLocaleString()}</p>
    `;
  }
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
          mercadoDiv.innerHTML += `<li>${equipoUsuario} no tiene presupuesto para fichar a <b>${jugador.nombre}</b>.</li>`;
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
        <li>
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




// =========================
// 📌 Esquemas tácticos
// =========================
const esquemas = {
  "4-3-3": { defensas: 4, medios: 3, delanteros: 3 },
  "4-4-2": { defensas: 4, medios: 4, delanteros: 2 },
  "3-4-3": { defensas: 3, medios: 4, delanteros: 3 },
  "4-2-4": { defensas: 4, medios: 2, delanteros: 4 },
  "3-5-2": { defensas: 3, medios: 5, delanteros: 2 },
  "5-2-3": { defensas: 5, medios: 2, delanteros: 3 },
  "5-3-2": { defensas: 5, medios: 3, delanteros: 2 }
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
       División: ${equiposPrimera.includes(nombreEquipo) ? "Primera A" : "Segunda"}<br>
       Sueldo anual total: ${formatearPrecio(sueldoSemestral)}
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





function penalizarPorNoPagarSueldos() {
  const plantilla = plantillasJugadores[equipoUsuario];
  if (plantilla && plantilla.length > 0) {
    plantilla.forEach(jugador => {
      modificarFuerzaEquipo(-10);
      jugador.media = Math.max(1, jugador.media - 5);
    });
    alert(" No pagaste los sueldos. Todos los jugadores de tu plantilla perdieron -10 de fuerza y -5 de media.");
  }
}


let numeroDescensos = -2; // valor normal
let numeroAscensosExtra = 0; // por defecto no hay ascensos adicionales

function descenso() {
  if (!descensoPendiente) {
    alert("Debes simular al menos un semestre antes de hacer descenso.");
    return;
  }

  // ✄1�7 Fin del semestre 1
  if (semestreActual < 2) {
    semestreActual++;
    preguntaAleatoria();
     simularMercadoFichajesNuevo() ;
    campeon1S = obtenerCampeonSemestre(); // Guardar campeón 1S
    alert("Fin del semestre 1. Ahora puedes simular el segundo semestre.");
    simularCopaColombiaNuevoFormato();
   procesarSemestrePatrocinio();
    return;
    
  }


  // ✄1�7 Fin de temporada (semestre 2)
  
  campeon2S = obtenerCampeonSemestre(); // Guardar campeón 2S
  procesarSemestrePatrocinio();

  // Calcular tabla anual
  let anual = Object.values(tablaAnual).map(e => ({
    ...e,
    pts: parseFloat((e.pts / 40).toFixed(3))
  }));
  anual.sort((a, b) => b.pts - a.pts || (b.gf - b.gc) - (a.gf - a.gc));
  mostrarTabla("tctr", anual, `Reclasificación - Descenso ${temporadaActual}`, false, [], true);
 
  // 👇 Usa una variable global dinámica
   let descendidos = anual.slice(numeroDescensos).map(e => e.nombre);


/*
  let descendidos = anual.slice(-4).map(e => e.nombre);
*/

  // ⚠️ Castigos por corrupción
  if (castigoPorCorrupcion) {
    alert(`ESCÁNDALO: ${castigoPorCorrupcion} fue sancionado por corrupción. -20M y -15 de media todos tus jugadores.`);
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
    alert("XX COMUNICADO DIMAYOR: Tu club perdio su ficha profesional.");
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
  let mensajeFinal = `Descendieron: ${descendidos.join(", ")}` +
                     `\nAscienden directamente: ${equiposQueAscienden.slice(0, 2).join(", ")}`;

  if (repechajeResultado) {
    mensajeFinal += `\nRepechaje de Ascenso:` +
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
    .concat(descendidos.map(nombre => ({ nombre, fuerza: 63 })));
    
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


evaluarObjetivos();
actualizarFuerzaUI();

  // Sumar 1.5M al presupuesto del equipo del usuario
const montoDerechosTV = derechosTV?.monto || 1500000;

if (!presupuestosEquipos[equipoUsuario]) {
  presupuestosEquipos[equipoUsuario] = 0;
}

presupuestosEquipos[equipoUsuario] += montoDerechosTV;
sumarPresupuesto(montoDerechosTV);
alert(` Derechos de TV pagados + $${montoDerechosTV.toLocaleString()}`);


// Sueldos semestrales (solo usuario)
let sueldoSemestral;

if (equiposPrimera.includes(equipoUsuario)) {
  sueldoSemestral = 5000000; // 💰 Primera A
} else if (equiposSegunda.some(e => e.nombre === equipoUsuario)) {
  sueldoSemestral = 2000000; // 💰 Segunda B
}

// Preguntar al usuario si quiere pagar
const quierePagar = confirm(`Deseas pagar los sueldos de la plantilla de ${equipoUsuario} por $${sueldoSemestral.toLocaleString()}?`);

if (quierePagar) {
  if (presupuestoVisible >= sueldoSemestral) {
    restarPresupuesto(sueldoSemestral);
    alert(` Sueldos pagados: $${sueldoSemestral.toLocaleString()} a la plantilla de ${equipoUsuario}.`);
  } else {
    alert("No tienes suficiente presupuesto para pagar los sueldos. Se aplicará la penalización.");
    penalizarPorNoPagarSueldos();
  }
} else {
  penalizarPorNoPagarSueldos();
}

  // 🧾 Guardar copia de la tabla anual antes de reiniciar
tablasAnualesPorTemporada[temporadaActual] = Object.values(tablaAnual);

numeroDescensos = -2; // 🔁 volver a normalidad

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
  verificarAsambleaDimayor();
  
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


let nivelCantera = 1; // Nivel inicial de la cantera (1 a 5, por ejemplo)
const costoMejoraCantera = [0, 500000, 1500000, 3000000, 6000000]; // costo por nivel

function mejorarCantera() {
  const siguienteNivel = nivelCantera + 1;

  if (siguienteNivel > 5) {
    alert("🏆 La cantera ya está en el nivel máximo (5).");
    return;
  }

  const costo = costoMejoraCantera[siguienteNivel];

  if (presupuestoVisible < costo) {
    alert(`💰 No tienes suficiente dinero. Se necesitan $${costo.toLocaleString()}`);
    return;
  }

  // Restar el costo y subir el nivel
  presupuestoVisible -= costo;
  nivelCantera = siguienteNivel;

  // Actualizar interfaz
  document.getElementById("Presupuesto").textContent = `Presupuesto: $${presupuestoVisible.toLocaleString()}`;
  document.getElementById("nivelCanteraTexto").textContent = `Nivel de Cantera: ${nivelCantera}`;

  alert(`✅ La cantera ha sido mejorada a nivel ${nivelCantera}! Los nuevos canteranos serán más talentosos.`);
}



function procesarRetirosYAltas() {
  const posiciones = ["Defensa", "Volante", "Delantero", "Pivote"];
  
  const nombres = [
  "Gómez", "Rodríguez", "Martínez", "López", "Pérez", "Ramírez", "Moreno", "Romero",
  "Hernández", "Vargas", "Jiménez", "Torres", "Silva", "Ruiz", "Mendoza", "Delgado",
  "Serrano", "Navarro", "Ortega", "Aguilar", "Suárez", "Peña", "Flores", "Campos",
  "Herrera", "García", "Fernández", "Sánchez", "Álvarez", "Molina", "Montoya",
  "Blanco", "Ibarra", "Castaño", "Mosquera", "Murillo", "Valencia", "Córdoba",
  "Palacios", "Rincón", "Cuesta", "Mejía", "Pardo", "Angulo", "Arboleda", "Castro",
  "Zapata", "Arias", "Bermúdez", "Chávez", "Forero", "Gallego", "Guerrero", "León",
  "Marín", "Montero", "Nieto", "Parra", "Quintero", "Reyes", "Salazar", "Urbina",
  "Velásquez", "Quiñones", "Bonilla", "Pineda", "Guzmán", "Cárdenas", "Ospina",
  "Rojas", "Rivera", "Gaitán", "Barrera", "Restrepo", "Tobar", "Amaya", "Téllez",
  "Barbosa", "Caicedo", "Bermúdez", "Benavides", "Grisales", "Hincapié", "Londoño",
  "Isaza", "Cadavid", "Zúñiga", "Villegas", "Osorio", "Lagos", "Lora", "Trujillo",
  "Bolaños", "Vallejo", "Arango", "Giraldo", "Patiño", "Sierra", "Camargo",
  "Orjuela", "Perdomo", "Padilla", "Galeano", "Cortés", "Fajardo", "Murcia",
  "Cifuentes", "Ramírez", "Roldán", "Lizarazo", "Botero", "Sandoval", "Tamayo",
  "Manrique", "Barreto", "Espinosa", "Cuéllar", "Montes", "Chacón", "Villalba",
  "Riaño", "Beltrán", "Bohórquez", "Pulido", "Santamaría", "Vélez", "Bonilla"
];

  const nombresCortos = [
  // Clásicos y tradicionales
  "Juan", "Luis", "Carlos", "Andrés", "Mateo", "Sebastián", "Camilo", "Santiago",
  "Tomás", "Esteban", "Lucas", "Emilio", "Iván", "Fernando", "Mario", "Julián",
  "Samuel", "David", "Miguel", "José", "Antonio", "Eduardo", "Francisco", "Felipe",
  "Cristian", "Edwin", "Jhon", "Jeison", "Yeferson", "Yimmi", "Yairo", "Fredy",
  "Oscar", "Harold", "Kevin", "Brayan", "Johan", "Darwin", "Duván", "Anderson",
  "Wilson", "Héctor", "Nelson", "Ángel", "Fabián", "Wilmar", "James", "Radamel",
  "Teófilo", "Ómar", "Leonardo", "Álvaro", "Ricardo", "Mauricio", "Giovanny",
  "Germán", "Diego", "Pablo", "Orlando", "Ramiro", "Julio", "Rubén", "Aldair",
  "Hernán", "Elkin", "Víctor", "Adrián", "Jairo", "Néstor", "Milton", "César",
  "Yeison", "Deiver", "Deiby", "Yeimar", "Yerson", "Stiven", "Stiwart", "Jordy",
  "Bayron", "Dilan", "Cristofer", "Elvis", "Sergio", "Daniel", "Alexis", "Wilmer",
  "Edgar", "Edilson", "Raúl", "Harrison", "Jimmy", "Alex", "Reinel", "Manuel",
  "Alonso", "Josué", "Edison", "Gilberto", "Hugo", "Jacobo", "Matías", "Simón",
  "Jader", "Darío", "Nicolás", "Marlon", "Jefferson", "Fabio",

  // Generación joven (nombres actuales en academias)
  "Thiago", "Elian", "Ian", "Samuel", "Emmanuel", "Cristian", "Isaac", "Jerónimo",
  "Emir", "Dylan", "Ezequiel", "Gael", "Benjamín", "Luciano", "Brayhan", "Yilmar",
  "Eyder", "Eiver", "Cristo", "Yulian", "Edier", "Stiwar", "Yair", "Yeiler", "Yilber",
  "Brayner", "Brayan", "Yeider", "Jostin", "Jhonier", "Derson", "Andry", "Wilinton",
  "Deiner", "Jordán", "Yorman", "Ariel", "Elkin", "Arley", "Yairon", "Yuber", "Yader",
  "Hansel", "Elier", "Didier", "Harlim", "Yuriel", "Yeison", "Emanuel", "Aldair",
  "Edwar", "Enmanuel", "Jhonatan", "Cristofer", "Yovani", "Maicol", "Yenner", "Jader",
  "Yeicol", "Yulián", "Brayner", "Duvan", "Yefferson", "Deivinson", "Yarison",
  "Yeison", "Wilinton", "Yhon", "Andru", "Jhostin", "Yildrey", "Jair", "Edisón",
  "Yehison", "Jorman", "Yeiner", "Yoiner", "Yadier", "Yasmani", "Braydon"
];

  // 👉 Listas globales
  let retirosTotales = [];
  let canteranosPorEquipo = {}; // { equipo: cantidad }

  for (const equipo in plantillasJugadores) {
    let plantilla = plantillasJugadores[equipo];
    let porteroReemplazado = false;
    let nuevosCanteranos = 0; // contador local por equipo

    // ✄1�7 Procesar retiros
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

    // ✄1�7 Verificar si queda portero
    const tienePortero = plantilla.some(j => j.posicion.toLowerCase() === "portero");
    if (!tienePortero || porteroReemplazado) {
      const nuevoPortero = generarJugador("Portero", nombresCortos, nombres, equipo);
      plantilla.push(nuevoPortero);
      nuevosCanteranos++;
    }

    // ✄1�7 Rellenar hasta 18 jugadores
    while (plantilla.length < 23) {
      const nuevo = generarJugador(null, nombresCortos, nombres, equipo);
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
function generarJugador(posicionFija, nombresCortos, nombres, equipoActual) {
  const posiciones = ["Defensa", "Volante", "Delantero"];

  // 🎲 Nombre aleatorio (solo colombianos)
  const nombrePropio = nombresCortos[Math.floor(Math.random() * nombresCortos.length)];
  const apellido = nombres[Math.floor(Math.random() * nombres.length)];
  const nombre = `${nombrePropio} ${apellido}`;

  // 👶 Edad entre 18 y 22
  const edad = Math.floor(Math.random() * 5) + 18;

  // ⭐ Probabilidad de promesa
  const r = Math.random();
  let media;
  let esPromesa = false;
/*
  if (r < 0.03) {
    media = Math.floor(Math.random() * 6) + 77; // 77–82
    esPromesa = true;
  } else if (r < 0.075) {
    media = Math.floor(Math.random() * 5) + 70; // 70–74
    esPromesa = true;
  } else {
    media = Math.floor(Math.random() * 10) + 58; // 58–67
  }
*/

let baseMedia;
if (r < 0.03) {
  baseMedia = Math.floor(Math.random() * 6) + 77; // 77–82
  esPromesa = true;
} else if (r < 0.075) {
  baseMedia = Math.floor(Math.random() * 5) + 70; // 70–74
  esPromesa = true;
} else {
  baseMedia = Math.floor(Math.random() * 10) + 58; // 58–67
}

// 🎓 Bonificación si es cantera del equipo del usuario
let bonificacionCantera = 0;
if (equipoActual === equipoUsuario) { // asegúrate de pasar equipoActual como parámetro
  bonificacionCantera = (nivelCantera - 1) * 2; // +2 media por nivel de cantera
}

media = Math.min(baseMedia + bonificacionCantera, 99); // no más de 99


  // ⚽ Posición
  const posicion = posicionFija || posiciones[Math.floor(Math.random() * posiciones.length)];


  return {
    nombre,
    edad,
    media,
    posicion,
    promesa: esPromesa,
  };
}











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


// Botón: Despedir
function despedirDT() {
  agregarMensaje("Creo que deberías irte del club.", "user");

  // 🔴 Si la moral está en 21–40, acepta siempre
  if (moralHinchada >= 21 && moralHinchada <= 40) {
    agregarMensaje("Acepto el despido, la situación es insostenible.", "dt");

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
    agregarMensaje("Por favor, dame una oportunidad más. Puedo mejorar.", "dt");
  }
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
