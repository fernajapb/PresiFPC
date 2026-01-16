
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

     "CA Boca Jrs": { nombre: "Pascual Guerrero", foto: "estadios/pascual.png", capacidad: 37900, luminarias: 4, cesped: "Natural" },

     "Inter Bogotá": { nombre: "Metropolitano de Techo", foto: "estadios/techo.png", capacidad: 10000, luminarias: 4, cesped: "Natural" },

     "Fortaleza": { nombre: "Metropolitano de Techo", foto: "estadios/techo.png", capacidad: 10000, luminarias: 4, cesped: "Natural" },

     "R.Cundinamarca": { nombre: "Municipal de Mosquera", foto: "estadios/mosquera.png", capacidad: 5440, luminarias: 4, cesped: "Natural" },

     "Tigres": { nombre: "Metropolitano de Techo", foto: "estadios/techo.png", capacidad: 10000, luminarias: 4, cesped: "Natural" },

      "Equidad": { nombre: "Metropolitano de Techo", foto: "estadios/techo.png", capacidad: 10000, luminarias: 4, cesped: "Natural" },

     "B.Chico": { nombre: "La Independencia", foto: "estadios/independencia.png", capacidad: 20000, luminarias: 4, cesped: "Natural" },

     "Patriotas": { nombre: "La Independencia", foto: "estadios/independencia.png", capacidad: 20000, luminarias: 4, cesped: "Natural" },

      "Lanceros B.": { nombre: "La Independencia", foto: "estadios/independencia.png", capacidad: 20000, luminarias: 4, cesped: "Natural" },
   
      //Estadios con equipo Unico
    "Junior": { nombre: "Metropolitano", foto: "estadios/metro.png", capacidad: 46700, luminarias: 4, cesped: "Natural" },

     "Uniautonoma": { nombre: "Metropolitano", foto: "estadios/metro.png", capacidad: 46700, luminarias: 4, cesped: "Natural" },

    "Bucaramanga": { nombre: "Americo Montanini", foto: "estadios/americo.png", capacidad: 25000, luminarias: 4, cesped: "Natural" },

     "Cali": { nombre: "Deportivo Cali", foto: "estadios/cali.png", capacidad: 42000, luminarias: 4, cesped: "Natural" },

     "Tolima": { nombre: "Manuel Murillo Toro", foto: "estadios/mamut.png", capacidad: 30000, luminarias: 4, cesped: "Natural" },

     "Águilas": { nombre: "Alberto Grisales", foto: "estadios/grisales.png", capacidad: 14000, luminarias: 4, cesped: "Natural" },

     "Once Caldas": { nombre: "Palogrande", foto: "estadios/palogrande.png", capacidad: 35850, luminarias: 4, cesped: "Natural" },

      "Pereira": { nombre: "Hernán Ramírez Villegas", foto: "estadios/ramirez.png", capacidad: 30300, luminarias: 4, cesped: "Natural" },

      "Llaneros": { nombre: "Bello Horizonte", foto: "estadios/villavicencio.png", capacidad: 15000, luminarias: 4, cesped: "Natural" },

       "Centauros V.": { nombre: "Bello Horizonte", foto: "estadios/villavicencio.png", capacidad: 15000, luminarias: 4, cesped: "Natural" },

      "Envigado": { nombre: "Polideportivo Sur", foto: "estadios/polideportivo.png", capacidad: 14000, luminarias: 0, cesped: "Natural" },

      "U.Magdalena": { nombre: "Sierra Nevada", foto: "estadios/nevada.png", capacidad: 16000, luminarias: 4, cesped: "Natural" },

      "Alianza": { nombre: "Armando Maestre Pavajeau", foto: "estadios/maestre.png", capacidad: 11500, luminarias: 4, cesped: "Natural" },

      "Valledupar": { nombre: "Armando Maestre Pavajeau", foto: "estadios/maestre.png", capacidad: 11500, luminarias: 4, cesped: "Natural" },

      "Cucuta": { nombre: "General Santander", foto: "estadios/general.png", capacidad: 42000, luminarias: 4, cesped: "Natural" },

      "Quindio": { nombre: "Centenario de Armenia", foto: "estadios/centenario.png", capacidad: 20700, luminarias: 4, cesped: "Natural" },

      "Pasto": { nombre: "Departamental Libertad", foto: "estadios/departamental.png", capacidad: 20660, luminarias: 4, cesped: "Natural" },

      "Real Cartagena": { nombre: "Jaime Moron", foto: "estadios/moron.png", capacidad: 16000, luminarias: 4, cesped: "Natural" },

      "Jaguares": { nombre: "Jaraguay", foto: "estadios/jaraguay.png", capacidad: 12000, luminarias: 4, cesped: "Natural" },

      "Inter Palmira": { nombre: "Francisco Rivera Escobar", foto: "estadios/rivera.png", capacidad: 15300, luminarias: 4, cesped: "Natural" },

      "Barranquilla": { nombre: "Romelio Martinez", foto: "estadios/romelio.png", capacidad: 8600, luminarias: 4, cesped: "Natural" },

      "Unicosta": { nombre: "Romelio Martinez", foto: "estadios/romelio.png", capacidad: 8600, luminarias: 4, cesped: "Natural" },

      "R.Santander": { nombre: "Villa Concha", foto: "estadios/concha.png", capacidad: 5500, luminarias: 0, cesped: "Sintético" },

      "Orsomarso": { nombre: "Daniel Villa Zapata", foto: "estadios/villazapata.png", capacidad: 10400, luminarias: 4, cesped: "Natural" },

       "A.Petrolera": { nombre: "Daniel Villa Zapata", foto: "estadios/villazapata.png", capacidad: 10400, luminarias: 4, cesped: "Natural" },

      "Leones": { nombre: "Metropolitano de Itagüí", foto: "estadios/ditaires.png", capacidad: 12000, luminarias: 4, cesped: "Natural" },

      "Bogotá": { nombre: "Olaya Herrera", foto: "estadios/olaya.png", capacidad: 2500, luminarias: 4, cesped: "Natural" },

      "Ind.Yumbo": { nombre: "Raul Miranda", foto: "estadios/raul.png", capacidad: 3500, luminarias: 4, cesped: "Natural" },

      "P.Casanare": { nombre: "Santiago Atalayas", foto: "estadios/atalayas.png", capacidad: 10000, luminarias: 2, cesped: "Natural" },

      "U.Popayan": { nombre: "Ciro Lopez", foto: "estadios/ciro.png", capacidad: 5000, luminarias: 2, cesped: "Natural" },

      "Fiorentina": { nombre: "Alberto Buitrago", foto: "estadios/buitrago.png", capacidad: 6000, luminarias: 2, cesped: "Natural" },

      "Expreso Rojo": { nombre: "Luis Carlos Galan", foto: "estadios/galan.png", capacidad: 8000, luminarias: 2, cesped: "Natural" },

      "Huila": { nombre: "Plazas Alcid", foto: "estadios/gpa.png", capacidad: 12000, luminarias: 4, cesped: "Natural" },

      "R.Sincelejo": { nombre: "Cumplido Sierra", foto: "estadios/cumplido.png", capacidad: 8000, luminarias: 4, cesped: "Natural" },

"Cortuluá": { nombre: "12 de Octubre", foto: "estadios/octubre.png", capacidad: 16000, luminarias: 4, cesped: "Natural" },
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


let movimientosEconomicos = {
  capacidad: 0,
  cesped: 0,
  luminarias: 0,
  impuestos: 0,
  total: 0
};


function mostrarMovimientos() {
  document.getElementById("movCapacidad").textContent =
    movimientosEconomicos.capacidad > 0
      ? `-$${movimientosEconomicos.capacidad.toLocaleString()}`
      : "";

  document.getElementById("movCesped").textContent =
    movimientosEconomicos.cesped > 0
      ? `-$${movimientosEconomicos.cesped.toLocaleString()}`
      : "";

  document.getElementById("movLuminarias").textContent =
    movimientosEconomicos.luminarias > 0
      ? `-$${movimientosEconomicos.luminarias.toLocaleString()}`
      : "";

  document.getElementById("movImpuestos").textContent =
    movimientosEconomicos.impuestos > 0
      ? `-$${movimientosEconomicos.impuestos.toLocaleString()}`
      : "";

  document.getElementById("movTotal").textContent =
    movimientosEconomicos.total > 0
      ? `-$${movimientosEconomicos.total.toLocaleString()}`
      : "";
}

function aplicarGasto(rubro, monto) {
  const impuestos = Math.round(monto * 0.05);
  const total = monto + impuestos;

  if (presupuestoVisible < total) {
    return;
  }

  movimientosEconomicos[rubro] += monto;
  movimientosEconomicos.impuestos += impuestos;
  movimientosEconomicos.total += total;

  restarPresupuesto(total);
  mostrarMovimientos();
}

function modificarCapacidad(valor) {
  const estadio = estadiosEquipos[equipoUsuario];
  if (!estadio) return;

  const costo = Math.round(
    Math.abs(valor) * (presupuestoVisible * 0.00005)
  );

  aplicarGasto("capacidad", costo);

  estadio.capacidad += valor;
  mostrarEstadio(equipoUsuario);
}

function mejorarLuminarias() {
  const estadio = estadiosEquipos[equipoUsuario];
  if (!estadio || estadio.luminarias >= 8) return;

  const costo = Math.round(presupuestoVisible * 0.10);

  aplicarGasto("luminarias", costo);

  estadio.luminarias++;
  mostrarEstadio(equipoUsuario);
}

function cambiarCesped() {
  const estadio = estadiosEquipos[equipoUsuario];
  if (!estadio) return;

  const nuevo = document.getElementById("selectCesped").value;

  let costo = 0;
  if (nuevo === "Híbrido") costo = Math.round(presupuestoVisible * 0.12);
  if (nuevo === "Sintético") costo = Math.round(presupuestoVisible * 0.18);

  if (costo > 0) aplicarGasto("cesped", costo);

  estadio.cesped = nuevo;
  mostrarEstadio(equipoUsuario);
}

function resetearMovimientos() {
  movimientosEconomicos = {
    capacidad: 0,
    cesped: 0,
    luminarias: 0,
    impuestos: 0,
    total: 0
  };

  mostrarMovimientos();
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

