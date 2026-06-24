import axios from "axios"

const API = "https://grindpath.onrender.com/api/roadmaps"

export const generateRoadmap = async (goalId) => {
  const token = localStorage.getItem("token")
  const response = await axios.post(
    `${API}/${goalId}`,
    {},
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
