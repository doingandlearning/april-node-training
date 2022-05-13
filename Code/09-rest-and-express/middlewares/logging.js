export function logging(req, res, next) {
  // Escape the middleware as quickly as possible!
  // if(req.headers["x-api-key"]) {
  // 	next()
  // }
  console.log("I've been logged", req.path);
  next();
}
