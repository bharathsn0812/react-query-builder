/* eslint-disable @typescript-eslint/no-explicit-any */
export const validateQuery = (query: object): boolean => {
    try {
      if (!query || Object.keys(query).length === 0) {
        throw Error("Query cannot be empty")
      }
  
      function hasEmptyValues(query: any): boolean {
          const checkEmpty = (value: any): boolean => {
            if (value === null || value === undefined || value === "") {
              return true
            }
            if (Array.isArray(value)) {
              if (value.length === 0) throw Error("At least one Rule should be in a group")
              return value.some(checkEmpty)
            }
            if (typeof value === "object") {  
              const checkPropertiesIfAmount = (obj: any) =>
                  "amount" in obj || "currency" in obj
  
              // if there is no either of amount or currency, then throw error
              if (checkPropertiesIfAmount(value)) {
                  const isBothPropertyPresent = (obj: any) =>
                      "amount" in obj && "currency" in obj
  
                  if (!isBothPropertyPresent(value)) {
                      throw Error("amount value is empty")
                  }
              }
            }
            if (typeof value === "object") {
              return Object.keys(value).length === 0 || Object.values(value).some(checkEmpty)
            }
            return false
          }
  
          if (typeof query !== "object" || query === null) {
            return checkEmpty(query)
          }
        
          return Object.values(query).some(checkEmpty)
      }
  
      if (hasEmptyValues(query)) {
        throw Error("Please fill in all fields")
      }
  
      return true
    } catch(e: unknown) {
      if (e instanceof Error) alert(e.message)
      return false
    }
}