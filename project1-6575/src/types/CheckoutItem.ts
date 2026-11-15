// Structure of a single product reserved in the checkout cart.
export interface CheckoutItem {
  id: number;
  name: string;
  image: string;
  price: number;
  quantity: number;
}
