/**
 * API Endpoints (Express Router Configuration)
 *
 * Responsibilities:
 * - Load and configure express routes
 * - Handle Request validation and authentication
 * - Delegate business logic to controllers
 * - Mount API routes
 * - Export the configured router
 */

// required modules
const express = require("express");

const AuthVerifyMiddleware = require("../middlewares/AuthVerifyMiddleware");
const UsersController = require("../controllers/Users/UsersController");

const router = express.Router();

/* -------------------------------------------------------------------------- */
/*                              User Profile Routes                           */
/* -------------------------------------------------------------------------- */

// 1. User Registration Route
router.post("/Registration", UsersController.Registration);

// 2. User Login Route
router.post("/Login", UsersController.Login);

// 3. Update User Profile Route
router.post(
  "/ProfileUpdate",
  AuthVerifyMiddleware,
  UsersController.ProfileUpdate
);

// 4. Get User Details Route
router.get(
  "/ProfileDetails",
  AuthVerifyMiddleware,
  UsersController.ProfileDetails
);
// 5. Password Recovery Routes
router.post("/RecoverVerifyEmail/:email", UsersController.RecoverVerifyEmail);
// 6. Verify OTP Route
router.post("/RecoverVerifyOTP/:email/:otp", UsersController.RecoverVerifyOTP);
// 7. Reset Password Route
router.post("/RecoverResetPass", UsersController.RecoverResetPass);

//  Exporting router module
module.exports = router;
