import React, { useState } from "react"
import { CombinatorType } from "./types"
import { COMBINATOR } from "./constants"

export default function CombinatorDropdown() {
  const [combinator, setCombinator] = useState(COMBINATOR[0])

  function handleLogicChange(e: React.ChangeEvent<HTMLSelectElement>): void {
    if (e.target?.value) {
      setCombinator(e.target.value as CombinatorType)
    }
  }

  return (
    <select name="combinator" onChange={handleLogicChange} value={combinator}>
      {
        COMBINATOR.map((logic) => {
          return <option value={logic}>{logic}</option>
        })
      }
    </select>
  )
}