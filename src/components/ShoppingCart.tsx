import { Offcanvas, Stack } from "react-bootstrap";
import { useShoppingCart } from "../context/ShoppingCartContext";
import { CartItems } from "../components/CartItems"
import storeItems from "../data/items.json"
import { formatCurrency } from "../utilities/formatCurrency";

type ShoppingCartProps = {
  isOpen: boolean
}

export function ShoppingCart( {isOpen}: ShoppingCartProps ) {
  const { closeCart, cartItems } = useShoppingCart()
  return <Offcanvas show={isOpen} onHide={closeCart} placement="end">
    <Offcanvas.Header closeButton>
      <Offcanvas.Title>
        Cart
      </Offcanvas.Title>
    </Offcanvas.Header>
    <Offcanvas.Body>
      <Stack gap={3}>
        {cartItems.map(item => (
          <CartItems key={item.id} {...item} />
        ))}
        <div className="ms-auto fw-blod fs-5">
          Total {formatCurrency(cartItems.reduce((total, cartItems) => {
            const item = storeItems.find(i => i.id === cartItems.id)
            return total + (item?.price || 0) * cartItems.quantity
          }, 0
          ))}
        </div>
      </Stack>
    </Offcanvas.Body>
  </Offcanvas>
}