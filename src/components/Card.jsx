export default function Card({imageUrl, productName}) {
  return (
    <div>
      <img src={imageUrl} width={100} height={100}/>
      <h3>{productName}</h3>
      <label for='itemsNumber'>
        Input number of items to purchase:
        <input type="text" placeholder="Number of items" id='itemsNumber'/>
      </label>
      <p>
        <button>+</button>
        <button>-</button>
      </p>
      <button>Add to cart</button>
    </div>
  )
}