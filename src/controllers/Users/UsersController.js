// importing Required Modules
const DataModel = require("../../models/Users/UsersModel");
const OTPSModel = require("../../models/Users/OTPSModel");

// Importing Services
const UserCreateService = require("../../services/user/UserCreateService");
const UserLoginService = require("../../services/user/UserLoginService");
const UserVerifyEmailService = require("../../services/user/UserVerifyEmailService");
const UserDetailsService = require("../../services/user/UserDetailsService");
const UserUpdateService = require("../../services/user/UserUpdateService");
const UserVerifyOTPService = require("../../services/user/UserVerifyOtpService");
const UserResetPassService = require("../../services/user/UserResetPassService");

// Users Controller
exports.Registration = async (Request, Response) => {
  const result = await UserCreateService(Request, DataModel);
  Response.status(200).json(result);
};
exports.Login = async (Request, Response) => {
  const result = await UserLoginService(Request, DataModel);
  Response.status(200).json(result);
};
exports.ProfileUpdate = async (Request, Response) => {
  const result = await UserUpdateService(Request, DataModel);
  Response.status(200).json(result);
};
exports.ProfileDetails = async (Request, Response) => {
  const result = await UserDetailsService(Request, DataModel);
  Response.status(200).json(result);
};
exports.RecoverVerifyEmail = async (Request, Response) => {
  const result = await UserVerifyEmailService(Request, DataModel);
  Response.status(200).json(result);
};
exports.RecoverVerifyOTP = async (Request, Response) => {
  const result = await UserVerifyOTPService(Request, OTPSModel);
  Response.status(200).json(result);
};

exports.RecoverResetPass = async (Request, Response) => {
  const result = await UserResetPassService(Request, DataModel);
  Response.status(200).json(result);
};
