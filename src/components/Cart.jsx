import AddedProduct from "./AddedProduct";
import NavigationBar from "./Navbar";
import { useOutletContext } from "react-router-dom";

export default function Cart() {
  const {cartProducts, setCartProducts} = useOutletContext()
  
  function removeProduct(e) {
    let btnId = ((e.currentTarget.id).split('remove'))[1]
    let newCart = new Map([...cartProducts])
    newCart.delete(btnId)
    setCartProducts(newCart)
  }

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
                      id={value.id}
                      onClick={(e) => removeProduct(e)}
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