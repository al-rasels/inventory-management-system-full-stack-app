/*-------------------------------------------------------------------------*/
/*                         Purchases Controller Module                     */
/* ------------------------------------------------------------------------*/
// Importing Required Models
const ParentModel = require("../../models/Purchases/PurchasesModel");
const ChildModel = require("../../models/Purchases/PurchaseProductsModel");
// Importing Services
const CreateParentChildsService = require("../../services/common/CreateParentChildService");
const ListOneJoinService = require("../../services/common/ListOneJoinService");

/* ------------------------------------------------------------------------ */

// Create Purchases Controller
exports.CreatePurchases = async (Request, Response) => {
  const Result = await CreateParentChildsService(
    Request,
    ParentModel,
    ChildModel,
    "PurchaseID"
  );
  Response.status(200).json(Result);
};

exports.PurchasesList = async (Request, Response) => {
  // Creating Search Array for Search Query with Regex
  const SearchRgx = { $regex: Request.params.searchKeyword, $options: "i" }; // i for case insensitive
  // Creating Join Stage Object
  const JoinStage = {
    $lookup: {
      from: "suppliers",
      localField: "SupplierID",
      foreignField: "_id",
      as: "suppliers",
    },
  };
  // Creating Search Array
  const SearchArray = [
    { Note: SearchRgx },
    { "suppliers.Name": SearchRgx },
    { "suppliers.Address": SearchRgx },
    { "suppliers.Phone": SearchRgx },
    { "suppliers.Email": SearchRgx },
  ];
  // Calling ListOneJoinService
  const Result = await ListOneJoinService(
    Request,
    ParentModel,
    SearchArray,
    JoinStage
  );
  // Sending Response to Client
  Response.status(200).json(Result);
}; 