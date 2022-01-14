import { Link, graphql } from 'gatsby';

import { Layout, Blog } from '../components';
import SEO from '../components/seo';
import { categories } from '../config';

export default function BlogPage() {
  return (
    <Layout>
      <SEO title="Blogs" />
      <div className="container mt-10">
        <h2 className="mb-3 section-heading">Featured Article</h2>
        <div className="grid grid-cols-2 gap-4">
          <Blog />
          <Blog />
        </div>
        <div className="mt-10 mb-7">
          <h2 className="mb-3 section-heading">Read blog by Categories</h2>
          {categories.map(category => (
            <Link className="mr-1 btn btn-outline btn-primary btn-xs" to="/">
              {category.label}
            </Link>
          ))}
        </div>
        <div className="grid grid-cols-3 gap-x-6 gap-y-8">
          <Blog variant="small" />
          <Blog variant="small" />
          <Blog variant="small" />
          <Blog variant="small" />
          <Blog variant="small" />
          <Blog variant="small" />
        </div>
      </div>
    </Layout>
  );
}

export const query = graphql`
  {
    site {
      buildTime(formatString: "YYYY-MM-DD hh:mm a z")
    }
  }
`;
