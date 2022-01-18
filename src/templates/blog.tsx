import React from 'react';
import { graphql } from 'gatsby';
import Image from 'gatsby-image';
import { Layout, SEO } from '../components';
import { CalenderIcon, ClockIcon } from '../assets/icons';

export default function BlogTemplate({ data }) {
  const { markdownRemark: post } = data;
  const featuredImgFluid = post.frontmatter.featuredImage.childImageSharp.fluid;

  return (
    <Layout>
      <SEO title={post.frontmatter.title} />
      <div className="container mt-10">
        <div className="grid sm:grid-cols-12 sm:gap-x-6">
          <div className="sm:col-span-9">
            <h1 className="text-3xl mb-2 font-semibold">
              {post.frontmatter.title}
            </h1>
            <div className="mb-4 flex">
              <div className="flex">
                <CalenderIcon className="fill-base-100 mr-1" />
                {post.frontmatter.date}
              </div>
              <div className="ml-2 flex">
                <ClockIcon className="fill-base-100 mr-1" />
                {post.timeToRead} min read
              </div>
            </div>
          </div>
        </div>

        <div className="grid sm:grid-cols-12 sm:gap-x-6">
          <div className="sm:col-span-9">
            <div className="h-[300px] lg:h-[400px] xl:h-[500px] rounded-md overflow-hidden">
              <Image className="rounded-md" fluid={featuredImgFluid} />
            </div>
            <article
              className="article prose lg:prose-lg mt-8 mx-auto"
              dangerouslySetInnerHTML={{ __html: post.html }}
            />
          </div>
          <div className="hidden sm:block sm:col-span-3">
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
