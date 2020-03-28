import React from 'react'
import { graphql } from 'gatsby'
import get from 'lodash/get'
import Helmet from 'react-helmet'
import Hero from '../components/hero'
import Layout from '../components/layout'
import styles from './index.module.css'
import ArticlePreview from '../components/article-preview'
import conoLogo from '../../static/cono.svg'

import { BLOCKS, MARKS } from "@contentful/rich-text-types"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"

const Bold = ({ children }) => <span className="bold">{children}</span>
const Text = ({ children, margin = '2', fontsize = '0' }) => <p className={`margin-${margin} fontsize-${fontsize}`}>{children}</p>
const Heading1 = ({ children, level = '1', margin = '6' }) => <h2 className={`heading-${level} margin-${margin}`}>{children}</h2>
const Heading2 = ({ children, level = '2', margin = '4' }) => <h2 className={`heading-${level} margin-${margin}`}>{children}</h2>

const optionsIntro = {
  renderMark: {
    [MARKS.BOLD]: text => <Bold>{text}</Bold>,
  },
  renderNode: {
    [BLOCKS.PARAGRAPH]: (node, children) => <Text fontsize="2">{children}</Text>,
    [BLOCKS.HEADING_1]: (node, children) => <Heading1>{children}</Heading1>,
    [BLOCKS.HEADING_2]: (node, children) => <Heading2>{children}</Heading2>,
  },
}

const optionsBody = {
  renderMark: {
    [MARKS.BOLD]: text => <Bold>{text}</Bold>,
  },
  renderNode: {
    [BLOCKS.PARAGRAPH]: (node, children) => <Text>{children}</Text>,
    [BLOCKS.OL_LIST]: (node, children) => <ol className={`margin-6`}>{children}</ol>,
    [BLOCKS.UL_LIST]: (node, children) => <ul className={`margin-6`}>{children}</ul>,
    [BLOCKS.LIST_ITEM]: (node, children) => <li className={`margin-4`}><Text margin="1">{children}</Text></li>,
    [BLOCKS.HR]: (node, children) => <hr className={`margin-6`}>{children}</hr>,
    [BLOCKS.QUOTE]: (node, children) => <blockquote className={`margin-4`}>{children}</blockquote>,
    [BLOCKS.HEADING_1]: (node, children) => <Heading1>{children}</Heading1>,
    [BLOCKS.HEADING_2]: (node, children) => <Heading2>{children}</Heading2>,
  },
}

class RootIndex extends React.Component {
  render() {
    const siteTitle = get(this, 'props.data.site.siteMetadata.title')
    const manifesto = get(this, 'props.data.allContentfulManifesto.edges[0].node')

    return (
      <>
        <h1 className={styles.hero}>
          <img src={conoLogo} alt="comissiò nocturna" />
        </h1>
        <Layout location={this.props.location} >
          <div style={{ background: '#000' }}>
            <Helmet>
                <title>comissió nocturna</title>
                <meta property="og:title" content="comissió nocturna" />
                <meta property="og:image" content="https://comissionocturna.org/cono-splash.png" />
                <meta property="og:type" content="organisation" />
                <meta property="og:description " content="Volem que Barcelona tingui una Comissió Nocturna. Un ent independent i sense ànim de lucre dedicat a assegurar que les nits de Barcelona siguin cultura: Volem apostar per la qualitat, sostenibilitat, seguretat i inclusivitat." />
            </Helmet>
            <div className="wrapper">
              <section id="section-intro">
                {documentToReactComponents(manifesto.intro.json, optionsIntro)}
              </section>
              <section id="section-body" className="article-paragraphs">
                {documentToReactComponents(manifesto.body.json, optionsBody)}
              </section>
            </div>
          </div>
          <footer>
            <a href="mailto:hola@comissionocturna.org" target="_blank">hola@comissionocturna.org</a>
            <div>
              <img style={{ width: '150px', margin: '4rem auto' }} src={conoLogo} alt="comissiò nocturna" />
            </div>
          </footer>
        </Layout>
      </>
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
