const mongoose = require("mongoose")

//Define schema for a Ticket Document
const ticketSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    product: {
      type: String,
      required: [true, "Please select a product"],
      enum: ["Iphone", "Macbook", "HP Elitebook", "HP Probook"],
    },
    description: {
      type: String,
      required: [true, "Please describe the issue"],
    },
    status: {
      type: String,
      enum: ["new", "open", "close"],
      default: "new",
    },
  },
  {
    timestamps: true,
  }
)

const Ticket = mongoose.model("Ticket", ticketSchema)

module.exports = Ticket
