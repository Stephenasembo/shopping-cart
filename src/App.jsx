import { useEffect, useState } from "react";

function App() {
  const [productDetails, setProductDetails] = useState([])
  console.log(productDetails)
  useEffect(() => {
    (async () => {
      let productResponse = await fetch('https://fakestoreapi.com/products', { mode: 'cors' })
      if (productResponse.status === 200) {
        let products = await productResponse.json();
        setProductDetails(products)
      }
    })()
  }, [])

  return (
    <div>
      {productDetails.length > 0 && 
      <ul>
        {productDetails.map((product) => <li key={product.id}>{product.title}</li>)}
      </ul>}
    </div>
  )
}

export default App;
