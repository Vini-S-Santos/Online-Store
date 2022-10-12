import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import * as localHandler from '../services/addGetRemoveLocal';
import Header from '../Components/Header';

class DetailProduct extends React.Component {
  constructor() {
    super();
    this.state = {
      productDetails: [],
      email: '',
      rate: '',
      text: '',
      validate: false,
      information: [],
      headerFunc: '',
    };
  }

  componentDidMount() {
    this.fetchItemDetails();
    this.getLocalStorage();
  }

  fetchItemDetails = async () => {
    const { match: { params: { id } } } = this.props;
    const urlFetch = await fetch(`https://api.mercadolibre.com/items/${id}`);
    const details = await urlFetch.json();
    this.setState({
      productDetails: details,
    });
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  getLocalStorage = () => {
    const { match: { params: { id } } } = this.props;
    const getItems = JSON.parse(localStorage.getItem(id) || '[]');
    this.setState({
      information: getItems,
    });
  };

  validation = () => {
    const { email, rate, text } = this.state;
    const regex = /\S+@\S+\.\S+/;
    const emailValidation = regex.test(email);
    if (!emailValidation || rate.length === 0) {
      this.setState({
        validate: true,
      });
    } else {
      this.saveLocalStorage(email, rate, text);
      this.setState({
        email: '',
        text: '',
        validate: false,
      });
    }
  };

  saveLocalStorage = (email, rate, text) => {
    const { match: { params: { id } } } = this.props;
    const { information } = this.state;
    const ids = {
      email,
      rate,
      text,
    };
    const newObject = [...information, ids];
    this.setState({
      information: newObject,
    });
    localStorage.setItem(id, JSON.stringify(newObject));
  };

  getHeaderState = (func) => {
    this.setState({ headerFunc: func });
  };

  render() {
    const { productDetails, validate, email, information, text, headerFunc } = this.state;
    const { title, thumbnail, price } = productDetails;
    return (
      <div>
        <Header getHeaderState={ this.getHeaderState } />
        <Link to="/">Home</Link>
        <p data-testid="product-detail-name">{title}</p>
        <img
          data-testid="product-detail-image"
          src={ thumbnail }
          alt={ title }
        />
        <p data-testid="product-detail-price">{price}</p>
        <button
          onClick={ () => { localHandler.saveProduct(productDetails); headerFunc(); } }
          type="button"
          data-testid="product-detail-add-to-cart"
        >
          Adicionar ao carrinho
        </button>
        <div>
          <form>
            <label htmlFor="mail">
              <input
                type="email"
                name="email"
                id="mail"
                value={ email }
                data-testid="product-detail-email"
                onChange={ this.handleChange }
              />
            </label>

            <input
              type="radio"
              name="rate"
              id=""
              value="1"
              data-testid="1-rating"
              onChange={ this.handleChange }
            />
            <input
              type="radio"
              name="rate"
              id=""
              value="2"
              data-testid="2-rating"
              onChange={ this.handleChange }
            />
            <input
              type="radio"
              name="rate"
              id=""
              value="3"
              data-testid="3-rating"
              onChange={ this.handleChange }
            />
            <input
              type="radio"
              name="rate"
              id=""
              value="4"
              data-testid="4-rating"
              onChange={ this.handleChange }
            />

            <input
              type="radio"
              name="rate"
              id=""
              value="5"
              data-testid="5-rating"
              onChange={ this.handleChange }
            />

            <textarea
              name="text"
              id=""
              cols="30"
              rows="5"
              value={ text }
              data-testid="product-detail-evaluation"
              onChange={ this.handleChange }
            />

            <button
              type="button"
              data-testid="submit-review-btn"
              onClick={ this.validation }
            >
              Enviar
            </button>
            {validate && <p data-testid="error-msg">Campos inválidos</p>}
          </form>
          {information.map((item, index) => (
            <div key={ index }>
              <p data-testid="review-card-email">{item.email}</p>
              <p data-testid="review-card-evaluation">{item.text}</p>
              <p data-testid="review-card-rating">{item.rate}</p>
            </div>
          ))}
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
