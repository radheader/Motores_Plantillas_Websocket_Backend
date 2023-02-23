import express from 'express';
const app = express();
import routerProducts from "./routes/productos.routes.js";
import routerCart from "./routes/carrito.routes.js";
import { fileURLToPath } from 'url'
import { dirname } from 'path'
import multer from 'multer'

const upload = multer ({dest :'src/public/img'})
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)


import { engine } from 'express-handlebars';
import * as path from 'path';

// import {create} from  'express-handlebars'; Servers mas complejos

/*--------------------------------Middlewares---------------------------------------------*/
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use('/static',express.static(__dirname + '/public'))


app.engine("handlebars",engine()) //Handlebars
app.set("view engine", "handlebars") //Handlebars
app.set("views", path.resolve()) //Handlebars


/*---------------------Middlewares Rutas--------------------------------------------------*/

app.use('/api/productos', routerProducts);
app.use('/api/carrito', routerCart);

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