productos = [
    {id: 1,nombre: 'Portátil Dell XPS 15',src: 'images/portatil.webp', precio: 1800},
    {id: 2,nombre: 'Cámara Sony Alpha A7III', src: 'images/camara.jpg', precio: 2000},
    {id: 3,nombre: 'Televisor LG OLED CX 55"',src: 'images/televisor.webp', precio: 2500},
    {id: 4,nombre: 'Auriculares inalámbricos Bose',src: 'images/auriculares.jpg', precio: 300},
    {id: 5,nombre: 'Consola de videojuegos Nintendo Switch',src: 'images/consola.webp',precio: 300}
]


carrito = []

const container_productos = document.querySelector('.container_products');
const btn_carrito = document.querySelector('.btn_carrito');
const cart = document.querySelector('.cart');

const restarProducto = (e) => {
    let item = e.target.getAttribute('id_product') 
    carrito.splice(parseInt(carrito.indexOf(item)),1)
    mostrarCarito();
}

const eliminarProducto = (e) => {
    let item = e.target.getAttribute('id_product');
    
    carrito = carrito.filter((id_producto) => {
        return id_producto !== item;
    });

    mostrarCarito();
}

const mostartProductos = () => {
    productos.forEach(items => {
        const card_producto = document.createElement('div');
        const nombre_producto = document.createElement('p');
        const precio_producto = document.createElement('p');
        const btn_agregar_carrito = document.createElement('button');
        const mostrar_imagen = document.createElement('div');
        const imagen_Armaduras = document.createElement('img');

        nombre_producto.textContent = items.nombre;
        precio_producto.textContent = items.precio;
        btn_agregar_carrito.setAttribute('id_product', items.id);
        imagen_Armaduras.setAttribute('src',items.src);
        imagen_Armaduras.classList.add('img');
        btn_agregar_carrito.textContent = 'Agregar al carrito';
        card_producto.classList.add('card');
        btn_agregar_carrito.classList.add('button');
        btn_agregar_carrito.addEventListener('click', agregarCarrito);

        card_producto.appendChild(nombre_producto)
        card_producto.appendChild(precio_producto)
        card_producto.appendChild(mostrar_imagen)
        mostrar_imagen.appendChild(imagen_Armaduras)
        card_producto.appendChild(btn_agregar_carrito)

        container_productos.appendChild(card_producto)

    });
}

const mostrarCarito = () => {
    cart.innerHTML = ''
    let lista = [...new Set(carrito)]; 
    
    lista.forEach(item => {
        const todos_productos = productos.filter(productos => {
            return productos.id === parseInt(item);
        })

        let cont = 0;

        for(let id of carrito) {
            if(id === item) {
                cont++;
            }
        }
    
        const card_producto_cart = document.createElement('div');
        const name = document.createElement('p');
        const price = document.createElement('p');
        const contador = document.createElement('p');
        const btn_suma = document.createElement('button');
        const btn_resta = document.createElement('button');
        const btn_eliminar = document.createElement('button');
        btn_suma.setAttribute('id_product', todos_productos[0].id);
        btn_resta.setAttribute('id_product',todos_productos[0].id);
        btn_eliminar.setAttribute('id_product',todos_productos[0].id);

        name.textContent = todos_productos[0].nombre;
        price.textContent = todos_productos[0].precio;
        btn_suma.textContent = '+';
        btn_resta.textContent = '-'
        btn_eliminar.textContent = 'X';
        contador.textContent = cont;

        card_producto_cart.classList.add('card_producto')
        card_producto_cart.appendChild(name);
        card_producto_cart.appendChild(price);
        card_producto_cart.appendChild(contador)
        card_producto_cart.appendChild(btn_suma);
        card_producto_cart.appendChild(btn_resta);
        card_producto_cart.appendChild(btn_eliminar)

        btn_suma.addEventListener('click', agregarCarrito);
        btn_resta.addEventListener('click', restarProducto);
        btn_eliminar.addEventListener('click', eliminarProducto)
        cart.appendChild(card_producto_cart);
    })
}

const agregarCarrito = (e) => {
    carrito.push(e.target.getAttribute('id_product'));
    mostrarCarito();
}

mostartProductos();

btn_carrito.addEventListener('click', () => {
    cart.classList.toggle('ocult');
})