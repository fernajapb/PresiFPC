
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

  const division = obtenerDivision(equipoUsuario);

  let mensaje = "";
  let posicionFinal = 0;
  //let campeonActual = null;

  // 🔎 Obtener posición del usuario en la tabla
  if (tabla && Array.isArray(tabla)) {
    const pos = tabla.findIndex(t => t.nombre === equipoUsuario);
    posicionFinal = pos >= 0 ? pos + 1 : null;
  }

  // ==========================
  // ⚽ PRIMERA DIVISIÓN NORMAL
  // ==========================
/*
  if (division === "primera" ) {
    if (posicionFinal === 1) {
      mensaje = "🥇 Gran campaña. Terminaste en lo más alto de la tabla.";
    } else if (posicionFinal <= 8) {
      mensaje = "💪 La hinchada está muy orgullosa. El equipo compitió con coraje y pasión.";
    } else if (posicionFinal >= 9 && posicionFinal <= 11) {
      mensaje = "😐 Estuviste cerca de clasificar. La gente reconoce el esfuerzo, pero pide más.";
    } else if (posicionFinal >= 12 && posicionFinal <= 15) {
      mensaje = "😕 Temporada irregular. La hinchada pide regularidad y mejores resultados.";
    } else if (posicionFinal >= 16 && posicionFinal <= 17) {
    mensaje = "😬 Temporada floja. Tu Continuidad esta en duda.";
    } else if (posicionFinal >= 18) {
      mensaje = "😡 Campaña decepcionante. La hinchada exige tu salida.";
      esDespido = true;
    }
  }
*/


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

  notificacionPendiente = mensaje;
  mensajesPendientes++;
  actualizarBuzon();

  moralEvaluadaEsteSemestre = true;
}




/*
function evaluarMoralHinchada() {
  if (moralEvaluadaEsteSemestre) return;

  const division = obtenerDivision(equipoUsuario);
  const modoMX = document.getElementById("modoMX")?.checked;
  const usarPlayoffs = document.getElementById("modoPlayoffs")?.checked;

  let mensaje = "";
  let posicionFinal = 0;

  // Obtener posición del equipo en la tabla
  if (tabla && Array.isArray(tabla)) {
    const pos = tabla.findIndex(t => t.nombre === equipoUsuario);
    posicionFinal = pos >= 0 ? pos + 1 : null;
  }

  // ==========================
  // ⚽ PRIMERA DIVISIÓN NORMAL
  // ==========================
  if (division === "primera" && !usarPlayoffs && !modoMX) {
    if (posicionFinal === 1) {
      mensaje = "🏆 La hinchada está eufórica. Has llevado al club a la gloria total.";
    } else if (finalistas.some(f => f.nombre === equipoUsuario)) {
      mensaje = "🥈 Gran campaña, pero la hinchada lamenta perder la final. Orgullo total.";
    } else if (posicionFinal <= 8) {
      mensaje = "💪 La hinchada está muy orgullosa. El equipo compitió con coraje y pasión.";
    } else if (posicionFinal >= 9 && posicionFinal <= 11) {
      mensaje = "😐 Estuviste cerca de clasificar. La gente reconoce el esfuerzo, pero pide más.";
    } else if (posicionFinal >= 12 && posicionFinal <= 15) {
      mensaje = "😕 Temporada irregular. La hinchada pide regularidad y mejores resultados.";
    } else if (posicionFinal >= 16) {
      mensaje = "😡 Campaña decepcionante. La hinchada exige tu salida.";
      esDespido = true;
    }
  }

  // ==========================
  // 🧩 MODO PLAYOFFS
  // ==========================
  else if (usarPlayoffs) {
    const campeonPlayoffs = ultimoCampeon;
    if (equipoUsuario === campeonPlayoffs) {
      mensaje = "🏆 La hinchada está eufórica. ¡Campeones de los Playoffs!";
    } else if (finalistas.some(f => f.nombre === equipoUsuario)) {
      mensaje = "🥈 Subcampeón. La hinchada te aplaude por llegar a la final.";
    } else if (typeof semis !== "undefined" && semis.some(p => p.equipo1 === equipoUsuario || p.equipo2 === equipoUsuario)) {
      mensaje = "💪 Gran campaña. La hinchada quedó satisfecha con el rendimiento.";
    } else {
      mensaje = "😐 Eliminación temprana. La hinchada esperaba más en los Playoffs.";
    }
  }

  // ==========================
// 🇲🇽 FORMATO MX (Play-In + Playoffs)
// ==========================
else if (modoMX) {
  const campeonMX = ultimoCampeon;

  if (equipoUsuario === campeonMX) {
    mensaje = "🏆 ¡La hinchada está loca de felicidad! Campeones del Formato MX.";
  } 
  else if (finalistas.some(f => f.nombre === equipoUsuario)) {
    mensaje = "🥈 Llegaste a la final del Formato MX. Orgullo total del club.";
  } 
  else if (typeof semis !== "undefined" && semis.some(p => p.equipo1 === equipoUsuario || p.equipo2 === equipoUsuario)) {
    mensaje = "💪 Gran torneo. La hinchada respeta el rendimiento en semifinales.";
  } 
  else if (typeof cuartos !== "undefined" && cuartos.some(p => p.equipo1 === equipoUsuario || p.equipo2 === equipoUsuario)) {
    mensaje = "😐 Eliminado en cuartos. La afición pide más ambición.";
  } 
  else if (posicionFinal >= 1 && posicionFinal <= 6) {
    // 👇 Nueva condición para los clasificados directos al playoff
    mensaje = "💪 Excelente fase regular. Clasificaste directo y la hinchada está orgullosa.";
  } 
  else if (posicionFinal >= 7 && posicionFinal <= 10) {
    mensaje = "😕 Eliminado en Play-In. La hinchada lamenta no entrar a playoffs.";
  } 
  else {
    mensaje = "😟 Temporada decepcionante. Se esperaba al menos llegar al Play-In.";
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

  notificacionPendiente = mensaje;
  mensajesPendientes++;
  actualizarBuzon();

  moralEvaluadaEsteSemestre = true;
}
*/





/*
function evaluarMoralHinchada() {
  if (moralEvaluadaEsteSemestre) return;

  const division = obtenerDivision(equipoUsuario);

  let rangosMoral;

  // ===========================
  // 🏆 PRIMERA DIVISIÓN
  // ===========================
  if (division === "primera") {
    rangosMoral = [
      { max: 10,  msg: "🟥 La hinchada está furiosa. Exige tu renuncia de inmediato.", despido: true },
      { max: 20,  msg: "🟧 La hinchada pierde la paciencia. La presión es insoportable.", despido: true },
      { max: 30,  msg: "😡 La hinchada explota. Reclama la salida del técnico y pide cambios urgentes." },
      { max: 40,  msg: "😠 La hinchada está molesta. El equipo no convence y el ambiente es tenso." },
      { max: 50,  msg: "😟 La hinchada está decepcionada. Siente que el club no da la talla." },
      { max: 60,  msg: "☹️ La hinchada se muestra frustrada. Pide compromiso y resultados." },
      { max: 70,  msg: "😕 La hinchada se impacienta. Espera una reacción del equipo." },
      { max: 80,  msg: "😐 La hinchada entiende el esfuerzo, pero exige más actitud en los partidos clave." },
      { max: 90,  msg: "😶 La hinchada reconoce algunas mejoras, pero sigue pidiendo resultados." },
      { max: 100, msg: "🙂 La hinchada valora el trabajo. Empieza a creer en el proyecto." },
      { max: 110, msg: "😌 La hinchada está tranquila. Percibe avances y apoya desde la tribuna." },
      { max: 120, msg: "😊 La hinchada está satisfecha. El equipo responde y hay confianza en el proceso." },
      { max: 130, msg: "😀 La hinchada está ilusionada. El equipo compite y contagia energía." },
      { max: 140, msg: "📈 La hinchada está orgullosa. El club pelea arriba y se siente protagonista." },
      { max: 150, msg: "💪 La hinchada está entusiasmada. Aplaude el juego y el compromiso del plantel." },
      { max: 160, msg: "🔥 La hinchada está encendida. Cree que el equipo puede ser campeón." },
      { max: 170, msg: "🎉 La hinchada celebra con pasión. El estadio es una fiesta cada fecha." },
      { max: 180, msg: "🏆 La hinchada está eufórica. Vive cada partido como una final." },
      { max: 190, msg: "🌟 La hinchada te ovaciona. Reconoce tu liderazgo y el éxito del club." },
      { max: 200, msg: "🏟️ La hinchada te idolatra. Eres símbolo de un club ganador y querido." }
    ];
  }

  // ===========================
  // ⚽ SEGUNDA DIVISIÓN
  // ===========================
  else if (division === "segunda") {
    rangosMoral = [
      { max: 10,  msg: "🟥 La hinchada está muy dolida. Siente que el equipo perdió el rumbo."},
      { max: 20,  msg: "🟧 La junta directiva esta dividida y algunos piden tu salida." },
      { max: 30,  msg: "😡 La hinchada reclama actitud. Pide a gritos que el equipo levante cabeza." },
      { max: 40,  msg: "😠 La hinchada se muestra impaciente. No acepta más errores en casa." },
      { max: 50,  msg: "😟 La hinchada está preocupada. El sueño del ascenso parece alejarse." },
      { max: 60,  msg: "☹️ La hinchada entiende el esfuerzo, pero pide resultados más consistentes." },
      { max: 70,  msg: "😕 La hinchada mantiene la fe. Apoya al equipo pese a los altibajos." },
      { max: 80,  msg: "😐 La hinchada valora la entrega. Sabe que falta poco para pelear el ascenso." },
      { max: 90,  msg: "😶 La hinchada confía en el grupo. El equipo deja buenas sensaciones." },
      { max: 100, msg: "🙂 La hinchada está contenta. El equipo compite y sueña con los primeros lugares." },
      { max: 110, msg: "😌 La directiva confia en el proceso." },
      { max: 120, msg: "😊 La hinchada aplaude el esfuerzo. El equipo se mete en la pelea por el ascenso." },
      { max: 130, msg: "😀 La hinchada está feliz. El equipo juega bien y se acerca al sueño de subir." },
      { max: 140, msg: "📈 La hinchada vibra con el rendimiento. Siente que el ascenso está al alcance." },
      { max: 150, msg: "💪 La hinchada está orgullosa. El equipo pelea cada punto con el corazón." },
      { max: 160, msg: "🔥 La hinchada vive con ilusión. El equipo está a un paso del ascenso." },
      { max: 170, msg: "🎉 La hinchada festeja a lo grande. El ascenso se siente cada vez más cerca." },
      { max: 180, msg: "🏆 La hinchada está emocionada. El club logra una campaña histórica." },
      { max: 190, msg: "🌟 La hinchada te agradece. Eres el presidente que devolvió la esperanza."},
      { max: 200, msg: "🏟️ La hinchada te adora. El ascenso es cada vez una realidad " }
    ];
  }

  // ===========================
  // 🌀 FALLBACK (por seguridad)
  // ===========================
  else {
    rangosMoral = [
      { max: 200, msg: "🤔 La hinchada observa en silencio. Nadie sabe en qué división juega el equipo." }
    ];
  }

  const rango = rangosMoral.find(r => moralHinchada <= r.max);

  if (rango) {
    notificacionPendiente = rango.msg;
    esDespido = rango.despido || false;
    mensajesPendientes++;
    actualizarBuzon();
  }

  moralEvaluadaEsteSemestre = true;
}
*/

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


