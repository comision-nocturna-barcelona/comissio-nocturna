import React from 'react'
import { Link } from 'gatsby'
import styles from './navigation.module.css'
import conoLogoTagline from '../../static/cono-tagline.svg'

export default () => (
  <nav role="navigation">
    <ul className={styles.navigation}>
      <Link to="/">
        <h1 className={styles.hero}>
          <img src={conoLogoTagline} alt="Comissiò Nocturna" />
        </h1>
      </Link>
      <li className={styles.navigationItem}>
        <Link activeClassName={styles.navigationItemActive} to="/">
          <span>articles</span>
        </Link>
      </li>
      <li className={styles.navigationItem}>
        <Link activeClassName={styles.navigationItemActive} to="/manifesto">
          manifesto
        </Link>
      </li>
    </ul>
  </nav>
)
