import React from 'react';
import ProductListItem from './product-list-item';

export default class ProductList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { products: [] };
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    this.getProducts();
    window.scrollTo(0, 0);
  }

  getProducts() {
    fetch('/api/products')
      .then(res => res.json())
      .then(data => this.setState({ products: data }))
      .catch(err => console.error(err));
  }

  handleClick(e) {
    this.props.setView('details', { productId: e.currentTarget.id });
  }

  render() {
    const products = this.state.products.map(product =>
      <ProductListItem
        product={product}
        key={product.productId}
        handleClick={this.handleClick} />);

    return (
      <div className="container mb-4">
        <div className="header-img d-flex align-items-end justify-content-end text-white mb-5">
          <div className="d-flex flex-column flex-sm-row">
            <h4 className="mr-3">L U X U R Y</h4>
            <h4 className="mr-3">R E D E F I N E D</h4>
          </div>
        </div>
        <div className="row row-cols-1 row-cols-md-3">
          {products}
        </div>
      </div>
    );
  }
}
