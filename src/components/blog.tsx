import { Link } from 'gatsby';
import Image from 'gatsby-image';
import { Post } from '../types';

interface BlogProps {
  variant?: 'small' | 'medium';
  post: Post;
}

export default function Blog({ variant = 'medium', post }: BlogProps) {
  const featuredImgFluid = post.frontmatter.featuredImage.childImageSharp.fluid;

  return (
    <div>
      <Link className="block" to={`/blog/${post.frontmatter.path}`}>
        <Image
          className="rounded-md h-[300px] lg:h-[400px]"
          fluid={featuredImgFluid}
          alt={post.frontmatter.title}
        />
      </Link>
      <Link className="block" to={`/blog/${post.frontmatter.path}`}>
        <h1
          className={
            variant === 'medium'
              ? `mt-2 font-title text-2xl`
              : `mt-2 font-title text-xl`
          }
        >
          {post.frontmatter.title}
        </h1>
      </Link>

      <p className="mt-1 text">
        {post.frontmatter.date} — {post.timeToRead} min read
      </p>
    </div>
  );
}
