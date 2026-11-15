import { useState } from "react";
import type { ClothingProduct } from "../data/data";
import type { CheckoutItem } from "../types/CheckoutItem";
import NavBar from "./NavBar";
import ItemsContainer from "./ItemsContainer";
import CheckoutContainer from "./CheckoutContainer";

interface ThriftHappensProps {
  data: ClothingProduct[];
}

interface ShopState {
  products: ClothingProduct[];
  cartItems: CheckoutItem[];
}

// Owns all inventory and checkout state. Child components only receive props.
export default function ThriftHappens({ data }: ThriftHappensProps) {
  const [shop, setShop] = useState<ShopState>(() => ({
    products: data.map((product) => ({ ...product, itemQuantity: 0 })),
    cartItems: [],
  }));

  function handleAdjustQuantity(id: number, delta: number) {
    setShop((prevData) => ({
      ...prevData,
      // map and spread keep React state immutable. Clamp to [0, stock].
      products: prevData.products.map((product) =>
        product.id === id
          ? {
              ...product,
              itemQuantity: Math.max(
                0,
                Math.min(product.quantity, product.itemQuantity + delta),
              ),
            }
          : product,
      ),
    }));
  }

  function handleAddToCheckout(id: number) {
    setShop((prevData) => {
      const selected = prevData.products.find((product) => product.id === id);
      if (
        !selected ||
        selected.itemQuantity <= 0 ||
        selected.itemQuantity > selected.quantity
      ) {
        return prevData;
      }

      const existing = prevData.cartItems.find((item) => item.id === id);

      return {
        // Reserve inventory immediately and reset the card's selection to 0.
        products: prevData.products.map((product) =>
          product.id === id
            ? {
                ...product,
                quantity: product.quantity - selected.itemQuantity,
                itemQuantity: 0,
              }
            : product,
        ),
        // Merge the new quantity into the existing checkout line if present.
        cartItems: existing
          ? prevData.cartItems.map((item) =>
              item.id === id
                ? { ...item, quantity: item.quantity + selected.itemQuantity }
                : item,
            )
          : [
              ...prevData.cartItems,
              {
                id: selected.id,
                name: selected.name,
                image: selected.image,
                price: selected.price,
                quantity: selected.itemQuantity,
              },
            ],
      };
    });
  }

  function handleRemoveFromCheckout(id: number) {
    setShop((prevData) => {
      const removed = prevData.cartItems.find((item) => item.id === id);
      if (!removed) return prevData;

      return {
        // Restore only this checkout line's reserved quantity to stock.
        products: prevData.products.map((product) =>
          product.id === id
            ? { ...product, quantity: product.quantity + removed.quantity }
            : product,
        ),
        cartItems: prevData.cartItems.filter((item) => item.id !== id),
      };
    });
  }

  function handleEmptyCheckout() {
    setShop((prevData) => ({
      // Restore every checkout line, leaving any unpurchased selections intact.
      products: prevData.products.map((product) => {
        const reserved = prevData.cartItems.find(
          (item) => item.id === product.id,
        );
        return reserved
          ? { ...product, quantity: product.quantity + reserved.quantity }
          : product;
      }),
      cartItems: [],
    }));
  }

  // Derived count: do not store it separately or risk mismatched values.
  const cartQuantity = shop.cartItems.reduce(
    (acc, item) => acc + item.quantity,
    0,
  );

  return (
    <>
      <NavBar cartQuantity={cartQuantity} />
      <main className="ShopLayout">
        <ItemsContainer
          data={shop.products}
          handleAdjustQuantity={handleAdjustQuantity}
          handleAddToCheckout={handleAddToCheckout}
        />
        <CheckoutContainer
          cartData={shop.cartItems}
          handleRemoveFromCheckout={handleRemoveFromCheckout}
          handleEmptyCheckout={handleEmptyCheckout}
        />
      </main>
    </>
  );
}
