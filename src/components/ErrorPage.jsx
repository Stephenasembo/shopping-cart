import { Link } from "react-router-dom";

export default function ErrorPage() {
  return (
    <div>
      Sorry this page does not exist.
      <br />
      You can go back to the homepage by clicking <Link to='/'>here</Link>.
    </div>
  )
}