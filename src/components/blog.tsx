import { Link } from 'gatsby';
import { GatsbyImage } from 'gatsby-plugin-image';
import { Post } from '../types';
import { PostMeta } from '../components';

interface BlogProps {
  variant?: 'small' | 'medium';
  post: Post;
}

export default function Blog({ variant = 'medium', post }: BlogProps) {
  const featuredImgFluid =
    post.frontmatter.featuredImage.childImageSharp.gatsbyImageData;

  return (
    <div>
      <Link className="block" to={`/blog/${post.frontmatter.path}/`}>
        <GatsbyImage
          className="rounded-md h-[300px] lg:h-[400px]"
          image={featuredImgFluid}
          alt={post.frontmatter.title}
        />
      </Link>
      <Link className="block" to={`/blog/${post.frontmatter.path}/`}>
        <h1
          className={
            variant === 'medium'
              ? `text-xl sm:text-2xl mt-2 font-title mb-2`
              : `text-lg sm:text-xl mt-2 font-title mb-2`
          }
        >
          {post.frontmatter.title}
        </h1>
      </Link>

      <PostMeta date={post.frontmatter.createdAt} time={post.timeToRead} />
    </div>
  );
}
