import React from 'react'
import { graphql } from 'gatsby'
import Helmet from 'react-helmet'
import get from 'lodash/get'
import Img from 'gatsby-image'
import Layout from '../components/layout'

import heroStyles from '../components/hero.module.css'

import renderOptions from '../components/renderOptions'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'

class BlogPostTemplate extends React.Component {
  render() {
    const post = get(this.props, 'data.contentfulBlogPost')
    const siteTitle = get(this.props, 'data.site.siteMetadata.title')

    return (
      <Layout location={this.props.location}>
        <div style={{ color: '#fff' }}>
          <Helmet title={`${post.title} | ${siteTitle}`} />
          <div className={heroStyles.hero} style={{ gridTemplateColumns: `${post.heroImage ? '1fr 1fr' : '1fr'}` }}>
            {post.heroImage && (
              <Img
                className={heroStyles.heroImage}
                alt={post.title}
                fluid={post.heroImage.fluid}
                objectFit="contain"
                style={{}}
              />
            )}
            <div>
              <h1 className="section-headline">{post.title}</h1>
              <p
                style={{
                  display: 'block',
                  color: 'rgba(255, 255, 255, 0.75)',
                  marginBottom: '4rem',
                }}
              >
                ⏰ {post.publishDate}
              </p>
            </div>
          </div>
          <div className="wrapper">
            <div style={{ fontSize: '18px', lineHeight: 2 }}>
              {documentToReactComponents(post.body.json, renderOptions)}
            </div>
          </div>
        </div>
      </Layout>
    )
  }
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
      }
    }
    contentfulBlogPost(slug: { eq: $slug }) {
      title
      publishDate(fromNow: true, locale: "ca")
      heroImage {
        fluid(maxWidth: 1180, background: "rgb:000000") {
          ...GatsbyContentfulFluid_tracedSVG
        }
      }
      body {
        ... on contentfulBlogPostBodyRichTextNode {
          json
        }
      }
    }
  }
`
