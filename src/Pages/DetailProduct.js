import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import * as localHandler from '../services/addGetRemoveLocal';

class DetailProduct extends React.Component {
  constructor() {
    super();
    this.state = {
      productDetails: [],
    };
  }

  componentDidMount() {
    this.fetchItemDetails();
  }

  fetchItemDetails = async () => {
    const { match: { params: { id } } } = this.props;
    const urlFetch = await fetch(`https://api.mercadolibre.com/items/${id}`);
    const details = await urlFetch.json();
    this.setState({
      productDetails: details,
    });
  };

  render() {
    const { productDetails } = this.state;
    return (
      <div>
        <Link to="/">Home</Link>
        <p data-testid="product-detail-name">{productDetails.title}</p>
        <img
          data-testid="product-detail-image"
          src={ productDetails.thumbnail }
          alt={ productDetails.title }
        />
        <p data-testid="product-detail-price">{productDetails.price}</p>
        <Link data-testid="shopping-cart-button" to="/Cart">Carrinho</Link>
        <button
          onClick={ () => localHandler.saveProduct(productDetails) }
          type="button"
          data-testid="product-detail-add-to-cart"
        >
          Adicionar ao carrinho
        </button>
      </div>
    );
  }
}

DetailProduct.propTypes = {
  match: PropTypes.objectOf(PropTypes.object),
}.isRequired;

export default (DetailProduct);
