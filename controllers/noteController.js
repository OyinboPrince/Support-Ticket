const asyncHandler = require("express-async-handler")

const User = require("../models/userModel")
const Note = require("../models/noteModel")
const Ticket = require("../models/ticketModel")

// @desc    Get notes for a ticket
// @route   GET /api/tickets/:ticketId/notes
// @access  Private
const getNotes = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id)
  if (!user) {
    res.status(401)
    throw new Error("User not found")
  }

  const ticket = await Ticket.findById(req.params.ticketId)
  if (!ticket) {
    res.status(404)
    throw new Error("Ticket not found")
  }

  // Only owner (or staff — optional) can view notes
  if (ticket.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error("User not authorized")
  }

  const notes = await Note.find({ ticket: req.params.ticketId })
    .populate("user", "name email")
    .populate("staffId", "name")
    .sort({ createdAt: -1 })

  res.status(200).json(notes)
})


// @desc    Add note to ticket
// @route   POST /api/tickets/:ticketId/notes
// @access  Private
const addNote = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id)
  if (!user) {
    res.status(401)
    throw new Error("User not found")
  }

  const ticket = await Ticket.findById(req.params.ticketId)
  if (!ticket) {
    res.status(404)
    throw new Error("Ticket not found")
  }

  if (ticket.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error("User not authorized")
  }

  if (!req.body.text) {
    res.status(400)
    throw new Error("Note text is required")
  }

  const note = await Note.create({
    text: req.body.text,
    isStaff: false,
    ticket: req.params.ticketId,
    user: req.user.id,
  })

  res.status(201).json(note)
})

module.exports = {
  getNotes,
  addNote,
}