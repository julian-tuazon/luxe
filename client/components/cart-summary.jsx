import React, { useState, useEffect } from 'react';
import CartSummaryItem from './cart-summary-item';

export default function CartSummary(props) {
  const [count] = useState(0);
  useEffect(() => window.scrollTo(0, 0), [count]);

  if (!props.cart.length) {
    return (
      <div>
        <h1 className="text-center mb-5">Cart is empty</h1>
        <div className="text-center">
          <button type="button" id="catalog" className="btn btn-outline-info" onClick={() => props.setView('catalog', {})}>Back to Catalog</button>
        </div>
      </div>
    );
  }

  const cartItems = props.cart.map(item =>
    <CartSummaryItem item={item} key={item.productId} deleteFromCart={props.deleteFromCart} updateQuantity={props.updateQuantity} canClick={props.canClick} setView={props.setView} />
  );
  const cartTotal = props.cart.reduce((acc, cur) => acc + cur.price * cur.quantity, 0);

  return (
    <div className="container">
      <div className="d-flex flex-column">
        <div className="mb-3">
          <button type="button" className="btn btn-outline-info" onClick={() => props.setView('catalog', {})}>Back to Catalog</button>
        </div>
        <h2 className="mb-4">My Cart</h2>
        {cartItems}
        <div className="mt-3 mb-5 d-flex justify-content-between flex-column flex-md-row">
          <h4 className="text-muted d-flex align-items-center justify-content-center mb-4 mb-md-0">Cart Total: ${cartTotal}</h4>
          <div className="text-center">
            <button type="button" className="btn btn-primary" onClick={() => props.setView('checkout', {})}>Checkout</button>
          </div>
        </div>
      </div>
    </div>
  );
}
