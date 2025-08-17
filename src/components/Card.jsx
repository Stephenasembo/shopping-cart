import Input from './Input'
import Button from './Button'
import { useState } from 'react'
import styles from '../styles/Card.module.css'

export default function Card({
  imageUrl,
  productName,
  productId,
  addProduct,
  incrementFn,
  decrementFn,
  }) {
  const [quantity, setQuantity] = useState(0)

  return (
    <div className={styles.card}>
      <div>
        <img src={imageUrl} width={100} height={100}/>
      </div>
      <div>
        <h3>{productName}</h3>
        <form>
          <label htmlFor='itemsNumber'>
            Quantity:
            <Input
            type="number"
            placeholder="Quantity"
            id={`input${productId}`}
            value={quantity}
            setValue={setQuantity}
            />
          </label>
        </form>
        <p className={styles.adjustQuantity}>
        <Button
          text='Add to cart'
          id={`product${productId}`}
          onClick={(e) => {
            addProduct(e, quantity)
            setQuantity(0);
          }}
          />
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
      </div>
    </div>
  )
}