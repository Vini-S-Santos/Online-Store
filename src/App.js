import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom/';
import Home from './Pages/Home';
import './App.css';
import Cart from './Pages/Cart';
import DetailProduct from './Pages/DetailProduct';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={ Home } />
        <Route exact path="/Cart" component={ Cart } />
        <Route exact path="/item/:id" component={ DetailProduct } />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
