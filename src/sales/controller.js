const createError = require("http-errors");

const debug = require("debug")("app:module-sales-controller");

const { SalesService } = require("./services");

const { UsersService } = require('../users/services');

const { ProductsService } = require('../products/services');

const { Response } = require("../common/response");


module.exports.SalesController = {
  // expone un objeto
  getSales: async (req, res) => {
    try {
      let sales = await SalesService.getAll(); //invocamos la funcion getall de services
      Response.success(res, 200, "Lista de ventas", sales);
    } catch (error) {
      debug(error);
      Response.error(res);
    }
  },
  getSale: async (req, res) => {
    try {
      const {
        params: { id },
      } = req; //de req obtenemos params y de params el id
      let sales = await SalesService.getByid(id);
      // Validamos si existe el product con ese id
      if (!sales) {
        Response.error(res, new createError.NotFound());
      } else {
        Response.success(res, 200, `Venta ${id}`, sales);
      }
    } catch (error) {
      debug(error);
      Response.error(res);
    }
  },
  createSales: async (req, res) => {
    try {
      const { body } = req
 
      if (body || Object.keys(body).length > 0) {
        const product = await ProductsService.getById(body.product)
        const user = await UsersService.getById(body.user)
 
        if (!product || !user || product.quantity < body.quantity) {
          Response.error(
            res,
            new createErrors.BadRequest('User, product not exists or no stock available')
          )
        } else {
          const insertedId = await SalesService.create(body,product,user);
          Response.success(res, 201, 'The sale has been created', insertedId)
        }
      } else {
        Response.error(res, new createErrors.BadRequest('Error, no body data exists'))
      }
    } catch (error) {
      debug(error);
      Response.error(res);
      
    }
  },
  
};