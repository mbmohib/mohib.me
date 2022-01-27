import React from 'react';
import { graphql } from 'gatsby';
import Image from 'gatsby-image';
import { Layout, SEO, PostMeta } from '../components';

import { Post } from '../types';

interface BlogTemplateProps {
  data: {
    markdownRemark: Post;
  };
}

export default function BlogTemplate({ data }: BlogTemplateProps) {
  const { markdownRemark: post } = data;
  const featuredImgFluid = post.frontmatter.featuredImage.childImageSharp.fluid;

  return (
    <Layout>
      <SEO title={post.frontmatter.title} />
      <div className="container mt-5 sm:mt-10">
        <div className="grid sm:grid-cols-12 sm:gap-x-6">
          <div className="sm:col-span-9">
            <h1 className="mb-2 text-xl font-semibold sm:text-3xl">
              {post.frontmatter.title}
            </h1>
            <div className="flex flex-col justify-between mb-4 sm:flex-row">
              <PostMeta
                date={post.frontmatter.createdAt}
                time={post.timeToRead}
              />
              <div className="flex">
                {post.frontmatter.topics.map(topic => (
                  <p className="ml-1 text-primary" key={topic}>
                    #{topic}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="grid sm:grid-cols-12 sm:gap-x-6">
          <div className="sm:col-span-9">
            <div className="rounded-md">
              <Image className="rounded-md" fluid={featuredImgFluid} />
            </div>
            <article
              className="mx-auto mt-8 prose article lg:prose-lg prose-figcaption:text-center prose-figcaption:italic prose-img:rounded"
              dangerouslySetInnerHTML={{ __html: post.html }}
            />
          </div>
          <div className="hidden sm:block sm:col-span-3">
            <h2 className="mb-4 text-lg">Table of Contents</h2>
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
        createdAt(formatString: "DD MMMM, YYYY")
        updatedAt(formatString: "DD MMMM, YYYY")
        path
        title
        topics
        featuredImage {
          childImageSharp {
            fluid(maxWidth: 1200, quality: 100) {
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
