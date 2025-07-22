const mongoose = require("mongoose");

const clientSchema = new mongoose.Schema({
  clientName: {
    type: String,
    required: true
  },
  clientPhone: {
    type: String,
    required: true
  }
}, { timestamps: true });

const Client = mongoose.model("Client", clientSchema);

module.exports = Client;
