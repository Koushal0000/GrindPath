import axios from "axios"

const API_URL = window.location.hostname === "localhost" 
  ? "http://localhost:5000/api/activity" 
  : "https://grindpath.onrender.com/api/activity"

export const getActivities = async () => {
  const token = localStorage.getItem("token")

  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }

  const response = await axios.get(API_URL, config)
  return response.data
}

export const createActivity = async (activityData) => {
  const token = localStorage.getItem("token")

  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }

  const response = await axios.post(API_URL, activityData, config)
  return response.data
}