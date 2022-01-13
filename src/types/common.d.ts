import { SVGProps } from 'react';

interface Config {
  fill?: 'primary' | 'secondary';
  width?: number;
  height?: number;
}

export type IconTypes = Omit<SVGProps<SVGSVGElement>, keyof Config> & Config;

export interface FileType extends File {
  preview: string;
}
