function actualizarHistorial() {
  const lista = document.getElementById("listaHistorial");
  lista.innerHTML = "";

  campeones.forEach(c => {
    // Extraemos el nombre del campe贸n
    const partes = c.split(": ");
    const temporada = partes[0];
    const nombreCampeon = partes[1];
    /*
    const nombreLimpio = nombreCampeon.toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/ /g, "_");

    const escudo = `<img src="escudos/${nombreLimpio}.png" alt="${nombreCampeon}" class="escudo">`;
    */
    
    const escudo = `<img src="${getEscudoEquipo(nombreCampeon)}" 
      onerror="this.src='escudos/default.png'" 
      class="escudo">`;

    const li = document.createElement("li");
    li.innerHTML = `${temporada}: ${escudo} ${nombreCampeon}`;
    lista.appendChild(li);
  });
}

// 📜 Historial Copa Colombia
function actualizarHistorialCopa() {
  const lista = document.getElementById("listaHistorialcopa");
  lista.innerHTML = "";

  campeonesCopaColombia.forEach(c => {
    /*
    const nombreLimpio = c.nombre.toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/ /g, "_");

    const escudo = `<img src="escudos/${nombreLimpio}.png" alt="${c.nombre}" class="escudo">`;
    */
    const escudo = `<img src="${getEscudoEquipo(c.nombre)}" 
      onerror="this.src='escudos/default.png'" 
      class="escudo">`;

    const li = document.createElement("li");
    li.innerHTML = `${c.temporada}: ${escudo} ${c.nombre}`;
    lista.appendChild(li);
  });
}

// 📜 Historial Superliga
function actualizarHistorialSuperliga() {
  const lista = document.getElementById("listaHistorialsuper");
  lista.innerHTML = "";

  campeonesSuperliga.forEach(c => {
    /*
    const nombreLimpio = c.nombre.toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/ /g, "_");

    const escudo = `<img src="escudos/${nombreLimpio}.png" alt="${c.nombre}" class="escudo">`;
    */
    const escudo = `<img src="${getEscudoEquipo(c.nombre)}" 
      onerror="this.src='escudos/default.png'" 
      class="escudo">`;

    const li = document.createElement("li");
    li.innerHTML = `${c.temporada}: ${escudo} ${c.nombre}`;
    lista.appendChild(li);
  });
}

// ==========================
// 📜 HISTORIAL PRIMERA B
// ==========================
function actualizarHistorialB() {
  const lista = document.getElementById("listaHistorialB");
  lista.innerHTML = "";

  // Unimos todas las temporadas que tengan campeones en I o II
  const temporadas = new Set([
    ...Object.keys(campeonB1S),
    ...Object.keys(campeonB2S)
  ]);

  // Ordenamos las temporadas de menor a mayor
  const ordenadas = Array.from(temporadas).sort((a, b) => a - b);

  ordenadas.forEach(temp => {
    const campeon1 = campeonB1S[temp];
    const campeon2 = campeonB2S[temp];

    if (campeon1) {
      /*
      const nombreLimpio = campeon1.toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/ /g, "_");
      const escudo = `<img src="escudos/${nombreLimpio}.png" alt="${campeon1}" class="escudo">`;
      */

      const escudo = `<img src="${getEscudoEquipo(campeon1)}" 
       onerror="this.src='escudos/default.png'" 
       class="escudo">`;

      const li = document.createElement("li");
      li.innerHTML = `🏆 ${temp}-I: ${escudo} ${campeon1}`;
      lista.appendChild(li);
    }

    if (campeon2) {
      /*
      const nombreLimpio = campeon2.toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/ /g, "_");
      const escudo = `<img src="escudos/${nombreLimpio}.png" alt="${campeon2}" class="escudo">`;
      */
      
      const escudo = `<img src="${getEscudoEquipo(campeon2)}" 
       onerror="this.src='escudos/default.png'" 
       class="escudo">`;

      const li = document.createElement("li");
      li.innerHTML = `🏆 ${temp}-II: ${escudo} ${campeon2}`;
      lista.appendChild(li);
    }
  });
}


function descargarTodo() {

  let contenido = `=== TITULOS COMO PRESIDENTE ===
LIGA: ${ligasGanadasPorUsuario}
COPA: ${copasGanadasPorUsuario}
SUPERLIGA: ${superligasGanadasPorUsuario}
==============================

`;

  // ==========================
  // 📜 HISTORIAL LIGA
  // ==========================
  contenido += "=== HISTORIAL LIGA ===\n";

  campeones.forEach(c => {
    contenido += c + "\n"; // ya viene tipo "2026-I: equipo"
  });

  contenido += "\n";

  // ==========================
  // 📜 HISTORIAL COPA
  // ==========================
  contenido += "=== HISTORIAL COPA ===\n";

  campeonesCopaColombia.forEach(c => {
    contenido += `${c.temporada}: ${c.nombre}\n`;
  });

  contenido += "\n";

  // ==========================
  // 📜 HISTORIAL SUPERLIGA
  // ==========================
  contenido += "=== HISTORIAL SUPERLIGA ===\n";

  campeonesSuperliga.forEach(c => {
    contenido += `${c.temporada}: ${c.nombre}\n`;
  });

  contenido += "\n";

  // ==========================
  // 📜 HISTORIAL TORNEO (PRIMERA B)
  // ==========================
  contenido += "=== HISTORIAL TORNEO ===\n";

  const temporadas = new Set([
    ...Object.keys(campeonB1S),
    ...Object.keys(campeonB2S)
  ]);

  const ordenadas = Array.from(temporadas).sort((a, b) => a - b);

  ordenadas.forEach(temp => {
    if (campeonB1S[temp]) {
      contenido += `${temp}-I: ${campeonB1S[temp]}\n`;
    }
    if (campeonB2S[temp]) {
      contenido += `${temp}-II: ${campeonB2S[temp]}\n`;
    }
  });

  // ==========================
  // 📥 DESCARGA
  // ==========================
  const blob = new Blob([contenido], { type: 'text/plain' });

  const enlace = document.createElement('a');
  enlace.href = URL.createObjectURL(blob);
  enlace.download = "historial_completo.txt";

  enlace.click();

  URL.revokeObjectURL(enlace.href);
}
