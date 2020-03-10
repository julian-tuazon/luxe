import React from 'react';
import CartSummaryItem from './cart-summary-item';

export default function CartSummary(props) {
  if (props.cartItems.length === 0) return <h1>Cart is empty</h1>;

  const cartItems = props.cartItems.map(item =>
    <CartSummaryItem item={item} key={item.productId} />
  );
  const totalPrice = props.cartItems.reduce((acc, cur) => acc + cur, 0);

  return (
    <React.Fragment>
      <h2>My Cart</h2>
      {cartItems}
      <h5>Total price: ${totalPrice}</h5>
    </React.Fragment>
  );
}
