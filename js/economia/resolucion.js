

/*===Resoluciones===*/

function activarResolucion() {

  const titulo = document.getElementById("tituloResolucion");
  const detalle = document.getElementById("detalleResolucion");
  const contenedor = document.getElementById("contenedorResolucion");

  const sanciones = [
    { texto: "Lenguaje ofensivo del cuerpo técnico al cuarto árbitro, generando protestas reiteradas y alteración del orden en el área técnica. -800k", monto: 800000 },
    { texto: "Lenguaje ofensivo del cuerpo técnico al juez central, incluyendo reclamos airados y conducta antideportiva directa hacia la autoridad principal. -1M", monto: 1000000 },
    { texto: "El equipo recibió 5 amonestaciones en un mismo partido, reflejando indisciplina colectiva grave. -700k", monto: 700000 },
    { texto: "El equipo recibió 4 amonestaciones en un mismo partido, mostrando reiteradas faltas al reglamento. -500k", monto: 500000 },
    { texto: "El equipo recibió 3 amonestaciones en un mismo partido, evidenciando juego brusco reiterado. -300k", monto: 300000 },

    { texto: "Los hinchas invadieron el campo de juego durante el partido, comprometiendo la seguridad del evento. -2M", monto: 2000000 },
    { texto: "Un sector de la hinchada lanzó botellas y objetos al campo de juego, poniendo en riesgo a jugadores y árbitros. -1.5M", monto: 1500000 },
    { texto: "Un sector de la hinchada agredió al personal de televisión encargado de la transmisión oficial del partido. -2.5M", monto: 2500000 },
    { texto: "Se registró uso de pólvora en las tribunas, incumpliendo las normas de seguridad del estadio. -1.2M", monto: 1200000 },
    { texto: "Se presentaron cánticos discriminatorios por parte de la hinchada, afectando la imagen institucional del club. -1.8M", monto: 1800000 },

    { texto: "Retraso del equipo en la salida al segundo tiempo del partido. -500k", monto: 500000 },
    { texto: "El cuerpo técnico fue expulsado por protestas reiteradas y conducta antideportiva. -900k", monto: 900000 },
    { texto: "Intento de agresión a la terna arbitral tras una decisión disciplinaria. -3M", monto: 3000000 },
    { texto: "Agresión física comprobada contra un miembro de la terna arbitral. -5M", monto: 5000000 },
    { texto: "El partido fue suspendido por disturbios generados por la hinchada local. -4M", monto: 4000000 },

    { texto: "Ingreso de objetos contundentes prohibidos al estadio por parte de la hinchada local. -1.1M", monto: 1100000 }, // normal
    { texto: "Daños materiales significativos en el estadio ocasionados por la hinchada tras un partido. -2.8M", monto: 2800000 }, // medio-alta
    { texto: "Retraso menor en la entrega de planillas y documentación oficial del partido. -200k", monto: 200000 }, // leve
    { texto: "Incumplimiento parcial de medidas de seguridad exigidas por la liga para el encuentro. -1.6M", monto: 1600000 }, // medio
    { texto: "Abandono del terreno de juego por parte del equipo en señal de protesta antes de finalizar el partido. -6M", monto: 6000000 } // más grave

  ];


  const probabilidad = Math.random();
  const numeroResolucion = Math.floor(Math.random() * 90 + 10);

  if (probabilidad < 0.5) {

    // 🟢 SIN SANCIÓN
    titulo.textContent = "COMUNICADO OFICIAL";

    detalle.innerHTML = `
    El Comité Disciplinario del Campeonato Profesional informa que,
    revisados los informes arbitrales y de comisaría de campo,
    no se encontraron méritos para la apertura de proceso disciplinario.

    En consecuencia, no se imponen sanciones al club en la presente fecha.
    `;

    contenedor.classList.remove("resolucion-activa");

  } else {

    // 🔴 CON SANCIÓN
    const sancion = sanciones[Math.floor(Math.random() * sanciones.length)];

    titulo.textContent = `RESOLUCIÓN No. ${numeroResolucion} de ${temporadaActual} `;

    detalle.innerHTML = `
    El Comité Disciplinario del Campeonato Profesional,
    en uso de sus facultades legales y reglamentarias,

    <br><br><strong>PROCEDE A RESOLVER:</strong><br><br>

    ${sancion.texto}

    <br><br>
    Se impone multa económica por valor de 
    <strong>$${sancion.monto.toLocaleString()}</strong>.
    `;

    restarPresupuesto(sancion.monto);

    contenedor.classList.add("resolucion-activa");
  }

  contenedor.style.display = "block";
}
