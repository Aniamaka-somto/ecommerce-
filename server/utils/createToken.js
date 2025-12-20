const jwt = require("jsonwebtoken");

const generateToken = (res, id) => {
  const token = jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });

  // Set HTTP-only cookie ← THIS IS THE KEY PART
  res.cookie("accessToken", token, {
    path: "/",
    expires: new Date(Date.now() + 1000 * 24 * 60 * 60 * 7), // 7 days
    httpOnly: true, // ← Blocks JS access (no XSS)
    sameSite: "none", // ← CSRF protection (lax/strict in prod)
    secure: true, // ← HTTPS only
  });
};
module.exports = generateToken;
