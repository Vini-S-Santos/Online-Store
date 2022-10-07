import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

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
      </div>
    );
  }
}

DetailProduct.propTypes = {
  match: PropTypes.objectOf(PropTypes.object),
}.isRequired;

export default (DetailProduct);
