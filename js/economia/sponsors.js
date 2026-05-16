/*================
PATROCINADORES
===================*/

/*
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
*/

const patrocinadores = [
  // ===== GRANDES =====
  { nombre: "NovaDrink", dinero: 32000000, duracion: 4, nivel: "grande", condicion: "campeon" },
  { nombre: "ApexBet", dinero: 30000000, duracion: 4, nivel: "grande", condicion: "top8" },
  { nombre: "TitanEnergy", dinero: 35000000, duracion: 5, nivel: "grande", condicion: "campeon" },
  { nombre: "GlobalTech", dinero: 28000000, duracion: 4, nivel: "grande", condicion: "top8" },
  { nombre: "HyperXpress", dinero: 33000000, duracion: 6, nivel: "grande", condicion: "campeon" },

  // ===== MEDIANOS =====
  { nombre: "QuickMart", dinero: 18000000, duracion: 4, nivel: "mediano", condicion: "top8" },
  { nombre: "UrbanFood", dinero: 15000000, duracion: 3, nivel: "mediano", condicion: "media_tabla" },
  { nombre: "MaxFuel", dinero: 16000000, duracion: 4, nivel: "mediano", condicion: "top8" },
  { nombre: "NetWave", dinero: 14000000, duracion: 3, nivel: "mediano", condicion: "media_tabla" },
  { nombre: "EcoMarket", dinero: 17000000, duracion: 4, nivel: "mediano", condicion: "ninguna" },

  // ===== CHICOS =====
  { nombre: "BarrioPan", dinero: 7000000, duracion: 2, nivel: "chico", condicion: "ninguna" },
  { nombre: "AgroPlus", dinero: 6000000, duracion: 2, nivel: "chico", condicion: "media_tabla" },
  { nombre: "FixIt", dinero: 5000000, duracion: 2, nivel: "chico", condicion: "ninguna" },
  { nombre: "MiniMarketX", dinero: 6500000, duracion: 2, nivel: "chico", condicion: "media_tabla" },
  { nombre: "ZonaSnack", dinero: 5500000, duracion: 1, nivel: "chico", condicion: "ninguna" },

  // ===== CHICOS B =====
  { nombre: "NebulaCorp", dinero: 3000000, duracion: 1, nivel: "chicob", condicion: "ninguna" },
  { nombre: "Solaris Dynamics", dinero: 4000000, duracion: 2, nivel: "chicob", condicion: "ninguna" },
  { nombre: "ApexNova", dinero: 5500000, duracion: 3, nivel: "chicob", condicion: "ninguna" },
  { nombre: "QuantumPulse", dinero: 3500000, duracion: 1, nivel: "chicob", condicion: "ninguna" },
  { nombre: "Orion Ventures", dinero: 5000000, duracion: 3, nivel: "chicob", condicion: "ninguna" },
  { nombre: "TitanGrid", dinero: 3200000, duracion: 1, nivel: "chicob", condicion: "ninguna" },
  { nombre: "NovaSphere", dinero: 4500000, duracion: 2, nivel: "chicob", condicion: "ninguna" },
  { nombre: "HyperLink Co", dinero: 3800000, duracion: 1, nivel: "chicob", condicion: "ninguna" },
  { nombre: "BlueOrbit", dinero: 5700000, duracion: 3, nivel: "chicob", condicion: "ninguna" }
];

let patrocinadorActivo = null;
let semestresRestantesPatro = 0;

function nivelEquipoUsuario() {
  const fuerza = obtenerFuerzaTotal(equipoUsuario);
  if (fuerza >= 69) return "grande";
  if (fuerza >= 65) return "mediano";
  if (fuerza >= 63) return "chico";
  if (fuerza >= 59) return "chicob";
  return "muy_chico";
}

function textoCondicion(cond) {
  switch (cond) {
    case "campeon": return "Ser campeón";
    case "top8": return "Top 8";
    case "media_tabla": return "Puesto 10-14";
    case "ninguna": return "Sin condición";
    default: return "";
  }
}

function cumpleCondicionPatro(patro, posicionFinal, campeon) {
  switch (patro.condicion) {
    case "campeon":
      return campeon === equipoUsuario;

    case "top8":
      return posicionFinal <= 8;

    case "media_tabla":
       return (posicionFinal >= 10 && posicionFinal <= 14) || posicionFinal < 10;

    case "ninguna":
      return true;

    default:
      return true;
  }
}

function obtenerPatrocinadoresDisponibles() {

  const nivel = nivelEquipoUsuario();
  const division = obtenerDivision(equipoUsuario);

  return patrocinadores.filter(p => {

    if (p.nivel !== nivel) return false;

    if (division === "segunda") {
      return p.condicion === "ninguna";
    }
    
    return true;
  });
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


  const disponibles = obtenerPatrocinadoresDisponibles();

  /*
const disponibles = patrocinadores.filter(p => {
  if (nivel === "grande") return p.nivel === "grande";
  if (nivel === "mediano") return p.nivel === "mediano";
  if (nivel === "chico") return p.nivel === "chico";
  if (nivel === "chicob") return p.nivel === "chicob";
});
*/
  const ofertas = disponibles.sort(() => 0.5 - Math.random()).slice(0, 4);
  const lista = document.getElementById("listaPatrocinadores");
  lista.innerHTML = "";

  ofertas.forEach(p => {
    const div = document.createElement("div");
    div.className = "patro-card";

   let contenidoVisual;

if (p.logo) {
  contenidoVisual = `
    <img src="logos/${p.logo}" 
    onerror="this.outerHTML='<div class=\\'patro-texto\\'>${p.nombre}</div>'" 
    alt="${p.nombre}">
  `;
} else {
  contenidoVisual = `<div class="patro-texto">${p.nombre}</div>`;
}

    div.innerHTML = `
     ${contenidoVisual}
    <div>
      <strong>${p.nombre}</strong><br>
       💰 $${(p.dinero/1e6).toFixed(1)}M<br>
       ⏳ ${p.duracion} semestres<br>
       🎯 ${textoCondicion(p.condicion)}
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
let contenidoVisual;

if (patrocinadorActivo.logo) {
  contenidoVisual = `
    <img src="logos/${patrocinadorActivo.logo}" 
    onerror="this.outerHTML='<div class=\\'patro-texto\\'>${patrocinadorActivo.nombre}</div>'"
    alt="${patrocinadorActivo.nombre}">
  `;
} else {
  contenidoVisual = `<div class="patro-texto">${patrocinadorActivo.nombre}</div>`;
}

  cont.className = "";
  cont.innerHTML = `
    <div class="patro-card-active">
      ${contenidoVisual}
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

function contratarPatrocinador(p) {
  const pagoInicial = p.dinero * 0.2;
  const restante = p.dinero - pagoInicial;

  patrocinadorActivo = {
    ...p,
    pagoPorSemestre: restante / p.duracion,
    evaluado: false,          // 👈 nuevo
    semestreInicio: semestreActual
  };

  semestresRestantesPatro = p.duracion;

  // 💰 pago inicial
  sumarPresupuesto(pagoInicial);
  balanceEconomico.sponsor += pagoInicial;
  actualizarBalanceUI();

  actualizarPatrocinadorActivo();
  cerrarModalPatrocinadores();
}

function procesarSemestrePatrocinio() {
  if (!patrocinadorActivo) return;

  // 💰 pago por semestre
  sumarPresupuesto(patrocinadorActivo.pagoPorSemestre);
  balanceEconomico.sponsor += patrocinadorActivo.pagoPorSemestre;
  actualizarBalanceUI();

  semestresRestantesPatro--;

  // 🔎 obtener posición
  let posicionFinal = null;

  if (tabla && Array.isArray(tabla)) {
    const pos = tabla.findIndex(t => t.nombre === equipoUsuario);
    posicionFinal = pos >= 0 ? pos + 1 : null;
  }

  if (!patrocinadorActivo.evaluado) {

    const cumple = cumpleCondicionPatro(
      patrocinadorActivo,
      posicionFinal,
      campeonActual
    );

    patrocinadorActivo.evaluado = true;

    if (!cumple) {
      alert(`❌ ${patrocinadorActivo.nombre} canceló el contrato por no cumplir objetivos.`);
      patrocinadorActivo = null;
      actualizarPatrocinadorActivo();
      return;
    } else {
      alert(`✅ Cumpliste los objetivos de ${patrocinadorActivo.nombre}. El contrato continúa.`);
    }
  }

  if (semestresRestantesPatro <= 0) {

    const renovar = confirm(
      `El contrato con ${patrocinadorActivo.nombre} terminó.\n¿Renovar por ${patrocinadorActivo.duracion} semestres más?`
    );

    if (renovar) {
      semestresRestantesPatro = patrocinadorActivo.duracion;
      patrocinadorActivo.evaluado = false; // 👈 vuelve a evaluar en el nuevo ciclo
    } else {
      patrocinadorActivo = null;
    }
  }

  actualizarPatrocinadorActivo();
}
