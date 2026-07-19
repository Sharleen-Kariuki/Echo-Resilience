/**
 * Global Express error handler.
 * express-async-errors automatically forwards async errors here.
 * Must have 4 parameters for Express to recognize it as an error handler.
 */
export const errorHandler = (err, req, res, _next) => {
  console.error(`[${new Date().toISOString()}] ERROR ${req.method} ${req.path}:`, err.message);

  const status = err.status || err.statusCode || 500;
  res.status(status).json({
    error: err.message || 'Internal server error',
    // Stack trace only in development — never expose in production
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
};
