

let campeonesCopaColombia = [];
function escudoPeq(nombre) {
  const ruta = fotosDesbloqueadas
    ? getEscudoEquipo(nombre)
    : "escudos/default.png";

  return `<img src="${ruta}" 
    onerror="this.src='escudos/default.png'" 
    class="escudo-peq">`;
}

function mostrarModal(mensaje) {
  return new Promise(resolve => {
    const modal = document.getElementById("modalCopa");
    const modalTexto = document.getElementById("modalTexto");
    const modalBtn = document.getElementById("modalBtn");

    if (mensaje.includes("<") && mensaje.includes(">")) {
      modalTexto.innerHTML = mensaje;
    } else {
      modalTexto.textContent = mensaje;
    }

    modal.style.display = "flex";

    modalBtn.onclick = () => {
      modal.style.display = "none";
      resolve();
    };
  });
}


async function simularCopaColombiaNuevoFormato() {
  await mostrarModal("⚽ Copa Colombia: ¡Comienza el torneo nacional!");

  // ✅ Mezclar equipos dinámicamente
  const mezclaPrimera = equiposPrimera.map(e => e.nombre);
const mezclaSegunda = equiposSegunda.map(e => e.nombre);

  shuffleArray(mezclaPrimera);
  shuffleArray(mezclaSegunda);

  const totalPrimera = mezclaPrimera.length;
  const totalSegunda = mezclaSegunda.length;

  // 🧩 Determinar proporción dinámica
  const fase1PrimeraCount = Math.max(2, Math.round(totalPrimera * 0.2)); // 20% de los equipos A entran en Fase 1
  const fase1Primera = mezclaPrimera.slice(0, fase1PrimeraCount);
  const fase1Equipos = [...mezclaSegunda, ...fase1Primera];
  const fase2Equipos = mezclaPrimera.slice(fase1PrimeraCount);

  // 🧱 Crear grupos automáticos
  const numGrupos = Math.min(6, Math.max(3, Math.floor(fase1Equipos.length / 5)));
  const grupos = Array.from({ length: numGrupos }, () => []);
  shuffleArray(fase1Equipos);
  for (let i = 0; i < fase1Equipos.length; i++) {
    grupos[i % numGrupos].push(fase1Equipos[i]);
  }

  const clasificadosFase1 = [];

  // 🧮 Fase 1 - Grupos
  for (let index = 0; index < grupos.length; index++) {
    const grupo = grupos[index];
    const tabla = grupo.map(nombre => ({ nombre, pts: 0, gf: 0, gc: 0 }));

    for (let i = 0; i < grupo.length; i++) {
      for (let j = i + 1; j < grupo.length; j++) {
        const eq1 = grupo[i];
        const eq2 = grupo[j];
        if (!eq1 || !eq2) continue;
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

    // 🖼️ Mostrar tabla resumida con escudos
    let texto = `📊 Grupo ${String.fromCharCode(65 + index)}\n`;
    tabla.forEach(t => {
      //const escudo = `<img src="escudos/${t.nombre.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/ /g, "_")}.png" class="escudo-peq">`;
      const escudo = escudoPeq(t.nombre);
      //texto += `${escudo} ${t.pts} pts (DG ${t.gf - t.gc})\n`;
      texto += `${escudo} ${t.nombre} - ${t.pts} pts (DG ${t.gf - t.gc})\n`;
    });
    await mostrarModal(texto.trim());
  }

  // ⚔️ FASE 2 - Eliminatoria directa entre los restantes de Primera
  shuffleArray(fase2Equipos);
  const clasificadosFase2 = [];
  const textoF2 = [];

  for (let i = 0; i < fase2Equipos.length; i += 2) {
    const eq1 = fase2Equipos[i];
    const eq2 = fase2Equipos[i + 1];
    if (!eq1 || !eq2) continue;

    const ida = simularPartido(eq1, eq2);
    const vuelta = simularPartido(eq2, eq1);
    const total1 = ida.golesA + vuelta.golesB;
    const total2 = ida.golesB + vuelta.golesA;

    const ganador = total1 > total2 ? eq1 : total2 > total1 ? eq2 : (Math.random() < 0.5 ? eq1 : eq2);
    clasificadosFase2.push(ganador);

    //const esc1 = `<img src="escudos/${eq1.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/ /g, "_")}.png" class="escudo-peq">`;
    //const esc2 = `<img src="escudos/${eq2.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/ /g, "_")}.png" class="escudo-peq">`;

    const esc1 = escudoPeq(eq1);
    const esc2 = escudoPeq(eq2);

    //textoF2.push(`${esc1} ${ida.golesA}-${ida.golesB} ${esc2}\n${esc2} ${vuelta.golesA}-${vuelta.golesB} ${esc1}\n➡️ ${ganador}`);
    textoF2.push(`
     ${esc1} ${eq1} ${ida.golesA}-${ida.golesB} ${eq2} ${esc2}\n
     ${esc2} ${eq2} ${vuelta.golesA}-${vuelta.golesB} ${eq1} ${esc1}\n
     ➡️ ${ganador}`);
  }

  await mostrarModal("🧩 Fase 2 - Eliminatoria directa\n\n" + textoF2.join("\n\n"));

  // 🏁 FASE 3 - Octavos
  const octavos = [...clasificadosFase1, ...clasificadosFase2];
  shuffleArray(octavos);
  const cuartofinalistas = [];
  const textoF3 = [];

  for (let i = 0; i < octavos.length; i += 2) {
    const eq1 = octavos[i];
    const eq2 = octavos[i + 1];
    if (!eq1 || !eq2) continue;

    const ida = simularPartido(eq1, eq2);
    const vuelta = simularPartido(eq2, eq1);
    const total1 = ida.golesA + vuelta.golesB;
    const total2 = ida.golesB + vuelta.golesA;
    const ganador = total1 > total2 ? eq1 : total2 > total1 ? eq2 : (Math.random() < 0.5 ? eq1 : eq2);
    cuartofinalistas.push(ganador);

    //const esc1 = `<img src="escudos/${eq1.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/ /g, "_")}.png" class="escudo-peq">`;
    //const esc2 = `<img src="escudos/${eq2.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/ /g, "_")}.png" class="escudo-peq">`;

    const esc1 = escudoPeq(eq1);
    const esc2 = escudoPeq(eq2);

    //textoF3.push(`${esc1} ${ida.golesA}-${ida.golesB} ${esc2}\n${esc2} ${vuelta.golesA}-${vuelta.golesB} ${esc1}\n➡️ ${ganador}`);
    textoF3.push(`
     ${esc1} ${eq1} ${ida.golesA}-${ida.golesB} ${eq2} ${esc2}\n
     ${esc2} ${eq2} ${vuelta.golesA}-${vuelta.golesB} ${eq1} ${esc1}\n
     ➡️ ${ganador}`);
  }

  await mostrarModal("🔶 Fase 3 - Octavos\n\n" + textoF3.join("\n\n"));

  // ⚙️ Fases finales dinámicas
  const avanzar = async (ronda, equipos) => {
    const ganadores = [];
    shuffleArray(equipos);
    let texto = `📅 ${ronda}\n`;

    for (let i = 0; i < equipos.length; i += 2) {
      const eq1 = equipos[i];
      const eq2 = equipos[i + 1];
      if (!eq1 || !eq2) continue;

      const ida = simularPartido(eq1, eq2);
      const vuelta = simularPartido(eq2, eq1);
      const total1 = ida.golesA + vuelta.golesB;
      const total2 = ida.golesB + vuelta.golesA;
      const ganador = total1 > total2 ? eq1 : total2 > total1 ? eq2 : (Math.random() < 0.5 ? eq1 : eq2);
      ganadores.push(ganador);

      //const esc1 = `<img src="escudos/${eq1.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/ /g, "_")}.png" class="escudo-peq">`;
      //const esc2 = `<img src="escudos/${eq2.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/ /g, "_")}.png" class="escudo-peq">`;

      const esc1 = escudoPeq(eq1);
      const esc2 = escudoPeq(eq2);
      //texto += `\n${esc1} ${ida.golesA}-${ida.golesB} ${esc2} / ${esc2} ${vuelta.golesA}-${vuelta.golesB} ${esc1}\n➡️ ${ganador}\n`;
      texto += `
      ${esc1} ${eq1} ${ida.golesA}-${ida.golesB} ${eq2} ${esc2} / 
      ${esc2} ${eq2} ${vuelta.golesA}-${vuelta.golesB} ${eq1} ${esc1}\n
      ➡️ ${ganador}
     `;
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
    copasGanadasPorUsuario++;
    document.getElementById("titulosc").innerText = `Copa: ${copasGanadasPorUsuario}`;
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


function simularSuperliga() {
  const cont = document.getElementById("superliga");
  cont.innerHTML = "";

  const temporadaBase = temporadaActual - 1;
  const registro = campeonesLigaPorTemporada[temporadaBase];

  if (!registro || (!registro.I && !registro.II)) {
    cont.innerHTML = `<p>X No hay datos completos de campeones ${temporadaBase} para disputar la Superliga.</p>`;
    return;
  }

  let eq1 = registro.I;
  let eq2 = registro.II;

  // ✄1�7 Si fue el mismo campeón en ambos semestres
  if (eq1 === eq2) {
    const tablaBase = tablasAnualesPorTemporada[temporadaBase];

    if (tablaBase && tablaBase.length > 0) {
      const reclas = [...tablaBase]
        .filter(e => e.nombre !== eq1)
        .sort((a, b) => b.pts - a.pts || (b.gf - b.gc) - (a.gf - a.gc));

      eq2 = reclas[0]?.nombre || "Desconocido";
    } else {
      cont.innerHTML = `<p>X- No hay tabla anual guardada para la Superliga ${temporadaBase}.</p>`;
      return;
    }
  }

  // ✄1�7 Simulación normal
  const ida = simularPartido(eq1, eq2);
  const vuelta = simularPartido(eq2, eq1);

  const total1 = ida.golesA + vuelta.golesB;
  const total2 = ida.golesB + vuelta.golesA;
  const ganador = total1 !== total2 ? (total1 > total2 ? eq1 : eq2) : (Math.random() < 0.5 ? eq1 : eq2);

  let html = `
    <h2>Superliga ${temporadaBase}</h2>
    <p><strong>${eq1}</strong> vs <strong>${eq2}</strong> (ida y vuelta)</p>
    <p>Ida: ${eq1} ${ida.golesA}-${ida.golesB} ${eq2}</p>
    <p>Vuelta: ${eq2} ${vuelta.golesA}-${vuelta.golesB} ${eq1}</p>
    <p><strong>Global:</strong> ${total1} - ${total2}</p>
    <h3> Campeon Superliga ${temporadaBase}: ${ganador}</h3>
  `;

  cont.innerHTML = html;

  agregarTituloSuperliga(ganador);
  campeonesSuperliga.push({ nombre: ganador, temporada: temporadaBase });
  actualizarHistorialSuperliga();

  if (ganador === equipoUsuario) {
    superligasGanadasPorUsuario++;
    document.getElementById("tituloss").innerText = `Superliga: ${superligasGanadasPorUsuario}`;
    sumarPresupuesto(200000);
    cont.innerHTML += `<p>Premio Superliga para ${ganador}: $200.000</p>`;
  }
}