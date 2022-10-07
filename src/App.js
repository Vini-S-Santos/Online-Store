import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom/';
import Home from './Pages/Home';
import './App.css';
import Cart from './Pages/Cart';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={ Home } />
        <Route exact path="/Cart" component={ Cart } />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
