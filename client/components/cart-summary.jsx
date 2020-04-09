import React from 'react';
import CartSummaryItem from './cart-summary-item';

export default function CartSummary(props) {
  if (!props.cart.length) {
    return (
      <div>
        <h1 className="text-center mb-5">Cart is empty</h1>
        <div className="text-center">
          <button type="button" id="catalog" className="btn btn-outline-info" onClick={() => props.setView('catalog', {})}>Back to catalog</button>
        </div>
      </div>
    );
  }

  const cartItems = props.cart.map(item =>
    <CartSummaryItem item={item} key={item.productId} />
  );
  const totalPrice = props.cart.reduce((acc, cur) => acc + cur.price, 0);

  return (
    <div className="row mx-0">
      <div className="d-flex flex-column col-7 mx-auto">
        <div className="mb-3">
          <button type="button" className="btn btn-outline-info" onClick={() => props.setView('catalog', {})}>Back to catalog</button>
        </div>
        <h2 className="mb-4">My Cart</h2>
        {cartItems}
        <div className="mt-3 mb-5 d-flex justify-content-between">
          <h5 className="text-muted d-flex align-items-center">Total Price: ${totalPrice}</h5>
          <div>
            <button type="button" className="btn btn-primary" onClick={() => props.setView('checkout', {})}>Checkout</button>
          </div>
        </div>
      </div>
    </div>
  );
}
