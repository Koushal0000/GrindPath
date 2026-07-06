const mongoose = require("mongoose");

// Stores roadmap generation metadata for each goal.
// One document per goal (unique index on `goal`).
// Created / updated (upserted) on every generateRoadmap call.
// Backward compatible: existing Roadmap/Goal documents are untouched.

const roadmapMetaSchema = new mongoose.Schema(
  {
    goal: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Goal",
      required: true,
      unique: true
    },

    domain: {
      type: String,
      required: true,
      enum: ["mern", "java", "genai", "dsa", "cloud"]
    },

    skillLevel: {
      type: String,
      required: true,
      enum: ["Beginner", "Intermediate", "Advanced"]
    },

    hoursPerDay: {
      type: Number,
      required: true,
      min: 1,
      max: 24
    },

    // e.g. "18 weeks"
    estimatedDuration: {
      type: String,
      required: true
    },

    // Raw number for calculations
    estimatedWeeks: {
      type: Number
    },

    // "Slow" | "Moderate" | "Fast"
    learningPace: {
      type: String,
      enum: ["Slow", "Moderate", "Fast"]
    },

    // Total topic count across all weeks in the generated roadmap
    totalTopics: {
      type: Number
    },

    // Total estimated study hours (topics × hoursPerTopic)
    totalHours: {
      type: Number
    },

    // When the roadmap was last generated
    generatedAt: {
      type: Date,
      default: Date.now
    }
  },
  {
    timestamps: true
  }
);

const RoadmapMeta = mongoose.model("RoadmapMeta", roadmapMetaSchema);

module.exports = RoadmapMeta;
