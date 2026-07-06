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

  // What the learner will be able to do after completing this week.
  // Optional — undefined on pre-v2 documents, which is fine.
  learningObjectives: [
    {
      type: String
    }
  ],

  topics: [
    {
      type: String
    }
  ],

  // Auto-calculated: topics.length × hoursPerTopic(skillLevel)
  // Optional — undefined on pre-v2 documents, which is fine.
  estimatedStudyHours: {
    type: Number
  },

  completed: {
    type: Boolean,
    default: false
  }

}, {
  timestamps: true
});

const Roadmap = mongoose.model("Roadmap", roadmapSchema);

module.exports = Roadmap;