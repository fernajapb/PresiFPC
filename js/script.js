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
  /*
  const nombreLimpio = equipoUsuario
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/ /g, "_");
*/

  document.getElementById("fechaRenuncia").innerText = fechaActual;
  document.getElementById("nombreEquipoCarta").innerText = equipoUsuario;
  document.getElementById("escudoEquipo").src = getEscudoEquipo(equipoUsuario);
 // document.getElementById("escudoEquipo").src = `escudos/${nombreLimpio}.png`;

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
  /*
  const nombreLimpio = equipoUsuario
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/ /g, "_");
    */

  document.getElementById("fechaRenuncia").innerText = fechaActual;
  document.getElementById("nombreEquipoCarta").innerText = equipoUsuario;
  document.getElementById("escudoEquipo").src = getEscudoEquipo(equipoUsuario);
  //document.getElementById("escudoEquipo").src = `escudos/${nombreLimpio}.png`;

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

  // Limitar entre 0 y 100
  const apoyoFinal = Math.max(0, Math.min(100, base + azar));

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
    if (precio < 3300000) return;

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


// =========================
// 📌 Esquemas tácticos
// =========================

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
    defensa: ["LI","DFC","DFC","LD"],
    medio: ["MD","MO","MD"],
    delantero: ["EI","DC","ED"]
  },

  "4-4-2": {
    defensa: ["LI","DFC","DFC","LD"],
    medio: ["EI","MD","MD","ED"],
    delantero: ["DC","DC"]
  },

  "3-4-3": {
    defensa: ["DFC","DFC","DFC"],
    medio: ["LI","MD","MO","LD"],
    delantero: ["EI", "DC", "ED"]
  },

  "4-2-4": {
    defensa: ["LI", "DFC", "DFC", "LD"],
    medio: ["MD", "MD"],
    delantero: ["EI","DC","DC","ED"]
  },

   "4-4-2B": {
    defensa: ["LI","DFC","DFC","LD"],
    medio: ["MO","MD","MD","ED"],
    delantero: ["DC","MO"]
  },

   "5-3-2": {
    defensa: ["LI","DFC","DFC","DFC","LD"],
    medio: ["MD","MD","MD"],
    delantero: ["DC","DC"]
  },

   "3-5-2": {
    defensa: ["DFC","DFC","DFC"],
    medio: ["LI","MD","MD","MD","LD"],
    delantero: ["DC","DC"]
  },

  "5-2-3": {
    defensa: ["LI","DFC","DFC","DFC","LD"],
    medio: ["MD","MD"],
    delantero: ["EI","DC","ED"]
  },

   "4-5-1": {
    defensa: ["LI","DFC","DFC","LD"],
    medio: ["EI","MO","MD","MO","ED"],
    delantero: ["DC"]
  },

   "5-4-1": {
    defensa: ["LI","DFC","DFC","DFC","LD"],
    medio: ["EI","MD","MD","ED"],
    delantero: ["DC"]
  }
};

const posicionesSecundarias = {

  DFC: ["MD", "LI", "LD"],
  LI: ["LD", "EI", "DFC"],
  LD: ["LI", "ED", "DFC"],

  MD: ["MO", "DFC"],
  MO: ["MD", "DC"],

  DC: ["EI", "ED", "MO"],
  EI: ["ED", "MO", "DC", "LI"],
  ED: ["EI", "MO", "DC", "LD"]

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

//<img src="${jugador.foto || jugador.avatar || 'img/jugadores/default.png'}"
    //class="fotoJugadorModal"></img>

function mostrarInfoJugador(jugador) {
  const modal = document.getElementById("modalJugador");
  const contenido = document.getElementById("modalContenidoJugador");

  const bandera = jugador.nacionalidad 
        ? `recursos/banderas/${jugador.nacionalidad}.png`
        : `recursos/banderas/colombia.png`; // bandera por defecto

  
const esJugadorUsuario =
  plantillasJugadores[equipoUsuario]?.some(
    j => j.nombre === jugador.nombre
  );

const botonVenta = esJugadorUsuario
  ? `
    <button class="btnVenderJugador"
      onclick="venderJugador('${jugador.nombre}')">
      💰 Vender jugador
    </button>
  `
  : "";
  
contenido.innerHTML = `

  <div class="card-header">
    <div class="media-circulo">${jugador.media}</div>
    <h2 class="nombre">${jugador.nombre}</h2>
  </div>

  <div class="card-body">

    <img src="${getFotoJugador(jugador)}"
     onerror="this.src='img/jugadores/default.png'"
     class="fotoJugadorModal">

    <div class="info-lateral">
      <p><b>Posición:</b> ${jugador.posicion}</p>
      <p>
        <b>Nacionalidad:</b>
        <img src="${bandera}" class="banderaJugador">
      </p>
      <p><b>Forma:</b> ${jugador.forma > 0 ? "🔥" : jugador.forma < 0 ? "❄️" : "😐"} (${jugador.forma})</p>
    </div>
  </div>

<div class="card-footer">
  <div class="item">
    <p>Edad</p>
    <span>${jugador.edad} años</span>
  </div>

  <div class="item">
    <p>S.Anual</p>
    <span>${formatearPrecio(jugador.salarioAnual)}</span>
  </div>

  <div class="item">
    <p>S.Mensual</p>
    <span>${formatearSalarioMensual(jugador.salarioMensual)}</span>
  </div>

  <div class="item">
    <p>Valor</p>
    <span>${formatearPrecio(jugador.valor)}</span>
  </div>
</div>

  ${botonVenta}
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

function cerrarPlantilla() {
  const contenedor = document.getElementById("alineacion");
  contenedor.innerHTML = "<p>Selecciona un equipo</p>";
}

function mostrarPlantilla(nombreEquipo) {

  if (!nombreEquipo) {
    const selector = document.getElementById("selectorEquipo");
    if (!selector) return;
    nombreEquipo = selector.value;
  }

  //const plantilla = procesarPlantilla(nombreEquipo);
  //const plantillaBase = procesarPlantilla(nombreEquipo);
  //const plantilla = agregarSueldosAPlantilla(plantillaBase, nombreEquipo);

  const plantilla = agregarSueldosAPlantilla(
  procesarPlantilla(nombreEquipo),
  nombreEquipo
);
  const contenedor = document.getElementById("alineacion");

  if (!plantilla.length) {
    contenedor.innerHTML = "<p>❌ Sin jugadores o Vuelve a Seleccionar</p>";
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
  /*
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
  */

  function rellenarLinea(arrayPosiciones) {
  return arrayPosiciones.map(pos => {

    // =========================
    // 1. BUSCAR POSICIÓN EXACTA
    // =========================
    let jugador = plantilla
      .filter(j =>
        j.posicion === pos &&
        !usados.includes(j)
      )
      .sort((a, b) => b.media - a.media)[0];

    // =========================
    // 2. SI NO HAY -> SECUNDARIAS
    // =========================
    if (!jugador && posicionesSecundarias[pos]) {

      for (const posAlt of posicionesSecundarias[pos]) {

        jugador = plantilla
          .filter(j =>
            j.posicion === posAlt &&
            !usados.includes(j)
          )
          .sort((a, b) => b.media - a.media)[0];

        if (jugador) break;
      }
    }

    // =========================
    // 3. GUARDAR USADO
    // =========================
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

  //=======================
  //INFO PRESUPUESTO
  //=======================
  const edadPromedio = Math.round(
  plantilla.reduce((acc, j) => acc + j.edad, 0) / plantilla.length
  );

  let tipoEquipo = "";

  if (edadPromedio < 24) tipoEquipo = "🟢 joven";
  else if (edadPromedio < 29) tipoEquipo = "🟡 Estable";
  else tipoEquipo = "🔴 Veterano";

  const numeroJugadores = plantilla.length;

  const sueldoanual = calcularSueldoPorFuerza(
  obtenerFuerzaTotal(nombreEquipo)
  );

  const añoFundacion = fundaciones[nombreEquipo] || "Desconocido";

  /*
  
  <div class="info-presupuesto">
     División: ${equiposPrimera.some(e => e.nombre === nombreEquipo) ? "Primera A" : "Segunda"}<br>
    💰 Sueldo anual total: ${formatearPrecio(sueldoanual)}<br>
    👥 Jugadores: ${plantilla.length}<br>
    🎂 ${edadPromedio} años (${tipoEquipo})
  </div>
  
  */
  // =========================
  // RENDER 
  // =========================
  contenedor.innerHTML = `
<div class="info-presupuesto">
  
  <div class="item">
    <span class="titulo">División</span>
    <span class="valor">
      ${equiposPrimera.some(e => e.nombre === nombreEquipo)
        ? "Primera A"
        : "Segunda"}
    </span>
  </div>

  <div class="item">
    <span class="titulo">Sueldo Total</span>
    <span class="valor">
      ${formatearPrecio(sueldoanual)}
    </span>
  </div>

  <div class="item">
    <span class="titulo">Jugadores</span>
    <span class="valor">
      ${plantilla.length}
    </span>
  </div>

  <div class="item">
    <span class="titulo">Edad Promedio</span>
    <span class="valor">
      ${edadPromedio} años - ${tipoEquipo}
    </span>
  </div>

  <div class="item">
    <span class="titulo">Equipo y Formacion</span>
    <span class="valor">
      ${nombreEquipo} - (${esquemaActual})
    </span>
  </div>

  <div class="item">
    <span class="titulo">Fundación</span>
    <span class="valor">${añoFundacion}</span>
 </div>

</div>

    <div class="campo">
     
     <div class="titulares">
     <h4 class="suplentes-text">Titulares</h4>
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

      <div class="suplentes">
        <h4 class="suplentes-text">Suplentes</h4>
        ${suplentes.map(j => `
          <div class="jugador suplente"
              onclick='mostrarInfoJugador(${JSON.stringify(j)})'>
           ${j.nombre} (${j.posicion})
         </div>`).join("")}
      </div>
    </div> 

  `;
}

}

const sueldosEquipos = {};

function agregarSueldosAPlantilla(plantilla, nombreEquipo) {

  // 👉 Si ya existe, usarlo
  if (sueldosEquipos[nombreEquipo]) {
    return sueldosEquipos[nombreEquipo];
  }

  const sueldoanual = calcularSueldoPorFuerza(
    obtenerFuerzaTotal(nombreEquipo)
  );

  const sumaPesos = plantilla.reduce(
    (acc, j) => acc + Math.pow(j.media, 3),
    0
  );

  const plantillaConSueldos = plantilla.map(j => {
    const peso = Math.pow(j.media, 3) / sumaPesos;
    const factor = generarFactorJugador(j.nombre);
    const salarioAnual = Math.round(sueldoanual * peso * factor);
    const salarioMensual = Math.round(salarioAnual / 12);

    return {
      ...j,
      salarioAnual,
      salarioMensual,
      valor: j.valor ?? calcularPrecioJugador(j)
    };
  });

  // 👉 Guardar en memoria
  sueldosEquipos[nombreEquipo] = plantillaConSueldos;

  return plantillaConSueldos;
}
/*
function agregarSueldosAPlantilla(plantilla, nombreEquipo) {
  const sueldoanual = calcularSueldoPorFuerza(
    obtenerFuerzaTotal(nombreEquipo)
  );

  const sumaPesos = plantilla.reduce(
    (acc, j) => acc + Math.pow(j.media, 3),
    0
  );

  return plantilla.map(j => {
    const peso = Math.pow(j.media, 3) / sumaPesos;
    const salarioAnual = Math.round(sueldoanual * peso);
    const salarioMensual = Math.round(salarioAnual / 12);

    return {
      ...j,
      salarioAnual,
      salarioMensual
    };
  });
}
*/



/*
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
*/

function abrirModalADY(descendidos, ascendidos, repechajeEquipos = []) {
  const modal = document.getElementById("modalAscensoDescenso");

  // función helper
  function ponerEscudos(divId, equipos) {
    const cont = document.getElementById(divId);
    cont.innerHTML = "";

    equipos.forEach(nombre => {
      /*
      const nombreLimpio = nombre
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/ /g, "_");

      cont.innerHTML += `
        <img src="escudos/${nombreLimpio}.png" title="${nombre}">
      `;
      */

    cont.innerHTML += `
  <div class="equipoItem">
    <img src="${getEscudoEquipo(nombre)}" 
    onerror="this.src='escudos/default.png'">
    <span>${nombre}</span>
  </div>
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
    campeon1S = obtenerCampeonSemestre(); // Guardar campeón 1S
    alert("Fin del semestre 1. Ahora puedes simular el segundo semestre.");
    simularCopaColombiaNuevoFormato();
    abrirModalEconomico();
    procesarSemestrePatrocinio();
    procesarSemestreMarca();
    yaVendioCamisetas = false;
    return;
    
  }


  // ✄1�7 Fin de temporada (semestre 2)
  
  campeon2S = obtenerCampeonSemestre(); // Guardar campeón 2S
  procesarSemestrePatrocinio();
  procesarSemestreMarca();
  yaVendioCamisetas = false;

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
    fuerza: obtenerFuerzaTotal(nombre) || 63   // fuerza base para ascendidos
  };
});
equiposPrimera = equiposPrimera.concat(nuevosPrimera);

// 4. Agregar a Segunda los descendidos
const nuevosSegunda = descendidos.map(nombre => {
  return {
    nombre,
    fuerza: obtenerFuerzaTotal(nombre) || 61   // fuerza base para descendidos
  };
});
equiposSegunda = equiposSegunda.concat(nuevosSegunda);


actualizarFuerzaUI();


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
  actividadSemestreUsada = false;

  // Limpieza
  procesarRetirosYAltas();
  verificarAsambleaDimayor();
  resetearBalanceEconomico();
  
  verificarEleccionesPresidenciales();
  presupuestoNegativoDetectado = false;

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
    avatar,
    forma: 0,
    valor: calcularPrecioJugador({ nombre, edad, media })
  };
}
