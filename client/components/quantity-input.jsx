import React from 'react';

export default class QuantityInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = { quantity: this.props.item.quantity };
    this.handleChange = this.handleChange.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.updateQuantity = this.updateQuantity.bind(this);
  }

  handleChange(e) {
    const input = e.target;
    const validNum = /(?!^0)(^[\d]*$)/;
    if (validNum.test(input.value)) this.setState({ quantity: input.value });
  }

  handleBlur(e) {
    if (!this.state.quantity) {
      return this.setState({
        quantity: 1
      }, () => this.props.updateQuantity(this.props.item.productId, Number(this.state.quantity)));
    }
    this.props.updateQuantity(this.props.item.productId, Number(this.state.quantity));
  }

  updateQuantity(e) {
    if (!this.props.canClick) return;
    if (e.currentTarget.id === 'plus' && this.props.item.quantity < 99) {
      return this.setState({
        quantity: Number(this.state.quantity) + 1
      }, () => this.props.updateQuantity(this.props.item.productId, this.state.quantity));
    }
    if (e.currentTarget.id === 'minus' && this.props.item.quantity > 1) {
      return this.setState({
        quantity: Number(this.state.quantity) - 1
      }, () => this.props.updateQuantity(this.props.item.productId, this.state.quantity));
    }
  }

  setMinusButtonStatus() {
    return (this.props.item.quantity > 1) ? 'btn ml-2 text-primary' : 'btn ml-2 disabled';
  }

  setPlusButtonStatus() {
    return (this.props.item.quantity < 99) ? 'btn text-primary' : 'btn disabled';
  }

  render() {
    return (
      <div className="form-group d-flex align-items-center mb-3">
        <label htmlFor="quantity" className="mb-0">Quantity:</label>
        <button type="button" id="minus" className={this.setMinusButtonStatus()} onClick={this.updateQuantity}>
          <i className="fas fa-minus fa-xs"></i>
        </button>
        <input type="text" className="text-center mx-1" value={this.state.quantity} onChange={this.handleChange} onBlur={this.handleBlur} minLength={1} maxLength={2} size={3} required />
        <button type="button" id="plus" className={this.setPlusButtonStatus()} onClick={this.updateQuantity}>
          <i className="fas fa-plus fa-xs"></i>
        </button>
      </div>
    );
  }
}
