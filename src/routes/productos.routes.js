import express from 'express';
const app = express();
import Contenedor from '../controllers/contenedor.js';
const contenedor = new Contenedor("productos.json", ["type","timestamp", "title", "price", "description", "code", "image", "stock"]);
const carrito = new Contenedor("carrito.json", ["timestamp", "products"])


/*---------------------Rutas--------------------------------------------------*/
const routerProducts = express.Router();


app.use('/api/productos', routerProducts);


/* ------------------------ Product Endpoints ------------------------ */

// GET api/productos
routerProducts.get('/', async (req, res) => {
    const products = await contenedor.getAll();
    res.status(200).json(products);
})

// GET api/productos/:id
routerProducts.get('/:id', async (req, res) => {
    const { id } = req.params;
    const product = await contenedor.getById(id);
    
    product
        ? res.status(200).json(product)
        : res.status(400).json({"error": "product not found"})
})

// POST api/productos
routerProducts.post('/', async (req,res, next) => {
    const {body} = req;
    
    body.timestamp = Date.now();
    
    const newProductId = await contenedor.save(body);
    
    newProductId
        ? res.status(200).json({"success" : "product added with ID: "+newProductId})
        : res.status(400).json({"error": "invalid key. Please verify the body content"})
})

// PUT api/productos/:id
routerProducts.put('/:id', async (req, res, next) => {
    const {id} = req.params;
    const {body} = req;
    const wasUpdated = await contenedor.updateById(id,body);
    
    wasUpdated
        ? res.status(200).json({"success" : "product updated"})
        : res.status(404).json({"error": "product not found"})
})


// DELETE /api/productos/:id
routerProducts.delete('/:id', async (req, res, next) => {
    const {id} = req.params;
    const wasDeleted = await contenedor.deleteById(id);
    
    wasDeleted 
        ? res.status(200).json({"success": "product successfully removed"})
        : res.status(404).json({"error": "product not found"})
})

export default routerProducts