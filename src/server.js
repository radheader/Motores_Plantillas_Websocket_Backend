import express from 'express';
const app = express();

import routerProducts from "./routes/productos.routes.js";
import routerCart from "./routes/carrito.routes.js"

/*-------------------------------Dotenv---------------------------------------------*/

import dotenv from 'dotenv';
dotenv.config();
console.log(`Port... ${process.env.TOKEN}`);

/*--------------------------------Middlewares---------------------------------------------*/
app.use(express.json());
app.use(express.urlencoded({extended:true}));

const authMiddleware = app.use((req, res, next) => {
    req.header('authorization') == process.env.TOKEN 
        ? next()
        : res.status(401).json({"error": "unauthorized"})
})
/*---------------------Rutas--------------------------------------------------*/
app.use('/api/productos', routerProducts);
app.use('/api/carrito', routerCart);


const PORT = 8020;
const server = app.listen(PORT, () => {
console.log(` >>>>> 🚀 Server started at http://localhost:${PORT}`)
})

server.on('error', (err) => console.log(err));