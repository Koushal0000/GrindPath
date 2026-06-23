const Goal = require("../models/Goal");
const Roadmap = require("../models/Roadmap");


// GENERATE ROADMAP
const generateRoadmap = async (req, res) => {

  try {

    const goal = await Goal.findById(req.params.goalId);

    if (!goal) {

      return res.status(404).json({
        message: "Goal not found"
      });

    }

    // CHECK OWNERSHIP
    if (goal.user.toString() !== req.user) {

      return res.status(401).json({
        message: "Not authorized"
      });

    }

    const duration = goal.duration || 30;

    const calculateRoadmapWeeks = (days) => {

  if (days <= 20) return 1;

  if (days <= 30) return 2;

  if (days <= 45) return 3;

  if (days <= 60) return 4;

  if (days <= 75) return 5;

  return 6;

};

    const totalWeeks = calculateRoadmapWeeks(duration);

    const mernRoadmap = [
      {
        title: "Frontend Basics",
        topics: ["HTML & CSS Basics", "Responsive Design"]
      },
      {
        title: "JavaScript Fundamentals",
        topics: ["JS Variables & Control Flow", "JS Functions & DOM"]
      },
      {
        title: "React Basics",
        topics: ["ES6+ Features & Async JS", "React Components & Props", "React State & Hooks"]
      },
      {
        title: "Backend Development",
        topics: ["React Router & Context API", "Node.js Basics", "Express.js & REST APIs"]
      },
      {
        title: "Database & APIs",
        topics: ["Middleware & Error Handling", "MongoDB & Mongoose Schemas", "CRUD Operations"]
      },
      {
        title: "Auth, Deployment & Optimization",
        topics: ["Authentication & JWT", "Frontend-Backend Integration", "Deployment & Hosting", "Performance Optimization"]
      }
    ];

    const javaRoadmap = [
      {
        title: "Java Foundations",
        topics: ["Java Syntax & Variables", "Control Flow & Loops"]
      },
      {
        title: "Core Java Concepts",
        topics: ["Methods & Scope", "Arrays & Strings"]
      },
      {
        title: "Object-Oriented Design",
        topics: ["Classes & Objects", "Inheritance & Polymorphism"]
      },
      {
        title: "Advanced Java Patterns",
        topics: ["Abstraction & Interfaces", "Encapsulation & Access Modifiers"]
      },
      {
        title: "Collections & Data Structures",
        topics: ["ArrayList & LinkedList", "HashMap & HashSet"]
      },
      {
        title: "Java Integration",
        topics: ["Exception Handling", "File I/O & Streams", "Multithreading Basics", "JDBC Integration"]
      }
    ];

    const titleLower = goal.title.toLowerCase();

let roadmapBlueprint = [
  {
    title: "Learning Foundations",
    topics: [
      "Research the topic",
      "Understand the fundamentals",
      "Create a study plan"
    ]
  }
];

if (
  titleLower.includes("mern") ||
  titleLower.includes("react") ||
  titleLower.includes("node") ||
  titleLower.includes("express") ||
  titleLower.includes("mongodb")
) {
  roadmapBlueprint = mernRoadmap;
}

else if (
  titleLower.includes("java") ||
  titleLower.includes("spring") ||
  titleLower.includes("jdbc")
) {
  roadmapBlueprint = javaRoadmap;
}

   const roadmapData = [];

for (let i = 1; i <= totalWeeks; i++) {

  const weekConfig =
    roadmapBlueprint[i - 1] ||
    roadmapBlueprint[roadmapBlueprint.length - 1];

  roadmapData.push({

    week: i,

    title: `Week ${i}: ${weekConfig.title}`,

    topics: weekConfig.topics

  });

}

    // SAVE ROADMAP WEEKS
    const documentsToInsert = roadmapData.map(item => ({
      goal: goal._id,
      week: item.week,
      title: item.title,
      topics: item.topics
    }));

await Roadmap.deleteMany({

  goal: goal._id

});
    const createdRoadmap = await Roadmap.insertMany(documentsToInsert);

    res.status(201).json(createdRoadmap);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server Error"
    });

  }

};


// MARK WEEK COMPLETED
const markWeekCompleted = async (req, res) => {

  try {

    const roadmap = await Roadmap.findById(req.params.id)
      .populate("goal");

    if (!roadmap) {

      return res.status(404).json({
        message: "Roadmap week not found"
      });

    }

    // OWNERSHIP CHECK
    if (roadmap.goal.user.toString() !== req.user) {

      return res.status(401).json({
        message: "Not authorized"
      });

    }

    roadmap.completed = true;

    await roadmap.save();

    res.status(200).json({
      message: "Week marked as completed",
      roadmap
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server Error"
    });

  }

};


// GET PROGRESS
const getProgress = async (req, res) => {

  try {

    const roadmapWeeks = await Roadmap.find({
      goal: req.params.goalId
    });

    const totalWeeks = roadmapWeeks.length;

    const completedWeeks = roadmapWeeks.filter(
      week => week.completed
    ).length;

    const progress = totalWeeks
      ? ((completedWeeks / totalWeeks) * 100).toFixed(0)
      : 0;

    res.status(200).json({

      totalWeeks,
      completedWeeks,

      progress: `${progress}%`

    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server Error"
    });

  }

};


// GET ROADMAP WEEKS
const getRoadmapWeeks = async (req, res) => {

  try {

    const roadmapWeeks = await Roadmap.find({
      goal: req.params.goalId
    }).sort({ week: 1 });

    res.status(200).json(roadmapWeeks);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server Error"
    });

  }

};


module.exports = {
  generateRoadmap,
  markWeekCompleted,
  getProgress,
  getRoadmapWeeks
};