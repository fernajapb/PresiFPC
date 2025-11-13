
// 📍 Información de estadios
const estadiosEquipos = {
   //Estadios Compartidos
   "Nacional": { nombre: "Atanasio Girardot", foto: "estadios/atanasio.png", capacidad: 44826, luminarias: 4, cesped: "Natural" },
   "Medellín": { nombre: "Atanasio Girardot", foto: "estadios/atanasio.png", capacidad: 44826, luminarias: 4, cesped: "Natural" },

   "Millonarios": { nombre: "El Campín", foto: "estadios/campin.png", capacidad: 39000, luminarias: 4, cesped: "Natural" },
    "Santa Fe": { nombre: "El Campín", foto: "estadios/campin.png", capacidad: 39000, luminarias: 4, cesped: "Natural" },
   
    "América": { nombre: "Pascual Guerrero", foto: "estadios/pascual.png", capacidad: 37900, luminarias: 4, cesped: "Natural" },
    "Atlético FC": { nombre: "Pascual Guerrero", foto: "estadios/pascual.png", capacidad: 37900, luminarias: 4, cesped: "Natural" },
    "Boca Jrs. Cali": { nombre: "Pascual Guerrero", foto: "estadios/pascual.png", capacidad: 37900, luminarias: 4, cesped: "Natural" },

     "La Equidad": { nombre: "Metropolitano de Techo", foto: "estadios/techo.png", capacidad: 10000, luminarias: 4, cesped: "Natural" },
     "Fortaleza": { nombre: "Metropolitano de Techo", foto: "estadios/techo.png", capacidad: 10000, luminarias: 4, cesped: "Natural" },
     "Real Cundi": { nombre: "Metropolitano de Techo", foto: "estadios/techo.png", capacidad: 10000, luminarias: 4, cesped: "Natural" },
     "Tigres": { nombre: "Metropolitano de Techo", foto: "estadios/techo.png", capacidad: 10000, luminarias: 4, cesped: "Natural" },

     "Chico": { nombre: "La Independencia", foto: "estadios/independencia.png", capacidad: 20000, luminarias: 4, cesped: "Natural" },
     "Patriotas": { nombre: "La Independencia", foto: "estadios/independencia.png", capacidad: 20000, luminarias: 4, cesped: "Natural" },
   
      //Estadios con equipo Unico
    "Junior": { nombre: "Metropolitano", foto: "estadios/metro.png", capacidad: 46700, luminarias: 4, cesped: "Natural" },
    "Bucaramanga": { nombre: "Americo Montanini", foto: "estadios/americo.png", capacidad: 25000, luminarias: 4, cesped: "Natural" },
     "Cali": { nombre: "Deportivo Cali", foto: "estadios/cali.png", capacidad: 42000, luminarias: 4, cesped: "Natural" },
     "Tolima": { nombre: "Manuel Murillo Toro", foto: "estadios/mamut.png", capacidad: 30000, luminarias: 4, cesped: "Natural" },

     "Águilas": { nombre: "Alberto Grisales", foto: "estadios/grisales.png", capacidad: 14000, luminarias: 4, cesped: "Natural" },
     "Once Caldas": { nombre: "Palogrande", foto: "estadios/palogrande.png", capacidad: 35850, luminarias: 4, cesped: "Natural" },
      "Pereira": { nombre: "Hernán Ramírez Villegas", foto: "estadios/ramirez.png", capacidad: 30300, luminarias: 4, cesped: "Natural" },
      "Llaneros": { nombre: "Bello Horizonte", foto: "estadios/villavicencio.png", capacidad: 15000, luminarias: 4, cesped: "Natural" },

      "Envigado": { nombre: "Polideportivo Sur", foto: "estadios/polideportivo.png", capacidad: 14000, luminarias: 0, cesped: "Natural" },
      "Union M.": { nombre: "Sierra Nevada", foto: "estadios/nevada.png", capacidad: 16000, luminarias: 4, cesped: "Natural" },
      "Alianza": { nombre: "Armando Maestre Pavajeau", foto: "estadios/maestre.png", capacidad: 11500, luminarias: 4, cesped: "Natural" },
      "Cucuta": { nombre: "General Santander", foto: "estadios/general.png", capacidad: 42000, luminarias: 4, cesped: "Natural" },

      "Quindio": { nombre: "Centenario de Armenia", foto: "estadios/centenario.png", capacidad: 20700, luminarias: 4, cesped: "Natural" },
      "Pasto": { nombre: "Departamental Libertad", foto: "estadios/departamental.png", capacidad: 20660, luminarias: 4, cesped: "Natural" },
      "Real Cartagena": { nombre: "Jaime Moron", foto: "estadios/moron.png", capacidad: 16000, luminarias: 4, cesped: "Natural" },
      "Jaguares": { nombre: "Jaraguay", foto: "estadios/jaraguay.png", capacidad: 12000, luminarias: 4, cesped: "Natural" },

      "Inter Palmira": { nombre: "Francisco Rivera Escobar", foto: "estadios/rivera.png", capacidad: 15300, luminarias: 4, cesped: "Natural" },
      "Barranquilla": { nombre: "Romelio Martinez", foto: "estadios/romelio.png", capacidad: 8600, luminarias: 4, cesped: "Natural" },
      "Real Santander": { nombre: "Villa Concha", foto: "estadios/concha.png", capacidad: 5500, luminarias: 0, cesped: "Sintético" },
      "Orsomarso": { nombre: "Daniel Villa Zapata", foto: "estadios/villazapata.png", capacidad: 10400, luminarias: 4, cesped: "Natural" },

      "Leones": { nombre: "Metropolitano de Itagüí", foto: "estadios/ditaires.png", capacidad: 12000, luminarias: 4, cesped: "Natural" },
      "Bogotá": { nombre: "Olaya Herrera", foto: "estadios/olaya.png", capacidad: 2500, luminarias: 4, cesped: "Natural" },
      "Huila": { nombre: "Guillermo Plazas Alcid", foto: "estadios/plazasalcid.png", capacidad: 10200, luminarias: 4, cesped: "Natural" },

};



function mostrarEstadio(nombreEquipo) {
  const estadio = estadiosEquipos[nombreEquipo];
  if (!estadio) return;

  document.getElementById("nombreEstadio").innerText = estadio.nombre;
  document.getElementById("fotoEstadio").src = estadio.foto;
  document.getElementById("capacidadEstadio").innerText = `Capacidad: ${estadio.capacidad.toLocaleString()} espectadores`;
  document.getElementById("luminariasEstadio").innerText = `Luminarias: ${estadio.luminarias}/8`;
  document.getElementById("cespedEstadio").innerText = `Cesped: ${estadio.cesped}`;
  document.getElementById("selectCesped").value = estadio.cesped;
}

function modificarCapacidad(valor) {
  const estadio = estadiosEquipos[equipoUsuario];
  if (!estadio) return;

  const costo = Math.abs(valor) * 10; // 💰 cada asiento cuesta $10
  if (presupuestoVisible < costo) return alert("Presupuesto insuficiente.");

  estadio.capacidad += valor;
  restarPresupuesto(costo);
  mostrarEstadio(equipoUsuario);
}

function mejorarLuminarias() {
  const estadio = estadiosEquipos[equipoUsuario];
  if (!estadio || estadio.luminarias >= 8) return;

  const costo = 500000; // 💡 cada mejora cuesta medio millón
  if (presupuestoVisible < costo) return alert("Presupuesto insuficiente.");

  estadio.luminarias++;
  restarPresupuesto(costo);
  mostrarEstadio(equipoUsuario);
}

function cambiarCesped() {
  const estadio = estadiosEquipos[equipoUsuario];
  if (!estadio) return;

  const nuevo = document.getElementById("selectCesped").value;
  const costo = nuevo === "Natural" ? 0 : nuevo === "Híbrido" ? 2000000 : 3000000;

  if (presupuestoVisible < costo) return alert("Presupuesto insuficiente.");

  estadio.cesped = nuevo;
  restarPresupuesto(costo);
  mostrarEstadio(equipoUsuario);
}

function restaurarNombreEstadio() {
  const estadio = estadiosEquipos[equipoUsuario];
  if (!estadio) return;

  if (estadio.nombreOriginal && estadio.nombre !== estadio.nombreOriginal) {
    estadio.nombre = estadio.nombreOriginal;
    estadioRenombrado = false; // ⚙️ volvemos a estado normal
    mostrarEstadio(equipoUsuario);

    notificacionPendiente = "Has restaurado el nombre histórico del estadio.";
    mensajesPendientes++;
    actualizarBuzon();
  } else {
    // No hay cambio previo, no hace nada.
    notificacionPendiente = "X- No hay un nombre anterior que restaurar.";
    mensajesPendientes++;
    actualizarBuzon();
  }
}

