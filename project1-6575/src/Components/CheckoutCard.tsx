import type { CheckoutItem } from "../types/CheckoutItem";
import { getProductImage } from "../data/image";

interface CheckoutCardProps extends CheckoutItem {
  handleRemoveFromCheckout: () => void;
}

// A line subtotal is derived from unit price and reserved quantity.
export default function CheckoutCard({
  name,
  image,
  price,
  quantity,
  handleRemoveFromCheckout,
}: CheckoutCardProps) {
  return (
    <div className="CheckoutCard">
      <img src={getProductImage(image)} alt={name} />
      <div>
        <h3>{name}</h3>
        <p>Unit Price: ${price.toFixed(2)} CAD</p>
        <p>Quantity: {quantity}</p>
        <p>Subtotal: ${(price * quantity).toFixed(2)} CAD</p>
        <button type="button" onClick={handleRemoveFromCheckout}>
          Remove
        </button>
      </div>
    </div>
  );
}
