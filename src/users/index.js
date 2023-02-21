const express = require('express');

const router = express.Router();//Permite manejar las rutas de nuestro modulo independientemente de la aplicacion

const { UsersController } = require('./controller');

module.exports.UsersAPI = (app) => { 

    router.get('/', UsersController.getUsers).//http://localhost:3000/api/users
    get('/:id', UsersController.getUser).//http://localhost:3000/api/products/23
    post('/',UsersController.createUser).
    post('/update/:id',UsersController.updateUser).
    post('/delete/:id',UsersController.deleteUser)
    



    app.use('/api/users',router)//configura en una ruta todo el router, es decir todas las rutas.
    //Concatena /api/products con cada una de las rutas del router.

}