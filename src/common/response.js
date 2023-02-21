const createError = require('http-errors');//Permite crear errores para poder enviarlos

module.exports.Response = {
    success: (res, status = 200,message= "OK", body = {}) => {
        res.status(status).json({message,body});
    },
    error: (res, error = null) => {
        const { statusCode, message } = error ? error : new createError.InternalServerError();//Si hay un error utiliza el error que se paso por defecto, sino genera un nuevo error con internalserver
        
        res.status(statusCode).json({message})
    }
}