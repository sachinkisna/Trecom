function notFound(req, res, next) {
  const error = new Error(`Not found - ${req.originalUrl}`);
  error.statusCode = 404;
  next(error);
}

function errorHandler(err, req, res, next) {
  let statusCode = err.statusCode || 500;
  let message = err.message || "Server error";

  // Keep the public response safe in production, but always retain enough
  // context in the server logs to diagnose a failed public submission.
  console.error("API request failed", {
    method: req.method,
    path: req.originalUrl,
    statusCode,
    name: err.name,
    message: err.message,
    stack: err.stack,
  });

  if (err.name === "CastError") {
    statusCode = 400;
    message = "Invalid resource ID";
  }

  if (err.name === "ValidationError") {
    statusCode = 400;
    message = Object.values(err.errors)
      .map((item) => item.message)
      .join(", ");
  }

  if (err.code === 11000) {
    statusCode = 409;
    const field = Object.keys(err.keyValue || {})[0] || "field";
    message = `Duplicate value for ${field}`;
  }

  if (err.name === "MulterError") {
    statusCode = 400;
    message = err.message;
  }

  if (process.env.NODE_ENV === "production" && statusCode === 500) {
    message = "Internal server error";
  }

  res.status(statusCode).json({
    success: false,
    message,
    ...(process.env.NODE_ENV !== "production" && err.stack
      ? { stack: err.stack }
      : {}),
  });
}

module.exports = { notFound, errorHandler };
