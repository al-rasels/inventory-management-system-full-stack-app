/* -------------------------------------------------------------------------- */
/*                           Create ParentChildren Service Module                            */
/* -------------------------------------------------------------------------- */

// Create ParentChildren Service Function
const CreateParentChildrenService = async (
  Request,
  ParentModel,
  ChildrenModel,
  JoinPropertyName
) => {
  try {
    // Getting Data from Request body
    const Parent = Request.body["Parent"];
    // Adding User Email to Parent Body
    Parent.UserEmail = Request.headers["email"];
    // Inserting Parent Data into Collection
    const ParentCreation = await ParentModel.create(Parent);
    // If Parent Created Successfully then Create Children
    if (ParentCreation._id) {
      try {
        // Getting Children from Request Body
        const Children = Request.body["Children"];
        // Adding User Email and ParentID to each Child
        await Children.forEach((element) => {
          element["UserEmail"] = Request.headers["email"];
          element[JoinPropertyName] = ParentCreation["_id"];
        });
        // Inserting Children into Collection
        const ChildrenCreation = await ChildrenModel.insertMany(Children);
        // Return Success with Parent and Children Data
        return {
          status: "success",
          data: { Parent: ParentCreation, Children: ChildrenCreation },
        };
      } catch (err) {
        // If Children Creation Failed then Delete the Created Parent to maintain Data Integrity
        await ParentModel.remove({ _id: ParentCreation["_id"] });
        // Return Error
        return { status: "fail", data: err.toString() };
      }
    } else {
      return { status: "fail", data: "Parent Creation Failed" };
    }
  } catch (error) {
    // Return Error
    return { status: "fail", data: error.toString() };
  }
};

module.exports = CreateParentChildrenService;
