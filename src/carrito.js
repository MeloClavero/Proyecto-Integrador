const listaProductos = document.querySelector('#lista-carrito tbody')
const listaCompra = document.querySelector('#lista-compra')


// Añadir un producto al carrito
export function comprarProducto(e) {
    e.preventDefault() // Detener el comportamiento por defecto de los a o los formularios
    // Delegar para agregar al carrito
    //console.dir(e.target) // ! Elemento al que le hago click (target)
    if (e.target.classList.contains('agregar-carrito')) {
        const producto = e.target.parentElement.parentElement.parentElement.parentElement
        console.log(producto)
        leerDatosProducto(producto)
    }
}

// Leer datos del producto
function leerDatosProducto(producto) {
    const infoProducto = {
        imagen: producto.querySelector('img').src,
        titulo: producto.querySelector('strong').textContent,
        precio: producto.querySelector('span:first-child').textContent,
        id: producto.querySelector('button').getAttribute('data-id'),
        cantidad: 1,
        categoria: producto.querySelector('strong:first-child').getAttribute('data-id')
    }

    //console.log(infoProducto)
    let productosLS
    productosLS = obtenerProductosLocalStorage()

    productosLS.forEach(function (productoLS) {
        if (productoLS.id === infoProducto.id) {
            productosLS = productoLS.id;
        }
    })

    if (productosLS === infoProducto.id) {
        console.warn('El producto ya está (en el carrito) en el localStorage')
    } else {
        insertarCarrito(infoProducto)
    }


}
// Comprobar que hay elementos en el LS
function obtenerProductosLocalStorage() {
    let productosLS

    // Comprobar si hay algo en el LS
    if (localStorage.getItem('productos') === null) {
        productosLS = []
    }
    else {
        productosLS = JSON.parse(localStorage.getItem('productos'))
    }
    return productosLS
}

// Muestra producto seleccionad en carrito
function insertarCarrito(producto) {
    const row = document.createElement('tr')

    row.innerHTML = `
        <td>
            <img src="${producto.imagen}" alt="${producto.titulo}" width="100">
        </td>
        <td>${producto.titulo}</td>
        <td>${producto.precio}</td>
        <td>
            <a href="#" class="borrar-producto bi bi-x-circle" data-id="${producto.id}"></a>
        </td>
    `
    listaProductos.appendChild(row)
    guardarProductosLocalStorage(producto)
}

// Almacenar en el LS
function guardarProductosLocalStorage(producto) {
    let productos
    // Toma valor de un arreglo con datos del LS
    productos = obtenerProductosLocalStorage()
    // Agrego el producto al carrito
    productos.push(producto)
    // Agregamos al LS
    localStorage.setItem('productos', JSON.stringify(productos))

}


export function leerLocalStorage() {
    let productosLS
    productosLS = obtenerProductosLocalStorage()
    productosLS.forEach(function (producto) {
        const row = document.createElement('tr')
        row.innerHTML = `
        <td>
            <img src="${producto.imagen}" alt="${producto.titulo}" width="100">
        </td>
        <td>${producto.titulo}</td>
        <td>${producto.precio}</td>
        <td>
            <a href="#" class="borrar-producto bi bi-x-circle" data-id="${producto.id}"></a>
        </td>
        `
        listaProductos.appendChild(row)
    })
}

//Eliminar el producto del carrito en el DOM
export function eliminarProducto(e) {
    e.preventDefault()
    let producto, productoID
    if (e.target.classList.contains('borrar-producto')) {
        producto = e.target.parentElement.parentElement
        productoID = producto.querySelector('a').getAttribute('data-id')
        producto.remove()

        eliminarProductoLocalStorage(productoID)
    }
}

// eliminar producto del local storage
function eliminarProductoLocalStorage(productoID) {
    let productosLS
    //obtenemos el arreglo de productos
    productosLS = obtenerProductosLocalStorage()
    //comparamos el id del producto borrado con el LS
    productosLS.forEach(function (productoLS, index) {
        if (productoLS.id === productoID) {
            productosLS.splice(index, 1)
        }
    })

    // Añadimos el arreglo actual al LS
    localStorage.setItem('productos', JSON.stringify(productosLS))
}

export function vaciarCarrito(e) {
    e.preventDefault()
    while (listaProductos.firstChild) {
        listaProductos.removeChild(listaProductos.firstChild)
    }

    vaciarLocalStorage()
}

function vaciarLocalStorage() {
    window.localStorage.clear()
}


//enviar pedido a pagina carrito
export function procesarPedido(e) {
    e.preventDefault()
    const ruta = String(location.href)
    e.preventDefault()
    let array = obtenerProductosLocalStorage()
    if (array.length === 0) {
        console.warn('El carrito esta vacio')
    }
    else if (ruta.includes("pages/productos")) {
        location.href = '../carrito.html'
    } else if (ruta.includes("pages/smartphones") || ruta.includes("pages/accesorios") || ruta.includes("pages/computacion") || ruta.includes("envios.html") || ruta.includes("mpagos.html") || ruta.includes("nosotros.html")) {
        location.href = 'carrito.html'
    }
    else {
        location.href = 'pages/carrito.html'
    }
}

//Mostrar los productos guardados en el ls en la pagina de carrito
export function leerLocalStorageCompra() {    
    let productosLS
    productosLS = obtenerProductosLocalStorage()
    productosLS.forEach(function (producto) {
        const div = document.createElement('div')
        div.classList.add('row')
        div.innerHTML = `                
                        <hr class="my-4">

                        <div class="row d-flex align-items-center ">
                            <div class="col-md-2">
                                <img src="${producto.imagen}" class="img-fluid" alt="${producto.titulo}">
                            </div>
                            <div class="col-md-4">
                                <h6 class="text-muted">${producto.categoria}</h6>
                                <h6>${producto.titulo}</h6>
                            </div>
                            <div class="col-md-2">
                                <select class="form-select cart">
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                </select>
                            </div>
                            <div class="col-md-3 d-flex justify-content-center">
                                <h6>${producto.precio}</h6>
                            </div>
                            <div class="col-md-1 justify-content-center">
                                <a href="#" class="text-muted"><i class="bi bi-trash3"></i></a>
                            </div>
                        </div>
        `
        listaCompra.appendChild(div)
    })
}

