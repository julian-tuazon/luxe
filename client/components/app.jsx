import React from 'react';
import Header from './header';
import ProductList from './product-list';
import ProductDetails from './product-details';
import CartSummary from './cart-summary';
import CheckoutForm from './checkout-form';
import Warning from './warning';
import OrderConfirmation from './order-confirmation';
import Footer from './footer';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      view: {
        name: 'warning',
        params: {}
      },
      cart: [],
      canClick: true
    };
    this.setView = this.setView.bind(this);
    this.addToCart = this.addToCart.bind(this);
    this.deleteFromCart = this.deleteFromCart.bind(this);
    this.updateQuantity = this.updateQuantity.bind(this);
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
    this.setState({ canClick: false }, () => {
      fetch('/api/cart/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(product)
      })
        .then(res => res.json())
        .then(data => {
          const isInCart = this.state.cart.some(cartItem => cartItem.productId === data.productId);
          if (!isInCart) this.setState({ cart: [...this.state.cart, data], canClick: true });
          else {
            const newCart = [...this.state.cart];
            const index = newCart.findIndex(cartItem => cartItem.productId === data.productId);
            newCart[index] = data;
            this.setState({ cart: newCart, canClick: true });
          }
        })
        .catch(err => {
          this.setState({ canClick: true });
          console.error(err);
        });
    });
  }

  deleteFromCart(productId) {
    fetch('/api/cart/', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ productId })
    })
      .then(() => {
        const newCart = this.state.cart.filter(cartItem => cartItem.productId !== productId);
        this.setState({ cart: newCart });
      })
      .catch(err => console.error(err));
  }

  updateQuantity(productId, quantity) {
    this.setState({ canClick: false }, () => {
      fetch('/api/cart/', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId, quantity })
      })
        .then(res => res.json())
        .then(data => {
          const newCart = [...this.state.cart];
          const index = newCart.findIndex(cartItem => cartItem.productId === data.productId);
          newCart[index].quantity = data.quantity;
          this.setState({ cart: newCart, canClick: true });
        })
        .catch(err => {
          this.setState({ canClick: true });
          console.error(err);
        });
    });
  }

  placeOrder(order) {
    fetch('/api/orders/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: order.name,
        creditCard: order.card,
        shippingAddress: order.address,
        city: order.city,
        state: order.state,
        zipCode: order.zipCode
      })
    })
      .then(res => res.json())
      .then(data => {
        this.setState({ cart: [] });
        this.setView('confirmation', order);
      })
      .catch(err => console.error(err));
  }

  render() {
    let currentView;
    if (this.state.view.name === 'warning') return <Warning setView={this.setView} />;
    else if (this.state.view.name === 'catalog') currentView = <ProductList setView={this.setView} />;
    else if (this.state.view.name === 'details') currentView = <ProductDetails details={this.state.view.params} setView={this.setView} addToCart={this.addToCart} cart={this.state.cart} canClick={this.state.canClick} />;
    else if (this.state.view.name === 'cart') currentView = <CartSummary cart={this.state.cart} deleteFromCart={this.deleteFromCart} updateQuantity={this.updateQuantity} canClick={this.state.canClick} setView={this.setView} />;
    else if (this.state.view.name === 'checkout') currentView = <CheckoutForm cart={this.state.cart} setView={this.setView} placeOrder={this.placeOrder} />;
    else if (this.state.view.name === 'confirmation') currentView = <OrderConfirmation setView={this.setView} info={this.state.view.params}/>;

    return (
      <React.Fragment>
        <Header cart={this.state.cart} setView={this.setView}/>
        <div className="stretch-wrapper mt-5 pt-5">
          <div className="stretch-content mt-4">
            {currentView}
          </div>
          <Footer />
        </div>
      </React.Fragment>
    );
  }
}
