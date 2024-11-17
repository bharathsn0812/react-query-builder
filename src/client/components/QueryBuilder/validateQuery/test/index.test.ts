import { describe, it, expect, vi, beforeEach } from "vitest"
import { validateQuery } from "../index"

describe("validateQuery", () => {
  // Mock alert since it"s a browser API
  const alertMock = vi.spyOn(window, "alert").mockImplementation(() => {})

  beforeEach(() => {
    alertMock.mockClear()
  })

  it("should return true for a valid query", () => {
    const validQuery = {
      combinator: "AND",
      conditions: [
        {
          fieldName: "name",
          operation: "EQUAL",
          value: "john"
        }
      ]
    }
    expect(validateQuery(validQuery)).toBe(true)
    expect(alertMock).not.toHaveBeenCalled()
  })

  it("should return true for a valid nested query", () => {
    const validNestedQuery = {
      combinator: "AND",
      conditions: [
        {
          fieldName: "name",
          operation: "EQUAL",
          value: "john"
        },
        {
          combinator: "AND",
          subConditions: [
            {
              fieldName: "id",
              operation: "EQUAL",
              value: "123"
            },
            {
              fieldName: "amount",
              operation: "EQUAL",
              value: {
                amount: 10,
                currency: "EUR"
              }
            }
          ]
        }
      ]
    }
    expect(validateQuery(validNestedQuery)).toBe(true)
    expect(alertMock).not.toHaveBeenCalled()
  })

  it("should return false for an empty query", () => {
    expect(validateQuery({})).toBe(false)
    expect(alertMock).toHaveBeenCalledWith("Query cannot be empty")
  })

  it("should return false for null or undefined query", () => {
    expect(validateQuery(null as unknown as object)).toBe(false)
    expect(validateQuery(undefined as unknown as object)).toBe(false)
    expect(alertMock).toHaveBeenCalledWith("Query cannot be empty")
  })

  it("should return false when conditions array is empty", () => {
    const emptyConditionsQuery = {
      combinator: "AND",
      conditions: []
    }
    expect(validateQuery(emptyConditionsQuery)).toBe(false)
    expect(alertMock).toHaveBeenCalledWith("At least one Rule should be in a group")
  })

  it("should return false when subConditions array is empty", () => {
    const emptySubConditionsQuery = {
      combinator: "AND",
      conditions: [
        {
          combinator: "AND",
          subConditions: []
        }
      ]
    }
    expect(validateQuery(emptySubConditionsQuery)).toBe(false)
    expect(alertMock).toHaveBeenCalledWith("At least one Rule should be in a group")
  })

  it("should return false when amount value is missing currency", () => {
    const missingCurrencyQuery = {
      combinator: "AND",
      conditions: [
        {
          fieldName: "amount",
          operation: "EQUAL",
          value: {
            amount: 10
          }
        }
      ]
    }
    expect(validateQuery(missingCurrencyQuery)).toBe(false)
    expect(alertMock).toHaveBeenCalledWith("amount value is empty")
  })

  it("should return false when amount value is missing amount", () => {
    const missingAmountQuery = {
      combinator: "AND",
      conditions: [
        {
          fieldName: "amount",
          operation: "EQUAL",
          value: {
            currency: "EUR"
          }
        }
      ]
    }
    expect(validateQuery(missingAmountQuery)).toBe(false)
    expect(alertMock).toHaveBeenCalledWith("amount value is empty")
  })

  it("should return false when any field has empty values", () => {
    const emptyFieldsQuery = {
      combinator: "AND",
      conditions: [
        {
          fieldName: "",
          operation: "EQUAL",
          value: "john"
        }
      ]
    }
    expect(validateQuery(emptyFieldsQuery)).toBe(false)
    expect(alertMock).toHaveBeenCalledWith("Please fill in all fields")
  })

  it("should return false when nested fields have empty values", () => {
    const emptyNestedFieldsQuery = {
      combinator: "AND",
      conditions: [
        {
          fieldName: "name",
          operation: "EQUAL",
          value: "john"
        },
        {
          combinator: "AND",
          subConditions: [
            {
              fieldName: "id",
              operation: "",
              value: "123"
            }
          ]
        }
      ]
    }
    expect(validateQuery(emptyNestedFieldsQuery)).toBe(false)
    expect(alertMock).toHaveBeenCalledWith("Please fill in all fields")
  })
})