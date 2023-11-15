import React from 'react';
import Cards from "../../Components/Cards/Cards";
import { useSelector } from 'react-redux';
import NavBar from '../../Components/NavBar/NavBar';
import { Link, Route, Routes } from 'react-router-dom';
import Details from '../Details/Details';

const Home = () => {
  const countries = useSelector((state) => state.countries);

  return (
    <div>
      <h1>Welcome to the Countries SPA</h1>
      <NavBar />
      <Cards />
    </div>
  );
};

export default Home;

