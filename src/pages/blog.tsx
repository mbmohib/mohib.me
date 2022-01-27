import { Link, graphql } from 'gatsby';

import { Layout, Blog } from '../components';
import SEO from '../components/seo';
import { categories, ENV } from '../config';
import { PostEdge } from '../types';
import { filterDraft } from '../utils';

interface BlogPageProps {
  data: {
    featuredPosts: { edges: PostEdge[] };
    posts: { edges: PostEdge[] };
  };
}

export default function BlogPage({ data }: BlogPageProps) {
  const { featuredPosts, posts } = data;

  return (
    <Layout>
      <SEO title="Blog" />
      <div className="container mt-10">
        <h2 className="mb-3 section-heading">Featured Article</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {featuredPosts.edges
            .filter(edge => filterDraft(edge))
            .map(edge => (
              <Blog key={edge.node.id} post={edge.node} />
            ))}
        </div>
        <div className="mt-10 mb-7">
          <h2 className="mb-3 section-heading">Read blog by topic</h2>
          {categories.map(category => (
            <Link
              key={category.label}
              className="mb-1 mr-1 btn btn-outline btn-primary btn-xs"
              to="/"
            >
              {category.label}
            </Link>
          ))}
        </div>
        <div className="grid sm:grid-cols-3 gap-x-6 gap-y-8">
          {posts.edges
            .filter(edge => filterDraft(edge))
            .map(edge => (
              <Blog key={edge.node.id} post={edge.node} variant="small" />
            ))}
        </div>
      </div>
    </Layout>
  );
}

export const pageQuery = graphql`
  query BlogQuery {
    featuredPosts: allMarkdownRemark(
      filter: {
        fileAbsolutePath: { regex: "/posts/" }
        frontmatter: { isFeatured: { eq: true }, status: { eq: "published" } }
      }
      sort: { order: DESC, fields: [frontmatter___createdAt] }
    ) {
      edges {
        node {
          id
          frontmatter {
            title
            createdAt(formatString: "MMMM DD, YYYY")
            path
            topics
            status
            featuredImage {
              childImageSharp {
                fluid(maxWidth: 800) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
          timeToRead
        }
      }
    }
    posts: allMarkdownRemark(
      filter: {
        fileAbsolutePath: { regex: "/posts/" }
        frontmatter: { isFeatured: { eq: false } }
      }
      sort: { order: DESC, fields: [frontmatter___createdAt] }
    ) {
      edges {
        node {
          id
          frontmatter {
            title
            createdAt(formatString: "MMMM DD, YYYY")
            path
            topics
            status
            featuredImage {
              childImageSharp {
                fluid(maxWidth: 800) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
          timeToRead
        }
      }
    }
  }
`;
