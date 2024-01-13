function getFirstMongooseError(error) {
    const firstError = Object.values(error.errors)[0].message;
    return firstError;
}
// Взимам грешката в зависимост от това откъде идва.
exports.getErrorMessage = (error) => {

    switch (error.name) {
        case 'Error':
            return error.message;
        case 'ValidationError':
            return getFirstMongooseError(error);
        default:
            return error.message;
    }

    return error.message
};