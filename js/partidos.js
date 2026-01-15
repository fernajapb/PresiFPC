/*************************************************
 *  MODO PARTIDO RÁPIDO
 *  Depende de global.js
 *************************************************/

// Estado del partido
let minutoPartido = 0;
let golesLocal = 0;
let golesVisitante = 0;
let intervaloPartido = null;

// Inicializar selects de equipos
function inicializarPartidos() {
  const selectLocal = document.getElementById("equipoLocal");
  const selectVisitante = document.getElementById("equipoVisitante");

  if (!selectLocal || !selectVisitante) return;

  selectLocal.innerHTML = `<option value="">--Local--</option>`;
  selectVisitante.innerHTML = `<option value="">--Visitante--</option>`;

  const todosLosEquipos = [
    ...equiposPrimera.map(e => e.nombre),
    ...equiposSegunda.map(e => e.nombre)
  ];

  todosLosEquipos.forEach(nombre => {
    const opt1 = document.createElement("option");
    opt1.value = nombre;
    opt1.textContent = nombre;

    const opt2 = document.createElement("option");
    opt2.value = nombre;
    opt2.textContent = nombre;

    selectLocal.appendChild(opt1);
    selectVisitante.appendChild(opt2);
  });
}

// ▶️ Iniciar partido
function jugarPartido() {
  const local = document.getElementById("equipoLocal").value;
  const visitante = document.getElementById("equipoVisitante").value;

  if (!local || !visitante) {
    alert("⚠️ Debes elegir ambos equipos");
    return;
  }

  if (local === visitante) {
    alert("❌ No pueden jugar el mismo equipo");
    return;
  }

  // Reset
  detenerPartido();
  minutoPartido = 0;
  golesLocal = 0;
  golesVisitante = 0;

  actualizarUI(local, visitante);

  const fuerzaLocal = obtenerFuerzaTotal(local);
  const fuerzaVisitante = obtenerFuerzaTotal(visitante);

  intervaloPartido = setInterval(() => {
  minutoPartido++;
  actualizarCronometro();

  // evaluar solo cada 5 minutos
  if (minutoPartido % 5 === 0) {
    evaluarGol(local, visitante, fuerzaLocal, fuerzaVisitante);
  }

  if (minutoPartido >= 90) finalizarPartido();
}, 80);
}

// ⏹️ Detener partido
function detenerPartido() {
  if (intervaloPartido) {
    clearInterval(intervaloPartido);
    intervaloPartido = null;
  }
}

// 🏁 Final del partido
function finalizarPartido() {
  detenerPartido();
  agregarEvento("🏁 Final del partido");
}

// ⚽ Evaluar si hay gol
function evaluarGol(local, visitante, fuerzaLocal, fuerzaVisitante) {

  if (golesLocal + golesVisitante >= 7) return;

  const totalFuerza = fuerzaLocal + fuerzaVisitante;

  const probLocal = 0.08 * (fuerzaLocal / totalFuerza);
const probVisitante = 0.08 * (fuerzaVisitante / totalFuerza);

  const random = Math.random();

  if (random < probLocal) {
    golesLocal++;
    agregarEvento(`⚽ ${minutoPartido}' Gol de ${local}`);
  } else if (random < probLocal + probVisitante) {
    golesVisitante++;
    agregarEvento(`⚽ ${minutoPartido}' Gol de ${visitante}`);
  }

  actualizarMarcador();
}

// 🖥️ UI
/*
function actualizarUI(local, visitante) {
  document.getElementById("cronometro").innerText = "⏱️ 0'";
  document.getElementById("marcador").innerText = "0 - 0";
  document.getElementById("eventos").innerHTML = "";

  const info = document.getElementById("infoPartido");
  if (info) {
    const fL = obtenerFuerzaTotal(local);
    const fV = obtenerFuerzaTotal(visitante);
    info.innerHTML = `
      <strong>${local}</strong> (${fL})
      vs
      <strong>${visitante}</strong> (${fV})
    `;
  }
}
*/

function obtenerEscudo(nombreEquipo) {
  const nombreLimpio = nombreEquipo
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/ /g, "_");

  return `escudos/${nombreLimpio}.png`;
}

function actualizarUI(local, visitante) {
  document.getElementById("cronometro").innerText = "⏱️ 0'";
  document.getElementById("marcador").innerText = "0 - 0";
  document.getElementById("eventos").innerHTML = "";

  // nombres
  document.getElementById("nombreLocal").innerText = local;
  document.getElementById("nombreVisitante").innerText = visitante;

  // escudos
  document.getElementById("escudoLocal").src = obtenerEscudo(local);
  document.getElementById("escudoVisitante").src = obtenerEscudo(visitante);
} 



function actualizarCronometro() {
  document.getElementById("cronometro").innerText =
    `⏱️ ${minutoPartido}'`;
}

function actualizarMarcador() {
  document.getElementById("marcador").innerText =
    `${golesLocal} - ${golesVisitante}`;
}

// 📝 Eventos
function agregarEvento(texto) {
  const div = document.getElementById("eventos");
  if (!div) return;

  div.insertAdjacentHTML(
    "afterbegin",
    `<p>${texto}</p>`
  );
}

// 🔄 Auto iniciar cuando carga la página
window.addEventListener("load", () => {
  inicializarPartidos();
});