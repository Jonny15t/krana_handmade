module.exports = function errorHandler(error, req, res, next) {
  res.send(error.message);
};