
let derechosReclamados = false;
let decisionSueldosTomada = false;
let alquilerPagado = false;

let deudaSueldos = 0;
let impagosSueldos = 0;

function abrirModalEconomico() {

  const montoDerechosTV = derechosTV?.monto || 1500000;
  const sueldoAnual = calcularSueldoPorFuerza(
    obtenerFuerzaTotal(equipoUsuario)
  );

  document.getElementById("infoDerechos").innerText =
    `Derechos de TV: $${montoDerechosTV.toLocaleString()}`;

  document.getElementById("infoSueldos").innerText =
    `Sueldos de plantilla: $${sueldoAnual.toLocaleString()}`;

  document.getElementById("modalEconomico").style.display = "flex";

  derechosReclamados = false;
  decisionSueldosTomada = false;
  alquilerPagado = false;
  document.getElementById("btnPagarAlquiler").disabled = false;
}

//Reclamar derechos 
document.getElementById("btnReclamarTV").addEventListener("click", function () {

  if (derechosReclamados) return;

  const montoDerechosTV = derechosTV?.monto || 1500000;

  if (!presupuestosEquipos[equipoUsuario]) {
    presupuestosEquipos[equipoUsuario] = 0;
  }

  presupuestosEquipos[equipoUsuario] += montoDerechosTV;
  sumarPresupuesto(montoDerechosTV);

  balanceEconomico.derechos += montoDerechosTV;
  actualizarBalanceUI();

  alert(` Derechos de TV pagados + $${montoDerechosTV.toLocaleString()}`);

  derechosReclamados = true;
  verificarCerrarModal();
});

//Pagar 
document.getElementById("btnPagarSueldos").addEventListener("click", function () {

  if (!derechosReclamados) {
    alert("Primero debes reclamar los Derechos de TV.");
    return;
  }

  if (decisionSueldosTomada) return;

  const sueldoAnual = calcularSueldoPorFuerza(
    obtenerFuerzaTotal(equipoUsuario)
  );

  if (presupuestoVisible >= sueldoAnual) {

    restarPresupuesto(sueldoAnual);

    balanceEconomico.sueldos -= sueldoAnual;
    actualizarBalanceUI();

    alert(` Sueldos pagados: $${sueldoAnual.toLocaleString()}`);

    decisionSueldosTomada = true;
    verificarCerrarModal();
  }else {
    alert(
      `❌ No tienes presupuesto suficiente para pagar los sueldos.\n\n` +
      `Necesitas $${sueldoAnual.toLocaleString()} y solo tienes $${presupuestoVisible.toLocaleString()}.`
    );

  }
});

//No Pagar
document.getElementById("btnNoPagarSueldos").addEventListener("click", function () {

  if (!derechosReclamados) {
    alert("Primero debes reclamar los Derechos de TV.");
    return;
  }

  if (decisionSueldosTomada) return;

  const sueldoAnual = calcularSueldoPorFuerza(
    obtenerFuerzaTotal(equipoUsuario)
  );

  deudaSueldos += sueldoAnual;
  impagosSueldos++;

    const plantilla = plantillasJugadores[equipoUsuario];
    let efecto = "";

    plantilla.forEach(j => j.media = Math.max(1, j.media - 4));
    
    efecto = `😞 No has pagado los sueldos.\n` +
    `Deuda acumulada: $${deudaSueldos.toLocaleString()}\n` +
    `Impagos: ${impagosSueldos}/3\n` +
    `Los jugadores estan desmotivados. -4 de media para toda la plantilla.`;

    actualizarDeudaSueldosUI();

    agregarNotificacion(efecto);

    if (impagosSueldos >= 3) {
    abrirDespidoPorImpagos();
    return;
  }

  decisionSueldosTomada = true;
  verificarCerrarModal();
});


//alquiler
document.getElementById("btnPagarAlquiler").addEventListener("click", function () {

  if (alquilerPagado) return;

  let montos = 1800000;
  let montoss = 1000000;

  if (!equipoUsuario) {
    alert("No has elegido un equipo todavia.");
    return;
  }

  if (equipoUsuario === "Cali") {

    alert("Debes pagar el mantenimiento del estadio 1M");

    restarPresupuesto(montoss);
    balanceEconomico.alquiler -= montoss;

  } else {

    alert("Debes pagar el alquiler del estadio 1.8M");

    restarPresupuesto(montos);
    balanceEconomico.alquiler -= montos;

  }

  actualizarBalanceUI();

  alquilerPagado = true;
  this.disabled = true;

  verificarCerrarModal();
});


function verificarCerrarModal() {

  if (derechosReclamados && decisionSueldosTomada && alquilerPagado) {
    document.getElementById("modalEconomico").style.display = "none";
  }
}


function actualizarDeudaSueldosUI() {

  const texto = document.getElementById("textoDeudaSueldos");

  if (deudaSueldos <= 0) {
    texto.textContent = "Sin deuda";
    return;
  }

  texto.textContent =
    `Deuda: $${deudaSueldos.toLocaleString()} | Impagos: ${impagosSueldos}/3`;
}

//pagar deuda
document.getElementById("btnPagarDeuda")
.addEventListener("click", function() {

  if (deudaSueldos <= 0) {
    alert("No hay deuda salarial.");
    return;
  }

  if (presupuestoVisible < deudaSueldos) {
    alert("No tienes dinero suficiente.");
    return;
  }

  restarPresupuesto(deudaSueldos);

  const plantilla = plantillasJugadores[equipoUsuario];

  plantilla.forEach(j => {
    j.media += 2;
  });

  deudaSueldos = 0;
  impagosSueldos = 0;

  actualizarDeudaSueldosUI();

  alert(
    "✅ Deuda salarial pagada.\n" +
    "Los jugadores recuperan confianza (+2 media)."
  );
});


/*

   if (!derechosReclamados) {
    alert("Primero debes reclamar los Derechos de TV.");
    return;
  }

  if (decisionSueldosTomada) return;

  const sueldoAnual = calcularSueldoPorFuerza(
    obtenerFuerzaTotal(equipoUsuario)
  );

  restarPresupuesto(sueldoAnual);

  balanceEconomico.sueldos -= sueldoAnual;
  actualizarBalanceUI();

  alert(`Sueldos pagados: $${sueldoAnual.toLocaleString()}`);

  decisionSueldosTomada = true;
  verificarCerrarModal();
*/