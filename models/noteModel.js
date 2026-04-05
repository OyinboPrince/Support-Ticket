const mongoose = require("mongoose")

const noteSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    ticket: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Ticket",
    },
    text: {
      type: String,
      required: [true, "Please add some text"],
      trim: true,
    },
    isStaff: {
      type: Boolean,
      default: false,
    },
    staffId: {
      type: mongoose.Schema.Types.ObjectId, // better if staff are users
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model("Note", noteSchema)