import axios from "axios"

const API = "http://localhost:5000/api/goals"

export const createGoal = async (goalData) => {

  const token = localStorage.getItem("token")

  const response = await axios.post(
    API,
    goalData,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  )

  return response.data
}

export const getGoals = async () => {

  const token = localStorage.getItem("token")

  const response = await axios.get(
    API,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  )

  return response.data
}

export const deleteGoal = async (goalId) => {

  const token = localStorage.getItem("token")

  const response = await axios.delete(
    `${API}/${goalId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  )

  return response.data
}

export const updateGoal = async (goalId, goalData) => {

  const token = localStorage.getItem("token")

  const response = await axios.put(
    `${API}/${goalId}`,
    goalData,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  )

  return response.data
}