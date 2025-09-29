const UserUpdateService = async (Request, DataModel) => {
  try {
    // Update User Details
    const data = await DataModel.updateOne(
      { email: Request.Headers["email"] },
      { $set: Request.body }
    );
    return { status: "success", data: data };
  } catch (error) {
    return { status: "fail", data: error.toString() };
  }
};
module.exports = UserUpdateService;
