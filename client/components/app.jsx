import React from 'react';
import Header from './header';
import ProductList from './product-list';
import ProductDetails from './product-details';
import CartSummary from './cart-summary';
import CheckoutForm from './checkout-form';
import Warning from './warning';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      view: {
        name: 'warning',
        params: {}
      },
      cart: []
    };
    this.setView = this.setView.bind(this);
    this.addToCart = this.addToCart.bind(this);
    this.deleteFromCart = this.deleteFromCart.bind(this);
    this.placeOrder = this.placeOrder.bind(this);
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

  deleteFromCart(productId) {
    fetch('/api/cart/', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ productId })
    })
      .then(() => {
        const newCart = this.state.cart.filter(product => product.productId !== productId);
        this.setState({ cart: newCart });
      })
      .catch(err => console.error(err));
  }

  placeOrder(order) {
    fetch('/api/orders/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: order.name,
        creditCard: order.card,
        shippingAddress: order.address
      })
    })
      .then(res => res.json())
      .then(data => {
        this.setState({ cart: [] });
        this.setView('catalog', {});
      })
      .catch(err => console.error(err));
  }

  render() {
    let currentView;
    if (this.state.view.name === 'warning') return <Warning setView={this.setView} />;
    else if (this.state.view.name === 'catalog') currentView = <ProductList setView={this.setView} />;
    else if (this.state.view.name === 'details') currentView = <ProductDetails details={this.state.view.params} setView={this.setView} addToCart={this.addToCart} />;
    else if (this.state.view.name === 'cart') currentView = <CartSummary cart={this.state.cart} deleteFromCart={this.deleteFromCart} setView={this.setView} />;
    else if (this.state.view.name === 'checkout') currentView = <CheckoutForm cart={this.state.cart} setView={this.setView} placeOrder={this.placeOrder} />;

    return (
      <React.Fragment>
        <Header cartItemCount={this.state.cart.length} setView={this.setView}/>
        {currentView}
      </React.Fragment>
    );
  }
}
