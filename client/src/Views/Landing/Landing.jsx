import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Landing.module.css';
import image from '../../assets/world_map.png';

const Landing = () => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.title}>Countries SPA</h1>
        <p className={styles.description}>
          <p>
            Welcome to the countries Single Page Application.
          </p>
      
          <p>
            This app uses React, redux, node, express and sequelize to show you countries information, feel free to explore the app.
          </p>

        </p>
        <Link to="/home">
          <button className={styles.button}>Enter</button>
        </Link>
      </div>
      <img src={image} alt="worldMapImg" className={styles.worldImg} />
    </div>
  );
};

export default Landing;
