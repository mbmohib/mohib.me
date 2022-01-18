import { Link } from 'gatsby';
import Image from 'gatsby-image';
import { Post } from '../types';
import { CalenderIcon, ClockIcon } from '../assets/icons';
interface BlogProps {
  variant?: 'small' | 'medium';
  post: Post;
}

export default function Blog({ variant = 'medium', post }: BlogProps) {
  const featuredImgFluid = post.frontmatter.featuredImage.childImageSharp.fluid;

  return (
    <div>
      <Link className="block" to={`/blog/${post.frontmatter.path}/`}>
        <Image
          className="rounded-md h-[300px] lg:h-[400px]"
          fluid={featuredImgFluid}
          alt={post.frontmatter.title}
        />
      </Link>
      <Link className="block" to={`/blog/${post.frontmatter.path}/`}>
        <h1
          className={
            variant === 'medium'
              ? `text-2xl mt-2 font-title`
              : `text-xl mt-2 font-title`
          }
        >
          {post.frontmatter.title}
        </h1>
      </Link>

      <div className="mt-2 flex">
        <div className="flex">
          <CalenderIcon className="fill-base-100 mr-1" />
          {post.frontmatter.date}
        </div>
        <div className="ml-2 flex">
          <ClockIcon className="fill-base-100 mr-1" />
          {post.timeToRead} min read
        </div>
      </div>
    </div>
  );
}
