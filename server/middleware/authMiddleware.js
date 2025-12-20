const jwt = require("jsonwebtoken");
const user = require("../models/userSchema");
const asyncHandler = require("../middleware/asyncHandler");

const authenticate = asyncHandler(async (req, res, next) => {
  let token;
  token = req.cookies.accessToken;

  console.log("1. Token exists:", !!token);

  if (!token) {
    res.status(401);
    throw new Error("Not authorized, no token");
  }

  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    console.log("2. Token decoded successfully. UserId:", decode.userId);

    const foundUser = await user.findById(decode.id).select("-password");
    console.log("3. User found:", !!foundUser);

    if (!foundUser) {
      res.status(401);
      throw new Error("User not found");
    }

    req.user = foundUser;
    console.log("4. User attached to req. Role:", foundUser.role);
    next();
  } catch (error) {
    console.error("5. Auth error:", error.message);
    res.status(401);
    throw new Error("Not authorized: " + error.message);
  }
});

const authenticateAdmin = asyncHandler(async (req, res, next) => {
  console.log("6. Admin check - User exists:", !!req.user);
  console.log("7. User role:", req.user?.role);

  if (!req.user) {
    res.status(401);
    throw new Error("User not authenticated");
  }

  if (req.user.role === "admin") {
    console.log("8. ✅ Admin access granted!");
    next();
  } else {
    console.log("9. ❌ Access denied. User role:", req.user.role);
    res.status(403);
    throw new Error("Access denied. Admin privileges required.");
  }
});

module.exports = { authenticate, authenticateAdmin };
