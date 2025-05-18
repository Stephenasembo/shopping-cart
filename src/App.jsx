import { useEffect, useState } from "react";
import Card from "./components/Card";
import NavigationBar from "./components/Navbar";
import { useOutletContext } from "react-router-dom";

function App() {
  const [productDetails, setProductDetails] = useState([])
  const [loading, setLoading] = useState(true)
  const [dataAvailable, setDataAvailable] = useState(false)
  const [error, setError] = useState(false)
  const {cartProducts, setCartProducts} = useOutletContext()

  async function fetchData() {
    try{
      setLoading(true)
      setError(false)
      let productResponse = await fetch('https://fakestoreapi.com/products', { mode: 'cors' })
      if (productResponse.status === 200) {
        let products = await productResponse.json();
        setProductDetails(products)
        setDataAvailable(true)
      } else {
          throw new Error('An error occurred')
      }
    }
    catch {
      setError(true)
    }
    finally {
      setLoading(false)
    }
  }

  function addToCart(e, productId = null) {
    let btnId;

    if(!e) {
      btnId = productId
    } else{
      btnId = ((e.currentTarget.id).split('product'))[1]
    }

    let selectedProduct = productDetails.find((product) => {
      return product.id === Number(btnId)
    })
    let newProducts = new Map([...cartProducts])
    newProducts.set(btnId, selectedProduct)
    setCartProducts(newProducts)
  }

  function increaseQuantity(e) {
    let btnId = ((e.currentTarget.id).split('increment'))[1]
    if(cartProducts.has(btnId)) {
      let newCart = new Map([...cartProducts])
      let selectedProduct = newCart.get(btnId)
      let updatedProduct = {
        ...selectedProduct,
        quantity: selectedProduct.quantity + 1
      }
      newCart.set(btnId, updatedProduct)
      setCartProducts(newCart)
    } else {
      addToCart(null, btnId)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <div>
      <NavigationBar addedProducts={cartProducts}/>
      {
        loading &&
        <div>
          Hang tight while we fetch the latest products.
        </div>
      }
      {
        dataAvailable &&
        <ul>
          {productDetails.map((product) => (
            <li
            key={product.id}>
              <Card
              imageUrl={product.image}
              productName={product.title}
              productId={product.id}
              addProduct={(e) => {addToCart(e)}}
              incrementFn={(e) => increaseQuantity(e)}
              />
            </li>
            ))}
        </ul>
      }
      {
        error &&
        <div>
          <p>
            Oops! An error occured while fetching products.
          </p>
          <Button
          text='Retry fetching products'
          onClick={fetchData}/>
        </div>
      }
    </div>
  )
}

export default App;
