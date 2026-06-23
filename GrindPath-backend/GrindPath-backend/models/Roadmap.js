const mongoose = require("mongoose");

const roadmapSchema = new mongoose.Schema({

  goal: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Goal",
    required: true
  },

  week: {
    type: Number,
    required: true
  },

  title: {
    type: String,
    required: true
  },

  topics: [
    {
      type: String
    }
  ],

  completed: {
    type: Boolean,
    default: false
  }

}, {
  timestamps: true
});

const Roadmap = mongoose.model("Roadmap", roadmapSchema);

module.exports = Roadmap;