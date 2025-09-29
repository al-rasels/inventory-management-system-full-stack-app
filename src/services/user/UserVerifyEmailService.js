const SendEmailUtility = require("../../utilities/SendEmailUtility");
const UserVerifyEmailService = async (Request, DataModel) => {
  try {
    // Getting Data from Request
    const email = Request.params.email;

    // Generate Random 6 Digit OTP
    const OTPCode = Math.floor(100000 + Math.random() * 900000);

    // Check User Email in User Collection
    const UserCount = await DataModel.aggregate([
      { $match: { email: email } },
      { $count: "total" },
    ]);

    if (UserCount.length > 0) {
      // OTP insert into OTP collection
      await OTPModel.create({ email: email, code: OTPCode });

      // Send OTP to user email
      const SendEmail = await SendEmailUtility(
        email,
        "Email Verification OTP",
        `Your PIN Code is ${OTPCode}.`,
        "Inventory Management System Team"
      );
      // Return Success
      return { status: "success", data: SendEmail };
    } else {
      // Return Fail
      return { status: "fail", data: "No User Found" };
    }
  } catch (error) {
    return { status: "fail", data: error.toString() };
  }
};

module.exports = UserVerifyEmailService;
