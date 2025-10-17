/* -------------------------------------------------------------------------- */
/*                           ExpenseReport Service Module                     */
/* -------------------------------------------------------------------------- */

const ExpenseModel = require("../../models/Expenses/ExpensesModel");

const ExpenseReportService = async (Request) => {
  try {
    const UserEmail = Request.headers["email"];
    const FromDate = Request.body["FromDate"];
    const ToDate = Request.body["ToDate"];

    const data = await ExpenseModel.aggregate([
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
                TotalAmount: { $sum: "$Amount" },
              },
            },
          ],
          Rows: [
            {
              $lookup: {
                from: "expensetypes",
                localField: "TypeID",
                foreignField: "_id",
                as: "Type",
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

module.exports = ExpenseReportService;
