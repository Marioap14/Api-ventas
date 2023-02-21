const { ObjectId } = require("mongodb"); //objeto de mongodb

const { Database } = require("../database/index");



const COLLECTION = "users";

const getAll = async () => {
  const collection = await Database(COLLECTION); //databse es asincrono por eso debemos usar await
  return await collection.find({}).toArray(); //consulta de Mongodb
};

const getByid = async (id) => {
  const collection = await Database(COLLECTION);
  return collection.findOne({ _id: new ObjectId(id) }); //consulta de mongoDb por id
};

const create = async (user) => {
  const collection = await Database(COLLECTION);
  let result = await collection.insertOne(user); //inserta un producto en la base de Mongodb
  return result.insertedId;
};

const update = async (id, user) => {
  const collection = await Database(COLLECTION);
  //modificamos el objeto seleccionado
  const options = { upsert: true };
  let result = await collection.updateOne(
    { _id: new ObjectId(id) },
    { $set: { ...user } },
    options
  );

  return result;
};

const deleteUser = async (id) => {
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



module.exports.UsersService = {
  getAll, //toma como valor la funcion getAll
  getByid,
  create,
  update,
  deleteUser,
};
