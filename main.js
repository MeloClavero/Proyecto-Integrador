/* Librerias */
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import 'animate.css'

/* Archivos de proyecto */

import './css/style.css'
import {
    calcularTotal,
    comprarProducto,
    eliminarProducto,
    eliminarProductoCompra,
    leerLocalStorage,
    leerLocalStorageCompra,
    obtenerEvento,
    procesarPedido,
    suscribirse,
    vaciarCarrito
} from './src/carrito'

const productos = document.getElementById('lista-productos')
const carrito = document.getElementById('carrito')
const carritoCompra = document.getElementById('lista-compra')




cargarEventos()
function cargarEventos() {
    const ruta = String(location.href)
    if (ruta.includes("smartphones.html") || ruta.includes("accesorios.html") || ruta.includes("computacion.html")) {
        esCategorias()
    }
    else if (ruta.includes("envios.html") || ruta.includes("mpagos.html") || ruta.includes("nosotros.html")) {
        esOtros()
    }
    else if (ruta.includes("pages/productos")) {
        esProductos()
    }
    else if (ruta.includes("carrito.html")) {
        esCarrito()
    }
    else {
        esIndex()
    }
}

function esIndex() {
    const vaciarCarritoBtn = carrito.querySelector('#vaciar-carrito')
    const procesarPedidoBtn = carrito.querySelector('#procesar-pedido')
    document.addEventListener('DOMContentLoaded',suscribirse())
    document.addEventListener('DOMContentLoaded', leerLocalStorage())
    vaciarCarritoBtn.addEventListener('click', e => vaciarCarrito(e))
    procesarPedidoBtn.addEventListener('click', e => procesarPedido(e))
    carrito.addEventListener('click', e => eliminarProducto(e))

}


function esCategorias() {
    const vaciarCarritoBtn = carrito.querySelector('#vaciar-carrito')
    const procesarPedidoBtn = carrito.querySelector('#procesar-pedido')
    vaciarCarritoBtn.addEventListener('click', e => vaciarCarrito(e))
    document.addEventListener('DOMContentLoaded', leerLocalStorage())
    procesarPedidoBtn.addEventListener('click', e => procesarPedido(e))
    carrito.addEventListener('click', e => eliminarProducto(e))
}


function esProductos() {
    const vaciarCarritoBtn = carrito.querySelector('#vaciar-carrito')
    const procesarPedidoBtn = carrito.querySelector('#procesar-pedido')
    document.addEventListener('DOMContentLoaded', leerLocalStorage())
    productos.addEventListener('click', (e) => comprarProducto(e))
    carrito.addEventListener('click', e => eliminarProducto(e))
    vaciarCarritoBtn.addEventListener('click', e => vaciarCarrito(e))
    procesarPedidoBtn.addEventListener('click', e => procesarPedido(e))
}


function esOtros() {
    const vaciarCarritoBtn = carrito.querySelector('#vaciar-carrito')
    const procesarPedidoBtn = carrito.querySelector('#procesar-pedido')
    document.addEventListener('DOMContentLoaded', leerLocalStorage())
    carrito.addEventListener('click', e => eliminarProducto(e))
    vaciarCarritoBtn.addEventListener('click', e => vaciarCarrito(e))
    procesarPedidoBtn.addEventListener('click', e => procesarPedido(e))
}


function esCarrito() {
    document.addEventListener('DOMContentLoaded', leerLocalStorageCompra())
    carritoCompra.addEventListener('click', e => eliminarProductoCompra(e))
    calcularTotal()
    carritoCompra.addEventListener('change', e => obtenerEvento(e))
    carritoCompra.addEventListener('keyup', e => obtenerEvento(e))

}



