import { useCartStore } from '../components/CartItem';

function CartSummary() {
  // Select the items array - this component needs it for calculation
  const items = useCartStore((state) => state.items);

  // Calculate derived state: Total number of items
  // We use reduce to sum up the quantities of all items in the cart
  const totalItems = items.reduce((total, item) => total + item.quantity, 0);

  // (Calculating total price would require access to product price data,
  // which might come from another store, props, or be fetched.
  // For simplicity, we'll just show total quantity here.)
  // const totalPrice = items.reduce((total, item) => {
  //     const productPrice = getProductPrice(item.productId); // Assume this function exists
  //     return total + (item.quantity * productPrice);
  // }, 0);

  return (
    <div
      style={{
        marginTop: '20px',
        borderTop: '2px solid black',
        paddingTop: '10px',
      }}
    >
      <h3>Oppsummering</h3>
      <p>
        Totalt antall varer i kurven: <strong>{totalItems}</strong>
      </p>
      {/* <p>Total pris: <strong>{totalPrice} NOK</strong></p> */}
    </div>
  );
}

export default CartSummary;
