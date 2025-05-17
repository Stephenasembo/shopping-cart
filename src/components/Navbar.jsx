import { Link } from "react-router-dom"

export default function NavigationBar({addedProducts = new Set()}) {
  return (
    <div>
      <Link to="/">Home</Link>
      <Link to="/cart">Cart</Link>
      {addedProducts.size > 0 && 
        <div>
          Products added to cart: {addedProducts.size}
        </div>
      }
    </div>
  )
}