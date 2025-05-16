import { useEffect, useState } from "react";

function App() {
  const [productDetails, setProductDetails] = useState([])
  const [loading, setLoading] = useState(true)
  const [dataAvailable, setDataAvailable] = useState(false)
  const [error, setError] = useState(false)

  useEffect(() => {
    (async () => {
      let productResponse = await fetch('https://fakestoreapi.com/products', { mode: 'cors' })
      if (productResponse.status === 200) {
        let products = await productResponse.json();
        setProductDetails(products)
        setLoading(false)
        setDataAvailable(true)
      } else {
        setError(true)
      }
    })()
  }, [])

  return (
    <div>
      {
        loading &&
        <div>
          Hang tight while we fetch the latest products.
        </div>
      }
      {
        dataAvailable &&
        <ul>
          {productDetails.map((product) => <li key={product.id}>{product.title}</li>)}
        </ul>
      }
      {
        error &&
        <div>
          Oops! An error occured while fetching products.
        </div>
      }
    </div>
  )
}

export default App;
