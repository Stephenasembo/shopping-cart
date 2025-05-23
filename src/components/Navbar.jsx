import { Link } from "react-router-dom"
import styles from '../styles/Navigation.module.css'

export default function NavigationBar({addedProducts = new Set()}) {
  return (
    <div className={styles.navigation}>
      <div className={styles.links}>
        <Link to="/">Home</Link>
        <Link to="/cart">Cart</Link>
      </div>
      {addedProducts.size > 0 && 
        <div className={styles.cartProducts}>
          Products added to cart: {addedProducts.size}
        </div>
      }
    </div>
  )
}