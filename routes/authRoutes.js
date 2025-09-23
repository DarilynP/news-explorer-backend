import express from "express";
const router = express.Router();

// Define your routes
router.post("/signup", (req, res) => {
  res.send("Signup route works");
});

router.post("/signin", (req, res) => {
  res.send("Signin route works");
});

export default router; 
