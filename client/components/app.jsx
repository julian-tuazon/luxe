import React from 'react';
import Header from './header';
import ProductList from './product-list';
import ProductDetails from './product-details';
import CartSummary from './cart-summary';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      view: {
        name: 'catalog',
        params: {}
      },
      cart: []
    };
    this.setView = this.setView.bind(this);
    this.addToCart = this.addToCart.bind(this);
  }

  componentDidMount() {
    this.getCartItems();
  }

  setView(name, params) {
    this.setState({ view: { name, params } });
  }

  getCartItems() {
    fetch('/api/cart/')
      .then(res => res.json())
      .then(data => this.setState({ cart: data }))
      .catch(err => console.error(err));
  }

  addToCart(product) {
    fetch('/api/cart/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(product)
    })
      .then(res => res.json())
      .then(data => this.setState({ cart: [...this.state.cart, data] }))
      .catch(err => console.error(err));
  }

  render() {
    let currentView;
    if (this.state.view.name === 'catalog') currentView = <ProductList setView={this.setView} />;
    else if (this.state.view.name === 'details') currentView = <ProductDetails details={this.state.view.params} setView={this.setView} addToCart={this.addToCart} />;
    else currentView = <CartSummary cart={this.state.cart} />;

    return (
      <React.Fragment>
        <Header cartItemCount={this.state.cart.length}/>
        {currentView}
      </React.Fragment>
    );
  }
}
