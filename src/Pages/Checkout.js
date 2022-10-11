import React, { Component } from 'react';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import CheckoutForm from '../Components/CheckoutForm';

class Checkout extends Component {
  state = {
    cart: (!JSON.parse(localStorage.getItem('cartItems'))
      ? []
      : JSON.parse(localStorage.getItem('cartItems'))),
    fullname: '',
    email: '',
    cpf: '',
    phone: '',
    cep: '',
    address: '',
    payment: false,
    showMessage: false,
  };

  validateForm = ({ fullname, email, cpf, phone, cep, address } = this.state) => {
    const { payment } = this.state;
    const arrayInputs = [fullname, email, cpf, phone, cep, address];
    return arrayInputs.some((input) => input.length === 0 || !payment);
  };

  handleOnChange = ({ target }) => {
    const name = target.type === 'radio' ? 'payment' : target.name;
    const value = target.type === 'radio' ? target.checked : target.value;
    this.setState({ [name]: value });
  };

  completePurchase = () => {
    if (this.validateForm()) {
      return this.setState({ showMessage: true });
    }
    localStorage.setItem('cartItems', JSON.stringify([]));
    const { history } = this.props;
    return history.push('/');
  };

  render() {
    const {
      cart,
      fullname,
      email,
      cpf,
      phone,
      cep,
      address,
      showMessage,
    } = this.state;
    return (
      <section>
        <div>
          <div>
            {cart.map(({ title, thumbnail, price, orderQuantity, id }) => (
              <div
                key={ id }
              >
                <div>
                  <img
                    src={ thumbnail }
                    alt={ title }
                    width="150px"
                  />
                </div>
                <div>
                  <div
                    data-testid="shopping-cart-product-name"
                  >
                    {title}
                  </div>
                  <div>
                    <p data-testid="shopping-cart-product-quantity">
                      { orderQuantity }
                    </p>
                    {`R$ ${price}`}
                  </div>
                </div>
                <hr />
              </div>
            )) }
          </div>
          <div>
            <CheckoutForm
              fullname={ fullname }
              email={ email }
              cpf={ cpf }
              phone={ phone }
              cep={ cep }
              address={ address }
              handleOnChange={ this.handleOnChange }
              completePurchase={ this.completePurchase }
            />
            {showMessage
              && (
                <p
                  data-testid="error-msg"
                >
                  Campos inválidos
                </p>
              )}
          </div>
        </div>
      </section>

    );
  }
}
Checkout.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default withRouter(Checkout);
