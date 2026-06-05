

/*Balances*/

let balanceEconomico = {
  sponsor: 0,
  sueldos: 0,
  derechos: 0,
  tienda: 0,
  taquilla: 0 ,
  alquiler: 0,
  multas: 0,
  ventas: 0,
  compras: 0
};

function actualizarBalanceUI() {
  actualizarLinea("balanceSponsor", balanceEconomico.sponsor);
  actualizarLinea("balanceSueldos", balanceEconomico.sueldos);
  actualizarLinea("balanceDerechos", balanceEconomico.derechos);
  actualizarLinea("balanceTienda", balanceEconomico.tienda);
  actualizarLinea("balanceTaquilla", balanceEconomico.taquilla); 
  actualizarLinea("balanceAlquiler", balanceEconomico.alquiler); 
  actualizarLinea("balanceMultas", balanceEconomico.multas); 
  actualizarLinea("balanceVentas", balanceEconomico.ventas); 
  actualizarLinea("balanceCompras", balanceEconomico.compras); 

  // ❗ TOTAL SIN SUELDOS
   const total =
  balanceEconomico.sponsor +
  balanceEconomico.derechos +
  balanceEconomico.tienda +
  balanceEconomico.taquilla +
  balanceEconomico.alquiler +
  balanceEconomico.multas +
  balanceEconomico.sueldos +
  balanceEconomico.ventas +
  balanceEconomico.compras

  actualizarLinea("balanceTotal", total);
}

/*
function actualizarLinea(id, monto) {
  const el = document.getElementById(id);
  if (!el) return;

  el.className = monto > 0 ? "positivo" : monto < 0 ? "negativo" : "neutral";
  el.textContent = `${monto >= 0 ? "+" : "-"}$${Math.abs(monto / 1e6).toFixed(1)}M`;
}
*/

function actualizarLinea(id, monto) {
  const el = document.getElementById(id);
  if (!el) return;

  el.className = monto > 0 ? "positivo" : monto < 0 ? "negativo" : "neutral";

  const valorFormateado = formatearPrecio(Math.abs(monto));

  el.textContent = `${monto >= 0 ? "+" : "-"}${valorFormateado}`;
}

function resetearBalanceEconomico() {
  balanceEconomico = {
    sponsor: 0,
    sueldos: 0,
    derechos: 0,
    tienda: 0,
    taquilla: 0,
    alquiler: 0,
    multas: 0,
    ventas: 0,
    compras: 0
  };

  actualizarBalanceUI();
}
