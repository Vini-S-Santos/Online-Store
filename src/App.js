import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom/';
import Home from './Pages/Home';
import './App.css';
import Cart from './Pages/Cart';
import DetailProduct from './Pages/DetailProduct';
import Checkout from './Pages/Checkout';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={ Home } />
        <Route exact path="/Cart" component={ Cart } />
        <Route exact path="/item/:id" component={ DetailProduct } />
        <Route exact patch="Checkout" component={ Checkout } />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
