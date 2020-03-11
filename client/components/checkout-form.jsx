import React from 'react';

export default class CheckoutForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  getTotalPrice() {
    return this.props.cart.reduce((acc, cur) => acc + cur.price, 0);
  }

  handleClick(e) {
    e.target.id === 'catalog' ? this.props.setView('catalog', {}) : this.props.placeOrder(this.state.order);
  }

  render() {
    return (
      <div className="row mx-0">
        <div className="col-7 mx-auto d-flex flex-column">
          <h2 className="mb-4">My Cart</h2>
          <h5 className="d-flex align-items-center text-muted mb-4">Total Price: ${this.getTotalPrice()}</h5>
          <label htmlFor="name">Name</label>
          <input type="text" id="name" className="mb-4" />
          <label htmlFor="card">Credit Card</label>
          <input type="text" id="card" className="mb-4" />
          <label htmlFor="name">Shipping Address</label>
          <textarea type="textarea" id="address" className="mb-4" rows="4" />
          <div className="d-flex justify-content-between">
            <div className="text-muted mb-4 pt-0 px-0 btn d-flex justify-content-start" id="catalog" onClick={this.handleClick}>
              Back to catalog
            </div>
            <div>
              <button type="button" className="btn btn-primary" id="order" onClick={this.handleClick}>Place Order</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
