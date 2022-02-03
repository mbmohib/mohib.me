import { Layout } from '../components';
import SEO from '../components/seo';

export default function NotFoundPage() {
  return (
    <Layout>
      <SEO title="404 - Not found" />
      <div className="container mt-10">
        <h1 className="mb-3 section-heading">404!</h1>
      </div>
    </Layout>
  );
}
