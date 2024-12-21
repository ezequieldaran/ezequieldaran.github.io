let productos = [];
fetch('productos.json')
    .then(response => response.json())
    .then(data => {
      productos = data;
      const productoDiv = document.getElementById('productos');
      data.forEach(producto => {
       
        const div = document.createElement('div');

        div.innerHTML = `
        
          <h2>"${producto.nombre}"</h2>
          <img src="${producto.imagen}" alt="${producto.imagen}" width="300">
          <p>Descripcion:"${producto.Descripcion}"</p>
          <h3>Precio: $${producto.precio}</h3>
          <button onclick="agregarAlCarrito(${producto.id})">Agregar al Carrito</button>
        
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


document.addEventListener('DOMContentLoaded', () => {
  mostrarCarrito();
  document.getElementById('vaciarCarrito').addEventListener('click', vaciarCarrito);
});

function mostrarCarrito(){
  const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
  const carritoDiv = document.getElementById('carrito');
  carritoDiv.innerHTML = '';

  carrito.forEach(item => {   
      const div = document.createElement('div');
      div.innerHTML = `
      <div class="carrito product-carrito">
          <p>ID: ${item.id}</p>
          <h4>Nombre: "${item.nombre}"</h4>
          <p>Precio unitario: $ "${item.precio}"</p>
          <p>Cantidad:
              <button onclick="decrementarCantidad(${item.id})">-</button>
              <span>${item.cantidad}</span>
              <button onclick="incrementarCantidad(${item.id})">+</button>
              <p>SubTotal:" $${(item.precio * item.cantidad).toFixed(2)}"</p>
          </p>
          <button onclick="eliminarProducto(${item.id})">Eliminar</button>      
          <button Onclick="vaciarCarrito(${item.id})">Vaciar Carrito</button>
      </div>
      `;
      carritoDiv.appendChild(div);        
  });
}

function vaciarCarrito(){
  localStorage.removeItem('carrito');
  mostrarCarrito();
}

function eliminarProducto(id){
  let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
  carrito = carrito.filter(item => item.id !== id);
  localStorage.setItem('carrito', JSON.stringify(carrito));
  mostrarCarrito();
};

function incrementarCantidad(id){
  let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
  const incrementar =carrito.find(item => item.id === id);
  if (incrementar){
      incrementar.cantidad++;   
      localStorage.setItem('carrito', JSON.stringify(carrito));
  }
  mostrarCarrito();
};

function decrementarCantidad(id){
  let carrito= JSON.parse(localStorage.getItem('carrito')) || [];
  const decrementar = carrito.find(item => item.id === id);
  if (decrementar){
      decrementar.cantidad--;
      if (decrementar.cantidad <= 0){
          eliminarProducto(id);
      }else{
          localStorage.setItem('carrito', JSON.stringify(carrito));
      }
  }
  mostrarCarrito();
};