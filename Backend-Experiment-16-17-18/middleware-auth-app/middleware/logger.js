// Logs method, URL, and timestamp for each request
export function logger(req, res, next) {
  const currentTime = new Date().toISOString();
  console.log(`[${currentTime}] ${req.method} ${req.originalUrl}`);
  next(); // Pass control to next middleware
}