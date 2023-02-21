const express = require('express');

const router = express.Router();//Permite manejar las rutas de nuestro modulo independientemente de la aplicacion

const { ProductsController } = require('./controller');

module.exports.ProductsAPI = (app) => { 

    router.get('/', ProductsController.getProducts).//http://localhost:3000/api/products
    get('/report',ProductsController.generateReport).
    get('/:id', ProductsController.getProduct).//http://localhost:3000/api/products/23
    post('/',ProductsController.createProducts).
    post('/update/:id',ProductsController.updateProduct).
    post('/delete/:id',ProductsController.deleteProduct)
    //update https://www.mongodb.com/docs/drivers/node/current/
    //delete



    app.use('/api/products',router)//configura en una ruta todo el router, es decir todas las rutas.
    //Concatena /api/products con cada una de las rutas del router.

}
