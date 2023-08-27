const articulo = document.querySelector("#articulo");
const precio = document.querySelector("#precio");
const btn = document.querySelector("#btn");
const carritoCompras = document.querySelector("#carritoCompras");
const form =document.querySelector ("#form");
const carritoFoot = document.querySelector ("#carritoFoot");

let contador = 1;
let modoEdicion = false;


class producto {
    constructor(articulo, precio){
        this.id = Date.now().toString(36);
        this.articulo = articulo;
        this.precio = precio;
        this.cantidad = 1;
    }
};

form.onsubmit = (e) => {
    e.preventDefault ();
    if (modoEdicion) {
        edicion = false;
    btn.value = "Agregar";
    mostrarArticulo(productos);
  } else {
    productos.push(new producto(articulo.value, precio.value));
    mostrarArticulo(productos);
    mostrarTotalCarrito();
  }

  guardarEnLocalStorage(productos);
    // Reseteamos los valores el formulario a 0
  form.reset();
  
};

const guardarEnLocalStorage = (productos) => {
    localStorage.setItem("carrito", JSON.stringify(productos));
};

window.addEventListener("load", () => {
    const carritoGuardado = localStorage.getItem("carrito");
    if (carritoGuardado) {
        productos = JSON.parse(carritoGuardado);
        mostrarArticulo(productos);
    }
});

let productos = [];

const mostrarArticulo = (productos) => {
    carritoCompras.innerHTML = "";
    
    productos.forEach((producto, index) => {
        const { articulo, precio, cantidad} = producto;
        let productosContenedor = document.createElement ("tr");
        productosContenedor.classList.add( "mt-2","border","border-2","p-3","shadow","shadow-md");
        productosContenedor.innerHTML =`        
        
        <th scope="row">${producto.id}</th>
        <td>${producto.articulo}</td>
        <td><span class="contador">${producto.cantidad}</span></td>
       
        <td>$ <span>${producto.precio * producto.cantidad}  </span></td>
`;

        // Agregamos el btn de suma y resta 
        
        let btnResta = document.createElement("button");
        btnResta.classList.add("btn", "btn-danger");
        btnResta.innerHTML ="-";
        productosContenedor.appendChild(btnResta);

        btnResta.onclick = () => restarCantidad (producto.id);

        let btnSuma = document.createElement("button");
        btnSuma.classList.add ("btn", "btn-success");
        btnSuma.innerHTML = "+";
        productosContenedor.appendChild(btnSuma);
        
        btnSuma.onclick = () => sumarCantidad (producto.id);
        

        carritoCompras.appendChild(productosContenedor);
    });

};

mostrarArticulo (productos);

// funcion sumar 
const sumarCantidad = (id) => {
    const producto = productos.find(item => item.id === id);
    if (producto) {
        producto.cantidad++;
        guardarEnLocalStorage(productos);
        mostrarArticulo(productos);
        mostrarTotalCarrito(); // Actualiza el total después de sumar
    }
};

// funcion para restar
const restarCantidad = (id) => {
    const producto = productos.find(item => item.id === id );
    if (producto.cantidad > 1) {
        producto.cantidad--;        
    } else {productos.splice(id,1)}
    guardarEnLocalStorage(productos);
    mostrarArticulo(productos);
    mostrarTotalCarrito();
};

  // Función para calcular el total del carrito
const calcularTotalCarrito = () => {
    let total = 0;
    productos.forEach(producto => {
        total += producto.precio * producto.cantidad;
    });
    return total;
};

// Función para mostrar el total del carrito
const mostrarTotalCarrito = () => {
    const totalPrecio = calcularTotalCarrito();
    const totalSpan = document.querySelector("#totalPrecio");
    totalSpan.textContent = `$${totalPrecio.toFixed(2)}`;
};

// Llama a la función para mostrar el total del carrito al final del código
mostrarTotalCarrito();
