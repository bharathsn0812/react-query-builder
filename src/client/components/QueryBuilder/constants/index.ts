import { CombinatorType, FieldNameType, FieldType, OperationType } from "../types"

export const COMBINATOR: CombinatorType[] = ["AND", "OR"]

export const FIELDS: FieldNameType[] = [
    { name: "Amount", type: "number", backendValue: "amount" },
    { name: "Name", type: "text", backendValue: "name" },
    { name: "ID", type: "text", backendValue: "id" },
    {
      name: "Transaction State", 
      type: "text",
      backendValue: "transaction_state",
      options: ["SUCCEEDED", "REJECTED", "ERROR", "TIMEOUT", "CANCELLED", "FAILED", "ABORTED"]
    },
    { name: "Device IP", type: "text", backendValue: "device_ip" },
    { name: "Installments", type: "number", backendValue: "installments" }
]

export const OPERATIONS: Record<FieldType, OperationType[]> = {
  text: [
    { label: 'Equal', value: 'EQUAL' },
    { label: 'Not Equal', value: 'NOT_EQUAL' }
  ],
  number: [
    { label: 'Equal', value: 'EQUAL' },
    { label: 'Not Equal', value: 'NOT_EQUAL' },
    { label: 'Less Than', value: 'LESS_THAN' },
    { label: 'Greater Than', value: 'GREATER_THAN' }
  ]
}

export const CURRENCIES = ['USD', 'EUR', 'GBP', 'AUD', 'CAD']