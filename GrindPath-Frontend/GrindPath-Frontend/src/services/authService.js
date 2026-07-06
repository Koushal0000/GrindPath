import axios from "axios"

const API = window.location.hostname === "localhost" 
  ? "http://localhost:5000/api/users" 
  : "https://grindpath.onrender.com/api/users"

export const registerUser = async (userData) => {
  const response = await axios.post(`${API}/register`, userData)

  return response.data
}

export const loginUser = async (userData) => {
  const response = await axios.post(`${API}/login`, userData)

  return response.data
}

export const getProfile = async () => {
  const token = localStorage.getItem("token")
  const response = await axios.get(`${API}/me`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })

  return response.data
}