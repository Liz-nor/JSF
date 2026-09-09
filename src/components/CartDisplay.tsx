import { useCartStore } from './CartItem';

function CartDisplay() {
  // Select the items array from the store
  // This component will only re-render if the items array reference changes
  const items = useCartStore((state) => state.items);

  // Select actions needed for interaction
  const removeItem = useCartStore((state) => state.removeItem);
  const updateQuantity = useCartStore((state) => state.updateItemQuantity);

  if (items.length === 0) {
    return <p>Handlekurven er tom.</p>;
  }

  return (
    <div>
      <h2>Handlekurv (Zustand)</h2>
      <ul>
        {items.map((item) => {
          const itemId = item.productId || item.id;

          if (!itemId) return null;

          return (
            <li
              key={itemId}
              style={{
                margin: '10px 0',
                borderBottom: '1px solid #eee',
                paddingBottom: '5px',
              }}
            >
              <span>Produkt ID: {itemId}</span>
              <br />
              <span>Antall: {item.quantity}</span>
              {/* Add controls to update/remove */}
              <button
                onClick={() => updateQuantity(itemId, item.quantity - 1)}
                style={{ marginLeft: '10px' }}
              >
                -
              </button>
              <button
                onClick={() => updateQuantity(itemId, item.quantity + 1)}
                style={{ marginLeft: '5px' }}
              >
                +
              </button>
              <button
                onClick={() => removeItem(itemId)}
                style={{ marginLeft: '10px', color: 'red' }}
              >
                Fjern
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default CartDisplay;
