let productos = [];
fetch('productos.json')
    .then(response => response.json())
    .then(data => {
      productos = data;
      const productoDiv = document.getElementById('productos');
      data.forEach(producto => {
       
        const div = document.createElement('div');

        div.innerHTML = `
        <div class="producto-info">
          <h2>"${producto.nombre}"</h2>
          <img src="${producto.imagen}" alt="${producto.imagen}" width="300">
          <p>Descripcion:"${producto.Descripcion}"</p>
          <h3>Precio: $${producto.precio}</h3>
          <button onclick="agregarAlCarrito(${producto.id})">Agregar al Carrito</button>
        </div>
        `;
        productoDiv.appendChild(div);
      });
    });
function obtenerProductoPorId(id){
    return productos.find(producto => producto.id === id) || {};
};  
function agregarAlCarrito(id){
  let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
  const producto = obtenerProductoPorId(id);
  const item = {
    id:producto.id,
    nombre:producto.nombre,
    precio:producto.precio,
    cantidad: 1
  }
  const repetido = carrito.find(p => p.id === id);
  if (repetido){
    repetido.cantidad++;
  }else{
    carrito.push(item);
  }
  localStorage.setItem('carrito', JSON.stringify(carrito));
}