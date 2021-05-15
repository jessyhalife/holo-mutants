const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MutantSchema = new Schema({
  dna: { type: Array, required: true },
  isMutant: { type: Boolean, required: true },
});

module.exports = mongoose.model("MutantModel", MutantSchema);
