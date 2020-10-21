import React from 'react'
import { Link } from 'gatsby'
import styles from './navigation.module.css'

export default () => (
  <nav role="navigation">
    <ul className={styles.navigation}>
      <li className={styles.navigationItem}>
        <Link to="/">news</Link>
      </li>
      <li className={styles.navigationItem}>
        <Link to="/manifesto">manifesto</Link>
      </li>
    </ul>
  </nav>
)
