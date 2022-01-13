import { PageProps, Link, graphql } from 'gatsby';
import testImage from '../assets/images/test-image.jpg';

export default function Blog() {
  return (
    <div>
      <Link className="block" to="/">
        <img className="rounded-md" src={testImage} alt="article-heading" />
      </Link>
      <Link className="block" to="/">
        <h1 className="mt-2 text-2xl font-title">
          How I built a modern website in 2021
        </h1>
      </Link>

      <p className="mt-1 text">September 29th, 2021 — 34 min read</p>
    </div>
  );
}
