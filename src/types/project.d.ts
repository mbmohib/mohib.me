export interface Project {
  id: string;
  frontmatter: {
    title: string;
    summery: string;
    featuredImage: string;
    isFeatured: boolean;
    tags: string[];
    github: string;
    live: string;
  };
}

export interface ProjectEdge {
  node: Project;
}
