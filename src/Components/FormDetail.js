import React, { Component } from 'react';
import PropTypes from 'prop-types';

class FormDetail extends Component {
  state = {
    email: '',
    rate: '',
    text: '',
    validate: false,
    information: [],
  };

  componentDidMount() {
    this.getLocalStorage();
    console.log(this.state.information);
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
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
    const { productDetails } = this.props;
    const { information } = this.state;
    const id = {
      email,
      rate,
      text,
    };
    const object = [...information, id];
    this.setState({
      information: object,
    });
    localStorage.setItem(productDetails, JSON.stringify(object));
  };

  getLocalStorage = () => {
    const { productDetails } = this.props;
    const getItems = JSON.parse(localStorage.getItem(productDetails) || '[]');
    this.setState({
      information: getItems,
    });
  };

  render() {
    const { validate, email, information, text } = this.state;
    return (
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
        {
          information.map((item, index) => (
            <div key={ index }>
              <p data-testid="review-card-email">{item.email}</p>
              <p data-testid="review-card-evaluation">{item.text}</p>
              <p data-testid="review-card-rating">{item.rate}</p>
            </div>
          ))
        }
      </div>
    );
  }
}

FormDetail.propTypes = {
  productDetails: PropTypes.string,
}.isRequired;

export default FormDetail;
