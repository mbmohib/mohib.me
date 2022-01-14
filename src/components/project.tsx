import { GithubIcon, ExternalLinkIcon } from '../assets/icons';
import reactLogo from '../assets/images/react-logo.png';
import gatsbyLogo from '../assets/images/gatsby-logo.png';

export default function Project() {
  return (
    <div className="p-4 rounded bg-base-100">
      <h3 className="text-lg font-semibold">NuDash</h3>
      <p className="mt-2">
        An open-source Dashboard, including page builder, sparkles to use as a
        backend for GatsbyJS, ReactJS, NestJS built with React, TypeScript
      </p>
      <div className="flex justify-between mt-3">
        <div className="flex items-center gap-2">
          <a href="">
            <GithubIcon className="stroke-primary fill-base-100 hover:fill-primary" />
          </a>
          <a href="">
            <ExternalLinkIcon className="stroke-primary fill-base-100 hover:fill-primary" />
          </a>
        </div>
        <div className="flex">
          <div className="p-0.5 bg-white rounded">
            <img className="w-3 rounded-full" src={reactLogo} alt="" />
          </div>
          <div className="p-0.5 ml-1 bg-white rounded">
            <img className="w-3 rounded-full" src={gatsbyLogo} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
}
