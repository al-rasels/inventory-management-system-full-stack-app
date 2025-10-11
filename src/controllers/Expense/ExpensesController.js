/*-------------------------------------------------------------------------*/
/*                          Expenses Controller Module                     */
/* ------------------------------------------------------------------------*/
// Importing Required Models
const DataModel = require("../../models/Expenses/ExpensesModel");
// Importing Services
const CreateService = require("../../services/common/CreateService");
const UpdateService = require("../../services/common/UpdateService");
const ListOneJoinService = require("../../services/common/ListOneJoinService");
const DeleteService = require("../../services/common/DeleteService");

/* ------------------------------------------------------------------------ */

// Create Expenses Controller
exports.CreateExpenses = async (Request, Response) => {
  const Result = await CreateService(Request, DataModel);
  Response.status(200).json(Result);
};
// Update Expenses Controller
exports.UpdateExpenses = async (Request, Response) => {
  const Result = await UpdateService(Request, DataModel);
  Response.status(200).json(Result);
};

exports.ExpensesList = async (Request, Response) => {
  const SearchRgx = { $regex: Request.params.searchKeyword, $options: "i" };
  const SearchArray = [
    { Note: SearchRgx },
    { Amount: SearchRgx },
    { "Type.Name": SearchRgx },
  ];
  // Join Stage to join with ExpenseTypes collection
  const JoinStage = {
    $lookup: {
      from: "expensetypes",
      localField: "TypeID",
      foreignField: "_id",
      as: "Type",
    },
  };
  const Result = await ListOneJoinService(
    Request,
    DataModel,
    SearchArray,
    JoinStage
  );
  Response.status(200).json(Result);
};

exports.DeleteExpense = async (Request, Response) => {
  const Result = await DeleteService(Request, DataModel);
  Response.status(200).json(Result);
};