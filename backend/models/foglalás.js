const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const foglalásSchema = new Schema(
  {
    film: { type: String, required: true },
    székek: { type: Array, required: true },
    ár: { type: Number, required: true },
    felhasználó: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "felhasználó",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("foglalás", foglalásSchema, "foglalások");
