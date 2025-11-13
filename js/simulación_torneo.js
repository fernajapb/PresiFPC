
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
 // 🗞️ Actualizar sección de noticias
if (typeof activarNoticias === "function") activarNoticias();
 
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
  actualizarBuzon();
  evaluarMoralHinchada();

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

// 🔼 Si la asamblea aprobó aumentar equipos, suben más clubes (sin duplicar)
if (numeroAscensosExtra > 0) {
  // Filtramos solo equipos que aún no ascendieron
  const posibles = tablaOrdenada.filter(e => !equiposQueAscienden.includes(e));
  const adicionales = posibles.slice(0, numeroAscensosExtra);

  // Agregar los nuevos equipos
  equiposQueAscienden = equiposQueAscienden.concat(adicionales);

  alert(`📈 Por decisión de la Asamblea, ascienden ${numeroAscensosExtra} equipos adicionales: ${adicionales.join(", ")}`);

  // Reset para volver a formato normal la próxima temporada
  numeroAscensosExtra = 0;
}

  return { tablaAscenso, equiposQueAscienden, repechaje: repechajeResultado };
}

/*
function simularAscensoRealista() {
  // 🏆 Campeones de la B por semestre (si no existen, simula los torneos)
  const campeon1S = campeonB1S[temporadaActual] || simularTorneoB(1);
  const campeon2S = campeonB2S[temporadaActual] || simularTorneoB(2);

  // 📊 Obtener tabla anual (reclasificación de la B)
  let tablaAscenso = obtenerTablaAnualB();
  const tablaOrdenada = tablaAscenso.map(e => e.nombre);
  const top1 = tablaOrdenada[0];
  const top2 = tablaOrdenada[1];

  let equiposQueAscienden = [];
  let repechajeResultado = null;

  // ⚙️ Lógica principal de ascensos entre B → A
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

  // 📊 Mostrar reclasificación de la B
  mostrarTabla("segunda", tablaAscenso, `📊 Primera B - Reclasificación - ${temporadaActual}`, false, equiposQueAscienden);

  // 🔼 Asamblea: ascensos extras (sin duplicar)
  if (numeroAscensosExtra > 0) {
    const posibles = tablaOrdenada.filter(e => !equiposQueAscienden.includes(e));
    const adicionales = posibles.slice(0, numeroAscensosExtra);
    equiposQueAscienden = equiposQueAscienden.concat(adicionales);
    numeroAscensosExtra = 0;
  }

  // ======================================================
  // ⚽️ LÓGICA ENTRE B Y C (Primera C)
  // ======================================================

  // 🏆 Obtener campeones de la C por semestre (si no existen, simula)
  const campeon1C = campeonC1S[temporadaActual] || simularTorneoC(1);
  const campeon2C = campeonC2S[temporadaActual] || simularTorneoC(2);

  // 📊 Calcular reclasificación C (suma de puntos de ambos semestres)
  let tablaAnualC = {};
  [...tablaC1, ...tablaC2].forEach(e => {
    if (!tablaAnualC[e.nombre]) tablaAnualC[e.nombre] = { nombre: e.nombre, pts: 0, gf: 0, gc: 0 };
    tablaAnualC[e.nombre].pts += e.pts;
    tablaAnualC[e.nombre].gf += e.gf;
    tablaAnualC[e.nombre].gc += e.gc;
  });

  let tablaFinalC = Object.values(tablaAnualC);
  tablaFinalC.sort((a, b) => b.pts - a.pts || (b.gf - b.gc) - (a.gf - a.gc));

  // Mostrar reclasificación de la C
  mostrarTabla("reclasificacionC", tablaFinalC, `📊 Reclasificación - Primera C (${temporadaActual})`);

  // 🥇 Campeón de la reclasificación (asciende a la B)
  const campeonAscendidoC = tablaFinalC[0].nombre;

  // 🥴 Último de la reclasificación de la B (desciende a la C)
  const ultimoDescendidoC = tablaAscenso[tablaAscenso.length - 1].nombre;

  // ------------------------------------------------------
  // IMPORTANTE: antes aquí movías equipos (push/filter).
  // Esas líneas fueron retiradas para evitar duplicados.
  // ------------------------------------------------------

  // ======================================================
  // ⚽️ Retornar resultados para que `descenso()` haga los movimientos
  // ======================================================
  return {
    tablaAscenso,
    equiposQueAscienden,
    repechaje: repechajeResultado,
    tablaFinalC,
    ultimoDescendidoC,
    campeonAscendidoC
  };
}

*/




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