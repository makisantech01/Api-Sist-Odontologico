const response = (res, statusCode, data) => {
  res.status(statusCode).send({
    error: false,
    data,
  });
};

export default response;
