import React from 'react';

export default function OrderConfirmation(props) {
  window.scrollTo(0, 0);

  return (
    <div className="container text-center col-11">
      <h1 className="mb-5">Order Confirmation</h1>
      <h5 className="mb-4">Thank you for using this demo.</h5>
      <h5 className="mb-5">No real purchases have been made and no payment processing will occur.</h5>
      <div>
        <button type="button" id="catalog" className="btn btn-outline-info" onClick={() => props.setView('catalog', {})}>Back to Catalog</button>
      </div>
    </div>
  );
}
