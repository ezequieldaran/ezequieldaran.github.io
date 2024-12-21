let card= `
 
      <nav class="menu">
          <ul>
            <li>
                <a  href="./"><img src="./img/rodriguez.png"  alt="Bombita"></a></li>
            <li>
                <a href="index.html">Inicio</a>
            </li>
            <li>
                <a href="productos.html">Productos</a>
            </li>
            <li>
                <a href="contacto.html">Contacto</a>
            </li>
            <li>
                <a href="carrito.html">Carrito</a>
            </li>
            <li>
                <a href="carrito.html" id="cart-btn">
                  <i class="fa-solid fa-cart-shopping"></i>
                  <span id="cart-count">0</span>
                </a>
            </li>
          </ul>    
      </nav>

`
document.querySelector("header").innerHTML=card;

card =`
<div class="footer">
  <div class="column">
    <a href="https://www.whatsapp.com">
    <i class="fa-brands fa-instagram"></i></a>
  </div>
  <div class="column">
    <a href="https://www.facebook.com">
    <i class="fa-brands fa-facebook"></i></a>
  </div>
</div>

`
document.querySelector("footer").innerHTML = card;