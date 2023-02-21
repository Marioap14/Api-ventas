const express = require('express');
const createError = require('http-errors');

const {Response} = require('../common/response');

module.exports.IndexApi = (app) =>{
    const router = express.Router();

    router.get('/', (req,res) => {
        const menu = {
            products: `https://${req.headers.host}/api/products`,
            users:'`https://${req.headers.host}/api/users`',
            sales: `https://${req.headers.host}/api/sales`
        } 

        Response.success(res, 200, 'Api Inventario', menu)
    })

    app.use('/',router);

}

module.exports.NotFoundApi = (app) =>{

    const router = express.Router();

    router.all("*", (req,res) => {
        Response.error(res, new createError.NotFound());
    })//Cualquierea de las rutas no definidas rsponde con un error
    app.use('/',router)


}