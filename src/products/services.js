const { ObjectId } = require("mongodb"); //objeto de mongodb

const { Database } = require("../database/index");

const { ProductsUtils } = require("./utils");

const COLLECTION = "products";

const getAll = async () => {
  const collection = await Database(COLLECTION); //databse es asincrono por eso debemos usar await
  return await collection.find({}).toArray(); //consulta de Mongodb
};

const getByid = async (id) => {
  const collection = await Database(COLLECTION);
  return collection.findOne({ _id: new ObjectId(id) }); //consulta de mongoDb por id
};

const create = async (product) => {
  const collection = await Database(COLLECTION);
  let result = await collection.insertOne(product); //inserta un producto en la base de Mongodb
  return result.insertedId;
};

const update = async (id, product) => {
  const collection = await Database(COLLECTION);
  //modificamos el objeto seleccionado
  const options = { upsert: true };
  let result = await collection.updateOne(
    { _id: new ObjectId(id) },
    { $set: { ...product } },
    options
  );

  return result;
};

const deleteProduct = async (id) => {
  const collection = await Database(COLLECTION);

  const result = await collection.deleteOne({ _id: new ObjectId(id) });
  if (result.deletedCount === 1) {
    return result;
  } else {
    return 0;
  }
};

//update https://www.mongodb.com/docs/drivers/node/current/
//delete

const generateReport = async (name, res) => {
  let products = await getAll();
  ProductsUtils.excelGenerator(products, name, res);
};

module.exports.ProductsService = {
  getAll, //toma como valor la funcion getAll
  getByid,
  create,
  generateReport,
  update,
  deleteProduct,
};
