// If you don't want to use TypeScript you can delete this file!
import React from 'react';
import { PageProps, Link, graphql } from 'gatsby';

import Layout from '../components/layout';
import SEO from '../components/seo';
import developerImg from '../assets/images/development.jpg';

type DataProps = {
  site: {
    buildTime: string;
  };
};

const UsingTypescript: React.FC<PageProps<DataProps>> = ({ data, path }) => (
  <Layout>
    <SEO title="Using TypeScript" />
    <div className="container">
      <div className="grid grid-cols-2">
        <div className=""></div>
        <div className="">
          <img src={developerImg} alt="" />
        </div>
      </div>
    </div>
  </Layout>
);

export default UsingTypescript;

export const query = graphql`
  {
    site {
      buildTime(formatString: "YYYY-MM-DD hh:mm a z")
    }
  }
`;
