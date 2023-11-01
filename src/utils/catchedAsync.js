const catchedAsync = (fn) => {
  return function (req, res, next) {
    fn(req, res).catch((err) => {
      console.log(err)
      next(err);
    });
  };
};

export default catchedAsync;
