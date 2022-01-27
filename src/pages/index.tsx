import { Link, graphql } from 'gatsby';

import { Layout, Blog, Project, ProfileLink } from '../components';
import { SEO, HeroImage } from '../components';
import { profileLinks } from '../config';
import { PostEdge, ProjectEdge } from '../types';
import { filterDraft } from '../utils';

interface IndexProps {
  data: {
    posts: { edges: PostEdge[] };
    projects: { edges: ProjectEdge[] };
  };
}

export default function Index({ data }: IndexProps) {
  const { posts, projects } = data;

  return (
    <Layout>
      <SEO title="Home" />

      <section id="hero">
        <div className="container">
          <div className="grid gap-6 mt-4 sm:grid-cols-12">
            <div className="flex flex-col justify-center order-2 sm:order-1 sm:col-span-5">
              <h1 className="text-2xl sm:text-3xl font-title">
                Hello, I'm{' '}
                <span className="font-semibold text-primary">Mohib</span>
              </h1>
              <p className="mt-1 text-md">
                I'm a software engineer in Bangladesh working with{' '}
                <span className="font-bold"> JavaScript </span>
                for about 4+ years & have 3+ years of working experience with
                <span className="font-bold"> React</span>. I also have some
                working knowledge with{' '}
                <span className="font-bold">NodeJS, MongoDB, AWS.</span> I love
                to work with front-end technologies especially{' '}
                <span className="font-bold"> React</span>. I'm also curious
                about UX. Besides this, I like traveling and occasionally write
                blogs.
              </p>
              <div className="mt-3">
                <Link to="/blog" className="mb-2 mr-2 sm:mb-0 btn btn-primary">
                  {' '}
                  Read my Blog
                </Link>
                {/* <Link to="" className="mr-2 btn btn-secondary">
                  {' '}
                  See my Projects
                </Link> */}
              </div>
            </div>
            <div className="order-1 w-4/6 mx-auto sm:mr-0 sm:w-4/6 sm:order-2 sm:justify-end sm:col-span-7">
              <HeroImage />
            </div>
          </div>
        </div>
      </section>

      <section id="blog" className="my-10 rounded-md sm:my-12">
        <div className="container">
          <div className="grid gap-4 sm:grid-cols-2">
            {posts.edges
              .filter(edge => filterDraft(edge))
              .map(edge => (
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
            {projects.edges.map(edge => (
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
                  disabled
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
                  disabled
                  className="h-12 rounded-lg textarea textarea-bordered focus:textarea-primary"
                  placeholder="Write your message"
                ></textarea>
              </div>
              <button
                disabled
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
      filter: {
        fileAbsolutePath: { regex: "/posts/" }
        frontmatter: { isFeatured: { eq: true } }
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
