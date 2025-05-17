import { useState } from "react";
import { Outlet } from "react-router-dom";

export default function Layout(){
  const [cartProducts, setCartProducts] = useState([])

  return(
    <Outlet context={{cartProducts, setCartProducts}}/>
  )
}