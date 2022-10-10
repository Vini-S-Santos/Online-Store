import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as localHandler from '../services/addGetRemoveLocal';
import ItemsCart from '../Components/ItemsCart';

class Cart extends Component {
  refreshComponent = () => {
    this.forceUpdate();
  };

  render() {
    const shoppingCart = localHandler.getProducts();
    // console.log(shoppingCart);
    const emptyCart = (
      <h2 data-testid="shopping-cart-empty-message">
        Seu carrinho está vazio
      </h2>
    );

    return (
      <section>
        <Link to="/">Home</Link>
        <div>
          {shoppingCart.length === 0 ? emptyCart
            : shoppingCart.map((item, index) => (
              <ItemsCart
                key={ index }
                data={ item }
                refresh={ this.refreshComponent }
              />))}
        </div>
      </section>
    );
  }
}

export default Cart;
