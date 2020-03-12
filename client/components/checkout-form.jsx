import React from 'react';

export default class CheckoutForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { name: '', card: '', address: '', invalid: [], showValidation: [], isFormValid: false };
    this.fields = ['name', 'card', 'address'];
    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.validateInput = this.validateInput.bind(this);
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
    this.setState({ showValidation: this.state.showValidation.filter(elem => elem !== e.target.id) });
    if (validationTests[e.target.id].test(e.target.value)) this.setState({ [e.target.id]: e.target.value });
    this.validateInput(e.target);
    this.validateForm(e.target.parentElement.parentElement);
  }

  validateInput(input) {
    if (this.state[input.id].trim().length >= input.minLength) this.setState({ invalid: this.state.invalid.filter(elem => elem !== input.id) });
    else this.setState({ invalid: [...this.state.invalid, input.id] });
  }

  validateForm(form) {
    this.setState({ isFormValid: form.checkValidity() });
  }

  showValidation(input) {
    return this.state.invalid.includes(input) && this.state.showValidation.includes(input) ? 'form-control is-invalid' : 'form-control';
  }

  handleBlur(e) {
    this.setState({ showValidation: [...this.state.showValidation, e.currentTarget.id] });
    this.setState({ [e.currentTarget.id]: this.state[e.currentTarget.id].trim() }, this.validateInput(e.currentTarget));
  }

  handleSubmit(e) {
    e.preventDefault();
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
              <input type="text" id="name" className={this.showValidation('name')} value={this.state.name} onChange={this.handleChange} onBlur={this.handleBlur} minLength={5} maxLength={67} required />
              <div className="valid-feedback">Valid.</div>
              <small className="invalid-feedback position-absolute">Minimum of 5 characters required.</small>
            </div>
            <div className="form-group mb-5">
              <label htmlFor="card">Credit Card</label>
              <input type="text" id="card" className={this.showValidation('card')} value={this.state.card} onChange={this.handleChange} onBlur={this.handleBlur} minLength={16} maxLength={16} required />
              <div className="valid-feedback">Valid.</div>
              <small className="invalid-feedback position-absolute">Please enter a valid 16 digit card number.</small>
            </div>
            <div className="form-group mb-5">
              <label htmlFor="name">Shipping Address</label>
              <textarea type="textarea" id="address" className={this.showValidation('address')} value={this.state.address} rows="4" onChange={this.handleChange} onBlur={this.handleBlur} minLength={21} maxLength={156} required />
              <div className="valid-feedback">Valid.</div>
              <small className="invalid-feedback position-absolute">Minimum of 21 characters required.</small>
            </div>
            <div className="d-flex justify-content-between">
              <div>
                <button type="button" className="btn btn-outline-info" id="catalog" onClick={this.handleClick}>Back to catalog</button>
              </div>
              <div>
                <button type="submit" className="btn btn-primary" id="order" disabled={!this.state.isFormValid}>{this.state.isFormValid ? 'Place Order' : 'Info Pending'}</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
