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



/*================
PATROCINADORES
===================*/

const patrocinadores = [
  // ===== GRANDES =====
  { nombre: "Postobon", dinero: 30000000, duracion: 4, nivel: "grande" },
  { nombre: "BetPlay", dinero: 28000000, duracion: 4, nivel: "grande" },
  { nombre: "Aguila", dinero: 32000000, duracion: 4, nivel: "grande" },
  { nombre: "Andina", dinero: 30000000, duracion: 4, nivel: "grande" },
  { nombre: "Stake", dinero: 35000000, duracion: 6, nivel: "grande" },

  // ===== MEDIANOS =====
  { nombre: "Betsson", dinero: 18000000, duracion: 5, nivel: "mediano" },
  { nombre: "Olimpica", dinero: 15000000, duracion: 4, nivel: "mediano" },
  { nombre: "Pepsi", dinero: 16000000, duracion: 3, nivel: "mediano" },
  { nombre: "Wplay.co", dinero: 14000000, duracion: 5, nivel: "mediano" },

  // ===== CHICOS =====
  { nombre: "Colanta", dinero: 8000000, duracion: 3, nivel: "chico" },
  { nombre: "Pool", dinero: 6000000, duracion: 2, nivel: "chico" },
  { nombre: "Cafe Aguila Roja", dinero: 7000000, duracion: 2, nivel: "chico" },
  { nombre: "Pastaslm", dinero: 7500000, duracion: 2, nivel: "chico" },
  { nombre: "Rivalo", dinero: 6500000, duracion: 2, nivel: "chico" },
  { nombre: "Megatiendas", dinero: 3000000, duracion: 1, nivel: "chico" }
];

let patrocinadorActivo = null;
let semestresRestantesPatro = 0;

function nivelEquipoUsuario() {
  const fuerza = obtenerFuerzaTotal(equipoUsuario);
  if (fuerza >= 70) return "grande";
  if (fuerza >= 66) return "mediano";
  if (fuerza >= 60) return "chico";
  return "muy_chico";
}

function mostrarPatrocinadores() {
  if (!equipoUsuario) {
    alert("No has elegido un equipo todavia.");
    return;
    }

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

let balanceEconomico = {
  sponsor: 0,
  sueldos: 0,
  derechos: 0,
  camisetas: 0
};

function actualizarBalanceUI() {
  actualizarLinea("balanceSponsor", balanceEconomico.sponsor);
  actualizarLinea("balanceSueldos", balanceEconomico.sueldos);
  actualizarLinea("balanceDerechos", balanceEconomico.derechos);
  actualizarLinea("balanceCamisetas", balanceEconomico.camisetas);

  // ❗ TOTAL SIN SUELDOS
  const total =
    balanceEconomico.sponsor +
    balanceEconomico.derechos +
    balanceEconomico.camisetas;

  actualizarLinea("balanceTotal", total);
}


function actualizarLinea(id, monto) {
  const el = document.getElementById(id);
  if (!el) return;

  el.className = monto > 0 ? "positivo" : monto < 0 ? "negativo" : "neutral";
  el.textContent = `${monto >= 0 ? "+" : "-"}$${Math.abs(monto / 1e6).toFixed(1)}M`;
}


function contratarPatrocinador(p) {
  patrocinadorActivo = p;
  semestresRestantesPatro = p.duracion;

  // Ingreso económico
  sumarPresupuesto(p.dinero);

  // Balance fijo
  balanceEconomico.sponsor += p.dinero;
  actualizarBalanceUI();

  actualizarPatrocinadorActivo();
  cerrarModalPatrocinadores();
}


function procesarSemestrePatrocinio() {
  if (!patrocinadorActivo) return;

  semestresRestantesPatro--;

  if (semestresRestantesPatro <= 0) {
    const renovar = confirm(
      `El contrato con ${patrocinadorActivo.nombre} terminó.\n¿Renovar por ${patrocinadorActivo.duracion} semestres más?`
    );

    if (renovar) {
      semestresRestantesPatro = patrocinadorActivo.duracion;

      // Ingreso económico por renovación
      sumarPresupuesto(patrocinadorActivo.dinero);

      // Balance fijo
      balanceEconomico.sponsor += patrocinadorActivo.dinero;
      actualizarBalanceUI();
    } else {
      patrocinadorActivo = null;
    }
  }

  actualizarPatrocinadorActivo();
}

function resetearBalanceEconomico() {
  balanceEconomico = {
    sponsor: 0,
    sueldos: 0,
    derechos: 0,
    camisetas: 0
  };

  actualizarBalanceUI();
}



// ==========================
// ASAMBLEA DIMAYOR
// ==========================

let patrocinadorLiga = "BetPlay";
let derechosTV = { canal: "WIN Sports", monto: 1500000, logo: "logos/win.png" };
let ultimaAsamblea = 2026;
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


// 🟦 Periodistas estilo Twitter
const periodistas = [
  { usuario: "@olsendeportes", foto: "recursos/periodistas/per1.png" },
  { usuario: "@PSierraR", foto: "recursos/periodistas/per2.png" },
  { usuario: "@guilloarango", foto: "recursos/periodistas/per3.png" },
  { usuario: "@CLMerlo", foto: "recursos/periodistas/per4.png" },
  { usuario: "@JulianCaperaB", foto: "recursos/periodistas/per5.png" },
  { usuario: "@Alejo170403", foto: "recursos/periodistas/per6.png" },
  { usuario: "@JuanSalvadorB", foto: "recursos/periodistas/per7.png" }
];

function publicarNoticiaTwitter(equipo, jugador, precio) {

    // ❗ Solo fichajes mayores a 800k generan noticia
    if (precio < 650000) return;

    // 40% de probabilidad de que salga noticia
    if (Math.random() > 0.80) return;

    const periodista = periodistas[Math.floor(Math.random() * periodistas.length)];

    // 📝 Mensajes variados (automáticos)
    const textos = [
        `🚨 BOMBA: ${equipo} cerró el fichaje de ${jugador} por ${formatearPrecio(precio)}. Operación clave para lo que viene.`,
        `📢 Fuentes confirman que ${equipo} pagó ${formatearPrecio(precio)} para asegurar a ${jugador}. Refuerzo de lujo.`,
        `🔵 ${equipo} se adelantó a varios clubes y firmó a ${jugador} por ${formatearPrecio(precio)}.`,
        `📝 Movimiento importante: ${jugador} ahora es nuevo jugador de ${equipo}. La operación ronda los ${formatearPrecio(precio)}.`,
        `🔥 Mercado activo: ${equipo} invierte ${formatearPrecio(precio)} en el fichaje de ${jugador}.`,
        `⚽ ${jugador} se une a ${equipo} en un traspaso valuado en ${formatearPrecio(precio)}. Gran golpe del club.`,
        `🤑 ${equipo} sorprendió pagando ${formatearPrecio(precio)} por ${jugador}. ¿Les saldrá bien el movimiento?`,
        `📈 ${equipo} apuesta fuerte y ficha a ${jugador} por ${formatearPrecio(precio)}.`
    ];

    const textoFinal = textos[Math.floor(Math.random() * textos.length)];

    const divNoticias = document.getElementById("noticiasTwitter");

    const noticia = document.createElement("div");
    noticia.classList.add("tweet");

    noticia.innerHTML = `
      <div class="tweet-header">
        <img src="${periodista.foto}" class="tweet-foto">
        <span class="tweet-user">${periodista.usuario}</span>
      </div>
      <div class="tweet-body">
        ${textoFinal}
      </div>
    `;

    divNoticias.prepend(noticia);
}


function simularMercadoFichajesNuevo() {
  const mercadoDiv = document.getElementById("mercadoFichajes");
  mercadoDiv.innerHTML = "<h3>💸 Mercado de Fichajes</h3><ul>";

  mercadoDiv.innerHTML += `
  <div class="nota-mercado">
    💸 <strong>Aviso del mercado:</strong> Los valores mostrados están redondeados y pueden variar levemente por comisiones, impuestos o cláusulas. Esas "pequeñas diferencias" son parte del negocio. ⚽
  </div>
`;

  const todosLosEquipos = [
  ...equiposPrimera.map(e => e.nombre),
  ...equiposSegunda.map(e => e.nombre)
];

const equiposVendedores = [
  ...todosLosEquipos,
  "Extranjero"
];


  // Inicializar presupuestos si no existen
  todosLosEquipos.forEach(eq => {
    if (!presupuestosEquipos[eq]) {
      presupuestosEquipos[eq] = calcularPresupuestoPorFuerza(obtenerFuerzaTotal(eq));
    }
  });

  // Cada equipo intenta hacer 1 o 2 operaciones
  todosLosEquipos.forEach(equipo => {
    const plantilla = plantillasJugadores[equipo];
    if (!plantilla || plantilla.length === 0) return;

    const operaciones = Math.floor(Math.random() * 2) + 1;

    for (let i = 0; i < operaciones; i++) {

      const vendedores = equiposVendedores.filter(e => e !== equipo && plantillasJugadores[e]?.length > 0);

/*
      const vendedores = todosLosEquipos.filter(e => e !== equipo && plantillasJugadores[e]?.length > 0);
*/

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

       const escudoVendedor = vendedor === "Extranjero"
       ? "🌍 Exterior"
       : `<img src="escudos/${vendedorLimpio}.png" class="escudos">`;

      /*
      const escudoVendedor = `<img src="escudos/${vendedorLimpio}.png" alt="${vendedor}" class="escudos">`;
       */
      const escudoComprador = `<img src="escudos/${equipoLimpio}.png" alt="${equipo}" class="escudos">`;

      mercadoDiv.innerHTML += `
        <li>
          <img src="${foto}" alt="${jugador.nombre}" class="fotoJugador"> 
          <b>${jugador.nombre}</b> pasó de ${escudoVendedor} a ${escudoComprador} 
          por ${formatearPrecio(precio)}
        </li>`;

       // 🐦 Publicación tipo Twitter
publicarNoticiaTwitter(equipo, jugador.nombre, precio);

    }
  });

  mercadoDiv.innerHTML += "</ul>";
}

function abrirChatDirector() {
    if (!equipoUsuario) {
    alert("⚠️ Debes seleccionar un equipo antes de iniciar la simulación.");
    return;
  }

  document.getElementById("modalDirector").classList.add("activo");
}

function cerrarChatDirector() {
  document.getElementById("modalDirector").classList.remove("activo");
}


function limpiarChatDirector() {
  document.getElementById("chatDirector").innerHTML =
    `<p><b>Director:</b> Empecemos de nuevo, presidente.</p>`;
  document.getElementById("opcionesDirector").innerHTML = "";
}


let fichajesUsuarioRealizados = 0;
const LIMITE_FICHAJES_USUARIO = 4;

function directorMejoresJugadores() {
  const chat = document.getElementById("chatDirector");
  const opcionesDiv = document.getElementById("opcionesDirector");

  opcionesDiv.innerHTML = "";

  const fuerzaEquipo = obtenerFuerzaTotal(equipoUsuario);
  const { min, max } = obtenerRangoFichajePorFuerza(fuerzaEquipo);

  chat.innerHTML += `
    <p><b>Director:</b> Según nuestro nivel actual (${fuerzaEquipo}),
    podemos fichar jugadores entre <b>${min}</b> y <b>${max}</b> de media.</p>
  `;

  const candidatos = [];

  Object.keys(plantillasJugadores).forEach(equipo => {
    if (equipo === equipoUsuario) return;

    plantillasJugadores[equipo].forEach(jugador => {
      if (jugador.media >= min && jugador.media <= max) {
        candidatos.push({ jugador, equipo });
      }
    });
  });

  if (candidatos.length === 0) {
    opcionesDiv.innerHTML = `
      <p>No hay jugadores disponibles dentro de nuestro rango actual.</p>
    `;
    return;
  }

  // 🔀 Aleatoriedad leve (no siempre los mismos)
  candidatos.sort(() => Math.random() - 0.5);

  const seleccion = candidatos.slice(0, 5);

  seleccion.forEach(({ jugador, equipo }) => {
    const precio = calcularPrecioPorMedia(jugador.media);
    const foto = jugador.foto || "img/jugadores/default.png";

    opcionesDiv.innerHTML += `
      <div class="opcion-jugador">
        <img src="${foto}" class="fotoJugador"><br>
        <b>${jugador.nombre}</b> (${jugador.media})<br>
        Equipo actual: ${equipo}<br>
        💰 ${formatearPrecio(precio)}<br>
        <button onclick="confirmarFichajeDirector('${jugador.nombre}','${equipo}',${precio})">
          Contratar
        </button>
      </div>
    `;
  });
}


/*
function directorMejoresJugadores() {
  const chat = document.getElementById("chatDirector");
  const opcionesDiv = document.getElementById("opcionesDirector");

  chat.innerHTML += `
    <p><b>Director:</b> He analizado el nivel actual del equipo y el mercado disponible.</p>
  `;
  opcionesDiv.innerHTML = "";

  const fuerzaEquipo = obtenerFuerzaEquipo(equipoUsuario);

  // 🎯 RANGO SEGÚN FUERZA
  let mediaMin = 50;
  let mediaMax = 86;

  if (fuerzaEquipo >= 74) {
    mediaMin = 72;
    mediaMax = 86;
  } else if (fuerzaEquipo >= 68) {
    mediaMin = 68;
    mediaMax = 78;
  } else if (fuerzaEquipo >= 60) {
    mediaMin = 60;
    mediaMax = 67;
  } else {
    mediaMin = 50;
    mediaMax = 59;
  }

  const candidatos = [];

  Object.keys(plantillasJugadores).forEach(equipo => {
    if (equipo === equipoUsuario) return;

    plantillasJugadores[equipo].forEach(jugador => {
      if (
        jugador.media >= mediaMin &&
        jugador.media <= mediaMax
      ) {
        candidatos.push({ jugador, equipo });
      }
    });
  });

  // Ordenar por media descendente
  candidatos.sort((a, b) => b.jugador.media - a.jugador.media);

  const seleccion = candidatos.slice(0, 5);

  if (seleccion.length === 0) {
    opcionesDiv.innerHTML = `
      <p>No hay jugadores adecuados para nuestro nivel actual.</p>
    `;
    return;
  }

  seleccion.forEach(({ jugador, equipo }, i) => {
    const precio = calcularPrecioPorMedia(jugador.media);
    const foto = jugador.foto || "img/jugadores/default.png";

    opcionesDiv.innerHTML += `
      <div class="opcion-jugador">
        <img src="${foto}" class="fotoJugador"><br>
        <b>${jugador.nombre}</b> (${jugador.media})<br>
        Equipo actual: ${equipo}<br>
        💰 ${formatearPrecio(precio)}<br>
        <button onclick="confirmarFichajeDirector('${jugador.nombre}','${equipo}',${precio})">
          Contratar
        </button>
      </div>
    `;
  });
}
*/


function obtenerRangoFichajePorFuerza(fuerza) {
  // límites de seguridad
  fuerza = Math.max(57, Math.min(fuerza, 86));

  let margenInferior;
  let margenSuperior;

  if (fuerza <= 60) {
    margenInferior = 0;
    margenSuperior = 3;
  } else if (fuerza <= 65) {
    margenInferior = 1;
    margenSuperior = 4;
  } else if (fuerza <= 70) {
    margenInferior = 2;
    margenSuperior = 5;
  } else if (fuerza <= 75) {
    margenInferior = 3;
    margenSuperior = 6;
  } else if (fuerza <= 80) {
    margenInferior = 4;
    margenSuperior = 7;
  } else {
    margenInferior = 5;
    margenSuperior = 8;
  }

  const min = fuerza - margenInferior;
  const max = fuerza + margenSuperior;

  return { min, max };
}

function confirmarFichajeDirector(nombreJugador, equipoVendedor, precio) {
  const chat = document.getElementById("chatDirector");

  // Límite de fichajes
  if (fichajesUsuarioRealizados >= LIMITE_FICHAJES_USUARIO) {
    chat.innerHTML += `
      <p><b>Director:</b> Ya hemos alcanzado el límite de fichajes (${LIMITE_FICHAJES_USUARIO}).</p>
    `;
    return;
  }

  if (presupuestoVisible < precio) {
    chat.innerHTML += `
      <p><b>Director:</b> No tenemos presupuesto suficiente.</p>
    `;
    return;
  }

  const jugador = plantillasJugadores[equipoVendedor]
    .find(j => j.nombre === nombreJugador);

  if (!jugador) return;

  const fuerzaEquipo = obtenerFuerzaTotal(equipoUsuario);
const rango = obtenerRangoFichajePorFuerza(fuerzaEquipo);

if (jugador.media < rango.min || jugador.media > rango.max) {
  chat.innerHTML += `
    <p><b>Director:</b> ❌ ${jugador.nombre} está fuera de nuestro alcance actual.</p>
    <p><b>Director:</b> Nuestro nivel permite fichar jugadores entre ${rango.min} y ${rango.max}.</p>
  `;
  return;
}

  // ✅ TRANSFERENCIA REAL
  plantillasJugadores[equipoVendedor] =
    plantillasJugadores[equipoVendedor].filter(j => j !== jugador);

  plantillasJugadores[equipoUsuario].push(jugador);

  presupuestosEquipos[equipoVendedor] += precio;
  presupuestosEquipos[equipoUsuario] -= precio;

  restarPresupuesto(precio);
  fichajesUsuarioRealizados++;

  chat.innerHTML += `
    <p><b>Director:</b> ✅ Fichaje cerrado. ${jugador.nombre} es nuevo jugador del club.</p>
    <p><b>Director:</b> Fichajes realizados: ${fichajesUsuarioRealizados}/${LIMITE_FICHAJES_USUARIO}</p>
  `;

  // 🗞️ Twitter
  publicarNoticiaTwitter(equipoUsuario, jugador.nombre, precio);

  // Refrescar mercado visual
  //simularMercadoFichajesNuevo();
}



function directorBuscarPorNombreUI() {
  const chat = document.getElementById("chatDirector");
  const opcionesDiv = document.getElementById("opcionesDirector");

  chat.innerHTML += `
    <p><b>Director:</b> Dígame el nombre del jugador que desea fichar.</p>
  `;

  opcionesDiv.innerHTML = `
    <div class="opcion-jugador">
      <input type="text" id="inputNombreJugador" placeholder="Nombre del jugador">
      <button onclick="directorBuscarPorNombre()">Buscar</button>
    </div>
  `;
}

function directorBuscarPorNombre() {
  const nombreBuscado = document
    .getElementById("inputNombreJugador")
    .value
    .trim()
    .toLowerCase();

  const chat = document.getElementById("chatDirector");
  const opcionesDiv = document.getElementById("opcionesDirector");

  if (!nombreBuscado) return;

  let encontrado = null;

  Object.keys(plantillasJugadores).forEach(equipo => {
    if (equipo === equipoUsuario) return;

    plantillasJugadores[equipo].forEach(jugador => {
      if (jugador.nombre.toLowerCase() === nombreBuscado) {
        encontrado = { jugador, equipo };
      }
    });
  });

  opcionesDiv.innerHTML = "";

  if (!encontrado) {
    chat.innerHTML += `
      <p><b>Director:</b> No he encontrado a ese jugador en el mercado.</p>
    `;
    return;
  }

  const { jugador, equipo } = encontrado;
  const precio = calcularPrecioPorMedia(jugador.media);
  const foto = jugador.foto || "img/jugadores/default.png";

  chat.innerHTML += `
    <p><b>Director:</b> He encontrado al jugador solicitado.</p>
  `;

  opcionesDiv.innerHTML = `
    <div class="opcion-jugador">
      <img src="${foto}" class="fotoJugador"><br>
      <b>${jugador.nombre}</b> (${jugador.media})<br>
      Equipo actual: ${equipo}<br>
      💰 ${formatearPrecio(precio)}<br><br>
      <button onclick="confirmarFichajeDirector('${jugador.nombre}','${equipo}',${precio})">
        Contratar
      </button>
    </div>
  `;
}



// =========================
// 📌 Esquemas tácticos
// =========================


/*
const esquemas = {
  "4-3-3": { defensas: 4, medios: 3, delanteros: 3 },
  "4-4-2": { defensas: 4, medios: 4, delanteros: 2 },
  "3-4-3": { defensas: 3, medios: 4, delanteros: 3 },
  "4-2-4": { defensas: 4, medios: 2, delanteros: 4 },
  "3-5-2": { defensas: 3, medios: 5, delanteros: 2 },
  "5-2-3": { defensas: 5, medios: 2, delanteros: 3 },
  "5-3-2": { defensas: 5, medios: 3, delanteros: 2 }
};
*/

const ordenLinea = {
  defensa: {
    li: 1,
    dfc: 2,
    ld: 3
  },
  medio: {
    md: 1,
    mo: 2
  },
  delantero: {
    ei: 1,
    dc: 2,
    ed: 3
  }
};

const esquemas = {
  "4-3-3": {
    defensa: ["LI", "DFC", "DFC", "LD"],
    medio: ["MD", "MO", "MD"],
    delantero: ["EI", "DC", "ED"]
  },

  "4-4-2": {
    defensa: ["LI", "DFC", "DFC", "LD"],
    medio: ["EI", "MD", "MD", "ED"],
    delantero: ["DC", "DC"]
  },

  "3-4-3": {
    defensa: ["DFC", "DFC", "DFC"],
    medio: ["LI", "MD", "MO", "LD"],
    delantero: ["EI", "DC", "ED"]
  },

  "4-2-4": {
    defensa: ["LI", "DFC", "DFC", "LD"],
    medio: ["MD", "MD"],
    delantero: ["EI", "DC", "DC", "ED"]
  }
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

/*
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
*/

/*
    <img src="${jugador.foto || 'img/jugadores/default.png'}" 
         alt="${jugador.nombre}" 
         class="fotoJugadorModal">
*/

function mostrarInfoJugador(jugador) {
  const modal = document.getElementById("modalJugador");
  const contenido = document.getElementById("modalContenidoJugador");

  const bandera = jugador.nacionalidad 
        ? `recursos/banderas/${jugador.nacionalidad}.png`
        : `recursos/banderas/colombia.png`; // bandera por defecto

  contenido.innerHTML = `

    <img src="${jugador.foto || jugador.avatar || 'img/jugadores/default.png'}"
     alt="${jugador.nombre}"
     class="fotoJugadorModal">

    <h2>${jugador.nombre}</h2>

    <p><b>Posición:</b> ${jugador.posicion}</p>
    <p><b>Edad:</b> ${jugador.edad} años</p>
    <p><b>Media:</b> ${jugador.media}</p>

    <p>
      <b>Nacionalidad:</b>
      <img src="${bandera}" class="banderaJugador">
    </p>
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


/*
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
*/

function mostrarPlantilla(nombreEquipo) {

  if (!nombreEquipo) {
    const selector = document.getElementById("selectorEquipo");
    if (!selector) return;
    nombreEquipo = selector.value;
  }

  const plantilla = procesarPlantilla(nombreEquipo);
  const contenedor = document.getElementById("alineacion");

  if (!plantilla.length) {
    contenedor.innerHTML = "<p>❌ Sin jugadores</p>";
    return;
  }

  // 👉 VISTA CANCHA
if (vistaActual === "cancha") {

  const esquema = esquemas[esquemaActual];
  const usados = [];

  // =========================
  // PORTERO (igual que antes)
  // =========================
  const porteroTitular = plantilla
    .filter(j => j.posicion === "PO")
    .sort((a, b) => b.media - a.media)[0];

  if (porteroTitular) usados.push(porteroTitular);

  // =========================
  // FUNCIÓN SIMPLE: RELLENAR LÍNEA
  // =========================
  function rellenarLinea(arrayPosiciones) {
    return arrayPosiciones.map(pos => {

      const jugador = plantilla
        .filter(j =>
          j.posicion === pos &&
          !usados.includes(j)
        )
        .sort((a, b) => b.media - a.media)[0];

      if (jugador) usados.push(jugador);
      return jugador || null;

    });
  }

  // =========================
  // LÍNEAS (LEÍDAS TAL CUAL)
  // =========================
  const defensasTitulares   = rellenarLinea(esquema.defensa);
  const mediosTitulares     = rellenarLinea(esquema.medio);
  const delanterosTitulares = rellenarLinea(esquema.delantero);

  // =========================
  // SUPLENTES
  // =========================
  const titulares = [
    porteroTitular,
    ...defensasTitulares,
    ...mediosTitulares,
    ...delanterosTitulares
  ].filter(Boolean);

  const suplentes = plantilla.filter(j => !titulares.includes(j));

  // =========================
  // RENDER (MISMO HTML)
  // =========================
  contenedor.innerHTML = `
    <h3 class="campo">${nombreEquipo} - (${esquemaActual})</h3>

    <div class="campo">
      <div class="linea portero">
        ${porteroTitular ? `
          <div class="jugador titular"
               onclick='mostrarInfoJugador(${JSON.stringify(porteroTitular)})'>
            ${porteroTitular.nombre}
          </div>` : ""}
      </div>

      <div class="linea defensa">
        ${defensasTitulares.map(j => j ? `
          <div class="jugador titular"
               onclick='mostrarInfoJugador(${JSON.stringify(j)})'>
            ${j.nombre}
          </div>` : "").join("")}
      </div>

      <div class="linea medio">
        ${mediosTitulares.map(j => j ? `
          <div class="jugador titular"
               onclick='mostrarInfoJugador(${JSON.stringify(j)})'>
            ${j.nombre}
          </div>` : "").join("")}
      </div>

      <div class="linea delantero">
        ${delanterosTitulares.map(j => j ? `
          <div class="jugador titular"
               onclick='mostrarInfoJugador(${JSON.stringify(j)})'>
            ${j.nombre}
          </div>` : "").join("")}
      </div>
    </div>

    <h4 class="suplentes-text">🪑 Suplentes</h4>
    <div class="suplentes">
      ${suplentes.map(j => `
        <div class="jugador suplente"
             onclick='mostrarInfoJugador(${JSON.stringify(j)})'>
          ${j.nombre} (${j.posicion})
        </div>`).join("")}
    </div>

    <div class="selectorEsquema">
      ${Object.keys(esquemas).map(e =>
        `<button onclick="cambiarEsquema('${e}')">${e}</button>`
      ).join(" ")}
    </div>

    <button class="cambiar-vista" onclick="toggleVista()">📋 Ver en lista</button>
  `;
}


// 👉 VISTA LISTA (para presidente) versión 3
else {

  const sueldoanual = calcularSueldoPorFuerza(
  obtenerFuerzaTotal(equipoUsuario)
);

// 1️⃣ Calcular suma de pesos (media al cubo)
const sumaPesos = plantilla.reduce(
  (acc, j) => acc + Math.pow(j.media, 3),
  0
);

// 2️⃣ Asignar sueldos
const plantillaConSueldos = plantilla.map(j => {
  const peso = Math.pow(j.media, 3) / sumaPesos;
  const salarioAnual = Math.round(sueldoanual * peso);
  const salarioMensual = Math.round(salarioAnual / 12);

  return {
    ...j,
    salarioAnual,
    salarioMensual
  };
});

/*
  const sumaMedias = plantilla.reduce((acc, j) => acc + j.media, 0);

  const plantillaConSueldos = plantilla.map(j => {
    const proporcion = j.media / sumaMedias;
    const salarioAnual = Math.round(sueldoanual * proporcion);
    const salarioMensual = Math.round(salarioAnual / 12);

    return { 
      ...j, 
      salarioAnual, 
      salarioMensual 
    };
  });
<td>${formatearPrecio(j.salarioMensual)}</td>
*/

  contenedor.innerHTML = `
    <h3 class="nombre-equipo">${nombreEquipo} - Plantilla completa</h3>
    <table class="tablaPlantilla">
      <thead>
        <tr>
          <th>Media</th>
          <th>Valor</th>
          <th>Salario Anual</th>
          <th>Salario Mensual</th>
        </tr>
      </thead>
      <tbody>
        ${plantillaConSueldos.map(j => `
          <tr onclick='mostrarInfoJugador(${JSON.stringify(j)})'>
            <td>${j.media}</td>
            <td>${formatearPrecio(calcularPrecioPorMedia(j.media))}</td>
            <td>${formatearPrecio(j.salarioAnual)}</td>
            <td>${formatearSalarioMensual(j.salarioMensual)}</td>
          </tr>
        `).join("")}
      </tbody>
    </table>

    <div class="info-presupuesto">
       División: ${equiposPrimera.some(e => e.nombre === nombreEquipo) ? "Primera A" : "Segunda"}<br>
       Sueldo anual total: ${formatearPrecio(sueldoanual)}
    </div>

    <button class="cambiar-vista" onclick="toggleVista()">⚽ Ver en cancha</button>
  `;
}
}





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


function abrirModalADY(descendidos, ascendidos, repechajeEquipos = []) {
  const modal = document.getElementById("modalAscensoDescenso");

  // función helper
  function ponerEscudos(divId, equipos) {
    const cont = document.getElementById(divId);
    cont.innerHTML = "";

    equipos.forEach(nombre => {
      const nombreLimpio = nombre
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/ /g, "_");

      cont.innerHTML += `
        <img src="escudos/${nombreLimpio}.png" title="${nombre}">
      `;
    });
  }

  ponerEscudos("escudosDescenso", descendidos);
  ponerEscudos("escudosAscenso", ascendidos);
  ponerEscudos("escudosRepechaje", repechajeEquipos);

  modal.style.display = "block";
}

function cerrarModalADY() {
  document.getElementById("modalAscensoDescenso").style.display = "none";
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
    campeon1S = obtenerCampeonSemestre(); // Guardar campeón 1S
    alert("Fin del semestre 1. Ahora puedes simular el segundo semestre.");
    simularCopaColombiaNuevoFormato();
   procesarSemestrePatrocinio();
   procesarSemestreMarca();
    return;
    
  }


  // ✄1�7 Fin de temporada (semestre 2)
  
  campeon2S = obtenerCampeonSemestre(); // Guardar campeón 2S
  procesarSemestrePatrocinio();
  procesarSemestreMarca();

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

/*
  alert(mensajeFinal);
*/

// Mostrar modal con escudos
abrirModalADY(
  descendidos,
  equiposQueAscienden,
  repechajeResultado ? [repechajeResultado.equipo1, repechajeResultado.equipo2] : []
);

// 🔄 MOVER EQUIPOS ENTRE DIVISIONES USANDO EL NUEVO SISTEMA

// 1. Sacar los descendidos de Primera
equiposPrimera = equiposPrimera.filter(e => !descendidos.includes(e.nombre));

// 2. Sacar los ascendidos de Segunda
equiposSegunda = equiposSegunda.filter(e => !equiposQueAscienden.includes(e.nombre));

// 3. Agregar a Primera los ascendidos
const nuevosPrimera = equiposQueAscienden.map(nombre => {
  return {
    nombre,
    fuerza: obtenerFuerzaEquipo(nombre) || 65   // fuerza base para ascendidos
  };
});
equiposPrimera = equiposPrimera.concat(nuevosPrimera);

// 4. Agregar a Segunda los descendidos
const nuevosSegunda = descendidos.map(nombre => {
  return {
    nombre,
    fuerza: obtenerFuerzaEquipo(nombre) || 63   // fuerza base para descendidos
  };
});
equiposSegunda = equiposSegunda.concat(nuevosSegunda);

evaluarObjetivos();
actualizarFuerzaUI();


  // Derechos de Tv
const montoDerechosTV = derechosTV?.monto || 1500000;

if (!presupuestosEquipos[equipoUsuario]) {
  presupuestosEquipos[equipoUsuario] = 0;
}

presupuestosEquipos[equipoUsuario] += montoDerechosTV;
sumarPresupuesto(montoDerechosTV);
alert(` Derechos de TV pagados + $${montoDerechosTV.toLocaleString()}`);

balanceEconomico.derechos += montoDerechosTV;
actualizarBalanceUI();


// Sueldos Anual

const sueldoAnual = calcularSueldoPorFuerza(
  obtenerFuerzaTotal(equipoUsuario)
);

/*
let sueldoAnual;

if (equiposPrimera.some(e => e.nombre === equipoUsuario)) {
  sueldoAnual = 150000000; // 💰 Primera A
} else if (equiposSegunda.some(e => e.nombre === equipoUsuario)) {
  sueldoAnual = 80000000; // 💰 Segunda B
}
*/
// Preguntar al usuario si quiere pagar
const quierePagar = confirm(`Deseas pagar los sueldos de la plantilla de ${equipoUsuario} por $${sueldoAnual.toLocaleString()}?`);

if (quierePagar) {
  if (presupuestoVisible >= sueldoAnual) {
    restarPresupuesto(sueldoAnual);
    alert(` Sueldos pagados: $${sueldoAnual.toLocaleString()} a la plantilla de ${equipoUsuario}.`);

    balanceEconomico.sueldos -= sueldoAnual;
    actualizarBalanceUI();

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

// 1️⃣ Termina temporada local
// 2️⃣ Llamás esto:
ligasLibertadores.colombia.equipos = obtenerClasificadosColombia();

// 3️⃣ Simulás Libertadores
simularLibertadores();

  // 🧹 Reset
  semestreActual = 1;
  temporadaActual++;
  tablaAnual = {};
  descensoPendiente = false;
  preguntaHechaEstaTemporada = false;
  actividadSemestreUsada = false;

  // Limpieza
  procesarRetirosYAltas();
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


//===CANTERA y RETIROS ===*/

let nivelCantera = 0; // Nivel inicial de la cantera (1 a 5, por ejemplo)
const costoMejoraCantera = [0, 500000, 1000000, 3000000, 5000000, 10000000]; // costo por nivel


function mejorarCantera() {
  const siguienteNivel = nivelCantera + 1;

  if (siguienteNivel > 5) {
    alert("🏆 La cantera ya está en el nivel máximo (5).");
    return;
  }

  const costo = costoMejoraCantera[siguienteNivel];

  if (typeof costo !== "number") {
    alert("❌ Error: costo inválido.");
    return;
  }

  if (presupuestoVisible < costo) {
    alert(`💰 No tienes suficiente dinero. Se necesitan ${formatearPrecio(costo)}`);
    return;
  }

  presupuestoVisible -= costo;
  nivelCantera = siguienteNivel;

  document.getElementById("Presupuesto").textContent =
    `Presupuesto: ${formatearPrecio(presupuestoVisible)}`;

  document.getElementById("nivelCanteraTexto").textContent =
    `Nivel de Cantera: ${nivelCantera}`;

  alert(`✅ Cantera mejorada a nivel ${nivelCantera} (-${formatearPrecio(costo)})`);
}




function procesarRetirosYAltas() {
  const posiciones = ["DFC", "LI", "LD", "MCO", "DC", "EI", "ED", "MD"];
  
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
  "Riaño", "Beltrán", "Bohórquez", "Pulido", "Santamaría", "Vélez", "Bonilla", "Lucumi"
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
        if (jugador.posicion.toLowerCase() === "PO") {
          porteroReemplazado = true;
        }
        retirosTotales.push(`👴 ${jugador.nombre} (${jugador.posicion}, ${jugador.edad}) se retira de ${equipo}`);
        return null;
      }
      return jugador;
    }).filter(j => j !== null);

    // ✄1�7 Verificar si queda portero
    const tienePortero = plantilla.some(j => j.posicion.toLowerCase() === "PO");
    if (!tienePortero || porteroReemplazado) {
      const nuevoPortero = generarJugador("PO", nombresCortos, nombres, equipo);
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
  const posiciones = ["DFC", "LI", "LD", "MCO", "DC", "EI", "ED", "MD"];

  const nombrePropio = nombresCortos[Math.floor(Math.random() * nombresCortos.length)];
  const apellido = nombres[Math.floor(Math.random() * nombres.length)];
  const nombre = `${nombrePropio} ${apellido}`;

  const edad = Math.floor(Math.random() * 5) + 18;

  const r = Math.random();
  let baseMedia;
  let esPromesa = false;

  if (r < 0.03) {
    baseMedia = Math.floor(Math.random() * 6) + 77;
    esPromesa = true;
  } else if (r < 0.075) {
    baseMedia = Math.floor(Math.random() * 5) + 70;
    esPromesa = true;
  } else {
    baseMedia = Math.floor(Math.random() * 10) + 58;
  }

  let bonificacionCantera = 0;
  if (equipoActual === equipoUsuario) {
    bonificacionCantera = (nivelCantera - 1) * 2;
  }

  const media = Math.min(baseMedia + bonificacionCantera, 99);
  const posicion = posicionFija || posiciones[Math.floor(Math.random() * posiciones.length)];

  // 🖼️ Avatar fijo aleatorio
  const numeroAvatar = Math.floor(Math.random() * 46) + 1;
  const avatar = `img/avatares/avatar_${numeroAvatar.toString().padStart(2, "0")}.png`;

  return {
    nombre,
    edad,
    media,
    posicion,
    promesa: esPromesa,
    avatar // ✅ NUEVO
  };
}


/*
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
*/



/*=== CHAT y TABLA de DTS===*/


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

  let nuevo;
  do {
    nuevo = estilosDT[Math.floor(Math.random() * estilosDT.length)];
  } while (nuevo === dtUsuario.estilo);

  dtUsuario.estilo = nuevo;

  document.getElementById("dtEstilo").innerText =
    `Estilo: ${dtUsuario.estilo}`;

  agregarMensaje(
    `He cambiado mi estilo a: ${dtUsuario.estilo}.`,
    "dt"
  );
}


function limpiarDT() {

  // limpiar chat
  document.getElementById("chatMensajes").innerHTML = "";
}



function mostrarTablaDTs() {
  const div = document.getElementById("tablaDTs");

  let html = `
    <table class="tabla-dt">
      <tr>
        <th>Equipo</th>
        <th>DT</th>
      </tr>
  `;

  const equipos = [
    ...equiposPrimera.map(e => e.nombre),
    ...equiposSegunda.map(e => e.nombre)
  ];

  equipos.forEach(eq => {
    const claveDT = Object.keys(equipoDeDT).find(k => equipoDeDT[k] === eq);

    let nombreDT = "Sin entrenador";
    let fotoDT = "dts/sin_dt.png"; // 👉 imagen por defecto

    if (claveDT && entrenadores[claveDT]) {
      nombreDT = entrenadores[claveDT].nombre;
      fotoDT = entrenadores[claveDT].foto;
    }

    html += `
      <tr>
        <td>${eq}</td>
        <td class="dt-col">
          <img src="${fotoDT}" class="dt-foto-tabla" alt="${nombreDT}">
          <span>${nombreDT}</span>
        </td>
      </tr>
    `;
  });

  html += `</table>`;
  div.innerHTML = html;
}

function inicializarDTsPorEquipo() {
  const listaEquipos = [
    ...equiposPrimera.map(e => e.nombre),
    ...equiposSegunda.map(e => e.nombre)
  ];

  listaEquipos.forEach(equipo => {
    const claveDT = dtPorEquipo[equipo];
    if (claveDT) {
      equipoDeDT[claveDT] = equipo;
    }
  });
}
