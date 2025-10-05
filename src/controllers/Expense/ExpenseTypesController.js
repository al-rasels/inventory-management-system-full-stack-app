/*-------------------------------------------------------------------------*/
/*                          ExpenseType Controller Module                       */
/* ------------------------------------------------------------------------*/

// Importing Required Models
const DataModel = require("../../models/Expenses/ExpenseTypesModel");
// Importing Services
const CreateService = require("../../services/common/CreateService");
const UpdateService = require("../../services/common/UpdateService");
const ListService = require("../../services/common/ListService");
const DropDownService = require("../../services/common/DropDownService");
/* ------------------------------------------------------------------------ */
// Create ExpenseType Controller
exports.CreateExpenseTypes = async (Request, Response) => {
  const Result = await CreateService(Request, DataModel);
  Response.status(200).json(Result);
};

// Update ExpenseTypes Controller
exports.UpdateExpenseTypes = async (Request, Response) => {
  const Result = await UpdateService(Request, DataModel);
  Response.status(200).json(Result);
};

// ExpenseTypes List Controller
exports.ExpenseTypesList = async (Request, Response) => {
  // Creating Search Array for Search Query with Regex
  const SearchRgx = { $regex: Request.params.searchKeyword, $options: "i" }; // i for case insensitive
  const SearchArray = [{ Name: SearchRgx }]; // Searching in Name field only
  // Calling List Service
  const Result = await ListService(Request, DataModel, SearchArray);
  // Returning Response
  Response.status(200).json(Result);
};

// ExpenseTypes Dropdown Controller
exports.ExpenseTypesDropDown = async (Request, Response) => {
  const Result = await DropDownService(Request, DataModel, { _id: 1, Name: 1 });
  Response.status(200).json(Result);
};
