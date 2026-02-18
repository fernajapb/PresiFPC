const ligasLibertadores = {

  brasil: {
    probabilidad: 0.95,
    equipos: [
      { nombre: "Flamengo", fuerza: 81 },
      { nombre: "Palmeiras", fuerza: 81 },
      { nombre: "Gremio", fuerza: 79 },
      { nombre: "Mineiro", fuerza: 78 },
      { nombre: "Sao Paulo", fuerza: 77},
      { nombre: "Cruzeiro", fuerza: 77}
    ]
  },

  argentina: {
    probabilidad: 0.90,
    equipos: [
      { nombre: "River", fuerza: 80 },
      { nombre: "Boca", fuerza: 80 },
      { nombre: "Racing", fuerza: 75 },
      { nombre: "Estudiantes", fuerza: 76},
      { nombre: "Independiente", fuerza: 68 },
      { nombre: "San Lorenzo", fuerza: 67 }
    ]
  },

  uruguay: {
    probabilidad: 0.70,
    equipos: [
      { nombre: "Penarol", fuerza: 72 },
      { nombre: "Nacional UY", fuerza: 72 },
      { nombre: "Liverpool UY", fuerza: 66 }
    ]
  },

  chile: {
    probabilidad: 0.60,
    equipos: [
      { nombre: "Colo Colo", fuerza: 69 },
      { nombre: "U. de Chile", fuerza: 67 },
      { nombre: "U. Catolica", fuerza: 67 }
    ]
  },

  ecuador: {
    probabilidad: 0.55,
    equipos: [
      { nombre: "IDV", fuerza: 70 },
      { nombre: "Barcelona SC", fuerza: 68 },
      { nombre: "LDU", fuerza: 72 }
    ]
  },

  paraguay: {
    probabilidad: 0.50,
    equipos: [
      { nombre: "Olimpia", fuerza: 70 },
      { nombre: "Cerro Porteno", fuerza: 70 },
      { nombre: "Libertad", fuerza: 69 }
    ]
  },

  peru: {
    probabilidad: 0.45,
    equipos: [
      { nombre: "Alianza Lima", fuerza: 70 },
      { nombre: "Universitario", fuerza: 70 },
      { nombre: "Sporting Cristal", fuerza: 67 }
    ]
  },

  venezuela: {
    probabilidad: 0.30,
    equipos: [
      { nombre: "Caracas", fuerza: 65 },
      { nombre: "Táchira", fuerza: 65 },
      { nombre: "Carabobo", fuerza: 65 }
    ]
  },

  colombia: {
    probabilidad: 0.65,
    equipos: [] // ⬅ SE LLENA DINÁMICAMENTE
  }

};

let estadoLibertadores = {
  ronda: 0,
  rondas: ["Octavos", "Cuartos", "Semifinales", "Final"],
  equipos: []
};

/*
function obtenerClasificadosColombia() {

  let clasificados = [];

  const campeonesTemporada =
    campeonesLigaPorTemporada[temporadaActual] || {};

  // Campeones semestre I y II
  Object.values(campeonesTemporada).forEach(eq => {
    if (eq && !clasificados.includes(eq)) {
      clasificados.push(eq);
    }
  });

  // Si se repite campeón → reclasificación
  if (clasificados.length < 2) {
    const reclasificacion = Object.values(tablaAnual)
      .sort((a, b) => b.pts - a.pts)
      .map(e => e.nombre);

    for (let eq of reclasificacion) {
      if (!clasificados.includes(eq)) {
        clasificados.push(eq);
        break;
      }
    }
  }

  return clasificados.map(nombre => ({
    nombre,
    fuerza: obtenerFuerzaTotal(nombre)
  }));
}
*/

function obtenerClasificadosColombia() {

  const clasificados = [];
  const usados = new Set();

  const campeones =
    campeonesLigaPorTemporada[temporadaActual] || {};

  const campeon1S = campeones.apertura || campeones["1S"];
  const campeon2S = campeones.finalizacion || campeones["2S"];

  // 1️⃣ Campeón Primer Semestre
  if (campeon1S) {
    clasificados.push(campeon1S);
    usados.add(campeon1S);
  }

  // 2️⃣ Campeón Segundo Semestre (si es distinto)
  if (campeon2S && campeon2S !== campeon1S) {
    clasificados.push(campeon2S);
    usados.add(campeon2S);
  }

  // 3️⃣ Tabla de reclasificación ordenada
  const reclaOrdenada = Object.values(tablaAnual)
    .sort((a, b) => b.pts - a.pts)
    .map(e => e.nombre);

  // 4️⃣ Completar cupos Libertadores hasta llegar a 4
  for (let nombre of reclaOrdenada) {
    if (clasificados.length >= 4) break;

    if (!usados.has(nombre)) {
      clasificados.push(nombre);
      usados.add(nombre);
    }
  }

  // 5️⃣ Devolver equipos con fuerza
  return clasificados.map(nombre => ({
    nombre,
    fuerza: obtenerFuerzaTotal(nombre)
  }));
}


function generarOctavosLibertadores() {

  let candidatos = [];

  // 1️⃣ Primera pasada: por país (respetando probabilidad)
  for (let pais in ligasLibertadores) {
    const liga = ligasLibertadores[pais];

    if (Math.random() <= liga.probabilidad && liga.equipos.length > 0) {
      const elegido = liga.equipos[
        Math.floor(Math.random() * liga.equipos.length)
      ];

      if (!candidatos.some(e => e.nombre === elegido.nombre)) {
        candidatos.push({ ...elegido, pais });
      }
    }
  }

  // 2️⃣ Pool total SIN duplicados
  const pool = Object.values(ligasLibertadores)
    .flatMap(l => l.equipos)
    .filter((e, i, arr) =>
      arr.findIndex(x => x.nombre === e.nombre) === i
    );

  // 3️⃣ Rellenar hasta 16 SIN repetir
  while (candidatos.length < 16 && pool.length > 0) {

    const idx = Math.floor(Math.random() * pool.length);
    const extra = pool[idx];

    if (!candidatos.some(e => e.nombre === extra.nombre)) {
      candidatos.push(extra);
    }

    pool.splice(idx, 1); // 🔥 clave: sacarlo del pool
  }

  // 4️⃣ Ordenar por fuerza y cortar
  candidatos.sort((a, b) => b.fuerza - a.fuerza);

  return candidatos.slice(0, 16);
}


function simularLlave(equipoA, equipoB) {

  const idaA = Math.max(0, Math.round(Math.random() * 3 + (equipoA.fuerza - equipoB.fuerza) / 20));
  const idaB = Math.max(0, Math.round(Math.random() * 3));

  const vueltaB = Math.max(0, Math.round(Math.random() * 3 + (equipoB.fuerza - equipoA.fuerza) / 20));
  const vueltaA = Math.max(0, Math.round(Math.random() * 3));

  const totalA = idaA + vueltaA;
  const totalB = idaB + vueltaB;

  let ganador;
  if (totalA > totalB) ganador = equipoA;
  else if (totalB > totalA) ganador = equipoB;
  else ganador = equipoA.fuerza >= equipoB.fuerza ? equipoA : equipoB;

  return {
    equipoA,
    equipoB,
    ida: { a: idaA, b: idaB },
    vuelta: { a: vueltaA, b: vueltaB },
    totalA,
    totalB,
    ganador
  };
}


function simularRonda(equipos, nombreRonda) {

  let ganadores = [];
  let html = `<h3>${nombreRonda}</h3>`;

  for (let i = 0; i < equipos.length; i += 2) {

    const res = simularLlave(equipos[i], equipos[i + 1]);
    ganadores.push(res.ganador);

    html += `
      <div class="partido-libertadores">

        <div class="fila-partido">
          <img src="${obtenerEscudo(res.equipoA.nombre)}" class="escudo-lib">
          <span>${res.ida.a} - ${res.ida.b}</span>
          <img src="${obtenerEscudo(res.equipoB.nombre)}" class="escudo-lib">
        </div>

        <div class="fila-partido">
          <img src="${obtenerEscudo(res.equipoB.nombre)}" class="escudo-lib">
          <span>${res.vuelta.b} - ${res.vuelta.a}</span>
          <img src="${obtenerEscudo(res.equipoA.nombre)}" class="escudo-lib">
        </div>

        <div class="global">
          Global: ${res.totalA} - ${res.totalB} |
          Clasifica <b>
            <img src="${obtenerEscudo(res.ganador.nombre)}" class="escudo-mini">
          </b>
        </div>

        <hr>
      </div>
    `;
  }

  return { ganadores, html };
}


function simularLibertadores() {

  ligasLibertadores.colombia.equipos = obtenerClasificadosColombia();

  estadoLibertadores.equipos = generarOctavosLibertadores();
  estadoLibertadores.ronda = 0;

  document.getElementById("modalLibertadores").classList.remove("oculto");
  mostrarSiguienteRonda();
}

function mostrarSiguienteRonda() {

  const nombreRonda = estadoLibertadores.rondas[estadoLibertadores.ronda];
  const resultado = simularRonda(estadoLibertadores.equipos, nombreRonda);

  document.getElementById("tituloLibertadores").innerText = nombreRonda;
  document.getElementById("contenidoLibertadores").innerHTML = resultado.html;

  estadoLibertadores.equipos = resultado.ganadores;
  estadoLibertadores.ronda++;

  const btn = document.getElementById("btnSiguienteRonda");

  if (estadoLibertadores.equipos.length > 1) {
    btn.innerText = "Siguiente";
    btn.onclick = mostrarSiguienteRonda;
  } else {
  btn.innerText = "Ver Campeón";
  btn.onclick = () => {
    mostrarCampeonLibertadores();
  };
}
}

function obtenerEscudo(nombre) {
  const limpio = nombre
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/ /g, "_");

  const esColombiano =
    equiposPrimera.some(e => e.nombre === nombre) ||
    equiposSegunda.some(e => e.nombre === nombre);

  return esColombiano
    ? `escudos/${limpio}.png`
    : `escudos-lib/${limpio}.png`;
}


function mostrarCampeonLibertadores() {

  const campeon = estadoLibertadores.equipos[0];
  let recompensaHTML = "";

  // 🏆 sumar título al palmarés
  agregarTituloLibertadores(campeon.nombre);
  mostrarPalmaresColombia?.();
  mostrarPalmaresInternacional?.();

  // 💰 PREMIO SOLO SI ES EL USUARIO
  if (campeon.nombre === equipoUsuario) {

    sumarPresupuesto(24000000);
    modificarFuerzaEquipo(3);

    recompensaHTML = `
      <div class="recompensa-libertadores">
        <h3>🎁 Recompensas del club</h3>
        <p>💰 Presupuesto: <b>+$24.000.000</b></p>
        <p>💪 Fuerza del equipo: <b>+3</b></p>
      </div>
    `;
  }

  document.getElementById("tituloLibertadores").innerText =
    "🏆 Campeón Copa Libertadores";

  document.getElementById("contenidoLibertadores").innerHTML = `
    <div class="campeon-libertadores">
      <h2>${campeon.nombre}</h2>
      <img src="${obtenerEscudo(campeon.nombre)}" class="escudo-campeon">
      <p>Fuerza actual: ${campeon.fuerza}</p>
      ${recompensaHTML}
    </div>
  `;

  const btn = document.getElementById("btnSiguienteRonda");
  btn.innerText = "Cerrar";
  btn.onclick = cerrarModalLibertadores;
}


/*
function mostrarCampeonLibertadores() {

  const campeon = estadoLibertadores.equipos[0];

  document.getElementById("tituloLibertadores").innerText = "🏆 Campeón Libertadores";
  document.getElementById("contenidoLibertadores").innerHTML = `
    <h2>${campeon.nombre}</h2>
    <img src="${obtenerEscudo(campeon.nombre)}" class="escudo-campeon">
    <p>Fuerza: ${campeon.fuerza}</p>
  `;

  // 🏆 sumar al palmarés
  agregarTituloLibertadores(campeon.nombre);
  mostrarPalmaresColombia?.();
  mostrarPalmaresInternacional?.();

  const btn = document.getElementById("btnSiguienteRonda");

  // 🔥 CAMBIO CLAVE
  btn.innerText = "Cerrar";
  btn.onclick = cerrarModalLibertadores;
}
*/

function cerrarModalLibertadores() {
  document.getElementById("modalLibertadores").classList.add("oculto");
}

