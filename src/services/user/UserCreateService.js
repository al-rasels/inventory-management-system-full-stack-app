const UserCreateService = async (Request, DataModel) => {
  try {
    // Getting Data from Request
    const Postbody = Request.body;
    // Insert Data into User Collection
    const data = await DataModel.create(Postbody);
    // Return Success
    return { status: "success", data: data };
  } catch (error) {
    return { status: "fail", data: error.toString() };
  }
};
module.exports = UserCreateService;
