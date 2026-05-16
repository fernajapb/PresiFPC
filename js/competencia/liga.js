
function simularPartido(equipoA, equipoB) {
  const fuerzaA = obtenerFuerzaTotal(equipoA);
  const fuerzaB = obtenerFuerzaTotal(equipoB);
  const diferencia = fuerzaA - fuerzaB;

  const base = Math.random() * 1.5 + Math.random() * 1.5;
  const ventaja = Math.tanh(diferencia / 17);
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

  // 🔥 Actualizar forma equipos
   actualizarFormaEquipo(plantillaA, golesA, golesB, goleadoresA);
   actualizarFormaEquipo(plantillaB, golesB, golesA, goleadoresB);

  return { golesA, golesB, puntosA, puntosB, goleadoresA, goleadoresB };
}

function actualizarFormaEquipo(plantilla, golesFavor, golesContra, goleadores = []) {

  let cambioBase = 0;

  if (golesFavor > golesContra) cambioBase = 1;
  else if (golesFavor < golesContra) cambioBase = -1;

  // Ajuste por goleada
  if (Math.abs(golesFavor - golesContra) >= 3) {
    cambioBase *= 2;
  }

  plantilla.forEach(j => {
    if (j.forma === undefined) j.forma = 0;

    j.forma += cambioBase;

    // Bonus a goleadores
    if (goleadores.includes(j.nombre)) {
      j.forma += 1;
    }

    // Limitar entre -5 y +5
    if (j.forma > 5) j.forma = 5;
    if (j.forma < -5) j.forma = -5;
  });
}


// Probabilidad de gol seg煤n posici贸n
const probabilidadGolPorPosicion = {
  "PO": 0,
  "DFC": 3,
  "LI": 3,
  "LD": 3,
  "MCO": 4,
  "MD": 3,
  "DC": 8,
  "EI":6,
  "ED":6
};


function elegirGoleadorPorPeso(plantilla) {
  if (!plantilla || plantilla.length === 0) return "Jugador anonimo";

  const pool = [];

  for (let jugador of plantilla) {
    const posicion = jugador.posicion?.toUpperCase() || "MCO";
    const pesoBase = probabilidadGolPorPosicion[posicion] ?? 0;

    // 🔥 Forma del jugador
    const forma = Number(jugador.forma) || 0;

    // 🎯 Ajuste de peso por forma
    let pesoFinal = pesoBase + forma;

    // 🚫 Evitar negativos o cosas raras
    if (pesoFinal < 0) pesoFinal = 0;

    // 🚫 Limitar impacto de la forma (muy importante)
    if (pesoFinal > pesoBase + 3) pesoFinal = pesoBase + 3;

    // 🧩 Construir pool
    for (let i = 0; i < pesoFinal; i++) {
      pool.push(jugador.nombre);
    }
  }

  if (pool.length === 0) return "Jugador anonimo";
  const idx = Math.floor(Math.random() * pool.length);
  return pool[idx];
}



let mensajesSimulacion = [];
let indiceMensaje = 0;
let calendarioSemestre1 = null;
let calendarioSemestre2 = null;

function mostrarModalSimulacion() {
  const modal = document.getElementById("modalSimulacion");
  const contenido = document.getElementById("modalContenido");
  const titulo = document.getElementById("modalTitulo");
  const btnSiguiente = document.getElementById("btnSiguientes");

  if (indiceMensaje < mensajesSimulacion.length) {
    const msg = mensajesSimulacion[indiceMensaje];
    titulo.textContent = msg.titulo;
    contenido.innerHTML = msg.texto;
    modal.style.display = "flex";

    if (msg.tabla) {
      mostrarTabla("tct", msg.tabla, `Temporada ${temporadaActual} - Semestre ${semestreActual}`, true, [], false);
    }

    // Si es el último mensaje, cambiar el texto del botón
    if (indiceMensaje === mensajesSimulacion.length - 1) {
      btnSiguiente.textContent = "Finalizar";
    } else {
      btnSiguiente.textContent = "Siguiente";
    }

  } else {
    // Cerrar el modal al terminar
    cerrarModalSimulacion();
  }
}

function cerrarModalSimulacion() {
  const modal = document.getElementById("modalSimulacion");
  modal.style.display = "none";
  indiceMensaje = 0;
  mensajesSimulacion = [];
  const btnSiguiente = document.getElementById("btnSiguientes");
  btnSiguiente.textContent = "Siguiente";
}

document.getElementById("btnSiguientes").addEventListener("click", () => {
  indiceMensaje++;
  mostrarModalSimulacion();
});


function generarCalendarioSemestre(equiposBase, invertirLocalia = false) {
  let lista = [...equiposBase];

  // mezclar solo en semestre 1
  for (let i = lista.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [lista[i], lista[j]] = [lista[j], lista[i]];
  }

  if (lista.length % 2 !== 0) lista.push("DESCANSA");

  const n = lista.length;
  const mitad = n / 2;
  const jornadas = n - 1;

  const calendario = [];

  for (let fecha = 1; fecha <= jornadas; fecha++) {
    const partidos = [];

    for (let i = 0; i < mitad; i++) {
      let a = lista[i];
      let b = lista[n - 1 - i];

      if (a === "DESCANSA" || b === "DESCANSA") continue;

      // alternancia por fecha (mejor que antes)
      let local = (fecha % 2 === 1) ? a : b;
      let visita = (fecha % 2 === 1) ? b : a;

      if (invertirLocalia) {
        [local, visita] = [visita, local];
      }

      partidos.push({ local, visita });
    }

    calendario.push({
      numero: fecha,
      partidos
    });

    // rotación mejorada (evita equipo fijo)
    const ultimo = lista.pop();
    lista.splice(1, 0, ultimo);
  }

  return calendario;
}



function simularTCT() {
  if (!equipoUsuario) {
    alert("⚠️ Debes seleccionar un equipo antes de iniciar la simulación.");
    return;
  }

   mensajesSimulacion = [];

  document.getElementById("mercadoFichajes").innerHTML = "";
  document.getElementById("superliga").innerHTML = "";
  document.getElementById("playoffs").innerHTML = "";
 

  tabla = equipos.map(e => ({ nombre: e, pts: 0, gf: 0, gc: 0 }));

  const tablaGoleadores = {};

  const totalEquipos = [...equipos];

  // 🔹 GENERAR CALENDARIOS
if (semestreActual === 1 || !calendarioSemestre1) {
  calendarioSemestre1 = generarCalendarioSemestre(totalEquipos, false);

  calendarioSemestre2 = calendarioSemestre1.map(fecha => ({
    numero: fecha.numero,
    partidos: fecha.partidos.map(p => ({
      local: p.visita,
      visita: p.local
    }))
  }));
}

const partidosPorFecha = semestreActual === 1
  ? calendarioSemestre1
  : calendarioSemestre2;

  // ===========================

  const clasicos = [
    ["Nacional", "Medellín"],
    ["Santa Fe", "Millonarios"],
    ["Cali", "América"],
    ["Once Caldas", "Pereira"],
    ["Junior", "Union M."],
    ["Fortaleza", "Inter Bogotá"],
    ["Águilas", "Envigado"],
    ["Bucaramanga", "Cucuta"],
    ["B.Chico", "Patriotas"],
    ["Tolima", "Huila"]
  ];

  // 📅 CALENDARIO SOLO DEL EQUIPO DEL USUARIO
let textoCalendario = `📅 Calendario de ${equipoUsuario}<br><br>`;

partidosPorFecha.forEach(fecha => {
  fecha.partidos.forEach(p => {
    if (p.local === equipoUsuario || p.visita === equipoUsuario) {
      const esLocal = p.local === equipoUsuario;
      const rival = esLocal ? p.visita : p.local;

      //textoCalendario += `Fecha ${fecha.numero}: ${equipoUsuario} vs ${rival} (${esLocal ? "L" : "V"})<br>`;
      textoCalendario += `<div class="calendario-linea">Fecha ${fecha.numero}: <span class="${esLocal ? "local" : "visita"}">${equipoUsuario} vs ${rival} (${esLocal ? "L" : "V"})</span></div>`;
    }
  });
});

mensajesSimulacion.push({
  titulo: "📅 Calendario",
  texto: textoCalendario
});

//==================================
/*
  for (let i = totalEquipos.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [totalEquipos[i], totalEquipos[j]] = [totalEquipos[j], totalEquipos[i]];
  }

  if (totalEquipos.length % 2 !== 0) totalEquipos.push("DESCANSA");
  const n = totalEquipos.length;
  const jornadas = n - 1;
  const mitad = n / 2;

  let lista = [...totalEquipos];
  let partidosPorEquipo = {};
  equipos.forEach(e => partidosPorEquipo[e] = { local: 0, visita: 0 });

  mensajesSimulacion = [];
  const partidosPorFecha = [];
*/

  /*
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
        [local, visita] = [visita, local];
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

    const fijo = lista[0];
    const resto = lista.slice(1);
    resto.unshift(resto.pop());
    lista = [fijo, ...resto];
  }
  */
for (let fecha = 1; fecha <= partidosPorFecha.length; fecha++) {
  const partidos = [];
  const fechaProgramada = partidosPorFecha[fecha - 1];

  for (const partido of fechaProgramada.partidos) {
    let local = partido.local;
    let visita = partido.visita;

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

  partidosPorFecha[fecha - 1].partidos = partidos;
}

  // 🔹 Guardar mensajes para el modal
  let tablaTemporal = equipos.map(e => ({ nombre: e, pts: 0, gf: 0, gc: 0 }));

  // 📆 Fechas base según semestre
  let fechaBase;

if (semestreActual === 1) {
  const diaInicio = 17 + Math.floor(Math.random() * 15); 
  fechaBase = new Date(2025, 0, diaInicio);
} else {
  const diaInicio = 27 + Math.floor(Math.random() * 14);
  fechaBase = new Date(2025, 5, diaInicio); // junio = mes 5
}

  const meses = [
    "enero", "febrero", "marzo", "abril", "mayo",
    "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"
  ];

  for (let idx = 0; idx < partidosPorFecha.length; idx++) {
    const fecha = partidosPorFecha[idx];
    let texto = `📅 Fecha ${fecha.numero}<br><br>`;

    // Calcular fechas de viernes/sábado/domingo
    let viernes = new Date(fechaBase);
    let sabado = new Date(fechaBase);
    sabado.setDate(viernes.getDate() + 1);
    let domingo = new Date(fechaBase);
    domingo.setDate(viernes.getDate() + 2);

    const dias = [
      { nombre: "Viernes", fecha: viernes },
      { nombre: "Sábado", fecha: sabado },
      { nombre: "Domingo", fecha: domingo }
    ];

    // 🔀 Crear una distribución variable por jornada
    const totalPartidos = fecha.partidos.length;
    let distribucion = [2, 4, 4]; // base
    if (Math.random() < 0.4) distribucion = [3, 3, 4];
    else if (Math.random() < 0.2) distribucion = [4, 2, 4];

    // Ajustar si hay menos partidos en esa jornada
    const suma = distribucion.reduce((a, b) => a + b, 0);
    if (suma > totalPartidos) {
      distribucion[2] -= (suma - totalPartidos);
    }

    let partidoIndex = 0;

    for (let d = 0; d < dias.length; d++) {
      const { nombre, fecha: fechaReal } = dias[d];
      const dia = fechaReal.getDate();
      const mes = meses[fechaReal.getMonth()];

      const cantidad = distribucion[d];
      if (cantidad <= 0) continue; // día sin partidos

      texto += `🗓️ <b>${nombre} ${dia} de ${mes}</b><br>`;

      // Horarios según cantidad de partidos
      let horarios = [];
      if (cantidad === 2) horarios = ["4:00", "6:00"];
      else if (cantidad === 3) horarios = ["4:00", "6:00", "8:00"];
      else horarios = ["2:00", "4:10", "6:20", "8:30"];

      for (let j = 0; j < cantidad && partidoIndex < fecha.partidos.length; j++) {
        const p = fecha.partidos[partidoIndex++];
        const horario = horarios[j % horarios.length];
       
        /*
        const escA = p.equipoA.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/ /g, "_");
        const escB = p.equipoB.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/ /g, "_");
        const imgA = `<img src="escudos/${escA}.png" class="escudo" alt="${p.equipoA}" style="width:20px;height:20px;">`;
        const imgB = `<img src="escudos/${escB}.png" class="escudo" alt="${p.equipoB}" style="width:20px;height:20px;">`;
       */

        const imgA = `<img src="${getEscudoEquipo(p.equipoA)}" class="escudo" onerror="this.src='escudos/default.png'" style="width:20px;height:20px;">`;

        const imgB = `<img src="${getEscudoEquipo(p.equipoB)}" class="escudo" onerror="this.src='escudos/default.png'" style="width:20px;height:20px;">`;

        //texto += `🕓 ${horario}<br>${imgA} ${p.golesA} - ${p.golesB} ${imgB}<br>`;
        texto += `🕓 ${horario}<br>${imgA} ${p.equipoA} ${p.golesA} - ${p.golesB} ${p.equipoB} ${imgB}<br>`;
      }

      texto += `<br>`;
    }

    // Agregar texto de fecha al modal
    mensajesSimulacion.push({ titulo: `📅 Fecha ${fecha.numero}`, texto: texto.trim() });

    // Actualizar tabla temporal
    for (let p of fecha.partidos) {
      let eqA = tablaTemporal.find(t => t.nombre === p.equipoA);
      let eqB = tablaTemporal.find(t => t.nombre === p.equipoB);
      eqA.pts += (p.golesA > p.golesB ? 3 : p.golesA === p.golesB ? 1 : 0);
      eqB.pts += (p.golesB > p.golesA ? 3 : p.golesA === p.golesB ? 1 : 0);
      eqA.gf += p.golesA; eqA.gc += p.golesB;
      eqB.gf += p.golesB; eqB.gc += p.golesA;
    }

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

    // Avanzar 10 días por jornada
    fechaBase.setDate(fechaBase.getDate() + 5);
  }

  let goleadoresTexto = "🏆 Goleadores (Top 10)\n";
  const listaG = Object.entries(tablaGoleadores)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(([nombre, goles]) => `${nombre}: ${goles}`);
  goleadoresTexto += listaG.join("\n");

  mensajesSimulacion.push({ titulo: "🏆 Goleadores", texto: goleadoresTexto });

  indiceMensaje = 0;
  mostrarModalSimulacion();

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
  taquillaCobrada = false;
  actualizarFuerzaUI();
  verificarPresupuestoNegativo();
}


/*
function iniciarFaseFinal() {
  simularCuadrangulares();
  simularFinal();
}
*/

function iniciarFaseFinal() {
  const usarPlayoffs = document.getElementById("modoPlayoffs")?.checked;

  if (usarPlayoffs) {
    simularPlayoffsNuevo();
  } else {
    simularCuadrangulares();
    simularFinal();
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

}


/*
function EscudoPlayoffs(nombre) {
  if (!nombre) {
    return `<img src="escudos/default.png" class="escudo-bracket">`;
  }

  const nombreLimpio = nombre
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/ /g, "_");

  return `<img src="escudos/${nombreLimpio}.png" class="escudo-bracket"
          onerror="this.src='escudos/default.png'">`;
}
*/
function EscudoPlayoffs(nombre) {
  if (!nombre) {
    return `<img src="escudos/default.png" class="escudo-bracket">`;
  }

  return `<img src="${getEscudoEquipo(nombre)}" 
    class="escudo-bracket"
    onerror="this.src='escudos/default.png'">`;
}

function definirGanador(equipoA, equipoB, partido) {
  if (partido.golesA > partido.golesB) {
    return { ganador: equipoA, penales: false };
  }
  if (partido.golesB > partido.golesA) {
    return { ganador: equipoB, penales: false };
  }

  // empate → penales
  const ganador = Math.random() < 0.5 ? equipoA : equipoB;
  return { ganador, penales: true };
}


function marcador(equipoA, equipoB, partido, resultado) {

  // Si NO hay penales
  if (!resultado.penales) {
    return `${partido.golesA} - ${partido.golesB}`;
  }

  // Si hay penales → marcar ganador
  if (resultado.ganador === equipoA) {
    return `(P) ${partido.golesA} - ${partido.golesB}`;
  } else {
    return `${partido.golesA} - ${partido.golesB} (P)`;
  }
}


function simularPlayoffsNuevo() {

  const clasificados = tabla.slice(0, 8).map(e => e.nombre);

  const equipo1 = clasificados[0];
  const equipo2 = clasificados[1];

  let resto = clasificados.slice(2);
  resto.sort(() => Math.random() - 0.5);

  const rutaA = [equipo1, resto[0], resto[1], resto[2]];
  const rutaB = [equipo2, resto[3], resto[4], resto[5]];

  // =====================
  // CUARTOS
  // =====================
  const cuartosA1 = simularPartido(rutaA[0], rutaA[1]);
  const cuartosA2 = simularPartido(rutaA[2], rutaA[3]);
  const cuartosB1 = simularPartido(rutaB[0], rutaB[1]);
  const cuartosB2 = simularPartido(rutaB[2], rutaB[3]);

  const rA1 = definirGanador(rutaA[0], rutaA[1], cuartosA1);
  const rA2 = definirGanador(rutaA[2], rutaA[3], cuartosA2);
  const rB1 = definirGanador(rutaB[0], rutaB[1], cuartosB1);
  const rB2 = definirGanador(rutaB[2], rutaB[3], cuartosB2);

  // =====================
  // SEMIS
  // =====================
  const semiA = simularPartido(rA1.ganador, rA2.ganador);
  const semiB = simularPartido(rB1.ganador, rB2.ganador);

  const sA = definirGanador(rA1.ganador, rA2.ganador, semiA);
  const sB = definirGanador(rB1.ganador, rB2.ganador, semiB);

  const finalistaA = sA.ganador;
  const finalistaB = sB.ganador;

  // =====================
  // FINAL
  // =====================
  finalistas = [
    { nombre: finalistaA },
    { nombre: finalistaB }
  ];

  simularFinal();

  document.getElementById("playoffs").innerHTML = `
  <h2>🏆 Playoffs</h2>

  <div class="playoffs-vertical">

    <h3>Cuartos de Final</h3>

    <div class="match">
      ${EscudoPlayoffs(rutaA[0])} ${rutaA[0]}
      <span>${marcador(rutaA[0], rutaA[1], cuartosA1, rA1)}</span>
      ${rutaA[1]} ${EscudoPlayoffs(rutaA[1])}
    </div>

    <div class="match">
      ${EscudoPlayoffs(rutaA[2])} ${rutaA[2]}
      <span>${marcador(rutaA[2], rutaA[3], cuartosA2, rA2)}</span>
      ${rutaA[3]} ${EscudoPlayoffs(rutaA[3])}
    </div>

    <div class="match">
      ${EscudoPlayoffs(rutaB[0])} ${rutaB[0]}
      <span>${marcador(rutaB[0], rutaB[1], cuartosB1, rB1)}</span>
      ${rutaB[1]} ${EscudoPlayoffs(rutaB[1])}
    </div>

    <div class="match">
      ${EscudoPlayoffs(rutaB[2])} ${rutaB[2]}
      <span>${marcador(rutaB[2], rutaB[3], cuartosB2, rB2)}</span>
      ${rutaB[3]} ${EscudoPlayoffs(rutaB[3])}
    </div>


    <h3>Semifinales</h3>

    <div class="match">
      ${EscudoPlayoffs(rA1.ganador)} ${rA1.ganador}
      <span>${marcador(rA1.ganador, rA2.ganador, semiA, sA)}</span>
      ${rA2.ganador} ${EscudoPlayoffs(rA2.ganador)}
    </div>

    <div class="match">
      ${EscudoPlayoffs(rB1.ganador)} ${rB1.ganador}
      <span>${marcador(rB1.ganador, rB2.ganador, semiB, sB)}</span>
      ${rB2.ganador} ${EscudoPlayoffs(rB2.ganador)}
    </div>


    <h3>Finalistas</h3>

    <div class="match final">
      ${EscudoPlayoffs(finalistaA)} ${finalistaA}
    </div>

    <div class="match final">
      ${EscudoPlayoffs(finalistaB)} ${finalistaB}
    </div>

  </div>
`;
}



function simularFinal() {
  const [equipo1, equipo2] = finalistas;
  const ida = simularPartido(equipo1.nombre, equipo2.nombre);
  const vuelta = simularPartido(equipo2.nombre, equipo1.nombre);

  const goles1 = ida.golesA + vuelta.golesB;
  const goles2 = ida.golesB + vuelta.golesA;
  //const campeon = goles1 > goles2 ? equipo1.nombre : equipo2.nombre;

  let campeon;

if (goles1 > goles2) {
  campeon = equipo1.nombre;
} else if (goles2 > goles1) {
  campeon = equipo2.nombre;
} else {
  // empate global → desempate (por ahora aleatorio)
  campeon = Math.random() < 0.5 ? equipo1.nombre : equipo2.nombre;
}

// 👉 guardarlo globalmente
campeonActual = campeon;


//Bonificación
const FUERZA_MAX = 80;

let equipoCampeon =
  equiposPrimera.find(e => e.nombre === campeon) ||
  equiposSegunda.find(e => e.nombre === campeon);

if (equipoCampeon) {

  let bonus = 1;

  if (campeon === equipoUsuario) {
    modificarFuerzaEquipo(bonus);
  } else {
    modificarFuerzaEquipoIA(campeon, bonus);
  }

  // 🚫 límite máximo
  equipoCampeon.fuerza = Math.min(FUERZA_MAX, equipoCampeon.fuerza);
}

  
   // Registrar campeón por semestre para la Superliga
if (!campeonesLigaPorTemporada[temporadaActual]) {
  campeonesLigaPorTemporada[temporadaActual] = { I: null, II: null };
}
const tagSem = semestreActual === 1 ? "I" : "II";
campeonesLigaPorTemporada[temporadaActual][tagSem] = campeon;


  agregarTituloLiga(campeon);

    
  if (campeon === equipoUsuario) {
    sumarPresupuesto(3500000);
    alert(`🎉 ¡Felicidades! ${campeon} es el campeón de liga\n💰 Recibes $3.500.000 de premio\n 500k: Conmebol\n 3M: Libertadores fase de grupos`);
  }

/*else {
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
  "tolima": "audios/tolima.mp3",
  "bucaramanga": "audios/bucaramanga.mp3",
  "once caldas": "audios/oncecaldas.mp3",
  "pereira": "audios/pereira.mp3",
  "chico": "audios/chico.mp3",
  "pasto": "audios/pasto.mp3",
  "cucuta": "audios/cucuta.mp3",
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

  alert(`🎉 La DIMAYOR felicita al Club: ${campeon} por ser campeón 🥇⭐`);

  const sufijoSemestre = semestreActual === 1 ? "I" : "II";
  campeones.push(`🏆 ${temporadaActual}-${sufijoSemestre}: ${campeon}`);


  if (campeon === equipoUsuario) {
    ligasGanadasPorUsuario++;
    document.getElementById("titulos").innerText = `Liga: ${ligasGanadasPorUsuario}`;

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
/*
  function EscudoFinal(nombre) {
    const nombreLimpio = nombre.toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/ /g, "_");
    return `<img src="escudos/${nombreLimpio}.png" alt="${nombre}" class="escudo">`;
  }
*/
  function EscudoFinal(nombre) {
  return `<img src="${getEscudoEquipo(nombre)}" 
    onerror="this.src='escudos/default.png'" 
    alt="${nombre}" 
    class="escudo">`;
}

  const escudo1 = EscudoFinal(equipo1.nombre);
  const escudo2 = EscudoFinal(equipo2.nombre);
  const escudoCampeon = EscudoFinal(campeon);

  document.getElementById("final").innerHTML = `
    <h2>Final</h2>
    <p>${escudo1} ${equipo1.nombre} ${ida.golesA} - ${ida.golesB} ${equipo2.nombre} ${escudo2} (IDA)</p>
    <p>${escudo2} ${equipo2.nombre} ${vuelta.golesA} - ${vuelta.golesB} ${equipo1.nombre} ${escudo1} (VUELTA)</p>
    <h3>🏆⭐ Campeón: ${escudoCampeon} ${campeon}</h3>
  `;
   
actualizarBuzon();
evaluarMoralHinchada();
actualizarFuerzaUI(); 
simularMercadoFichajesNuevo() ;
   reiniciarMercadoFichajes();
   reiniciarVentas();
  simularTaquilla();
   activarResolucion();
   
}
