import { Link, graphql } from 'gatsby';

import { Layout, Blog } from '../components';
import SEO from '../components/seo';
import heroImage from '../assets/images/hero-image.svg';

export default function Index() {
  return (
    <Layout>
      <SEO title="Home" />
      <div className="container">
        {/* Hero section */}
        <div className="grid grid-cols-2 mt-4">
          <div className="flex flex-col justify-center">
            <h1 className="text-4xl font-title">
              A JavaScript Developer, Writing code for fun!
            </h1>
            <div className="mt-3">
              <Link to="" className="mr-2 btn btn-primary">
                {' '}
                Read my Blog
              </Link>
              <Link to="" className="mr-2 btn btn-secondary">
                {' '}
                See my Projects
              </Link>
            </div>
          </div>
          <div className="flex justify-end">
            <img className="w-3/4" src={heroImage} alt="" />
          </div>
        </div>

        <div className="my-10 rounded-md">
          <div className="grid grid-cols-2 gap-4">
            <Blog />
            <Blog />
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
