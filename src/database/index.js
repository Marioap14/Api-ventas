// Cliente que vamos a utilizar para conectarnos al servidor de Mongo Atlas

const { config } = require("dotenv");
const { MongoClient } = require("mongodb");

const debug = require("debug")("app:module-database");
const { Config } =  require('../config/index');

var conenection = null;

module.exports.Database = (collection) => new Promise( async (resolve, reject) => {
    //Genera una nueva conexion al servidor
    //usamos el patron singleton si es que no existe creamos una conexion pero si se 
    //verifica que ya hay una conexion simplemente se usa esa misma para hacer la peticion.
    
    try {
        if (!conenection) {//si no existe una conexion genera una.
            const client = new MongoClient(Config.mongoURi);
            conenection = await client.connect();
            debug('Nueva conexion realizada con MongoDB Atlas')  
        }
        //si ya existe una conexion extrae la base de datos de dicha conexion
        debug('Reutilizando conexion');
        const db = conenection.db(Config.mogoDBname);
        resolve(db.collection(collection))
    } catch (error) {

        reject(error);
    }
});
