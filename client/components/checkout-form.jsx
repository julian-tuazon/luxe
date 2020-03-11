import React from 'react';

export default class CheckoutForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { name: '', card: '', address: '' };
    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  getTotalPrice() {
    return this.props.cart.reduce((acc, cur) => acc + cur.price, 0);
  }

  handleClick() {
    this.props.setView('catalog', {});
  }

  handleChange(e) {
    this.setState({ [e.target.id]: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.placeOrder(this.state);
    this.setState({ name: '', card: '', address: '' });
  }

  render() {
    return (
      <div className="row mx-0">
        <div className="col-7 mx-auto d-flex flex-column">
          <h2 className="mb-4">My Cart</h2>
          <h5 className="d-flex align-items-center text-muted mb-4">Total Price: ${this.getTotalPrice()}</h5>
          <form className="d-flex flex-column">
            <label htmlFor="name">Name</label>
            <input type="text" id="name" className="mb-4" value={this.state.name} onChange={this.handleChange} />
            <label htmlFor="card">Credit Card</label>
            <input type="text" id="card" className="mb-4" value={this.state.card} onChange={this.handleChange} />
            <label htmlFor="name">Shipping Address</label>
            <textarea type="textarea" id="address" className="mb-4" value={this.state.address} rows="4" onChange={this.handleChange} />
            <div className="d-flex justify-content-between">
              <div className="text-muted mb-4 pt-0 px-0 btn d-flex justify-content-start" id="catalog" onClick={this.handleClick}>
                Back to catalog
              </div>
              <div>
                <button type="button" className="btn btn-primary" id="order" onClick={this.handleSubmit}>Place Order</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
