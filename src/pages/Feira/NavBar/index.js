import { Nav } from "./styles"
import { ReactComponent as Logo } from "assets/logo.svg"
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart"
import IconButton from "@material-ui/core/IconButton"
import Badge from "@material-ui/core/Badge"
import { useCartContext } from "common/context/Cart"
import { useHistory } from "react-router-dom/cjs/react-router-dom.min"

export default function NavBar() {
  const { quantityProduct } = useCartContext()
  const history = useHistory()
  return (
    <Nav>
      <Logo />
      <IconButton
        disabled={quantityProduct === 0}
        onClick={() => history.push("/carrinho")}
      >
        <Badge color="primary" badgeContent={quantityProduct}>
          <ShoppingCartIcon />
        </Badge>
      </IconButton>
    </Nav>
  )
}
