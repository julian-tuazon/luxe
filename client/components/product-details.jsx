import React from 'react';

export default class ProductDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = { product: null };
    this.getProductData = this.getProductData.bind(this);
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

  render() {
    if (!this.state.product) return <h1>Loading...</h1>;
    return (
      <div className="row mt-5">
        <div className="card col-7 mx-auto">
          <div className="text-muted my-3">Back to catalog</div>
          <div className="row">
            <img
              src={this.state.product.image}
              className="card-img-top col-4"
              alt={this.state.product.name}
              style={{ objectFit: 'contain', height: '50%' }} />
            <div className="d-flex flex-column">
              <h3 className="card-title">{this.state.product.name}</h3>
              <h5 className="text-muted">${this.state.product.price}</h5>
              <p>{this.state.product.shortDescription}</p>
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
