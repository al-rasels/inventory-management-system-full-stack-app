/*-------------------------------------------------------------------------*/
/*                          Brands Controller Module                       */
/* ------------------------------------------------------------------------*/

// Importing Required Models
const DataModel = require("../../models/Brands/BrandsModel");
// Importing Services
const CreateService = require("../../services/common/CreateService");
const UpdateService = require("../../services/common/UpdateService");
const ListService = require("../../services/common/ListService");
const DropDownService = require("../../services/common/DropDownService");

/* ------------------------------------------------------------------------ */
// Create Brand Controller
exports.CreateBrand = async (Request, Response) => {
  const Result = await CreateService(Request, DataModel);
  Response.status(200).json(Result);
};

// Update Brand Controller
exports.UpdateBrand = async (Request, Response) => {
  const Result = await UpdateService(Request, DataModel);
  Response.status(200).json(Result);
};

// Brand List Controller
exports.BrandList = async (Request, Response) => {
  // Creating Search Array for Search Query with Regex
  const SearchRgx = { $regex: Request.params.searchKeyword, $options: "i" }; // i for case insensitive
  const SearchArray = [{ Name: SearchRgx }]; // Searching in Name field only
  // Calling List Service
  const Result = await ListService(Request, DataModel, SearchArray);
  // Returning Response
  Response.status(200).json(Result);
};

// Brand Dropdown Controller
exports.BrandDropDown = async (Request, Response) => {
  const Result = await DropDownService(Request, DataModel, { _id: 1, Name: 1 });
  Response.status(200).json(Result);
};
