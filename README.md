# GrindPath 🚀

### Smart Learning Roadmap & Productivity Platform

GrindPath is a full-stack MERN application designed to help users turn their learning goals into structured roadmaps, stay consistent, track progress, and understand their productivity through meaningful analytics.

It combines goal management, personalized roadmap generation, progress tracking, productivity analytics, streaks, and an AI-powered mentor into a single learning platform.

---

## ✨ Features

### 🎯 Goal Management
- Create and manage learning goals
- Track goal progress and completion
- Organize goals based on learning priorities

### 🗺️ Smart Roadmaps
- Generate structured learning roadmaps
- Break larger goals into manageable milestones
- Track progress throughout the roadmap

### 📊 Progress & Analytics
- Visualize learning and productivity progress
- Track completed goals and activities
- View productivity statistics and analytics
- Monitor focus and learning patterns

### 🔥 Streak & Consistency Tracking
- Track daily learning consistency
- Maintain productivity streaks
- Encourage long-term learning habits

### 🤖 AI Mentor
- AI-powered learning assistance
- Ask questions related to learning and goals
- Get guidance while progressing through your roadmap
- Receive contextual learning support

### 🔐 Authentication & Security
- User registration and login
- JWT-based authentication
- Protected routes and APIs
- User-specific data management

### 📱 Responsive Interface
- Modern dark SaaS-style interface
- Responsive design for different screen sizes
- Clean dashboard and productivity-focused UI

---

## 🛠️ Tech Stack

### Frontend
- React.js
- Vite
- Tailwind CSS
- JavaScript
- React Router

### Backend
- Node.js
- Express.js
- REST APIs
- JWT Authentication

### Database
- MongoDB
- Mongoose

### AI
- Google Gemini API

### Tools & Services
- Git & GitHub
- Vercel
- Postman / Thunder Client

---

## 🏗️ Architecture

```text
                 ┌──────────────────────┐
                 │      GrindPath       │
                 │    React + Vite      │
                 │    Tailwind CSS      │
                 └──────────┬───────────┘
                            │
                            │ REST APIs
                            ▼
                 ┌──────────────────────┐
                 │    Node.js + Express │
                 │      Backend API     │
                 └───────┬───────┬──────┘
                         │       │
              ┌──────────┘       └──────────┐
              ▼                             ▼
      ┌────────────────┐           ┌────────────────┐
      │    MongoDB     │           │   Gemini AI    │
      │   Application  │           │  AI Mentor     │
      │      Data      │           │                │
      └────────────────┘           └────────────────┘
🌐 Live Demo
