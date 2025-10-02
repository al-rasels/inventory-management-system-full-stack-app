/*-------------------------------------------------------------------------*/
/*                          Suppliers Controller Module                    */
/* ------------------------------------------------------------------------*/

// Importing Required Models
const DataModel = require("../../models/Suppliers/SuppliersModel");
// Importing Services
const CreateService = require("../../services/common/CreateService");
const UpdateService = require("../../services/common/UpdateService");
const ListService = require("../../services/common/ListService");
const DropDownService = require("../../services/common/DropDownService");

// Create Suppliers Controller
exports.CreateSuppliers = async (Request, Response) => {
  const Result = await CreateService(Request, DataModel);
  Response.status(200).json(Result);
};

// Update Suppliers Controller
exports.UpdateSuppliers = async (Request, Response) => {
  const Result = await UpdateService(Request, DataModel);
  Response.status(200).json(Result);
};

// Suppliers List Controller
exports.SuppliersList = async (Request, Response) => {
  // Creating Search Array for Search Query with Regex
  const SearchRgx = { $regex: Request.params.searchKeyword, $options: "i" }; // i for case insensitive
  const SearchArray = [
    // Searching within multiple fields
    { Name: SearchRgx },
    { Phone: SearchRgx },
    {
      Email: SearchRgx,
    },
    { Address: SearchRgx },
  ];
  // Calling List Service
  const Result = await ListService(Request, DataModel, SearchArray);
  // Returning Response
  Response.status(200).json(Result);
};

// Suppliers Dropdown Controller
exports.SuppliersDropDown = async (Request, Response) => {
  const Result = await DropDownService(Request, DataModel, { _id: 1, Name: 1 });
  Response.status(200).json(Result);
};
