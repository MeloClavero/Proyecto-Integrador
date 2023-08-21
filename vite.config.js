import{resolve} from 'node:path'
//colsole.log(resolve('pages'))

export default{
    server:{
        port:"2222",
    },
    css:{
        devSourcemap:true,
        rollupOptions:{
            input:{
                smartphones:resolve('pages/smartphones.html'),
                index:resolve('index.html')
            }
        }
    }
}