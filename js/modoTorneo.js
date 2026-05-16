// ==========================================
// ⚽ SIMULAR PARTIDO TORNEO
// ==========================================

function simularPartidoTorneo(equipoA, equipoB){

  // buscar fuerza equipo A
  const datosA =
    [...equiposPrimera, ...equiposSegunda]
    .find(e => e.nombre === equipoA);

  // buscar fuerza equipo B
  const datosB =
    [...equiposPrimera, ...equiposSegunda]
    .find(e => e.nombre === equipoB);

  const fuerzaA =
    datosA?.fuerza || 60;

  const fuerzaB =
    datosB?.fuerza || 60;

  // diferencia de nivel
  const diferencia =
    (fuerzaA - fuerzaB) / 10;

  // generar goles
  let golesA =
    Math.round(
      Math.random()*2 +
      diferencia +
      (Math.random()*1.5)
    );

  let golesB =
    Math.round(
      Math.random()*2 -
      diferencia +
      (Math.random()*1.5)
    );

  golesA = Math.max(0,golesA);
  golesB = Math.max(0,golesB);

  // puntos
  let puntosA = 0;
  let puntosB = 0;

  if(golesA > golesB){
    puntosA = 3;

  }
  else if(golesB > golesA){
    puntosB = 3;
  }
  else{
    puntosA = 1;
    puntosB = 1;
  }

  return{
    golesA,
    golesB,
    puntosA,
    puntosB
  };
}


// ==========================================
// 🏆 DATOS
// ==========================================

let torneo = {
  formato: "grupos",
  equipos: [],
  tabla: [],
  calendario: [],
  fechaActual: 0,
  rondaActual: 0
};

// ==========================================
// MOSTRAR PANEL
// ==========================================

function mostrarConfigTorneo(){

  const panel =
    document.getElementById("configTorneo");

  panel.style.display =
    panel.style.display === "none"
    ? "block"
    : "none";

  actualizarOpcionesFormato();
}

// ==========================================
// CAMBIAR OPCIONES
// ==========================================

function actualizarOpcionesFormato(){

  const formato =
    document.getElementById("formatoTorneo").value;

  const select =
    document.getElementById("cantidadEquipos");

  select.innerHTML = "";

  let opciones = [];

  if(formato === "grupos"){

    opciones = [4,6,8,10];

  }else{

    opciones = [2,4,8,16];
  }

  opciones.forEach(num => {

    select.innerHTML += `
      <option value="${num}">
        ${num} equipos
      </option>
    `;
  });

  mostrarSelectorEquipos();
}

// ==========================================
// MOSTRAR EQUIPOS
// ==========================================

function mostrarSelectorEquipos(){

  const cantidad =
    parseInt(
      document.getElementById("cantidadEquipos").value
    );

  const contenedor =
    document.getElementById("listaEquiposT");

  contenedor.innerHTML = "";

  const todos = [...equiposPrimera, ...equiposSegunda];

  todos.forEach(eq => {

    contenedor.innerHTML += `

      <div class="itemEquipo">

        <input type="checkbox"
               value="${eq.nombre}"
               onchange="limitarEquipos()">

        <span>
          ${eq.nombre}
        </span>

      </div>
    `;
  });

  limitarEquipos();
}

// ==========================================
// LIMITAR SELECCIÓN
// ==========================================

function limitarEquipos(){

  const cantidad =
    parseInt(
      document.getElementById("cantidadEquipos").value
    );

  const checks =
    document.querySelectorAll(
      "#listaEquiposT input[type='checkbox']"
    );

  let seleccionados = 0;

  checks.forEach(c => {

    if(c.checked){
      seleccionados++;
    }
  });

  checks.forEach(c => {

    if(!c.checked){

      c.disabled =
        seleccionados >= cantidad;
    }
  });
}

// ==========================================
// CREAR TORNEO
// ==========================================

function crearModoTorneo(){

  const formato =
    document.getElementById("formatoTorneo").value;

  const checks =
    document.querySelectorAll(
      "#listaEquiposT input:checked"
    );

  const equiposElegidos =
    Array.from(checks).map(c => c.value);

  const cantidad =
    parseInt(
      document.getElementById("cantidadEquipos").value
    );

  if(equiposElegidos.length !== cantidad){

    alert(
      `Debes elegir ${cantidad} equipos`
    );

    return;
  }

  torneo.formato = formato;

  torneo.equipos = equiposElegidos;

  torneo.fechaActual = 0;

  torneo.rondaActual = 0;

  // ======================================
  // GRUPOS
  // ======================================

  if(formato === "grupos"){

    torneo.tabla = equiposElegidos.map(eq => ({

      nombre:eq,
      pts:0,
      gf:0,
      gc:0,
      pj:0
    }));

    torneo.calendario =
      generarFixture(equiposElegidos);

    mostrarTablaTorneo();
  }

  // ======================================
  // MATA MATA
  // ======================================

  else{

    torneo.calendario =
      generarMataMata(equiposElegidos);

    document.getElementById(
      "tablaTorneo"
    ).innerHTML = "";
  }

  document.getElementById(
    "resultadosTorneo"
  ).innerHTML = "";

  document.getElementById(
    "infoTorneo"
  ).innerHTML = `

    <h2>
      Torneo creado
    </h2>

  `;
}

// ==========================================
// FIXTURE GRUPOS
// ==========================================

function generarFixture(equipos){

  let fixture = [];

  let lista = [...equipos];

  if(lista.length % 2 !== 0){

    lista.push("DESCANSA");
  }

  const total =
    lista.length - 1;

  const mitad =
    lista.length / 2;

  for(let fecha=0; fecha<total; fecha++){

    let partidos = [];

    for(let i=0; i<mitad; i++){

      const local = lista[i];

      const visita =
        lista[lista.length -1 - i];

      if(local !== "DESCANSA" &&
         visita !== "DESCANSA"){

        partidos.push([
          local,
          visita
        ]);
      }
    }

    fixture.push(partidos);

    let fijo = lista[0];

    let rotan = lista.slice(1);

    rotan.unshift(rotan.pop());

    lista = [fijo, ...rotan];
  }

  // vuelta
  let vuelta = fixture.map(f => {

    return f.map(p => [

      p[1],
      p[0]

    ]);
  });

  return [...fixture, ...vuelta];
}

// ==========================================
// GENERAR MATA MATA
// ==========================================

function generarMataMata(equipos){

  let mezcla = [...equipos];

  mezcla.sort(() =>
    Math.random() - 0.5
  );

  let cruces = [];

  for(let i=0; i<mezcla.length; i+=2){

    cruces.push([
      mezcla[i],
      mezcla[i+1]
    ]);
  }

  return [cruces];
}

// ==========================================
// SIMULAR
// ==========================================

function simularFechaTorneo(){

  // ======================================
  // GRUPOS
  // ======================================

  if(torneo.formato === "grupos"){

    if(torneo.fechaActual >=
       torneo.calendario.length){

      finalizarTorneo();
      return;
    }

    const fecha =
      torneo.calendario[torneo.fechaActual];

    let html = `
      <h3>
        📅 Fecha
        ${torneo.fechaActual + 1}
      </h3>
    `;

    fecha.forEach(partido => {

      const [local, visita] = partido;

      const r =
      simularPartidoTorneo(local, visita);

      html += `
        <div class="resultado-partido">

          <p> ${local}: <b>${r.golesA}</b> </p>
          <p> ${visita}: <b>${r.golesB}</b> </p>


        </div>
      `;

      actualizarTabla(
        local,
        visita,
        r.golesA,
        r.golesB,
        r.puntosA,
        r.puntosB
      );
    });

    document.getElementById(
      "resultadosTorneo"
    ).innerHTML = html;

    torneo.fechaActual++;

    mostrarTablaTorneo();

    if(torneo.fechaActual >=
       torneo.calendario.length){

      finalizarTorneo();
    }
  }

  // ======================================
  // MATA MATA
  // ======================================

  else{

    simularMataMata();
  }
}

// ==========================================
// TABLA
// ==========================================

function actualizarTabla(
  A,B,gA,gB,pA,pB
){

  const eqA =
    torneo.tabla.find(t=>t.nombre===A);

  const eqB =
    torneo.tabla.find(t=>t.nombre===B);

  eqA.pts += pA;
  eqB.pts += pB;

  eqA.gf += gA;
  eqA.gc += gB;

  eqB.gf += gB;
  eqB.gc += gA;

  eqA.pj++;
  eqB.pj++;

  torneo.tabla.sort((a,b)=>{

    if(b.pts !== a.pts){

      return b.pts - a.pts;
    }

    return (
      (b.gf-b.gc)
      -
      (a.gf-a.gc)
    );
  });
}

// ==========================================
// MOSTRAR TABLA
// ==========================================

function mostrarTablaTorneo(){

  let html = `

    <div class="tablaTorneo">

    <table>

      <tr>

        <th>#</th>

        <th>Equipo</th>

        <th>PTS</th>

        <th>PJ</th>

        <th>DG</th>

      </tr>
  `;

  torneo.tabla.forEach((t,i)=>{

    let clase = "";

    if(i===0){

      clase = "clasificado";
    }

    html += `

      <tr class="${clase}">

        <td>${i+1}</td>

        <td>${t.nombre}</td>

        <td>${t.pts}</td>

        <td>${t.pj}</td>

        <td>${t.gf-t.gc}</td>

      </tr>
    `;
  });

  html += `
    </table>
    </div>
  `;

  document.getElementById(
    "tablaTorneo"
  ).innerHTML = html;
}

// ==========================================
// MATA MATA
// ==========================================

function simularMataMata(){

  const ronda =
    torneo.calendario[torneo.rondaActual];

  let ganadores = [];

  let html = `
    <h3>
      ⚔️ Ronda
      ${torneo.rondaActual + 1}
    </h3>
  `;

  ronda.forEach(cruce => {

    const [A,B] = cruce;

    let r =
    simularPartidoTorneo(A,B);

    // desempate
    while(r.golesA === r.golesB){

      r =
      simularPartidoTorneo(A,B);
    }

    const ganador =
      r.golesA > r.golesB ? A : B;

    ganadores.push(ganador);

    html += `

      <div class="resultado-partido">

         <p>${A}-- <b>${r.golesA}</b> </p>
         <p>${B}-- <b>${r.golesB}</b> </p>

        <br>

        Clasifica:
        <b>${ganador}</b>

      </div>
    `;
  });

  document.getElementById(
    "resultadosTorneo"
  ).innerHTML = html;

  // campeón
  if(ganadores.length === 1){

    document.getElementById(
      "infoTorneo"
    ).innerHTML += `

      <h1>
        🏆 CAMPEÓN:
        ${ganadores[0]}
      </h1>
    `;

    return;
  }

  // siguiente ronda
  let nueva = [];

  for(let i=0; i<ganadores.length; i+=2){

    nueva.push([
      ganadores[i],
      ganadores[i+1]
    ]);
  }

  torneo.calendario.push(nueva);

  torneo.rondaActual++;
}

// ==========================================
// FINAL
// ==========================================

function finalizarTorneo(){

  const campeon =
    torneo.tabla[0];

  document.getElementById(
    "infoTorneo"
  ).innerHTML += `

    <h1>
      Gana: ${campeon.nombre}
    </h1>
  `;
}

// ==========================================
// 🗑 BORRAR TORNEO
// ==========================================

function borrarTorneo(){

  // reiniciar datos
  torneo = {

    formato: "grupos",
    equipos: [],
    tabla: [],
    calendario: [],
    fechaActual: 0,
    rondaActual: 0
  };

  // limpiar paneles
  document.getElementById(
    "infoTorneo"
  ).innerHTML = "";

  document.getElementById(
    "resultadosTorneo"
  ).innerHTML = "";

  document.getElementById(
    "tablaTorneo"
  ).innerHTML = "";

  // desmarcar equipos
  const checks =
    document.querySelectorAll(
      "#listaEquiposT input[type='checkbox']"
    );

  checks.forEach(c => {

    c.checked = false;

    c.disabled = false;
  });

  // ocultar config
  document.getElementById(
    "configTorneo"
  ).style.display = "none";
}

// ==========================================
// INICIO
// ==========================================

actualizarOpcionesFormato();