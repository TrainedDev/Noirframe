export const asyncHandlers =  (cb) => {
  return (req, res, next) => {
    Promise.resolve(cb(req, res, next)).catch(error => next(error));
  };
};

export const errorHandler = (err, req, res, next) => {
  // console.log(err, err.message);
  
  res.status(err.statusCode || 500).json({
    success: false,
    msg: err.message || "Internal server error",
  });
};
