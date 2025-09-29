const UserVerifyOtpService = async (Request, DataModel) => {
  try {
    // Get email and OTP from request params
    const email = Request.params.email;
    const OTPCode = Request.params.otp;
    const status = 0;
    const statusUpdate = 1;

    // Checking OTP in OTP collection
    const OTPCount = await DataModel.aggregate([
      { $match: { email: email, otp: OTPCode, status: status } },
      { $count: "total" },
    ]);

    // If OTP found updating OTP,Email and Status
    if (OTPCount.length > 0) {
      const OTPUpdate = await DataModel.updateOne(
        {
          email: email,
          otp: OTPCode,
          status: status,
        },
        { email: email, otp: OTPCode, status: statusUpdate }
      );
    } else {
      return { status: "fail", data: "Invalid OTP" };
    }
  } catch (error) {
    return { status: "fail", data: error.toString() };
  }
};

module.exports = UserVerifyOtpService;
