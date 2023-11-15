import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import thunk from 'redux-thunk';
import rootReducer from './Redux/reducers/index';
import Home from "./Views/Home/Home"
import Landing from './Views/Landing/Landing';

const store = createStore(rootReducer, applyMiddleware(thunk));

const App = () => {
  return (
    <div className='app'>
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path='/' Component={Landing}/>
            <Route path='/home' Component={Home}/>
          </Routes>
        </BrowserRouter>
      </Provider>
    </div>
  );
};

export default App;

