import { SVGProps } from 'react';

export default function CalenderIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      fill="currentColor"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="feather feather-calendar"
      {...props}
    >
      <rect x={3} y={4} width={18} height={18} rx={2} ry={2} />
      <path d="M16 2v4M8 2v4M3 10h18" />
    </svg>
  );
}
