import Button from "./Button";
import styles from '../styles/AddedProduct.module.css';

export default function AddedProduct({
  image, name, price, quantity, id, onClick
}) {
  return(
    <div className={styles.product}>
      <div>
        <img src={image} width='50' height='50' alt={`Image of ${name}`}/>
        <Button
        text='Remove item'
        id={`remove${id}`}
        onClick={onClick}
        />
      </div>
      <p>
        <span><b>Product:</b> {name}.</span>
        <span><b>Price:</b> {price}.</span>
        <span><b>Quantity:</b> {quantity}</span>
      </p>
    </div>
  )
}