import express from 'express'
const app = express()
import routerProducts from "./routes/productos.routes.js"
import routerCart from "./routes/carrito.routes.js"
import {__dirname} from './path.js'
import multer from 'multer'
import {engine} from 'express-handlebars'
import * as path from 'path'

//const upload = multer({dest:'src/public/img'}) Forma basica de utilizar multer
const storage = multer.diskStorage({
    destination: (req,file, cb) => {
      cb(null, 'src/public/img')
    },
    filename: (req,file,cb) => {
      cb(null, `${file.originalname}`)
    }
  })

  const upload = multer({storage:storage})

// import {create} from  'express-handlebars'; Servers mas complejos
/*--------------------------------Middlewares---------------------------------------------*/
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.engine("handlebars",engine()) //Config de hbs
app.set("view engine", "handlebars") // Se definen las vistas
app.set("views", path.resolve(__dirname, "./views"))
console.log(__dirname)     //`${__dirname}/views`   .. donde estaran alojadas las vistas

/*---------------------Middlewares Rutas--------------------------------------------------*/

app.use('/api/productos', routerProducts);
app.use('/api/carrito', routerCart);
app.use('/static',express.static(__dirname + '/public')) 

app.get('/static',(req,res) =>{

    const user = {
        nombre: "Christian ",
        email:"christ.rod@gmail.com",
        rol:"Manager"
    }

    const productos= [
        {id: 1, descripcion:"Producto A", precio: 200, stock :25 },
        {id: 2, descripcion:"Producto B", precio: 300, stock :30},
        {id: 3, descripcion:"Producto C", precio: 300, stock :35},
        {id: 4, descripcion:"Producto D", precio: 300, stock :40},
        {id: 5, descripcion:"Producto E", precio: 300, stock :50},    
    ]

 res.render("home",{       titulo: "Tienda Sulpayki",       mensaje: "Lista de Productos",
        isManager: user.rol === "Manager",
        user,
        productos
    })
})

app.post('/upload',upload.single('product'), (req,res) => {
    console.log(req.body)
    console.log(req.file)
    res.send("Imagen cargada")
})

const PORT = 8020;
const server = app.listen(PORT, () => {
console.log(` >>>>> 🚀 Server started at http://localhost:${PORT}`)
})

server.on('error', (err) => console.log(err));