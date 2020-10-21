import React from 'react'
import Container from './container'
import Navigation from './navigation'
import base from './base.css'
import styles from './layout.module.css'
import conoLogo from '../../static/cono.svg'
import conoLogoTagline from '../../static/cono-tagline.svg'

class Template extends React.Component {
  render() {
    const { location, children } = this.props
    let header

    let rootPath = `/`
    if (typeof __PREFIX_PATHS__ !== `undefined` && __PREFIX_PATHS__) {
      rootPath = __PATH_PREFIX__ + `/`
    }

    return (
      <>
        <Navigation />
        <h1 className={styles.hero}>
          <img src={conoLogoTagline} alt="Comissiò Nocturna" />
        </h1>
        <Container>{children}</Container>
        <footer>
          <div>
            <img style={{ width: '150px', margin: '4rem auto' }} src={conoLogo} alt="comissiò nocturna" />
          </div>
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
