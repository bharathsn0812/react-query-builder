export type CombinatorType = "AND" | "OR"

export type FieldType = "text" | "number"

export type RuleType = {
    fieldName: string,
    operation: string,
    value: string | number | object
}

export type RuleGroupType = {
    combinator: CombinatorType,
    conditions?: RuleType[],
    subConditions?: RuleGroupType[]
}

export type FieldNameType = {
    name: string,
    type: FieldType,
    backendValue: string,
    options?: string[]
}

export type OperationType = {
    label: string,
    value: string
}