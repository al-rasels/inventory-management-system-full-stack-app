const CreateToken = require("../../utils/CreateToken");
const UserLoginService = async (Request, DataModel) => {
  try {
    // Fetch User Details
    const data = await DataModel.aggregate([
      { $match: Request.body },
      {
        $project: {
          _id: 0,
          email: 1,
          firstName: 1,
          lastName: 1,
          mobile: 1,
          photo: 1,
        },
      },
    ]);
    // Generate Token if user found
    if (data.length > 0) {
      const token = await CreateToken(data[0]["email"]);
      return { status: "success", token: token, data: data[0] };
    } else {
      return { status: "unauthorized", data: "Invalid Credentials" };
    }
  } catch (error) {
    return { status: "fail", data: error.toString() };
  }
};
module.exports = UserLoginService;
