/**
 * API Endpoints (Express Router Configuration)
 *
 * Responsibilities:
 * - Load and configure express routes
 * - Handle Request validation and authentication
 * - Delegate business logic to controllers
 * - Mount API routes
 * - Export the configured router
 */

// Importing express library
const express = require("express");

// Importing Middlewares and Controllers
const AuthVerifyMiddleware = require("../middlewares/AuthVerifyMiddleware");
const UsersController = require("../controllers/Users/UsersController");
const BrandsController = require("../controllers/Brands/BrandsController");
const CategoriesController = require("../controllers/Categories/CategoriesController");
const CustomersController = require("../controllers/Customers/CustomersController");
const SuppliersController = require("../controllers/Suppliers/SuppliersController");
const ExpenseTypesController = require("../controllers/Expense/ExpenseTypesController");
const ExpensesController = require("../controllers/Expense/ExpensesController");
const ProductsController = require("../controllers/Products/ProductsController");
const PurchasesController = require("../controllers/Purchases/PurchasesController");
const SalesController = require("../controllers/Sales/SalesController");
const ReturnsController = require("../controllers/Returns/ReturnsController");

/* -------------------------------------------------------------------------- */
//  Creating Router instance
const router = express.Router();

/* -------------------------------------------------------------------------- */
/*                              Users Routes                                  */
/* -------------------------------------------------------------------------- */

// 1. User Registration Route
router.post("/Registration", UsersController.Registration);

// 2. User Login Route
router.post("/Login", UsersController.Login);

// 3. Update User Profile Route
router.post(
  "/ProfileUpdate",
  AuthVerifyMiddleware,
  UsersController.ProfileUpdate
);

// 4. Get User Details Route
router.get(
  "/ProfileDetails",
  AuthVerifyMiddleware,
  UsersController.ProfileDetails
);
// 5. Password Recovery Routes
router.get("/RecoverVerifyEmail/:email", UsersController.RecoverVerifyEmail);
// 6. Verify OTP Route
router.get("/RecoverVerifyOTP/:email/:otp", UsersController.RecoverVerifyOTP);
// 7. Reset Password Route
router.post("/RecoverResetPass", UsersController.RecoverResetPass);

/* -------------------------------------------------------------------------- */
/*                              Brands Routes                                 */
/* -------------------------------------------------------------------------- */

//Create Brand
router.post("/CreateBrand", AuthVerifyMiddleware, BrandsController.CreateBrand);
// Update Brand
router.post(
  "/UpdateBrand/:id",
  AuthVerifyMiddleware,
  BrandsController.UpdateBrand
);
// Brand List
router.get(
  "/BrandList/:pageNo/:perPage/:searchKeyword",
  AuthVerifyMiddleware,
  BrandsController.BrandList
);
// Brand Dropdown
router.get(
  "/BrandDropDown",
  AuthVerifyMiddleware,
  BrandsController.BrandDropDown
);

/* -------------------------------------------------------------------------- */
/*                             Categories Routes                              */
/* -------------------------------------------------------------------------- */

//Create Categories
router.post(
  "/CreateCategories",
  AuthVerifyMiddleware,
  CategoriesController.CreateCategories
);
// Update Categories
router.post(
  "/UpdateCategories/:id",
  AuthVerifyMiddleware,
  CategoriesController.UpdateCategories
);
// Categories List
router.get(
  "/CategoriesList/:pageNo/:perPage/:searchKeyword",
  AuthVerifyMiddleware,
  CategoriesController.CategoriesList
);
// Categories Dropdown
router.get(
  "/CategoriesDropDown",
  AuthVerifyMiddleware,
  CategoriesController.CategoriesDropDown
);

/* -------------------------------------------------------------------------- */
/*                             Customers Routes                               */
/* -------------------------------------------------------------------------- */

//Create Customers
router.post(
  "/CreateCustomers",
  AuthVerifyMiddleware,
  CustomersController.CreateCustomers
);
// Update Customers
router.post(
  "/UpdateCustomers/:id",
  AuthVerifyMiddleware,
  CustomersController.UpdateCustomers
);
// Customers List
router.get(
  "/CustomersList/:pageNo/:perPage/:searchKeyword",
  AuthVerifyMiddleware,
  CustomersController.CustomersList
);
// // Customers Dropdown
router.get(
  "/CustomersDropDown",
  AuthVerifyMiddleware,
  CustomersController.CustomersDropDown
);

/* -------------------------------------------------------------------------- */
/*                             Suppliers Routes                               */
/* -------------------------------------------------------------------------- */

//Create Suppliers
router.post(
  "/CreateSuppliers",
  AuthVerifyMiddleware,
  SuppliersController.CreateSuppliers
);
// Update Suppliers
router.post(
  "/UpdateSuppliers/:id",
  AuthVerifyMiddleware,
  SuppliersController.UpdateSuppliers
);
// Suppliers List
router.get(
  "/SuppliersList/:pageNo/:perPage/:searchKeyword",
  AuthVerifyMiddleware,
  SuppliersController.SuppliersList
);
// Suppliers Dropdown
router.get(
  "/SuppliersDropDown",
  AuthVerifyMiddleware,
  SuppliersController.SuppliersDropDown
);

/* -------------------------------------------------------------------------- */
/*                             ExpenseTypes Routes                            */
/* -------------------------------------------------------------------------- */

//Create ExpenseTypes
router.post(
  "/CreateExpenseTypes",
  AuthVerifyMiddleware,
  ExpenseTypesController.CreateExpenseTypes
);
// Update ExpenseTypes
router.post(
  "/UpdateExpenseTypes/:id",
  AuthVerifyMiddleware,
  ExpenseTypesController.UpdateExpenseTypes
);
// ExpenseTypes List
router.get(
  "/ExpenseTypesList/:pageNo/:perPage/:searchKeyword",
  AuthVerifyMiddleware,
  ExpenseTypesController.ExpenseTypesList
);
// ExpenseTypes Dropdown
router.get(
  "/ExpenseTypesDropDown",
  AuthVerifyMiddleware,
  ExpenseTypesController.ExpenseTypesDropDown
);

/* -------------------------------------------------------------------------- */
/*                              Expenses Route                                */
/* -------------------------------------------------------------------------- */
// Create Expenses
router.post(
  "/CreateExpenses",
  AuthVerifyMiddleware,
  ExpensesController.CreateExpenses
);
// Update Expenses
router.post(
  "/UpdateExpenses/:id",
  AuthVerifyMiddleware,
  ExpensesController.UpdateExpenses
);
router.get(
  "/ExpensesList/:pageNo/:perPage/:searchKeyword",
  AuthVerifyMiddleware,
  ExpensesController.ExpensesList
);
/* -------------------------------------------------------------------------- */
/*                              Products Route                                */
/* -------------------------------------------------------------------------- */
// Create Products
router.post(
  "/CreateProducts",
  AuthVerifyMiddleware,
  ProductsController.CreateProducts
);
// Update Products
router.post(
  "/UpdateProducts/:id",
  AuthVerifyMiddleware,
  ProductsController.UpdateProducts
);
router.get(
  "/ProductsList/:pageNo/:perPage/:searchKeyword",
  AuthVerifyMiddleware,
  ProductsController.ProductsList
);

/* -------------------------------------------------------------------------- */
/*                             Purchases Route                                */
/* -------------------------------------------------------------------------- */
// Create Purchases
router.post(
  "/CreatePurchases",
  AuthVerifyMiddleware,
  PurchasesController.CreatePurchases
);
// Purchases List
router.get(
  "/PurchasesList/:pageNo/:perPage/:searchKeyword",
  AuthVerifyMiddleware,
  PurchasesController.PurchasesList
);
// Purchases Delete
router.get(
  "/PurchaseDelete/:id",
  AuthVerifyMiddleware,
  PurchasesController.PurchasesDelete
);
/* -------------------------------------------------------------------------- */
/*                             Sales Route                                    */
/* -------------------------------------------------------------------------- */
// Create Sales
router.post("/CreateSales", AuthVerifyMiddleware, SalesController.CreateSales);
// Sales List
router.get(
  "/SalesList/:pageNo/:perPage/:searchKeyword",
  AuthVerifyMiddleware,
  SalesController.SalesList
);
// Sale Delete
router.get(
  "/SaleDelete/:id",
  AuthVerifyMiddleware,
  SalesController.SaleDelete
);

/* -------------------------------------------------------------------------- */
/*                             Returns Route                                  */
/* -------------------------------------------------------------------------- */
// Create Returns
router.post(
  "/CreateReturns",
  AuthVerifyMiddleware,
  ReturnsController.CreateReturns
);
// Returns List
router.get(
  "/ReturnsList/:pageNo/:perPage/:searchKeyword",
  AuthVerifyMiddleware,
  ReturnsController.ReturnsList
);
// Return Delete
router.get(
  "/ReturnDelete/:id",
  AuthVerifyMiddleware,
  ReturnsController.ReturnDelete
);

//  Exporting router module
module.exports = router;
