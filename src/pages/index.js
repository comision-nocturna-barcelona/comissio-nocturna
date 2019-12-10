import React from 'react'
import { graphql } from 'gatsby'
import get from 'lodash/get'
import Helmet from 'react-helmet'
import Hero from '../components/hero'
import Layout from '../components/layout'
import styles from './index.module.css'
import ArticlePreview from '../components/article-preview'
import conoLogo from '../../static/cono.svg'

class RootIndex extends React.Component {
  render() {
    const siteTitle = get(this, 'props.data.site.siteMetadata.title')
    const manifesto = get(this, 'props.data.contentfulManifesto')

    return (
      <>
        <h1 className={styles.hero}>
          <img src={conoLogo} alt="comissiò nocturna" />
        </h1>
        <Layout location={this.props.location} >
          <div style={{ background: '#000' }}>
            <Helmet>
                <title>{siteTitle}</title>
                <meta name="google-site-verification" content="nLSiADgZQC59qpHAAAbZGixuOy1LKu87ThI0s5f7zAk" /> // eslint-disable-line
            </Helmet>
            <div className="wrapper">
              <div className="article-list">
                {manifesto.body.content.map((node, index) => {
                  return (
                    <p key={`000${index}`}>
                      {node.content[0].value}
                    </p>
                  )
                })}
              </div>
            </div>
          </div>
          <footer>
            <a href="mailto:ola@comissionocturna.org">ola@comissionocturna.org</a>
          </footer>
        </Layout>
      </>
    )
  }
}

export default RootIndex

export const pageQuery = graphql`
  query HomeQuery {
    site {
      siteMetadata {
        title
      }
    }
    contentfulManifesto {
      title
      body {
        content {
          content {
            value
            nodeType
          }
          nodeType
        }
        body
      }
      id
      createdAt(fromNow: true, locale: "ca")
    }
  }
`
