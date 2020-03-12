import React from 'react';

export default class CheckoutForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { name: '', card: '', address: '', wasValidated: false };
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
    const validationTests = {
      name: /^(?!.* {2,})[a-zA-Z ]*$/,
      card: /^[\d]*$/,
      address: /^(?!.* {2,})[a-zA-Z\d.,# ]*$/
    };

    if (validationTests[e.target.id].test(e.target.value)) this.setState({ [e.target.id]: e.target.value });
  }

  checkValidity(form) {
    if (form.checkValidity() === true) {
      this.props.placeOrder(this.state);
      this.setState({ name: '', card: '', address: '', wasValidated: false });
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    this.setState({ name: this.state.name.trim(), address: this.state.address.trim(), wasValidated: true }, this.checkValidity(e.currentTarget));
  }

  render() {
    let wasValidated = '';
    if (this.state.wasValidated) wasValidated = ' was-validated';

    return (
      <div className="row mx-0">
        <div className="col-7 mx-auto d-flex flex-column">
          <h2 className="mb-4">My Cart</h2>
          <h5 className="d-flex align-items-center text-muted mb-4">Total Price: ${this.getTotalPrice()}</h5>
          <form className={'d-flex flex-column needs-validation' + wasValidated} noValidate onSubmit={this.handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input type="text" id="name" className="form-control" value={this.state.name} onChange={this.handleChange} minLength={5} maxLength={67} required />
              <div className="valid-feedback">Valid.</div>
              <div className="invalid-feedback">Please fill out this field.</div>
            </div>
            <div className="form-group">
              <label htmlFor="card">Credit Card</label>
              <input type="text" id="card" className="form-control" value={this.state.card} onChange={this.handleChange} minLength={16} maxLength={16} required />
              <div className="valid-feedback">Valid.</div>
              <div className="invalid-feedback">Please fill out this field.</div>
            </div>
            <div className="form-group">
              <label htmlFor="name">Shipping Address</label>
              <textarea type="textarea" id="address" className="form-control" value={this.state.address} rows="4" onChange={this.handleChange} minLength={21} maxLength={156} required />
              <div className="valid-feedback">Valid.</div>
              <div className="invalid-feedback">Please fill out this field.</div>
            </div>
            <div className="d-flex justify-content-between">
              <div>
                <button type="button" className="btn btn-outline-info" id="catalog" onClick={this.handleClick}>Back to catalog</button>
              </div>
              <div>
                <button type="submit" className="btn btn-primary" id="order">Place Order</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
