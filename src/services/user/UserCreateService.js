const UserCreateService = async (DataModel, Request) => {
  try {
    const Postbody = Request.body;
    const data = await DataModel.create(Postbody);
    return { status: "success", data: data };
  } catch (error) {
    return { status: "fail", data: error.toString() };
  }
};
module.exports = UserCreateService;
