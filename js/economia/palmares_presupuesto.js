

//PALMARES
let palmaresEquipos = {
  "Nacional": { ligas: 18, copas: 8, superligas:4, 
                libertadores:2 },

  "Millonarios": { ligas: 16, copas: 3, superligas:2,
                   libertadores:0 },

  "América": { ligas: 15, copas: 0, superligas:0, 
               libertadores:0},

  "Cali": { ligas: 10, copas: 1, superligas:1, 
            libertadores:0},

  "Junior": { ligas: 11, copas: 2, superligas:2, 
              libertadores:0},

  "Santa Fe": { ligas: 10, copas: 2, superligas:4, 
                libertadores:0},

  "Tolima": { ligas: 3, copas: 1, superligas:1, 
              libertadores:0},

  "Medellín": { ligas: 6, copas: 3, superligas:0, 
                libertadores:0},

  "Once Caldas": { ligas: 4, copas: 1 , superligas:0,
                   libertadores:1},

  "Pereira": { ligas: 1, copas: 0 , superligas:0, 
               libertadores:0},

  "Bucaramanga": { ligas: 1, copas: 0 , superligas:0,
                   libertadores:0},

  "Inter Bogotá": { ligas: 0, copas: 1, superligas:0,
                    libertadores:0 },

  "Pasto": { ligas: 1, copas: 0 , superligas:0, 
             libertadores:0},

  "B.Chico": { ligas: 1, copas: 0 , superligas:0, 
               libertadores:0},

  "U.Magdalena": { ligas: 1, copas: 0 , superligas:0,
                   libertadores:0},

  "Cucuta": { ligas: 1, copas: 0 , superligas:0, 
              libertadores:0},

  "Quindio": { ligas: 1, copas: 0 , superligas:0, 
               libertadores:0},

  "CA Boca Jrs": { ligas: 0, copas: 1, superligas:0,
                      libertadores:0},

  "Independiente": { ligas: 0, copas: 0, superligas:0,
                      libertadores:7},
  "Boca": { ligas: 0, copas: 0, superligas:0,
                      libertadores:6},
  "Penarol": { ligas: 0, copas: 0, superligas:0,
                      libertadores:5},
  "Flamengo": { ligas: 0, copas: 0, superligas:0,
                      libertadores:4},
  "River": { ligas: 0, copas: 0, superligas:0,
                      libertadores:4},
  "Estudiantes": { ligas: 0, copas: 0, superligas:0,
                      libertadores:4},
  "Olimpia": { ligas: 0, copas: 0, superligas:0,
                      libertadores:3},
  "Nacional UY": { ligas: 0, copas: 0, superligas:0,
                      libertadores:3},
  "Sao Paulo": { ligas: 0, copas: 0, superligas:0,
                      libertadores:3},
  "Palmeiras": { ligas: 0, copas: 0, superligas:0,
                      libertadores:3},
  "Gremio": { ligas: 0, copas: 0, superligas:0,
                      libertadores:3},
  "Cruzeiro": { ligas: 0, copas: 0, superligas:0,
                      libertadores:2},
  "Colo Colo": { ligas: 0, copas: 0, superligas:0,
                      libertadores:1},
  "Racing": { ligas: 0, copas: 0, superligas:0,
                      libertadores:1},
  "Mineiro": { ligas: 0, copas: 0, superligas:0,
                      libertadores:1},
  "LDU": { ligas: 0, copas: 0, superligas:0,
                      libertadores:1},
  "San Lorenzo": { ligas: 0, copas: 0, superligas:0,
                      libertadores:1},
};

//ACTUALIZAR PALMARES 
function agregarTituloLiga(equipo) {
  if (!palmaresEquipos[equipo]) {
    palmaresEquipos[equipo] = { ligas: 0, copas: 0 , superligas: 0 };
  }
  palmaresEquipos[equipo].ligas++;
}

function agregarTituloCopa(equipo) {
  if (!palmaresEquipos[equipo]) {
    palmaresEquipos[equipo] = { ligas: 0, copas: 0 , superligas: 0 };
  }
  palmaresEquipos[equipo].copas++;
}

function agregarTituloSuperliga(equipo) {
  if (!palmaresEquipos[equipo]) {
    palmaresEquipos[equipo] = { ligas: 0, copas: 0, superligas: 0 };
  }
  if (palmaresEquipos[equipo].superligas == null) palmaresEquipos[equipo].superligas = 0;
  palmaresEquipos[equipo].superligas++;
}

// Asegurar compatibilidad hacia atrás en todo el palmarés
Object.keys(palmaresEquipos).forEach(k => {
  if (palmaresEquipos[k].superligas == null) palmaresEquipos[k].superligas = 0;
});

function agregarTituloLibertadores(equipo) {
  if (!palmaresEquipos[equipo]) {
    palmaresEquipos[equipo] = {
      ligas: 0,
      copas: 0,
      superligas: 0,
      libertadores: 0
    };
  }

  if (palmaresEquipos[equipo].libertadores == null) {
    palmaresEquipos[equipo].libertadores = 0;
  }

  palmaresEquipos[equipo].libertadores++;
}


function mostrarPalmaresColombia() {
  const contenedor = document.getElementById("palmares-colombia");
  if (!contenedor) return;

  let equipos = Object.entries(palmaresEquipos)
    .filter(([nombre]) =>
      equiposPrimera.some(e => e.nombre === nombre) ||
      equiposSegunda.some(e => e.nombre === nombre)
    )
    .map(([nombre, d]) => ({
      nombre,
      ligas: d.ligas || 0,
      copas: d.copas || 0,
      superligas: d.superligas || 0,
      total: (d.ligas || 0) + (d.copas || 0) + (d.superligas || 0)
    }))
    .sort((a, b) => b.total - a.total || b.ligas - a.ligas);

  let html = `<h2>🏆 Palmarés Colombia</h2>`;

  equipos.forEach((e, i) => {
    html += `
      <div class="card-palmares">
        <div class="header">
          <span class="posicion">#${i + 1}</span>
          <img src="${obtenerEscudo(e.nombre)}" class="escudo" width="40">
          <span class="nombre">${e.nombre}</span>
        </div>

        <div class="trofeos">
          <img src="recursos/trofeos/liga.png"  class="icono-trofeo">
          <span>: ${e.ligas}</span>

          <img src="recursos/trofeos/copa.png"  class="icono-trofeo">
          <span>: ${e.copas}</span>

          <img src="recursos/trofeos/super.png" class="icono-trofeo">
          <span>: ${e.superligas}</span>
        </div>
      </div>
    `;
  });

  contenedor.innerHTML = html;
}


function mostrarPalmaresInternacional() {
  const contenedor = document.getElementById("palmares-internacional");
  if (!contenedor) return;

  let equipos = Object.entries(palmaresEquipos)
    .filter(([_, d]) => (d.libertadores || 0) > 0)
    .map(([nombre, d]) => ({
      nombre,
      libertadores: d.libertadores || 0
    }))
    .sort((a, b) => b.libertadores - a.libertadores);

  let html = `<h2>🌎 Palmarés Internacional</h2>`;

  equipos.forEach((e, i) => {
    html += `
      <div class="card-palmares">
        <div class="header">
          <span class="posicion">#${i + 1}</span>
          <img src="${obtenerEscudo(e.nombre)}" class="escudo" width="40">
          <span class="nombre">${e.nombre}</span>
        </div>

        <div class="trofeos">
          <img src="recursos/trofeos/lib.png" class="icono-trofeo">
          <span>: ${e.libertadores}</span>
        </div>
      </div>
    `;
  });

  contenedor.innerHTML = html;
}


/*
function mostrarPalmares() {
  const contenedor = document.getElementById("palmares");
  if (!contenedor) return; // seguridad, por si no existe
  contenedor.innerHTML = ""; // limpiar antes

  let equiposOrdenados = Object.entries(palmaresEquipos)
    .map(([nombre, { ligas, copas, superligas, libertadores }]) => ({
  nombre,
  ligas,
  copas,
  libertadores: libertadores || 0,
  superligas,
  total: ligas + copas + (libertadores || 0) + (superligas || 0)
}))
    .sort((a, b) => b.total - a.total || b.ligas - a.ligas);

  let html = `<h2></h2>`;

  equiposOrdenados.forEach((equipo, i) => {
    const nombreLimpio = equipo.nombre
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/ /g, "_");

    const escudo = `<img src="escudos/${nombreLimpio}.png" alt="${equipo.nombre}" class="escudo" width="40">`;

  html += `
      <div class="card-palmares">
        <div class="header">
          <span class="posicion">#${i + 1}</span>
          ${escudo} <span class="nombre">${equipo.nombre}</span>
        </div>

        <div class="trofeos">
          <img src="recursos/trofeos/liga.png"  alt="Liga"      class="icono-trofeo"> <span>: ${equipo.ligas}</span>
          <img src="recursos/trofeos/copa.png"  alt="Copa"      class="icono-trofeo"> <span>: ${equipo.copas}</span>
          <img src="recursos/trofeos/super.png" alt="Superliga" class="icono-trofeo"> <span>: ${equipo.superligas}</span>
          <img src="recursos/trofeos/lib.png" alt="libertadores" class="icono-trofeo"> <span>: ${equipo.libertadores}</span>
        </div>
      </div>
    `;
  });

  contenedor.innerHTML = html;
}
*/


//PRESUPUESTO
let presupuestosEquipos = {};

let presupuestoVisible = 0;

function sumarPresupuesto(monto) {
  presupuestoVisible += monto;
  document.getElementById("Presupuesto").textContent = `Presupuesto: $${presupuestoVisible.toLocaleString()}`;
actualizarPresupuestoHTML() ;
}

function restarPresupuesto(monto) {
  presupuestoVisible -= monto; // ✅ Puede quedar en negativo
  document.getElementById("Presupuesto").textContent = `Presupuesto: $${presupuestoVisible.toLocaleString()}`;

  verificarPresupuestoNegativo(); // ✅ Llamada automática
  actualizarPresupuestoHTML() 
}


let presupuestoNegativoDetectado = false;
let alertaPresupuestoSinResolver = false;

function verificarPresupuestoNegativo() {
  if (presupuestoVisible < 0 && !presupuestoNegativoDetectado && !palancaUsadaEstaCrisis) {
    presupuestoNegativoDetectado = true;

    const botonPalanca = document.getElementById("botonPalanca");
    if (botonPalanca) {
      botonPalanca.disabled = false;
      botonPalanca.classList.add("activo");
    }
  }
}

let palancaUsadaEstaCrisis = false;

function desactivarPalanca() {
  const boton = document.getElementById("botonPalanca");
  if (boton) {
    boton.disabled = true;
    boton.classList.remove("activo");
  }

  palancaUsadaEstaCrisis = true; // ⛔ evita que se active otra vez en la misma crisis
}



function actualizarPresupuestoHTML() {
  const elemento = document.getElementById("Presupuesto");

  if (elemento) {
    const valor = formatearPrecio(presupuestoVisible);
    elemento.textContent = `Presupuesto: ${valor}`;

    // 🧼 Primero eliminamos todas las clases posibles
    elemento.classList.remove("presupuesto-rojo", "presupuesto-naranja", "presupuesto-verde");

    // 🎨 Luego agregamos solo la clase que corresponde
    if (presupuestoVisible < 0) {
      elemento.classList.add("presupuesto-rojo");
    } else if (presupuestoVisible === 0) {
      elemento.classList.add("presupuesto-naranja");
    } else {
      elemento.classList.add("presupuesto-verde");

      // 🔁 Resetear flags si saliste de la crisis
      desactivarPalanca();
      presupuestoNegativoDetectado = false;
      palancaUsadaEstaCrisis = false;
    }
  }
}



function activarPalanca() {
  if (presupuestoVisible >= 0) {
    alert("✅ No estás en crisis. La palanca solo se activa con presupuesto negativo.");
    return;
  }

  const preguntasCrisis = [
    {
      texto: "🏟️ ¿Vender el nombre del estadio a una marca por $10M?",
      si: () => {
        sumarPresupuesto(10000000);
        alert("💸 Vendiste los derechos del estadio. El club respira con $10 millones más.");
       desactivarPalanca() ;
        document.getElementById("botonPalanca").disabled = true;
      },
      no: () => {
        alert("😬 Mantuviste el nombre histórico. Pero la crisis sigue.");
      }
    },
    {
      texto: "👕 ¿Subastar camisetas históricas por $4M?",
      si: () => {
        sumarPresupuesto(4000000);
        alert("🧤 Vendiste reliquias. Doloroso pero útil. Sumas $4M.");
        desactivarPalanca() ;
        document.getElementById("botonPalanca").disabled = true;
      },
      no: () => {
        alert("😭 Decidiste conservar la historia. Aún sin fondos.");
      }
    },
    {
      texto: "🏫 ¿Alquilar parte del club para eventos y oficinas externas por $6M?",
      si: () => {
        sumarPresupuesto(6000000);
        alert("💼 Alquilaste espacio del club. Ganas $6M y calmas la crisis.");
        desactivarPalanca() ;
        document.getElementById("botonPalanca").disabled = true;
      },
      no: () => {
        alert("🤷‍♂️ Rechazaste la oferta. El déficit continúa.");
      }
    },
    {
      texto: "🐷 ¿Vender el bus oficial del plantel y usar uno alquilado por ahora? Ganas $3M.",
      si: () => {
        sumarPresupuesto(3000000);
        alert("🚐 Vendiste el bus oficial. Sumas $3M pero el club quedó sin vehículo propio.");
        desactivarPalanca() ;
        document.getElementById("botonPalanca").disabled = true;
      },
      no: () => {
        alert("🚫 Rechazaste la venta. El bus se mantiene, pero no hay ingreso.");
      }
    },
   {
  texto: "👔 Estás en números rojos. Una opción rápida es despedir personal de la junta directiva para ahorrar costos. ¿Recortar sueldos?",
  si: () => {
    presupuestoVisible += 10000000;
    actualizarPresupuestoHTML();
    alert("📉 Recortaste personal y recuperaste $10 millones. El club sigue, aunque con menos apoyo administrativo.");
  },
  no: () => {
    alertaPresupuestoSinResolver = true;
    alert("⚠️ No resolviste el déficit. Esto puede traer problemas al club en el futuro...");
  }
}
  ];

  // Elegir una aleatoria
  const pregunta = preguntasCrisis[Math.floor(Math.random() * preguntasCrisis.length)];
  const confirmar = confirm(pregunta.texto);
  if (confirmar) pregunta.si();
  else pregunta.no();
}
