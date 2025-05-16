import { useState } from "react"

export default function Input({type, placeholder, id}) {
  const [value, setValue] = useState('')

  return (
    <input 
    type={type}
    placeholder={placeholder}
    id={id}
    value={value}
    onChange={(e) => setValue(e.target.value)}
    />
  )
}