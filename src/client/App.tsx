import axios from "axios";
import QueryBuilder from "./components/query_builder/QueryBuilder"

function App() {
  const handleClick = async () => {
    try {
      await axios.post("/api/save-rules", {});
      alert("Submitted");
    } catch {
      alert("Error");
    }
  };

  return (
    <div>
      <h1>Query Builder</h1>
      <form>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          type="button"
          onClick={handleClick}>
          Submit
        </button>

        <QueryBuilder />

        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          type="button"
          onClick={handleClick}>
          Cancel
        </button>
      </form>
    </div>
  );
}

export default App;
