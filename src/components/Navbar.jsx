import { Link } from "react-router-dom"

export default function NavigationBar({addedProducts = []}) {
  return (
    <div>
      <Link to="/">Home</Link>
      <Link to="/cart">Cart</Link>
      {addedProducts.length > 0 && 
        <div>
          Products added to cart: {addedProducts.length}
        </div>
      }
    </div>
  )
}