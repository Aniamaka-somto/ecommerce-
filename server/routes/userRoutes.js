const express = require("express");

const {
  createUser,
  loginUser,
  logoutController,
  getAllUsers,
  getSingleUser,
  updateUser,
  deleteUser,
  getUserProfile,
} = require("../controllers/userController");
const {
  authenticate,
  authenticateAdmin,
} = require("../middleware/authMiddleware");

router = express.Router();
router.post("/register", createUser);
router.post("/login", loginUser);

// Any logged-in user can do these
router.post("/logout", authenticate, logoutController);
router.get("/profile", authenticate, getUserProfile);
// router.put("/profile", authenticate, updateProfile);

//Admin
router.get("/users", authenticate, authenticateAdmin, getAllUsers);
router.get("/users/:id", authenticate, authenticateAdmin, getSingleUser);
router.delete("/users/:id", authenticate, authenticateAdmin, deleteUser);
router.put("/users/:id/role", authenticate, authenticateAdmin, updateUser);

module.exports = router;
//
