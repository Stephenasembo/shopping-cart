import Input from './Input'
import Button from './Button'
import { useState } from 'react'

export default function Card({
  imageUrl,
  productName,
  productId,
  addProduct,
  incrementFn,
  decrementFn,
  submitFn,
  }) {
  const [quantity, setQuantity] = useState(0)

  return (
    <div>
      <img src={imageUrl} width={100} height={100}/>
      <h3>{productName}</h3>
      <form>
        <label htmlFor='itemsNumber'>
          Input number of items to purchase:
          <Input
          type="number"
          placeholder="Quantity"
          id={`input${productId}`}
          value={quantity}
          setValue={setQuantity}
          />
        </label>
        <Button
        text='Submit'
        id={`submit${productId}`}
        onClick={(e) => {
          e.preventDefault()
          submitFn(e, quantity)
        }}
        />
      </form>
      <p>
        <Button
        text='+'
        id={`increment${productId}`}
        onClick={incrementFn}
        />

        <Button
        text='-'
        id={`decrement${productId}`}
        onClick={decrementFn}
        />
      </p>
      <Button
      text='Add to cart'
      id={`product${productId}`}
      onClick={addProduct}
      />
      </div>
  )
}