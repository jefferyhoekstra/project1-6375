import type { ClothingProduct } from "../data/data";
import ItemCard from "./ItemCard";

interface ItemsContainerProps {
  data: ClothingProduct[];
  handleAdjustQuantity: (id: number, delta: number) => void;
  handleAddToCheckout: (id: number) => void;
}

// map renders all 50 items. Callbacks connect each card to its product ID.
export default function ItemsContainer({
  data,
  handleAdjustQuantity,
  handleAddToCheckout,
}: ItemsContainerProps) {
  return (
    <section className="ShopSection" aria-label="Product catalogue">
      <h2>Browse Clothing ({data.length} items)</h2>
      <div className="ItemsContainer">
        {data.map((product) => (
          <ItemCard
            key={product.id}
            {...product}
            handleQuantityAdjust={(delta) =>
              handleAdjustQuantity(product.id, delta)
            }
            handleAddToCheckout={() => handleAddToCheckout(product.id)}
          />
        ))}
      </div>
    </section>
  );
}
