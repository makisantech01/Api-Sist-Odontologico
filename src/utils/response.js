export default response = (res, statusCode, data) => {
  res.status(statusCode).send({
    error: false,
    data,
  });
};
