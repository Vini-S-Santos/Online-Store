import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import * as localHandler from '../services/addGetRemoveLocal';

class CardProducts extends React.Component {
  render() {
    const { products, headerFunc } = this.props;
    const {
      price,
      title,
      thumbnail,
      id,
      permalink,
      shipping,
    } = products;
    return (
      <div data-testid="product" id={ id }>
        <hr />
        <a href={ permalink } target="_blank" rel="noreferrer">
          <h3>{title}</h3>
        </a>
        <img src={ thumbnail } alt={ title } width="150px" />
        <h4>{`R$${price}`}</h4>
        <Link to={ `/item/${id}` } data-testid="product-detail-link">
          Mais detalhes
        </Link>
        <br />
        {shipping.free_shipping && <h4 data-testid="free-shipping">Frete Gratis</h4>}
        <br />
        <button
          onClick={ () => { localHandler.saveProduct(products); headerFunc(); } }
          type="button"
          data-testid="product-add-to-cart"
        >
          Adicionar ao carrinho
        </button>
      </div>
    );
  }
}

export default CardProducts;

CardProducts.propTypes = {
  products: PropTypes.array,
  headerFunc: PropTypes.func,
}.isRequired;
