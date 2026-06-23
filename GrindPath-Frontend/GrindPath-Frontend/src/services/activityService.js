import axios from "axios"

const API_URL = "http://localhost:5000/api/activity/"

export const getActivities = async () => {
  const userStr = localStorage.getItem("grindpath_user")
  const user = userStr ? JSON.parse(userStr) : null
  const config = {
    headers: { Authorization: `Bearer ${user?.token || ""}` }
  }
  const response = await axios.get(API_URL, config)
  return response.data
}

export const createActivity = async (activityData) => {
  const userStr = localStorage.getItem("grindpath_user")
  const user = userStr ? JSON.parse(userStr) : null
  const config = {
    headers: { Authorization: `Bearer ${user?.token || ""}` }
  }
  const response = await axios.post(API_URL, activityData, config)
  return response.data
}
