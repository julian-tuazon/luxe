import React from 'react';

export default function Header(props) {
  const cartItemCount = props.cart.reduce((acc, cur) => acc + cur.quantity, 0);

  return (
    <div className="py-3 mx-0 mb-5 row text-white bg-dark fixed-top">
      <div className="col-11 mx-auto d-flex justify-content-between">
        <div className="btn text-white" onClick={() => props.setView('catalog', {})}>
          <i className="fas fa-glass-martini-alt mr-3"></i>
          L U X E
        </div>
        <div className="btn text-white" onClick={() => props.setView('cart', {})}>
          {cartItemCount}{ cartItemCount === 1 ? ' Item' : ' Items' }
          <i className="fas fa-shopping-cart ml-3"></i>
        </div>
      </div>
    </div>
  );
}
