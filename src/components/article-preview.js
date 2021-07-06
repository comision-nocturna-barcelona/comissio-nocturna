import React from 'react'
import { Link } from 'gatsby'
import { getImage, GatsbyImage } from 'gatsby-plugin-image'

import styles from './article-preview.module.css'

export default ({ article }) => {
  const image = getImage(article.heroImage.fluid)

  return (
    <Link
      to={`/blog/${article.slug}`}
      className={`${styles.previewLink} ${
        article.highlighted ? styles.previewHighlighted : null
      }`}
    >
      <article className={styles.preview}>
        <section
          className={article.heroImage ? styles.previewImage : styles.previewCircle}
        >
          {article.heroImage ? (
            <GatsbyImage alt={article.title} constrained={image} />
          ) : (
            <span>{` `}</span>
          )}
        </section>
        <section className={styles.previewTitleSection}>
          <div className={styles.previewTitleWrapper}>
            <h3
              className={`${styles.previewTitle} ${
                article.heroImage ? styles.previewTitleWithImage : ''
              } `}
            >
              {article.title}
            </h3>
          </div>
        </section>
      </article>
    </Link>
  )
}
