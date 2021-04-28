import React from 'react'
import { Link } from 'gatsby'
import styles from './navigation.module.css'
import conoLogoTagline from '../../static/cono-tagline.svg'

export default () => (
  <nav role="navigation">
    <div className={styles.navigation}>
      <h1 className={styles.hero}>
        <Link to="/">
          <img src={conoLogoTagline} alt="Comissiò Nocturna" />
        </Link>
      </h1>
      <div className={styles.navigationItem}>
        <Link activeClassName={styles.navigationItemActive} to="/">
          blog
        </Link>
      </div>
      <div className={styles.navigationItem}>
        <Link activeClassName={styles.navigationItemActive} to="/manifesto">
          manifesto
        </Link>
      </div>
    </div>
  </nav>
)
