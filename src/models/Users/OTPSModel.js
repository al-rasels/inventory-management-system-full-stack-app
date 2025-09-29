const mongoose = require("mongoose");
const OTPSchema = mongoose.Schema(
  {
    email: { type: String },
    otp: { type: String },
    status: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now(), expires: 300 }, // OTP Expires after 5 minutes
  },
  { versionKey: false }
);

const OTPModel = mongoose.model("otps", OTPSchema);
module.exports = OTPModel;
