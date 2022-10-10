import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as localHandler from '../services/addGetRemoveLocal';

class ItemsCart extends Component {
  constructor() {
    super();
    this.state = {
      quantity: 1,
    };
  }

  addRemoveQuantity = ({ target }) => {
    const { quantity } = this.state;
    const operator = target.name;
    if (operator === 'sum') {
      this.setState({ quantity: quantity + 1 });
    } else if (operator === 'sub') {
      if (quantity > 1) {
        this.setState({ quantity: quantity - 1 });
      } else {
        this.setState({ quantity: 1 });
      }
    }
  };

  removeFromCart = () => {
    const { refresh, data: { id } } = this.props;
    localHandler.removeProductById(id);
    refresh();
  };

  render() {
    const { data: { price, title, thumbnail, id } } = this.props;
    const { quantity } = this.state;
    return (
      <div key={ id }>
        <hr />
        <h3 data-testid="shopping-cart-product-name">{title}</h3>
        <img src={ thumbnail } alt={ title } width="150px" />
        <h4>{ price }</h4>
        <p data-testid="shopping-cart-product-quantity">{ quantity }</p>
        <section id={ id }>
          <button
            name="sum"
            data-testid="product-increase-quantity"
            type="button"
            onClick={ this.addRemoveQuantity }
          >
            +
          </button>
          <button
            name="sub"
            data-testid="product-decrease-quantity"
            type="button"
            onClick={ this.addRemoveQuantity }
          >
            -
          </button>
          <button
            data-testid="remove-product"
            type="button"
            onClick={ this.removeFromCart }
          >
            Remover do carrinho
          </button>
        </section>
      </div>
    );
  }
}

ItemsCart.propTypes = {
  data: PropTypes.object,
}.isRequired;

export default ItemsCart;
