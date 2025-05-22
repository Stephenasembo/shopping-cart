export default function Input({type, placeholder, id, value, setValue}) {

  return type === 'number' ?
    (
    <input 
    type={type}
    placeholder={placeholder}
    id={id}
    value={value ? value : 'Quantity'}
    onChange={(e) => setValue(e.target.value)}
    min={1}
    step={1}
    />
    ):
    (
      <input
      type={type}
      placeholder={placeholder}
      id={id}
      value={value}
      onChange={(e) => setValue(e.target.value)}  
      />
    )
}