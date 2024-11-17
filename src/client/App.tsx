import axios from "axios"
import QueryBuilder from "./components/QueryBuilder"

function App() {
  const validateQuery = (query: object): boolean => {
    if (!query || Object.keys(query).length === 0) {
      alert("Query cannot be empty")
      return false
    }

    const hasEmptyValues = Object.values(query).some(
      value =>
        value === null ||
        value === undefined ||
        value === "" ||
        (Array.isArray(value) && value.length === 0) ||
        (typeof value === "object" && Object.keys(value).length === 0)
    )

    if (hasEmptyValues) {
      alert("Please fill in all fields")
      return false
    }

    return true
  }

  const handleClick = async (query: object) => {
    try {
      if (!validateQuery(query)) {
        return
      }

      await axios.post("/api/save-rules", query)
      alert("Submitted")
    } catch {
      alert("Error");
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 py-6">
      <QueryBuilder handleClick={handleClick} />
    </div>
  )
}

export default App
