/**
 * Este archivo tiene todas las 
 * configuraciones de las variables de entorno
 */

// Ayuda a traer todas las variables que estan en .env
// al archivo necesario.

require('dotenv').config();//busca el archivo .env en la raiz del proyecto

//dentro de Node.js todos los archivos pueden ser pequeños modulos.

// Retorna algo como un objeto

module.exports.Config = {//Permite exportar este archivo y tambien importarlo en otro.
    port: process.env.PORT,
    mongoURi: process.env.MONGO_URI,
    mogoDBname: process.env.MONGO_DBNAME

};
