import NavigationBar from "./Navbar";

export default function Cart() {
  return (
    <div>
      <NavigationBar addedProducts={[]} />
      No products added to cart yet.
    </div>
  )
}