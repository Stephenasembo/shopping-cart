import { useEffect, useState } from "react";
import Card from "./components/Card";
import NavigationBar from "./components/Navbar";
import { useOutletContext } from "react-router-dom";
import Button from "./components/Button";
import styles from './styles/App.module.css';

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
    selectedProduct.quantity = 1
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

  function decreaseQuantity(e) {
    let btnId = ((e.currentTarget.id).split('decrement'))[1]
    if(cartProducts.has(btnId)) {
      let initialQuantity = (cartProducts.get(btnId)).quantity
      let newCart = new Map([...cartProducts])

      if(initialQuantity === 1) {
        newCart.delete(btnId)
        setCartProducts(newCart)
      } else {
        let selectedProduct = newCart.get(btnId)
        let updatedProduct = {
          ...selectedProduct,
          quantity: selectedProduct.quantity - 1
        }
        newCart.set(btnId, updatedProduct)
        setCartProducts(newCart)
      }
    }
  }

  function submitQuantity(e, inputVal) {
    let value = Number(inputVal)
    let productId = ((e.currentTarget.id).split('product'))[1]
    if(value === 1) {
      addToCart(null, productId)
    } else if(value > 1) {
        if(cartProducts.has(productId)) {
          let newCart = new Map([...cartProducts])
          let selectedProduct = newCart.get(productId)
          let updatedProduct = {
            ...selectedProduct,
            quantity: value
          }
          newCart.set(productId, updatedProduct)
          setCartProducts(newCart)  
        } else {
          let product = productDetails.find((item) => Number(productId) === item.id)
          let newCart = new Map([...cartProducts])
          let updatedProduct = {...product, quantity: value}
          newCart.set(productId, updatedProduct)
          setCartProducts(newCart)
        }
    }
  }

  function addProduct(e, inputVal) {
    if (inputVal !== 0) {
      submitQuantity(e, inputVal)
    } else {
      addToCart(e, null)
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
        <ul className={styles.products}>
          {productDetails.map((product) => (
            <li
            key={product.id}>
              <Card
              imageUrl={product.image}
              productName={product.title}
              productId={product.id}
              addProduct={addProduct}
              incrementFn={(e) => increaseQuantity(e)}
              decrementFn={(e) => decreaseQuantity(e)}
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
          className={styles.retryBtn}
          text='Retry fetching products'
          onClick={fetchData}/>
        </div>
      }
    </div>
  )
}

export default App;
