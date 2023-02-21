//manipulacion de los datos y modelo de negocio
//La app de poder permitir hacer ventas de los productos existentes y por cada venta al macenar el registro de que usuario ha realizafo esa venta.
//almacenamiento de referncias en Mongo, como consultar un documento con una referencia adentro,
// Hacer las validaciones correspondientes

const { ObjectId } = require("mongodb"); 

const { Database } = require('../database/index');

const COLLECTION = "sales";


const getAll = async () => {
    
    const collection = await Database(COLLECTION); //database es asincrono por eso debemos usar await
    return await collection.find({}).toArray(); //consulta de Mongodb

  };
  
  const getByid = async (id) => {

    const collection = await Database(COLLECTION);
    return collection.findOne({ _id: new ObjectId(id) }); //consulta de mongoDb por id

  };
  
  const create = async (sale,product,user) => {

    const collection = await Database(COLLECTION);
    Database(COLLECTION).aggregate({
      $lookup: {       
        from: "users",     
        localField: "_id",       
        foreignField: user,
        as: "users"   
      },
      $lookup: {       
        from: "products",     
        localField: "_id",       
        foreignField: product,
        as: "products"   
      }
    })
    let result = await collection.insertOne(sale); //inserta un producto en la base de Mongodb
    return result.insertedId;
    
  };


  module.exports.SalesService = {
    getAll, //toma como valor la funcion getAll
    getByid,
    create,
  };