const mongoose = require("mongoose");

const catagorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
      trim: true,
      maxlenght: 32,
      unique: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Catagory", catagorySchema);
