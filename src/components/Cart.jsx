import NavigationBar from "./Navbar";
import { useOutletContext } from "react-router-dom";

export default function Cart() {
  const {cartProducts, setCartProducts} = useOutletContext()
  
  return (
    <div>
      <NavigationBar addedProducts={cartProducts} />
      {cartProducts.length > 0 ?
        <span>Products added</span> :
        <span>No products added to cart yet.</span>
      }
    </div>
  )
}