import { useContext, useEffect, useState, createContext } from "react";
import { usePaymentContext } from "./Payment";
import { UserContext } from "./User";

export const CartContext = createContext();

CartContext.displayName = "Cart";

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [quantityProduct, setQuantityProduct] = useState(0);
  const [valorTotalCarrinho, setValorTotalCarrinho] = useState(0);

  return (
    <CartContext.Provider
      value={{
        cart,
        setCart,
        quantityProduct,
        setQuantityProduct,
        valorTotalCarrinho,
        setValorTotalCarrinho,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCartContext = () => {
  const {
    cart,
    setCart,
    quantityProduct,
    setQuantityProduct,
    valorTotalCarrinho,
    setValorTotalCarrinho,
  } = useContext(CartContext);

  const { formaPagamento } = usePaymentContext();
  const { setSaldo } = useContext(UserContext);

  function efetuarCompra() {
    setCart([]);
    setSaldo((saldoAtual) => saldoAtual - valorTotalCarrinho);
  }

  function removeFromCart(id) {
    const product = cart.find((itemInCart) => itemInCart.id === id);
    const isLastProduct = product.quantidade === 1;
    if (isLastProduct) {
      return setCart((prevCart) =>
        prevCart.filter((itemInCart) => itemInCart.id !== id)
      );
    }
    setCart((prevCart) =>
      prevCart.map((itemInCart) => {
        if (itemInCart.id === id) {
          itemInCart.quantidade -= 1;
        }
        return itemInCart;
      })
    );
  }

  function addToCart(newProduct) {
    const hasProduct = cart.some(
      (itemInCart) => itemInCart.id === newProduct.id
    );
    if (!hasProduct) {
      newProduct.quantidade = 1;
      return setCart((prevCart) => [...prevCart, newProduct]);
    }
    return setCart((prevCart) =>
      prevCart.map((itemInCart) => {
        if (itemInCart.id === newProduct.id) {
          itemInCart.quantidade += 1;
        }
        return itemInCart;
      })
    );
  }

  useEffect(() => {
    const { newTotal, newQuantity } = cart.reduce(
      (counter, product) => ({
        newQuantity: counter + product.quantidade,
        newTotal: counter.newTotal + product.valor * product.quantidade,
      }),
      {
        newQuantity: 0,
        newTotal: 0,
      }
    );
    setQuantityProduct(newQuantity);
    setValorTotalCarrinho(newTotal * formaPagamento.juros);
  }, [cart, setQuantityProduct, setValorTotalCarrinho, formaPagamento]);
  return {
    cart,
    setCart,
    addToCart,
    removeFromCart,
    quantityProduct,
    setQuantityProduct,
    valorTotalCarrinho,
    setValorTotalCarrinho,
    efetuarCompra,
  };
};
