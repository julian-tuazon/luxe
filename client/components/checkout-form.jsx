import React from 'react';

export default class CheckoutForm extends React.Component {
  render() {
    return (
      <div className="row mx-0">
        <div className="col-9 mx-auto d-flex flex-column">
          <h2 className="mb-4">My Cart</h2>
          <h5 className="d-flex align-items-center text-muted mb-4">Total Price: $9999</h5>
          <label htmlFor="name">Name</label>
          <input type="text" id="name" className="mb-4" />
          <label htmlFor="card">Credit Card</label>
          <input type="text" id="card" className="mb-4" />
          <label htmlFor="name">Shipping Address</label>
          <textarea type="textarea" id="address" className="mb-4" rows="4" />
          <div className="d-flex justify-content-between">
            <div className="text-muted mb-4 pt-0 px-0 btn d-flex justify-content-start"
              onClick={() => this.props.setView('catalog', {})}>
              Back to catalog
            </div>
            <div>
              <button type="button" className="btn btn-primary">Place Order</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
