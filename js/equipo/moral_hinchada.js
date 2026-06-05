
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

//let notificacionPendiente = null; // almacena el mensaje
//let mensajesPendientes = 0;
let esDespido = false; // 🔒 flag para saber si el mensaje es de despido


function evaluarMoralHinchada() {
  if (moralEvaluadaEsteSemestre) return;

  const division = obtenerDivision(equipoUsuario);

  let mensaje = "";
  let posicionFinal = 0;
  //let campeonActual = null;

  // 🔎 Obtener posición del usuario en la tabla
  if (tabla && Array.isArray(tabla)) {
    const pos = tabla.findIndex(t => t.nombre === equipoUsuario);
    posicionFinal = pos >= 0 ? pos + 1 : null;
  }

if (division === "primera") {
  if (campeonActual === equipoUsuario) {
    mensaje = "🏆 ¡Campeón! Gran temporada coronada con el título.";

  } else if (posicionFinal === 1) {
    mensaje = "🥇 Gran campaña. Terminaste en lo más alto de la tabla.";

  } else if (posicionFinal <= 8) {
    mensaje = "💪 La hinchada está muy orgullosa. El equipo compitió con coraje y pasión.";

  } else if (posicionFinal >= 9 && posicionFinal <= 11) {
    mensaje = "😐 Estuviste cerca de clasificar. La gente reconoce el esfuerzo, pero pide más.";

  } else if (posicionFinal >= 12 && posicionFinal <= 13) {
    mensaje = "😐 Temporada discreta. Se esperaba un poco más del equipo (-1)";
    modificarFuerzaEquipo(-1);

  } else if (posicionFinal >= 14 && posicionFinal <= 15) {
    mensaje = "😕 Temporada irregular. La hinchada pide regularidad y mejores resultados. (-2)";
    modificarFuerzaEquipo(-2);

  } else if (posicionFinal >= 16 && posicionFinal <= 17) {
    mensaje = "😬 Temporada floja. Tu continuidad está en duda.(-3)";
    modificarFuerzaEquipo(-3);

  } else if (posicionFinal >= 18) {
    mensaje = "😡 Campaña decepcionante. La hinchada exige tu salida.";
    esDespido = true;
  }
}
    
  // ==========================
  // ⚽ SEGUNDA DIVISIÓN
  // ==========================
  else if (division === "segunda") {
    mensaje = "⚽ La hinchada valora el esfuerzo, pero sueña con volver o jugar la primera división.";
  }

  // ==========================
  // 🌀 FALLBACK
  // ==========================
  else {
    mensaje = "🤔 La hinchada observa en silencio... nadie sabe en qué división juega el club.";
  }

  agregarNotificacion(mensaje);
  moralEvaluadaEsteSemestre = true;
}


/*
function MostrarModal() {
  if (!notificacionPendiente) return;

  document.getElementById("notificacionTexto").innerText = notificacionPendiente;
  document.getElementById("buzonModal").style.display = "flex";

  // al abrir modal, se consume un mensaje
  mensajesPendientes--;
  notificacionPendiente = null;
  actualizarBuzon();
}
*/

let notificacionesPendientes = [];
let mensajesPendientes = 0;

function agregarNotificacion(mensaje){
    notificacionesPendientes.push(mensaje);
    mensajesPendientes++;
    actualizarBuzon();
}

function MostrarModal() {
    if (notificacionesPendientes.length === 0) return;

    let mensaje = notificacionesPendientes.shift();

    document.getElementById("notificacionTexto").innerText = mensaje;
    document.getElementById("buzonModal").style.display = "flex";

    mensajesPendientes--;
    actualizarBuzon();
}









document.getElementById("cerrarModal").onclick = function () {
  document.getElementById("buzonModal").style.display = "none";

  // ✅ ahora depende del flag, no del texto
  if (esDespido) {
      abrirDespido();
      //location.reload();
  }
// Si fue despedido, reinicia
  if (document.getElementById("notificacionTexto").innerText.includes("despedido")) {
     abrirDespido();
    //location.reload();
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


