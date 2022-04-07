export default function error(req, res, next) {
  // req
  if (!req.headers.includes("X-API-KEY")) {
    next();
  }
  // res
}
