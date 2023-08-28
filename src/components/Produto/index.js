import { Container } from "./styles"
import { memo } from "react"
import { IconButton } from "@material-ui/core"
import AddIcon from "@material-ui/icons/Add"
import RemoveIcon from "@material-ui/icons/Remove"
import { useCartContext } from "../../common/context/Cart"

function Produto({ nome, foto, id, valor, unidade }) {
  const { cart, addToCart, removeFromCart } = useCartContext()
  const productInCart = cart.find((itemIncart) => itemIncart.id === id)

  return (
    <Container>
      <div>
        <img src={`/assets/${foto}.png`} alt={`foto de ${nome}`} />
        <p>
          {nome} - R$ {valor?.toFixed(2)} <span>Kg</span>
        </p>
      </div>
      <div>
        <IconButton
          onClick={() => removeFromCart(id)}
          color="secondary"
          disabled={!productInCart}
        >
          <RemoveIcon />
        </IconButton>
        {productInCart?.quantidade || 0}
        <IconButton
          onClick={() => addToCart({ nome, foto, id, valor })}
          color="primary"
        >
          <AddIcon />
        </IconButton>
      </div>
    </Container>
  )
}

export default memo(Produto)
