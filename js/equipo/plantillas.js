

//PLANTILLAS
const plantillasJugadores = {
  "Nacional": [
  { nombre: "D.Ospina", edad: 37, media: 73, posicion: "PO" , foto: "img/jugadores/D/dospina.png"},
  { nombre: "H.Castillo", edad: 32, media: 68, posicion: "PO" , foto: "img/jugadores/H/harlen.png"},
  { nombre: "K.Cataño", edad: 22, media: 65, posicion: "PO", foto: "img/jugadores/K/kcatano.png" },

  { nombre: "A.Roman", edad: 30, media: 72, posicion: "LD" , foto: "img/jugadores/R/roman.png"},
  { nombre: "M.Casco", edad: 37, media: 68, posicion: "LI" , foto: "img/jugadores/C/casco.png", nacionalidad: "argentina"},
  { nombre: "W.Tesillo", edad: 36, media: 72, posicion: "DFC" , foto: "img/jugadores/T/tesillo.png" },
  { nombre: "C.Haydar", edad: 24, media: 66, posicion: "DFC" , foto: "img/jugadores/H/haydar.png"},
  { nombre: "Simon G.", edad: 21, media: 66, posicion: "DFC" , foto: "img/jugadores/S/simon.png" },
  { nombre: "S.Velasquez", edad: 22,  media: 66, posicion: "LI", foto: "img/jugadores/S/samuel.png"   },

  { nombre: "E.Cardona", edad: 33, media: 73, posicion: "MO" , foto: "img/jugadores/E/ecardona.png" },
  { nombre: "J.Bauza", edad: 29, media: 71, posicion: "MO" , foto: "img/jugadores/B/bauza.png", nacionalidad: "argentina"},
  { nombre: "M.Uribe", edad: 34, media: 72, posicion: "MD" , foto: "img/jugadores/M/matheus.png"},
  { nombre: "J.M.Zapata", edad: 25, media: 67, posicion: "MD", foto: "img/jugadores/J/jmzapata.png" },
  { nombre: "J.Campuzano", edad: 29, media: 73, posicion: "MD" , foto: "img/jugadores/C/campuzano.png" },
  { nombre: "J.Rengifo", edad: 20, media: 68, posicion: "MO" , foto: "img/jugadores/R/rengifo.png" },
  { nombre: "E.Rivero", edad: 19, media: 64, posicion: "MD" , foto: "img/jugadores/R/rivero.png"},

  { nombre: "A.Morelos", edad: 29, media: 75, posicion: "DC" , foto: "img/jugadores/M/morelos.png"},
  { nombre: "A.Sarmiento", edad: 28, media: 72, posicion: "EI" , foto: "img/jugadores/S/sarmiento.png"},
  { nombre: "D.Asprilla", edad: 33, media: 69, posicion: "ED" , foto: "img/jugadores/A/asprilla.png"},
  { nombre: "M.Moreno", edad: 29, media: 73, posicion: "EI" , foto: "img/jugadores/M/marlos.png"},
  { nombre: "E.Bello", edad: 30, media: 68, posicion: "ED" , foto: "img/jugadores/B/bello.png" , nacionalidad: "venezuela" },
  { nombre: "C.Arango", edad: 30, media: 68, posicion: "DC", foto: "img/jugadores/C/chicho.png"},
  { nombre: "N.Rodriguez", edad: 21, media: 65, posicion: "ED"  , foto: "img/jugadores/N/nicorod.png"}
],

"Millonarios": [
  { nombre: "G.de Amores", edad: 31, media: 66, posicion: "PO"  , foto: "img/jugadores/G/gamores.png" , nacionalidad: "uruguay"},
  { nombre: "D.Novoa", edad: 36, media: 67, posicion: "PO"  , foto: "img/jugadores/N/novoa.png"},

  { nombre: "A.Llinás", edad: 28, media: 72, posicion: "DFC" , foto: "img/jugadores/L/llinas.png" },
  { nombre: "D.Banguero", edad: 36, media: 66, posicion: "LI"  , foto: "img/jugadores/B/banguero.png"},
  { nombre: "S.Mosquera", edad: 32, media: 67, posicion: "DFC"  , foto: "img/jugadores/M/mosquera.png"},
  { nombre: "J.Arias", edad: 33, media: 67, posicion: "DFC" , foto: "img/jugadores/J/jarias.png"},
  { nombre: "S.Valencia", edad: 29, media: 67, posicion: "LI" , foto: "img/jugadores/S/sval.png" },
  { nombre: "S.Martin", edad: 20, media: 64, posicion: "LD" },
  { nombre: "E.Elizalde", edad: 26, media: 68, posicion: "DFC"  , foto: "img/jugadores/E/elizalde.png" , nacionalidad: "uruguay"},
  { nombre: "Moreno Paz", edad: 24, media: 64, posicion: "DFC"  , foto: "img/jugadores/M/morenopaz.png"},
  { nombre: "C.Sarabia", edad: 20, media: 65, posicion: "LD" },

  { nombre: "D.Mackalister", edad: 39, media: 67, posicion: "MO"  , foto: "img/jugadores/M/maca.png"},
  { nombre: "M.Garcia", edad: 27, media: 67, posicion: "MD" , foto: "img/jugadores/M/mateog.png" },
  { nombre: "R.Ureña", edad: 32, media: 68, posicion: "MD" , foto: "img/jugadores/R/rurena.png" , nacionalidad: "chile"},
  { nombre: "Darwin Quintero", edad: 38, media: 69, posicion: "MO" , foto: "img/jugadores/D/darwin.png" },
  { nombre: "S.Vega", edad: 27, media: 65, posicion: "MD" , foto: "img/jugadores/V/vega.png" },
  { nombre: "Dewar V.", edad: 24, media: 65, posicion: "MD"  , foto: "img/jugadores/D/dewar.png"},
  { nombre: "S.del Castillo", edad: 21, media: 66, posicion: "MO" , foto: "img/jugadores/S/svdc.png" },

  { nombre: "J.Angulo", edad: 23, media: 67, posicion: "EI", foto: "img/jugadores/J/jas.png"  },
  { nombre: "Leo Castro", edad: 33, media: 70, posicion: "DC" , foto: "img/jugadores/L/leo.png" },
  { nombre: "R.Falcao", edad: 40, media: 73, posicion: "DC"  , foto: "img/jugadores/F/falcao.png"},
  { nombre: "R.Contreras", edad: 30, media: 67, posicion: "DC"  , foto: "img/jugadores/C/contreras.png", nacionalidad: "argentina"},
  { nombre: "A.Castro", edad: 31, media: 66, posicion: "EI" , foto: "img/jugadores/A/alex.png" },
  { nombre: "J.Hurtado", edad: 22, media: 65, posicion: "DC" , foto: "img/jugadores/H/hurtado.png" },
  { nombre: "Beckham C.", edad: 22, media: 68, posicion: "EI" , foto: "img/jugadores/B/beckham.png"}
  
],

"América": [
  { nombre: "J.Soto", edad: 32, media: 68, posicion: "PO"  , foto: "img/jugadores/S/soto.png"},
  { nombre: "Jean", edad: 30, media: 71, posicion: "PO"  , foto: "img/jugadores/F/fjean.png", nacionalidad: "brasil"},
  
  { nombre: "D.Rosero", edad: 32, media: 66, posicion: "DFC" , foto: "img/jugadores/R/rosero.png" },
  { nombre: "N.Hernandez", edad: 28, media: 66, posicion: "DFC" , foto: "img/jugadores/N/nico.png" },
  { nombre: "A.Guardia", edad: 35, media: 65, posicion: "DFC" , foto: "img/jugadores/G/guardia.png" },
  { nombre: "M.Torres", edad: 29,  media: 68, posicion: "DFC" , foto: "img/jugadores/T/tmarlon.png"  },
  { nombre: "O.Bertel", edad: 29, media: 66, posicion: "LI" , foto: "img/jugadores/B/bertel.png" },
  { nombre: "M.Mina", edad: 26, media: 65, posicion: "LI" , foto: "img/jugadores/M/mina.png" },
  { nombre: "Mateo C.", edad: 22, media: 67, posicion: "LD" , foto: "img/jugadores/M/mateo.png"},

  { nombre: "Josen E.", edad: 21, media: 65, posicion: "MD" , foto: "img/jugadores/E/ejosen.png"},
  { nombre: "C.Sierra", edad: 35, media: 66, posicion: "MD" , foto: "img/jugadores/S/sierra.png" },
  { nombre: "R.Carrascal", edad: 33, media: 70, posicion: "MO"  , foto: "img/jugadores/R/rcarrascal.png"},
  { nombre: "Y.Guzman", edad: 27, media: 72, posicion: "MO" , foto: "img/jugadores/G/guzman.png" },
  { nombre: "J.Cavadia", edad: 20, media: 65, posicion: "MD"  },
  { nombre: "J.Romero", edad: 20, media: 65, posicion: "MO"  },

  { nombre: "Tilman P.", edad: 20, media: 64, posicion: "EI"  },
  { nombre: "Kevin A.", edad: 17, media: 62, posicion: "DC"  },
  { nombre: "J.Lucumi", edad: 22, media: 65, posicion: "EI" , foto: "img/jugadores/L/lucumijan.png"  },
  { nombre: "Y.Garces", edad: 19, media: 65, posicion: "DC"  , foto: "img/jugadores/Y/ygarces.png" },
  { nombre: "D.Valencia", edad: 29, media: 67, posicion: "DC" , foto: "img/jugadores/V/valenciadaniel.png" , nacionalidad: "ecuador" },
  { nombre: "A.Ramos", edad: 40, media: 66, posicion: "DC" , foto: "img/jugadores/R/radrian.png"},
  { nombre: "J.Murillo", edad: 30, media: 65, posicion: "ED" , foto: "img/jugadores/M/murillo.png", nacionalidad: "venezuela" },
  { nombre: "D.Machis", edad: 33, media: 66, posicion: "EI" , foto: "img/jugadores/D/dmachis.png", nacionalidad: "venezuela" },
  { nombre: "D.Borrero", edad: 24, media: 66, posicion: "EI"  , foto: "img/jugadores/D/dborrero.png"}
],

"Junior": [
  { nombre: "M.Silveira", edad: 25, media: 72, posicion: "PO"  , foto: "img/jugadores/S/silveira.png", nacionalidad: "uruguay"},
  { nombre: "J.Martinez", edad: 32, media: 68, posicion: "PO" , foto: "img/jugadores/J/jeferson.png" },

  { nombre: "J.Guerrero", edad: 24, media: 66, posicion: "LD"  , foto: "img/jugadores/G/guerrero.png"},
  { nombre: "E.Herrera", edad: 27, media: 65, posicion: "LD" , foto: "img/jugadores/H/herrera.png" },
  { nombre: "J.Peña", edad: 26, media: 71, posicion: "DFC"  , foto: "img/jugadores/P/pena.png"},
  { nombre: "J.Pestaña", edad: 28, media: 68, posicion: "DFC" , foto: "img/jugadores/P/pestana.png"},
  { nombre: "L.Monzon", edad: 24, media: 69, posicion: "DFC"  , foto: "img/jugadores/M/monzon.png", nacionalidad: "uruguay"},
  { nombre: "Y.Suarez", edad: 28, media: 68, posicion: "LI"  , foto: "img/jugadores/Y/yeison.png"},
  { nombre: "J.Navia", edad: 22, media: 65, posicion: "LI"  , foto: "img/jugadores/N/navia.png"},
  { nombre: "D.Rivera", edad: 26, media: 67, posicion: "DFC"  , foto: "img/jugadores/D/drivera.png"},

  { nombre: "Y.Chara", edad: 34, media: 69, posicion: "MO" , foto: "img/jugadores/Y/ychara.png" },
  { nombre: "G.Celis", edad: 32, media: 68, posicion: "MD" , foto: "img/jugadores/G/gcelis.png" },
  { nombre: "J.Sarmiento", edad: 26, media: 66, posicion: "MO"  , foto: "img/jugadores/J/jannenson.png"},
  { nombre: "H.Rivera", edad: 32, media: 65, posicion: "MD"  , foto: "img/jugadores/H/hrivera.png"},
  { nombre: "F.Angel", edad: 25, media: 65, posicion: "MD"  , foto: "img/jugadores/F/fabian.png"},
  { nombre: "J.Rios", edad: 34, media: 66, posicion: "MD" , foto: "img/jugadores/J/jrios.png" },
  { nombre: "J.Rivas", edad: 28, media: 67, posicion: "MD" , foto: "img/jugadores/R/rivas.png" },

  { nombre: "C.Barrios", edad: 27, media: 69, posicion: "ED"  , foto: "img/jugadores/B/barrios.png"},
  { nombre: "J.Canchimbo", edad: 20, media: 65, posicion: "ED"  , foto: "img/jugadores/C/canchimbo.png"},
  { nombre: "K.Perez", edad: 28, media: 67, posicion: "ED" , foto: "img/jugadores/K/kperez.png" },
  { nombre: "G.Paiva", edad: 28, media: 69, posicion: "DC"  , foto: "img/jugadores/P/paiva.png" , nacionalidad: "paraguay"},
  { nombre: "L.Muriel", edad: 34, media: 68, posicion: "DC" , foto: "img/jugadores/M/muriel.png"},
  { nombre: "B.Castrillon", edad: 26, media: 67, posicion: "EI"  , foto: "img/jugadores/B/bcastrillon.png"},
  { nombre: "C.Bacca", edad: 39, media: 68, posicion: "DC"  , foto: "img/jugadores/B/bacca.png"},
  { nombre: "T.Gutierrez", edad: 40, media: 69, posicion: "DC" , foto: "img/jugadores/T/teo.png" }
],

"Santa Fe": [
  { nombre: "A.Marmolejo", edad: 34, media: 73, posicion: "PO"  , foto: "img/jugadores/M/marmolejo.png"},
  { nombre: "W.Asprilla", edad: 26, media: 68, posicion: "PO"  , foto: "img/jugadores/W/weimar.png"},

  { nombre: "Victor M.", edad: 31, media: 68, posicion: "DFC"  , foto: "img/jugadores/V/victorm.png"},
  { nombre: "E.Olivera", edad: 35, media: 68, posicion: "DFC"  , foto: "img/jugadores/T/turro.png", nacionalidad: "argentina"},
  { nombre: "I.Scarpeta", edad: 29, media: 67, posicion: "DFC"  , foto: "img/jugadores/S/scarpeta.png"},
  { nombre: "C.Mafla", edad: 33, media: 68, posicion: "LI"  , foto: "img/jugadores/M/mafla.png"},
  { nombre: "H.Palacios", edad: 32, media: 67, posicion: "LD"  , foto: "img/jugadores/H/helibelton.png"},
  { nombre: "J.S. Quintero", edad: 30, media: 65, posicion: "DFC" , foto: "img/jugadores/S/squintero.png"  },
  { nombre: "Yeicar P.", edad: 23, media: 65, posicion: "LD"  , foto: "img/jugadores/Y/yeicar.png" },
  { nombre: "Mateo P.", edad: 28, media: 65, posicion: "LD"  , foto: "img/jugadores/P/pmateo.png" },

  { nombre: "Yilmar V.", edad: 26, media: 68, posicion: "MD" , foto: "img/jugadores/Y/yilmar.png" },
  { nombre: "D.Torres", edad: 36, media: 68, posicion: "MD"  , foto: "img/jugadores/T/torresdani.png"},
  { nombre: "A.Zapata", edad: 30, media: 65, posicion: "MO"  , foto: "img/jugadores/A/azapata.png"},
  { nombre: "Ewil M.", edad: 25, media: 67,   posicion: "MD" , foto: "img/jugadores/E/ewil.png" },
  { nombre: "Jhojan T.", edad: 23, media: 66, posicion: "MD"  , foto: "img/jugadores/K/kante.png"},
  { nombre: "F.Fagundez", edad: 25, media: 67, posicion: "MO" , foto: "img/jugadores/F/fagundez.png" , nacionalidad: "uruguay"},
  { nombre: "K.Toscano", edad: 21, media: 64, posicion: "MD"  , foto: "img/jugadores/T/toscano.png" },

  { nombre: "E.Mosquera", edad: 24, media: 66, posicion: "EI", foto: "img/jugadores/E/emosquera.png"   },
  { nombre: "N.Bustos", edad: 27, media: 68, posicion: "DC" , foto: "img/jugadores/N/nbustos.png" , nacionalidad: "argentina"},
  { nombre: "L.Palacios", edad: 24, media: 65, posicion: "ED" , foto: "img/jugadores/L/luispalacios.png"  },
  { nombre: "H.Rodallega", edad: 40, media: 72, posicion: "DC"  , foto: "img/jugadores/H/hugol.png"},
  { nombre: "O.Frasica", edad: 33, media: 67, posicion: "EI"  , foto: "img/jugadores/F/frasika.png"}
],

 "Cali": [
  { nombre: "P.Gallese", edad: 35, media: 73, posicion: "PO" , foto: "img/jugadores/G/gallese.png" , nacionalidad: "peru"  },
  { nombre: "A.Rodriguez", edad: 25, media: 67, posicion: "PO" , foto: "img/jugadores/R/rodriguez.png" },
  { nombre: "A.Rojo", edad: 19, media: 60, posicion: "PO"  , nacionalidad: "espana" },

  { nombre: "F.Viafara", edad: 33, media: 66, posicion: "LD", foto: "img/jugadores/F/fviafara.png" },
  { nombre: "F.Alvarez", edad: 22, media: 66, posicion: "DFC"  , foto: "img/jugadores/F/falvarez.png"},
  { nombre: "J.Caldera", edad: 24, media: 65, posicion: "DFC"  , foto: "img/jugadores/C/caldera.png"},
  { nombre: "F.Aguilar", edad: 33, media: 66, posicion: "DFC" , foto: "img/jugadores/F/faguilar.png"},
  { nombre: "J.Quiñones", edad: 36, media: 64, posicion: "DFC" , foto: "img/jugadores/J/juliqui.png"},
  { nombre: "A.Correa", edad: 32, media: 65, posicion: "LI"  , foto: "img/jugadores/C/correa.png"},
  { nombre: "J.Tello", edad: 23, media: 62, posicion: "LI" , foto: "img/jugadores/T/tello.png" },
  { nombre: "L.Orejuela", edad: 30, media: 64, posicion: "LD"  , foto: "img/jugadores/L/lorejuela.png"},

  { nombre: "A.Colorado", edad: 27, media: 65, posicion: "MD" , foto: "img/jugadores/C/colorado.png"},
  { nombre: "Yani Q.", edad: 23, media: 65, posicion: "MD", foto: "img/jugadores/Y/yani.png" },
  { nombre: "D.Giraldo", edad: 33, media: 66, posicion: "MD" , foto: "img/jugadores/G/giraldo.png"},
  { nombre: "M.Orozco", edad: 19, media: 62, posicion: "MD" },
  { nombre: "E.Reynoso", edad: 30, media: 65, posicion: "MO" , foto: "img/jugadores/B/bebelo.png" , nacionalidad: "argentina" },
  { nombre: "R.Pajaro", edad: 23, media: 66, posicion: "MD" , foto: "img/jugadores/P/pajaro.png" },
  { nombre: "Johan M.", edad: 23, media: 66, posicion: "MO" , foto: "img/jugadores/H/honguito.png"},

  { nombre: "J.Dinenno", edad: 31, media: 68, posicion: "DC" , foto: "img/jugadores/D/dinenno.png" , nacionalidad: "argentina" },
  { nombre: "J.Aponza", edad: 20, media: 63, posicion: "DC" , foto: "img/jugadores/A/aponza.png"},
  { nombre: "J.Galindo", edad: 19, media: 60, posicion: "DC" , foto: "img/jugadores/G/galindo.png"},
  { nombre: "J.A. Mena", edad: 20, media: 63, posicion: "ED" , foto: "img/jugadores/M/menaja.png" },
  { nombre: "Titi Rodríguez", edad: 27, media: 67, posicion: "DC" , foto: "img/jugadores/T/titi.png" },
  { nombre: "A.Hurtado", edad: 38, media: 66, posicion: "EI" , foto: "img/jugadores/H/hurtadoavi.png"}
],

  "Medellín": [
    { nombre: "S.Ichazo", edad: 34, media: 67, posicion: "PO", foto: "img/jugadores/S/sichazo.png", nacionalidad: "uruguay" },
    { nombre: "E.Chaux", edad: 34, media: 66, posicion: "PO", foto: "img/jugadores/E/echaux.png" },

    { nombre: "J.Ortiz", edad: 27, media: 66, posicion: "DFC", foto: "img/jugadores/J/jortiz.png" },
    { nombre: "K.Mantilla", edad: 22, media: 66, posicion: "DFC", foto: "img/jugadores/K/kmantilla.png" },
    { nombre: "L.Chaverra", edad: 28, media: 66, posicion: "LD", foto: "img/jugadores/L/leyser.png" },
    { nombre: "D.Londoño", edad: 31, media: 65, posicion: "LI", foto: "img/jugadores/L/londono.png" },
    { nombre: "E.Mena", edad: 28, media: 67, posicion: "LD", foto: "img/jugadores/E/esneyder.png" },
    { nombre: "Malcom P.", edad: 21, media: 63, posicion: "DFC" , foto: "img/jugadores/P/palamalc.png" },
    { nombre: "J.Viveros", edad: 21, media: 63, posicion: "LD"  , foto: "img/jugadores/V/viveros.png"},
    { nombre: "F.Fabra", edad: 34, media: 66, posicion: "LI"  , foto: "img/jugadores/F/fabra.png"},
    { nombre: "Hayen P.", edad: 26, media: 65, posicion: "LD"  , foto: "img/jugadores/H/hayen.png"},

    { nombre: "Diego M.", edad: 29, media: 65, posicion: "MD" , foto: "img/jugadores/D/diego.png" },
    { nombre: "A.Serna", edad: 28, media: 65, posicion: "MD"  , foto: "img/jugadores/S/serna.png"},
    { nombre: "H.Loboa", edad: 19, media: 65, posicion: "MD" , foto: "img/jugadores/L/loboa.png" },
    { nombre: "L.Berrio", edad: 27, media: 67, posicion: "MO", foto: "img/jugadores/L/lberrio.png" },
    { nombre: "Baldomero P.", edad: 33, media: 66, posicion: "MO", foto: "img/jugadores/B/baldomero.png" },
    { nombre: "Didier M.", edad: 34, media: 72, posicion: "MD", foto: "img/jugadores/D/didier.png" },
    { nombre: "D.Cataño", edad: 34, media: 70, posicion: "MO"  , foto: "img/jugadores/C/catano.png"},

    { nombre: "E.Larrosa", edad: 24, media: 66, posicion: "DC" , foto: "img/jugadores/E/enzo.png" , nacionalidad: "uruguay" },
    { nombre: "J.Montaño", edad: 19, media: 60, posicion: "ED" , foto: "img/jugadores/M/montano.png" },
    { nombre: "G.Mancilla", edad: 17, media: 60, posicion: "DC" , foto: "img/jugadores/G/geronimo.png" },
    { nombre: "Y.Gonzalez", edad: 31, media: 68, posicion: "ED", foto: "img/jugadores/Y/yony.png" },
    { nombre: "F.Fydrizewski", edad: 32, media: 72, posicion: "DC", foto: "img/jugadores/P/polaco.png", nacionalidad: "argentina" },
    { nombre: "F.Chaverra", edad: 25, media: 67, posicion: "EI", foto: "img/jugadores/F/fchaverra.png" }
  ],

"Tolima": [
  { nombre: "N.Volpi", edad: 33, media: 67, posicion: "PO" , foto: "img/jugadores/V/volpi.png" , nacionalidad: "brasil" },
  { nombre: "L.Marquinez", edad: 22, media: 65, posicion: "PO" , foto: "img/jugadores/L/lmarquinez.png"},

  { nombre: "Jan Angulo", edad: 24,  media: 67, posicion: "DFC"  , foto: "img/jugadores/J/jangulo.png" },
  { nombre: "J.Hernandez", edad: 26,  media: 65, posicion: "LI"  , foto: "img/jugadores/H/hernajunior.png" },
  { nombre: "J.Mera", edad: 23,  media: 65, posicion: "DFC"  , foto: "img/jugadores/J/jmera.png" },
  { nombre: "A.Angulo", edad: 29,   media: 67,  posicion: "DFC", foto: "img/jugadores/A/aangulo.png" },
  { nombre: "C.Arrieta", edad: 30, media: 66, posicion: "LD"  , foto: "img/jugadores/C/carrieta.png" },
  { nombre: "D.Pedrozo", edad: 21, media: 65, posicion: "DFC" , foto: "img/jugadores/D/dpedrozo.png"  },
  { nombre: "S.Barbosa", edad: 21, media: 65, posicion: "LI"  , foto: "img/jugadores/S/shean.png" },
  
  { nombre: "J.Nieto",  edad: 32,  media: 65, posicion: "MD", foto: "img/jugadores/N/nieto.png"   },
  { nombre: "S.Guzman", edad: 28, media: 66,   posicion: "MD" , foto: "img/jugadores/S/smariachi.png" },
  { nombre: "J.Torres", edad: 21, media: 67,   posicion: "MO" , foto: "img/jugadores/T/tatay.png" },
  { nombre: "B.Rovira", edad: 29,  media: 66, posicion: "MD"  , foto: "img/jugadores/R/rovira.png" },
  { nombre: "C.Trujillo", edad: 27, media: 66, posicion: "MD" , foto: "img/jugadores/T/trujillo.png"  },
  { nombre: "E.Ricardo", edad: 21, media: 66, posicion: "MD"  , foto: "img/jugadores/E/elan.png" },

  { nombre: "Ever V.", edad: 29, media: 66, posicion: "EI" , foto: "img/jugadores/V/valenciaever.png" },
  { nombre: "Jader V.", edad: 26, media: 65, posicion: "DC", foto: "img/jugadores/V/valenciajader.png"   },
  { nombre: "Jersson G.", edad: 24,  media: 66, posicion: "ED"  , foto: "img/jugadores/G/gjersson.png" },
  { nombre: "Kelvin F.", edad: 22,  media: 66, posicion: "EI", foto: "img/jugadores/K/kflorez.png"  },
  { nombre: "L.Sandoval", edad: 26, media: 66, posicion: "DC" , foto: "img/jugadores/S/sandoval.png" },
  { nombre: "E.Lopez", edad: 30, media: 67, posicion: "EI"  , foto: "img/jugadores/E/edwar.png"},
  { nombre: "A.Parra", edad: 29, media: 66,  posicion: "EI" , foto: "img/jugadores/P/parraa.png"  }
],

"Once Caldas": [
  { nombre: "J.Aguirre", edad: 33, media: 64, posicion: "PO" , foto: "img/jugadores/A/aguirre.png" },
  { nombre: "J.Parra", edad: 25, media: 66, posicion: "PO" , foto: "img/jugadores/J/joan.png" },

  { nombre: "J.Cardona", edad: 26, media: 66, posicion: "DFC" , foto: "img/jugadores/J/jcardona.png" },
  { nombre: "J.Castaño", edad: 27, media: 65, posicion: "DFC" , foto: "img/jugadores/C/castano.png" },
  { nombre: "K.Cuesta", edad: 25, media: 66, posicion: "DFC"  , foto: "img/jugadores/K/kcuesta.png"},
  { nombre: "J.Riquett", edad: 35, media: 64, posicion: "DFC" , foto: "img/jugadores/R/riquett.png" },
  { nombre: "Stalin V.", edad: 22, media: 65, posicion: "DFC" , foto: "img/jugadores/S/stalin.png"   , nacionalidad: "ecuador" },
  { nombre: "J.Cuesta", edad: 28, media: 66, posicion: "LD"  , foto: "img/jugadores/J/jcuesta.png"},
  { nombre: "K.Tamayo", edad: 26, media: 64, posicion: "LI"  , foto: "img/jugadores/T/tamayo.png"},
  { nombre: "E.Navarro", edad: 26, media: 65, posicion: "LD", foto: "img/jugadores/E/efrain.png"   },
  { nombre: "Y.Rodallega", edad: 25, media: 65, posicion: "LI" , foto: "img/jugadores/Y/yroda.png"  },

  { nombre: "Jader Q.", edad: 25, media: 65, posicion: "MD" , foto: "img/jugadores/J/jader.png"  },
  { nombre: "J.Beltran", edad: 26, media: 66, posicion: "MO" , foto: "img/jugadores/B/beltran.png"  },
  { nombre: "Niche Sanchez", edad: 25, media: 65, posicion: "MO"  , foto: "img/jugadores/N/niche.png"},
  { nombre: "I.Rojas", edad: 28, media: 65, posicion: "MD"  , foto: "img/jugadores/R/rojas.png"},
  { nombre: "A.Roa", edad: 32, media: 64, posicion: "MO" , foto: "img/jugadores/R/roa.png"},
  { nombre: "J.Alvarado", edad: 26, media: 66, posicion: "MD" , foto: "img/jugadores/A/alvarado.png" },

  { nombre: "Deinner Q.", edad: 30, media: 66, posicion: "ED"  , foto: "img/jugadores/D/deiqui.png" },
  { nombre: "D.Moreno", edad: 40, media: 70, posicion: "DC" , foto: "img/jugadores/D/dayro.png" },
  { nombre: "M.Zuleta", edad: 23, media: 66, posicion: "EI"  , foto: "img/jugadores/M/mzuleta.png"},
  { nombre: "J.Zapata", edad: 25, media: 67, posicion: "DC" , foto: "img/jugadores/J/jefry.png" },
  { nombre: "Pipe Gomez", edad: 26, media: 66, posicion: "EI" , foto: "img/jugadores/P/pipe.png" },
  { nombre: "M.Barrios", edad: 34, media: 66, posicion: "ED"  , foto: "img/jugadores/M/michael.png"}
],

"Pereira": [
  { nombre: "J.Martinez", edad: 19, media: 62, posicion: "PO" },
  { nombre: "Y.Gomez", edad: 26, media: 65, posicion: "PO" , foto: "img/jugadores/Y/ygomez.png"},

  { nombre: "W.Pacheco", edad: 31, media: 66, posicion: "LD" , foto: "img/jugadores/W/walmer.png" },
  { nombre: "F.Delgado", edad: 26, media: 63, posicion: "LI" , foto: "img/jugadores/F/fabio.png" },
  { nombre: "S.Urrea", edad: 23, media: 63, posicion: "DFC", foto: "img/jugadores/S/surrea.png"},
  { nombre: "T.Bovone", edad: 22, media: 64, posicion: "LI", foto: "img/jugadores/T/tbovone.png"},
  { nombre: "J.Bazan", edad: 20, media: 65, posicion: "DFC" , foto: "img/jugadores/B/bazan.png" },
  { nombre: "Danilo O.", edad: 33, media: 65, posicion: "DFC"  , foto: "img/jugadores/D/dortiz.png" , nacionalidad: "paraguay" },
  { nombre: "S.Aguilar", edad: 27, media: 65, posicion: "DFC" , foto: "img/jugadores/A/aguilar.png" },
  { nombre: "J.Monroy", edad: 30, media: 64, posicion: "LD" , foto: "img/jugadores/M/monroy.png" , nacionalidad: "armenia"},
  { nombre: "Eber M.", edad: 24, media: 63, posicion: "LI" , foto: "img/jugadores/E/eber.png"  },

  { nombre: "Nicolas R.", edad: 21, media: 64, posicion: "MD" , foto: "img/jugadores/N/nrengifo.png" },
  { nombre: "S.Acosta", edad: 31, media: 65, posicion: "MO" , foto: "img/jugadores/A/acosta.png" },
  { nombre: "M.Aguirre", edad: 19, media: 58, posicion: "MD"  },
  { nombre: "D.Mendoza", edad: 25, media: 63, posicion: "MD", foto: "img/jugadores/D/dmendo.png"  },
  { nombre: "J.Bermudez", edad: 25, media: 63, posicion: "MD" , foto: "img/jugadores/B/bermudez.png" },
  { nombre: "E.Moreno", edad: 32, media: 64, posicion: "MO" , foto: "img/jugadores/E/ederson.png" },

  { nombre: "Y.Quiñones", edad: 23, media: 66, posicion: "EI" , foto: "img/jugadores/Y/yuber.png" },
  { nombre: "J.Largacha", edad: 22, media: 64, posicion: "EI" , foto: "img/jugadores/L/largacha.png"},
  { nombre: "A.Plata", edad: 35, media: 65, posicion: "ED" , foto: "img/jugadores/P/plata.png" },
  { nombre: "M.Perez", edad: 35, media: 65, posicion: "DC" , foto: "img/jugadores/P/perezmarco.png" },
  { nombre: "G.Torres", edad: 29, media: 66, posicion: "ED" , foto: "img/jugadores/G/gtorres.png" }
],

  "Pasto": [
  { nombre: "G.Banguera", edad: 30, media: 66, posicion: "PO" , foto: "img/jugadores/B/banguera.png" },
  { nombre: "I.Herrerin", edad: 38, media: 65, posicion: "PO" , foto: "img/jugadores/H/herrerin.png" , nacionalidad: "espana" },

  { nombre: "N.Gil", edad: 28, media: 65, posicion: "DFC", foto: "img/jugadores/G/giln.png"  },
  { nombre: "S.Jimenez", edad: 27, media: 66, posicion: "LD" , foto: "img/jugadores/S/sjimenez.png" },
  { nombre: "F.Torijano", edad: 37, media: 66, posicion: "DFC" , foto: "img/jugadores/T/torijano.png" },
  { nombre: "M.Garavito", edad: 25, media: 65, posicion: "LI", foto: "img/jugadores/G/garavito.png" },
  { nombre: "E.Velasco", edad: 34, media: 66, posicion: "LI" , foto: "img/jugadores/V/velasco.png"  },

  { nombre: "H.Mansilla", edad: 34, media: 65, posicion: "MD" , foto: "img/jugadores/H/harrinson.png" },
  { nombre: "E.Serje", edad: 30, media: 64, posicion: "MD", foto: "img/jugadores/S/serje.png"  },
  { nombre: "D.Chavez", edad: 28, media: 65, posicion: "MO", foto: "img/jugadores/C/chavez.png"  },
  { nombre: "Y.Goez", edad: 28, media: 66, posicion: "MD", foto: "img/jugadores/G/goez.png"  },
  { nombre: "J.Caicedo", edad: 28, media: 65, posicion: "MD" , foto: "img/jugadores/J/jcai.png" },
  { nombre: "J.Bernal", edad: 23, media: 64, posicion: "MO" , foto: "img/jugadores/B/bernal.png" },
  
  { nombre: "Mayer Gil", edad: 22, media: 65, posicion: "EI" , foto: "img/jugadores/M/mayer.png" },
  { nombre: "Andrey E.", edad: 31, media: 67, posicion: "EI", foto: "img/jugadores/E/estupinan.png"  },
  { nombre: "J.Perlaza", edad: 24, media: 64, posicion: "MD" , foto: "img/jugadores/P/perlaza.png" },
  { nombre: "J.Micolta", edad: 23, media: 66, posicion: "ED", foto: "img/jugadores/J/joider.png"  },
  { nombre: "S.Cordoba", edad: 28, media: 65, posicion: "DC" , foto: "img/jugadores/C/cordoba.png" },
  { nombre: "W.Morelo", edad: 38, media: 66, posicion: "DC", foto: "img/jugadores/W/wmorelo.png"  },
  { nombre: "M.Pisano", edad: 34, media: 67, posicion: "MO" , foto: "img/jugadores/P/pisano.png", nacionalidad: "argentina" }
  
],

"Bucaramanga": [
  { nombre: "A.Quintana", edad: 31, media: 70, posicion: "PO" , foto: "img/jugadores/A/aldair.png" },
  { nombre: "L.Vasquez", edad: 29, media: 66, posicion: "PO" , foto: "img/jugadores/E/erney.png" },

  { nombre: "J.Mena", edad: 36, media: 66, posicion: "DFC", foto: "img/jugadores/J/jmena.png"  },
  { nombre: "C.de las Salas", edad: 27, media: 64, posicion: "LI" , foto: "img/jugadores/C/cdls.png" },
  { nombre: "Jose G.", edad: 22, media: 65, posicion: "DFC", foto: "img/jugadores/J/joseg.png"  },
  { nombre: "M.Rea", edad: 28, media: 68, posicion: "DFC", foto: "img/jugadores/R/rea.png"  },
  { nombre: "C.Romaña", edad: 26, media: 66, posicion: "DFC", foto: "img/jugadores/C/cromana.png"  },
  { nombre: "Aldair G.", edad: 27, media: 66, posicion: "LD" , foto: "img/jugadores/A/aldairg.png" },
  { nombre: "F.Hinestroza", edad: 35, media: 66, posicion: "LI" , foto: "img/jugadores/F/fredy.png" },

  { nombre: "F.Sambueza", edad: 37, media: 71, posicion: "MO", foto: "img/jugadores/S/sambueza.png" , nacionalidad: "argentina" },
  { nombre: "A.Zarate", edad: 26, media: 65, posicion: "MD", foto: "img/jugadores/A/aldairz.png"  },
  { nombre: "K.Londoño", edad: 32, media: 67, posicion: "MO", foto: "img/jugadores/K/klondono.png"  },
  { nombre: "L.Florez", edad: 30, media: 66, posicion: "MD", foto: "img/jugadores/L/leoflo.png" , nacionalidad: "venezuela" },
  { nombre: "F.Charrupi", edad: 24, media: 65, posicion: "MD", foto: "img/jugadores/F/felix.png"  },
  { nombre: "G.Charrupi", edad: 21, media: 65, posicion: "MD" , foto: "img/jugadores/G/gustavo.png" },

  { nombre: "L.Pons", edad: 35, media: 71, posicion: "DC", foto: "img/jugadores/P/pons.png" , nacionalidad: "argentina"  },
  { nombre: "E.Batalla", edad: 24, media: 69, posicion: "ED", foto: "img/jugadores/B/batalla.png"  },
  { nombre: "Brandon C.", edad: 24, media: 64, posicion: "DC", foto: "img/jugadores/B/brandonc.png"  },
  { nombre: "J.F. Salazar", edad: 30, media: 67, posicion: "ED" , foto: "img/jugadores/F/fredys.png" },
  { nombre: "Faber Gil", edad: 30, media: 66, posicion: "ED", foto: "img/jugadores/G/gil.png"  },
  { nombre: "G.Medina", edad: 21, media: 64, posicion: "DC", foto: "img/jugadores/G/gleyfer.png"  },
  { nombre: "J.C. Mosquera", edad: 23, media: 66, posicion: "EI" , foto: "img/jugadores/J/jcmos.png" }
],

"Alianza": [
  { nombre: "J.Chaverra", edad: 33, media: 65, posicion: "PO" , foto: "img/jugadores/C/chaverra.png" },
  { nombre: "J.Wallens", edad: 33, media: 64, posicion: "PO" , foto: "img/jugadores/W/wallens.png" },

  { nombre: "J.Figueroa", edad: 29, media: 64, posicion: "DFC" , foto: "img/jugadores/F/figueroa.png" },
  { nombre: "P.Franco", edad: 34, media: 64, posicion: "DFC" , foto: "img/jugadores/F/franco.png" },
  { nombre: "K.Moreno", edad: 25, media: 65, posicion: "DFC", foto: "img/jugadores/K/kmoreno.png"  },
  { nombre: "J.Viveros", edad: 22, media: 63, posicion: "DFC", foto: "img/jugadores/V/viverosj.png"  },
  { nombre: "J.P. Arcilla", edad: 25, media: 63, posicion: "LI" , foto: "img/jugadores/J/jarcila.png" },
  { nombre: "E.Banguero", edad: 24, media: 65, posicion: "LI" , foto: "img/jugadores/E/eduard.png" },
  { nombre: "Y.Rosales", edad: 25, media: 64, posicion: "LD" , foto: "img/jugadores/Y/yilson.png" },

  { nombre: "W.Fernandez", edad: 28, media: 66, posicion: "MD" , foto: "img/jugadores/W/wiston.png" , nacionalidad: "uruguay"},
  { nombre: "Ever Meza", edad: 25, media: 63, posicion: "MD", foto: "img/jugadores/E/ever.png"  },
  { nombre: "C.Esparragoza", edad: 26, media: 66, posicion: "MD" , foto: "img/jugadores/E/esparragoza.png" },
  { nombre: "Jhair C.", edad: 28, media: 65, posicion: "MD" , foto: "img/jugadores/J/jhair.png" },
  { nombre: "Josy Pérez", edad: 26, media: 63, posicion: "MD" , foto: "img/jugadores/J/josy.png"  },
  { nombre: "Charly V.", edad: 20, media: 62, posicion: "MO" },

  { nombre: "F.Pardo", edad: 35, media: 65, posicion: "ED" , foto: "img/jugadores/P/pardo.png" },
  { nombre: "J.Muñoz", edad: 24, media: 63, posicion: "ED" , foto: "img/jugadores/J/jmunoz.png" },
  { nombre: "S.Aponza", edad: 20, media: 64, posicion: "EI" , foto: "img/jugadores/S/saponza.png" },
  { nombre: "Y.Londoño", edad: 25, media: 64, posicion: "EI", foto: "img/jugadores/Y/yeiner.png"  },
  { nombre: "C.Lucumi", edad: 25, media: 66, posicion: "DC" , foto: "img/jugadores/L/lucumi.png" },
  { nombre: "F.Fiorelli", edad: 21, media: 65, posicion: "DC"  , nacionalidad: "uruguay" }
],


"Inter Bogotá": [
  { nombre: "W.Fariñez", edad: 27, media: 67, posicion: "PO", foto: "img/jugadores/F/farinez.png", nacionalidad: "venezuela"  },
  { nombre: "J.Carrasco", edad: 18, media: 57, posicion: "PO" },

  { nombre: "K.Suarez", edad: 23, media: 65, posicion: "LI" , foto: "img/jugadores/K/kalazan.png" },
  { nombre: "M.Rodas", edad: 28, media: 65, posicion: "DFC" , foto: "img/jugadores/R/rodas.png" },
  { nombre: "C.Vivas", edad: 23, media: 65, posicion: "DFC", foto: "img/jugadores/V/vivas.png", nacionalidad: "venezuela"  },
  { nombre: "Y.Gomez", edad: 28, media: 65, posicion: "LI" , foto: "img/jugadores/Y/yulian.png" },
  { nombre: "A.Irazoque", edad: 26, media: 66, posicion: "DFC", foto: "img/jugadores/A/airazoque.png"  },
  { nombre: "R.Julio", edad: 21, media: 64, posicion: "LD" , foto: "img/jugadores/R/ronaldo.png"  },
  { nombre: "Joan C.", edad: 29, media: 66, posicion: "LD" , foto: "img/jugadores/C/castro.png"  },

  { nombre: "Larry V." , edad: 33, media: 67, posicion: "MD", foto: "img/jugadores/L/larry.png"   },
  { nombre: "S.Mayo", edad: 23, media: 64, posicion: "MD" , foto: "img/jugadores/M/mayo.png" },
  { nombre: "Dannovi Q.", edad: 25, media: 66, posicion: "MD" , foto: "img/jugadores/D/dannovi.png" },
  { nombre: "R.Manjarrez", edad: 25, media: 65, posicion: "MO" , foto: "img/jugadores/M/manjarrez.png" },
  { nombre: "F.Bone", edad: 30, media: 70, posicion: "MO", foto: "img/jugadores/B/bone.png" , nacionalidad: "uruguay" },

  { nombre: "J.Caballero", edad: 27, media: 66, posicion: "EI", foto: "img/jugadores/P/pino.png"  },
  { nombre: "J.Valencia", edad: 21, media: 65, posicion: "DC", foto: "img/jugadores/V/valencia.png"  },
  { nombre: "F.Sanguinetti", edad: 25, media: 66, posicion: "DC" , foto: "img/jugadores/F/fabricio.png", nacionalidad: "uruguay"},
  { nombre: "Dereck M.", edad: 18, media: 65, posicion: "ED" , foto: "img/jugadores/D/dereck.png"  , nacionalidad: "honduras" },
  { nombre: "Bayron C.", edad: 20, media: 63, posicion: "DC"  },
  { nombre: "K.Parra", edad: 22, media: 68, posicion: "EI" , foto: "img/jugadores/P/parra.png" }
],

"Águilas": [
  { nombre: "I.Arboleda", edad: 29, media: 67, posicion: "PO" , foto: "img/jugadores/A/arboleda.png" },
  { nombre: "A.Salazar", edad: 32, media: 65, posicion: "PO" , foto: "img/jugadores/A/asalazar.png"},

  { nombre: "D.Hernandez", edad: 25, media: 65, posicion: "DFC" , foto: "img/jugadores/H/hernandez.png" },
  { nombre: "A.Higgins", edad: 21, media: 59, posicion: "DFC" , foto: "img/jugadores/H/higgins.png"},
  { nombre: "H.Lopez", edad: 34, media: 65, posicion: "DFC" , foto: "img/jugadores/L/lopez.png", nacionalidad: "argentina"  },
  { nombre: "N.Lara", edad: 22, media: 66, posicion: "DFC" , foto: "img/jugadores/L/lara.png" },
  { nombre: "J.Garcia", edad: 36, media: 65, posicion: "DFC" , foto: "img/jugadores/G/garciajhon.png" },
  { nombre: "Dylan L.", edad: 23, media: 65, posicion: "LD" , foto: "img/jugadores/D/dylan.png"},
  { nombre: "A.Alvarez", edad: 26, media: 67, posicion: "LI" , foto: "img/jugadores/A/aalva.png"},
  { nombre: "Javier M.", edad: 21, media: 64, posicion: "LI" , foto: "img/jugadores/M/mena.png" },

  { nombre: "J.Pineda", edad: 28, media: 67, posicion: "MD", foto: "img/jugadores/P/pineda.png"  },
  { nombre: "F.Lozano", edad: 32, media: 67, posicion: "MD" , foto: "img/jugadores/L/lozano.png" },
  { nombre: "J.Avalo", edad: 24, media: 65, posicion: "MD" , foto: "img/jugadores/A/avalo.png"},
  { nombre: "A.Ricaurte", edad: 34, media: 67, posicion: "MO" , foto: "img/jugadores/R/ricaurte.png"},
  { nombre: "J.Roa", edad: 31, media: 65, posicion: "MD" , foto: "img/jugadores/R/roaj.png"},
  { nombre: "Royner B.", edad: 20, media: 66, posicion: "MO", foto: "img/jugadores/R/royner.png" },

  { nombre: "B.Urueña", edad: 33, media: 67, posicion: "EI" , foto: "img/jugadores/B/bryanu.png"},
  { nombre: "C.Cañozales", edad: 26, media: 65, posicion: "ED", foto: "img/jugadores/C/canozales.png" },
  { nombre: "C.Rojas", edad: 27, media: 65, posicion: "DC" , foto: "img/jugadores/C/crojas.png"},
  { nombre: "J.Rivaldo", edad: 22, media: 66, posicion: "DC" , foto: "img/jugadores/R/rivaldo.png" },
  { nombre: "J.Obregon", edad: 28, media: 66, posicion: "DC", foto: "img/jugadores/J/jobregon.png"  },
  { nombre: "F.Charales", edad: 21, media: 66, posicion: "ED" , foto: "img/jugadores/F/fcharales.png" } 

],

"Fortaleza": [
  { nombre: "M.Silva", edad: 25, media: 65, posicion: "PO" , foto: "img/jugadores/S/silva.png"  , nacionalidad: "venezuela"  },
  { nombre: "M.Barragan", edad: 21, media: 57, posicion: "PO" },
  { nombre: "C.Santander", edad: 22, media: 64, posicion: "PO"  , foto: "img/jugadores/S/santander.png" },

  { nombre: "Y.Diaz", edad: 28, media: 67, posicion: "DFC" , foto: "img/jugadores/Y/yesid.png" },
  { nombre: "D.Pisciotti", edad: 24, media: 66, posicion: "DFC", foto: "img/jugadores/P/pisciotti.png"  },
  { nombre: "J.Balanta", edad: 27, media: 64, posicion: "DFC", foto: "img/jugadores/B/balantajhon.png"  },
  { nombre: "M.Pernia", edad: 25, media: 65, posicion: "LI" , foto: "img/jugadores/P/pernia.png" , nacionalidad: "venezuela"  },
  { nombre: "S.Cuero", edad: 21, media: 64, posicion: "LI", foto: "img/jugadores/S/scuero.png"  },
  { nombre: "J.Marulanda", edad: 30, media: 66, posicion: "LD" , foto: "img/jugadores/M/marulanda.png" },
  { nombre: "J.Cajares", edad: 22, media: 64, posicion: "LD", foto: "img/jugadores/C/cajares.png"  },

  { nombre: "K.Balanta", edad: 21, media: 64, posicion: "MD", foto: "img/jugadores/K/kbalanta.png"  },
  { nombre: "S.Ramirez", edad: 19, media: 62, posicion: "MD", foto: "img/jugadores/R/ramirez.png"  },
  { nombre: "Leo Pico", edad: 34, media: 67, posicion: "MD" , foto: "img/jugadores/P/pico.png" },
  { nombre: "S.Navarro", edad: 25, media: 66, posicion: "MD", foto: "img/jugadores/N/navarro.png"  },
  { nombre: "A.Arroyo", edad: 23, media: 67, posicion: "MO", foto: "img/jugadores/A/arroyo.png"  },
  { nombre: "J.Velasquez", edad: 30, media: 66, posicion: "MO" , foto: "img/jugadores/V/velasquez.png" },
  { nombre: "Richardson R.", edad: 20, media: 65, posicion: "MO" },

  { nombre: "A.Batioja", edad: 20, media: 64, posicion: "EI", foto: "img/jugadores/B/batioja.png"  },
  { nombre: "A.Amaya", edad: 24, media: 66, posicion: "ED" , foto: "img/jugadores/A/amaya.png" },
  { nombre: "Teun Wilke", edad: 23, media: 65, posicion: "DC" , foto: "img/jugadores/W/wilke.png" , nacionalidad: "mexico" },
  { nombre: "S.Herrera", edad: 31, media: 65, posicion: "DC" , foto: "img/jugadores/S/sherrera.png" },
  { nombre: "F.Pulicastro", edad: 26, media: 65, posicion: "DC", foto: "img/jugadores/P/pulicastro.png"  , nacionalidad: "argentina" },
  { nombre: "J.Salas", edad: 22, media: 65, posicion: "DC" , foto: "img/jugadores/S/salas.png" }
],

"Llaneros": [
  { nombre: "M.Ortega", edad: 30, media: 66, posicion: "PO" , foto: "img/jugadores/M/mortega.png" , nacionalidad: "mexico" },
  { nombre: "R.Romaña", edad: 29, media: 65, posicion: "PO" , foto: "img/jugadores/R/roameth.png"},
  { nombre: "J.Loaiza", edad: 23, media: 63, posicion: "PO" , foto: "img/jugadores/L/loaiza.png"},

  { nombre: "F.Meza", edad: 34, media: 67, posicion: "DFC" , foto: "img/jugadores/P/pacho.png"},
  { nombre: "Dennys Q.", edad: 28, media: 65, posicion: "DFC", foto: "img/jugadores/D/dennys.png" , nacionalidad: "ecuador"},
  { nombre: "A.Moralez", edad: 24, media: 65, posicion: "DFC" , foto: "img/jugadores/M/moralez.png"},
  { nombre: "J.Medranda", edad: 31, media: 66, posicion: "LI" , foto: "img/jugadores/M/medranda.png"},
  { nombre: "L.Riascos", edad: 25, media: 66, posicion: "LD", foto: "img/jugadores/L/leider.png" },
  { nombre: "Howell M.", edad: 24, media: 65, posicion: "DFC" , foto: "img/jugadores/H/howell.png"},
  { nombre: "J.Pertuz", edad: 21, media: 64, posicion: "LD" , foto: "img/jugadores/P/pertuz.png"},

  { nombre: "B.Benitez", edad: 29, media: 65, posicion: "MD" , foto: "img/jugadores/B/benitez.png" , nacionalidad: "argentina"},
  { nombre: "E.Restrepo", edad: 26, media: 65, posicion: "MD" , foto: "img/jugadores/E/eyder.png"},
  { nombre: "E.Laszo", edad: 26, media: 64, posicion: "MD", foto: "img/jugadores/L/laszo.png" },
  { nombre: "M.Sierra", edad: 31, media: 65, posicion: "MD" , foto: "img/jugadores/M/marlon.png"},
  { nombre: "K.Caicedo", edad: 28, media: 64, posicion: "MD" , foto: "img/jugadores/K/kcaicedo.png"},
  { nombre: "K.Osorio", edad: 32, media: 67, posicion: "MO" , foto: "img/jugadores/K/kelvin.png"},
  { nombre: "J.J. Ramirez", edad: 23, media: 66, posicion: "MO" , foto: "img/jugadores/C/chocolo.png"},

  { nombre: "D.Mantilla", edad: 29, media: 67, posicion: "EI" , foto: "img/jugadores/D/dmantilla.png"},
  { nombre: "J.Vasquez", edad: 30, media: 67, posicion: "ED", foto: "img/jugadores/J/jhonva.png" },
  { nombre: "L.Miranda", edad: 28, media: 66, posicion: "ED", foto: "img/jugadores/L/luismi.png" },
  { nombre: "L.Marimon", edad: 21, media: 64, posicion: "DC" , foto: "img/jugadores/M/marimon.png"},
  { nombre: "C.Barreiro", edad: 24, media: 66, posicion: "DC" , foto: "img/jugadores/B/barreiro.png"},
  { nombre: "Jhonier B.", edad: 25, media: 64, posicion: "DC", foto: "img/jugadores/B/blanco.png" }
],

"B.Chico": [
  { nombre: "D.Denis", edad: 33, media: 62, posicion: "PO", foto: "img/jugadores/D/denis.png", nacionalidad: "uruguay" },
  { nombre: "R.Caicedo", edad: 31, media: 63, posicion: "PO" , foto: "img/jugadores/R/rogerio.png"},

  { nombre: "A.Saldaña", edad: 22, media: 64, posicion: "DFC" , foto: "img/jugadores/S/saldana.png"},
  { nombre: "Arlen B.", edad: 25, media: 65, posicion: "DFC", foto: "img/jugadores/A/arlen.png" },
  { nombre: "S.Palma", edad: 26, media: 65, posicion: "DFC", foto: "img/jugadores/P/palma.png" },
  { nombre: "J.Quiceno", edad: 21, media: 65, posicion: "DFC" , foto: "img/jugadores/J/jquiceno.png"},
  { nombre: "Yaliston M.", edad: 25, media: 65, posicion: "LI", foto: "img/jugadores/Y/yaliston.png" },
  { nombre: "J.Diaz", edad: 25, media: 64, posicion: "LD" , foto: "img/jugadores/D/diazj.png"},

  { nombre: "Delio R.", edad: 25, media: 65, posicion: "MD", foto: "img/jugadores/D/delio.png" },
  { nombre: "Y.Cabrera", edad: 35, media: 67, posicion: "MO", foto: "img/jugadores/Y/yesus.png" },
  { nombre: "N.Anelka", edad: 24, media: 66, posicion: "MD" , foto: "img/jugadores/N/nanelka.png"},
  { nombre: "S.Salazar", edad: 29, media: 65, posicion: "MD", foto: "img/jugadores/S/sesalazar.png" },
  { nombre: "A.Aedo", edad: 21, media: 64, posicion: "MD" , foto: "img/jugadores/A/aedo.png"},
  { nombre: "Oscar C.", edad: 19, media: 64, posicion: "MO" , foto: "img/jugadores/C/caicedoscar.png"},
  { nombre: "J.C. Diaz", edad: 24, media: 64, posicion: "MD", foto: "img/jugadores/J/jcdiaz.png" },

  { nombre: "J.Romaña", edad: 20, media: 62, posicion: "EI" , foto: "img/jugadores/R/romana.png"},
  { nombre: "Jeison M.", edad: 23, media: 65, posicion: "ED" , foto: "img/jugadores/J/jeimena.png"},
  { nombre: "J.Pimentel", edad: 24, media: 64, posicion: "EI" , foto: "img/jugadores/P/pimentel.png"},
  { nombre: "Italo M.", edad: 26, media: 64, posicion: "DC", foto: "img/jugadores/M/mitalo.png" },
  { nombre: "J.Molina", edad: 32, media: 67, posicion: "DC" , foto: "img/jugadores/M/molina.png"}
],

"Envigado": [
  { nombre: "A.Tovar", edad: 19, media: 63, posicion: "PO", foto: "img/jugadores/T/tovar.png" },
  { nombre: "J.P.Montoya", edad: 27, media: 65, posicion: "PO" , foto: "img/jugadores/P/pmontoya.png"},

  { nombre: "J.Gamboa", edad: 24, media: 63, posicion: "DFC" , foto: "img/jugadores/G/gamboa.png"},
  { nombre: "S.Noreña", edad: 27, media: 64, posicion: "DFC", foto: "img/jugadores/N/norena.png" },
  { nombre: "J.Quejada", edad: 19, media: 61, posicion: "DFC" },
  { nombre: "Neymar U.", edad: 22, media: 63, posicion: "LD" , foto: "img/jugadores/N/neymar.png"},
  { nombre: "G.Cuervo", edad: 24, media: 65, posicion: "LD", foto: "img/jugadores/G/gendry.png" },

  { nombre: "J.J. Cataño", edad: 17, media: 58, posicion: "MD" },
  { nombre: "Edison L.", edad: 26, media: 64, posicion: "MO", foto: "img/jugadores/E/elopez.png" },
  { nombre: "T.Soto", edad: 21, media: 62, posicion: "MD" },
  { nombre: "N.Ronaldo", edad: 20, media: 62, posicion: "MO" , foto: "img/jugadores/N/nronaldo.png" },
  { nombre: "Frey Berrio", edad: 19, media: 61, posicion: "MO" , foto: "img/jugadores/F/fberrio.png" },
  { nombre: "Julian P.", edad: 22, media: 62, posicion: "MD" , foto: "img/jugadores/P/palaciosju.png" },

  { nombre: "Dairon V.", edad: 26, media: 64, posicion: "EI", foto: "img/jugadores/V/valenciadairon.png"  },
  { nombre: "R.España", edad: 22, media: 63, posicion: "EI" , foto: "img/jugadores/E/erubio.png" },
  { nombre: "D.Dawson", edad: 20, media: 62, posicion: "ED", foto: "img/jugadores/D/dawson.png"  },
  { nombre: "M.Marulanda", edad: 17, media: 60, posicion: "DC" },
  { nombre: "S.Londoño", edad: 17, media: 63, posicion: "DC" },
  { nombre: "J.Hernandez", edad: 32, media: 63, posicion: "DC" , foto: "img/jugadores/H/hernanjes.png"},
  { nombre: "Stiwart A.", edad: 27, media: 62, posicion: "DC" , foto: "img/jugadores/S/stiwart.png" }
],

"U.Magdalena": [
  { nombre: "V.Cabezas", edad: 28, media: 64, posicion: "PO", foto: "img/jugadores/V/victor.png"  },
  { nombre: "D.Mojica", edad: 19, media: 58, posicion: "PO" },

  { nombre: "J.Peñaloza", edad: 17, media: 61, posicion: "DFC", foto: "img/jugadores/P/penaloza.png"  },
  { nombre: "F.Molina", edad: 22, media: 62, posicion: "DFC" , foto: "img/jugadores/F/fmolina.png" , nacionalidad: "venezuela"},
  { nombre: "Dilan O.", edad: 22, media: 61, posicion: "DFC", foto: "img/jugadores/D/dilan.png"  },
  { nombre: "J.J. Vazquez", edad: 26, media: 64, posicion: "LI" },
  { nombre: "D.Mera", edad: 23, media: 65, posicion: "LD" , foto: "img/jugadores/D/dmera.png" },

  { nombre: "Y.Congo", edad: 27, media: 65, posicion: "MD", foto: "img/jugadores/Y/ycongo.png"  },
  { nombre: "J.D. Giraldo", edad: 28, media: 64, posicion: "MD" , foto: "img/jugadores/G/giraldojd.png" },
  { nombre: "J.Mercado", edad: 22, media: 64, posicion: "MO", foto: "img/jugadores/M/mercado.png"  },

  { nombre: "J.H. Palacios", edad: 29, media: 63, posicion: "EI" },
  { nombre: "J.Pinto", edad: 20, media: 60, posicion: "EI" },
  { nombre: "G.Arrieta", edad: 20, media: 60, posicion: "EI"  },
  { nombre: "J.Lerma", edad: 23, media: 64, posicion: "ED", foto: "img/jugadores/L/lerma.png"  },
  { nombre: "C.Iguaran", edad: 20, media: 63, posicion: "DC", foto: "img/jugadores/C/ciguaran.png"  },
  { nombre: "A.Carreño", edad: 22, media: 62, posicion: "DC", foto: "img/jugadores/C/carreno.png"  },
  { nombre: "Kleber Diaz", edad: 22, media: 61, posicion: "DC", foto: "img/jugadores/K/kleber.png"  },
  { nombre: "J.Pimienta", edad: 27, media: 61, posicion: "DC" }
],

"Jaguares": [
  { nombre: "D.Martinez", edad: 36, media: 66, posicion: "PO" , foto: "img/jugadores/D/dmarti.png"  },
  { nombre: "Frankin M.", edad: 26, media: 64, posicion: "PO" , foto: "img/jugadores/F/franklin.png"  },

  { nombre: "C.Henao", edad: 37, media: 66, posicion: "DFC", foto: "img/jugadores/H/henao.png"  },
  { nombre: "C.Ordoñez", edad: 23, media: 65, posicion: "DFC" , foto: "img/jugadores/C/cordonez.png" },
  { nombre: "M.Castaño", edad: 32, media: 65, posicion: "LI" , foto: "img/jugadores/C/castanom.png" },
  { nombre: "L.Jimenez", edad: 28, media: 64, posicion: "LD" , foto: "img/jugadores/L/luisji.png" },
  { nombre: "J.Altamiranda", edad: 25, media: 65, posicion: "LD", foto: "img/jugadores/A/altami.png"  },

  { nombre: "Bladimir A.", edad: 24, media: 64, posicion: "MD" , foto: "img/jugadores/B/bladimir.png" },
  { nombre: "F.Mosquera", edad: 30, media: 65, posicion: "MD" , foto: "img/jugadores/F/fabianm.png" },
  { nombre: "Y.Mosquera", edad: 30, media: 64, posicion: "MD" , foto: "img/jugadores/Y/yan.png" },
  { nombre: "J.Hinestroza", edad: 23, media: 65, posicion: "MD", foto: "img/jugadores/H/hinestroza.png"  },
  { nombre: "Roycer C.", edad: 30, media: 65, posicion: "MD", foto: "img/jugadores/R/roycer.png"  },
  { nombre: "C. Jopito A.", edad: 33, media: 68, posicion: "MO" , foto: "img/jugadores/J/jopito.png" , nacionalidad: "argentina"  },
  { nombre: "Y.Moreno", edad: 30, media: 67, posicion: "MO", foto: "img/jugadores/Y/yairo.png"  },

  { nombre: "W. de la Rosa", edad: 32, media: 66, posicion: "ED" , foto: "img/jugadores/W/wilfrido.png" },
  { nombre: "Duvan R.", edad: 29, media: 65, posicion: "ED" , foto: "img/jugadores/D/duvan.png" },
  { nombre: "K.Lenis", edad: 24, media: 66, posicion: "EI" , foto: "img/jugadores/K/klenis.png"  , nacionalidad: "panama" },
  { nombre: "J.Maza", edad: 31, media: 65, posicion: "EI" , foto: "img/jugadores/M/maza.png" },
  { nombre: "J.Viveros", edad: 33, media: 65, posicion: "EI" , foto: "img/jugadores/V/viverosjag.png" },
  { nombre: "A.Renteria", edad: 32, media: 67, posicion: "DC", foto: "img/jugadores/R/renteria.png"  },
  { nombre: "S.Cubides", edad: 25, media: 64, posicion: "DC" , foto: "img/jugadores/C/cubides.png"  },
  { nombre: "Darwin L.", edad: 33, media: 66, posicion: "DC" , foto: "img/jugadores/D/darwinl.png" }
],

"Real Cartagena": [
  { nombre: "G.Gomez", edad: 29, media: 66, posicion: "PO" , foto: "img/jugadores/G/ggomez.png"  },
  { nombre: "A.Montes", edad: 25, media: 64, posicion: "PO" , foto: "img/jugadores/A/Aldo.png" },
  { nombre: "R.Fontalvo", edad: 27, media: 64, posicion: "PO" , foto: "img/jugadores/F/fontalvo.png" },

  { nombre: "G.Tegüe", edad: 26, media: 65, posicion: "DFC", foto: "img/jugadores/T/tegue.png"  },
  { nombre: "R.Lora", edad: 28, media: 66, posicion: "DFC", foto: "img/jugadores/L/lora.png"  },
  { nombre: "S.Barco", edad: 20, media: 59, posicion: "DFC" },
  { nombre: "Joiner M.", edad: 25, media: 64, posicion: "LD" , foto: "img/jugadores/J/joiner.png" },
  { nombre: "C.Graciano", edad: 22, media: 65, posicion: "LD" , foto: "img/jugadores/G/graciano.png" },
  { nombre: "A.Escobar", edad: 28, media: 66, posicion: "LI", foto: "img/jugadores/E/escobar.png"  },

  { nombre: "J.D. Rodriguez", edad: 33, media: 65, posicion: "MD", foto: "img/jugadores/D/dajuanrod.png"  },
  { nombre: "L.Guevara", edad: 24, media: 64, posicion: "MD", foto: "img/jugadores/G/guevara.png"  },
  { nombre: "D.Pino", edad: 30, media: 65, posicion: "MD" , foto: "img/jugadores/P/pinodi.png" },
  { nombre: "J.Solarte", edad: 24, media: 65, posicion: "MD" },
  { nombre: "C.Nieva", edad: 23, media: 64, posicion: "MO" },

  { nombre: "J.Ditta", edad: 22, media: 63, posicion: "EI" , foto: "img/jugadores/D/ditta.png" },
  { nombre: "J.Aleman", edad: 23, media: 63, posicion: "EI", foto: "img/jugadores/A/aleman.png"  },
  { nombre: "L.Yanes", edad: 19, media: 61, posicion: "EI" },
  { nombre: "A.Melendez", edad: 29, media: 65, posicion: "ED" , foto: "img/jugadores/A/amelendez.png" },
  { nombre: "H.Long", edad: 19, media: 60, posicion: "DC" },
  { nombre: "F.Montero", edad: 38, media: 68, posicion: "DC", foto: "img/jugadores/F/fmontero.png"  },
  { nombre: "M.Manotas", edad: 30, media: 65, posicion: "DC", foto: "img/jugadores/M/manotas.png"  }
],

"Cucuta": [
  { nombre: "F.Abadia", edad: 27, media: 66, posicion: "PO" , foto: "img/jugadores/E/fabadia.png" , nacionalidad: "argentina"},
  { nombre: "J.Ramirez", edad: 29, media: 65, posicion: "PO", foto: "img/jugadores/R/ramirezj.png" },
  
  { nombre: "B.Montaño", edad: 23, media: 65, posicion: "DFC" , foto: "img/jugadores/B/bmontano.png"},
  { nombre: "D.Calcaterra", edad: 24, media: 66, posicion: "DFC", foto: "img/jugadores/C/calcaterra.png", nacionalidad: "argentina"  },
  { nombre: "Sebastian R.", edad: 25, media: 65, posicion: "DFC", foto: "img/jugadores/S/sebastianrod.png" },
  { nombre: "A.Quiñones", edad: 21, media: 64, posicion: "DFC", foto: "img/jugadores/A/aquinones.png" },
  { nombre: "M.Duarte", edad: 33, media: 65, posicion: "LI", foto: "img/jugadores/D/dmao.png" },
  { nombre: "A.Ballesteros", edad: 24, media: 63, posicion: "LD" , foto: "img/jugadores/B/ballesteros.png"},
  { nombre: "J.Abonia", edad: 25, media: 65, posicion: "LD", foto: "img/jugadores/A/abonia.png" },

  { nombre: "V.Mejia", edad: 32, media: 66, posicion: "MD" , foto: "img/jugadores/P/pechuga.png"},
  { nombre: "S.Tamara", edad: 29, media: 66, posicion: "MD", foto: "img/jugadores/T/tamara.png" },
  { nombre: "J.Ceballos", edad: 27, media: 65, posicion: "MD", foto: "img/jugadores/C/ceballos.png" },
  { nombre: "L.Rios", edad: 27, media: 65, posicion: "MO" , foto: "img/jugadores/L/lucas.png", nacionalidad: "argentina" },
  { nombre: "S.Orozco", edad: 29, media: 65, posicion: "MD", foto: "img/jugadores/S/sorozco.png" },
  { nombre: "A.Cano", edad: 24, media: 64, posicion: "MD", foto: "img/jugadores/C/cano.png" },
  { nombre: "K.A. Londoño", edad: 25, media: 65, posicion: "MD", foto: "img/jugadores/K/klondo.png" },
  { nombre: "L.Berdugo", edad: 23, media: 66, posicion: "MO" , foto: "img/jugadores/B/berdugo.png"},

  { nombre: "F.Castañeda", edad: 31, media: 66, posicion: "EI", foto: "img/jugadores/F/fcastaneda.png" },
  { nombre: "E.Arizalas", edad: 24, media: 65, posicion: "ED" , foto: "img/jugadores/E/earizalas.png"},
  { nombre: "J.A. Valencia", edad: 23, media: 65, posicion: "ED", foto: "img/jugadores/V/valenciajhon.png" },
  { nombre: "Luifer H.", edad: 24, media: 66, posicion: "DC", foto: "img/jugadores/L/luifer.png" , nacionalidad: "venezuela"},
  { nombre: "J.Agudelo", edad: 33, media: 65, posicion: "DC" , foto: "img/jugadores/A/agudelo.png"},
  { nombre: "J.Peralta", edad: 20, media: 66, posicion: "DC", foto: "img/jugadores/P/peralta.png" }
],


"Patriotas": [
  { nombre: "J.Espitia", edad: 25, media: 63, posicion: "PO", foto: "img/jugadores/E/espitia.png" },
  { nombre: "J.Amaya", edad: 23, media: 60, posicion: "PO" },

  { nombre: "J.Hurtado", edad: 27, media: 63, posicion: "DFC", foto: "img/jugadores/H/hurtadojan.png" },
  { nombre: "L.Renteria", edad: 20, media: 63, posicion: "LI" , foto: "img/jugadores/R/renteria.png"},
  { nombre: "D.Palomeque", edad: 32, media: 63, posicion: "DFC", foto: "img/jugadores/D/dpalomeque.png" },
  { nombre: "A.Carabali", edad: 21, media: 62, posicion: "DFC" },
  { nombre: "H.Angulo", edad: 22, media: 60, posicion: "LI" },
  { nombre: "A.Porras", edad: 26, media: 62, posicion: "LD" },

  { nombre: "M.Figueroa", edad: 27, media: 63, posicion: "MD" , foto: "img/jugadores/F/fmaclein.png" , nacionalidad: "venezuela"}, 
  { nombre: "K.Alvarez", edad: 21, media: 65, posicion: "MO" , foto: "img/jugadores/K/ksalazar.png"},
  { nombre: "K.Salazar", edad: 28, media: 65, posicion: "MD" , foto: "img/jugadores/K/kalvarez.png"},
  { nombre: "T.Molina", edad: 21, media: 63, posicion: "MD" , foto: "img/jugadores/T/tmolina.png"},

  { nombre: "C.Copete", edad: 25, media: 62, posicion: "DC", foto: "img/jugadores/C/copete.png"  },
  { nombre: "J.Perea", edad: 24, media: 62, posicion: "EI", foto: "img/jugadores/P/perea.png"  },
  { nombre: "B.Fernandez", edad: 34, media: 63, posicion: "DC" , foto: "img/jugadores/F/fbrayan.png"},
  { nombre: "J.Campaña", edad: 23, media: 63, posicion: "EI" , foto: "img/jugadores/C/campana.png"},
  { nombre: "J.Montes", edad: 21, media: 61, posicion: "ED" },
  { nombre: "M.Nike", edad: 28, media: 62, posicion: "DC" , foto: "img/jugadores/N/nikegomez.png"},
  { nombre: "J.E. Sanchez", edad: 19, media: 58, posicion: "DC"}
],


"Inter Palmira": [
  { nombre: "W.Cuesta", edad: 32, media: 65, posicion: "PO" , foto: "img/jugadores/W/wcuesta.png"  },
  { nombre: "A.Perez", edad: 26, media: 62, posicion: "PO", foto: "img/jugadores/P/perezandres.png"   },

  { nombre: "C.Ramirez", edad: 37, media: 64, posicion: "DFC" , foto: "img/jugadores/R/rcaliche.png"  },
  { nombre: "Eli Mina", edad: 26, media: 65, posicion: "DFC" , foto: "img/jugadores/E/elimina.png"  },
  { nombre: "M.Caicedo", edad: 22, media: 64, posicion: "DFC", foto: "img/jugadores/C/caicedomanu.png"   },
  { nombre: "J.Madrid", edad: 24, media: 63, posicion: "DFC" },
  { nombre: "E.Preciado", edad: 22, media: 63, posicion: "LI" },
  { nombre: "B.Ortiz", edad: 28, media: 64, posicion: "LI" },
  { nombre: "J.C. Angulo", edad: 37, media: 63, posicion: "LD" , foto: "img/jugadores/A/angulo.png"  },

  { nombre: "J.Velez", edad: 22, media: 64, posicion: "MD" , foto: "img/jugadores/V/velez.png"  },
  { nombre: "C.Franco", edad: 22, media: 63, posicion: "MD" , foto: "img/jugadores/F/francocarlos.png"  },
  { nombre: "H.Suarez", edad: 31, media: 62, posicion: "MD" , foto: "img/jugadores/H/harlin.png"  },
  { nombre: "Nicolás H.", edad: 21, media: 60, posicion: "MD" , foto: "img/jugadores/N/nicoherna.png"  },
  { nombre: "K.Padilla", edad: 24, media: 63, posicion: "MD", foto: "img/jugadores/K/kpadilla.png"   },
  { nombre: "Kener G.", edad: 20, media: 64, posicion: "MO" , foto: "img/jugadores/K/kener.png"  },
  { nombre: "Jown C.", edad: 31, media: 64, posicion: "MO", foto: "img/jugadores/J/jown.png"   },

  { nombre: "Jaider M.", edad: 21, media: 63, posicion: "EI" , foto: "img/jugadores/J/jaider.png"  },
  { nombre: "J.E. Mosquera", edad: 35, media: 62, posicion: "EI" , foto: "img/jugadores/J/jmosquera.png"  },
  { nombre: "D.Orozco", edad: 30, media: 64, posicion: "ED", foto: "img/jugadores/D/dorozco.png"   },
  { nombre: "R.Brochero", edad: 25, media: 63, posicion: "DC" , foto: "img/jugadores/R/rbrochero.png"  }
],

"Quindio": [
  { nombre: "M.Jimenez", edad: 30, media: 63, posicion: "PO", foto: "img/jugadores/M/mjimenez.png"   },
  { nombre: "S.Pabon", edad: 29, media: 63, posicion: "PO", foto: "img/jugadores/S/spabon.png"   },
  { nombre: "Joel Silva", edad: 38, media: 64, posicion: "PO", foto: "img/jugadores/S/silvajoel.png"  , nacionalidad: "paraguay" },

  { nombre: "Uberney R.", edad: 20, media: 63, posicion: "DFC" , foto: "img/jugadores/R/ruberney.png"  },
  { nombre: "H.Landázuri", edad: 17, media: 59, posicion: "DFC" },
  { nombre: "M.Payares", edad: 30, media: 64, posicion: "DFC" , foto: "img/jugadores/P/payares.png"   },
  { nombre: "J.Sandoval", edad: 24, media: 63, posicion: "LD" },
  { nombre: "S.Roa", edad: 30, media: 62, posicion: "LD", foto: "img/jugadores/S/sroa.png"   },
  { nombre: "R.Marin", edad: 24, media: 63, posicion: "LI" , foto: "img/jugadores/R/rmarin.png"  , nacionalidad: "uruguay"},

  { nombre: "Felix M.", edad: 19, media: 60, posicion: "MD" , foto: "img/jugadores/F/femosquera.png"  },
  { nombre: "A.Preciado", edad: 23, media: 63, posicion: "MD" },
  { nombre: "E.Ocampo", edad: 26, media: 63, posicion: "MD" , foto: "img/jugadores/E/eocampo.png"  },
  { nombre: "W.Arango", edad: 27, media: 64, posicion: "MO" , foto: "img/jugadores/W/warango.png"  },

  { nombre: "Joao R.", edad: 29, media: 65, posicion: "EI" , foto: "img/jugadores/W/willyjr.png"   },
  { nombre: "R.Angulo", edad: 24, media: 64, posicion: "EI" , foto: "img/jugadores/R/rangulo.png"  },
  { nombre: "J.Chala", edad: 21, media: 62, posicion: "ED" , foto: "img/jugadores/C/chala.png"  },
  { nombre: "J.Lloreda", edad: 31, media: 65, posicion: "DC" , foto: "img/jugadores/L/lloreda.png"  },
  { nombre: "A.Carabali", edad: 28, media: 64, posicion: "DC" , foto: "img/jugadores/C/carabali.png"  }
],

"Ind.Yumbo": [
  { nombre: "J.Mendez", edad: 25, media: 63, posicion: "PO", foto: "img/jugadores/M/mendez.png" },
  { nombre: "L.Mena", edad: 21, media: 60, posicion: "PO" , foto: "img/jugadores/L/lmena.png"},

  { nombre: "A.Mejia", edad: 29, media: 63, posicion: "DFC" , foto: "img/jugadores/A/amejia.png"},
  { nombre: "Julian R.", edad: 22, media: 62, posicion: "DFC" },
  { nombre: "D.Ferrer", edad: 19, media: 58, posicion: "DFC" },
  { nombre: "O.Vivas", edad: 20, media: 59, posicion: "DFC" },
  { nombre: "Jesus R.", edad: 19, media: 58, posicion: "DFC" },
  { nombre: "J.Ampudia", edad: 25, media: 63, posicion: "LD", foto: "img/jugadores/A/ampudia.png" },
  { nombre: "S.Perdomo", edad: 20, media: 60, posicion: "LI" },

  { nombre: "D.Villa", edad: 23, media: 62, posicion: "MD" , foto: "img/jugadores/V/villa.png"},
  { nombre: "Jesus D.", edad: 21, media: 61, posicion: "MD" , foto: "img/jugadores/D/diazjesus.png"},
  { nombre: "Yull P.", edad: 20, media: 60, posicion: "MD" },
  { nombre: "S.Hernandez", edad: 39, media: 63, posicion: "MO", foto: "img/jugadores/H/hsebas.png" },
  { nombre: "Y.Ordoñez", edad: 21, media: 63, posicion: "MO" },

  { nombre: "H.Mena", edad: 25, media: 63, posicion: "EI" , foto: "img/jugadores/H/hugom.png"},
  { nombre: "T.Diaz", edad: 20, media: 63, posicion: "ED" },
  { nombre: "J.Manyoma", edad: 21, media: 63, posicion: "ED" },
  { nombre: "L.Farias", edad: 31, media: 63, posicion: "DC", foto: "img/jugadores/L/lfarias.png" , nacionalidad: "argentina"},
  { nombre: "Alan G.", edad: 18, media: 58, posicion: "DC" }
],

"R.Cundinamarca": [
  { nombre: "D.Mosquera", edad: 19, media: 61, posicion: "PO" },
  { nombre: "M.Valencia", edad: 22, media: 61, posicion: "PO", foto: "img/jugadores/V/valenciamateo.png" },

  { nombre: "B.Suaza", edad: 23, media: 63, posicion: "DFC", foto: "img/jugadores/S/suaza.png" },
  { nombre: "S.Moreno", edad: 22, media: 63, posicion: "DFC" },
  { nombre: "S.Quiñones", edad: 20, media: 60, posicion: "DFC" },
  { nombre: "O.Acosta", edad: 26, media: 63, posicion: "LI" , foto: "img/jugadores/B/bacostaonel.png"},
  { nombre: "E.Cabezas", edad: 20, media: 62, posicion: "LD" , foto: "img/jugadores/E/ecabezas.png"},

  { nombre: "J.D. Hoyos", edad: 21, media: 62, posicion: "MD" },
  { nombre: "F.Cuero", edad: 25, media: 63, posicion: "MD", foto: "img/jugadores/F/fcuero.png" },
  { nombre: "C.Gomez", edad: 21, media: 61, posicion: "MO" },
  { nombre: "J.Amaya", edad: 19, media: 59, posicion: "MO" , foto: "img/jugadores/L/lamaya.png"},

  { nombre: "J.C. Balanta", edad: 21, media: 60, posicion: "EI" },
  { nombre: "L.Obregon", edad: 20, media: 60, posicion: "EI", foto: "img/jugadores/L/lobregon.png" },
  { nombre: "Y.Valencia", edad: 21, media: 62, posicion: "ED", foto: "img/jugadores/Y/yvalencia.png" },
  { nombre: "J.Mendoza", edad: 22, media: 62, posicion: "ED" , foto: "img/jugadores/S/smendoza.png"},
  { nombre: "C.Negrete", edad: 18, media: 59, posicion: "DC" },
  { nombre: "J.J. Salcedo", edad: 32, media: 63, posicion: "DC", foto: "img/jugadores/S/salcedo.png" },
  { nombre: "Leider M.", edad: 21, media: 61, posicion: "DC" }
],

"Boca Jrs. Cali": [
  { nombre: "E.Obando", edad: 24, media: 62, posicion: "PO" , foto: "img/jugadores/E/euler.png"},
  { nombre: "S.Hoyos", edad: 21, media: 58, posicion: "PO" , foto: "img/jugadores/H/hoyos.png"},

  { nombre: "Y.Moran", edad: 22, media: 60, posicion: "DFC", foto: "img/jugadores/Y/ymoran.png" },
  { nombre: "K.Hurtado", edad: 20, media: 60, posicion: "DFC" },
  { nombre: "D.Beitar", edad: 17, media: 58, posicion: "LI" },
  { nombre: "Heiner M.", edad: 20, media: 58, posicion: "LD" },

  { nombre: "H.Angulo", edad: 25, media: 63, posicion: "MD", foto: "img/jugadores/H/hermes.png" },
  { nombre: "L.A. Perez", edad: 22, media: 60, posicion: "MD" },
  { nombre: "H.Ortiz", edad: 21, media: 62, posicion: "EI" , foto: "img/jugadores/H/hortiz.png"},
  { nombre: "J.Vallejo", edad: 22, media: 61, posicion: "MO" },

  { nombre: "J.Urresti", edad: 20, media: 60, posicion: "EI" },
  { nombre: "J.C. Cuero", edad: 17, media: 58, posicion: "ED" },
  { nombre: "H.Reina", edad: 35, media: 63, posicion: "DC" , foto: "img/jugadores/H/hreina.png"},
  { nombre: "J.F. Caicedo", edad: 36, media: 63, posicion: "DC" , foto: "img/jugadores/F/fcaicedo.png"}
],

"Leones": [
  { nombre: "C.Holguin", edad: 21, media: 61, posicion: "PO" , foto: "img/jugadores/H/holguin.png"  },
  { nombre: "J.Arboleda", edad: 20, media: 61, posicion: "PO" , foto: "img/jugadores/A/arboledajuan.png"  },

  { nombre: "G.Meneses", edad: 23, media: 62, posicion: "DFC", foto: "img/jugadores/G/gmeneses.png"   },
  { nombre: "D.Marmolejo", edad: 21, media: 62, posicion: "DFC", foto: "img/jugadores/D/dmarmo.png"   },
  { nombre: "D.Garcia", edad: 20, media: 58, posicion: "DFC" },
  { nombre: "J.C. Renteria", edad: 27, media: 62, posicion: "LI", foto: "img/jugadores/R/renteriajc.png"   },
  { nombre: "R.Fruto", edad: 22, media: 61, posicion: "LD", foto: "img/jugadores/F/fruto.png"   },

  { nombre: "J.E. Martinez", edad: 20, media: 60, posicion: "MD" },
  { nombre: "S.Posada", edad: 19, media: 58, posicion: "MD" },
  { nombre: "A.Ceballos", edad: 22, media: 62, posicion: "MD", foto: "img/jugadores/C/ceballosa.png"   },
  { nombre: "C.Rodriguez", edad: 24, media: 62, posicion: "MO" , foto: "img/jugadores/R/rodricris.png"  },
  { nombre: "Juan Peña", edad: 26, media: 62, posicion: "MO", foto: "img/jugadores/P/penajuan.png"   },

  { nombre: "J.Muñoz", edad: 21, media: 60, posicion: "EI", foto: "img/jugadores/M/munoz.png"   },
  { nombre: "J.Ruiz", edad: 20, media: 58, posicion: "EI", foto: "img/jugadores/R/ruizj.png"   },
  { nombre: "Leyner P.", edad: 22, media: 61, posicion: "ED", foto: "img/jugadores/L/leyner.png"   },
  { nombre: "O.Segura", edad: 23, media: 62, posicion: "ED", foto: "img/jugadores/S/segura.png"   },
  { nombre: "C.Gomez", edad: 24, media: 62, posicion: "DC" }
],

 "Tigres": [
  { nombre: "V.Brid", edad: 25, media: 63, posicion: "PO" , foto: "img/jugadores/V/vbrid.png"},
  { nombre: "K.Lopez", edad: 23, media: 61, posicion: "PO", foto: "img/jugadores/K/klopez.png" },

  { nombre: "S.Florez", edad: 23, media: 62, posicion: "DFC" },
  { nombre: "O.Preciado", edad: 26, media: 62, posicion: "DFC" },
  { nombre: "D.Viafara", edad: 27, media: 62, posicion: "DFC" , foto: "img/jugadores/V/viafara.png"},
  { nombre: "A.Lopera", edad: 24, media: 60, posicion: "DFC" , foto: "img/jugadores/L/lopera.png"},
  { nombre: "R.Rosales", edad: 25, media: 62, posicion: "LD" , foto: "img/jugadores/R/rosales.png"},
  { nombre: "J.Cano", edad: 27, media: 62, posicion: "LI", foto: "img/jugadores/C/canojesus.png" },

  { nombre: "B.Mejia", edad: 20, media: 62, posicion: "MD" },
  { nombre: "A.Cuadros", edad: 26, media: 61, posicion: "MD" },
  { nombre: "S.Villamil", edad: 20, media: 61, posicion: "MD" },
  { nombre: "S.Valbuena", edad: 27, media: 61, posicion: "MD" },
  { nombre: "J.Hincapie", edad: 20, media: 60, posicion: "MD" },
  { nombre: "M.Alvarez", edad: 23, media: 62, posicion: "MO" },

  { nombre: "E.Arrechea", edad: 20, media: 62, posicion: "EI" , foto: "img/jugadores/A/arrechea.png"},
  { nombre: "L.M. Palacios", edad: 21, media: 62, posicion: "ED", foto: "img/jugadores/P/palaciosluis.png" },
  { nombre: "O.Aragon", edad: 28, media: 63, posicion: "DC", foto: "img/jugadores/A/aragon.png" }
],
  
  "Bogotá": [
  { nombre: "D.Aguilar", edad: 21, media: 60, posicion: "PO" , foto: "img/jugadores/D/daguilar.png"},
  { nombre: "J.Osorno", edad: 20, media: 59, posicion: "PO" },

  { nombre: "D.Montien", edad: 25, media: 61, posicion: "DFC" },
  { nombre: "Freilin M.", edad: 20, media: 63, posicion: "DFC" , foto: "img/jugadores/F/freilin.png"},
  { nombre: "S.Canizalez", edad: 20, media: 64, posicion: "DFC" },
  { nombre: "J.C. Moreno", edad: 24, media: 62, posicion: "LI", foto: "img/jugadores/M/morenojc.png" },
  { nombre: "C.Mosquera", edad: 25, media: 63, posicion: "LD" , foto: "img/jugadores/C/cmosquera.png"},
  { nombre: "A.Restrepo", edad: 21, media: 61, posicion: "LD" },

  { nombre: "Jafe P.", edad: 21, media: 61, posicion: "MD" },
  { nombre: "J.Sanchez", edad: 25, media: 61, posicion: "MD" },
  { nombre: "K.Castro", edad: 27, media: 62, posicion: "MD" },
  { nombre: "A.Alfonzo", edad: 21, media: 62, posicion: "MD" , foto: "img/jugadores/A/aalfonzo.png"},

  { nombre: "D.Castillo", edad: 26, media: 65, posicion: "EI" , foto: "img/jugadores/D/dcastillo.png"},
  { nombre: "B.Castro", edad: 24, media: 64, posicion: "ED" , foto: "img/jugadores/B/bcastro.png"},
  { nombre: "H.Sandoval", edad: 24, media: 63, posicion: "DC" },
  { nombre: "S.Perea", edad: 18, media: 57, posicion: "DC" },
  { nombre: "A.Buelvas", edad: 25, media: 60, posicion: "DC" }
],
  
  "Orsomarso": [
    { nombre: "H.Arango", edad: 23, media: 62, posicion: "PO" , foto: "img/jugadores/H/harango.png"},
    { nombre: "J.Grisales", edad: 21, media: 58, posicion: "PO" , foto: "img/jugadores/G/grisales.png"},

    { nombre: "Deivi B.", edad: 21, media: 63, posicion: "DFC" , foto: "img/jugadores/D/deivi.png"},
    { nombre: "J.Salinas", edad: 19, media: 59, posicion: "DFC" },
    { nombre: "Nawer V.", edad: 21, media: 62, posicion: "DFC" , foto: "img/jugadores/N/nawer.png"},
    { nombre: "E.Martinez", edad: 21, media: 63, posicion: "LD" , foto: "img/jugadores/E/emartinez.png"},
    { nombre: "J.Barreiro", edad: 20, media: 62, posicion: "LI" , foto: "img/jugadores/B/barreirojhon.png"},

    { nombre: "F.Palomino", edad: 21, media: 63, posicion: "MD" , foto: "img/jugadores/L/lpalomino.png"},
    { nombre: "J.Hernandez", edad: 18, media: 60, posicion: "MD" },
    { nombre: "K.Gomez", edad: 30, media: 62, posicion: "MD" },

    { nombre: "J.Zarante", edad: 18, media: 59, posicion: "ED" },
    { nombre: "A.Ruiz", edad: 21, media: 61, posicion: "EI" , foto: "img/jugadores/R/ruiz.png"},
    { nombre: "S.Girado", edad: 21, media: 64, posicion: "DC" , foto: "img/jugadores/G/girado.png"},
    { nombre: "S.Arrechea", edad: 19, media: 61, posicion: "DC", foto: "img/jugadores/S/sarrechea.png" },
    { nombre: "C.Lara", edad: 19, media: 58, posicion: "DC" }
],

 "Barranquilla": [
    { nombre: "S.Guerra", edad: 25, media: 62, posicion: "PO" , foto: "img/jugadores/G/guerra.png"},
    { nombre: "Jaime A.", edad: 24, media: 63, posicion: "PO", foto: "img/jugadores/A/acostajaime.png" },

    { nombre: "E.Herazo", edad: 17, media: 59, posicion: "DFC", foto: "img/jugadores/E/eherazo.png" },
    { nombre: "O.Cassiani", edad: 19, media: 58, posicion: "DFC" },
    { nombre: "F.Correa", edad: 19, media: 58, posicion: "DFC" },
    { nombre: "A.Riascos", edad: 19, media: 58, posicion: "LI" },
    { nombre: "J.Cortez", edad: 19, media: 58, posicion: "LI" },
    { nombre: "Y.Moya", edad: 16, media: 57, posicion: "LD" },

    { nombre: "Philippe O.", edad: 18, media: 60, posicion: "MO" , foto: "img/jugadores/P/poviedo.png"},
    { nombre: "Javier O.", edad: 21, media: 60, posicion: "MD" },
    { nombre: "M.Bolivar", edad: 19, media: 58, posicion: "MD" },
    { nombre: "A.Orozco", edad: 19, media: 57, posicion: "MD" },
    { nombre: "M.Agamez", edad: 16, media: 57, posicion: "MD", foto: "img/jugadores/A/agamez.png" },

    { nombre: "C.Peñate", edad: 20, media: 62, posicion: "DC" },
    { nombre: "Jairo T.", edad: 19, media: 58, posicion: "EI" },
    { nombre: "S.Caballero", edad: 19, media: 58, posicion: "EI" },
    { nombre: "Yesid G.", edad: 19, media: 58, posicion: "ED" }
],
  
"Atlético FC": [
  { nombre: "D.Agudelo", edad: 29, media: 63, posicion: "PO", foto: "img/jugadores/D/dagudelo.png"  },
  { nombre: "J.Jaramillo", edad: 26, media: 61, posicion: "PO", foto: "img/jugadores/J/jaramillo.png"  },

  { nombre: "F.Villa", edad: 20, media: 61, posicion: "DFC" , foto: "img/jugadores/V/villafa.png" },
  { nombre: "J.Alomia", edad: 27, media: 63, posicion: "DFC", foto: "img/jugadores/A/alomia.png"  },
  { nombre: "J.Palacios", edad: 26, media: 60, posicion: "DFC" },
  { nombre: "J.Veira", edad: 21, media: 61, posicion: "LI" , foto: "img/jugadores/V/veira.png" },
  { nombre: "J.Perdomo", edad: 20, media: 61, posicion: "LD" , foto: "img/jugadores/P/perdomo.png" },
  { nombre: "Christopher C.", edad: 18, media: 58, posicion: "LD" },

  { nombre: "C.Restrepo", edad: 21, media: 61, posicion: "MD" },
  { nombre: "J.Julio", edad: 21, media: 60, posicion: "MD", foto: "img/jugadores/J/julio.png"  },
  { nombre: "G.Erazo", edad: 25, media: 61, posicion: "MO" , foto: "img/jugadores/E/erazo.png" },

  { nombre: "R.Royero", edad: 21, media: 62, posicion: "EI" , foto: "img/jugadores/R/royero.png" },
  { nombre: "J.Renteria", edad: 30, media: 62, posicion: "ED" },
  { nombre: "J.Farias", edad: 22, media: 62, posicion: "DC" , nacionalidad: "argentina"},
  { nombre: "A.Oñate", edad: 22, media: 62, posicion: "DC" }
],

"R.Santander": [
  { nombre: "J.Mora", edad: 28, media: 62, posicion: "PO" , foto: "img/jugadores/M/mora.png" },
  { nombre: "J.Lazaro", edad: 19, media: 57, posicion: "PO" },

  { nombre: "J.Habib", edad: 20, media: 60, posicion: "LI" },
  { nombre: "C.Duran", edad: 21, media: 60, posicion: "DFC" },
  { nombre: "J.Perez", edad: 23, media: 61, posicion: "DFC" },
  { nombre: "Jordi H.", edad: 19, media: 58, posicion: "DFC" },

  { nombre: "Duvan R.", edad: 22, media: 61, posicion: "MD" },
  { nombre: "Breiner R.", edad: 22, media: 61, posicion: "MD" },
  { nombre: "W.Bustamante", edad: 20, media: 59, posicion: "MD" },
  { nombre: "Jorge P.", edad: 19, media: 58, posicion: "MD" },
  { nombre: "L.Rangel", edad: 22, media: 60, posicion: "MD" },
  { nombre: "J.Yusty", edad: 21, media: 62, posicion: "MO" },

  { nombre: "S.Rey", edad: 21, media: 62, posicion: "DC" , foto: "img/jugadores/R/rey.png" , nacionalidad: "mexico" },
  { nombre: "A.Segura", edad: 22, media: 61, posicion: "DC" },
  { nombre: "J.Guillen", edad: 20, media: 58, posicion: "DC" },
  { nombre: "Brandon M.", edad: 20, media: 59, posicion: "DC" },
  { nombre: "Michell D.", edad: 21, media: 62, posicion: "DC" , foto: "img/jugadores/M/michell.png"  },
  { nombre: "J.Ararat", edad: 23, media: 60, posicion: "ED" },
  { nombre: "S.Ahumada", edad: 22, media: 60, posicion: "ED" },
  { nombre: "H.Salas", edad: 26, media: 61, posicion: "EI" }
],

"Extranjero":[

  ]
};
