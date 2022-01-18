export interface Post {
  frontmatter: {
    path: string;
    date: string;
    title: string;
    featuredImage: any;
    isFeatured: boolean;
    topics: Array;
  };
  id: string;
  html: string;
  timeToRead: number;
  tableOfContents: string;
}

export interface Edge {
  node: Post;
}
