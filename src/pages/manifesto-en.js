import React, { useState } from 'react'
import { graphql } from 'gatsby'
import get from 'lodash/get'
import Helmet from 'react-helmet'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'

import Layout from '../components/layout'
import LanguageSelector from '../components/language-selector'
import renderOptions from '../components/renderOptions'

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
          <title>MANIFESTO • Comissió Nocturna • Barcelona</title>
          <meta property="og:title" content="MANIFESTO • Comissió Nocturna • Barcelona" />
          <meta property="og:image" content="https://comissionocturna.org/cono-splash.png" />
          <meta property="og:type" content="organisation" />
          <meta
            property="og:description "
            content="We want Barcelona to have a Night Comission. An independent non-profit organization which aims to ensure that Barcelona nightlife continues to be considered part of the city cultural expressions and interests."
          />
        </Helmet>
        <LanguageSelector onChange={newLang => setCurrLang(newLang)} value={currLang} />
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
