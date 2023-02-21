const express = require('express');

const router = express.Router();//Permite manejar las rutas de nuestro modulo independientemente de la aplicacion

const { SalesController } = require('./controller');

module.exports.SalesAPI = (app) => { 

    router.get('/', SalesController.getSales).//http://localhost:3000/api/sales
    get('/:id', SalesController.getSale).//http://localhost:3000/api/sales/23
    post('/',SalesController.createSales)
    
    


    app.use('/api/sales',router)//configura en una ruta todo el router, es decir todas las rutas.
    //Concatena /api/products con cada una de las rutas del router.

}