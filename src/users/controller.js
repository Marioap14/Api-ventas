const createError = require("http-errors");

const debug = require("debug")("app:module-users-controller");

const { UsersService } = require("./services");

const { Response } = require("../common/response");

module.exports.UsersController = {
  // expone un objeto
  getUsers: async (req, res) => {
    try {
      let users = await UsersService.getAll(); //invocamos la funcion getall de services
      Response.success(res, 200, "Lista de usuarios", users);
    } catch (error) {
      debug(error);
      Response.error(res);
    }
  },
  getUser: async (req, res) => {
    try {
      const {
        params: { id },
      } = req; //de req obtenemos params y de params el id
      let user = await UsersService.getByid(id);
      // Validamos si existe el product con ese id
      if (!user) {
        Response.error(res, new createError.NotFound());
      } else {
        Response.success(res, 200, `Usuario ${id}`, user);
      }
    } catch (error) {
      debug(error);
      Response.error(res);
    }
  },
  createUser: async (req, res) => {
    try {
      const { body } = req;
      if (!body || Object.keys(body).length === 0) {
        Response.error(res, new createError.BadRequest()); //eoror en la peticion
      } else {
        const insertedId = await UsersService.create(body);
        Response.success(res, 201, "Usuario agregado", insertedId);
      }
    } catch (error) {
      debug(error);
      Response.error(res);
    }
  },
  updateUser: async (req, res) => {
    try {
      //destructuramos el parametro del id
      const {
        params: { id },
      } = req; //de req obtenemos params y de params el id
      const { body } = req;
      if (!body || Object.keys(body).length === 0) {
        Response.error(res, new createError.BadRequest());
      } else {
        // Almacenamos en la variable user el id ha actualizar
        const user = await UsersService.update(id, body);
        // Validamos si existe el user con ese id
        if (!user) {
          Response.error(res, new createError.NotFound());
        } else {
          Response.success(
            res,
            200,
            `Usuario Actualizado ${id}`,
            Object(body)
          );
        }
      }
    } catch (error) {
      debug(error);
      Response.error(res);
    }
  },
  deleteUser: async (req, res) => {
    try {
      //destructuramos el parametro del id
      const {
        params: { id },
      } = req;
      // Almacenamos en la variable user el id ha eliminar
      const user = await UsersService.deleteProduct(id);
      //validamos si fue eliminado
      if (user.deletedCount === 1) {
        Response.success(res, 202, `Usuario ${id} eliminado`, user);
      } else {
        Response.error(res, new createError.NotFound());
      }
    } catch (error) {
      debug(error);
      Response.error(res);
    }
  },
  
};