const express = require('express');

const debug = require('debug')('app:main');

const app = express();

const {Config} = require('./src/config'); 
const { ProductsAPI } = require('./src/products/index');
const { UsersAPI } = require('./src/users/index');
const { SalesAPI } = require('./src/sales/index');
const { IndexApi, NotFoundApi } = require('./src/index/index');

app.use(express.json());

//dentro de el .env podemos agregar todas las variables que queremos que esten disponibles.
IndexApi(app);
//modulo agregado al servidor
ProductsAPI(app);
UsersAPI(app);
SalesAPI(app);
NotFoundApi(app);


app.listen(Config.port, ()=>{
    debug(`Servidor escuchando en el puerto ${Config.port}`)

}); 