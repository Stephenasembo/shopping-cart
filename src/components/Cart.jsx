import AddedProduct from "./AddedProduct";
import NavigationBar from "./Navbar";
import { useOutletContext } from "react-router-dom";

export default function Cart() {
  const {cartProducts, setCartProducts} = useOutletContext()
  
  return (
    <div>
      <NavigationBar addedProducts={cartProducts} />
      {cartProducts.size > 0 ?
        <div>
            <ul>
              {
                [...cartProducts.values()].map((value) => {
                  return (
                    <li key={value.id}>
                      <AddedProduct
                      image={value.image}
                      name={value.title}
                      price={value.price}
                      quantity={value.quantity}
                      />
                    </li>
                  )
                })
              }
            </ul>
        </div> :
        <span>No products added to cart yet.</span>
      }
    </div>
  )
}