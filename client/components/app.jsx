/* eslint-disable no-console */
import React from 'react';
import Header from './header';
import ProductList from './product-list';
import ProductDetails from './product-details';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      view: {
        name: 'catalog',
        params: {}
      }
    };
    this.setView = this.setView.bind(this);
    this.checkView = this.checkView.bind(this);
  }

  checkView() {
    console.log(this.state);
  }

  setView(name, params) {
    this.setState({ view: { name, params } }, this.checkView);
  }

  render() {
    return (
      <React.Fragment>
        <Header />
        {this.state.view.name === 'catalog'
          ? <ProductList setView={this.setView} />
          : <ProductDetails details={this.state.view.params} setView={this.setView} />}
      </React.Fragment>
    );
  }
}
