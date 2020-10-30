import React, { useState } from 'react'
import { graphql } from 'gatsby'
import get from 'lodash/get'
import Helmet from 'react-helmet'
import Layout from '../components/layout'
import styles from './language-selector.module.css'

import renderOptions from '../components/renderOptions'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'

function RootIndex({ data, location }) {
  const siteTitle = get(data, 'site.siteMetadata.title')
  const ca = get(data, 'manifestoCA.edges[0].node')
  const en = get(data, 'manifestoEN.edges[0].node')

  const [currLang, setCurrLang] = useState('en')
  const manifesto = {
    ca,
    en,
  }

  return (
    <Layout location={location}>
      <div>
        <Helmet>
          <title>MANIFESTO ⚪️ Comissió Nocturna ⚪️ Barcelona</title>
          <meta property="og:title" content="MANIFESTO • Comissió Nocturna • Barcelona" />
          <meta property="og:image" content="https://comissionocturna.org/cono-splash.png" />
          <meta property="og:type" content="organisation" />
          <meta
            property="og:description "
            content="We want Barcelona to have a Night Comission. An independent non-profit organization which aims to ensure that Barcelona nightlife continues to be considered part of the city cultural expressions and interests."
          />
        </Helmet>
        <div className={styles.languageSelector}>
          <div className={styles.control}>
            <label htmlFor="language-selector" style={{ verticalAlign: 'top', position: 'absolute' }}>
              <svg
                className={styles.svg}
                viewBox="0 0 846.66 1058.325"
                x="0px"
                y="0px"
                fillRule="evenodd"
                clipRule="evenodd"
              >
                <g fill="#ffffff">
                  <path d="M593.26 263.93c131.8,0 238.65,106.85 238.65,238.64 0,131.8 -106.85,238.65 -238.65,238.65 -113,0 -207.65,-78.56 -232.35,-184.03 -32.31,16.33 -68.83,25.54 -107.51,25.54 -131.8,0 -238.64,-106.85 -238.64,-238.64 0,-131.8 106.84,-238.65 238.64,-238.65 113.01,0 207.66,78.56 232.36,184.03 32.3,-16.33 68.83,-25.54 107.5,-25.54zm-236.78 78.27l57.4 -33.14 0 16.56c37.24,1.02 83.03,12.03 87.82,83.7 -20.01,-41.51 -53.91,-52.85 -87.82,-50.55l0 16.57 -57.4 -33.14zm159.36 94.45l-57.41 33.14 0 -16.57c-37.24,-1.02 -83.03,-12.02 -87.82,-83.69 20.02,41.51 53.91,52.85 87.82,50.55l0 -16.57 57.41 33.14zm-197.92 -160.91c-2.34,45.92 -19.2,90.68 -51.8,123.67 21.5,22.71 45.09,32.73 75.32,38.02l-6.63 37.97c-39.81,-7.05 -71.29,-21.6 -98.88,-51.95 -20.55,12.66 -40.22,18.72 -63.93,22.87l-6.62 -37.94c17.81,-3.12 32.11,-7.04 48,-16.31 -17.56,-31.25 -24,-63.07 -24.85,-98.67 12.79,-0.33 25.61,-0.62 38.4,-0.94 0.64,26.85 4.64,50.49 16.75,74.63 22.22,-25.19 33.67,-58.07 35.78,-91.35l-118.22 0c0,-12.96 0,-25.93 0,-38.89l68.66 0 0 -24.08c15.67,0 31.34,0 47.02,0l0 24.08 68.65 0c0,12.96 0,25.93 0,38.89l-27.65 0zm251.02 101.7c14.25,0 28.5,0 42.75,0l101.9 250.26c-16.28,0 -32.54,0 -48.82,0l-27.58 -72.24 -92.13 0 -25.85 72.24c-15.42,0 -30.85,0 -46.28,0l96.01 -250.26zm-10.23 140.51l64.11 0c-11.17,-29.24 -22.72,-58.44 -32.66,-88.12 -8.38,29.93 -20.28,59.06 -31.45,88.12z" />
                </g>
              </svg>
            </label>
            <select
              id="language-selector"
              name="language-selector"
              onChange={e => setCurrLang(e.currentTarget.value)}
              className={styles.select}
              value={currLang}
            >
              <option value="ca">ca</option>
              <option value="en">en</option>
            </select>
          </div>
        </div>
        <div className="wrapper">
          <section id="section-intro">
            {documentToReactComponents(manifesto[currLang].intro.json, renderOptions)}
          </section>
          <section id="section-body" className="article-paragraphs">
            {documentToReactComponents(manifesto[currLang].body.json, renderOptions)}
          </section>
        </div>
      </div>
    </Layout>
  )
}

export default RootIndex

export const pageQuery = graphql`
  {
    site {
      siteMetadata {
        title
      }
    }
    manifestoCA: allContentfulManifesto(filter: { node_locale: { eq: "ca" } }) {
      edges {
        node {
          id
          title
          intro {
            json
          }
          body {
            json
          }
          createdAt(fromNow: true, locale: "ca")
          node_locale
        }
      }
    }
    manifestoEN: allContentfulManifesto(filter: { node_locale: { eq: "en-GB" } }) {
      edges {
        node {
          id
          title
          intro {
            json
          }
          body {
            json
          }
          createdAt(fromNow: true, locale: "en-GB")
          node_locale
        }
      }
    }
  }
`
