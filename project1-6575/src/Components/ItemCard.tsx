import type { ClothingProduct } from "../data/data";
import { getProductImage } from "../data/image";

interface ItemCardProps extends ClothingProduct {
  handleQuantityAdjust: (delta: number) => void;
  handleAddToCheckout: () => void;
}

// Displays one item. Quantity changes are sent to the parent through props.
export default function ItemCard({
  name,
  image,
  fit,
  category,
  color,
  description,
  size,
  price,
  quantity,
  itemQuantity,
  handleQuantityAdjust,
  handleAddToCheckout,
}: ItemCardProps) {
  return (
    <div className="ItemCard">
      <img src={getProductImage(image)} alt={name} />
      <h3>{name}</h3>
      <p>Fit: {fit}</p>
      <p>Category: {category}</p>
      <p>Color: {color}</p>
      <p>{description}</p>
      <p>Size: {size}</p>
      <p>Price: ${price.toFixed(2)} CAD</p>
      <p className={quantity === 0 ? "out-of-stock" : "stock"}>
        {quantity === 0 ? "Out of Stock" : `Remaining Stock: ${quantity}`}
      </p>

      <div className="QuantityControls">
        <button
          type="button"
          aria-label={`Decrease quantity for ${name}`}
          onClick={() => handleQuantityAdjust(-1)}
          disabled={itemQuantity === 0}
        >
          -
        </button>
        <span>{itemQuantity}</span>
        <button
          type="button"
          aria-label={`Increase quantity for ${name}`}
          onClick={() => handleQuantityAdjust(1)}
          disabled={itemQuantity >= quantity}
        >
          +
        </button>
      </div>

      <p>Selected Total: ${(itemQuantity * price).toFixed(2)} CAD</p>
      <button
        type="button"
        onClick={handleAddToCheckout}
        disabled={itemQuantity === 0 || quantity === 0}
      >
        Add to Checkout
      </button>
    </div>
  );
}
