/* -------------------------------------------------------------------------- */
/*                         Return Report Service Module                     */
/* -------------------------------------------------------------------------- */

const ReturnProductModel = require("../../models/Returns/ReturnProductsModel");

const ReturnReportService = async (Request) => {
  try {
    const UserEmail = Request.headers["email"];
    const FromDate = Request.body["FromDate"];
    const ToDate = Request.body["ToDate"];

    const data = await ReturnProductModel.aggregate([
      {
        $match: {
          UserEmail: UserEmail,
          CreatedAt: { $gte: new Date(FromDate), $lte: new Date(ToDate) },
        },
      },
      {
        $facet: {
          Total: [
            {
              $group: {
                _id: 0,
                TotalAmount: { $sum: "$Total" },
              },
            },
          ],
          Rows: [
            {
              $lookup: {
                from: "products",
                localField: "ProductID",
                foreignField: "_id",
                as: "products",
              },
            },
            {
              $unwind: "$products",
            },
            {
              $lookup: {
                from: "brands",
                localField: "products.BrandID",
                foreignField: "_id",
                as: "brands",
              },
            },
            {
              $lookup: {
                from: "categories",
                localField: "products.CategoryID",
                foreignField: "_id",
                as: "categories",
              },
            },
          ],
        },
      },
    ]);
    return { status: "Success", data: data, query: FromDate + " to " + ToDate };
  } catch (error) {
    return { status: "fail", error: error.toString() };
  }
};

module.exports = ReturnReportService;
