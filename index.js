const app = require("./app");
const PORT = process.env.PORT || 8080;
/* -------------------------------------------------------------------------- */
/*                                 Start Server                               */
/* -------------------------------------------------------------------------- */
app.listen(PORT, function () {
  console.log(`Application is Running on port: ${PORT}`);
});
