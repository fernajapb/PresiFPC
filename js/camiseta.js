
const marcasCamisetas = [
  // ===== TOP =====
  { nombre: "Adidas", duracion: 6, nivel: "grande" },
  { nombre: "Nike", duracion: 6, nivel: "grande" },
  { nombre: "Puma", duracion: 5, nivel: "grande" },
  { nombre: "Umbro", duracion: 5, nivel: "grande" },

  // ===== MEDIANAS =====
  { nombre: "Kappa", duracion: 4, nivel: "mediano" },
  { nombre: "Fila", duracion: 4, nivel: "mediano" },
  { nombre: "Reebok", duracion: 4, nivel: "mediano" },
  { nombre: "Hillside", duracion: 3, nivel: "mediano" },

  // ===== CHICAS =====
  { nombre: "Sheffy", duracion: 3, nivel: "chico" },
  { nombre: "Lotto", duracion: 3, nivel: "chico" },
  { nombre: "Boman", duracion: 2, nivel: "chico" },
  { nombre: "Saeta", duracion: 2, nivel: "chico" }
];

let marcaActiva = null;
let semestresRestantesMarca = 0;

let color1 = null;
let color2 = null;
let diseñoElegido = null;
let pasoDiseño = 1;

const coloresDisponibles = {
  Negro: "#000000",
  Blanco: "#ffffff", 
  Rojo: "#d62828",
  Amarillo: "#fcbf49",
  Azul: "#003049",
  Verde: "#2a9d8f",
  Naranja: "#ff9d00",
  VerdeC: "#0fff3b",
  AzulN: "#1334ed",
  Celeste: "#00d0ff",
  Vinotinto: "#722F37",
  Morado: "#8f22f5"
};

const diseños = [
  "solido",
  "difuminado",
  "rayas-verticales",
  "rayas-horizontales",
  "diagonal",
  "franja-central",
  "cuadros"
];

function nivelEquipoParaMarca() {
  const fuerza = obtenerFuerzaTotal(equipoUsuario);

  if (fuerza >= 70) return "grande";
  if (fuerza >= 66) return "mediano";
  if (fuerza >= 60) return "chico";
  return "muy_chico";
}

function mostrarMarcasDisponibles() {
  if (!equipoUsuario) {
    alert("Primero debes elegir un equipo.");
    return;
  }

  if (marcaActiva) {
    alert("Ya tienes una marca activa.");
    return;
  }

  const nivel = nivelEquipoParaMarca();
  if (nivel === "muy_chico") {
    alert("Tu club es muy chico para tener marca oficial.");
    return;
  }

  const cont = document.getElementById("listaMarcas");
  cont.innerHTML = "";

  const disponibles = marcasCamisetas.filter(m => {
    if (nivel === "grande") return true;
    if (nivel === "mediano") return m.nivel !== "grande";
    if (nivel === "chico") return m.nivel === "chico";
  });

  disponibles.forEach(m => {
    const div = document.createElement("div");
    div.className = "marca-card";
    div.innerHTML = `
      <img src="logos/${m.nombre.toLowerCase().replace(/ /g,"_")}.png">
      <strong>${m.nombre}</strong><br>
      Contrato: ${m.duracion} semestres
    `;
    div.onclick = () => contratarMarca(m);
    cont.appendChild(div);
  });
}

/*
function contratarMarca(marca) {
  marcaActiva = marca;
  semestresRestantesMarca = marca.duracion;

  actualizarMarcaActiva();
}
*/

function contratarMarca(marca) {
  marcaActiva = marca;
  semestresRestantesMarca = marca.duracion;

  // ✅ CERRAR LA LISTA VISUALMENTE
  document.getElementById("listaMarcas").innerHTML = "";

  actualizarMarcaActiva();
}


function actualizarMarcaActiva() {
  const cont = document.getElementById("marcaActiva");

  if (!marcaActiva) {
    cont.innerHTML = "No tienes marca de camisetas.";
    document.getElementById("btnDiseñarCamiseta").disabled = true;
    return;
  }

  cont.innerHTML = `
    <div class="marca-activa">
      <img src="logos/${marcaActiva.nombre.toLowerCase().replace(/ /g,"_")}.png">
      <div>
        <strong>${marcaActiva.nombre}</strong><br>
        Contrato activo:
        <span>${semestresRestantesMarca} sem</span>
      </div>
    </div>
  `;

  // 🔓 HABILITA EL MODAL DE DISEÑO
  document.getElementById("btnDiseñarCamiseta").disabled = false;
}

function procesarSemestreMarca() {
  if (!marcaActiva) return;

  semestresRestantesMarca--;

  if (semestresRestantesMarca <= 0) {
    const renovar = confirm(
      `El contrato con ${marcaActiva.nombre} terminó.\n¿Renovar por ${marcaActiva.duracion} semestres?`
    );

    if (renovar) {
      semestresRestantesMarca = marcaActiva.duracion;
    } else {
      marcaActiva = null;
    }
  }

  actualizarMarcaActiva();
}


function abrirModalCamiseta() {
  if (!marcaActiva) {
    alert("Debes tener una marca activa para diseñar camisetas.");
    return;
  }

  pasoDiseño = 1;
  color1 = color2 = diseñoElegido = null;

  document.getElementById("modalCamiseta").style.display = "flex";
  document.getElementById("btnSiguiente").style.display = "inline-block";

  renderPasoDiseño();
}

function siguientePaso() {
  if (!validarPasoDiseño()) return;

  pasoDiseño++;
  renderPasoDiseño();
}

function validarPasoDiseño() {
  if (pasoDiseño === 1 && (!color1 || !color2)) {
    alert("Selecciona dos colores.");
    return false;
  }

  if (pasoDiseño === 2 && !diseñoElegido) {
    alert("Selecciona un diseño.");
    return false;
  }

  return true;
}

function renderPasoDiseño() {
  const cont = document.getElementById("modalPaso");

  if (pasoDiseño === 1) renderPasoColores(cont);
  if (pasoDiseño === 2) renderPasoDiseños(cont);
  if (pasoDiseño === 3) renderPasoFinal(cont);
}

function renderPasoColores(cont) {
  cont.innerHTML = "<h3>Paso 1: Elige dos colores</h3>";
  color1 = color2 = null;

  Object.entries(coloresDisponibles).forEach(([nombre, hex]) => {
    const btn = document.createElement("button");
    btn.classList.add("button-color");
    btn.textContent = nombre;
    btn.style.background = hex;
    btn.style.color = "#fff";

    btn.onclick = () => {
      if (!color1) color1 = hex;
      else if (!color2 && hex !== color1) color2 = hex;
      btn.classList.add("activo");
    };

    cont.appendChild(btn);
  });
}

function mezclarArray(array) {
  const copia = [...array];
  for (let i = copia.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copia[i], copia[j]] = [copia[j], copia[i]];
  }
  return copia;
}

function renderPasoDiseños(cont) {
  cont.innerHTML = "<h3>Paso 2: Elige un diseño</h3>";

  const diseñosUnicos = mezclarArray(diseños).slice(0, 4);

  diseñosUnicos.forEach(tipo => {
    const div = document.createElement("div");
    div.className = `camiseta ${tipo}`;
    div.style.setProperty("--c1", color1);
    div.style.setProperty("--c2", color2);

    div.onclick = () => {
      diseñoElegido = tipo;
      document.querySelectorAll(".camiseta").forEach(c => c.classList.remove("activo"));
      div.classList.add("activo");
    };

    cont.appendChild(div);
  });
}

function renderPasoFinal(cont) {
  cont.innerHTML = `
    <h3>Diseño final</h3>
    <div class="camiseta grande ${diseñoElegido}"
         style="--c1:${color1}; --c2:${color2}">
      <img src="logos/${marcaActiva.nombre.toLowerCase().replace(/ /g,"_")}.png"
           class="logo">
    </div>
  `;

  document.getElementById("btnSiguiente").style.display = "none";

  mostrarCamisetaEnPantalla();

  // cerrar modal automáticamente
  setTimeout(() => {
    document.getElementById("modalCamiseta").style.display = "none";
  }, 500);
}

function normalizarNombre(nombre) {
  return nombre
    .toLowerCase()
    .replace(/\s+/g, "_")
    .replace(/[áéíóú]/g, l => ({
      á: "a", é: "e", í: "i", ó: "o", ú: "u"
    })[l]);
}

function mostrarCamisetaEnPantalla() {
  const cont = document.getElementById("resultadoCamiseta");

  const escudoEquipo = `escudos/${normalizarNombre(equipoUsuario)}.png`;
  const logoMarca = `logos/${marcaActiva.nombre.toLowerCase().replace(/ /g,"_")}.png`;

  cont.innerHTML = `
    <h2>Camiseta oficial</h2>

    <div class="camiseta grande ${diseñoElegido}"
         style="--c1:${color1}; --c2:${color2}">
      
      <!-- ESCUDO DEL EQUIPO -->
      <img src="${escudoEquipo}" class="escudo-equipo">

      <!-- LOGO DE LA MARCA -->
      <img src="${logoMarca}" class="logo">
    </div>

    <p><strong>Equipo:</strong> ${equipoUsuario}</p>
    <p><strong>Marca:</strong> ${marcaActiva.nombre}</p>
  `;
}


/*
function mostrarCamisetaEnPantalla() {
  const cont = document.getElementById("resultadoCamiseta");

  cont.innerHTML = `
    <h2>Camiseta oficial</h2>
    <div class="camiseta grande ${diseñoElegido}"
         style="--c1:${color1}; --c2:${color2}">
      <img src="logos/${marcaActiva.nombre.toLowerCase().replace(/ /g,"_")}.png"
           class="logo">


    </div>
    <p><strong>Marca:</strong> ${marcaActiva.nombre}</p>
  `;
}
*/

function cerrarModalCamiseta() {
  document.getElementById("modalCamiseta").style.display = "none";
}