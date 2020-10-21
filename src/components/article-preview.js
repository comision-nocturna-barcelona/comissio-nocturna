import React from 'react'
import { Link } from 'gatsby'
import Img from 'gatsby-image'

import styles from './article-preview.module.css'

export default ({ article }) => (
  <article className={styles.preview}>
    <section className={article.heroImage ? styles.previewImage : styles.previewCircle}>
      {article.heroImage ? <Img alt={article.title} fluid={article.heroImage.fluid} /> : <span>{` `}</span>}
    </section>
    <section className={styles.previewTitleSection}>
      <h3 className={styles.previewTitle}>
        <Link to={`/blog/${article.slug}`}>{article.title}</Link>
      </h3>
    </section>
    {/* <small>{article.publishDate}</small> */}
  </article>
)
