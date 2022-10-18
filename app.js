const contenedorProductos = document.getElementById('contenedor-productos')

//TERCER PASO

const contenedorCarrito = document.getElementById('carrito-contenedor')
//SEXTO PASO
const botonVaciar = document.getElementById('vaciar-carrito')
//SEXTIMO PASO, MODIFICAR LOS CONTADORES
const contadorCarrito = document.getElementById('contadorCarrito')

//OCTAVO PASO
const cantidad = document.getElementById('cantidad')
const precioTotal = document.getElementById('precioTotal')
const cantidadTotal = document.getElementById('cantidadTotal')

let carrito = []

document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('carrito')){
        carrito = JSON.parse(localStorage.getItem('carrito'))
        actualizarCarrito()
    }
})
//SEXTO PASO
botonVaciar.addEventListener('click', () => {
    carrito.length = 0
    actualizarCarrito()
})

// INYECTAR EL HTML
stockProductos.forEach((producto) => {
    const div = document.createElement('div')
    div.classList.add('producto')
    div.innerHTML = `
    <img src=${producto.img} alt= "">
    <h3>${producto.nombre}</h3>
    <p>${producto.desc}</p>
    <p>Talle: ${producto.talle}</p>
    <p class="precioProducto">Precio:$ ${producto.precio}</p>
    <button id="agregar${producto.id}" class="boton-agregar">Agregar <i class="fas fa-shopping-cart"></i></button>
    `
    contenedorProductos.appendChild(div)

    //2 - SEGUNDO PASO, LUEGO DE QUE INSERTEMOS EL HTML EN EL DOM:
    const boton = document.getElementById(`agregar${producto.id}`)
   

    boton.addEventListener('click', () => {
        agregarAlCarrito(producto.id)
        
    })
})


//AGREGAR AL CARRITO
const agregarAlCarrito = (prodId) => {

    //PARA AUMENTAR LA CANTIDAD Y QUE NO SE REPITA
    const existe = carrito.some (prod => prod.id === prodId) //comprobar si el elemento ya existe en el carro

    if (existe){ //SI YA ESTÁ EN EL CARRITO, ACTUALIZAMOS LA CANTIDAD
        const prod = carrito.map (prod => { 
            if (prod.id === prodId){
                prod.cantidad++
            }
        })
    } else { //EN CASO DE QUE NO ESTÉ
        const item = stockProductos.find((prod) => prod.id === prodId)//Trabajamos con las ID
        carrito.push(item)
    }
   
    actualizarCarrito()
    //MODIFICA EL CARRITO
}


// 5 - QUINTO PASO
const eliminarDelCarrito = (prodId) => {
    const item = carrito.find((prod) => prod.id === prodId)

    const indice = carrito.indexOf(item) //Busca el elemento q yo le pase y nos devuelve su indice.

    carrito.splice(indice, 1) //Le pasamos el indice de mi elemento ITEM y borramos 
    // un elemento 
    actualizarCarrito() //LLAMAMOS A LA FUNCION QUE CREAMOS EN EL TERCER PASO. CADA VEZ Q SE 
    //MODIFICA EL CARRITO
    console.log(carrito)
}

const actualizarCarrito = () => {
    //4- CUARTO PASO
    
    contenedorCarrito.innerHTML = ""
    //3 - TERCER PASO. AGREGAR AL MODAL.

    
    carrito.forEach((prod) => {
        const div = document.createElement('div')
        div.className = ('productoEnCarrito')
        div.innerHTML = `
        <p>${prod.nombre}</p>
        <p>Precio:$${prod.precio}</p>
        <p>Cantidad: <span id="cantidad">${prod.cantidad}</span></p>
        <button onclick="eliminarDelCarrito(${prod.id})" class="boton-eliminar"><i class="fas fa-trash-alt"></i></button>
        `

        contenedorCarrito.appendChild(div)
        
        localStorage.setItem('carrito', JSON.stringify(carrito))

    })
    //SEPTIMO PASO
    contadorCarrito.innerText = carrito.length // actualizamos con la longitud del carrito.
    //OCTAVO PASO
    console.log(carrito)
    precioTotal.innerText = carrito.reduce((acc, prod) => acc + prod.cantidad * prod.precio, 0)
    //Por cada producto q recorro en mi carrito, al acumulador le suma la propiedad precio, con el acumulador
    //empezando en 0.

}