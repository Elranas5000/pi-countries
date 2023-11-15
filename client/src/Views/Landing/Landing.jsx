import React from 'react'
import { Link } from 'react-router-dom';
import styles from "../Landing/Landing.module.css"

const Landing = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Countries SPA</h1>
      <Link to="/home">
        <button className={styles.button}>
          Ingresar
        </button>
      </Link>
    </div>
  )
}

export default Landing;