
//VENTA DE PRODUCTOS
const productos = [
  { nombre: "🧢 Gorras", min: 100000, max: 500000 },
  { nombre: "🧣 Bufandas", min: 150000, max: 800000 },
  { nombre: "⚽ Balones", min: 500000, max: 1500000 },
  { nombre: "🚩 Banderas", min: 100000, max: 400000 },
  { nombre: "👕 Camisetas", min: 1000000, max: 4000000, requiereCamiseta: true }
];

function venderMerchandising() {
  const contenedor = document.getElementById("ventasMerchandising");

  let totalVentas = 0;

  let html = `
    <div class="panel-ventas">
      <h3>Ventas de este semestre ${temporadaActual}-${semestreActual}</h3>
  `;

  productos.forEach(producto => {

  let vendido = 0;

  if (producto.requiereCamiseta && !camisetaCreada) {
    vendido = 0;
  } else {
    vendido =
      Math.floor(Math.random() * (producto.max - producto.min + 1)) +
      producto.min;

    const factorMoral = Math.max(0.5, moralHinchada / 100);
    vendido = Math.floor(vendido * factorMoral);
  }

  totalVentas += vendido;

   html += `
  <div class="producto-vendido">
    <span>${producto.nombre}</span>
    <span>
      ${
        producto.requiereCamiseta && !camisetaCreada
          ? "Sin diseño disponible"
          : "$" + vendido.toLocaleString()
      }
    </span>
  </div>
`;
});


  /*
  productos.forEach(producto => {

    let vendido =
      Math.floor(Math.random() * (producto.max - producto.min + 1)) +
      producto.min;

    // Factor según moral (0 - 200)
    const factorMoral = Math.max(0.5, moralHinchada / 100);

    vendido = Math.floor(vendido * factorMoral);

    totalVentas += vendido;

    html += `
      <div class="producto-vendido">
        <span>${producto.nombre}</span>
        <span>$${vendido.toLocaleString()}</span>
      </div>
    `;
  });
*/

  html += `
      <div class="total-ventas">
        Total Recaudado: $${totalVentas.toLocaleString()}
      </div>
    </div>
  `;

  contenedor.innerHTML = html;

  // Sumar dinero al presupuesto
  sumarPresupuesto(totalVentas);
  balanceEconomico.tienda += totalVentas;
  actualizarBalanceUI();

}