let castigoPorCorrupcion = null;
preguntaHechaEstaTemporada = false;
let decisionCorrupcionDebut = false;


function preguntaAleatoria() {
  if (preguntaHechaEstaTemporada) return;
  preguntaHechaEstaTemporada = true;
  
  const preguntas = [
  //🔵🔵 13 Preguntas de Empresas o Empresarios🔵🔵
  {
    texto: "💼 Un empresario quiere invertir en tu club. ¿Aceptar el dinero?",
    si: () => {
      castigoPorCorrupcion = equipoUsuario;
      sumarPresupuesto(20000000);
      notificacionPendiente = "💸 Recibiste los 20 millones...";
      mensajesPendientes++;
      actualizarBuzon();
    },
    no: () => {
      notificacionPendiente = "👏 Rechazaste el trato y protegiste la reputación del club.";
      mensajesPendientes++;
      actualizarBuzon();
    }
  },

{
  texto: "🎮 Un sponsor importante quiere lanzar un equipo de e-sports con tu escudo. Ofrecen $5M de patrocinio. ¿Aceptar?",
  si: () => {
    sumarPresupuesto(5000000);
    modificarFuerzaEquipo(1);
    notificacionPendiente = "📈 El proyecto e-sports elevó tu imagen y sumaste $5M. También ganas +1 de fuerza institucional.";
    mensajesPendientes++;
    actualizarBuzon();
  },
  no: () => {
    notificacionPendiente = "🚫 Rechazaste la propuesta gamer. El club sigue sin presencia digital.";
    mensajesPendientes++;
    actualizarBuzon();
  }
},

   {
    texto: "💼 Un empresario ofrece 10 millones como inversión privada. ¿Aceptar?",
    si: () => {
      sumarPresupuesto(10000000);
      notificacionPendiente = "💰 Recibiste 10 millones. ¡Presupuesto aumentado!";
      mensajesPendientes++;
      actualizarBuzon();
    },
    no: () => {
      notificacionPendiente = "🙅‍♂️ Rechazaste la inversión. No hay cambios.";
      mensajesPendientes++;
      actualizarBuzon();
    }
  },
  {
    texto: "📩 Una carta sin remitente ofrece un 'bono' si el club acepta sus condiciones. ¿Aceptar?",
    si: () => {
      const resultado = Math.random();
      if (resultado < 0.3) {
        castigoPorCorrupcion = equipoUsuario;
        notificacionPendiente = "💸 El bono era dinero ilícito. ¡Corrupción detectada!";
      } else {
        sumarPresupuesto(3000000);
        modificarFuerzaEquipo(1);
        notificacionPendiente = "📈 El bono era legal y útil. +$3M y +1 fuerza.";
      }
      mensajesPendientes++;
      actualizarBuzon();
      
    },
    no: () => {
      notificacionPendiente = "🙅 Ignoraste la carta. Sigues en regla.";
      mensajesPendientes++;
      actualizarBuzon();
    }
  },
  {
    texto: "🏦 Un banco quiere aparecer en la manga de la camiseta. ¿Aceptar el nuevo patrocinio?",
    si: () => {
      sumarPresupuesto(3000000);
      notificacionPendiente = "💵 Firmaste el acuerdo. Ingresas $3M.";
      mensajesPendientes++;
      actualizarBuzon();
    },
    no: () => {
      notificacionPendiente = "❌ Rechazaste el acuerdo. Nada cambia.";
      mensajesPendientes++;
      actualizarBuzon();
    }
  },
 
  {
    texto: "🧠 Un Empresario árabe ofrece dar una charla técnica a cambio de derechos de imagen. ¿Aceptar?",
    si: () => {
      presupuestoVisible += 3000000;
      actualizarPresupuestoHTML();
      notificacionPendiente = "💰 Recibiste $3M por el acuerdo con el club árabe.";
      mensajesPendientes++;
      actualizarBuzon();
    },
    no: () => {
      notificacionPendiente = "🤝 Rechazaste la propuesta por mantener tu independencia.";
      mensajesPendientes++;
      actualizarBuzon();
    }
  },
  {
    texto: "🎲 Un aficionado millonario ofrece una donación por amor al club. ¿Aceptar el dinero sin hacer preguntas?",
    si: () => {
      presupuestoVisible += 2500000;
      actualizarPresupuestoHTML();
      notificacionPendiente = "💸 Aceptaste el dinero misterioso. Sumaste $2.5M.";
      mensajesPendientes++;
      actualizarBuzon();
    },
    no: () => {
      notificacionPendiente = "🧼 Actuaste con ética. El presupuesto sigue igual.";
      mensajesPendientes++;
      actualizarBuzon();
    }
  },
  {
    texto: "🏛️ El alcalde lanza un subsidio para clubes con impacto juvenil. ¿Postularte?",
    si: () => {
      presupuestoVisible += 2000000;
      actualizarPresupuestoHTML();
      notificacionPendiente = "🏅 El club recibió el subsidio. Sumaste $2M.";
      mensajesPendientes++;
      actualizarBuzon();
    },
    no: () => {
      notificacionPendiente = "🙃 Dejaste pasar la oportunidad por burocracia.";
      mensajesPendientes++;
      actualizarBuzon();
    }
  },
  {
  texto: "🕴️ Un agente te ofrece 20 millones si haces debutar a un jugador. ¿Aceptar el trato?",
  si: () => {
    modificarFuerzaEquipo(2); 
    sumarPresupuesto(20000000);        
    notificacionPendiente = "✅ El dinero ya está en la cuenta del club.";
    decisionCorrupcionDebut = true;    
    mensajesPendientes++;
    actualizarBuzon();
  },
  no: () => {
    notificacionPendiente = "👏 Rechazaste la oferta y protegiste la integridad del club.";
    mensajesPendientes++;
    actualizarBuzon();
  }
},
{
  texto: "💼 Un empresario con mucho dinero quiere invertir en tu club. Promete mejorar todo sin pedir nada a cambio. ¿Aceptar el dinero?",
  si: () => {
    sumarPresupuesto(10000000);
    modificarFuerzaEquipo(2);
    plantillasJugadores[equipoUsuario].forEach(j => j.media++);
    notificacionPendiente = "✅ Era una inversión legal. Tu club mejora: +1 media a todos, +2 fuerza y +$10M al presupuesto.";
    mensajesPendientes++;
    actualizarBuzon();
  },
  no: () => {
    notificacionPendiente = "❌ Rechazaste la oferta. Tal vez perdiste una oportunidad legítima...";
    mensajesPendientes++;
    actualizarBuzon();
  }
},

 {
    texto: "💼 Un grupo de empresarios quiere comprar el 15% del club por $12M. No intervendrán en decisiones deportivas. ¿Aceptar?",
    si: () => {
      sumarPresupuesto(12000000);
      notificacionPendiente = "✅ Recibiste $12 millones sin ceder control deportivo. Gran negocio.";
      mensajesPendientes++;
      actualizarBuzon();
    },
    no: () => {
      notificacionPendiente = "❌ Rechazaste la oferta. Algunos en la junta creen que desaprovechaste una gran oportunidad.";
      mensajesPendientes++;
      actualizarBuzon();
    }
  },

  
{
  texto: "🌐 Tu equipo es invitado a un torneo amistoso internacional. ¿Aceptar?",
  si: () => {
    modificarFuerzaEquipo(5);
    notificacionPendiente = "🌍 El roce internacional sube tu nivel. +5 fuerza.";
    mensajesPendientes++;
    actualizarBuzon();
  },
  no: () => {
    modificarFuerzaEquipo(-1);
    notificacionPendiente = "📉 Perdiste visibilidad. -1 fuerza.";
    mensajesPendientes++;
    actualizarBuzon();
  }
},
{
  texto: "🎁 Un fanático anónimo envió un paquete especial al club. ¿Abrirlo?",
  si: () => {
    const resultado = Math.floor(Math.random() * 3);
    if (resultado === 0) {
      modificarFuerzaEquipo(2);
      notificacionPendiente = "📦 ¡Sorpresa! Contenía material táctico avanzado. +2 fuerza.";
    } else if (resultado === 1) {
      plantillasJugadores[equipoUsuario].forEach(j => j.media++);
      notificacionPendiente = "📦 ¡Wow! Era equipamiento de élite. Todos suben +1 de media.";
    } else {
      const jugador = plantillasJugadores[equipoUsuario][Math.floor(Math.random() * plantillasJugadores[equipoUsuario].length)];
      jugador.media = Math.max(1, jugador.media - 2);
      notificacionPendiente = `📦 ¡Oh no! ${jugador.nombre} sufrió una lesión con el regalo. -2 de media.`;
    }
    mensajesPendientes++;
    actualizarBuzon();
  },
  no: () => {
    notificacionPendiente = "🙅 Decidiste no abrir el paquete. Mejor prevenir que lamentar.";
    mensajesPendientes++;
    actualizarBuzon();
  }
},
  
// 🔴🔴 6 Preguntas de DTS🔴🔴
  {
    texto: `⚽ El DT ${dtSeleccionado} propone un entrenamiento intensivo para todo el plantel. ¿Aceptar?`,
    si: () => {
      plantillasJugadores[equipoUsuario].forEach(j => j.media++);
      notificacionPendiente = `✅ Entrenamiento aprobado por ${dtSeleccionado}. Todos los jugadores suben +1 de media.`;
      mensajesPendientes++;
      actualizarBuzon();
    },
    no: () => {
      notificacionPendiente = `❌ Rechazaste el plan de ${dtSeleccionado}. Nada cambia.`;
      mensajesPendientes++;
      actualizarBuzon();
    }
  },
 
  {
    texto: `🧤 El DT ${dtSeleccionado} propone un programa intensivo solo para porteros. ¿Aprobar su plan?`,
    si: () => {
      plantillasJugadores[equipoUsuario].forEach(j => {
        if (j.posicion.toLowerCase() === "portero") j.media++;
      });
      notificacionPendiente = `✅ ${dtSeleccionado} aplicó el plan. Los porteros ganan +1 de media.`;
      mensajesPendientes++;
      actualizarBuzon();
    },
    no: () => {
      notificacionPendiente = `❌ Rechazaste el plan de ${dtSeleccionado}. Nada cambia.`;
      mensajesPendientes++;
      actualizarBuzon();
    }
  },
  {
    texto: `🎯 El DT ${dtSeleccionado} quiere entrenar a los delanteros por separado para mejorar su precisión. ¿Aceptar?`,
    si: () => {
      plantillasJugadores[equipoUsuario].forEach(j => {
        if (j.posicion.toLowerCase().includes("delantero")) j.media++;
      });
      notificacionPendiente = "✅ Entrenamiento especializado aprobado. Los delanteros ganan +1 de media.";
      mensajesPendientes++;
      actualizarBuzon();
    },
    no: () => {
      notificacionPendiente = "❌ Se rechazó la propuesta de entrenamiento. Nada cambia.";
      mensajesPendientes++;
      actualizarBuzon();
    }
  },
  {
    texto: `🧠 ${dtSeleccionado} sugiere sesiones privadas con un psicólogo solo para mediocampistas. ¿Aceptar su sugerencia?`,
    si: () => {
      plantillasJugadores[equipoUsuario].forEach(j => {
        if (j.posicion.toLowerCase().includes("volante")) j.media++;
      });
      notificacionPendiente = `✅ ${dtSeleccionado} mejoró el enfoque mental. Mediocampistas +1 de media.`;
      mensajesPendientes++;
      actualizarBuzon();
    },
    no: () => {
      notificacionPendiente = `❌ No autorizaste el enfoque psicológico. Nada cambia.`;
      mensajesPendientes++;
      actualizarBuzon();
    }
  },
   {
    texto: `🎤 El sponsor principal te pidió participar en un comercial con el DT ${dtSeleccionado}. ¿Aceptar el pedido?`,
    si: () => {
      notificacionPendiente = `📹 El DT ${dtSeleccionado} y tú grabaron el anuncio. La relación con el sponsor se mantiene fuerte.`;
      mensajesPendientes++;
      actualizarBuzon();
    },
    no: () => {
      const penalizacion = 2000000;
      if (presupuestoVisible >= penalizacion) {
        restarPresupuesto(penalizacion);
        notificacionPendiente = "😒 El sponsor se molestó. Retiró parte de su aporte. Pierdes $2M.";
      } else {
        notificacionPendiente = "🚫 No cumpliste con el compromiso y no tienes fondos para afrontar la penalización.\n🧨 La junta directiva ha decidido removerte del cargo. Has sido despedido.";
      }
      mensajesPendientes++;
      actualizarBuzon();
    }
  },
  {
  texto: `🎯 El DT ${dtSeleccionado} cree que el actual capitán no lidera bien. ¿Cambiar el capitán del equipo?`,
  si: () => {
    modificarFuerzaEquipo(1);
    notificacionPendiente = "✅ El nuevo capitán inspira al grupo. Se verá reflejado en el segundo semestre.";
    mensajesPendientes++;
    actualizarBuzon();
  },
  no: () => {
    notificacionPendiente = "❌ Mantuviste al capitán actual. El ambiente se mantiene estable.";
    mensajesPendientes++;
    actualizarBuzon();
  }
},

  // 🟠🟠 15 Preguntas de jugadores 🟠🟠
  {
    texto: "🏥 El jefe médico advirtió sobre riesgo de lesiones si no se invierte en recuperación. ¿Ignorarlo?",
    si: () => {
      const plantilla = plantillasJugadores[equipoUsuario];
      const lesionado = plantilla[Math.floor(Math.random() * plantilla.length)];
      lesionado.media = Math.max(1, lesionado.media - 4);
      notificacionPendiente = `🚑 ${lesionado.nombre} se lesionó por sobrecarga. Pierde -4 de media.`;
      mensajesPendientes++;
      actualizarBuzon();
    },
    no: () => {
      notificacionPendiente = "✅ Aprobaste los refuerzos médicos. El equipo estará más protegido.";
      mensajesPendientes++;
      actualizarBuzon();
    }
  },
  {
    texto: "🚨 Se descubrió que uno de tus jugadores está involucrado en apuestas ilegales. ¿Denunciarlo a la federación?",
    si: () => {
      const plantilla = plantillasJugadores[equipoUsuario];
      const jugadorInvolucrado = plantilla[Math.floor(Math.random() * plantilla.length)];
      const index = plantilla.indexOf(jugadorInvolucrado);
      if (index !== -1) plantilla.splice(index, 1);
      notificacionPendiente = `🚫 ${jugadorInvolucrado.nombre} fue denunciado y expulsado del torneo. No podrá volver a jugar en la temporada.`;
      mensajesPendientes++;
      actualizarBuzon();
    },
    no: () => {
      fuerzaEquipos[equipoUsuario] = Math.max(0, fuerzaEquipos[equipoUsuario] - 3);
      notificacionPendiente = "❌ Decidiste encubrir el escándalo. El vestuario se llenó de tensión. Pierdes -3 de fuerza.";
      mensajesPendientes++;
      actualizarBuzon();
    }
  },
  {
    texto: "🧪 Un jugador fue pillado dopándose. ¿Encubrirlo?",
    si: () => {
      castigoPorCorrupcion = equipoUsuario;
      notificacionPendiente = "🙊 Lo encubriste... veremos si te descubren.";
      mensajesPendientes++;
      actualizarBuzon();
    },
    no: () => {
      const plantilla = plantillasJugadores[equipoUsuario];
      if (plantilla.length > 0) {
        const sancionado = plantilla[Math.floor(Math.random() * plantilla.length)];
        sancionado.media = Math.max(1, sancionado.media - 2);
        notificacionPendiente = `⚠️ ${sancionado.nombre} fue suspendido. Pierde -2 de media.`;
        mensajesPendientes++;
        actualizarBuzon();
      }
    }
  },
  
  {
    texto: "🧬 Un laboratorio ofrece suplementación avanzada legal para mejorar el rendimiento de tu plantilla por $2M. ¿Aceptar?",
    si: () => {
      const costo = 2000000;
      if (presupuestosEquipos[equipoUsuario] >= costo) {
        restarPresupuesto(costo);
        const plantilla = plantillasJugadores[equipoUsuario];
        plantilla.forEach(j => j.media += 5);
        notificacionPendiente = "💪 La suplementación funcionó: todos los jugadores suben +5 de media.";
      } else {
        notificacionPendiente = "❌ No tienes suficiente presupuesto para pagar la mejora.";
      }
      mensajesPendientes++;
      actualizarBuzon();
    },
    no: () => {
      notificacionPendiente = "🚫 Rechazaste la propuesta. No hay cambios.";
      mensajesPendientes++;
      actualizarBuzon();
    }
  },
  {
    texto: "🏋️‍♀️ El cuerpo técnico solicita remodelar el gimnasio del club. ¿Aprobar los fondos?",
    si: () => {
      const costo = 2000000;
      if (presupuestoVisible >= costo) {
        restarPresupuesto(costo);
        notificacionPendiente = "💪 Renovaste el gimnasio. Mejora en entrenamientos físicos.";
      } else {
        notificacionPendiente = "❌ No tienes suficiente presupuesto para remodelar el gimnasio.";
      }
      mensajesPendientes++;
      actualizarBuzon();
    },
    no: () => {
      notificacionPendiente = "🏚️ Mantuviste el gimnasio viejo. Nada cambia.";
      mensajesPendientes++;
      actualizarBuzon();
    }
  },
 {
    texto: "🧬 Se implementa una innovadora rutina de nutrición. ¿Aplicarla?",
    si: () => {
      const plantilla = plantillasJugadores[equipoUsuario];
      plantilla.forEach(j => j.fuerza += 3);
      notificacionPendiente = "🥗 Mejora física: todos ganan +3 de fuerza.";
      mensajesPendientes++;
      actualizarBuzon();
    },
    no: () => {
      notificacionPendiente = "🍔 Mantienes el plan de siempre. Todo sigue igual.";
      mensajesPendientes++;
      actualizarBuzon();
    }
  },

  {
    texto: "🎭 Un escándalo de redes sociales afecta la concentración del equipo. ¿Ignorar (Aceptar) y no tomar medidas (Cancelar) ?",
    si: () => {
      const plantilla = plantillasJugadores[equipoUsuario];
      plantilla.forEach(j => {
        j.media = Math.max(1, j.media - 2);
        j.fuerza = Math.max(1, j.fuerza - 1);
      });
      notificacionPendiente = "😓 La crisis afectó al grupo. -2 media y -1 fuerza.";
      mensajesPendientes++;
      actualizarBuzon();
    },
    no: () => {
      notificacionPendiente = "📵 Implementaste un protocolo de comunicación. El equipo se mantiene firme.";
      mensajesPendientes++;
      actualizarBuzon();
    }
  },
  {
    texto: "🧪 Un método de recuperación muscular experimental promete +6 de media. ¿Autorizarlo?",
    si: () => {
      const plantilla = plantillasJugadores[equipoUsuario];
      plantilla.forEach(j => j.media += 6);
      notificacionPendiente = "⚡ Tus jugadores ganaron +6 de media… aunque aún no está aprobado por la FIFA.";
      mensajesPendientes++;
      actualizarBuzon();
    },
    no: () => {
      notificacionPendiente = "😅 Decidiste no arriesgar la salud de tus jugadores.";
      mensajesPendientes++;
      actualizarBuzon();
    }
  },
  {
    texto: "🧬 Un tratamiento cognitivo mejora la toma de decisiones en cancha. ¿Implementarlo?",
    si: () => {
      const plantilla = plantillasJugadores[equipoUsuario];
      plantilla.forEach(j => j.media += 4);
      notificacionPendiente = "🧠 Todos los jugadores ganaron +4 de media gracias al nuevo enfoque mental.";
      mensajesPendientes++;
      actualizarBuzon();
    },
    no: () => {
      notificacionPendiente = "🤔 Preferiste seguir con métodos tradicionales.";
      mensajesPendientes++;
      actualizarBuzon();
    }
  },
 {
  texto: "📸 Rumores de fiestas antes de los partidos. ¿Ignorar (Cancelar) o sancionar (Aceptar)?",
  si: () => {
    modificarFuerzaEquipo(-2);
    notificacionPendiente = "🍾 Tu equipo se descontrola. Pierdes -2 fuerza.";
    mensajesPendientes++;
    actualizarBuzon();
  },
  no: () => {
    notificacionPendiente = "😅 Los Rumores eran Falsos , el equipo sigue igual.";
    mensajesPendientes++;
    actualizarBuzon();
  }
},

{
  texto: "👀Un Periodista Da Rumores de Jugadores en fiestas antes de los partidos. ¿Ignorar (Cancelar) o Dar la cara (Aceptar)?",
  si: () => {
    modificarFuerzaEquipo(-2);
    notificacionPendiente = "Distes la cara antes que el periodista, Pero tú equipo pierde moral -2 de fuerza.";
    mensajesPendientes++;
    actualizarBuzon();
  },
  no: () => {
    modificarFuerzaEquipo(-8);
    notificacionPendiente = "El periodista mostró evidencias , el equipo se descompensa -8 de fuerza.";
    mensajesPendientes++;
    actualizarBuzon();
  }
},


{
  texto: "💢 Un jugador veterano se enfrentó al DT. Como Presidente, ¿apoyas al DT (Aceptar) o al jugador (Cancelar)?",
  si: () => {
    modificarFuerzaEquipo(3);
    notificacionPendiente = "✅ Defendiste la autoridad del DT. El equipo gana +3 de fuerza.";
    mensajesPendientes++;
    actualizarBuzon();
  },
  no: () => {
    const plantilla = plantillasJugadores[equipoUsuario];
    if (plantilla.length > 0) {
      const afectado = plantilla[Math.floor(Math.random() * plantilla.length)];
      afectado.media = Math.max(1, afectado.media - 1);
      notificacionPendiente = `⚠️ El conflicto desmotivó a ${afectado.nombre}. Pierde -1 de media.`;
      mensajesPendientes++;
      actualizarBuzon();
    }
  }
},

{
  texto: "🧑‍⚖️ Un directivo sugiere imponer multas a los jugadores por bajo rendimiento en el semestre. ¿Aprobar la medida?",
  si: () => {
    modificarFuerzaEquipo(1);
    notificacionPendiente = "✅ La disciplina interna mejoró la actitud. Verás más intensidad en el segundo semestre.";
    mensajesPendientes++;
    actualizarBuzon();
  },
  no: () => {
    notificacionPendiente = "❌ Decidiste evitar el castigo. El grupo sigue igual… por ahora.";
    mensajesPendientes++;
    actualizarBuzon();
  }
},

{
  texto: "📰 La prensa difunde rumores que afectan la concentración del plantel. ¿Enfrentar públicamente los rumores?",
  si: () => {
    modificarFuerzaEquipo(1);
    notificacionPendiente = "✅ Tu respuesta firme calmó al entorno. El equipo recupera foco.";
    mensajesPendientes++;
    actualizarBuzon();
  },
  no: () => {
    modificarFuerzaEquipo(-1);
    notificacionPendiente = "❌ El silencio alimentó la tensión. El equipo pierde concentración.";
    mensajesPendientes++;
    actualizarBuzon();
  }
},

{
  texto: "📚 Un prestigioso preparador físico ofrece una capacitación avanzada. ¿Pagar $3M?",
  si: () => {
    if (presupuestoVisible >= 3000000) {
      restarPresupuesto(3000000);
      const plantilla = plantillasJugadores[equipoUsuario];
      plantilla.forEach(j => {
        j.media += 3;
        j.fuerza += 2;
      });
      notificacionPendiente = "💪 Todo el plantel ganó +3 media y +2 fuerza.";
    } else {
      notificacionPendiente = "❌ No tienes dinero para la capacitación.";
    }
    mensajesPendientes++;
    actualizarBuzon();
  },
  no: () => {
    notificacionPendiente = "👎 Rechazaste la oportunidad de formación.";
    mensajesPendientes++;
    actualizarBuzon();
  }
},

  //⚪⚪ 3 Preguntas de Hinchas⚪⚪
  {
    texto: "📱 Los hinchas exigen cambios en redes sociales. ¿Contratar un community manager por $1M?",
    si: () => {
      if (presupuestoVisible >= 1000000) {
        restarPresupuesto(1000000);
        notificacionPendiente = "📱 Imagen digital mejorada. Pagaste $1M.";
      } else {
        notificacionPendiente = "📉 No tenías dinero y los fans están molestos.";
      }
      mensajesPendientes++;
      actualizarBuzon();
    },
    no: () => {
      notificacionPendiente = "🙈 Ignoraste el reclamo. Nada cambia.";
      mensajesPendientes++;
      actualizarBuzon();
    }
  },

 {
  texto: "📣 La hinchada exige resultados. ¿Aceptar presión y cambiar táctica?",
  si: () => {
    modificarFuerzaEquipo(2);
    notificacionPendiente = "📈 Táctica arriesgada. +2 fuerza a tu equipo.";
    mensajesPendientes++;
    actualizarBuzon();
  },
  no: () => {
    modificarFuerzaEquipo(-1);
    notificacionPendiente = "😓 No cambiaste nada. Tu equipo pierde -1 de fuerza por presión.";
    mensajesPendientes++;
    actualizarBuzon();
  }
},

{
  texto: "🧯 Los hinchas organizaron una protesta en el entrenamiento. ¿Reunirte con ellos?",
  si: () => {
    modificarFuerzaEquipo(1);
    notificacionPendiente = "🫱🤝🫲 Dialogaste con la hinchada. Subís +1 de fuerza por respaldo.";
    mensajesPendientes++;
    actualizarBuzon();
  },
  no: () => {
    modificarFuerzaEquipo(-2);
    notificacionPendiente = "🙈 Ignoraste a los hinchas. Perdés -2 de fuerza.";
    mensajesPendientes++;
    actualizarBuzon();
  }
},
  

  //🟡🟡 6 Preguntas Dimayor y tv🟡🟡
  {
    texto: "🟥 La liga te penalizó por acumular tarjetas y comportamiento antideportivo. ¿Pagar multa de $3M?",
    si: () => {
      restarPresupuesto(3000000);
      notificacionPendiente = "💸 Se descontaron $3M por sanción disciplinaria.";
      mensajesPendientes++;
      actualizarBuzon();
    },
    no: () => {
      notificacionPendiente = "🟨 Aceptaste el expediente. Te dejaron pasar esta vez sin castigo extra.";
      mensajesPendientes++;
      actualizarBuzon();
    }
  },
  {
    texto: "📺 La televisora te multó por no cumplir con entrevistas obligatorias. ¿Pagar $2M?",
    si: () => {
      restarPresupuesto(2000000);
      notificacionPendiente = "🎙️ Pagaste la multa. Las relaciones con la prensa se mantienen.";
      mensajesPendientes++;
      actualizarBuzon();
    },
    no: () => {
      notificacionPendiente = "😶 Ignoraste el reclamo. El club queda en mala relación con los medios.";
      mensajesPendientes++;
      actualizarBuzon();
    }
  },
  
{
  texto: "🎲 La Dimayor propone una regla experimental que aumenta el ritmo de juego. ¿Apoyas la idea?",
  si: () => {
    modificarFuerzaEquipo(1);
    notificacionPendiente = "⚡ La nueva regla favorece tu estilo. +1 fuerza al equipo.";
    mensajesPendientes++;
    actualizarBuzon();
  },
  no: () => {
    modificarFuerzaEquipo(-1);
    notificacionPendiente = "📉 Tu equipo se adapta mal al cambio. -1 fuerza.";
    mensajesPendientes++;
    actualizarBuzon();
  }
},

{
  texto: "⚖️ La Dimayor multó a tu club por incidentes con la hinchada. ¿Pagar $4M de sanción?",
  si: () => {
    restarPresupuesto(4000000);
    notificacionPendiente = "💸 Pagaste la multa a Dimayor. Presupuesto reducido.";
    mensajesPendientes++;
    actualizarBuzon();
  },
  no: () => {
    modificarFuerzaEquipo(-2);
    notificacionPendiente = "⚠️ No pagaste. La sanción fue deportiva: pierdes -2 de fuerza.";
    mensajesPendientes++;
    actualizarBuzon();
  }
},
{
  texto: "📉 Una auditoría encontró fallas en tus reportes financieros. ¿Pagar $5M para evitar sanciones mayores?",
  si: () => {
    restarPresupuesto(5000000);
    notificacionPendiente = "💰 Pagaste la auditoría. El club evitó problemas mayores.";
    mensajesPendientes++;
    actualizarBuzon();
  },
  no: () => {
    modificarFuerzaEquipo(-3);
    notificacionPendiente = "🔍 Ocultaste el error. El escándalo afectó al equipo: -3 de fuerza.";
    mensajesPendientes++;
    actualizarBuzon();
  }
},

{
  texto: "🌋 Una crisis nacional afecta a todos los equipos. ¿Donar fondos a la Dimayor para apoyar al fútbol?",
  si: () => {
    if (presupuestoVisible >= 4000000) {
      restarPresupuesto(4000000);
      notificacionPendiente = "🤝 Donaste $4M. La Dimayor reconoce tu compromiso.";
    } else {
      notificacionPendiente = "❌ No tienes fondos suficientes para participar en la ayuda.";
    }
    mensajesPendientes++;
    actualizarBuzon();
  },
  no: () => {
    modificarFuerzaEquipo(-3);
    notificacionPendiente = "🧊 El club fue criticado por no ayudar. Pierdes -3 de fuerza.";
    mensajesPendientes++;
    actualizarBuzon();
  }
},

  
 //🟣🟣 3 Preguntas de instalaciones y transporte🟣🟣 
{
  texto: "🚐 El transporte de los juveniles es obsoleto. ¿Adquirir una nueva van por $1.5M?",
  si: () => {
    const costo = 1500000;
    if (presupuestoVisible >= costo) {
      restarPresupuesto(costo);
      notificacionPendiente = "🚌 Aprobaste la renovación del vehículo. Mejor logística para los juveniles.";
    } else {
      notificacionPendiente = "❌ No tienes fondos para renovar el transporte.";
    }
    mensajesPendientes++;
    actualizarBuzon();
  },
  no: () => {
    modificarFuerzaEquipo(-2);
    notificacionPendiente = "🚧 El transporte ineficiente afecta el desarrollo de juveniles. -2 de fuerza.";
    mensajesPendientes++;
    actualizarBuzon();
  }
},

{
  texto: "🔥 Se rompió el sistema eléctrico del estadio. ¿Cubrir el costo de la reparación?",
  si: () => {
    if (presupuestoVisible >= 1500000) {
      restarPresupuesto(1500000);
      notificacionPendiente = "🔧 Se reparó el sistema. $1.5M menos.";
    } else {
      notificacionPendiente = "💥 No tienes fondos. El estadio quedó dañado.";
    }
    mensajesPendientes++;
    actualizarBuzon();
  },
  no: () => {
    modificarFuerzaEquipo(-2);
    notificacionPendiente = "📉 No se reparó el estadio. Pierdes -2 de fuerza.";
    mensajesPendientes++;
    actualizarBuzon();
  }
},
{
  texto: "🏗️ Se filtró el techo del vestuario. ¿Repararlo?",
  si: () => {
    if (presupuestoVisible >= 100000) {
      restarPresupuesto(100000);
      notificacionPendiente = "🚿 Techo reparado. Higiene recuperada.";
    } else {
      notificacionPendiente = "🚨 No tienes fondos y los jugadores están incómodos.";
    }
    mensajesPendientes++;
    actualizarBuzon();
  },
  no: () => {
    modificarFuerzaEquipo(-1);
    notificacionPendiente = "🤢 Vestuario deteriorado. Pierdes -1 de fuerza.";
    mensajesPendientes++;
    actualizarBuzon();
  }
},

//🟢🟢 13 Preguntas de Estadio🟢🟢

{
  texto: "🎟️ La asistencia al estadio creció un 30% este semestre. La Junta directiva te sugiere subir el precio de las entradas. ¿Aceptar?",
  si: () => {
    modificarFuerzaEquipo(-3);
    notificacionPendiente = "😡 Subiste los precios y los hinchas se sintieron traicionados. Pierdes -3 de fuerza.";
    mensajesPendientes++;
    actualizarBuzon();
  },
  no: () => {
    modificarFuerzaEquipo(1);
    notificacionPendiente = "🙌 Mantuviste los precios populares. La hinchada está orgullosa y más comprometida. Ganas +1 de fuerza.";
    mensajesPendientes++;
    actualizarBuzon();
  }
},
 
  {
    texto: "🏟️ Un festival musical quiere usar tu estadio durante el receso. Ofrecen $6M de alquiler. ¿Aceptar?",
    si: () => {
      sumarPresupuesto(6000000);
      notificacionPendiente = "🎶 El evento fue un éxito. El club ganó $6 millones sin afectar la cancha.";
      mensajesPendientes++;
      actualizarBuzon();
    },
    no: () => {
      notificacionPendiente = "🤷 Rechazaste el alquiler. El estadio quedó vacío durante el receso… y sin ingresos.";
      mensajesPendientes++;
      actualizarBuzon();
    }
  },

{
  texto: "🌧️ Las fuertes lluvias han afectado el campo. ¿Invertir en mejoras urgentes?",
  si: () => {
    const costo = 2000000;
    if (presupuestoVisible >= costo) {
      restarPresupuesto(costo);
      modificarFuerzaEquipo(1);
      notificacionPendiente = "✅ El campo fue restaurado. +1 fuerza.";
    } else {
      notificacionPendiente = "❌ No tienes suficiente presupuesto para invertir en las mejoras del campo.";
    }
    mensajesPendientes++;
    actualizarBuzon();
  },
  no: () => {
    modificarFuerzaEquipo(-3);
    notificacionPendiente = "❌ El terreno sigue irregular. -3 de fuerza.";
    mensajesPendientes++;
    actualizarBuzon();
  }
},

{
  texto: "🏟️ El estadio fue clausurado temporalmente por problemas de seguridad. ¿Pagar $6M para reabrirlo?",
  si: () => {
    restarPresupuesto(6000000);
    notificacionPendiente = "🔓 Pagaste la adecuación del estadio. Se reabre para el próximo partido.";
    mensajesPendientes++;
    actualizarBuzon();
  },
  no: () => {
    modificarFuerzaEquipo(-4);
    notificacionPendiente = "🚧 Jugaste a puerta cerrada. El equipo sufre sin apoyo: -4 de fuerza.";
    mensajesPendientes++;
    actualizarBuzon();
  }
},
 {
  texto: "🏟️ Un empresario quiere cambiar el nombre del estadio a cambio de nuevos patrocinios. ¿Aceptar?",
  si: () => {
    const estadio = estadiosEquipos[equipoUsuario];
    if (estadio) {
      if (!estadio.nombreOriginal) estadio.nombreOriginal = estadio.nombre;

      const nombresPatrocinados = [
        "Arena BetPlay",
        "Estadio Claro Sports",
        "Colpatria Arena",
        "Movistar Stadium",
        "Postobón Park",
        "Bancolombia Arena",
        "Stadium Tigo",
        "Pepsi Dome"
      ];

      const nuevoNombre = nombresPatrocinados[Math.floor(Math.random() * nombresPatrocinados.length)];
      estadio.nombre = nuevoNombre;

      plantillasJugadores[equipoUsuario].forEach(j => j.media++);
      sumarPresupuesto(2000000);

      mostrarEstadio(equipoUsuario);

      notificacionPendiente = `💵 Se firmó el acuerdo con ${nuevoNombre}. Todos suben +1 de media y recibes $2,000,000.`;
      mensajesPendientes++;
      actualizarBuzon();
    }
  },
  no: () => {
    notificacionPendiente = "🙅‍♂️ Preferiste conservar el nombre histórico del estadio. Sin cambios.";
    mensajesPendientes++;
    actualizarBuzon();
  }
},
{
  texto: "🌿 El césped del estadio está en mal estado. Renovarlo costará $1.500.000. ¿Invertir?",
  si: () => {
    if (presupuestoVisible >= 1500000) {
      restarPresupuesto(1500000);
      notificacionPendiente = "🌱 Césped renovado. Mejora la moral del equipo.";
      moralHinchada += 10;
      actualizarMoralHinchadaUI();
    } else {
      notificacionPendiente = "💸 No había fondos para renovar el césped.";
    }
    mensajesPendientes++;
    actualizarBuzon();
  },
  no: () => {
    notificacionPendiente = "😬 Decidiste no invertir en el césped. El juego será más difícil.";
    mensajesPendientes++;
    actualizarBuzon();
  }
},

{
  texto: "🏗️ Un empresario ofrece ampliar el estadio en 5.000 asientos por $3.000.000. ¿Aceptar?",
  si: () => {
    const estadio = estadiosEquipos[equipoUsuario];
    if (presupuestoVisible >= 3000000) {
      restarPresupuesto(3000000);
      estadio.capacidad += 5000;
      mostrarEstadio(equipoUsuario);
      notificacionPendiente = "🎉 El estadio ha sido ampliado. Más hinchas, más ingresos futuros.";
    } else {
      notificacionPendiente = "💰 No hay presupuesto suficiente para la ampliación.";
    }
    mensajesPendientes++;
    actualizarBuzon();
  },
  no: () => {
    notificacionPendiente = "😐 Rechazaste la propuesta de ampliación.";
    mensajesPendientes++;
    actualizarBuzon();
  }
},

{
  texto: "☔ Las lluvias dañaron el drenaje del estadio. Arreglarlo cuesta $800.000. ¿Autorizar?",
  si: () => {
    if (presupuestoVisible >= 800000) {
      restarPresupuesto(800000);
      notificacionPendiente = "💦 Drenaje reparado. El campo vuelve a estar en óptimas condiciones.";
    } else {
      notificacionPendiente = "💸 No tenías suficiente presupuesto. El campo seguirá afectado.";
    }
    mensajesPendientes++;
    actualizarBuzon();
  },
  no: () => {
    notificacionPendiente = "😣 El drenaje sigue dañado. Los partidos se verán afectados por la lluvia.";
    moralHinchada -= 5;
    actualizarMoralHinchadaUI();
    mensajesPendientes++;
    actualizarBuzon();
  }
},

{
  texto: "🏟️ El gobierno ofrece una subvención de $2.000.000 para modernizar el estadio. ¿Aceptar?",
  si: () => {
    sumarPresupuesto(2000000);
    notificacionPendiente = "💰 Has recibido la subvención. El estadio será modernizado.";
    mensajesPendientes++;
    actualizarBuzon();
  },
  no: () => {
    notificacionPendiente = "🤝 Rechazaste la ayuda estatal. Mantienes la independencia financiera.";
    mensajesPendientes++;
    actualizarBuzon();
  }
},

{
  texto: "🎤 Un concierto internacional quiere usar tu estadio. Ganarás $1.000.000. ¿Aceptar?",
  si: () => {
    sumarPresupuesto(1000000);
    notificacionPendiente = "🎶 Gran concierto realizado, pero el césped sufrió daños.";
    moralHinchada += 5;
    actualizarMoralHinchadaUI();
    mensajesPendientes++;
    actualizarBuzon();
  },
  no: () => {
    notificacionPendiente = "🎵 Rechazaste el evento para cuidar el césped. La hinchada lo respeta.";
    moralHinchada += 3;
    actualizarMoralHinchadaUI();
    mensajesPendientes++;
    actualizarBuzon();
  }
},

{
  texto: "💺 Los hinchas piden mejorar las sillas del estadio por $700.000. ¿Aceptar?",
  si: () => {
    if (presupuestoVisible >= 700000) {
      restarPresupuesto(700000);
      moralHinchada += 10;
      actualizarMoralHinchadaUI();
      notificacionPendiente = "✅ Sillas nuevas instaladas. La hinchada está feliz.";
    } else {
      notificacionPendiente = "❌ No tenías suficiente presupuesto. Sin cambios.";
    }
    mensajesPendientes++;
    actualizarBuzon();
  },
  no: () => {
    notificacionPendiente = "🙄 No cambiaste las sillas. La hinchada está algo molesta.";
    moralHinchada -= 5;
    actualizarMoralHinchadaUI();
    mensajesPendientes++;
    actualizarBuzon();
  }
},
{
  texto: "⚡ Una tormenta dañó algunas luminarias del estadio. Repararlas cuesta $800.000. ¿Repararlas?",
  si: () => {
    if (presupuestoVisible >= 800000) {
      restarPresupuesto(800000);
      notificacionPendiente = "💡 Las luminarias fueron reparadas y vuelven a funcionar con normalidad.";
    } else {
      notificacionPendiente = "💸 No tenías dinero para la reparación. Las luminarias seguirán dañadas.";
      // ⚠️ Si no hay presupuesto, también reducimos luminarias
      const estadio = estadiosEquipos[equipoUsuario];
      if (estadio && estadio.luminarias > 0) {
        estadio.luminarias = Math.max(0, estadio.luminarias - 1);
        mostrarEstadio(equipoUsuario);
      }
    }
    mensajesPendientes++;
    actualizarBuzon();
  },
  no: () => {
    // 💥 No reparó — se pierden luminarias
    const estadio = estadiosEquipos[equipoUsuario];
    if (estadio && estadio.luminarias > 0) {
      const reduccion = Math.random() < 0.5 ? 1 : 2; // a veces se dañan más
      estadio.luminarias = Math.max(0, estadio.luminarias - reduccion);
      mostrarEstadio(equipoUsuario);
      notificacionPendiente = `😕 No reparaste las luminarias. Se perdieron ${reduccion} y ahora hay ${estadio.luminarias}/8.`;
    } else {
      notificacionPendiente = "🔦 Ya no quedaban luminarias funcionales. El estadio está oscuro.";
    }
    mensajesPendientes++;
    actualizarBuzon();
  }
},
{
  texto: "🏛️ La alcaldía ofrece instalar nuevas luminarias en el estadio sin costo. ¿Aceptar?",
  si: () => {
    const estadio = estadiosEquipos[equipoUsuario];
    if (estadio && estadio.luminarias < 8) {
      const aumento = Math.random() < 0.5 ? 1 : 2; // entre 1 y 2 nuevas luminarias
      estadio.luminarias = Math.min(8, estadio.luminarias + aumento);
      mostrarEstadio(equipoUsuario);
      notificacionPendiente = `✨ La alcaldía instaló ${aumento} nuevas luminarias. Ahora tienes ${estadio.luminarias}/8.`;
    } else {
      notificacionPendiente = "💡 Ya tienes el máximo de luminarias. No se instalaron más.";
    }
    mensajesPendientes++;
    actualizarBuzon();
  },
  no: () => {
    notificacionPendiente = "🤝 Rechazaste la oferta de la alcaldía. Sin cambios.";
    mensajesPendientes++;
    actualizarBuzon();
  }
}
  
];

const pregunta = preguntas[Math.floor(Math.random() * preguntas.length)];

  // Mostrar modal en vez de confirm
  document.getElementById("textoPregunta").innerText = pregunta.texto;
  document.getElementById("buzonPregunta").style.display = "flex";

  
  // Botón aceptar
  document.getElementById("btnAceptar").onclick = () => {
    pregunta.si(); // ejecuta acción "sí"
    document.getElementById("buzonPregunta").style.display = "none";
  };

  // Botón cancelar
  document.getElementById("btnCancelar").onclick = () => {
    pregunta.no(); // ejecuta acción "no"
    document.getElementById("buzonPregunta").style.display = "none";
  };
}