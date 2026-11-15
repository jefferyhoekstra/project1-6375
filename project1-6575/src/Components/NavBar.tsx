interface NavBarProps {
  cartQuantity: number;
}

// Presentation component: display a count derived in ThriftHappens.
export default function NavBar({ cartQuantity }: NavBarProps) {
  return (
    <nav className="NavBar">
      <h1>Thrift Happens</h1>
      <p>Second-hand clothing, first-class finds.</p>
      <strong>Checkout Items: {cartQuantity}</strong>
    </nav>
  );
}
