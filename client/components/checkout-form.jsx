import React from 'react';

export default class CheckoutForm extends React.Component {
  constructor(props) {
    super(props);
    this.fields = ['name', 'card', 'address'];
    this.state = { name: '', card: '', address: '', invalid: Array.from(this.fields), showValidation: [] };
    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.validateInput = this.validateInput.bind(this);
  }

  getTotalPrice() {
    return this.props.cart.reduce((acc, cur) => acc + cur.price, 0);
  }

  handleClick(e) {
    if (e.target.id === 'order') return this.setState({ showValidation: Array.from(this.fields) });
    this.props.setView('catalog', {});
  }

  handleChange(e) {
    const validationTests = {
      name: /^(?!.* {2,})[a-zA-Z ]*$/,
      card: /^[\d]*$/,
      address: /^(?!.* {2,})[a-zA-Z\d.,# ]*$/
    };
    const input = e.target;
    this.setState({ showValidation: this.state.showValidation.filter(elem => elem !== input.id) });
    if (validationTests[input.id].test(input.value)) this.setState({ [input.id]: input.value }, () => this.validateInput(input));
  }

  validateInput(input) {
    if (this.state[input.id].trim().length >= input.minLength) return this.setState({ invalid: this.state.invalid.filter(elem => elem !== input.id) });
    this.state.invalid.includes(input.id) ? this.setState({ invalid: this.state.invalid }) : this.setState({ invalid: [...this.state.invalid, input.id] });
  }

  setInputClassName(input) {
    return this.state.invalid.includes(input) && this.state.showValidation.includes(input) ? 'form-control is-invalid' : 'form-control';
  }

  setButtonClassName() {
    return this.state.invalid.length ? 'btn btn-danger' : 'btn btn-primary';
  }

  handleBlur(e) {
    this.setState({ showValidation: [...this.state.showValidation, e.currentTarget.id] });
    this.setState({ [e.currentTarget.id]: this.state[e.currentTarget.id].trim() }, this.validateInput(e.currentTarget));
  }

  handleSubmit(e) {
    e.preventDefault();
    if (!this.state.invalid.length) {
      const { name, card, address } = this.state;
      this.props.placeOrder({ name, card, address });
      this.setState({ name: '', card: '', address: '', invalid: Array.from(this.fields), showValidation: [] });
    }
  }

  render() {
    return (
      <div className="row mx-0">
        <div className="col-7 mx-auto d-flex flex-column">
          <h2 className="mb-4">My Cart</h2>
          <h5 className="d-flex align-items-center text-muted mb-4">Total Price: ${this.getTotalPrice()}</h5>
          <form className="d-flex flex-column needs-validation" noValidate onSubmit={this.handleSubmit}>
            <div className="form-group mb-5">
              <label htmlFor="name">Name</label>
              <input type="text" id="name" className={this.setInputClassName('name')} value={this.state.name} onChange={this.handleChange} onBlur={this.handleBlur} minLength={5} maxLength={67} required />
              <div className="valid-feedback">Valid.</div>
              <small className="invalid-feedback position-absolute">Minimum of 5 characters required.</small>
            </div>
            <div className="form-group mb-5">
              <label htmlFor="card">Credit Card</label>
              <input type="text" id="card" className={this.setInputClassName('card')} value={this.state.card} onChange={this.handleChange} onBlur={this.handleBlur} minLength={16} maxLength={16} required />
              <div className="valid-feedback">Valid.</div>
              <small className="invalid-feedback position-absolute">Please enter a valid 16 digit card number.</small>
            </div>
            <div className="form-group mb-5">
              <label htmlFor="name">Shipping Address</label>
              <textarea type="textarea" id="address" className={this.setInputClassName('address')} value={this.state.address} rows="4" onChange={this.handleChange} onBlur={this.handleBlur} minLength={21} maxLength={156} required />
              <div className="valid-feedback">Valid.</div>
              <small className="invalid-feedback position-absolute">Minimum of 21 characters required.</small>
            </div>
            <div className="d-flex justify-content-between">
              <div>
                <button type="button" className="btn btn-outline-info" id="catalog" onClick={this.handleClick}>Back to catalog</button>
              </div>
              <div>
                <button type="submit" className={this.setButtonClassName()} id="order" onClick={this.handleClick}>{this.state.invalid.length ? 'Incomplete Info' : 'Place Order'}</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
