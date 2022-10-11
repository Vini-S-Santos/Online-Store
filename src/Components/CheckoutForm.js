import React, { Component } from 'react';
import PropTypes from 'prop-types';

class CheckoutForm extends Component {
  render() {
    const {
      fullname,
      email,
      cpf,
      phone,
      cep,
      address,
      handleOnChange,
      completePurchase,
    } = this.props;
    return (
      <form>
        <div>
          <label htmlFor="fullname">
            Fullname
            <input
              type="text"
              name="fullname"
              value={ fullname }
              onChange={ handleOnChange }
              data-testid="checkout-fullname"
              placeholder="fullname"
            />
          </label>
          <label htmlFor="email">
            Email
            <input
              type="email"
              name="email"
              value={ email }
              onChange={ handleOnChange }
              data-testid="checkout-email"
              placeholder="email"
            />
          </label>
        </div>
        <div>
          <label htmlFor="cpf">
            CPF
            <input
              type="text"
              name="cpf"
              value={ cpf }
              onChange={ handleOnChange }
              data-testid="checkout-cpf"
              placeholder="cpf"
            />
          </label>
          <label htmlFor="email">
            Phone
            <input
              type="text"
              name="phone"
              value={ phone }
              onChange={ handleOnChange }
              data-testid="checkout-phone"
              placeholder="phone"
            />
          </label>
        </div>
        <div>
          <label htmlFor="cep">
            CEP
            <input
              type="text"
              name="cep"
              value={ cep }
              onChange={ handleOnChange }
              data-testid="checkout-cep"
              placeholder="cep"
            />
          </label>
          <label htmlFor="address">
            Address
            <input
              type="text"
              name="address"
              value={ address }
              onChange={ handleOnChange }
              data-testid="checkout-address"
              placeholder="address"
            />
          </label>
        </div>
        <div>
          <label htmlFor="boleto">
            <input
              type="radio"
              name="payment"
              id="boleto"
              value="boleto"
              data-testid="ticket-payment"
              onChange={ handleOnChange }
            />
            &nbsp; Boleto
          </label>
          <label htmlFor="visa">
            <input
              type="radio"
              name="payment"
              id="visa"
              value="visa"
              data-testid="visa-payment"
              onChange={ handleOnChange }
            />
            &nbsp; Visa
          </label>
          <label htmlFor="master">
            <input
              type="radio"
              name="payment"
              id="master"
              value="master"
              data-testid="master-payment"
              onChange={ handleOnChange }
            />
            &nbsp; Master
          </label>
          <label htmlFor="elo">
            <input
              type="radio"
              name="payment"
              id="elo"
              value="elo"
              data-testid="elo-payment"
              onChange={ handleOnChange }
            />
            &nbsp; Elo
          </label>
        </div>
        <button
          type="button"
          data-testid="checkout-btn"
          onClick={ completePurchase }
        >
          Concluir Compra
        </button>
      </form>
    );
  }
}

CheckoutForm.propTypes = {
  fullname: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  cpf: PropTypes.string.isRequired,
  address: PropTypes.string.isRequired,
  cep: PropTypes.string.isRequired,
  phone: PropTypes.string.isRequired,
  handleOnChange: PropTypes.func.isRequired,
  completePurchase: PropTypes.func.isRequired,
};

export default CheckoutForm;
