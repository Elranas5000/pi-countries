import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from "./Views/Home/Home"
import Landing from './Views/Landing/Landing';
import Details from './Views/Details/Details';
import Form from './Views/Form/Form';
import Delete from './Views/Delete/Delete';
import {store} from "./Redux/store/store" //me traigo al store para "proveer" a mis rutas de su informacion

//este archivo se encarga de renderizar todos los comps de mi app.
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
            <Route path='/delete' element={<Delete/>} />
          </Routes>
        </BrowserRouter>
      </Provider>
    </div>
  );
};

export default App;


