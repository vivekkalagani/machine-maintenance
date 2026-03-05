const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
  machine: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Machine',
    required: true
  },
  issue: {
    type: String,
    required: true
  },
  status: {
    type: String,
    default: "Open"
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Ticket', ticketSchema);