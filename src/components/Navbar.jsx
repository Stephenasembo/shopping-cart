export default function NavigationBar({addedProducts = []}) {
  return (
    <div>
      <a href="../App.jsx">Home</a>
      <a href="./Cart.jsx">Cart</a>
      {addedProducts.length > 0 && 
        <div>
          Products added to cart: {addedProducts.length}
        </div>
      }
    </div>
  )
}