function actualizarHistorial() {
  const lista = document.getElementById("listaHistorial");
  lista.innerHTML = "";

  campeones.forEach(c => {
    // Extraemos el nombre del campe贸n
    const partes = c.split(": ");
    const temporada = partes[0];
    const nombreCampeon = partes[1];

    const nombreLimpio = nombreCampeon.toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/ /g, "_");

    const escudo = `<img src="escudos/${nombreLimpio}.png" alt="${nombreCampeon}" class="escudo">`;

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
    const nombreLimpio = c.nombre.toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/ /g, "_");

    const escudo = `<img src="escudos/${nombreLimpio}.png" alt="${c.nombre}" class="escudo">`;

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
    const nombreLimpio = c.nombre.toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/ /g, "_");

    const escudo = `<img src="escudos/${nombreLimpio}.png" alt="${c.nombre}" class="escudo">`;

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
      const nombreLimpio = campeon1.toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/ /g, "_");
      const escudo = `<img src="escudos/${nombreLimpio}.png" alt="${campeon1}" class="escudo">`;

      const li = document.createElement("li");
      li.innerHTML = `🏆 ${temp}-I: ${escudo} ${campeon1}`;
      lista.appendChild(li);
    }

    if (campeon2) {
      const nombreLimpio = campeon2.toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/ /g, "_");
      const escudo = `<img src="escudos/${nombreLimpio}.png" alt="${campeon2}" class="escudo">`;

      const li = document.createElement("li");
      li.innerHTML = `🏆 ${temp}-II: ${escudo} ${campeon2}`;
      lista.appendChild(li);
    }
  });
}
