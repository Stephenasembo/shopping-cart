import { useState } from "react";
import { Outlet } from "react-router-dom";

export default function Layout(){
  const [cartProducts, setCartProducts] = useState(new Map())

  return(
    <Outlet context={{cartProducts, setCartProducts}}/>
  )
}