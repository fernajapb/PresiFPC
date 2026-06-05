const ligasLibertadores = {

  brasil: {
    probabilidad: 0.95,
    minFuerza: 75,
    maxFuerza: 81,

    equipos: [
      { nombre:"Flamengo" },
      { nombre:"Palmeiras" },
      { nombre:"Gremio" },
      { nombre:"Mineiro" },
      { nombre:"Sao Paulo" },
      { nombre:"Cruzeiro" }
    ]
  },

  argentina:{
    probabilidad:0.90,
    minFuerza:73,
    maxFuerza:80,

    equipos:[
      {nombre:"River"},
      {nombre:"Boca"},
      {nombre:"Racing"},
      {nombre:"Estudiantes"},
      {nombre:"Independiente"},
      {nombre:"San Lorenzo"}
    ]
  },

  uruguay:{
    probabilidad:0.70,
    minFuerza:65,
    maxFuerza:72,

    equipos:[
      {nombre:"Penarol"},
      {nombre:"Nacional UY"},
      {nombre:"Liverpool UY"}
    ]
  },

  chile:{
    probabilidad:0.60,
    minFuerza:63,
    maxFuerza:69,

    equipos:[
      {nombre:"Colo Colo"},
      {nombre:"U. de Chile"},
      {nombre:"U. Catolica"}
    ]
  },

  ecuador:{
    probabilidad:0.55,
    minFuerza:66,
    maxFuerza:72,

    equipos:[
      {nombre:"IDV"},
      {nombre:"Barcelona SC"},
      {nombre:"LDU"}
    ]
  },

  paraguay:{
    probabilidad:0.50,
    minFuerza:65,
    maxFuerza:70,

    equipos:[
      {nombre:"Olimpia"},
      {nombre:"Cerro Porteno"},
      {nombre:"Libertad"}
    ]
  },

  peru:{
    probabilidad:0.45,
    minFuerza:64,
    maxFuerza:70,

    equipos:[
      {nombre:"Alianza Lima"},
      {nombre:"Universitario"},
      {nombre:"Sporting Cristal"}
    ]
  },

  venezuela:{
    probabilidad:0.30,
    minFuerza:60,
    maxFuerza:65,

    equipos:[
      {nombre:"Caracas"},
      {nombre:"Táchira"},
      {nombre:"Carabobo"}
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


function obtenerEscudo(nombre) {
  return getEscudoEquipo(nombre);
}

function mostrarNombreEquipo(nombre){
   alert(nombre);
}

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


function simularFinalLib(equipoA, equipoB) {

  const golesA = Math.max(
    0,
    Math.round(Math.random() * 3 + (equipoA.fuerza - equipoB.fuerza) / 20)
  );

  const golesB = Math.max(
    0,
    Math.round(Math.random() * 3 + (equipoB.fuerza - equipoA.fuerza) / 20)
  );

  let ganador;

  if (golesA > golesB) ganador = equipoA;
  else if (golesB > golesA) ganador = equipoB;
  else ganador = equipoA.fuerza >= equipoB.fuerza ? equipoA : equipoB;

  return {
    equipoA,
    equipoB,
    golesA,
    golesB,
    ganador
  };
}

function mezclarEquipos(lista) {
  const copia = [...lista];

  for (let i = copia.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copia[i], copia[j]] = [copia[j], copia[i]];
  }

  return copia;
}

function simularRonda(equipos, nombreRonda) {

  // 🔀 Mezclar equipos para cruces aleatorios
  equipos = mezclarEquipos(equipos);

  let ganadores = [];
  let html = `<h3>${nombreRonda}</h3>`;

  for (let i = 0; i < equipos.length; i += 2) {

    let res;

    // 🏆 FINAL A PARTIDO ÚNICO
    if (nombreRonda === "Final") {

      res = simularFinalLib(equipos[i], equipos[i + 1]);
      ganadores.push(res.ganador);

      /*
      html += `
        <div class="partido-libertadores">

          <div class="fila-partido">
            <img src="${obtenerEscudo(res.equipoA.nombre)}" class="escudo-lib">
            <span>${res.golesA} - ${res.golesB}</span>
            <img src="${obtenerEscudo(res.equipoB.nombre)}" class="escudo-lib">
          </div>

          <div class="global">
            Campeón:
            <b>
              <img src="${obtenerEscudo(res.ganador.nombre)}" class="escudo-mini">
            </b>
          </div>

          <hr>
        </div>
      `;
      */

      html += `
  <div class="partido-libertadores">

    <div class="fila-partido">
      <img src="${obtenerEscudo(res.equipoA.nombre)}" 
           onclick="mostrarNombreEquipo('${res.equipoA.nombre}')"
           onerror="this.src='escudos/default.png'" 
           class="escudo-lib">

      <span>${res.golesA} - ${res.golesB}</span>

      <img src="${obtenerEscudo(res.equipoB.nombre)}" 
           onclick="mostrarNombreEquipo('${res.equipoB.nombre}')"
           onerror="this.src='escudos/default.png'" 
           class="escudo-lib">
    </div>

    <div class="global">
      Campeón:
      <b>
        <img src="${obtenerEscudo(res.ganador.nombre)}" 
             onclick="mostrarNombreEquipo('${res.ganador.nombre}')"
             onerror="this.src='escudos/default.png'" 
             class="escudo-mini">
      </b>
    </div>

    <hr>
  </div>
`;

      continue;
    }

    // ⚽ RESTO DE RONDAS (IDA Y VUELTA)
    res = simularLlave(equipos[i], equipos[i + 1]);
    ganadores.push(res.ganador);

    html += `
  <div class="partido-libertadores">

    <div class="fila-partido">
      <img src="${obtenerEscudo(res.equipoA.nombre)}" 
           onclick="mostrarNombreEquipo('${res.equipoA.nombre}')"
           onerror="this.src='escudos/default.png'" 
           class="escudo-lib">

      <span>${res.ida.a} - ${res.ida.b}</span>

      <img src="${obtenerEscudo(res.equipoB.nombre)}" 
           onclick="mostrarNombreEquipo('${res.equipoB.nombre}')"
           onerror="this.src='escudos/default.png'" 
           class="escudo-lib">
    </div>

    <div class="fila-partido">
      <img src="${obtenerEscudo(res.equipoB.nombre)}" 
           onclick="mostrarNombreEquipo('${res.equipoB.nombre}')"
           onerror="this.src='escudos/default.png'" 
           class="escudo-lib">

      <span>${res.vuelta.b} - ${res.vuelta.a}</span>

      <img src="${obtenerEscudo(res.equipoA.nombre)}" 
           onclick="mostrarNombreEquipo('${res.equipoA.nombre}')"
           onerror="this.src='escudos/default.png'" 
           class="escudo-lib">
    </div>

    <div class="global">
      Global: ${res.totalA} - ${res.totalB} |
      Clasifica 
      <b>
        <img src="${obtenerEscudo(res.ganador.nombre)}" 
             onclick="mostrarNombreEquipo('${res.ganador.nombre}')"
             onerror="this.src='escudos/default.png'" 
             class="escudo-mini">
      </b>
    </div>

    <hr>
  </div>
`;
  }

  return { ganadores, html };
}


function actualizarFuerzasLibertadores() {

  for (let pais in ligasLibertadores) {

    // 🔥 Colombia usa obtenerFuerzaTotal()
    if (pais === "colombia") continue;

    const liga = ligasLibertadores[pais];

    liga.equipos.forEach(equipo => {

      equipo.fuerza =
        Math.floor(
          Math.random() *
          (liga.maxFuerza - liga.minFuerza + 1)
        ) + liga.minFuerza;

    });
  }
}

function simularLibertadores() {

  actualizarFuerzasLibertadores();

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

function mostrarCampeonLibertadores() {

  const campeon = estadoLibertadores.equipos[0];
  let recompensaHTML = "";

  agregarTitulo(campeon.nombre, "libertadores");
  mostrarPalmaresColombia?.();
  mostrarPalmaresInternacional?.();

  // 💰 PREMIO SOLO SI ES EL USUARIO
  if (campeon.nombre === equipoUsuario) {

    libertadoresGanadasPorUsuario++;
    document.getElementById("titulosl").innerText = `Libertadores: ${libertadoresGanadasPorUsuario}`;
    
    sumarPresupuesto(24000000);
    modificarFuerzaEquipo(1);

    recompensaHTML = `
      <div class="recompensa-libertadores">
        <h3>🎁 Recompensas del club</h3>
        <p>💰 Presupuesto: <b>+$24.000.000</b></p>
        <p>💪 Fuerza del equipo: <b>+1</b></p>
      </div>
    `;
  }

  document.getElementById("tituloLibertadores").innerText =
    "🏆 Campeón Copa Libertadores";

  document.getElementById("contenidoLibertadores").innerHTML = `
  <div class="campeon-libertadores">
    <h2>${campeon.nombre}</h2>

    <img src="${obtenerEscudo(campeon.nombre)}" 
         onerror="this.src='escudos/default.png'" 
         class="escudo-campeon">

    ${recompensaHTML}
  </div>
`;

  const btn = document.getElementById("btnSiguienteRonda");
  btn.innerText = "Cerrar";
  btn.onclick = cerrarModalLibertadores;
}


function cerrarModalLibertadores() {
  document.getElementById("modalLibertadores").classList.add("oculto");
  mostrarPalmaresInternacional();
}