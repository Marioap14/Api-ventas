const createError = require("http-errors");

const debug = require("debug")("app:module-products-controller");

const { ProductsService } = require("./services");

const { Response } = require("../common/response");

module.exports.ProductsController = {
  // expone un objeto
  getProducts: async (req, res) => {
    try {
      let products = await ProductsService.getAll(); //invocamos la funcion getall de services
      Response.success(res, 200, "Lista de Productos", products);
    } catch (error) {
      debug(error);
      Response.error(res);
    }
  },
  getProduct: async (req, res) => {
    try {
      const {
        params: { id },
      } = req; //de req obtenemos params y de params el id
      let product = await ProductsService.getByid(id);
      // Validamos si existe el product con ese id
      if (!product) {
        Response.error(res, new createError.NotFound());
      } else {
        Response.success(res, 200, `Producto ${id}`, product);
      }
    } catch (error) {
      debug(error);
      Response.error(res);
    }
  },
  createProducts: async (req, res) => {
    try {
      const { body } = req;
      if (!body || Object.keys(body).length === 0) {
        Response.error(res, new createError.BadRequest()); //eoror en la peticion
      } else {
        const insertedId = await ProductsService.create(body);
        Response.success(res, 201, "Producto agregado", insertedId);
      }
    } catch (error) {
      debug(error);
      Response.error(res);
    }
  },
  updateProduct: async (req, res) => {
    try {
      //destructuramos el parametro del id
      const {
        params: { id },
      } = req; //de req obtenemos params y de params el id
      const { body } = req;
      if (!body || Object.keys(body).length === 0) {
        Response.error(res, new createError.BadRequest());
      } else {
        // Almacenamos en la variable product el id ha actualizar
        const product = await ProductsService.update(id, body);
        // Validamos si existe el product con ese id
        if (!product) {
          Response.error(res, new createError.NotFound());
        } else {
          Response.success(
            res,
            200,
            `Producto Actualizado ${id}`,
            Object(body)
          );
        }
      }
    } catch (error) {
      debug(error);
      Response.error(res);
    }
  },
  deleteProduct: async (req, res) => {
    try {
      //destructuramos el parametro del id
      const {
        params: { id },
      } = req;
      // Almacenamos en la variable product el id ha eliminar
      const product = await ProductsService.deleteProduct(id);
      //validamos si fue eliminado
      if (product.deletedCount === 1) {
        Response.success(res, 202, `Producto ${id} eliminado`, product);
      } else {
        Response.error(res, new createError.NotFound());
      }
    } catch (error) {
      debug(error);
      Response.error(res);
    }
  },
  //update https://www.mongodb.com/docs/drivers/node/current/
  //delete
  generateReport: (req, res) => {
    try {
      ProductsService.generateReport("Inventario", res);
    } catch (error) {
      debug(error);
      Response.error(res);
    }
  },
};
