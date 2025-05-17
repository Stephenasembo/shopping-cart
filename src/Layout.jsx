import { useState } from "react";
import { Outlet } from "react-router-dom";

export default function Layout(){
  const [cartProducts, setCartProducts] = useState(new Set())

  return(
    <Outlet context={{cartProducts, setCartProducts}}/>
  )
}