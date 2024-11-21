const mongoose = require("mongoose");

const AlertSchema = new mongoose.Schema({
  crypto: { type: String, required: true },
  condition: { type: String, required: true, enum: ["above", "below"] },
  threshold: { type: Number, required: true },
  userEmail: { type: String, required: true },
});

module.exports = mongoose.model("Alert", AlertSchema);
