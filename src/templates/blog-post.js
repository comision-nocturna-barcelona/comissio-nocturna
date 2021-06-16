import React from 'react'
import { graphql } from 'gatsby'
import Helmet from 'react-helmet'
import get from 'lodash/get'
import Img from 'gatsby-image'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'

import blogPostStyles from './blog-post.module.css'
import Layout from '../components/layout'
import heroStyles from '../components/hero.module.css'
import renderOptions from '../components/renderOptions'

class BlogPostTemplate extends React.Component {
  render() {
    const post = get(this.props, 'data.contentfulBlogPost')
    const siteTitle = get(this.props, 'data.site.siteMetadata.title')

    return (
      <Layout location={this.props.location}>
        <div style={{ color: '#fff', animation: 'fade-in-slow 500ms cubic-bezier(0.19, 1, 0.22, 1)' }}>
          <Helmet>
            <html lang="ca" />
            <title>{`${post.title} • ${siteTitle}`}</title>
            <meta property="og:title" content={`${post.title} • ${siteTitle}`} />
            <meta property="og:image" content="https://comissionocturna.org/cono-splash.png" />
            <meta property="og:type" content="article" />
          </Helmet>
          <div className={heroStyles.hero} style={{ gridTemplateColumns: `${post.heroImage ? '1fr 1fr' : '1fr'}` }}>
            {post.heroImage && (
              <Img className={heroStyles.heroImage} alt={post.title} fluid={post.heroImage.fluid} objectFit="contain" />
            )}
            <div>
              <h1 className="section-headline">{post.title}</h1>
              <p
                style={{
                  display: 'block',
                  color: 'rgba(255, 255, 255, 0.4)',
                  marginBottom: '4rem',
                }}
              >
                ⏱ {post.publishDate}
              </p>
            </div>
          </div>
          <div className={blogPostStyles.wrapper}>
            <div>{documentToReactComponents(post.body.json, renderOptions)}</div>
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
          base64
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
