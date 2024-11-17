export type CombinatorType = "AND" | "OR"

export type FieldNameType = "amount" | "name" | "id" | "transaction_state" | "device_ip" | "installments"

export type OperationType = "EQUAL" | "NOT_EQUAL" | "LESS_THAN" | "GREATER_THAN"

export type CurrencyType = "USD" | "EUR" | "GBP"

export type TransactionStateType = "SUCCEEDED" | "REJECTED" | "ERROR" | "TIMEOUT" | "CANCELLED" | "FAILED" | "ABORTED"

export interface AmountValueType {
  amount: number,
  currency: CurrencyType
}

export type RuleValue = string | number | AmountValueType | TransactionStateType

export interface RuleType {
  fieldName: FieldNameType,
  operation: OperationType,
  value: RuleValue
}

export interface RuleGroupType {
  combinator: CombinatorType,
  subConditions: (RuleType | RuleGroupType)[]
}

export interface QueryStructureType {
  combinator: CombinatorType,
  conditions: (RuleType | RuleGroupType)[]
}