import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import * as localHandler from '../services/addGetRemoveLocal';
import FormDetail from '../Components/FormDetail';

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
    const { title, thumbnail, price, id } = productDetails;
    return (
      <div>
        <Link to="/">Home</Link>
        <p data-testid="product-detail-name">{title}</p>
        <img
          data-testid="product-detail-image"
          src={ thumbnail }
          alt={ title }
        />
        <p data-testid="product-detail-price">{price}</p>
        <Link data-testid="shopping-cart-button" to="/Cart">Carrinho</Link>
        <button
          onClick={ () => localHandler.saveProduct(productDetails) }
          type="button"
          data-testid="product-detail-add-to-cart"
        >
          Adicionar ao carrinho
        </button>
        <div>
          <FormDetail productDetails={ id } />
        </div>
      </div>
    );
  }
}

DetailProduct.propTypes = {
  match: PropTypes.objectOf(PropTypes.object),
  id: PropTypes.string.isRequired,
}.isRequired;

export default (DetailProduct);
