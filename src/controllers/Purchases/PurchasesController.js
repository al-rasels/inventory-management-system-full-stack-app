/*-------------------------------------------------------------------------*/
/*                         Purchases Controller Module                     */
/* ------------------------------------------------------------------------*/
// Importing Required Models
const ParentModel = require("../../models/Purchases/PurchasesModel");
const ChildModel = require("../../models/Purchases/PurchaseProductsModel");
// Importing Services
const CreateParentChildsService = require("../../services/common/CreateParentChildService");

/* ------------------------------------------------------------------------ */

// Create Products Controller
exports.CreatePurchases = async (Request, Response) => {
  const Result = await CreateParentChildsService(
    Request,
    ParentModel,
    ChildModel,
    "PurchaseID"
  );
  Response.status(200).json(Result);
};
