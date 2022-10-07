import React from 'react';
import PropTypes from 'prop-types';

class CardProducts extends React.Component {
  render() {
    const { products } = this.props;
    return (
      <div>
        <div data-testid="product">
          <a href={ products.permalink } target="_blank" rel="noreferrer">
            <p>{products.title}</p>
          </a>
          <img src={ products.thumbnail } alt={ products.title } width="175px" />
          <p>{ `R$${products.price}` }</p>
        </div>
        <p data-testid="shopping-cart-empty-message">Seu carrinho está vazio</p>
      </div>
    );
  }
}

export default CardProducts;

CardProducts.propTypes = {
  products: PropTypes.array,
}.isRequired;
