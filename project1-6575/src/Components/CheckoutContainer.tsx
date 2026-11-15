import type { CheckoutItem } from "../types/CheckoutItem";
import CheckoutCard from "./CheckoutCard";

interface CheckoutContainerProps {
  cartData: CheckoutItem[];
  handleRemoveFromCheckout: (id: number) => void;
  handleEmptyCheckout: () => void;
}

export default function CheckoutContainer({
  cartData,
  handleRemoveFromCheckout,
  handleEmptyCheckout,
}: CheckoutContainerProps) {
  // reduce calculates the grand total from numeric line subtotals.
  const grandTotal = cartData.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );

  return (
    <aside className="CheckoutContainer" aria-label="Checkout cart">
      <h2>Checkout</h2>
      {cartData.length === 0 ? (
        <p>Cart Empty</p>
      ) : (
        <>
          {cartData.map((item) => (
            <CheckoutCard
              key={item.id}
              {...item}
              handleRemoveFromCheckout={() =>
                handleRemoveFromCheckout(item.id)
              }
            />
          ))}
          <button type="button" onClick={handleEmptyCheckout}>
            Empty Checkout
          </button>
        </>
      )}
      <h3>Grand Total: ${grandTotal.toFixed(2)} CAD</h3>
    </aside>
  );
}
