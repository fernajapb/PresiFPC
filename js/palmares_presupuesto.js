
//PALMARES
let palmaresEquipos = {
  "Nacional": { ligas: 18, copas: 7, superligas:4 },
  "Millonarios": { ligas: 16, copas: 3, superligas:2 },
  "América": { ligas: 15, copas: 0, superligas:0},
  "Cali": { ligas: 10, copas: 1, superligas:1 },
  "Junior": { ligas: 10, copas: 2, superligas:2 },
  "Santa Fe": { ligas: 10, copas: 2, superligas:4 },
  "Tolima": { ligas: 3, copas: 1, superligas:1 },
  "Medellín": { ligas: 6, copas: 3, superligas:0},
  "Once Caldas": { ligas: 4, copas: 1 , superligas:0},
  "Pereira": { ligas: 1, copas: 0 , superligas:0},
  "Bucaramanga": { ligas: 1, copas: 0 , superligas:0},
  "Alianza": { ligas: 0, copas: 0 , superligas:0},
  "La Equidad": { ligas: 0, copas: 1, superligas:0 },
  "Pasto": { ligas: 1, copas: 0 , superligas:0},
  "Envigado": { ligas: 0, copas: 0 , superligas:0},
  "Chico": { ligas: 1, copas: 0 , superligas:0},
  "Águilas": { ligas: 0, copas: 0 , superligas:0},
  "Fortaleza": { ligas: 0, copas: 0 , superligas:0},
  "Llaneros": { ligas: 0, copas: 0 , superligas:0},
  "Union M.": { ligas: 1, copas: 0 , superligas:0},
  "Cucuta": { ligas: 1, copas: 0 , superligas:0},
  "Quindio": { ligas: 1, copas: 0 , superligas:0},
  "Boca Jrs. cali": { ligas: 0, copas: 1, superligas:0 }
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

function mostrarPalmares() {
  const contenedor = document.getElementById("palmares");
  if (!contenedor) return; // seguridad, por si no existe
  contenedor.innerHTML = ""; // limpiar antes

  let equiposOrdenados = Object.entries(palmaresEquipos)
    .map(([nombre, { ligas, copas, superligas }]) => ({
      nombre,
      ligas,
      copas,
      superligas,
      total: ligas + copas + (superligas || 0)
    }))
    .sort((a, b) => b.total - a.total || b.ligas - a.ligas);

  let html = `<h2>🏆 Palmarés Histórico</h2>`;

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
          <img src="trofeos/liga.png"  alt="Liga"      class="icono-trofeo"> <span>${equipo.ligas}</span>
          <img src="trofeos/copa.png"  alt="Copa"      class="icono-trofeo"> <span>${equipo.copas}</span>
          <img src="trofeos/super.png" alt="Superliga" class="icono-trofeo"> <span>${equipo.superligas}</span>
        </div>
      </div>
    `;
  });

  contenedor.innerHTML = html;
}



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
    const valor = presupuestoVisible.toLocaleString();
    elemento.textContent = `Presupuesto: $${valor}`;

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




// --- FUNCIÓN VENTA DE CAMISETAS SEGÚN EL EQUIPO DEL USUARIO ---
/*
function venderCamisetas() {
  if (!equipoUsuario) {
    alert("Primero debes seleccionar un equipo.");
    return;
  }

  const fuerza = obtenerFuerzaEquipo(equipoUsuario);
  if (!fuerza) {
    alert("El equipo no tiene fuerza definida.");
    return;
  }

  // 🚫 Si el equipo es menor a 60 de fuerza, no vende camisetas
  if (fuerza < 60) {
    alert(`${equipoUsuario} no genera ventas de camisetas (poca hinchada).`);
    return;
  }

  // ✅ Fórmula de ventas
  // Base proporcional a la fuerza, amplificada con potencia para marcar diferencia
  let factorAleatorio = (Math.random() * 0.6) + 0.7; // entre 0.7 y 1.3
  let ventas = Math.floor(((fuerza - 59) ** 2) * factorAleatorio * 1200);

  // Sumar al presupuesto
  sumarPresupuesto(ventas);

  // Mostrar mensaje
  alert(`${equipoUsuario} vendió camisetas por $${ventas.toLocaleString()}`);
}
*/

// --- FUNCIÓN VENTA DE CAMISETAS SEGÚN EL EQUIPO DEL USUARIO ---
function venderCamisetas() {
  const contenedor = document.getElementById("ventaCamisetasContainer");
  contenedor.innerHTML = ""; // limpia la tarjeta anterior

  if (!equipoUsuario) {
    mostrarMensaje("Primero debes seleccionar un equipo.", "error");
    return;
  }

  const fuerza = obtenerFuerzaEquipo(equipoUsuario);
  if (!fuerza) {
    mostrarMensaje("El equipo no tiene fuerza definida.", "error");
    return;
  }

  if (fuerza < 60) {
    mostrarMensaje(`${equipoUsuario} no genera ventas de camisetas (poca hinchada).`, "error");
    return;
  }

  // --- Escalamos las ventas base según la fuerza ---
  // De 90,000 (fuerza 60) a 1,000,000 (fuerza 80+)
  const minFuerza = 60;
  const maxFuerza = 80;
  const fuerzaNormalizada = Math.min(Math.max(fuerza, minFuerza), maxFuerza);
  const porcentaje = (fuerzaNormalizada - minFuerza) / (maxFuerza - minFuerza);
  const ventasTotales = Math.floor(90000 + porcentaje * (1000000 - 90000));

  // --- Precio dinámico ---
  const precioCamiseta = Math.floor(Math.random() * (120000 - 80000) + 80000);

  // --- Cantidad vendida (más realista) ---
  // Club fuerte = más hinchas = más camisetas
  // Exponencial leve para que los grandes vendan MUCHO más
  const cantidadVendida = Math.floor((fuerza ** 2) / 6 + Math.random() * 300);

  // --- Total recaudado ---
  const totalRecaudado = Math.min(ventasTotales, cantidadVendida * precioCamiseta);

  // --- Sumar al presupuesto ---
  sumarPresupuesto(totalRecaudado);

  // --- Mostrar tarjeta ---
  mostrarTarjetaVenta(equipoUsuario, cantidadVendida, precioCamiseta, totalRecaudado);
}

function mostrarTarjetaVenta(equipo, cantidad, precioCamiseta, totalVentas) {
  const contenedor = document.getElementById("ventaCamisetasContainer");

  const nombreNormalizado = equipo
  .toLowerCase()
  .replace(/\s+/g, "_")
  .replace(/[áéíóú]/g, (m) => ({ á: "a", é: "e", í: "i", ó: "o", ú: "u" }[m]));

  const logoPath = `escudos/${nombreNormalizado}.png`;

  const tarjetaHTML = `
    <div class="tarjeta-venta">
      <h2>🛍️ Venta de Camisetas</h2>
      <img src="${logoPath}" alt="${equipo}" class="logo-equipo">
      <h3>${equipo}</h3>
      <p><strong>Precio por camiseta:</strong> $${precioCamiseta.toLocaleString()}</p>
      <p><strong>Cantidad vendida:</strong> ${cantidad.toLocaleString()} unidades</p>
      <p><strong>Total recaudado:</strong> $${totalVentas.toLocaleString()}</p>
    </div>
  `;

  contenedor.innerHTML = tarjetaHTML;
}

function mostrarMensaje(texto, tipo = "info") {
  const contenedor = document.getElementById("ventaCamisetasContainer");
  const color = tipo === "error" ? "#ff4444" : "#0066ff";
  contenedor.innerHTML = `<div class="mensaje" style="color:${color};padding:8px;">${texto}</div>`;
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
