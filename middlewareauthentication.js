import jwt from 'jsonwebtoken'

export function auth(requiredRole) {
  return (req, res, next) => {
    //check token
    const token =
      req.header("Authorization")?.replace("Bearer ", "") || req.cookies?.token;

    if (!token) {
      return res.status(401).json({ message: "No token, unauthorized" });
    }
//if token is verified it further check role
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;

      if (requiredRole) {
        const roles = Array.isArray(requiredRole) ? requiredRole : [requiredRole];
        if (!roles.includes(decoded.role)) {
          return res.status(403).json({ message: "Forbidden: Insufficient role" });
        }
      }

      next();
    } catch (err) {
        //incase token is expired
      if (err.name === "TokenExpiredError") {
        return res.status(401).json({ message: "Token expired" });
      }
      res.status(401).json({ message: "Invalid token" });
    }
  };
}

export default auth;
