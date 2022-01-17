import React from 'react';
import { graphql } from 'gatsby';
import Image from 'gatsby-image';
import { Layout } from '../components';

export default function Template({ data }) {
  const { markdownRemark: post } = data;
  const featuredImgFluid = post.frontmatter.featuredImage.childImageSharp.fluid;

  return (
    <Layout>
      <div className="container mt-10">
        <div className="grid grid-cols-12 gap-x-8">
          <div className="col-span-8">
            <h1 className="text-2xl mb-2">{post.frontmatter.title}</h1>
            <p className="mb-4">
              {post.frontmatter.date} — {post.timeToRead} min read
            </p>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-x-10">
          <div className="col-span-9">
            <Image fluid={featuredImgFluid} />
            <article
              className="prose lg:prose-xl mt-8"
              dangerouslySetInnerHTML={{ __html: post.html }}
            />
          </div>
          <div className="col-span-3">
            <h2 className="text-lg mb-4">Table of Contents</h2>
            <div
              className="prose prose-a:no-underline prose-li:mb-2"
              dangerouslySetInnerHTML={{ __html: post.tableOfContents }}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
}

export const pageQuery = graphql`
  query BlogPostByPath($slug: String!) {
    markdownRemark(frontmatter: { path: { eq: $slug } }) {
      html
      frontmatter {
        date(formatString: "DD MMMM, YYYY")
        path
        title
        featuredImage {
          childImageSharp {
            fluid(maxWidth: 800) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
      timeToRead
      tableOfContents
    }
  }
`;
