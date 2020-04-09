import React from 'react';

export default class ProductDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = { product: null };
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    this.getProductData();
  }

  getProductData() {
    fetch(`/api/products/${this.props.details.productId}`)
      .then(res => res.json())
      .then(data => this.setState({ product: data }))
      .catch(err => console.error(err));
  }

  handleClick(e) {
    e.target.id === 'catalog' ? this.props.setView('catalog', {}) : this.props.addToCart(this.state.product);
  }

  render() {
    if (!this.state.product) return null;
    return (
      <div className="container mb-5">
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
