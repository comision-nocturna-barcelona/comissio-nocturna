import React from 'react'
import { Link } from 'gatsby'
import Img from 'gatsby-image'

import styles from './article-preview.module.css'

export default ({ article }) => (
  <Link to={`/blog/${article.slug}`} className={styles.previewLink}>
    <article className={styles.preview}>
      <section className={article.heroImage ? styles.previewImage : styles.previewCircle}>
        {article.heroImage ? <Img alt={article.title} fluid={article.heroImage.fluid} /> : <span>{` `}</span>}
      </section>
      <section className={styles.previewTitleSection}>
        <div className={styles.previewTitleWrapper}>
          <h3 className={`${styles.previewTitle} ${article.heroImage ? styles.previewTitleWithImage : ''} `}>
            {article.title}
          </h3>
        </div>
      </section>
    </article>
  </Link>
)
