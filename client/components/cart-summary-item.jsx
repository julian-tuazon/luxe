import React from 'react';

export default class CartSummaryItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = { showModal: false };
    this.updateQuantity = this.updateQuantity.bind(this);
    this.removeCartItem = this.removeCartItem.bind(this);
  }

  updateQuantity(e) {
    if (!this.props.canClick) return;
    if (e.currentTarget.id === 'plus') return this.props.updateQuantity(this.props.item.productId, 1);
    if (e.currentTarget.id === 'minus' && this.props.item.quantity > 1) return this.props.updateQuantity(this.props.item.productId, -1);
  }

  setButtonStatus() {
    return (this.props.item.quantity > 1) ? 'btn ml-2 text-primary' : 'btn ml-2 disabled';
  }

  removeCartItem() {
    this.setState({ showModal: true });
  }

  renderModal() {
    const modalClassName = this.state.showModal ? 'modal overlay d-block' : 'modal overlay';
    const hideModal = e => this.setState({ showModal: false });
    const removeItem = () => this.props.deleteFromCart(this.props.item.productId);

    return (
      <div className={modalClassName} tabIndex="-1" role="dialog">
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Confirm Item Removal</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={hideModal}>
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <p>
                <i className="far fa-times-circle text-danger mr-2"></i>
                Remove {this.props.item.name} ({this.props.item.quantity}) from your cart?
              </p>
            </div>
            <div className="modal-footer">
              <button type="button" id="remove" className="btn btn-danger" onClick={removeItem}>Remove</button>
              <button type="button" id="cancel" className="btn btn-secondary" onClick={hideModal} data-dismiss="modal">Cancel</button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  render() {
    return (
      <div className="card card-body d-flex flex-column flex-md-row justify-content-between mb-4">
        {this.renderModal()}
        <img
          src={this.props.item.image}
          className="col-md-4 mb-4 mb-md-0 px-0 py-2"
          alt={this.props.item.name} />
        <div className="d-flex flex-column justify-content-center col-md-7 px-0">
          <h4 className="card-title">{this.props.item.name}</h4>
          <div>
            <p className="d-inline-block text-success border border-success rounded p-2">${this.props.item.price}</p>
          </div>
          <p>{this.props.item.shortDescription}</p>
          <div className="d-flex flex-column">
            <div className="d-flex align-items-center mb-3">
              <h5 className="mb-0">Quantity:</h5>
              <button type="button" id="minus" className={this.setButtonStatus()} onClick={this.updateQuantity}>
                <i className="fas fa-minus fa-xs"></i>
              </button>
              <h5 className="mb-0 text-center col-2 col-sm-1 px-0">{this.props.item.quantity}</h5>
              <button type="button" id="plus" className="btn text-primary" onClick={this.updateQuantity}>
                <i className="fas fa-plus fa-xs"></i>
              </button>
            </div>
            <div>
              <button type="button" id="delete" className="btn text-secondary px-0" onClick={this.removeCartItem}>
                <i className="fas fa-times text-secondary fa-sm mr-2"></i>
              Remove
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
