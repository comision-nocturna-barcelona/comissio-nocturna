import React from 'react'
import { graphql } from 'gatsby'
import get from 'lodash/get'
import Helmet from 'react-helmet'
import Layout from '../components/layout'
import styles from './manifesto.module.css'
import conoLogo from '../../static/cono.svg'

import renderOptions from '../components/renderOptions'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'

class RootIndex extends React.Component {
  render() {
    const siteTitle = get(this, 'props.data.site.siteMetadata.title')
    const manifesto = get(this, 'props.data.allContentfulManifesto.edges[0].node')

    return (
      <Layout location={this.props.location}>
        <div style={{ background: '#000' }}>
          <Helmet>
            <title>comissió nocturna</title>
            <meta property="og:title" content="comissió nocturna" />
            <meta property="og:image" content="https://comissionocturna.org/cono-splash.png" />
            <meta property="og:type" content="organisation" />
            <meta
              property="og:description "
              content="Volem que Barcelona tingui una Comissió Nocturna. Un ent independent i sense ànim de lucre dedicat a assegurar que les nits de Barcelona siguin cultura: Volem apostar per la qualitat, sostenibilitat, seguretat i inclusivitat."
            />
          </Helmet>
          <div className="wrapper">
            <section id="section-intro">{documentToReactComponents(manifesto.intro.json, renderOptions)}</section>
            <section id="section-body" className="article-paragraphs">
              {documentToReactComponents(manifesto.body.json, renderOptions)}
            </section>
          </div>
        </div>
      </Layout>
    )
  }
}

export default RootIndex

export const pageQuery = graphql`
  {
    site {
      siteMetadata {
        title
      }
    }
    allContentfulManifesto(filter: { node_locale: { eq: "ca" } }) {
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
  }
`
