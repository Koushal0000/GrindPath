import axios from "axios"

const API = window.location.hostname === "localhost"
  ? "http://localhost:5000/api/analytics"
  : "https://grindpath.onrender.com/api/analytics"

// Returns { productivityScore, scoreBreakdown, weeklyData, focusDistribution, upcomingDeadlines, summary }
// Returns null on network failure (widgets fall back gracefully).
export const getAnalyticsData = async () => {
  const token = localStorage.getItem("token")
  try {
    const response = await axios.get(API, {
      headers: { Authorization: `Bearer ${token}` }
    })
    return response.data
  } catch {
    return null
  }
}
