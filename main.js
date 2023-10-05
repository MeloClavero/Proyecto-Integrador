/* Librerias */
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'

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
    vaciarCarrito
} from './src/carrito'




cargarEventos()
function cargarEventos() {
    const ruta = String(location.href)

    if (ruta.includes("pages/productos")) {
        esProductos();
    }
    else if (ruta.includes("smartphones.html") || ruta.includes("accesorios.html") || ruta.includes("computacion.html")) {
        esCategorias();
    }
    else if (ruta.includes("envios.html") || ruta.includes("mpagos.html") || ruta.includes("nosotros.html")) {
        esOtros();
    }
    else if (ruta.includes("index.html")) {
        esIndex();
    }
    else if (ruta.includes("carrito.html")) {
        esCarrito();
    }
}

function esIndex() {
    document.addEventListener('DOMContentLoaded', leerLocalStorage())
    const carrito = document.getElementById('carrito')
    const vaciarCarritoBtn = carrito.querySelector('#vaciar-carrito')
    const procesarPedidoBtn = carrito.querySelector('#procesar-pedido')

    
    carrito.addEventListener('click', e => eliminarProducto(e))
    vaciarCarritoBtn.addEventListener('click', e => vaciarCarrito(e))
    procesarPedidoBtn.addEventListener('click', e => procesarPedido(e))
}


function esCategorias() {
    const carrito = document.getElementById('carrito')
    const vaciarCarritoBtn = carrito.querySelector('#vaciar-carrito')
    const procesarPedidoBtn = carrito.querySelector('#procesar-pedido')

    document.addEventListener('DOMContentLoaded', leerLocalStorage())
    carrito.addEventListener('click', e => eliminarProducto(e))
    vaciarCarritoBtn.addEventListener('click', e => vaciarCarrito(e))
    procesarPedidoBtn.addEventListener('click', e => procesarPedido(e))
}


function esProductos() {
    const productos = document.getElementById('lista-productos')
    const carrito = document.getElementById('carrito')
    const vaciarCarritoBtn = carrito.querySelector('#vaciar-carrito')
    const procesarPedidoBtn = carrito.querySelector('#procesar-pedido')

    productos.addEventListener('click', (e) => comprarProducto(e))
    document.addEventListener('DOMContentLoaded', leerLocalStorage())
    carrito.addEventListener('click', e => eliminarProducto(e))
    vaciarCarritoBtn.addEventListener('click', e => vaciarCarrito(e))
    procesarPedidoBtn.addEventListener('click', e => procesarPedido(e))
}


function esOtros() {
    const carrito = document.getElementById('carrito')
    const vaciarCarritoBtn = carrito.querySelector('#vaciar-carrito')
    const procesarPedidoBtn = carrito.querySelector('#procesar-pedido')

    document.addEventListener('DOMContentLoaded', leerLocalStorage())
    carrito.addEventListener('click', e => eliminarProducto(e))
    vaciarCarritoBtn.addEventListener('click', e => vaciarCarrito(e))
    procesarPedidoBtn.addEventListener('click', e => procesarPedido(e))
}


function esCarrito() {
 
    const carritoCompra = document.getElementById('lista-compra')
    document.addEventListener('DOMContentLoaded', leerLocalStorageCompra())
    carritoCompra.addEventListener('click', e => eliminarProductoCompra(e))
    calcularTotal()
    carritoCompra.addEventListener('change', e=> obtenerEvento(e))
    carritoCompra.addEventListener('keyup', e=> obtenerEvento(e))
    
}



