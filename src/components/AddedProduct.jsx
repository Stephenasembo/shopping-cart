export default function AddedProduct({
  image, name, price, quantity
}) {
  return(
    <div>
      <img src={image} width='50' height='50' alt={`Image of ${name}`}/>
      <p>Product: {name}. Price: {price}. Quantity: {quantity}</p>
    </div>
  )
}