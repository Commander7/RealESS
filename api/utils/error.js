export const errorHandler = (statusCode, message) => {
    const error = new Error()                                        // function errorhandler  use it in auth controller
    error.statusCode = statusCode;
    error.message = message;
    return error;
};
