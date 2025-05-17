import { useEffect, useState } from "react";
import {RetryBtn} from './components/Button'
import Card from "./components/Card";
import NavigationBar from "./components/Navbar";

function App() {
  const [productDetails, setProductDetails] = useState([])
  const [loading, setLoading] = useState(true)
  const [dataAvailable, setDataAvailable] = useState(false)
  const [error, setError] = useState(false)

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

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <div>
      <NavigationBar addedProducts={[]}/>
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
