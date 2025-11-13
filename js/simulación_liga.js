
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



let mensajesSimulacion = [];
let indiceMensaje = 0;

/*
function mostrarModalSimulacion() {
  const modal = document.getElementById("modalSimulacion");
  const contenido = document.getElementById("modalContenido");
  const titulo = document.getElementById("modalTitulo");

  if (indiceMensaje < mensajesSimulacion.length) {
    let msg = mensajesSimulacion[indiceMensaje];
    titulo.textContent = msg.titulo;
    contenido.innerHTML = msg.texto; // ✅ permitir imágenes HTML
    modal.style.display = "flex";

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
*/

function mostrarModalSimulacion() {
  const modal = document.getElementById("modalSimulacion");
  const contenido = document.getElementById("modalContenido");
  const titulo = document.getElementById("modalTitulo");
  const btnSiguiente = document.getElementById("btnSiguiente");

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
  const btnSiguiente = document.getElementById("btnSiguiente");
  btnSiguiente.textContent = "Siguiente";
}

document.getElementById("btnSiguiente").addEventListener("click", () => {
  indiceMensaje++;
  mostrarModalSimulacion();
});



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

/*
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
*/

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

// ✅ Fecha de clásicos dinámica
const numeroClasicos = partidosPorFecha.length + 1;
partidosPorFecha.push({ numero: numeroClasicos, partidos: partidosClasicos });


  // 🔹 Guardar mensajes para el modal
  let tablaTemporal = equipos.map(e => ({ nombre: e, pts: 0, gf: 0, gc: 0 }));

  // 📆 Fechas base según semestre
  let fechaBase;
/*
  if (semestreActual === 1) {
    fechaBase = new Date(2025, 0, 24); // Enero 24 (primer semestre)
  } else {
    fechaBase = new Date(2025, 6, 4); // Julio 4 (segundo semestre)
  }
*/

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

        const escA = p.equipoA.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/ /g, "_");
        const escB = p.equipoB.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/ /g, "_");
        const imgA = `<img src="escudos/${escA}.png" class="escudo" alt="${p.equipoA}" style="width:20px;height:20px;">`;
        const imgB = `<img src="escudos/${escB}.png" class="escudo" alt="${p.equipoB}" style="width:20px;height:20px;">`;

        texto += `🕓 ${horario}<br>${imgA} ${p.golesA} - ${p.golesB} ${imgB}<br>`;
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
  actualizarFuerzaUI();
  actualizarMediaUI();
  verificarPresupuestoNegativo();
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
    if (elTitulos) elTitulos.innerText = `Liga: ${ligasGanadasPorUsuario}`;
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
  try { evaluarObjetivos(); } catch(e) {}
  try { actualizarFuerzaUI(); } catch(e) {}
}



// ============================
// 🏆 FORMATO MX (1–6 directos, 7–10 play-in)
// ============================

function iniciarFaseFinal() {
  const modoMX = document.getElementById("modoMX")?.checked;
  const usarPlayoffs = document.getElementById("modoPlayoffs")?.checked;

  if (modoMX) {
    simularFormatoMX();
  } else if (usarPlayoffs) {
    simularPlayoffs();
  } else {
    simularCuadrangulares();
    simularFinal();
  }
}

function simularFormatoMX() {
  if (!tabla || tabla.length < 10) {
    alert("⚠️ No hay suficientes equipos en la tabla para aplicar el Formato MX.");
    return;
  }

  // Ordenar tabla final
  tabla.sort((a, b) => b.pts - a.pts || (b.gf - b.gc) - (a.gf - a.gc));

  const directos = tabla.slice(0, 6);
  const playin = tabla.slice(6, 10);

  // Mostrar info visual
  mostrarTabla("tct", tabla, `Temporada ${temporadaActual} - Semestre ${semestreActual}`, true, [], false);

  alert(`⚽ Clasificados directos a Playoffs:\n${directos.map(t => t.nombre).join(", ")}\n\n🎯 Play-in:\n${playin.map(t => t.nombre).join(", ")}`);

  // 🎮 Simular Play-in
  const partido1 = simularPartidoIdaVuelta(playin[0].nombre, playin[3].nombre); // 7 vs 10
  const partido2 = simularPartidoIdaVuelta(playin[1].nombre, playin[2].nombre); // 8 vs 9
  const ganadoresPlayIn = [partido1.ganador, partido2.ganador];

  // 🎨 Mostrar Play-in en pantalla
  const cont = document.getElementById("play-in"); 
/*|| document.getElementById("final");*/
  const escudo = (nombre) => obtenerEscudo(nombre);

  // 🔹 Función para obtener la ruta del escudo (elimina tildes y eñes)
function obtenerRutaEscudo(nombreEquipo) {
  if (!nombreEquipo) return "escudos/default.png";

  // Convierte a minúsculas, quita tildes, eñes y reemplaza espacios
  let limpio = nombreEquipo
    .toLowerCase()
    .normalize("NFD")                // separa tildes
    .replace(/[\u0300-\u036f]/g, "") // elimina acentos
    .replace(/ñ/g, "n")              // reemplaza ñ -> n
    .replace(/ /g, "_");             // espacios -> guion bajo

  return `escudos/${limpio}.png`;
}

// 🔸 Bloque HTML del Play-In
cont.innerHTML = `
  <h2>Play-In Formato MX</h2>

  <div class="final-mx">
    <div class="linea">
      <img src="${obtenerRutaEscudo(partido1.equipo1)}" alt="${partido1.equipo1}" class="escudo-playin">
      <span class="nombre">${partido1.equipo1}</span>
      <span class="resultado">${partido1.resultadoIda}</span>
      <img src="${obtenerRutaEscudo(partido1.equipo2)}" alt="${partido1.equipo2}" class="escudo-playin">
      <span class="nombre">${partido1.equipo2}</span>
    </div>
    <div class="linea">
      <img src="${obtenerRutaEscudo(partido1.equipo2)}" alt="${partido1.equipo2}" class="escudo-playin">
      <span class="nombre">${partido1.equipo2}</span>
      <span class="resultado">${partido1.resultadoVuelta}</span>
      <img src="${obtenerRutaEscudo(partido1.equipo1)}" alt="${partido1.equipo1}" class="escudo-playin">
      <span class="nombre">${partido1.equipo1}</span>
    </div>
    <div class="ganador">🏅 Ganador: <b>${partido1.ganador}</b></div>
  </div>

  <div class="final-mx">
    <div class="linea">
      <img src="${obtenerRutaEscudo(partido2.equipo1)}" alt="${partido2.equipo1}" class="escudo-playin">
      <span class="nombre">${partido2.equipo1}</span>
      <span class="resultado">${partido2.resultadoIda}</span>
      <img src="${obtenerRutaEscudo(partido2.equipo2)}" alt="${partido2.equipo2}" class="escudo-playin">
      <span class="nombre">${partido2.equipo2}</span>
    </div>
    <div class="linea">
      <img src="${obtenerRutaEscudo(partido2.equipo2)}" alt="${partido2.equipo2}" class="escudo-playin">
      <span class="nombre">${partido2.equipo2}</span>
      <span class="resultado">${partido2.resultadoVuelta}</span>
      <img src="${obtenerRutaEscudo(partido2.equipo1)}" alt="${partido2.equipo1}" class="escudo-playin">
      <span class="nombre">${partido2.equipo1}</span>
    </div>
    <div class="ganador">🏅 Ganador: <b>${partido2.ganador}</b></div>
  </div>

  <h3>🎯 Clasificados a Playoffs:</h3>
  <p>${[...directos.map(t => t.nombre), ...ganadoresPlayIn].join(", ")}</p>
`;

  // 🔹 Formar top 8
  const clasificados = [
    ...directos.map(t => ({ nombre: t.nombre })),
    ...ganadoresPlayIn.map(n => ({ nombre: n }))
  ];

  // 🔸 Continuar a Playoffs MX
  simularPlayoffsMX(clasificados);
}

// ============================
// 🧩 PLAYOFFS versión MX con todos los detalles
// ============================
function simularPlayoffsMX(clasificados) {
  if (!clasificados || clasificados.length < 8) {
    alert("⚠️ Se necesitan 8 equipos para los Playoffs.");
    return;
  }

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

  // --- Registrar campeón ---
  if (!campeonesLigaPorTemporada[temporadaActual]) {
    campeonesLigaPorTemporada[temporadaActual] = { I: null, II: null };
  }
  const tagSem = semestreActual === 1 ? 'I' : 'II';
  campeonesLigaPorTemporada[temporadaActual][tagSem] = campeon;

  // --- Guardar título, recompensa, noticias ---
  try { agregarTituloLiga(campeon); } catch (e) { console.warn('⚠️ agregarTituloLiga no encontrada'); }

  if (campeon === equipoUsuario) {
    sumarPresupuesto(500000);
    alert(`🎉 ¡Felicidades! ${campeon} es el campeón del Formato MX\n💰 Recibes $500.000 de premio.`);
  }

  if (typeof activarNoticias === "function") activarNoticias();

  // --- Audios ---
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
  try { new Audio(rutaAudio).play(); } catch (e) {}

  // --- Historial, palmarés y rachas ---
  campeones.push(`🏆 ${temporadaActual}-${tagSem}: ${campeon}`);
  if (campeon === equipoUsuario) {
    ligasGanadasPorUsuario++;
    const elTitulos = document.getElementById('titulos');
    if (elTitulos) elTitulos.innerText = `Liga: ${ligasGanadasPorUsuario}`;
    if (ligasGanadasPorUsuario === 13)
      alert('🎉 🏆Felicidades! Has ganado 13 títulos y recibes el premio Gabriel Ochoa Uribe');
  }

  if (campeon === ultimoCampeon)
    equiposConsecutivos[campeon] = (equiposConsecutivos[campeon] || 1) + 1;
  else equiposConsecutivos[campeon] = 1;

  switch (equiposConsecutivos[campeon]) {
    case 2: alert(`🚨 ¡${campeon} es Bicampeón! 🏆🏆`); break;
    case 3: alert(`🚨 ¡${campeon} es Tricampeón! 🏆🏆🏆`); break;
    case 4: alert(`🚨 ¡${campeon} es Tetracampeón! 🏆🏆🏆🏆`); break;
    case 5: alert(`🚨 ¡${campeon} es Pentacampeón! 🏆🏆🏆🏆🏆`); break;
  }
  ultimoCampeon = campeon;

  try { actualizarHistorial(); } catch (e) {}

  // --- Mostrar Brackets y Final ---
  mostrarBrackets(cuartos, semis, finalRes, campeon);

  const esc1 = obtenerEscudo(finalRes.equipo1);
  const esc2 = obtenerEscudo(finalRes.equipo2);

  document.getElementById('final').innerHTML = `
    <h2>Final Formato MX</h2>
    <div class="final-mx">
      <div class="linea">
        ${esc1} <span class="nombre">${finalRes.equipo1}</span>
        <span class="resultado">${finalRes.resultadoIda}</span>
        ${esc2} <span class="nombre">${finalRes.equipo2}</span>
      </div>
      <div class="linea">
        ${esc2} <span class="nombre">${finalRes.equipo2}</span>
        <span class="resultado">${finalRes.resultadoVuelta}</span>
        ${esc1} <span class="nombre">${finalRes.equipo1}</span>
      </div>
      <h3>🏆⭐ Campeón: ${obtenerEscudo(campeon)} ${campeon}</h3>
    </div>
  `;

  try { resetearVistacu(); actualizarBuzon(); evaluarMoralHinchada(); evaluarObjetivos(); actualizarFuerzaUI(); } catch (e) {}
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
  } 
  // 🗞️ Actualizar sección de noticias
if (typeof activarNoticias === "function") activarNoticias();

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
   
actualizarBuzon();
evaluarMoralHinchada();
evaluarObjetivos();
   
}
