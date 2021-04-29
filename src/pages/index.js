import React from 'react'
import { graphql } from 'gatsby'
import get from 'lodash/get'
import Helmet from 'react-helmet'
import Layout from '../components/layout'
import ArticlePreview from '../components/article-preview'

class RootIndex extends React.Component {
  render() {
    const siteTitle = get(this, 'props.data.site.siteMetadata.title')
    const blogPosts = get(this, 'props.data.allContentfulBlogPost.edges')

    return (
      <>
        <Helmet>
          <html lang="ca" />
          <title>{siteTitle}</title>
          <meta
            name="description"
            content="Volem que Barcelona tingui una Comissió Nocturna. Un ent independent i sense ànim de lucre dedicat a assegurar que les nits de Barcelona siguin cultura: Volem apostar per la qualitat, sostenibilitat, seguretat i inclusivitat."
          />
          <meta property="og:title" content={siteTitle} />
          <meta property="og:image" content="https://comissionocturna.org/cono-splash.png" />
          <meta property="og:type" content="organisation" />
          <meta
            property="og:description "
            content="Volem que Barcelona tingui una Comissió Nocturna. Un ent independent i sense ànim de lucre dedicat a assegurar que les nits de Barcelona siguin cultura: Volem apostar per la qualitat, sostenibilitat, seguretat i inclusivitat."
          />
        </Helmet>
        <Layout location={this.props.location}>
          <div
            style={{
              background: '#000',
              display: 'grid',
              // gridTemplateColumns: 'repeat(4, 1fr)',
              // gridTemplateColumns: 'repeat(4, minmax(20%, 1fr))',
              gridTemplateColumns: 'repeat(4, 1fr)',
              // gridAutoFlow: 'dense',
              // gridTemplateRows: 'masonry',
              gap: '2rem',
              marginBottom: '10rem',
            }}
          >
            {blogPosts.map(({ node }) => (
              <ArticlePreview article={node} key={node.slug} />
            ))}
          </div>
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
    allContentfulBlogPost(sort: { order: DESC, fields: publishDate }, filter: { node_locale: { eq: "ca" } }) {
      edges {
        node {
          id
          title
          heroImage {
            fluid(maxWidth: 448) {
              ...GatsbyContentfulFluid_tracedSVG
            }
          }
          node_locale
          publishDate(fromNow: true, locale: "ca")
          slug
        }
      }
    }
  }
`
