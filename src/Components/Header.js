import { PropTypes } from 'prop-types';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as localHandler from '../services/addGetRemoveLocal';

export default class Header extends Component {
  state = {
    amount: 0,
  };

  componentDidMount() {
    const getAmount = localHandler.getProducts() === null
      ? 0 : localHandler.getProducts().length;
    this.setState({ amount: getAmount });
    const { getHeaderState } = this.props;
    getHeaderState(this.setAmount);
  }

  setAmount = () => {
    const getAmount = localHandler.getProducts() === null
      ? 0 : localHandler.getProducts().length;
    this.setState({ amount: getAmount });
  };

  render() {
    const { amount } = this.state;
    return (
      <div>
        <h1>Página Inicial</h1>
        <Link to="/cart" data-testid="shopping-cart-button">
          <div hidden>{ 'Carrinho de compras ' }</div>
          🛒

          <span data-testid="shopping-cart-size">{amount}</span>
        </Link>
      </div>
    );
  }
}

Header.propTypes = {
  getHeaderState: PropTypes.func.isRequired,
};
