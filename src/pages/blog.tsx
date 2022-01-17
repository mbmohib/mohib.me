import { Link, graphql } from 'gatsby';

import { Layout, Blog } from '../components';
import SEO from '../components/seo';
import { categories } from '../config';
import { Edge } from '../types';

interface BlogPageProps {
  data: any;
}

export default function BlogPage({ data }: BlogPageProps) {
  const { edges } = data.allMarkdownRemark;

  return (
    <Layout>
      <SEO title="Blogs" />
      <div className="container mt-10">
        <h2 className="mb-3 section-heading">Featured Article</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {edges.map((edge: Edge) => (
            <Blog key={edge.node.id} post={edge.node} />
          ))}
        </div>
        <div className="mt-10 mb-7">
          <h2 className="mb-3 section-heading">Read blog by Categories</h2>
          {categories.map(category => (
            <Link
              key={category.label}
              className="mr-1 mb-1 btn btn-outline btn-primary btn-xs"
              to="/"
            >
              {category.label}
            </Link>
          ))}
        </div>
        <div className="grid sm:grid-cols-3 gap-x-6 gap-y-8">
          {edges.map((edge: Edge) => (
            <Blog key={edge.node.id} post={edge.node} variant="small" />
          ))}
        </div>
      </div>
    </Layout>
  );
}

export const pageQuery = graphql`
  query BlogQuery {
    allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }) {
      edges {
        node {
          excerpt(pruneLength: 250)
          id
          frontmatter {
            title
            date(formatString: "MMMM DD, YYYY")
            path
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
