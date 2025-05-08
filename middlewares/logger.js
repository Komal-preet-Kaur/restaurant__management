const logger = (req, res, next) => {
    const method = req.method;
    const url = req.originalUrl; // more accurate than req.url for middlewares
    const timestamp = new Date().toISOString();
    const username = req.session?.user?.username || 'Guest';
    console.log(`[${timestamp}] ${method} ${url} - User: ${username}`);
    next();
  };
  
  module.exports = logger;
  