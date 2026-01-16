

//PLANTILLAS
const plantillasJugadores = {
  "Nacional": [
  { nombre: "D.Ospina", edad: 37, media: 73, posicion: "PO" , foto: "img/jugadores/nacional/ospina.png"},
  { nombre: "H.Castillo", edad: 32, media: 68, posicion: "PO" , foto: "img/jugadores/nacional/castillo.png"},
  { nombre: "L.Marquinez", edad: 22, media: 65, posicion: "PO" , foto: "img/jugadores/nacional/marquinez.png"},

  { nombre: "A.Roman", edad: 30, media: 72, posicion: "LD" , foto: "img/jugadores/nacional/roman.png"},
  { nombre: "M.Casco", edad: 37, media: 68, posicion: "LI" , foto: "img/jugadores/nacional/casco.png", nacionalidad: "argentina"},
  { nombre: "W.Tesillo", edad: 35, media: 72, posicion: "DFC" , foto: "img/jugadores/nacional/tesillo.png" },
  { nombre: "J.J.Arias", edad: 22, media: 64, posicion: "DFC" , foto: "img/jugadores/nacional/jjarias.png"},
  { nombre: "C.Haydar", edad: 24, media: 66, posicion: "DFC" , foto: "img/jugadores/nacional/haydar.png"},
  { nombre: "S.Velasquez", edad: 22,  media: 66, posicion: "LI", foto: "img/jugadores/nacional/samuel.png"   },

  { nombre: "E.Cardona", edad: 33, media: 73, posicion: "MO" , foto: "img/jugadores/nacional/cardona.png" },
  { nombre: "J.Bauza", edad: 29, media: 69, posicion: "MO" , foto: "img/jugadores/nacional/bauza.png", nacionalidad: "argentina"},
  { nombre: "M.Uribe", edad: 34, media: 73, posicion: "MD" , foto: "img/jugadores/nacional/uribe.png"},
  { nombre: "J.Campuzano", edad: 29, media: 73, posicion: "MD" , foto: "img/jugadores/nacional/campuzano.png" },
  { nombre: "J.Rengifo", edad: 20, media: 64, posicion: "MO" },
  { nombre: "E.Rivero", edad: 19, media: 64, posicion: "MD" , foto: "img/jugadores/nacional/rivero.png"},

  { nombre: "A.Morelos", edad: 29, media: 72, posicion: "DC" , foto: "img/jugadores/nacional/morelos.png"},
  { nombre: "A.Sarmiento", edad: 27, media: 68, posicion: "EI" , foto: "img/jugadores/nacional/sarmiento.png"},
  { nombre: "D.Asprilla", edad: 33, media: 68, posicion: "ED" , foto: "img/jugadores/nacional/asprilla.png"},
  { nombre: "M.Moreno", edad: 29, media: 76, posicion: "EI" , foto: "img/jugadores/nacional/marlos.png"},
  { nombre: "Emilio A.", edad: 20, media: 65, posicion: "DC" , foto: "img/jugadores/nacional/emilio.png" },
  { nombre: "N.Rodriguez", edad: 21, media: 65, posicion: "ED" }
],

"Millonarios": [
  { nombre: "G.de Amores", edad: 31, media: 66, posicion: "PO"  , foto: "img/jugadores/A/amores.png" , nacionalidad: "uruguay"},
  { nombre: "D.Novoa", edad: 36, media: 67, posicion: "PO"  , foto: "img/jugadores/N/novoa.png"},

  { nombre: "A.Llinás", edad: 28, media: 72, posicion: "DFC" , foto: "img/jugadores/L/llinas.png" },
  { nombre: "D.Banguero", edad: 36, media: 66, posicion: "LI"  , foto: "img/jugadores/B/banguero.png"},
  { nombre: "S.Mosquera", edad: 31, media: 67, posicion: "DFC"  , foto: "img/jugadores/M/mosquera.png"},
  { nombre: "J.Arias", edad: 32, media: 67, posicion: "DFC" , foto: "img/jugadores/J/jarias.png"},
  { nombre: "S.Valencia", edad: 29, media: 67, posicion: "LI" , foto: "img/jugadores/S/sval.png" },
  { nombre: "S.Martin", edad: 20, media: 64, posicion: "LD" },
  { nombre: "Moreno Paz", edad: 23, media: 64, posicion: "DFC" },

  { nombre: "D.Macalister", edad: 39, media: 67, posicion: "MO"  , foto: "img/jugadores/M/maca.png"},
  { nombre: "M.Garcia", edad: 27, media: 67, posicion: "MD" , foto: "img/jugadores/M/mateog.png" },
  { nombre: "R.Ureña", edad: 32, media: 68, posicion: "MD" , foto: "img/jugadores/U/urena.png" , nacionalidad: "chile"},
  { nombre: "Darwin Quintero", edad: 38, media: 69, posicion: "MO" , foto: "img/jugadores/D/darwin.png" },
  { nombre: "S.Vega", edad: 27, media: 65, posicion: "MD" },
  { nombre: "Dewar V.", edad: 24, media: 65, posicion: "MD" },
  { nombre: "S.del Castillo", edad: 21, media: 66, posicion: "MO" },

  { nombre: "J.Angulo", edad: 23, media: 67, posicion: "EI", foto: "img/jugadores/J/jas.png"  },
  { nombre: "Leo Castro", edad: 33, media: 70, posicion: "DC" , foto: "img/jugadores/L/leo.png" },
  { nombre: "R.Falcao", edad: 39, media: 73, posicion: "DC"  , foto: "img/jugadores/F/falcao.png"},
  { nombre: "R.Contreras", edad: 30, media: 67, posicion: "DC"  , foto: "img/jugadores/C/contreras.png", nacionalidad: "argentina"},
  { nombre: "A.Castro", edad: 31, media: 66, posicion: "EI" , foto: "img/jugadores/A/alex.png" },
  { nombre: "J.Hurtado", edad: 22, media: 65, posicion: "DC" },
  { nombre: "Beckham C.", edad: 22, media: 68, posicion: "EI" , foto: "img/jugadores/B/beckham.png"}
  
],

"América": [
  { nombre: "J.Soto", edad: 32, media: 68, posicion: "PO"  , foto: "img/jugadores/S/soto.png"},
  { nombre: "Jean", edad: 30, media: 71, posicion: "PO"  , foto: "img/jugadores/J/jean.png", nacionalidad: "Brasil"},
  
  { nombre: "D.Bocanegra", edad: 38, media: 65, posicion: "DFC" , foto: "img/jugadores/B/bocanegra.png" },
  { nombre: "D.Rosero", edad: 32, media: 66, posicion: "DFC" , foto: "img/jugadores/R/rosero.png" },
  { nombre: "N.Hernandez", edad: 27, media: 66, posicion: "DFC" , foto: "img/jugadores/N/nico.png" },
  { nombre: "A.Guardia", edad: 35, media: 65, posicion: "DFC" , foto: "img/jugadores/G/guardia.png" },
  { nombre: "M.Torres", edad: 29,  media: 68, posicion: "DFC" , foto: "img/jugadores/M/marlon.png"  },
  { nombre: "O.Bertel", edad: 29, media: 67, posicion: "LI" , foto: "img/jugadores/B/bertel.png" },
  { nombre: "M.Mina", edad: 26, media: 66, posicion: "LI" , foto: "img/jugadores/M/mina.png" },
  { nombre: "C.Tovar", edad: 27, media: 66, posicion: "DFC"  , foto: "img/jugadores/T/tovar.png"},
  { nombre: "Mateo C.", edad: 22, media: 66, posicion: "LD" , foto: "img/jugadores/M/mateo.png"},

  { nombre: "J.Escobar", edad: 21, media: 65, posicion: "MD" , foto: "img/jugadores/J/josen.png"},
  { nombre: "C.Sierra", edad: 35, media: 66, posicion: "MD" , foto: "img/jugadores/C/csierra.png" },
  { nombre: "R.Carrascal", edad: 33, media: 70, posicion: "MO"  , foto: "img/jugadores/C/carrascal.png"},
  { nombre: "Y.Guzman", edad: 27, media: 72, posicion: "MO" , foto: "img/jugadores/G/guzman.png" },
 
  { nombre: "Y.Garces", edad: 19, media: 65, posicion: "DC" , foto: "img/jugadores/P/papula.png" },
  { nombre: "A.Ramos", edad: 39, media: 70, posicion: "DC" , foto: "img/jugadores/A/adrian.png"},
  { nombre: "J.Murillo", edad: 30, media: 66, posicion: "ED" , foto: "img/jugadores/M/murillo.png", nacionalidad: "venezuela" },
  { nombre: "D.Machis", edad: 32, media: 68, posicion: "EI" , foto: "img/jugadores/M/machis.png", nacionalidad: "venezuela" },
  { nombre: "D.Borrero", edad: 23, media: 66, posicion: "EI"  , foto: "img/jugadores/B/borrero.png"}
],

"Junior": [
  { nombre: "M.Silveira", edad: 25, media: 72, posicion: "PO"  , foto: "img/jugadores/S/silveira.png", nacionalidad: "uruguay"},
  { nombre: "J.Martinez", edad: 32, media: 68, posicion: "PO" , foto: "img/jugadores/J/jeferson.png" },

  { nombre: "J.Guerrero", edad: 24, media: 66, posicion: "LD"  , foto: "img/jugadores/J/jhomier.png"},
  { nombre: "E.Herrera", edad: 27, media: 65, posicion: "LD" , foto: "img/jugadores/H/herrera.png" },
  { nombre: "J.Peña", edad: 26, media: 71, posicion: "DFC"  , foto: "img/jugadores/J/jermein.png"},
  { nombre: "J.Pestaña", edad: 28, media: 68, posicion: "DFC" , foto: "img/jugadores/J/jeanpes.png"},
  { nombre: "L.Monzon", edad: 24, media: 69, posicion: "DFC"  , foto: "img/jugadores/M/monzon.png", nacionalidad: "uruguay"},
  { nombre: "Y.Suarez", edad: 28, media: 68, posicion: "LI"  , foto: "img/jugadores/Y/yeison.png"},
  { nombre: "D.Rivera", edad: 26, media: 67, posicion: "DFC"  , foto: "img/jugadores/D/drivera.png"},

  { nombre: "Y.Chara", edad: 34, media: 71, posicion: "MO" , foto: "img/jugadores/C/chara.png" },
  { nombre: "G.Celis", edad: 32, media: 69, posicion: "MD" , foto: "img/jugadores/C/celis.png" },
  { nombre: "J.Sarmiento", edad: 26, media: 67, posicion: "MO"  , foto: "img/jugadores/S/sarmiento.png"},
  { nombre: "H.Rivera", edad: 32, media: 66, posicion: "MD"  , foto: "img/jugadores/H/hrivera.png"},
  { nombre: "F.Angel", edad: 25, media: 65, posicion: "MD"  , foto: "img/jugadores/F/fabian.png"},
  { nombre: "J.Rios", edad: 34, media: 66, posicion: "MD" , foto: "img/jugadores/J/jrios.png" },
  { nombre: "J.Rivas", edad: 34, media: 65, posicion: "MD" , foto: "img/jugadores/R/rivas.png" },

  { nombre: "C.Barrios", edad: 27, media: 69, posicion: "ED"  , foto: "img/jugadores/B/barrios.png"},
  { nombre: "K.Perez", edad: 28, media: 67, posicion: "ED" , foto: "img/jugadores/K/kperez.png" },
  { nombre: "G.Paiva", edad: 28, media: 69, posicion: "DC"  , foto: "img/jugadores/P/paiva.png" , nacionalidad: "paraguay"},
  { nombre: "L.Muriel", edad: 34, media: 68, posicion: "DC" , foto: "img/jugadores/M/muriel.png"},
  { nombre: "B.Castrillon", edad: 26, media: 67, posicion: "EI"  , foto: "img/jugadores/C/castrillon.png"},
  { nombre: "C.Bacca", edad: 39, media: 68, posicion: "DC"  , foto: "img/jugadores/B/bacca.png"},
  { nombre: "T.Gutierrez", edad: 40, media: 69, posicion: "DC" , foto: "img/jugadores/T/teo.png" }
],

"Santa Fe": [
  { nombre: "A.Marmolejo", edad: 34, media: 73, posicion: "PO"  , foto: "img/jugadores/santafe/marmolejo.png"},
  { nombre: "W.Asprilla", edad: 26, media: 68, posicion: "PO"  , foto: "img/jugadores/santafe/weimar.png"},

  { nombre: "V.Moreno", edad: 31, media: 67, posicion: "DFC"  , foto: "img/jugadores/santafe/victor.png"},
  { nombre: "E.Olivera", edad: 35, media: 68, posicion: "DFC"  , foto: "img/jugadores/santafe/turro.png", nacionalidad: "argentina"},
  { nombre: "I.Scarpeta", edad: 29, media: 67, posicion: "DFC"  , foto: "img/jugadores/santafe/scarpeta.png"},
  { nombre: "C.Mafla", edad: 32, media: 68, posicion: "LI"  , foto: "img/jugadores/santafe/mafla.png"},
  { nombre: "H.Palacios", edad: 32, media: 69, posicion: "LD"  , foto: "img/jugadores/santafe/helibelton.png"},
  { nombre: "Jeison A.", edad: 29, media: 63, posicion: "LI"  },

  { nombre: "Y.Velasquez", edad: 26, media: 68, posicion: "MD" , foto: "img/jugadores/santafe/yilmar.png" },
  { nombre: "D.Torres", edad: 35, media: 68, posicion: "MD"  , foto: "img/jugadores/santafe/danito.png"},
  { nombre: "A.Zapata", edad: 30, media: 66, posicion: "MO"  , foto: "img/jugadores/santafe/zapata.png"},
  { nombre: "E.Murillo", edad: 25, media: 67,   posicion: "MD" , foto: "img/jugadores/santafe/ewil.png" },
  { nombre: "J.Torres", edad: 22, media: 67, posicion: "MD"  , foto: "img/jugadores/santafe/kante.png"},
  { nombre: "F.Fagundez", edad: 25, media: 66, posicion: "MO"  },
  { nombre: "K.Toscano", edad: 21, media: 65, posicion: "MD"  },

  { nombre: "J.Ramos", edad: 33, media: 65, posicion: "DC"  },
  { nombre: "N.Bustos", edad: 27, media: 68, posicion: "DC"  },
  { nombre: "L.Palacios", edad: 24, media: 66, posicion: "ED"  },
  { nombre: "H.Rodallega", edad: 40, media: 72, posicion: "DC"  , foto: "img/jugadores/santafe/hugol.png"},
  { nombre: "O.Frasica", edad: 32, media: 67, posicion: "EI"  , foto: "img/jugadores/santafe/frasika.png"}

],

 "Cali": [
  { nombre: "P.Gallese", edad: 35, media: 73, posicion: "PO"  },
  { nombre: "M.Espindola", edad: 27, media: 65, posicion: "PO"  },

  { nombre: "F.Viafara", edad: 33, media: 67, posicion: "LD", foto: "img/jugadores/cali/viafara.png" },
  { nombre: "F.Alvarez", edad: 22, media: 65, posicion: "DFC"  },
  { nombre: "J.Caldera", edad: 23, media: 66, posicion: "DFC"  },
  { nombre: "F.Aguilar", edad: 32, media: 66, posicion: "DFC" , foto: "img/jugadores/cali/aguilar.png"},
  { nombre: "J.Quiñones", edad: 36, media: 66, posicion: "DFC" , foto: "img/jugadores/cali/juliqui.png"},
  { nombre: "A.Correa", edad: 35, media: 65, posicion: "LI"  },

  { nombre: "A.Colorado", edad: 26, media: 65, posicion: "MD" , foto: "img/jugadores/cali/colorado.png"},
  { nombre: "Yani Q.", edad: 23, media: 64, posicion: "MD", foto: "img/jugadores/cali/yani.png" },
  { nombre: "D.Giraldo", edad: 33, media: 68, posicion: "MD" },
  { nombre: "E.Reynoso", edad: 30, media: 65, posicion: "MO"  },
  { nombre: "R.Pajaro", edad: 23, media: 66, posicion: "MD" , foto: "img/jugadores/cali/pajaro.png" },
  { nombre: "Johan M.", edad: 23, media: 66, posicion: "MO" , foto: "img/jugadores/cali/johanm.png"},

  { nombre: "J.Dinenno", edad: 31, media: 68, posicion: "DC"  },
  { nombre: "J.Aponza", edad: 20, media: 63, posicion: "DC" },
  { nombre: "F.Mimbacas", edad: 23, media: 64, posicion: "DC", foto: "img/jugadores/cali/mimbacas.png", nacionalidad: "uruguay" },
  { nombre: "A.Hurtado", edad: 38, media: 66, posicion: "EI" , foto: "img/jugadores/cali/aviles.png"}
],

  "Medellín": [
    { nombre: "S.Ichazo", edad: 33, media: 68, posicion: "PO", foto: "img/jugadores/pereira/ichazo.png", nacionalidad: "uruguay" },
    { nombre: "E.Chaux", edad: 34, media: 66, posicion: "PO", foto: "img/jugadores/dim/chaux.png" },

    { nombre: "J.Ortiz", edad: 27, media: 66, posicion: "DFC", foto: "img/jugadores/dim/ortiz.png" },
    { nombre: "K.Mantilla", edad: 22, media: 66, posicion: "DFC", foto: "img/jugadores/dim/kmantilla.png" },
    { nombre: "L.Chaverra", edad: 28, media: 66, posicion: "LD", foto: "img/jugadores/dim/leyser.png" },
    { nombre: "D.Londoño", edad: 31, media: 67, posicion: "LI", foto: "img/jugadores/dim/londono.png" },
    { nombre: "E.Mena", edad: 28, media: 67, posicion: "LD", foto: "img/jugadores/dim/esneyder.png" },

    { nombre: "L.Berrio", edad: 27, media: 67, posicion: "MO", foto: "img/jugadores/dim/leider.png" },
    { nombre: "Baldomero P.", edad: 33, media: 66, posicion: "MD", foto: "img/jugadores/dim/baldomero.png" },
    { nombre: "Didier M.", edad: 34, media: 72, posicion: "MD", foto: "img/jugadores/dim/didier.png" },

    { nombre: "Y.Gonzalez", edad: 31, media: 68, posicion: "ED", foto: "img/jugadores/dim/yony.png" },
    { nombre: "F.Fydrizewski", edad: 32, media: 69, posicion: "DC", foto: "img/jugadores/dim/polaco.png", nacionalidad: "argentina" },
    { nombre: "F.Chaverra", edad: 25, media: 67, posicion: "EI", foto: "img/jugadores/dim/chaverra.png" }
  ],

"Tolima": [
  { nombre: "N.Volpi", edad: 33, media: 67, posicion: "PO" , foto: "img/jugadores/tolima/volpi.png" , nacionalidad: "brasil" },

  { nombre: "Y.Hurtado", edad: 29,  media: 66, posicion: "LD"  , foto: "img/jugadores/tolima/yhormar.png" },
  { nombre: "Jan Angulo", edad: 24,  media: 65, posicion: "DFC"  },
  { nombre: "J.Hernandez", edad: 26,  media: 66, posicion: "LI"  },
  { nombre: "J.Mera", edad: 23,  media: 65, posicion: "DFC"  , foto: "img/jugadores/tolima/mera.png" },
  { nombre: "A.Angulo", edad: 29,   media: 67,  posicion: "DFC", foto: "img/jugadores/tolima/aangulo.png" },

  { nombre: "J.Nieto",  edad: 32,  media: 65, posicion: "MD", foto: "img/jugadores/tolima/nieto.png"   },
  { nombre: "S.Guzman", edad: 28, media: 66,   posicion: "MD" , foto: "img/jugadores/tolima/mariachi.png" },
  { nombre: "J.Torres", edad: 21, media: 67,   posicion: "MO" , foto: "img/jugadores/tolima/tatay.png" },
  { nombre: "B.Rovira", edad: 28,  media: 66, posicion: "MD"  , foto: "img/jugadores/tolima/rovira.png" },

  { nombre: "J.Gonzalez", edad: 24,  media: 67, posicion: "ED"  , foto: "img/jugadores/tolima/jersson.png" },
  { nombre: "G.Lencina", edad: 28, media: 66, posicion: "DC" , foto: "img/jugadores/tolima/lencina.png" , nacionalidad: "argentina"},
  { nombre: "B.Larregui", edad: 24,  media: 65, posicion: "DC", foto: "img/jugadores/tolima/larregui.png" , nacionalidad: "uruguay" },
  { nombre: "L.Sandoval", edad: 26, media: 66, posicion: "DC" , foto: "img/jugadores/tolima/sandoval.png" },
  { nombre: "E.Lopez", edad: 30, media: 67, posicion: "EI"  , foto: "img/jugadores/tolima/lopez.png"},
  { nombre: "A.Parra", edad: 28, media: 65,  posicion: "EI" , foto: "img/jugadores/tolima/parra.png"  }
],

"Once Caldas": [
  { nombre: "J.Aguirre", edad: 33, media: 66, posicion: "PO" , foto: "img/jugadores/once/aguirre.png" },
  { nombre: "J.Parra", edad: 25, media: 66, posicion: "PO" , foto: "img/jugadores/once/joan.png" },

  { nombre: "J.Castaño", edad: 27, media: 65, posicion: "DFC" , foto: "img/jugadores/once/castano.png" },
  { nombre: "K.Cuesta", edad: 25, media: 65, posicion: "DFC"  , foto: "img/jugadores/once/kcuesta.png"},
  { nombre: "J.Riquett", edad: 35, media: 64, posicion: "DFC" , foto: "img/jugadores/once/riquett.png" },
  { nombre: "J.Cuesta", edad: 28, media: 65, posicion: "LD"  , foto: "img/jugadores/once/jcuesta.png"},
  { nombre: "K.Tamayo", edad: 26, media: 64, posicion: "LI"  , foto: "img/jugadores/once/tamayo.png"},

  { nombre: "Niche Sanchez", edad: 25, media: 66, posicion: "MO"  , foto: "img/jugadores/once/niche.png"},
  { nombre: "I.Rojas", edad: 28, media: 65, posicion: "MD"  , foto: "img/jugadores/once/rojas.png"},
  { nombre: "A.Roa", edad: 32, media: 66, posicion: "MO" , foto: "img/jugadores/once/roa.png"},
  { nombre: "J.Alvarado", edad: 26, media: 66, posicion: "MD" , foto: "img/jugadores/once/alvarado.png" },

  { nombre: "D.Moreno", edad: 40, media: 70, posicion: "DC" , foto: "img/jugadores/once/dayro.png" },
  { nombre: "M.Zuleta", edad: 23, media: 66, posicion: "EI"  , foto: "img/jugadores/once/zuleta.png"},
  { nombre: "J.Zapata", edad: 25, media: 66, posicion: "EI" , foto: "img/jugadores/once/jefry.png" },
  { nombre: "Pipe Gomez", edad: 26, media: 66, posicion: "EI" , foto: "img/jugadores/once/pipe.png" },
  { nombre: "M.Barrios", edad: 34, media: 66, posicion: "ED"  , foto: "img/jugadores/once/michael.png"}
],

"Pereira": [
  { nombre: "A.Rodriguez", edad: 25, media: 66, posicion: "PO", foto: "img/jugadores/pereira/alejo.png" },

  { nombre: "W.Pacheco", edad: 30, media: 66, posicion: "LD" , foto: "img/jugadores/pereira/walmer.png" },
  { nombre: "F.Delgado", edad: 26, media: 65, posicion: "LI" , foto: "img/jugadores/pereira/fabio.png" },
  { nombre: "J.Bazan", edad: 20, media: 65, posicion: "DFC" },
  { nombre: "S.Aguilar", edad: 27, media: 65, posicion: "DFC" },

  { nombre: "D.Mendoza", edad: 25, media: 63, posicion: "MD" },
  { nombre: "J.Bermudez", edad: 24, media: 63, posicion: "MD" },
  { nombre: "E.Moreno", edad: 31, media: 64, posicion: "MO" },

  { nombre: "Y.Quiñones", edad: 23, media: 66, posicion: "ED" , foto: "img/jugadores/pereira/yuber.png" },
  { nombre: "A.Plata", edad: 35, media: 65, posicion: "ED" },
  { nombre: "M.Perez", edad: 35, media: 65, posicion: "DC" , foto: "img/jugadores/pereira/marco.png" },
  { nombre: "G.Torres", edad: 29, media: 66, posicion: "ED" , foto: "img/jugadores/pereira/gtorres.png" }
],

  "Pasto": [
  { nombre: "G.Banguera", edad: 29, media: 66, posicion: "PO" , foto: "img/jugadores/pasto/banguera.png" },

  { nombre: "N.Gil", edad: 28, media: 65, posicion: "DFC", foto: "img/jugadores/pasto/giln.png"  },
  { nombre: "S.Jimenez", edad: 27, media: 66, posicion: "LD" , foto: "img/jugadores/pasto/jimenez.png" },
  { nombre: "F.Torijano", edad: 37, media: 66, posicion: "DFC" , foto: "img/jugadores/pasto/torijano.png" },
  { nombre: "M.Garavito", edad: 25, media: 65, posicion: "LI", foto: "img/jugadores/patriotas/garavito.png" },

  { nombre: "H.Mansilla", edad: 34, media: 65, posicion: "MD" , foto: "img/jugadores/pasto/mansilla.png" },
  { nombre: "E.Serje", edad: 30, media: 64, posicion: "MD" },
  { nombre: "D.Chavez", edad: 28, media: 65, posicion: "MO" },

  { nombre: "Andrey E.", edad: 31, media: 67, posicion: "EI" },
  { nombre: "J.Micolta", edad: 23, media: 66, posicion: "EI" },
  { nombre: "W.Morelo", edad: 38, media: 67, posicion: "DC", foto: "img/jugadores/pasto/morelo.png"  },
  { nombre: "M.Pisano", edad: 34, media: 66, posicion: "ED" , foto: "img/jugadores/pasto/pisano.png", nacionalidad: "argentina" },
  { nombre: "J.Valois", edad: 21, media: 66, posicion: "DC" , foto: "img/jugadores/pasto/valois.png" }
],

"Bucaramanga": [
  { nombre: "A.Quintana", edad: 31, media: 72, posicion: "Portero" , foto: "img/jugadores/bucaramanga/aldair.png" },
  { nombre: "L.Vasquez", edad: 29, media: 66, posicion: "Portero" , foto: "img/jugadores/bucaramanga/erney.png" },

  { nombre: "J.Mena", edad: 36, media: 66, posicion: "Defensa", foto: "img/jugadores/bucaramanga/mena.png"  },
  { nombre: "C.de las Salas", edad: 27, media: 65, posicion: "Defensa" , foto: "img/jugadores/bucaramanga/cdls.png" },
  { nombre: "J.Garcia", edad: 22, media: 65, posicion: "Defensa", foto: "img/jugadores/bucaramanga/joseg.png"  },
  { nombre: "C.Henao", edad: 36, media: 66, posicion: "Defensa", foto: "img/jugadores/bucaramanga/henao.png"  },
  { nombre: "C.Romaña", edad: 25, media: 65, posicion: "Defensa", foto: "img/jugadores/bucaramanga/romana.png"  },

  { nombre: "F.Sambueza", edad: 37, media: 71, posicion: "Volante", foto: "img/jugadores/bucaramanga/sambueza.png" , nacionalidad: "argentina" },
  { nombre: "F.Castro", edad: 33, media: 67, posicion: "Pivote", foto: "img/jugadores/bucaramanga/fabry.png"  },
  { nombre: "L.Florez", edad: 30, media: 65, posicion: "Pivote", foto: "img/jugadores/bucaramanga/leoflo.png" , nacionalidad: "venezuela" },
  { nombre: "N.Moreno", edad: 28, media: 67, posicion: "Volante", foto: "img/jugadores/bucaramanga/neyder.png"  },
  { nombre: "F.Charrupi", edad: 24, media: 65, posicion: "Volante", foto: "img/jugadores/bucaramanga/felix.png"  },
  { nombre: "G.Charrupi", edad: 21, media: 65, posicion: "Volante" , foto: "img/jugadores/bucaramanga/gustavo.png" },

  { nombre: "L.Pons", edad: 35, media: 71, posicion: "Delantero", foto: "img/jugadores/bucaramanga/pons.png" , nacionalidad: "argentina"  },
  { nombre: "Faber Gil", edad: 30, media: 66, posicion: "Delantero", foto: "img/jugadores/bucaramanga/gil.png"  },
  { nombre: "F.Hinestroza", edad: 35, media: 66, posicion: "Delantero" , foto: "img/jugadores/bucaramanga/fredy.png" }
  
],

"Alianza": [
  { nombre: "J.Chaverra", edad: 32, media: 65, posicion: "Portero" , foto: "img/jugadores/alianza/jchaverra.png" },
  { nombre: "J.Wallens", edad: 33, media: 65, posicion: "Portero", foto: "img/jugadores/alianza/wallens.png"  },

  { nombre: "P.Franco", edad: 34, media: 66, posicion: "Defensa" , foto: "img/jugadores/alianza/pefranco.png" },
  { nombre: "J.Figueroa", edad: 29, media: 66, posicion: "Defensa" , foto: "img/jugadores/alianza/figueroa.png" },
  
  { nombre: "W.Fernandez", edad: 27, media: 65, posicion: "Pivote" , foto: "img/jugadores/alianza/wiston.png" , nacionalidad: "uruguay"},

  { nombre: "F.Pardo", edad: 35, media: 68, posicion: "Delantero" , foto: "img/jugadores/alianza/pardo.png" },
  { nombre: "C.Lucumi", edad: 25, media: 67, posicion: "Delantero" , foto: "img/jugadores/alianza/lucumi.png" },
  { nombre: "A.del Valle", edad: 36, media: 65, posicion: "Delantero", foto: "img/jugadores/alianza/ayron.png"  }
],


"Inter Bogotá": [
  { nombre: "E.Esteban", edad: 25, media: 66, posicion: "Portero" , foto: "img/jugadores/equidad/eduar.png" },

  { nombre: "Y.Gomez", edad: 26, media: 66, posicion: "Portero" , foto: "img/jugadores/equidad/yimy.png" },

  { nombre: "W.Fariñez", edad: 27, media: 67, posicion: "Portero", foto: "img/jugadores/equidad/farinez.png", nacionalidad: "venezuela"  },

  { nombre: "K.Suarez", edad: 23, media: 65, posicion: "Defensa" , foto: "img/jugadores/equidad/kalazan.png" },

  { nombre: "M.Rodas", edad: 27, media: 65, posicion: "Defensa" , foto: "img/jugadores/equidad/rodas.png" },

  { nombre: "C.Vivas", edad: 23, media: 65, posicion: "Defensa", foto: "img/jugadores/equidad/vivas.png", nacionalidad: "venezuela"  },

  { nombre: "Y.Gomez", edad: 28, media: 66, posicion: "Defensa" , foto: "img/jugadores/equidad/yulian.png" },

  { nombre: "Y.Abonia", edad: 25, media: 64, posicion: "Defensa", foto: "img/jugadores/equidad/abonia.png"  },

  { nombre: "M.Monaco" , edad: 23, media: 65, posicion: "Volante", foto: "img/jugadores/equidad/monaco.png", nacionalidad: "argentina"   },

  { nombre: "S.Mayo", edad: 22, media: 64, posicion: "Pivote" , foto: "img/jugadores/equidad/mayo.png" },

  { nombre: "F.Gonzalez", edad: 21, media: 66, posicion: "Volante" , foto: "img/jugadores/equidad/cepillo.png", nacionalidad: "uruguay" },

  { nombre: "R.Manjarrez", edad: 25, media: 65, posicion: "Volante" , foto: "img/jugadores/equidad/manjarrez.png" },

  { nombre: "F.Bone", edad: 29, media: 70, posicion: "Delantero", foto: "img/jugadores/equidad/bone.png" , nacionalidad: "uruguay" },

  { nombre: "J.Caballero", edad: 27, media: 66, posicion: "Delantero", foto: "img/jugadores/equidad/pino.png"  },

  { nombre: "J.Valencia", edad: 21, media: 65, posicion: "Delantero", foto: "img/jugadores/equidad/valencia.png"  },

  { nombre: "J.Bolivar", edad: 23, media: 63, posicion: "Delantero" , foto: "img/jugadores/equidad/bolivar.png", nacionalidad: "venezuela"},

  { nombre: "K.Parra", edad: 22, media: 66, posicion: "Delantero" , foto: "img/jugadores/equidad/parra.png" }
],

"Águilas": [

  { nombre: "D.Hernandez", edad: 25, media: 65, posicion: "Defensa" , foto: "img/jugadores/aguilas/hernandez.png" },
  { nombre: "S.Rodriguez", edad: 24, media: 65, posicion: "Defensa" , foto: "img/jugadores/aguilas/sebastian.png" },
  { nombre: "H.Lopez", edad: 34, media: 65, posicion: "Defensa" , foto: "img/jugadores/aguilas/lopez.png", nacionalidad: "argentina"  },
  { nombre: "M.Puerta", edad: 28, media: 66, posicion: "Defensa" , foto: "img/jugadores/aguilas/puerta.png" },
  { nombre: "J.Mena", edad: 20, media: 64, posicion: "Defensa" , foto: "img/jugadores/aguilas/mena.png" },

  { nombre: "J.Pineda", edad: 28, media: 67, posicion: "Volante", foto: "img/jugadores/aguilas/pineda.png"  },
  { nombre: "F.Lozano", edad: 32, media: 67, posicion: "Pivote" , foto: "img/jugadores/aguilas/lozano.png" },

  { nombre: "J.Rivaldo", edad: 22, media: 66, posicion: "Delantero" , foto: "img/jugadores/aguilas/rivaldo.png" },
  { nombre: "J.Obregon", edad: 28, media: 66, posicion: "Delantero", foto: "img/jugadores/aguilas/obregon.png"  },
  { nombre: "M.Ramirez", edad: 26, media: 67, posicion: "Delantero" , foto: "img/jugadores/aguilas/matias.png" , nacionalidad: "argentina" } 

],

"Fortaleza": [
  { nombre: "J.Garcia", edad: 20, media: 64, posicion: "Portero", foto: "img/jugadores/fortaleza/jordan.png"  },
  { nombre: "C.Santander", edad: 22, media: 62, posicion: "Portero", foto: "img/jugadores/fortaleza/santander.png"  },

  { nombre: "Y.Diaz", edad: 28, media: 65, posicion: "Defensa" , foto: "img/jugadores/fortaleza/yesid.png" },
  { nombre: "J.Marulanda", edad: 29, media: 66, posicion: "Defensa" , foto: "img/jugadores/fortaleza/marulanda.png" },
  { nombre: "L.Escorcia", edad: 21, media: 66, posicion: "Defensa" , foto: "img/jugadores/fortaleza/escorcia.png" },

  { nombre: "L.Pico", edad: 34, media: 67, posicion: "Pivote" , foto: "img/jugadores/fortaleza/pico.png" },
  { nombre: "A.Arroyo", edad: 23, media: 66, posicion: "Volante" , foto: "img/jugadores/fortaleza/arroyo.png" },
  { nombre: "J.Velasquez", edad: 30, media: 66, posicion: "Volante" , foto: "img/jugadores/fortaleza/velasquez.png" },
  
  { nombre: "A.Amaya", edad: 24, media: 65, posicion: "Delantero" , foto: "img/jugadores/fortaleza/amaya.png" }
],


"Llaneros": [
  { nombre: "M.Ortega", edad: 30, media: 65, posicion: "Portero" , foto: "img/jugadores/llaneros/ortega.png", nacionalidad: "mexico" },
  { nombre: "R.Romaña", edad: 28, media: 60, posicion: "Portero" },

  { nombre: "F.Meza", edad: 34, media: 67, posicion: "Defensa", foto: "img/jugadores/llaneros/meza.png"  },
  
  { nombre: "Y.Goez", edad: 26, media: 66, posicion: "Pivote" , foto: "img/jugadores/llaneros/goez.png" },
  { nombre: "M.Sierra", edad: 31, media: 65, posicion: "Pivote" , foto: "img/jugadores/llaneros/msierra.png" },
  { nombre: "A.Lopez", edad: 22, media: 65, posicion: "Pivote", foto: "img/jugadores/llaneros/lopez.png"  },


  { nombre: "D.Mantilla", edad: 28, media: 67, posicion: "Delantero" , foto: "img/jugadores/llaneros/mantilla.png" },
  { nombre: "E.Bodencer", edad: 25, media: 66, posicion: "Delantero" , foto: "img/jugadores/llaneros/bodencer.png" , nacionalidad: "argentina" }
  
 
],

"U.Magdalena": [
  { nombre: "J.Mattalia", edad: 33, media: 63, posicion: "Portero"  , foto: "img/jugadores/union/mattalia.png", nacionalidad: "argentina" },

  { nombre: "D.Mosquera", edad: 33, media: 63, posicion: "Defensa" , foto: "img/jugadores/union/dairon.png" },
  { nombre: "J.Lerma", edad: 22, media: 63, posicion: "Defensa"  , foto: "img/jugadores/union/lerma.png"},

   { nombre: "F.Cantillo", edad: 28, media: 67, posicion: "Pivote" , foto: "img/jugadores/union/cantillo.png" },
   { nombre: "J.Congo", edad: 27, media: 65, posicion: "Pivote" , foto: "img/jugadores/union/congo.png" },

  { nombre: "R.Marquez", edad: 27, media: 66, posicion: "Delantero" , foto: "img/jugadores/union/marquez.png" },
  { nombre: "R.Hinojosa", edad: 26, media: 65, posicion: "Volante" , foto: "img/jugadores/union/hinojosa.png" },
  { nombre: "M.Martinez", edad: 27, media: 65, posicion: "Delantero"  , foto: "img/jugadores/union/misael.png"}
],

"B.Chico": [
  { nombre: "D.Denis", edad: 33, media: 62, posicion: "Portero", foto: "img/jugadores/chico/denis.png", nacionalidad: "uruguay" },
  { nombre: "R.Caicedo", edad: 31, media: 61, posicion: "Portero" , foto: "img/jugadores/chico/rogerio.png"},

  { nombre: "F.Salas", edad: 28, media: 64, posicion: "Defensa", foto: "img/jugadores/chico/salas.png" },
  { nombre: "E.Peralta", edad: 24, media: 64, posicion: "Defensa", foto: "img/jugadores/chico/peralta.png", nacionalidad: "paraguay" },
  { nombre: "J.Ampudia", edad: 25, media: 65, posicion: "Defensa" , foto: "img/jugadores/chico/ampudia.png"},

  { nombre: "D.Ramirez", edad: 24, media: 65, posicion: "Volante", foto: "img/jugadores/chico/delio.png" },
  { nombre: "E.Camargo", edad: 23, media: 63, posicion: "Pivote", foto: "img/jugadores/chico/camargo.png" },

  { nombre: "M.Gomez", edad: 28, media: 64, posicion: "Delantero", foto: "img/jugadores/chico/nike.png" },
  { nombre: "J.Molina", edad: 32, media: 67, posicion: "Delantero" , foto: "img/jugadores/chico/molina.png"}
],

"Envigado": [
  { nombre: "A.Tovar", edad: 19, media: 63, posicion: "Portero", foto: "img/jugadores/envigado/tovar.png" },
  { nombre: "J.P.Montoya", edad: 27, media: 65, posicion: "Portero" , foto: "img/jugadores/envigado/juanpa.png"},

  { nombre: "J.Gamboa", edad: 24, media: 63, posicion: "Defensa" , foto: "img/jugadores/envigado/gamboa.png"},
  { nombre: "D.Palacios", edad: 21, media: 62, posicion: "Defensa", foto: "img/jugadores/envigado/dipal.png" },
  { nombre: "Neymar U.", edad: 21, media: 63, posicion: "Defensa" , foto: "img/jugadores/envigado/neymar.png"},
  { nombre: "B.Agron", edad: 24, media: 62, posicion: "Defensa", foto: "img/jugadores/envigado/agron.png" },

  { nombre: "W.Hurtado", edad: 21, media: 60, posicion: "Volante" , foto: "img/jugadores/envigado/hurtado.png"},
  { nombre: "Edison L.", edad: 26, media: 64, posicion: "Volante", foto: "img/jugadores/envigado/elopez.png" },
  { nombre: "L.Angulo", edad: 24, media: 62, posicion: "Pivote", foto: "img/jugadores/envigado/angulo.png" },

  { nombre: "S.Londoño", edad: 17, media: 64, posicion: "Delantero" , foto: "img/jugadores/envigado/londono.png"},
  { nombre: "B.Garces", edad: 32, media: 65, posicion: "Delantero" , foto: "img/jugadores/envigado/garces.png"},
  { nombre: "L.Diaz", edad: 21, media: 64, posicion: "Delantero", foto: "img/jugadores/envigado/diaz.png" }
],

// Segunda División 
   "Jaguares": [
  
  { nombre: "V.Brid", edad: 25, media: 60, posicion: "Portero", foto: "img/jugadores/jaguares/brid.png" },

  { nombre: "K.Saucedo", edad: 25, media: 64, posicion: "Defensa" , foto: "img/jugadores/jaguares/saucedo.png"},
  { nombre: "J.Altamiranda", edad: 25, media: 65, posicion: "Defensa", foto: "img/jugadores/jaguares/alta.png" },
  
  { nombre: "J.Herrera", edad: 24, media: 64, posicion: "Defensa", foto: "img/jugadores/jaguares/herrera.png" },

  { nombre: "J.Andrade", edad: 29, media: 64, posicion: "Volante", foto: "img/jugadores/jaguares/andrade.png" },
  { nombre: "J.Maza", edad: 31, media: 64, posicion: "Delantero" , foto: "img/jugadores/jaguares/maza.png"},
  { nombre: "J.Roa", edad: 31, media: 64, posicion: "Pivote", foto: "img/jugadores/jaguares/roa.png" },
  { nombre: "D.Padilla", edad: 31, media: 63, posicion: "Pivote" , foto: "img/jugadores/jaguares/padilla.png"},

  { nombre: "K.Lenis", edad: 24, media: 63, posicion: "Delantero" , foto: "img/jugadores/jaguares/lenis.png", nacionalidad: "panama"},
  { nombre: "A.Renteria", edad: 32, media: 68, posicion: "Delantero" , foto: "img/jugadores/jaguares/topo.png"}
],

"Real Cartagena": [
  { nombre: "A.Montes", edad: 25, media: 63, posicion: "Portero", foto: "img/jugadores/cartagena/montes.png" },

  { nombre: "J.Solarte", edad: 24, media: 64, posicion: "Defensa" },

  { nombre: "J.Rodriguez", edad: 33, media: 66, posicion: "Pivote", foto: "img/jugadores/cartagena/jrod.png" },

  { nombre: "F.Montero", edad: 38, media: 69, posicion: "Delantero" , foto: "img/jugadores/cartagena/montero.png"},
  { nombre: "A.Melendez", edad: 28, media: 65, posicion: "Delantero" , foto: "img/jugadores/cartagena/melendez.png"},
],

"Cucuta": [
  { nombre: "J.Ramirez", edad: 28, media: 63, posicion: "Portero", foto: "img/jugadores/cucuta/ramirez.png" },
  
  { nombre: "L.Payares", edad: 35, media: 63, posicion: "Defensa" , foto: "img/jugadores/cucuta/payares.png"},
  { nombre: "D.Calcaterra", edad: 24, media: 64, posicion: "Defensa", foto: "img/jugadores/cucuta/calcaterra.png", nacionalidad: "argentina"  },
  { nombre: "L.Hinestroza", edad: 22, media: 63, posicion: "Defensa" },
  { nombre: "M.Duarte", edad: 33, media: 63, posicion: "Defensa", foto: "img/jugadores/cucuta/mao.png" },

  { nombre: "S.Tamara", edad: 29, media: 66, posicion: "Volante", foto: "img/jugadores/cucuta/tamara.png" },
  { nombre: "J.Ceballos", edad: 26, media: 65, posicion: "Volante", foto: "img/jugadores/cucuta/ceballos.png" },
  { nombre: "L.Rios", edad: 27, media: 66, posicion: "Volante" , foto: "img/jugadores/cucuta/lucas.png", nacionalidad: "argentina" },
  { nombre: "S.Orozco", edad: 29, media: 64, posicion: "Volante", foto: "img/jugadores/cucuta/orozco.png" },

  { nombre: "J.Peralta", edad: 20, media: 65, posicion: "Delantero", foto: "img/jugadores/cucuta/peralta.png" }
],

"Ind.Yumbo": [
  { nombre: "J.Mendez", edad: 25, media: 65, posicion: "Portero" , foto: "img/jugadores/huila/mendez.png"},
  { nombre: "L.Mena", edad: 20, media: 62, posicion: "Portero" , foto: "img/jugadores/huila/mena.png" },

  { nombre: "A.Mejia", edad: 29, media: 63, posicion: "Defensa", foto: "img/jugadores/huila/amejia.png" },
  { nombre: "J.Rodriguez", edad: 22, media: 64, posicion: "Defensa" },
  { nombre: "D.Ferrer", edad: 19, media: 63, posicion: "Defensa" },

  { nombre: "D.Villa", edad: 23, media: 63, posicion: "Pivote" , foto: "img/jugadores/huila/villa.png"},
  { nombre: "A.Ararat", edad: 19, media: 65, posicion: "Pivote" , foto: "img/jugadores/huila/ararat.png"},
   
  { nombre: "B.Moya", edad: 22, media: 63, posicion: "Delantero" },
  { nombre: "T.Diaz", edad: 20, media: 63, posicion: "Delantero" },
  { nombre: "J.Montes", edad: 28, media: 63, posicion: "Delantero" , foto: "img/jugadores/huila/montes.png"}
  
],

"Patriotas": [
  { nombre: "J.Espitia", edad: 25, media: 63, posicion: "Portero", foto: "img/jugadores/patriotas/espitia.png" },
  { nombre: "J.Amaya", edad: 23, media: 60, posicion: "Portero" },

  { nombre: "J.Hurtado", edad: 27, media: 63, posicion: "Defensa", foto: "img/jugadores/patriotas/hurtado.png" },
  { nombre: "L.Renteria", edad: 19, media: 63, posicion: "Defensa" , foto: "img/jugadores/patriotas/renteria.png"},
  { nombre: "V.Perea", edad: 28, media: 63, posicion: "Defensa", foto: "img/jugadores/patriotas/perea.png" },

  { nombre: "M.Figueroa", edad: 27, media: 63, posicion: "Volante" , foto: "img/jugadores/patriotas/maclein.png" , nacionalidad: "venezuela"}, 
  { nombre: "K.Alvarez", edad: 20, media: 65, posicion: "Volante" , foto: "img/jugadores/patriotas/kevin.png"},
  { nombre: "K.Salazar", edad: 28, media: 65, posicion: "Pivote" , foto: "img/jugadores/patriotas/brayan.png"},
  { nombre: "J.Aristizabal", edad: 24, media: 62, posicion: "Volante" , foto: "img/jugadores/patriotas/aristisabal.png"},
  
  { nombre: "B.Fernandez", edad: 33, media: 63, posicion: "Delantero" , foto: "img/jugadores/patriotas/brayan.png"},
  { nombre: "E.Sarria", edad: 25, media: 63, posicion: "Delantero" , foto: "img/jugadores/patriotas/sarria.png"},
  { nombre: "R.Rivas", edad: 28, media: 63, posicion: "Delantero" , foto: "img/jugadores/patriotas/rivas.png"},
  { nombre: "D.Conejero", edad: 22, media: 63, posicion: "Delantero", nacionalidad: "espana"}
],

"R.Cundinamarca": [
  { nombre: "K.Cataño", edad: 22, media: 64, posicion: "Portero", foto: "img/jugadores/cundi/catano.png" },
  { nombre: "J.Betancourth", edad: 21, media: 58, posicion: "Portero"  },

  { nombre: "J.Viveros", edad: 22, media: 63, posicion: "Defensa" , foto: "img/jugadores/cundi/viveros.png" },
  { nombre: "B.Suaza", edad: 23, media: 63, posicion: "Defensa" , foto: "img/jugadores/cundi/suaza.png" },
  { nombre: "S.Moreno", edad: 22, media: 63, posicion: "Defensa" },
  { nombre: "J.Cajares", edad: 22, media: 63, posicion: "Defensa" , foto: "img/jugadores/cundi/cajares.png" },
  { nombre: "S.Barbosa", edad: 21, media: 63, posicion: "Defensa" , foto: "img/jugadores/cundi/barbosa.png" },

  { nombre: "M.Castaño", edad: 26, media: 64, posicion: "Volante" , foto: "img/jugadores/cundi/castano.png" },
  { nombre: "W.Davila", edad: 24, media: 62, posicion: "Volante" , foto: "img/jugadores/cundi/davila.png" },
  { nombre: "I.Camacho", edad: 21, media: 62, posicion: "Pivote" , foto: "img/jugadores/cundi/camacho.png" },
  { nombre: "J.Rubiano", edad: 23, media: 63, posicion: "Volante" , foto: "img/jugadores/cundi/rubiano.png" },

  { nombre: "J.Asprilla", edad: 22, media: 65, posicion: "Delantero", foto: "img/jugadores/cundi/asprilla.png"  },
  { nombre: "C.Negrete", edad: 18, media: 62, posicion: "Delantero" },
  { nombre: "A.Rocha", edad: 22, media: 65, posicion: "Delantero", foto: "img/jugadores/cundi/rocha.png"  }
],

"Inter Palmira": [
  { nombre: "J.Escobar", edad: 38, media: 60, posicion: "Portero" , foto: "img/jugadores/palmira/huber.png" },
  { nombre: "A.Cadavid", edad: 34, media: 63, posicion: "Portero", foto: "img/jugadores/palmira/arled.png"  },

  { nombre: "G.Perea", edad: 34, media: 64, posicion: "Defensa", foto: "img/jugadores/palmira/geisson.png"  },
  { nombre: "D.Quiñones", edad: 26, media: 65, posicion: "Defensa" , foto: "img/jugadores/palmira/raton.png" },
  { nombre: "Y.Gonzalez", edad: 35, media: 65, posicion: "Defensa", foto: "img/jugadores/palmira/yoiver.png"  },

  { nombre: "H.Angulo", edad: 25, media: 63, posicion: "Pivote", foto: "img/jugadores/palmira/hermes.png"  },
  { nombre: "C.Franco", edad: 21, media: 63, posicion: "Pivote" , foto: "img/jugadores/palmira/franco.png" },
  { nombre: "H.Suarez", edad: 31, media: 63, posicion: "Pivote" , foto: "img/jugadores/palmira/harlin.png" },
  { nombre: "J.Guzman", edad: 20, media: 63, posicion: "Volante" , foto: "img/jugadores/palmira/guzman.png" },

  { nombre: "J.Arango", edad: 34, media: 66, posicion: "Delantero" , foto: "img/jugadores/palmira/arango.png" },
  { nombre: "V.Ibarbo", edad: 35, media: 66, posicion: "Delantero", foto: "img/jugadores/palmira/ibarbo.png"  },
  { nombre: "D.Rodriguez", edad: 30, media: 65, posicion: "Delantero", foto: "img/jugadores/palmira/dario.png"  },
  { nombre: "D.Orozco", edad: 30, media: 66, posicion: "Delantero", foto: "img/jugadores/palmira/doroz.png"  },
  { nombre: "D.Riascos", edad: 39, media: 61, posicion: "Delantero" , foto: "img/jugadores/palmira/duvier.png" }
],

"Boca Jrs. Cali": [
    { nombre: "E.Obando", edad: 23, media: 63, posicion: "Portero" , foto: "img/jugadores/quinboca/obando.png" },
    { nombre: "S.Hoyos", edad: 21, media: 60, posicion: "Portero" },

    { nombre: "H.Ortiz", edad: 21, media: 61, posicion: "Defensa", foto: "img/jugadores/quinboca/ortiz.png"  },
    { nombre: "J.Madrid", edad: 23, media: 61, posicion: "Defensa" , foto: "img/jugadores/quinboca/madrid.png" },
    { nombre: "J.Arcila", edad: 25, media: 61, posicion: "Defensa" , foto: "img/jugadores/quinboca/arcila.png" },

    { nombre: "C.Paternina", edad: 21, media: 62, posicion: "Volante" },
    { nombre: "A.Andrade", edad: 36, media: 67, posicion: "Volante", foto: "img/jugadores/quinboca/rifle.png"  },

    { nombre: "J.Mendoza", edad: 22, media: 63, posicion: "Delantero" , foto: "img/jugadores/quinboca/mendoza.png" },
    { nombre: "J.Monsalve", edad: 21, media: 60, posicion: "Delantero" , foto: "img/jugadores/quinboca/monsalve.png" },
    { nombre: "H.Romaña", edad: 21, media: 61, posicion: "Volante" },
    { nombre: "J.Jaramillo", edad: 21, media: 61, posicion: "Delantero", foto: "img/jugadores/quinboca/jaramillo.png"  }
  ],

  "Leones": [
    { nombre: "C.Holguin", edad: 21, media: 58, posicion: "Portero" , foto: "img/jugadores/leones/holguin.png" },
    { nombre: "J.Arboleda", edad: 20, media: 60, posicion: "Portero" , foto: "img/jugadores/leones/arboleda.png" },
    { nombre: "D.Marmolejo", edad: 21, media: 60, posicion: "Defensa", foto: "img/jugadores/leones/dmarmo.png"  },
    { nombre: "A.Ceballos", edad: 21, media: 59, posicion: "Volante", foto: "img/jugadores/leones/ceballos.png"  },
    { nombre: "J.P.Arteaga", edad: 21, media: 62, posicion: "Volante", foto: "img/jugadores/leones/jparte.png"  },
    { nombre: "J.Ibargüen", edad: 19, media: 58, posicion: "Delantero" , foto: "img/jugadores/leones/ibarguen.png" },
    { nombre: "C.Rodriguez", edad: 23, media: 61, posicion: "Delantero" , foto: "img/jugadores/leones/cristian.png" },
    
  ],
  "Tigres": [
    { nombre: "J.Huertas", edad: 24, media: 62, posicion: "Portero" },
    { nombre: "E.Arrechea", edad: 20, media: 60, posicion: "Defensa", foto: "img/jugadores/tigota/arrechea.png"  },
    { nombre: "C.Ibarra", edad: 22, media: 63, posicion: "Delantero" , foto: "img/jugadores/tigota/ibarra.png" },
    { nombre: "L.Palacios", edad: 20, media: 64, posicion: "Delantero", foto: "img/jugadores/tigota/palacios.png"  },
    { nombre: "M.Frigerio", edad: 28, media: 62, posicion: "Delantero" , foto: "img/jugadores/tigota/frigerio.png" }
  ],
  "Quindio": [
    { nombre: "M.Jimenez", edad: 29, media: 62, posicion: "Portero" , foto: "img/jugadores/quinboca/jimenez.png" },
    { nombre: "S.Pabon", edad: 29, media: 61, posicion: "Portero" },

    { nombre: "K.Hurtado", edad: 20, media: 61, posicion: "Defensa", foto: "img/jugadores/quinboca/hurtado.png"  },
    { nombre: "U.Rovira", edad: 20, media: 61, posicion: "Defensa", foto: "img/jugadores/quinboca/uberney.png"  },
    { nombre: "D.Palomeque", edad: 32, media: 62, posicion: "Defensa", foto: "img/jugadores/quinboca/palomeque.png"  },

    { nombre: "W.Arango", edad: 27, media: 64, posicion: "Volante", foto: "img/jugadores/quinboca/arango.png"  },
    { nombre: "Y.Torres", edad: 26, media: 61, posicion: "Pivote", foto: "img/jugadores/quinboca/yosimarc.png" },

    { nombre: "J.Lloreda", edad: 31, media: 64, posicion: "Delantero" , foto: "img/jugadores/quinboca/lloreda.png" },
    { nombre: "J.Rodriguez", edad: 29, media: 63, posicion: "Delantero" , foto: "img/jugadores/quinboca/joao.png" }
  ],
  "Bogotá": [
    { nombre: "W.Agamez", edad: 22, media: 57, posicion: "Portero" },
    { nombre: "D.Aguilar", edad: 21, media: 59, posicion: "Portero", foto: "img/jugadores/tigota/aguilar.png"  },
    { nombre: "S.Ruiz R.", edad: 28, media: 61, posicion: "Defensa", foto: "img/jugadores/tigota/srr.png"  },
    { nombre: "D.Montien", edad: 24, media: 60, posicion: "Defensa" },
    { nombre: "F.Moreno", edad: 20, media: 62, posicion: "Volante", foto: "img/jugadores/tigota/freilin.png"  },
    { nombre: "C.Huerfano", edad: 29, media: 63, posicion: "Delantero", foto: "img/jugadores/tigota/huerfano.png"  }
  ],
  
  "Orsomarso": [
    { nombre: "B.Benitez", edad: 22, media: 59, posicion: "Portero", foto: "img/jugadores/orsonder/benitez.png" },
    { nombre: "H.Arango", edad: 23, media: 61, posicion: "Portero", foto: "img/jugadores/orsonder/arango.png" },

    { nombre: "D.Barrios", edad: 21, media: 62, posicion: "Defensa", foto: "img/jugadores/orsonder/deivi.png" },

    { nombre: "A.Montaño", edad: 25, media: 60, posicion: "Volante", foto: "img/jugadores/orsonder/montano.png" },
    { nombre: "S.Lopez", edad: 23, media: 62, posicion: "Volante", foto: "img/jugadores/orsonder/lopez.png" },
    { nombre: "N.Rengifo", edad: 21, media: 62, posicion: "Volante", foto: "img/jugadores/orsonder/rengifo.png" },

    { nombre: "J.J.Salcedo", edad: 32, media: 66, posicion: "Delantero" , foto: "img/jugadores/orsonder/salcedo.png"},
    { nombre: "S.Girado", edad: 21, media: 65, posicion: "Delantero", foto: "img/jugadores/orsonder/girado.png" }
   
  ],
  "Barranquilla": [
    { nombre: "J.Lemus", edad: 26, media: 58, posicion: "Portero" , foto: "img/jugadores/atlilla/lemus.png" },
    { nombre: "J.Caicedo", edad: 24, media: 62, posicion: "Defensa", foto: "img/jugadores/atlilla/josec.png"  },
    { nombre: "E.Herazo", edad: 16, media: 54, posicion: "Defensa" , foto: "img/jugadores/atlilla/herazo.png" },
    { nombre: "C.Peñate", edad: 20, media: 60, posicion: "Delantero" , foto: "img/jugadores/atlilla/penate.png" },
    { nombre: "L.Berdugo", edad: 23, media: 63, posicion: "Volante" , foto: "img/jugadores/atlilla/berdugo.png" },
    { nombre: "J.Velez", edad: 22, media: 65, posicion: "Pivote" , foto: "img/jugadores/atlilla/velez.png" },
    { nombre: "C.Cantillo", edad: 22, media: 62, posicion: "Pivote", foto: "img/jugadores/atlilla/cantillo.png"  },
    { nombre: "M.Bacca", edad: 21, media: 62, posicion: "Delantero" , foto: "img/jugadores/atlilla/bacca.png" }
  ],
  "Atlético FC": [
    { nombre: "J.Jaramillo", edad: 25, media: 60, posicion: "Portero", foto: "img/jugadores/atlilla/jaramillo.png"  },
    { nombre: "M.Suarez", edad: 26, media: 60, posicion: "Portero", foto: "img/jugadores/atlilla/suarez.png"  },
    { nombre: "J.Alomia", edad: 26, media: 61, posicion: "Defensa", foto: "img/jugadores/atlilla/alomia.png"  },
    { nombre: "N.Mosorongo", edad: 23, media: 60, posicion: "Volante" , foto: "img/jugadores/atlilla/mosorongo.png" },
    { nombre: "J.Farias", edad: 21, media: 59, posicion: "Delantero" , foto: "img/jugadores/atlilla/farias.png" , nacionalidad: "argentina"},
    { nombre: "J.Escobar", edad: 27, media: 60, posicion: "Delantero", foto: "img/jugadores/atlilla/escobar.png"  },
    { nombre: "J.Aguas", edad: 24, media: 58, posicion: "Volante"},
    { nombre: "D.Reales", edad: 24, media: 60, posicion: "Defensa", foto: "img/jugadores/atlilla/reales.png" }   
  ],
  "R.Santander": [
    { nombre: "J.Mora", edad: 28, media: 60, posicion: "Portero", foto: "img/jugadores/orsonder/mora.png" },
    { nombre: "J.Pertuz", edad: 20, media: 60, posicion: "Defensa", foto: "img/jugadores/orsonder/pertuz.png" },
    { nombre: "S.Orejuela", edad: 24, media: 60, posicion: "Defensa", foto: "img/jugadores/orsonder/orejuela.png" },
    { nombre: "F.Mendoza", edad: 24, media: 60, posicion: "Volante", foto: "img/jugadores/orsonder/faiber.png" },
    { nombre: "S.Rey", edad: 20, media: 57, posicion: "Delantero" , foto: "img/jugadores/orsonder/rey.png", nacionalidad: "mexico"},
    { nombre: "L.Yanes", edad: 18, media: 59, posicion: "Delantero" , foto: "img/jugadores/orsonder/yanes.png"}
  ],

"Extranjero":[

  ]
};
