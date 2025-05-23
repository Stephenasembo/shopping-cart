export default function Button({text, onClick, id, className}) {
  return (
    <button className={className} id={id} onClick={onClick}>{text}</button>
  )
}
