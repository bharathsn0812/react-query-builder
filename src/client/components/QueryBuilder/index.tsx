import { useState } from "react"
import { QueryStructureType } from "./types"
import RuleGroupComponent from "./RuleGroupComponent"

interface QueryBuilderProps {
  handleClick: (query: QueryStructureType) => void
}

export default function QueryBuilder({ handleClick }: QueryBuilderProps) {
  const [query, setQuery] = useState<QueryStructureType>({
    combinator: "AND",
    conditions: [],
  })
  const [jsonOutput, setJsonOutput] = useState<string>("")

  async function handleSubmit() {
    setJsonOutput(JSON.stringify(query, null, 2))
    try {
      handleClick(query)
    } catch (error) {
      console.error("Error sending query to server:", error)
    }
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Query Builder</h1>
      <RuleGroupComponent
        group={{ combinator: query.combinator, subConditions: query.conditions }}
        onUpdate={(updatedGroup) => setQuery({ ...query, combinator: updatedGroup.combinator, conditions: updatedGroup.subConditions })}
      />
      <button onClick={handleSubmit} className="bg-purple-500 text-white px-4 py-2 rounded mt-4">Submit</button>
      {jsonOutput && (
        <div className="mt-4">
          <h2 className="text-xl font-semibold mb-2">JSON Output:</h2>
          <pre className="bg-gray-100 p-4 rounded overflow-x-auto">{jsonOutput}</pre>
        </div>
      )}
    </div>
  )
}