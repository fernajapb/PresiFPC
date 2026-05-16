
// 📍 Información de estadios
const estadiosEquipos = {
   //Estadios Compartidos
   "Nacional": { 
    nombre: "Atanasio Girardot", 
    foto: "estadios/atanasio.png", 
    capacidad: 44826 
    },

   "Medellín": { 
    nombre: "Atanasio Girardot", 
    foto: "estadios/atanasio.png", 
    capacidad: 44826 
    },

   "Millonarios": { 
    nombre: "El Campín", 
    foto: "estadios/campin.png", 
    capacidad: 39000 
    },

   "Santa Fe": { 
    nombre: "El Campín", 
    foto: "estadios/campin.png", 
    capacidad: 39000 
    },

   "América": { 
    nombre: "Pascual Guerrero", 
    foto: "estadios/pascual.png", 
    capacidad: 37900 
    },

   "Atlético FC": { 
    nombre: "Pascual Guerrero", 
    foto: "estadios/pascual.png", 
    capacidad: 37900 
    },

   "Boca Jrs. Cali": { 
    nombre: "Pascual Guerrero", 
    foto: "estadios/pascual.png", 
    capacidad: 37900 
    },

   "CA Boca Jrs": { 
    nombre: "Pascual Guerrero", 
    foto: "estadios/pascual.png", 
    capacidad: 37900 
    },

   "Inter Bogotá": { 
    nombre: "Metropolitano de Techo", 
    foto: "estadios/techo.png", 
    capacidad: 10000 
    },

   "Fortaleza": { 
    nombre: "Metropolitano de Techo", 
    foto: "estadios/techo.png", 
    capacidad: 10000 
    },

   "R.Cundinamarca": { 
    nombre: "Municipal de Mosquera", 
    foto: "estadios/mosquera.png", 
    capacidad: 5440 
    },

   "Tigres": { 
    nombre: "Metropolitano de Techo", 
    foto: "estadios/techo.png", 
    capacidad: 10000 
    },

   "Equidad": { 
    nombre: "Metropolitano de Techo", 
    foto: "estadios/techo.png", 
    capacidad: 10000 
    },

   "B.Chico": { 
    nombre: "La Independencia", 
    foto: "estadios/independencia.png", 
    capacidad: 20000 
    },

   "Patriotas": { 
    nombre: "La Independencia", 
    foto: "estadios/independencia.png", 
    capacidad: 20000 
    },
   "Lanceros B.": { 
    nombre: "La Independencia", 
    foto: "estadios/independencia.png", 
    capacidad: 20000 
    },

   "Expreso Rojo": { 
    nombre: "Luis Carlos Galan", 
    foto: "estadios/galan.png", 
    capacidad: 8000 
    },

   "A.Petrolera": { 
    nombre: "Daniel Villa Zapata", 
    foto: "estadios/villazapata.png", 
    capacidad: 10400 
    },

   "Oro Negro": { 
    nombre: "Daniel Villa Zapata", 
    foto: "estadios/villazapata.png", 
    capacidad: 10400 
    },

   "Junior": { 
    nombre: "Metropolitano", 
    foto: "estadios/metro.png", 
    capacidad: 46700 
    },

   "Uniautonoma": { 
    nombre: "Metropolitano", 
    foto: "estadios/metro.png", 
    capacidad: 46700 
    },

   "Llaneros": { 
    nombre: "Bello Horizonte", 
    foto: "estadios/villavicencio.png", 
    capacidad: 15000 
    },

   "Centauros V.": { 
    nombre: "Bello Horizonte", 
    foto: "estadios/villavicencio.png", 
    capacidad: 15000 
    },

   "Alianza": { 
    nombre: "Armando Maestre Pavajeau", 
    foto: "estadios/maestre.png", 
    capacidad: 11500 
    },

   "Valledupar": { 
    nombre: "Armando Maestre Pavajeau", 
    foto: "estadios/maestre.png", 
    capacidad: 11500 
    },

   //Estadios con equipo Unico
   "Bucaramanga": { 
    nombre: "Americo Montanini", 
    foto: "estadios/americo.png", 
    capacidad: 25000 
    },

   "Cali": { 
    nombre: "Deportivo Cali", 
    foto: "estadios/cali.png", 
    capacidad: 42000 
    },

   "Tolima": { 
    nombre: "Manuel Murillo Toro", 
    foto: "estadios/mamut.png", 
    capacidad: 30000 
    },

   "Águilas": { 
    nombre: "Alberto Grisales", 
    foto: "estadios/grisales.png", 
    capacidad: 14000 
    },

   "Once Caldas": { 
    nombre: "Palogrande", 
    foto: "estadios/palogrande.png", 
    capacidad: 35850 
    },

   "Pereira": { 
    nombre: "Hernán Ramírez Villegas", 
    foto: "estadios/ramirez.png", 
    capacidad: 30300 
    },

   "Envigado": { 
    nombre: "Polideportivo Sur", 
    foto: "estadios/polideportivo.png", 
    capacidad: 14000 
    },

   "U.Magdalena": { 
    nombre: "Sierra Nevada", 
    foto: "estadios/nevada.png", 
    capacidad: 16000 
    },

   "Cucuta": { 
    nombre: "General Santander", 
    foto: "estadios/general.png", 
    capacidad: 42000 
    },

   "Quindio": { 
    nombre: "Centenario de Armenia", 
    foto: "estadios/centenario.png", 
    capacidad: 20700 
    },

   "Pasto": { 
    nombre: "Departamental Libertad", 
    foto: "estadios/departamental.png", 
    capacidad: 20660 
    },

   "Real Cartagena": { 
    nombre: "Jaime Moron", 
    foto: "estadios/moron.png", 
    capacidad: 16000 
    },

   "Jaguares": { 
    nombre: "Jaraguay", 
    foto: "estadios/jaraguay.png", 
    capacidad: 12000 
    },

   "Inter Palmira": { 
    nombre: "Francisco Rivera Escobar", 
    foto: "estadios/rivera.png", 
    capacidad: 15300 
    },

   "Barranquilla": { 
    nombre: "Romelio Martinez", 
    foto: "estadios/romelio.png", 
    capacidad: 8600 
    },

   "Unicosta": { 
    nombre: "Romelio Martinez", 
    foto: "estadios/romelio.png", 
    capacidad: 8600 
    },

   "R.Santander": { 
    nombre: "Villa Concha", 
    foto: "estadios/concha.png", 
    capacidad: 5500 
    },

   "Orsomarso": { 
    nombre: "Daniel Villa Zapata", 
    foto: "estadios/villazapata.png", 
    capacidad: 10400 
    },

   "Leones": { 
    nombre: "Metropolitano de Itagüí", 
    foto: "estadios/ditaires.png", 
    capacidad: 12000 
    },

   "Bogotá": { 
    nombre: "Olaya Herrera", 
    foto: "estadios/olaya.png", 
    capacidad: 2500 
    },

   "Ind.Yumbo": { 
    nombre: "Raul Miranda", 
    foto: "estadios/raul.png", 
    capacidad: 3500 
    },

   "P.Casanare": { 
    nombre: "Santiago Atalayas", 
    foto: "estadios/atalayas.png", 
    capacidad: 10000 
    },

   "U.Popayan": { 
    nombre: "Ciro Lopez", 
    foto: "estadios/ciro.png", 
    capacidad: 5000 
    },

   "Fiorentina": { 
    nombre: "Alberto Buitrago", 
    foto: "estadios/buitrago.png", 
    capacidad: 6000 
    },

   "Huila": { 
    nombre: "Plazas Alcid", 
    foto: "estadios/gpa.png", 
    capacidad: 12000 
    },

   "R.Sincelejo": { 
    nombre: "Cumplido Sierra", 
    foto: "estadios/cumplido.png", 
    capacidad: 8000 
    },

    "Bajo Cauca": { 
    nombre: "Orlando Anibal Monroy", 
    foto: "estadios/oam.png", 
    capacidad: 4000 
    },

    "R.San Andres": { 
    nombre: " Erwin O'Neil", 
    foto: "estadios/erwin.png", 
    capacidad: 5000 
    },

   "Cortuluá": { 
    nombre: "12 de Octubre", 
    foto: "estadios/octubre.png", 
    capacidad: 16000 
    }
};


function mostrarEstadio(nombreEquipo) {
  const estadio = estadiosEquipos[nombreEquipo];
  if (!estadio) return;

  document.getElementById("nombreEstadio").innerText = estadio.nombre;
  document.getElementById("fotoEstadio").src = estadio.foto;
  document.getElementById("capacidadEstadio").innerText = `: ${estadio.capacidad.toLocaleString()}`;
  
}

let taquillaCobrada = false;

function simularTaquilla() {
  if (taquillaCobrada) return;

  const estadio = estadiosEquipos[equipoUsuario];
  if (!estadio) return;

  const capacidad = estadio.capacidad;
  const fuerza = obtenerFuerzaTotal(equipoUsuario);

  let porcentajeMin = 0;
  let porcentajeMax = 0;

  // 🔥 Clasificación por fuerza
if (fuerza >= 72) {
  porcentajeMin = 0.30;
  porcentajeMax = 0.50;
} else if (fuerza >= 69) {
  porcentajeMin = 0.25;
  porcentajeMax = 0.42;
} else if (fuerza >= 67) {
  porcentajeMin = 0.20;
  porcentajeMax = 0.35;
} else if (fuerza >= 63) {
  porcentajeMin = 0.15;
  porcentajeMax = 0.28;
} else if (fuerza >= 57) {
  porcentajeMin = 0.10;
  porcentajeMax = 0.20;
} else {
  porcentajeMin = 0.05;
  porcentajeMax = 0.15;
}

  const porcentaje =
    Math.random() * (porcentajeMax - porcentajeMin) + porcentajeMin;

  const asistenciaPromedio = Math.round(capacidad * porcentaje);

  // 💰 Multiplicador económico bajo
/*
  const ingresoSemestre = Math.round(asistenciaPromedio * 900);
*/
  const precioEntrada = Math.random() * (80 - 55) + 55;
  const ingresoSemestre = Math.round(asistenciaPromedio *
        precioEntrada);

  // 🔒 Límite entre 0 y 10M
  const ingresoFinal = Math.min(ingresoSemestre, 10000000);

  sumarPresupuesto(ingresoFinal);

  balanceEconomico.taquilla += ingresoFinal;
  actualizarBalanceUI();

  taquillaCobrada = true;

  document.getElementById("resultadoAsistencia").innerText =
    ` ${asistenciaPromedio.toLocaleString()}`;

  document.getElementById("resultadoTaquilla").innerText =
    ` $${ingresoFinal.toLocaleString()}`;
}
