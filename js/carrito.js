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
        <div class="carrito">
            <p>ID: ${item.id}</p>
            <h4>Nombre: "${item.nombre}"</h4>
            <p>Precio: $ "${item.precio}"</p>
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