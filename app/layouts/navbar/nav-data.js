import config from '~/config.json'

export const navLinks = [
  {
    label: 'Details',
    pathname: '/#details',
  },
  {
    label: 'Contact',
    pathname: '/contact',
  },
  
];

export const socialLinks = [
  {
    label: 'Twitter',
    url: `https://twitter.com/${config.twitter}`,
    icon: 'twitter',
  },
  {
    label: 'Instagram',
    url: `https://www.instagram.com/${config.instagram}`,
    icon: 'instagram',
  },
  {
    label: 'Github',
    url: `https://github.com/${config.github}`,
    icon: 'github',
  },
  {
    label: 'Youtube',
    url: `https://youtube.com/${config.youtube}`,
    icon: 'youtube',
  },
];
