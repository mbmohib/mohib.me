import {
  GithubIcon,
  LinkedInIcon,
  EmailIcon,
  TwitterIcon,
} from '../assets/icons';

export const mainMenu = [
  {
    label: 'Home',
    path: '/',
  },
  {
    label: 'Blog',
    path: '/blog/',
  },
  // {
  //   label: 'Projects',
  //   path: '/projects/',
  // },
  // {
  //   label: 'My Story',
  //   path: '/about/',
  // },
];

export const categories = [
  {
    label: 'React',
  },
  {
    label: 'Gatsby',
  },
  {
    label: 'Testing',
  },
  {
    label: 'Authentication',
  },
  {
    label: 'NodeJS',
  },
  {
    label: 'UI/UX',
  },
];

export const profileLinks = [
  {
    label: 'LinkedIn',
    link: 'https://www.linkedin.com/in/mohammad-mohibbullah/',
    icon: LinkedInIcon,
  },
  {
    label: 'Github',
    link: 'https://github.com/mbmohib/',
    icon: GithubIcon,
  },
  {
    label: 'mbmohib@gmail.com',
    link: 'mailto:mbmohib@gmail.com',
    icon: EmailIcon,
  },
  {
    label: '@mmohib',
    link: 'https://twitter.com/mmohib',
    icon: TwitterIcon,
  },
];
