import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css'

const listaProductos = document.querySelector('#lista-carrito tbody')
const listaCompra = document.querySelector('#lista-compra')



// Añadir un producto al carrito
export function comprarProducto(e) {
    e.preventDefault()
    if (e.target.classList.contains('agregar-carrito')) {
        const producto = e.target.parentElement.parentElement.parentElement.parentElement
        leerDatosProducto(producto)
        console.log('producto')
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
        Swal.fire({
            title: 'Producto Agregado',
            text: 'El producto ya se encuentra en el carrito',
            showConfirmButton: false,
            timer: 2250 // La notificación se ocultará automáticamente después de 1.5 segundos
        })
    } else {
        insertarCarrito(infoProducto)
        mostrarNotificacionProductoAgregado()
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

export function cargarLocalStorage() {
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

        Swal.fire({
            title: '¿Estás seguro?',
            text: 'Esta acción eliminará el producto. ¿Deseas continuar?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                // Si el usuario confirmó, elimina el producto
                producto.remove();
                eliminarProductoLocalStorage(productoID)
                Swal.fire('Producto eliminado', 'El producto ha sido eliminado correctamente', 'success')
            }
        })
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
                                <input type="number" class="form-control text-center cantidad" placeholder="Cantidad" value="${producto.cantidad}">
                            </div>
                            <div class="col-md-3 d-flex justify-content-center">
                                <h6 class="precio">$${producto.precio * producto.cantidad}</h6>
                            </div>

                            <div class="col-md-1 justify-content-center">
                                <a data-id=${producto.id} class="btn borrar-producto-compra bi bi-trash3 text-muted"></a>
                            </div>
                        </div>
        `
        listaCompra.appendChild(div)
    })
}


//elimina el producto de la pag carrito
export const eliminarProductoCompra = (e) => {
    e.preventDefault()
    let productoID
    if (e.target.classList.contains('borrar-producto-compra')) {
        e.target.parentElement.parentElement.remove()
        let producto = e.target.parentElement.parentElement
        productoID = producto.querySelector('a').getAttribute('data-id')
    }
    eliminarProductoLocalStorage(productoID)
    calcularTotal()
}

//evento input de cantidad
export const obtenerEvento = (e) => {
    e.preventDefault()
    //console.log(e.target)
    let id, cantidad, producto, productosLS
    if (e.target.classList.contains('cantidad')) {
        console.log('cambio el input')
        producto = e.target.parentElement.parentElement
        console.log(producto)
        id = producto.querySelector('a').getAttribute('data-id')
        //console.log(id)
        cantidad = producto.querySelector('input').value
        //console.log(cantidad)
        let precio = producto.querySelector('.precio')
        productosLS = obtenerProductosLocalStorage()
        productosLS.forEach(function (productoLs, index) {
            if (productoLs.id === id) {
                productoLs.cantidad = cantidad
                //console.log(productoLs.cantidad)
                //console.log(productoLs.precio)
                // debugger
                let total = Number(productoLs.cantidad) * Number(productoLs.precio)
                precio.textContent = total.toFixed(2)
            }
        })
        localStorage.setItem('productos', JSON.stringify(productosLS))
        calcularTotal()
    }


}

export function calcularTotal() {
    let productosLS
    let total = 0, subtotal = 0, impuestos = 0
    productosLS = obtenerProductosLocalStorage()

    productosLS.forEach(productoLs => {
        let totalProducto = Number(productoLs.cantidad * productoLs.precio)
        total = total + totalProducto
    })

    // console.log(total)
    impuestos = parseFloat(total * 0.18).toFixed(2)
    subtotal = parseFloat(total - impuestos).toFixed(2)

    document.querySelector('#total').textContent = total.toFixed(2)
    document.querySelector('#sub-total').textContent = subtotal
    document.querySelector('#iva').textContent = impuestos

}

function mostrarNotificacionProductoAgregado() {
    Swal.fire({
        icon: 'success',
        title: 'Producto Agregado',
        text: 'El producto se ha agregado al carrito con éxito.',
        showConfirmButton: false,
        timer: 2250 // La notificación se ocultará automáticamente después de 1.5 segundos
    })
}


export function suscribirse() {
    const yaSeMostroSweetAlert = sessionStorage.getItem("sweetAlertMostrado")
    if (!yaSeMostroSweetAlert) {
        Swal.fire({
            title: '<span style="font-size: 20px;">¡Suscríbete y recibe $2000 de regalo!</span>',
    html:
        '<label for="email" style="font-size: 14px;">Correo Electrónico:</label>' +
        '<input type="email" id="email" class="swal2-input" style="font-size: 14px;" placeholder="Ingrese su correo electrónico">' + '<br>'+
        '<label for="telefono" style="font-size: 14px;">Teléfono:</label>' +
        '<input type="tel" id="telefono" class="swal2-input" style="font-size: 14px;" placeholder="Ingrese su teléfono">',
    showCancelButton: true,
    showconfirmButton:true,
    confirmButtonText: 'Suscribirme',
    cancelButtonText: 'Cancelar',
    showCloseButton: true,
        })
        sessionStorage.setItem("sweetAlertMostrado",true)
    }

}
