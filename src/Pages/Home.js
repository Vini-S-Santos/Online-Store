import React from 'react';
import { Link } from 'react-router-dom';

class Home extends React.Component {
  render() {
    return (
      <div data-testid="home-initial-message">
        <p>Digite algum termo de pesquisa ou escolha uma categoria.</p>
        <Link data-testid="shopping-cart-button" to="/Cart">Carrinho</Link>
      </div>
    );
  }
}

export default Home;
