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
      <div className="container my-5 mx-auto">
        <div className="container card">
          <div className="my-3">
            <button type="button" id="catalog" className="btn btn-outline-info" onClick={this.handleClick}>Back to catalog</button>
          </div>
          <div className="d-flex flex-column flex-md-row justify-content-around">
            <img
              src={this.state.product.image}
              className="details-img mb-5 mb-md-0 mr-md-4"
              alt={this.state.product.name} />
            <div className="d-flex flex-column">
              <h3 className="card-title">{this.state.product.name}</h3>
              <h5 className="text-muted">${this.state.product.price}</h5>
              <p>{this.state.product.shortDescription}</p>
              <div>
                <button type="button" id="addToCart" className="btn btn-primary" onClick={this.handleClick}>Add to Cart</button>
              </div>
            </div>
          </div>
          <div className="card-body px-0">
            <p>{this.state.product.longDescription}</p>
          </div>
        </div>
      </div>
    );
  }
}
