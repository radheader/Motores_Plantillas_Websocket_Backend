import express from 'express';
const app = express();
import Contenedor from '../controllers/contenedor.js';
const contenedor = new Contenedor("productos.json", ["type","timestamp", "title", "price", "description", "code", "image", "stock"]);
const carrito = new Contenedor("carrito.json", ["timestamp", "products"])


/*---------------------Rutas--------------------------------------------------*/

const routerCart = express.Router();


app.use('/api/carrito', routerCart);

/* ------------------------ Carrito Endpoints ------------------------ */

// POST /api/carrito

routerCart.post('/', async(req, res) => {
    const {body} = req;
    
    body.timestamp = Date.now();
    body.products = [];
    const newCartId = await carrito.save(body);
    
    newCartId
        ? res.status(200).json({"success" : "cart added with ID: "+newCartId})
        : res.status(400).json({"error": "invalid key. Please verify the body content"})
    
})

// DELETE /api/carrito/id
routerCart.delete('/:id', async (req, res) => {
    const {id} = req.params;
    const wasDeleted = await carrito.deleteById(id);
    
    wasDeleted 
        ? res.status(200).json({"success": "cart successfully removed"})
        : res.status(404).json({"error": "cart not found"})
})

// POST /api/carrito/:id/productos
routerCart.post('/:id/productos', async(req,res) => {
    const {id} = req.params;
    const { body } = req;
    
    const product = await contenedor.getById(body['id']);
    
    if (product) {
        const cartExist = await carrito.addToArrayById(id, {"products": product});
        cartExist
            ? res.status(200).json({"success" : "product added"})
            : res.status(404).json({"error": "cart not found"})
    } else {
        res.status(404).json({"error": "product not found, verify the ID in the body content is correct."})
    }
})

// GET /api/carrito/:id/productos
routerCart.get('/:id/productos', async(req, res) => {
    const { id } = req.params;
    const cart = await carrito.getById(id)
    
    cart
        ? res.status(200).json(cart.products)
        : res.status(404).json({"error": "cart not found"})
})

// DELETE /api/carrito/:id/productos/:id_prod
routerCart.delete('/:id/productos/:id_prod', async(req, res) => {
    const {id, id_prod } = req.params;
    const productExists = await contenedor.getById(id_prod);
    if (productExists) {
        const cartExists = await carrito.removeFromArrayById(id, id_prod, 'products')
        cartExists
            ? res.status(200).json({"success" : "product removed"})
            : res.status(404).json({"error": "cart not found"})
    } else {
        res.status(404).json({"error": "product not found"})
    }
})

export default routerCart