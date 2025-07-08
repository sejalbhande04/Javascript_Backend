// promise based asynchronous handler for Express.js routes
// This utility function wraps an Express.js route handler to automatically catch errors and pass them to the next middleware.
// This is useful for avoiding repetitive try-catch blocks in route handlers.

const asynchandler = (requestHandler) => {
  return async (req, res, next) => {
    Promise.resolve(requestHandler(req, res, next)).catch((err) => next(err));
  };
};

// Alternative implementations of asyncHandler using try catch blocks

// const asyncHandler = () => {}
// const asyncHandler = (func) => () => {}
// const asyncHandler = (fn) => async () => {}

// const asynchandler = (fn) => async (req,res,next) => {
//     try {
//         await fn(req,res,next)
//     } catch (error) {
//         res.status(error.code || 500).json({
//             success: false,
//             message: error.message
//         })
//     }

// }

export { asynchandler };
