import axios from "axios"

const API = window.location.hostname === "localhost" 
  ? "http://localhost:5000/api/roadmaps" 
  : "https://grindpath.onrender.com/api/roadmaps"

// Generate roadmap — now accepts an optional body with { domain, skillLevel, hoursPerDay }
// Falls back gracefully to goal defaults on the backend when body is empty.
export const generateRoadmap = async (goalId, body = {}) => {
  const token = localStorage.getItem("token")
  const response = await axios.post(
    `${API}/${goalId}`,
    body,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  )
  return response.data
}

export const markWeekCompleted = async (weekId) => {
  const token = localStorage.getItem("token")
  const response = await axios.put(
    `${API}/${weekId}/complete`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  )
  return response.data
}

export const getProgress = async (goalId) => {
  const token = localStorage.getItem("token")
  const response = await axios.get(
    `${API}/${goalId}/progress`,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  )
  return response.data
}

export const getRoadmapWeeks = async (goalId) => {
  const token = localStorage.getItem("token")
  const response = await axios.get(
    `${API}/${goalId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  )
  return response.data
}

// Fetch persisted roadmap metadata (domain, skillLevel, hoursPerDay, estimatedDuration)
// Returns null if no roadmap has been generated yet (404 is caught gracefully).
export const getRoadmapMeta = async (goalId) => {
  const token = localStorage.getItem("token")
  try {
    const response = await axios.get(
      `${API}/${goalId}/meta`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )
    return response.data
  } catch {
    // 404 = no meta yet, which is valid (roadmap not generated)
    return null
  }
}

