import { GithubIcon, ExternalLinkIcon } from '../assets/icons';
import reactLogo from '../assets/images/react-logo.png';

export default function Project() {
  return (
    <div className="p-3 rounded bg-base-200">
      <h3 className="text-lg font-semibold">NuDash</h3>
      <p className="mt-2">
        An open-source Dashboard, including page builder, sparkles to use as a
        backend for GatsbyJS, ReactJS, NestJS built with React, TypeScript
      </p>
      <div className="flex justify-between mt-3">
        <div className="flex items-center gap-2">
          <a href="">
            <GithubIcon />
          </a>
          <a href="">
            <ExternalLinkIcon />
          </a>
        </div>
        <div className="flex">
          <div className="p-0.5 bg-white rounded-full">
            <img className="w-4 rounded-full" src={reactLogo} alt="" />
          </div>
          <div className="p-0.5 -ml-1 bg-white rounded-full">
            <img className="w-4 rounded-full" src={reactLogo} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
}
