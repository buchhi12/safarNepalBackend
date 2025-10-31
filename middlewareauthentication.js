import jwt from "jsonwebtoken";

export function auth(requiredRole) {

  return (req, res, next) => {
    const token = req.header("Authorization")?.replace("Bearer ", "");
    
    if (!token) {
      return res.status(401).json({ message: "No token, unauthorized" });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      
      // 🔑 Normalize user object
      req.user = {
        _id: decoded._id || decoded.id,  // always have _id
        role: decoded.role || "user"
      };

      if (requiredRole) {
        const roles = Array.isArray(requiredRole) ? requiredRole : [requiredRole];
        if (!roles.includes(req.user.role)) {
          return res.status(403).json({ message: "Forbidden: Insufficient role" });
        }
      }

      next();
    } catch (err) {
      if (err.name === "TokenExpiredError") {
        return res.status(401).json({ message: "Token expired" });
      }
      res.status(401).json({ message: "Invalid token" });
    }
  };
}

export default auth;
