import { Link, graphql } from 'gatsby';

import { Layout, Blog, Project, ProfileLink } from '../components';
import SEO from '../components/seo';
import heroImage from '../assets/images/hero-image.svg';
import { profileLinks } from '../config';

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
          <h2 className="mb-3 section-heading">My Lab</h2>
          <div className="grid grid-cols-3 gap-4">
            <Project />
            <Project />
            <Project />
          </div>
        </div>
      </section>

      <section id="contact" className="pt-10">
        <div className="container">
          <div className="grid grid-cols-12 gap-6">
            <form className="col-span-7">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Your Message</span>
                </label>
                <textarea
                  className="h-12 rounded-lg textarea textarea-bordered focus:textarea-primary"
                  placeholder="Write your message"
                ></textarea>
              </div>
              <div className="mt-4 form-control">
                <label className="label">
                  <span className="label-text">Your Email</span>
                </label>
                <input
                  type="text"
                  placeholder="me@example.com"
                  className="rounded-lg input input-bordered focus:input-primary"
                />
              </div>
              <button
                type="submit"
                className="px-8 mt-4 btn btn-primary btn-sm"
              >
                Send
              </button>
            </form>

            <div className="col-span-4 pl-4 mt-4">
              {profileLinks.map(profile => (
                <ProfileLink profile={profile} />
              ))}
            </div>
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
