import Button from "./Button"

export default function AddedProduct({
  image, name, price, quantity, id, onClick
}) {
  return(
    <div>
      <img src={image} width='50' height='50' alt={`Image of ${name}`}/>
      <p>Product: {name}. Price: {price}. Quantity: {quantity}</p>
      <Button
      text='Remove product from cart'
      id={`remove${id}`}
      onClick={onClick}
      />

    </div>
  )
}