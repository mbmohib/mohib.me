import { Link, graphql } from 'gatsby';

import { Layout, Blog } from '../components';
import SEO from '../components/seo';
import heroImage from '../assets/images/hero-image.svg';

export default function BlogPage() {
  return (
    <Layout>
      <SEO title="Blogs" />
      <div className="container">
        <div className="my-10 rounded-md">
          <div className="grid grid-cols-12 gap-4">
            <main className="col-span-10">
              <div className="grid grid-cols-2 gap-4">
                <Blog />
                <Blog />
              </div>
              <div className="grid grid-cols-3 gap-4 mt-10 gap-y-6">
                <Blog />
                <Blog />
                <Blog />
                <Blog />
                <Blog />
                <Blog />
              </div>
            </main>
            <aside className="col-span-2">
              <div>
                <h2 className="mb-3 text-lg font-title">Top Categories</h2>
                <Link className="px-2 py-1 mr-2 rounded-md bg-primary" to="/">
                  React
                </Link>
                <Link className="px-2 py-1 rounded-md bg-primary" to="/">
                  React
                </Link>
              </div>
              <div className="mt-10">
                <h2 className="mb-2 text-lg font-title">Popular Contents</h2>
                <Link className="block mb-2 mr-2 text-primary" to="/">
                  How to React
                </Link>
                <Link className="block mb-2 mr-2 text-primary" to="/">
                  How to React
                </Link>
                <Link className="block mb-2 mr-2 text-primary" to="/">
                  How to React
                </Link>
                <Link className="block mb-2 mr-2 text-primary" to="/">
                  How to React
                </Link>
              </div>
            </aside>
          </div>
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
