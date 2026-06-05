

let actividadSemestreUsada = false;


function actividadPrimerSemestre() {
  if (actividadSemestreUsada) {
    agregarNotificacion("🏁 Pretemporada finalizada. Disponible nuevamente el próximo semestre.");
    return;
  }

  actividadSemestreUsada = true;

  const pregunta =
    preguntasPrimerSemestre[
      Math.floor(Math.random() * preguntasPrimerSemestre.length)
    ];

  document.getElementById("textoPregunta").innerText = pregunta.texto;
  document.getElementById("buzonPregunta").style.display = "flex";

  document.getElementById("btnAceptar").onclick = () => {
    pregunta.si();
    document.getElementById("buzonPregunta").style.display = "none";
  };

  document.getElementById("btnCancelar").onclick = () => {
    pregunta.no();
    document.getElementById("buzonPregunta").style.display = "none";
  };
}



function golesAleatorios() {
  const r = Math.random();

  if (r < 0.15) return 0;
  if (r < 0.45) return 1;
  if (r < 0.70) return 2;
  if (r < 0.85) return 3;
  if (r < 0.93) return 4;
  if (r < 0.97) return 5;
  if (r < 0.99) return 6;

  return 7;
}




const preguntasPrimerSemestre = [

  {
    texto: "📋 Semana tranquila sin novedades. ¿Deseas continuar normalmente?",
    si: () => {
      if (Math.random() < 0.6) {
        agregarNotificacion("📋 La semana transcurre sin eventos relevantes.");
      } else {
        agregarNotificacion("📋 Se detectan pequeños ajustes internos, sin impacto deportivo.");
      }
    },
    no: () => {
      agregarNotificacion("📋 El cuerpo técnico decide no realizar cambios.");
    }
  },

  {
    texto: "🏋️ Bloque intenso de entrenamiento. ¿Implementarlo?",
    si: () => {
      const plantilla = plantillasJugadores[equipoUsuario];
      const beneficiado =
        plantilla[Math.floor(Math.random() * plantilla.length)];

      beneficiado.media += 2;

      agregarNotificacion(`🏋️ ${beneficiado.nombre} destaca en entrenamientos. Gana +2 de media.`);
    },
    no: () => {
      
      agregarNotificacion("📋 Se mantiene la planificación habitual.");
    }
  },

  {
    texto: "🚨 Conflicto interno con un jugador. ¿Sancionar?",
    si: () => {
      const plantilla = plantillasJugadores[equipoUsuario];
      const sancionado =
        plantilla[Math.floor(Math.random() * plantilla.length)];

      sancionado.media = Math.max(1, sancionado.media - 2);

      agregarNotificacion(`🚨 ${sancionado.nombre} es sancionado. Pierde -2 de media.`);
    },
    no: () => {
      
      agregarNotificacion("🤝 El caso se resuelve puertas adentro.");
    }
  },

  {
    texto: "🧪 Pruebas tácticas experimentales. ¿Arriesgar?",
    si: () => {
      const plantilla = plantillasJugadores[equipoUsuario];
      const jugador =
        plantilla[Math.floor(Math.random() * plantilla.length)];

      if (Math.random() < 0.5) {
        jugador.media += 2;
        agregarNotificacion(`🧪 ${jugador.nombre} se adapta perfecto. Gana +2 de media.`);
      } else {
        jugador.media = Math.max(1, jugador.media - 1);
        agregarNotificacion(`🧪 ${jugador.nombre} no rinde bien. Pierde -1 de media.`);
      }
    },
    no: () => {
      agregarNotificacion("📋 Se descartan las pruebas tácticas.");
    }
  },

{
  texto: "🇦🇷 Pretemporada en Argentina ¿Aceptar?",
  si: () => {
    const equipos = [
      "River Plate", "Boca Juniors", "Racing", "Independiente",
      "San Lorenzo", "Estudiantes", "Vélez", "Rosario Central"
    ];
    const [rivalA, rivalB] = equipos.sort(() => Math.random() - 0.5).slice(0, 2);

    const g1 = golesAleatorios();
    const r1 = golesAleatorios();
    const g2 = golesAleatorios();
    const r2 = golesAleatorios();

    let victorias = 0;
    if (g1 > r1) victorias++;
    if (g2 > r2) victorias++;

    const plantilla = plantillasJugadores[equipoUsuario];
    let efecto = "";

    if (victorias === 2) {
      plantilla.forEach(j => j.media += 1);
      efecto = "🔥 Los jugadores están motivados. +1 de media para toda la plantilla.";
    } else if (victorias === 0) {
      plantilla.forEach(j => j.media = Math.max(1, j.media - 2));
      efecto = "😞 Los jugadores pierden confianza. -2 de media para toda la plantilla.";
    } else {
      const jugador = plantilla[Math.floor(Math.random() * plantilla.length)];
      if (Math.random() < 0.5) {
        jugador.media = Math.max(1, jugador.media - 1);
        efecto = `😓 Fatiga acumulada: ${jugador.nombre} pierde -1 de media.`;
      } else {
        jugador.media += 1;
        efecto = `🔥 Buen rendimiento: ${jugador.nombre} gana +1 de media.`;
      }
    }

    sumarPresupuesto(3000000);

    agregarNotificacion(
      `🇦🇷 Gira en Argentina\n
${equipoUsuario} ${g1} - ${r1} ${rivalA}\n
${equipoUsuario} ${g2} - ${r2} ${rivalB}\n
${efecto}\n
💵 Ingresan $3M`
    );
  },
  no: () => {
    agregarNotificacion("Se cancela la gira por Argentina.");
  }
},

{
  texto: "🇲🇽 Pretemporada en México ¿Aceptar?",
  si: () => {
    const equipos = [
      "América", "Chivas", "Cruz Azul", "Pumas",
      "Tigres", "Monterrey", "Toluca", "Santos Laguna"
    ];
    const [rivalA, rivalB] = equipos.sort(() => Math.random() - 0.5).slice(0, 2);

    const g1 = golesAleatorios();
    const r1 = golesAleatorios();
    const g2 = golesAleatorios();
    const r2 = golesAleatorios();

    let victorias = 0;
    if (g1 > r1) victorias++;
    if (g2 > r2) victorias++;

    const plantilla = plantillasJugadores[equipoUsuario];
    let efecto = "";

    if (victorias === 2) {
      plantilla.forEach(j => j.media += 1);
      efecto = "🔥 El equipo llega encendido al torneo. +1 de media para todos.";
    } else if (victorias === 0) {
      plantilla.forEach(j => j.media = Math.max(1, j.media - 2));
      efecto = "😞 Mal rendimiento en la gira. -2 de media para todos.";
    } else {
      const jugador = plantilla[Math.floor(Math.random() * plantilla.length)];
      if (Math.random() < 0.5) {
        jugador.media = Math.max(1, jugador.media - 1);
        efecto = `😓 Fatiga: ${jugador.nombre} pierde -1 de media.`;
      } else {
        jugador.media += 1;
        efecto = `🔥 Destacado del tour: ${jugador.nombre} gana +1 de media.`;
      }
    }

    sumarPresupuesto(2500000);

    agregarNotificacion(
      `🇲🇽 Gira en México\n
${equipoUsuario} ${g1} - ${r1} ${rivalA}\n
${equipoUsuario} ${g2} - ${r2} ${rivalB}\n
${efecto}\n
💵 Ingresan $2.5M`
    );
  },
  no: () => {
    agregarNotificacion("Se decide no viajar a México.");
  }
},

{
  texto: "🇺🇸 Pretemporada en Estados Unidos ¿Aceptar?",
  si: () => {
    const equipos = [
      "LA Galaxy", "Inter Miami", "LAFC", "Seattle Sounders",
      "Atlanta United", "NYC FC", "Orlando City", "Austin FC"
    ];
    const [rivalA, rivalB] = equipos.sort(() => Math.random() - 0.5).slice(0, 2);

    const g1 = golesAleatorios();
    const r1 = golesAleatorios();
    const g2 = golesAleatorios();
    const r2 = golesAleatorios();

    let victorias = 0;
    if (g1 > r1) victorias++;
    if (g2 > r2) victorias++;

    const plantilla = plantillasJugadores[equipoUsuario];
    let efecto = "";

    if (victorias === 2) {
      plantilla.forEach(j => j.media += 1);
      efecto = "🔥 Gran gira internacional. +1 de media para todo el plantel.";
    } else if (victorias === 0) {
      plantilla.forEach(j => j.media = Math.max(1, j.media - 2));
      efecto = "😞 Resultados muy flojos. -2 de media para todos.";
    } else {
      const jugador = plantilla[Math.floor(Math.random() * plantilla.length)];
      if (Math.random() < 0.5) {
        jugador.media = Math.max(1, jugador.media - 1);
        efecto = `😓 Viaje largo: ${jugador.nombre} pierde -1 de media.`;
      } else {
        jugador.media += 1;
        efecto = `🔥 Se adapta bien: ${jugador.nombre} gana +1 de media.`;
      }
    }

    sumarPresupuesto(1800000);

    agregarNotificacion(
      `🇺🇸 Gira en Estados Unidos\n
${equipoUsuario} ${g1} - ${r1} ${rivalA}\n
${equipoUsuario} ${g2} - ${r2} ${rivalB}\n
${efecto}\n
💵 Ingresan $1.8M`
    );
  },
  no: () => {
    agregarNotificacion("Se prioriza entrenar en casa.");
  }
}

];