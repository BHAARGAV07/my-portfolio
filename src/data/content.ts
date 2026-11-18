import type { PortfolioContent } from './types';

export const content: PortfolioContent = {
  profile: {
    name: 'Bhaargav K C',
    title: 'B.Tech CSBS student',
    location: 'RMK Engineering College, Chennai',
    education: 'B.Tech CSBS',
    graduationYear: '2028',
    heroStatement: '',
    availability: '',
    email: 'bhaargavkc@gmail.com',
    resumePath: '/resume.pdf',
    photoPath: '/photo.jpg',
    photoAlt: 'Portrait of Bhaargav K C',
  },
  bootLines: [
    { command: '$ whoami', output: 'Bhaargav K C' },
    { command: '$ cat role.txt', output: 'B.Tech CSBS student · RMK Engineering College, Chennai' },
    { command: '$ ls ./projects', output: '' },
  ],
  links: [
    { label: 'GitHub', href: 'https://github.com/BHAARGAV07' },
    { label: 'LinkedIn', href: 'https://linkedin.com/in/bhaargav-kc-82456b28b' },
    { label: 'LeetCode', href: 'https://leetcode.com/u/Bhaargav07/' },
    { label: 'Email', href: 'mailto:bhaargavkc@gmail.com' },
  ],
  projects: [],
  experience: [],
  about: { paragraphs: [] },
  skills: {
    languages: ['HTML5', 'CSS3', 'JavaScript', 'TypeScript', 'Java'],
    frontend: [],
    backendAndData: ['Supabase (Postgres)', 'MySQL'],
    tools: [],
  },
};
