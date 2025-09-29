const mongoose = require("mongoose");
const DataSchema = mongoose.Schema(
  {
    email: { type: String, unique: true },
    firstName: { type: String },
    lastName: { type: String },
    mobile: { type: String },
    photo: { type: String },
    password: { type: String },
    createdAt: { type: Date, default: Date.now() },
  },
  { versionKey: false }
);

const DataModel = mongoose.model("users", DataSchema);
module.exports = DataModel;
