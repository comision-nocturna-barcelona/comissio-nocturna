import React from 'react'
import { Link } from 'gatsby'

import Container from './container'
import Navigation from './navigation'
import base from './base.css'
import styles from './layout.module.css'
import navStyles from './navigation.module.css'
import conoLogo from '../../static/cono.svg'
import conoLogoTagline from '../../static/cono-tagline.svg'

class Template extends React.Component {
  render() {
    const { location, children } = this.props

    let rootPath = `/`
    if (typeof __PREFIX_PATHS__ !== `undefined` && __PREFIX_PATHS__) {
      rootPath = __PATH_PREFIX__ + `/`
    }

    return (
      <>
        <nav role="navigation">
          <div className={navStyles.navigation}>
            <h1 className={navStyles.hero}>
              <Link to="/">
                <img src={conoLogoTagline} alt="Comissiò Nocturna" />
              </Link>
            </h1>
            <div className={navStyles.navigationItem}>
              <Link activeClassName={navStyles.navigationItemActive} to="/">
                blog
              </Link>
            </div>
            <div className={navStyles.navigationItem}>
              <Link activeClassName={navStyles.navigationItemActive} to="/manifesto">
                manifesto
              </Link>
            </div>
          </div>
        </nav>
        <Container>{children}</Container>
        <footer>
          <div>
            <img style={{ width: '9.3rem', margin: '4rem auto 1rem' }} src={conoLogo} alt="comissiò nocturna" />
          </div>
          <p
            style={{
              fontSize: '1.4rem',
              fontWeight: '1  00',
              marginBottom: '5rem',
              fontFamily: `'PT Serif', sans-serif`,
              color: 'white',
            }}
          >
            Perquè la nit és cultura. Carpe Noctem.
          </p>
          <div style={{ display: 'flex', width: '20rem', justifyContent: 'space-between', marginBottom: '2rem' }}>
            <a href="https://instagram.com/comissio.nocturna" target="_blank">
              INSTAGRAM
            </a>
            <a href="https://twitter.com/comissiobcn" target="_blank">
              TWITTER
            </a>
            <a href="https://www.facebook.com/comissionocturna.bcn/" target="_blank">
              FACEBOOK
            </a>
          </div>
          <a href="mailto:hola@comissionocturna.org" target="_blank">
            hola@comissionocturna.org
          </a>
        </footer>
      </>
    )
  }
}

export default Template
