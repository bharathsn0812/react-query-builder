import axios from "axios"
import QueryBuilder from "./components/QueryBuilder"
import { validateQuery } from "./components/QueryBuilder/validateQuery"

function App() {
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
