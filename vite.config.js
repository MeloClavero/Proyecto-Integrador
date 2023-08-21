
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
                computacion:resolve('pages/computacion.html')
            }
        }
    }
}