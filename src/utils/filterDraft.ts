import { ENV } from '../config';
import { PostEdge } from '../types';

export default function filterDraft(edge: PostEdge) {
  if (ENV === 'production') {
    return edge.node.frontmatter.status === 'published';
  }

  return true;
}
