import React from 'react';
import { Link } from 'react-router-dom';
import * as api from '../services/api';

class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      categories: [],
    };
  }

  componentDidMount() {
    this.fetchInitialProducts();
  }

  fetchInitialProducts = async () => {
    const apiResult = await api.getCategories();
    this.setState({
      categories: apiResult,
    });
  };

  render() {
    const { categories } = this.state;
    return (
      <div data-testid="home-initial-message">
        <p>Digite algum termo de pesquisa ou escolha uma categoria.</p>
        <Link data-testid="shopping-cart-button" to="/Cart">Carrinho</Link>
        <div>
          {categories.map((category, index) => (
            <label key={ index } htmlFor={ category.id }>
              <input
                data-testid="category"
                type="checkbox"
                // onChange={ handlecheck }
                name="category"
                id={ category.id }
              />
              {category.name}
            </label>
          ))}
        </div>
      </div>
    );
  }
}

export default Home;
