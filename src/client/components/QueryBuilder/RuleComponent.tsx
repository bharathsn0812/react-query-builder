import {
    AmountValueType,
    CurrencyType,
    FieldNameType,
    OperationType,
    RuleType,
    TransactionStateType
} from "./types"

interface RuleComponentProps {
    rule: RuleType,
    onUpdate: (updatedRule: RuleType) => void,
    onDelete: () => void
}

export default function RuleComponent({ rule, onUpdate, onDelete } : RuleComponentProps) {
    const fieldOptions: FieldNameType[] = ["amount", "name", "id", "transaction_state", "device_ip", "installments"]
    
    const getOperations = (fieldName: FieldNameType): OperationType[] => {
      switch (fieldName) {
        case "amount":
        case "installments":
          return ["EQUAL", "NOT_EQUAL", "LESS_THAN", "GREATER_THAN"]
        default:
          return ["EQUAL", "NOT_EQUAL"]
      }
    }

    function handleAmountInput(amount: string) {
      const amountValue = rule.value as AmountValueType
      const isValueObject = typeof rule.value === 'object'
      // If no currency selected, then default currency is USD
      if (!isValueObject) {
        onUpdate({ ...rule, value: { ...amountValue, amount: Number(amount), currency: "USD" } })
      } else {
        onUpdate({ ...rule, value: { ...amountValue, amount: Number(amount) } })
      }
    }
  
    const renderValueInput = () => {
      switch (rule.fieldName) {
        case "amount":
          // eslint-disable-next-line no-case-declarations
          const amountValue = rule.value as AmountValueType
          return (
            <>
              <input
                type="number"
                value={amountValue.amount}
                onChange={(e) => handleAmountInput(e.target.value)}
                className="border rounded px-2 py-1 mr-2"
              />
              <select
                value={amountValue.currency}
                onChange={(e) => onUpdate({ ...rule, value: { ...amountValue, currency: e.target.value as CurrencyType } })}
                className="border rounded px-2 py-1"
              >
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
                <option value="GBP">GBP</option>
              </select>
            </>
          )
        case "name":
        case "id":
        case "device_ip":
          return (
            <input
              type="text"
              value={rule.value as string}
              onChange={(e) => onUpdate({ ...rule, value: e.target.value })}
              className="border rounded px-2 py-1"
            />
          )
        case "transaction_state":
          return (
            <select
              value={rule.value as TransactionStateType}
              onChange={(e) => onUpdate({ ...rule, value: e.target.value as TransactionStateType })}
              className="border rounded px-2 py-1"
            >
              <option value="SUCCEEDED">SUCCEEDED</option>
              <option value="REJECTED">REJECTED</option>
              <option value="ERROR">ERROR</option>
              <option value="TIMEOUT">TIMEOUT</option>
              <option value="CANCELLED">CANCELLED</option>
              <option value="FAILED">FAILED</option>
              <option value="ABORTED">ABORTED</option>
            </select>
          )
        case "installments":
          return (
            <input
              type="number"
              value={rule.value as number}
              onChange={(e) => onUpdate({ ...rule, value: Number(e.target.value) })}
              className="border rounded px-2 py-1"
            />
          )
      }
    }
  
    return (
      <div className="flex items-center space-x-2 mb-2">
        <select
          value={rule.fieldName}
          onChange={(e) => onUpdate({ ...rule, fieldName: e.target.value as FieldNameType })}
          className="border rounded px-2 py-1"
        >
          {fieldOptions.map((field) => (
            <option key={field} value={field}>{field}</option>
          ))}
        </select>
        <select
          value={rule.operation}
          onChange={(e) => onUpdate({ ...rule, operation: e.target.value as OperationType })}
          className="border rounded px-2 py-1"
        >
          {getOperations(rule.fieldName).map((op) => (
            <option key={op} value={op}>{op}</option>
          ))}
        </select>
        {renderValueInput()}
        <button onClick={onDelete} className="bg-red-500 text-white px-2 py-1 rounded">Delete Rule</button>
      </div>
    )
  }