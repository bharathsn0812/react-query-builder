import {
    RuleGroupType,
    RuleType,
    CombinatorType
} from "./types"
import RuleComponent from "./RuleComponent"

interface RuleGroupComponentProps {
    group: RuleGroupType,
    onUpdate: (updatedGroup: RuleGroupType) => void,
    onDelete?: () => void
}

export default function RuleGroupComponent({ group, onUpdate, onDelete } : RuleGroupComponentProps){
    const addRule = () => {
      const newRule: RuleType = {
        fieldName: "name",
        operation: "EQUAL",
        value: "",
      }
      onUpdate({
        ...group,
        subConditions: [...group.subConditions, newRule],
      })
    }
  
    const addGroup = () => {
      const newGroup: RuleGroupType = {
        combinator: "AND",
        subConditions: [],
      }
      onUpdate({
        ...group,
        subConditions: [...group.subConditions, newGroup],
      })
    }
  
    const updateCondition = (index: number, updatedCondition: RuleType | RuleGroupType) => {
      const newConditions = [...group.subConditions]
      newConditions[index] = updatedCondition
      onUpdate({ ...group, subConditions: newConditions })
    }
  
    const deleteCondition = (index: number) => {
      const newConditions = group.subConditions.filter((_, i) => i !== index)
      onUpdate({ ...group, subConditions: newConditions })
    }
  
    return (
      <div className="border border-gray-300 rounded p-4 mb-4">
        <select
          value={group.combinator}
          onChange={(e) => onUpdate({ ...group, combinator: e.target.value as CombinatorType })}
          className="border rounded px-2 py-1 mb-2"
        >
          <option value="AND">AND</option>
          <option value="OR">OR</option>
        </select>
        {group.subConditions.map((condition, index) => (
          <div key={index} className="ml-4">
            {"fieldName" in condition ? (
              <RuleComponent
                rule={condition}
                onUpdate={(updatedRule) => updateCondition(index, updatedRule)}
                onDelete={() => deleteCondition(index)}
              />
            ) : (
              <RuleGroupComponent
                group={condition}
                onUpdate={(updatedGroup) => updateCondition(index, updatedGroup)}
                onDelete={() => deleteCondition(index)}
              />
            )}
          </div>
        ))}
        <div className="mt-2 space-x-2">
          <button onClick={addRule} className="bg-blue-500 text-white px-2 py-1 rounded">Add Rule</button>
          <button onClick={addGroup} className="bg-green-500 text-white px-2 py-1 rounded">Add Group</button>
          {onDelete && <button onClick={onDelete} className="bg-red-500 text-white px-2 py-1 rounded">Delete Group</button>}
        </div>
      </div>
    )
  }