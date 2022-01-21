import { Link, graphql } from 'gatsby';

import { Layout, Blog, Project, ProfileLink } from '../components';
import SEO from '../components/seo';
import heroImage from '../assets/images/hero-image.svg';
import { profileLinks } from '../config';
import { PostEdge, ProjectEdge } from '../types';

interface IndexProps {
  data: any;
}

export default function Index({ data }: IndexProps) {
  const { posts, projects } = data;

  return (
    <Layout>
      <SEO title="Home" />

      <section id="hero">
        <div className="container">
          <div className="grid mt-4 sm:grid-cols-2">
            <div className="flex flex-col justify-center order-2 sm:order-1">
              <h1 className="text-3xl sm:text-4xl font-title">
                A JavaScript Developer, Writing code for fun!
              </h1>
              <div className="mt-3">
                <Link to="/blog" className="mb-2 mr-2 sm:mb-0 btn btn-primary">
                  {' '}
                  Read my Blog
                </Link>
                <Link to="" className="mr-2 btn btn-secondary">
                  {' '}
                  See my Projects
                </Link>
              </div>
            </div>
            <div className="flex justify-center order-1 sm:order-2 sm:justify-end">
              <img className="w-3/4" src={heroImage} alt="" />
            </div>
          </div>
        </div>
      </section>

      <section id="blog" className="my-10 rounded-md">
        <div className="container">
          <div className="grid gap-4 sm:grid-cols-2">
            {posts.edges.map((edge: PostEdge) => (
              <Blog key={edge.node.id} post={edge.node} />
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link to="/blog" className="btn btn-primary">
              See all articles
            </Link>
          </div>
        </div>
      </section>

      <section id="project" className="py-8 sm:py-10 bg-base-200">
        <div className="container">
          <h2 className="mb-3 section-heading">My Lab</h2>
          <div className="grid gap-4 sm:grid-cols-3">
            {projects.edges.map((edge: ProjectEdge) => (
              <Project project={edge.node} key={edge.node.id} />
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="pt-10">
        <div className="container">
          <div className="grid gap-6 sm:grid-cols-12">
            <form className="sm:col-span-7">
              <div className=" form-control">
                <label className="label">
                  <span className="label-text">Your Email</span>
                </label>
                <input
                  type="text"
                  placeholder="me@example.com"
                  className="rounded-lg input input-bordered focus:input-primary"
                />
              </div>
              <div className="mt-4 form-control">
                <label className="label">
                  <span className="label-text">Your Message</span>
                </label>
                <textarea
                  className="h-12 rounded-lg textarea textarea-bordered focus:textarea-primary"
                  placeholder="Write your message"
                ></textarea>
              </div>
              <button
                type="submit"
                className="px-8 mt-4 btn btn-primary btn-sm"
              >
                Send
              </button>
            </form>

            <div className="pl-4 mt-4 sm:col-span-4">
              {profileLinks.map(profile => (
                <ProfileLink key={profile.label} profile={profile} />
              ))}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}

export const pageQuery = graphql`
  query IndexQuery {
    posts: allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/posts/" } }
      sort: { order: DESC, fields: [frontmatter___date] }
    ) {
      edges {
        node {
          id
          frontmatter {
            title
            date(formatString: "MMMM DD, YYYY")
            path
            topics
            featuredImage {
              childImageSharp {
                fluid(maxWidth: 600, quality: 90) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
          timeToRead
        }
      }
    }
    projects: allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/projects/" } }
    ) {
      edges {
        node {
          id
          frontmatter {
            title
            github
            live
            tags
            summery
          }
        }
      }
    }
  }
`;
