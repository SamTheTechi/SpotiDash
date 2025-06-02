const { Schema, model } = require("mongoose");

const User = new Schema({
  id: {
    type: String,
    unique: true,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  weekly: {
    exist: {
      type: Boolean,
      default: false,
    },
    weeklyId: {
      type: String,
      default: null,
    },
    playlistId: {
      type: String,
      default: null,
    },
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = model(`User`, User);
