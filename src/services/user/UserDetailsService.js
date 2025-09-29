const UserDetailsService = async (Request, DataModel) => {
  try {
    // Fetch User Details
    const data = await DataModel.aggregate([
      { $match: { email: Request.headers["email"] } },
    ]);
    return { status: "success", data: data };
  } catch (error) {
    return { status: "fail", data: error.toString() };
  }
};
module.exports = UserDetailsService;
