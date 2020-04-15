import React from 'react';

export default class ProductDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = { product: null, showModal: false };
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    this.getProductData();
    window.scrollTo(0, 0);
  }

  getProductData() {
    fetch(`/api/products/${this.props.details.productId}`)
      .then(res => res.json())
      .then(data => this.setState({ product: data }))
      .catch(err => console.error(err));
  }

  handleClick(e) {
    if (e.target.id === 'catalog') return this.props.setView('catalog', {});
    if (e.target.id === 'addToCart') return this.addToCart();
  }

  addToCart() {
    this.props.addToCart(this.state.product);
    this.setState({ showModal: true });
  }

  renderModal() {
    const modalClassName = this.state.showModal ? 'modal overlay d-block' : 'modal overlay';
    const hideModal = e => {
      if (e.target.id === 'shopping') return this.props.setView('catalog', {});
      if (e.target.id === 'cart') return this.props.setView('cart', {});
      this.setState({ showModal: false });
    };

    return (
      <div className={modalClassName} tabIndex="-1" role="dialog">
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Item Added to Cart</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={hideModal}>
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <p>
                <i className="far fa-check-circle text-success mr-2"></i>
                {this.state.product.name} has been added to your cart.
              </p>
            </div>
            <div className="modal-footer">
              <div className="btn-group w-75 mx-auto">
                <button type="button" id="shopping" className="btn btn-primary w-25" onClick={hideModal}>Continue Shopping</button>
                <button type="button" id="cart" className="btn btn-secondary w-25" onClick={hideModal} data-dismiss="modal">View Cart</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  render() {
    if (!this.state.product) return null;
    return (
      <div className="container mb-5">
        {this.renderModal()}
        <div className="card card-body">
          <div className="mb-3">
            <button type="button" id="catalog" className="btn btn-outline-info" onClick={this.handleClick}>Back to Catalog</button>
          </div>
          <div className="d-flex flex-column flex-md-row justify-content-between mb-4">
            <img
              src={this.state.product.image}
              className="col-md-4 mb-4 mb-md-0 px-0 py-2"
              alt={this.state.product.name} />
            <div className="d-flex flex-column justify-content-center col-md-7 px-0">
              <h4 className="card-title">{this.state.product.name}</h4>
              <div>
                <p className="d-inline-block text-success border border-success rounded p-2">${this.state.product.price}</p>
              </div>
              <p>{this.state.product.shortDescription}</p>
              <div>
                <button type="button" id="addToCart" className="btn btn-primary" onClick={this.handleClick}>Add to Cart</button>
              </div>
            </div>
          </div>
          <p>{this.state.product.longDescription}</p>
        </div>
      </div>
    );
  }
}
