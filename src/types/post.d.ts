export interface Post {
  frontmatter: {
    path: string;
    createdAt: string;
    updatedAt: string;
    title: string;
    featuredImage: any;
    isFeatured: boolean;
    topics: string[];
  };
  id: string;
  html: string;
  timeToRead: number;
  tableOfContents: string;
}

export interface PostEdge {
  node: Post;
}
