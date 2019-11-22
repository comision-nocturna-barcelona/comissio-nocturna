import React from 'react'
import { graphql } from 'gatsby'
import get from 'lodash/get'
import Helmet from 'react-helmet'
import Hero from '../components/hero'
import Layout from '../components/layout'
import styles from './index.module.css'
import ArticlePreview from '../components/article-preview'

class RootIndex extends React.Component {
  render() {
    const siteTitle = get(this, 'props.data.site.siteMetadata.title')
    const manifesto = get(this, 'props.data.contentfulManifesto')

    return (
      <Layout location={this.props.location} >
        <div style={{ background: '#000' }}>
          <Helmet title={siteTitle} />
          <div className={styles.hero}>
            comissiò nocturna
          </div>
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
      </Layout>
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
