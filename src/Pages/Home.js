import React from 'react';
import CardProducts from '../Components/CardProducts';
import Header from '../Components/Header';
import * as api from '../services/api';

class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      categories: [],
      products: [],
      headerFunc: '',
    };
  }

  componentDidMount() {
    this.fetchCategory();
    this.fetchProducts();
  }

  fetchCategory = async () => {
    const apiResult = await api.getCategories();
    this.setState({
      categories: apiResult,
    });
  };

  fetchProducts = async () => {
    const products = await api.getProductsFromCategoryAndQuery();
    this.setState({
      products: products.results,
    });
  };

  getHeaderState = (func) => {
    this.setState({ headerFunc: func });
  };

  render() {
    const { categories, products, headerFunc } = this.state;
    return (
      <div data-testid="home-initial-message">
        <div>
          <Header getHeaderState={ this.getHeaderState } />
          <input
            type="text"
            data-testid="query-input"
          />
          <button
            type="button"
            data-testid="query-button"
          >
            Buscar
          </button>
          <p>Digite algum termo de pesquisa ou escolha uma categoria.</p>
        </div>
        <div>
          {categories.map((category, index) => (
            <label key={ index } htmlFor={ category.id }>
              <input
                data-testid="category"
                type="checkbox"
                name="category"
                id={ category.id }
              />
              {category.name}
            </label>
          ))}
        </div>
        <div>
          {products.length === 0 ? <p>Nenhum produto foi encontrado</p>
            : products.map((product, index) => (
              <CardProducts
                key={ index }
                products={ product }
                headerFunc={ headerFunc }
              />
            ))}
        </div>
      </div>
    );
  }
}

export default Home;
