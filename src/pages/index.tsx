import { Link, graphql } from 'gatsby';

import { Layout, Blog, Project } from '../components';
import SEO from '../components/seo';
import heroImage from '../assets/images/hero-image.svg';

export default function Index() {
  return (
    <Layout>
      <SEO title="Home" />

      <section id="hero">
        <div className="container">
          <div className="grid grid-cols-2 mt-4">
            <div className="flex flex-col justify-center">
              <h1 className="text-4xl font-title">
                A JavaScript Developer, Writing code for fun!
              </h1>
              <div className="mt-3">
                <Link to="/blog" className="mr-2 btn btn-primary">
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
        </div>
      </section>

      <section id="blog" className="my-10 rounded-md">
        <div className="container">
          <div className="grid grid-cols-2 gap-4">
            <Blog />
            <Blog />
          </div>
          <div className="mt-8 text-center">
            <Link to="/blog" className="btn btn-primary">
              See all articles
            </Link>
          </div>
        </div>
      </section>

      <section id="project" className="py-10 bg-base-200">
        <div className="container">
          <h2 className="mb-3 text-2xl font-title">My Lab</h2>
          <div className="grid grid-cols-3 gap-4">
            <Project />
            <Project />
            <Project />
          </div>
        </div>
      </section>
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
