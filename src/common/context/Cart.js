import { useContext, useEffect, useState, createContext } from "react"

export const CartContext = createContext()

CartContext.displayName = "Cart"

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([])
  const [quantityProduct, setQuantityProduct] = useState(0)
  return (
    <CartContext.Provider
      value={{ cart, setCart, quantityProduct, setQuantityProduct }}
    >
      {children}
    </CartContext.Provider>
  )
}

export const useCartContext = () => {
  const { cart, setCart, quantityProduct, setQuantityProduct } =
    useContext(CartContext)

  function removeFromCart(id) {
    const product = cart.find((itemInCart) => itemInCart.id === id)
    const isLastProduct = product.quantidade === 1
    if (isLastProduct) {
      return setCart((prevCart) =>
        prevCart.filter((itemInCart) => itemInCart.id !== id)
      )
    }
    setCart((prevCart) =>
      prevCart.map((itemInCart) => {
        if (itemInCart.id === id) {
          itemInCart.quantidade -= 1
        }
        return itemInCart
      })
    )
  }

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
        }
        return itemInCart
      })
    )
  }

  useEffect(() => {
    const newQuantity = cart.reduce(
      (counter, product) => counter + product.quantidade,
      0
    )
    setQuantityProduct(newQuantity)
  }, [cart, setQuantityProduct])

  return {
    cart,
    setCart,
    addToCart,
    removeFromCart,
    quantityProduct,
  }
}
