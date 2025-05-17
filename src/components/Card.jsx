import Input from './Input'
import Button from './Button'

export default function Card({imageUrl, productName}) {
  return (
    <div>
      <img src={imageUrl} width={100} height={100}/>
      <h3>{productName}</h3>
      <label htmlFor='itemsNumber'>
        Input number of items to purchase:
        <Input type="text" placeholder="Number of items" id='itemsNumber'/>
      </label>
      <p>
        <Button text='+'/>
        <Button text='-'/>
      </p>
      <Button text='Add to cart'/>
      </div>
  )
}