import React from 'react';

export default class CheckoutForm extends React.Component {
  constructor(props) {
    super(props);
    this.fields = ['name', 'card', 'month', 'year', 'cvv', 'address', 'city', 'state', 'zipCode', 'agreement'];
    this.state = { name: '', card: '', month: '--', year: '--', cvv: '', address: '', city: '', state: '--', zipCode: '', agreement: false, invalid: Array.from(this.fields), showValidation: [] };
    this.handleClick = this.handleClick.bind(this);
    this.handleAgreementChange = this.handleAgreementChange.bind(this);
    this.handleDropdownChange = this.handleDropdownChange.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleAgreementBlur = this.handleAgreementBlur.bind(this);
    this.handleDropdownBlur = this.handleDropdownBlur.bind(this);
    this.handleInputBlur = this.handleInputBlur.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  handleClick(e) {
    if (e.target.id === 'order') this.setState({ showValidation: Array.from(this.fields) });
    if (e.target.id === 'catalog') this.props.setView('catalog', {});
  }

  handleAgreementChange(e) {
    const isChecked = e.target.id.checked;
    this.hideValidation('agreement');
    return this.setState({
      agreement: isChecked
    }, () => this.validateAgreement());
  }

  handleDropdownChange(e) {
    const dropdown = e.target;
    this.hideValidation(dropdown.id);
    return this.setState({
      [dropdown.id]: dropdown.value
    }, () => this.validateDropdown(dropdown));
  }

  handleInputChange(e) {
    const input = e.target;
    this.hideValidation(input.id);
    const validChars = {
      name: /^(?!.* {2,})[a-zA-Z ]*$/,
      card: /^[\d]*$/,
      cvv: /^[\d]*$/,
      address: /^(?!.* {2,})[a-zA-Z\d.,# ]*$/,
      city: /^(?!.* {2,})[a-zA-Z.\- ]*$/,
      zipCode: /^[\d]*$/
    };

    if (validChars[input.id].test(input.value)) {
      this.setState({
        [input.id]: input.value
      }, () => this.validateInput(input));
    }
  }

  handleAgreementBlur() {
    this.setState({ showValidation: this.showValidation('agreement') });
  }

  handleDropdownBlur(e) {
    const dropdown = e.currentTarget;
    this.setState({ showValidation: this.showValidation(dropdown.id) });
  }

  handleInputBlur(e) {
    const input = e.currentTarget;
    this.setState({
      showValidation: this.showValidation(input.id),
      [input.id]: this.state[input.id].trim()
    }, () => this.validateInput(input));
  }

  showValidation(id) {
    if (!this.state.showValidation.includes(id)) return [...this.state.showValidation, id];
    else return [...this.state.showValidation];
  }

  hideValidation(id) {
    this.setState({ showValidation: this.state.showValidation.filter(elem => elem !== id) });
  }

  handleSubmit(e) {
    e.preventDefault();
    if (!this.state.invalid.length) {
      const { name, card, address, city, state, zipCode } = this.state;
      this.props.placeOrder({ name, card, address, city, state, zipCode });
    }
  }

  validateAgreement() {
    if (this.state.agreement) this.removeFromInvalid('agreement');
    else this.addToInvalid('agreement');
  }

  validateDropdown(dropdown) {
    if (this.isValidDropdown(dropdown)) this.removeFromInvalid(dropdown.id);
    else this.addToInvalid(dropdown.id);
  }

  isValidDropdown(dropdown) {
    return this.state[dropdown.id] !== '--';
  }

  isValidInput(input) {
    return this.state[input.id].trim().length >= input.minLength;
  }

  validateInput(input) {
    if (this.isValidInput(input)) this.removeFromInvalid(input.id);
    else this.addToInvalid(input.id);
  }

  addToInvalid(id) {
    if (!this.state.invalid.includes(id)) this.setState({ invalid: [...this.state.invalid, id] });
  }

  removeFromInvalid(id) {
    this.setState({ invalid: this.state.invalid.filter(elem => elem !== id) });
  }

  setInputClassName(input) {
    if (input === 'agreement') return this.state.invalid.includes(input) && this.state.showValidation.includes(input) ? 'form-check-input is-invalid' : 'form-check-input';
    if (input === 'state') return this.state.invalid.includes(input) && this.state.showValidation.includes(input) ? 'custom-select is-invalid' : 'custom-select';
    return this.state.invalid.includes(input) && this.state.showValidation.includes(input) ? 'form-control is-invalid' : 'form-control';
  }

  setButtonClassName() {
    return this.state.invalid.length ? 'btn btn-danger disabled' : 'btn btn-primary';
  }

  getStates() {
    const states = [
      'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD', 'MA', 'MI', 'MN',
      'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VA',
      'WA', 'WV', 'WI', 'WY'
    ];
    return states.map(state => <option key={state} value={state}>{state}</option>);
  }

  getYears() {
    const date = new Date();
    const currentYear = date.getFullYear();
    const years = [];
    for (let i = 0; i < 10; i++) {
      years.push((currentYear + i).toString());
    }
    return years.map(year => <option key={year} value={year}>{year}</option>);
  }

  getMonths() {
    const months = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
    return months.map(month => <option key={month} value={month}>{month}</option>);
  }

  getCartTotal() {
    return this.props.cart.reduce((acc, cur) => acc + cur.price * cur.quantity, 0);
  }

  render() {
    return (
      <div className="container">
        <div className="col-md-11 mx-auto d-flex flex-column">
          <h2 className="mb-4">Checkout</h2>
          <h4 className="d-flex align-items-center text-muted mb-4">Cart Total: ${this.getCartTotal()}</h4>
          <form className="d-flex flex-column needs-validation mb-5" noValidate onSubmit={this.handleSubmit}>
            <div className="form-group mb-5">
              <label htmlFor="name">Name</label>
              <input type="text" id="name" className={this.setInputClassName('name')} value={this.state.name} onChange={this.handleInputChange} onBlur={this.handleBlur} minLength={5} maxLength={67} required />
              <small className="invalid-feedback position-absolute">Minimum of 5 characters required.</small>
            </div>

            <div className="form-row d-flex flex-column flex-lg-row">
              <div className="form-group col-12 col-lg-6 mb-5">
                <label htmlFor="card">Card Number</label>
                <input type="text" id="card" className={this.setInputClassName('card')} value={this.state.card} onChange={this.handleInputChange} onBlur={this.handleBlur} minLength={16} maxLength={16} required />
                <small className="invalid-feedback position-absolute">Please enter a valid 16 digit card number.</small>
              </div>
              <div className="form-group col-12 col-lg-2 mb-5">
                <label htmlFor="month">Month</label>
                <select id="month" className={this.setInputClassName('month')} name="month" form="checkout" value={this.state.month} onChange={this.handleDropdownChange} onBlur={this.handleBlur} required>
                  <option hidden disabled>--</option>
                  {this.getMonths()}
                </select>
                <small className="invalid-feedback position-absolute">Please select a month.</small>
              </div>
              <div className="form-group col-12 col-lg-2 mb-5">
                <label htmlFor="year">Year</label>
                <select id="year" className={this.setInputClassName('year')} name="year" form="checkout" value={this.state.year} onChange={this.handleDropdownChange} onBlur={this.handleBlur} required>
                  <option hidden disabled>--</option>
                  {this.getYears()}
                </select>
                <small className="invalid-feedback position-absolute">Please select a year.</small>
              </div>
              <div className="form-group col-12 col-lg-2 mb-5">
                <label htmlFor="cvv">CVV</label>
                <input type="text" id="cvv" className={this.setInputClassName('cvv')} value={this.state.cvv} onChange={this.handleInputChange} onBlur={this.handleBlur} minLength={3} maxLength={4} required />
                <small className="invalid-feedback position-absolute">Please enter a valid 3-4 digit CVV.</small>
              </div>
            </div>

            <div className="form-group mb-5">
              <label htmlFor="name">Shipping Address</label>
              <input type="text" id="address" className={this.setInputClassName('address')} value={this.state.address} onChange={this.handleInputChange} onBlur={this.handleBlur} minLength={6} maxLength={42} required />
              <small className="invalid-feedback position-absolute">Minimum of 21 characters required.</small>
            </div>
            <div className="form-row d-flex flex-column flex-lg-row">
              <div className="form-group col-12 col-lg-7 mb-5">
                <label htmlFor="city">City</label>
                <input type="text" id="city" className={this.setInputClassName('city')} value={this.state.city} onChange={this.handleInputChange} onBlur={this.handleBlur} minLength={3} maxLength={50} required />
                <small className="invalid-feedback position-absolute">Minimum of 3 characters required.</small>
              </div>
              <div className="form-group col-12 col-lg-2 mb-5">
                <label htmlFor="state">State</label>
                <select id="state" className={this.setInputClassName('state')} name="state" form="checkout" value={this.state.state} onChange={this.handleDropdownChange} onBlur={this.handleBlur} required>
                  <option hidden disabled>--</option>
                  {this.getStates()}
                </select>
                <small className="invalid-feedback position-absolute">Please select a state.</small>
              </div>
              <div className="form-group col-12 col-lg-3 mb-5">
                <label htmlFor="zipCode">ZIP Code</label>
                <input type="text" id="zipCode" className={this.setInputClassName('zipCode')} value={this.state.zipCode} onChange={this.handleInputChange} onBlur={this.handleBlur} minLength={5} maxLength={5} required />
                <small className="invalid-feedback position-absolute">Please enter a valid 5 digit ZIP code.</small>
              </div>
            </div>
            <div className="form-group mb-5">
              <div className="form-check">
                <input type="checkbox" id="agreement" className={this.setInputClassName('agreement')} checked={this.state.agreement} onChange={this.handleAgreementChange} onBlur={this.handleBlur} required />
                <label htmlFor="agreement" className="form-check-label">I understand that this website is for demonstration purposes only, that no payment processing will occur, and that personal information such as names, addresses, and real credit card numbers should not be used upon submission of this form.</label>
                <small className="invalid-feedback position-absolute">Please agree to the terms and conditions.</small>
              </div>
            </div>
            <div className="d-flex justify-content-between">
              <div className="mr-2">
                <button type="button" className="btn btn-outline-info" id="catalog" onClick={this.handleClick}>Back to Catalog</button>
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
