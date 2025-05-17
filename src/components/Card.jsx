import Input from './Input'
import Button from './Button'

export default function Card({
  imageUrl,
  productName,
  productId,
  addProduct,
  }) {
  return (
    <div>
      <img src={imageUrl} width={100} height={100}/>
      <h3>{productName}</h3>
      <label htmlFor='itemsNumber'>
        Input number of items to purchase:
        <Input type="text" placeholder="Number of items" id='itemsNumber'/>
      </label>
      <p>
        <Button text='+' id='increment'/>
        <Button text='-' id='decrement'/>
      </p>
      <Button
      text='Add to cart'
      id={`product${productId}`}
      onClick={addProduct}
      />
      </div>
  )
}