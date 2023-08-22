
import{resolve} from 'node:path'
//colsole.log(resolve('pages'))

export default{
    server:{
        port:"2222",
    },
    css:{
        devSourcemap:true,
    },
    build:{
        emptyOutDir:true,
        rollupOptions:{
            input:{
                smartphones:resolve('pages/smartphones.html'),
                index:resolve('index.html'),
                accesorios:resolve('pages/accesorios.html'),
                computacion:resolve('pages/computacion.html'),
                carrito:resolve('pages/carrito.html'),
                productos1:resolve('pages/productos/accesorios-1.html'),
                productos2:resolve('pages/productos/accesorios-2.html'),
                productos3:resolve('pages/productos/accesorios-3.html'),
                productos4:resolve('pages/productos/accesorios-4.html'),
                productos5:resolve('pages/productos/accesorios-5.html'),
                productos6:resolve('pages/productos/accesorios-6.html'),
                productos7:resolve('pages/productos/smartphone-1.html'),
                productos8:resolve('pages/productos/smartphone-2.html'),
                productos9:resolve('pages/productos/smartphone-3.html'),
                productos10:resolve('pages/productos/smartphone-4.html'),
                productos11:resolve('pages/productos/smartphone-5.html'),
                productos12:resolve('pages/productos/smartphone-6.html'),
                productos13:resolve('pages/productos/computacion-1.html'),
                productos14:resolve('pages/productos/computacion-2.html'),
                productos15:resolve('pages/productos/computacion-3.html'),
                productos16:resolve('pages/productos/computacion-4.html')
            }
        }
    }
}