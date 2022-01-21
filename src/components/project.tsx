import { GithubIcon, ExternalLinkIcon } from '../assets/icons';
import { Project } from '../types';

interface ProjectProps {
  project: Project;
}

export default function ProjectItem({ project }: ProjectProps) {
  return (
    <div className="p-4 rounded-md bg-base-100">
      <div className="flex mb-4">
        {project.frontmatter.tags.map(tag => (
          <p
            key={tag}
            className="px-2 mr-1 text-sm border rounded-lg border-secondary"
          >
            {tag}
          </p>
        ))}
      </div>
      <h3 className="text-lg font-semibold">{project.frontmatter.title}</h3>
      <p className="mt-2">{project.frontmatter.summery}</p>
      <div className="flex justify-between mt-3">
        <div className="flex items-center gap-2">
          <a href={project.frontmatter.github}>
            <GithubIcon className="stroke-primary fill-base-100 hover:fill-primary" />
          </a>
          <a href={project.frontmatter.live}>
            <ExternalLinkIcon className="stroke-primary fill-base-100 hover:fill-primary" />
          </a>
        </div>
      </div>
    </div>
  );
}
