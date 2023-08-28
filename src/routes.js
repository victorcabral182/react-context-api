import { BrowserRouter, Switch, Route } from "react-router-dom"
import Carrinho from "pages/Carrinho"
import Feira from "pages/Feira"
import Login from "pages/Login"
import { UserProvider } from "common/context/User"
import { CartProvider } from "common/context/Cart"

function Router() {
  return (
    <BrowserRouter>
      <Switch>
        <UserProvider>
          <Route exact path="/">
            <Login />
          </Route>
          <Route path="/feira">
            <CartProvider>
              <Feira />
            </CartProvider>
          </Route>
          <Route path="/carrinho">
            <Carrinho />
          </Route>
        </UserProvider>
      </Switch>
    </BrowserRouter>
  )
}

export default Router
