import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import thunk from 'redux-thunk';
import rootReducer from './Redux/reducers/index';
import Home from "./Views/Home/Home"
import Landing from './Views/Landing/Landing';
import Details from './Views/Details/Details';
import Form from './Views/Form/Form';

const store = createStore(rootReducer, applyMiddleware(thunk));

const App = () => {
  return (
    <div className='app'>
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Landing />} />
            <Route path='/home' element={<Home />} />
            <Route path='/home/:idPais' element={<Details />} />
            <Route path='/form' element={<Form/>} />
          </Routes>
        </BrowserRouter>
      </Provider>
    </div>
  );
};

export default App;


