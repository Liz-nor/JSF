import { useCartStore } from '../components/CartItem';

function ProductAdder() {
  const addItem = useCartStore((state) => state.addItem);

  return (
    <div>
      <button onClick={() => addItem({ productId: 'prod101', name: 'Eple' })}>
        Legg til Eple
      </button>
      <button onClick={() => addItem({ productId: 'prod202', name: 'Brød' })}>
        Legg til Brød
      </button>
    </div>
  );
}

export default ProductAdder;
