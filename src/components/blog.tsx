import { Link } from 'gatsby';
import testImage from '../assets/images/test-image.jpg';

interface BlogProps {
  variant?: 'small' | 'medium';
}

export default function Blog({ variant = 'medium' }: BlogProps) {
  return (
    <div>
      <Link className="block" to="/">
        <img className="rounded-md" src={testImage} alt="article-heading" />
      </Link>
      <Link className="block" to="/">
        <h1
          className={
            variant === 'medium'
              ? `mt-2 font-title text-2xl`
              : `mt-2 font-title text-xl`
          }
        >
          How I built a modern website in 2021
        </h1>
      </Link>

      <p className="mt-1 text">September 29th, 2021 — 34 min read</p>
    </div>
  );
}
