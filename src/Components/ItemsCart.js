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

  componentDidMount() {
    const { data } = this.props;
    console.log(data.available_quantity);
  }

  limitQuantity = (object) => {
    const { available_quantity: availableQuantity, id } = object;
    const localQuantity = localStorage.getItem(`r${id}`);
    const verifyQuantity = availableQuantity > localQuantity;
    return verifyQuantity;
  };

  increaseCounter = () => {
    const { data } = this.props;
    const verify = this.limitQuantity(data);
    this.setState((prev) => ({
      quantity: verify ? prev.quantity + 1 : prev.quantity,
    }), () => {
      const { quantity } = this.state;
      localStorage.setItem(`r${data.id}`, quantity);
      this.addRemoveQuantity('sum');
    });
  };

  decreaseCounter = () => {
    const { data } = this.props;
    const { quantity } = this.state;
    localStorage.setItem(`r${data.id}`, quantity);
    this.addRemoveQuantity('sub');
  };

  addRemoveQuantity = (target) => {
    const { quantity } = this.state;
    if (target === 'sum') {
      this.setState((prev) => ({ quantity: prev.quantity }));
    } else if (target === 'sub') {
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
            onClick={ this.increaseCounter }
          >
            +
          </button>
          <button
            name="sub"
            data-testid="product-decrease-quantity"
            type="button"
            onClick={ this.decreaseCounter }
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
