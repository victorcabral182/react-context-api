import { useContext } from "react"
import { useState } from "react"
import { createContext } from "react"

export const CartContext = createContext()

CartContext.displayName = "Cart"

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([])
  return (
    <CartContext.Provider value={{ cart, setCart }}>
      {children}
    </CartContext.Provider>
  )
}

export const useCartContext = () => {
  const { cart, setCart } = useContext(CartContext)

  function addToCart(newProduct) {
    const hasProduct = cart.some(
      (itemInCart) => itemInCart.id === newProduct.id
    )
    if (!hasProduct) {
      newProduct.quantidade = 1
      return setCart((prevCart) => [...prevCart, newProduct])
    }
    return setCart((prevCart) =>
      prevCart.map((itemInCart) => {
        if (itemInCart.id === newProduct.id) {
          itemInCart.quantidade += 1
          return itemInCart
        }
      })
    )
  }

  return {
    cart,
    setCart,
    addToCart,
  }
}
