/*-------------------------------------------------------------------------*/
/*                          Product Controller Module                      */
/* ------------------------------------------------------------------------*/
// Importing Required Models
const DataModel = require("../../models/Products/ProductsModel");
// Importing Services
const CreateService = require("../../services/common/CreateService");
const UpdateService = require("../../services/common/UpdateService");
const ListTwoJoinService = require("../../services/common/ListTwoJoinService");

/* ------------------------------------------------------------------------ */

// Create Products Controller
exports.CreateProducts = async (Request, Response) => {
  const Result = await CreateService(Request, DataModel);
  Response.status(200).json(Result);
};
// Update Products Controller
exports.UpdateProducts = async (Request, Response) => {
  const Result = await UpdateService(Request, DataModel);
  Response.status(200).json(Result);
};

// List Products Controller
exports.ProductsList = async (Request, Response) => {
  const SearchRgx = { $regex: Request.params.searchKeyword, $options: "i" };

  // Join Stages to join with Brands
  const JoinStage1 = {
    $lookup: {
      from: "brands",
      localField: "BrandID",
      foreignField: "_id",
      as: "brands",
    },
  };
  // Join Stages to join with Categories
  const JoinStage2 = {
    $lookup: {
      from: "categories",
      localField: "CategoryID",
      foreignField: "_id",
      as: "categories",
    },
  };
  // Search Array
  const SearchArray = [
    { Unit: SearchRgx },
    { Details: SearchRgx },
    { Name: SearchRgx },
    { "brands.Name": SearchRgx },
    { "categories.Name": SearchRgx },
  ];
  // Calling List Service
  const Result = await ListTwoJoinService(
    Request,
    DataModel,
    SearchArray,
    JoinStage1,
    JoinStage2
  );
  // Returning Response
  Response.status(200).json(Result);
};
