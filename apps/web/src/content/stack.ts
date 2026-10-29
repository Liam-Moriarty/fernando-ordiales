import type { IconType } from 'react-icons';
import { FaJava } from 'react-icons/fa';
import {
  SiAnthropic,
  SiBootstrap,
  SiCss,
  SiDocker,
  SiExpress,
  SiFastapi,
  SiFastify,
  SiFirebase,
  SiFlutter,
  SiGit,
  SiGithub,
  SiGithubactions,
  SiGooglecloud,
  SiGooglegemini,
  SiHtml5,
  SiJavascript,
  SiKubernetes,
  SiMongodb,
  SiMysql,
  SiNextdotjs,
  SiNodedotjs,
  SiPostgresql,
  SiPostman,
  SiPython,
  SiReact,
  SiRedis,
  SiRedux,
  SiSpringboot,
  SiTailwindcss,
  SiTypescript,
  SiVuedotjs,
} from 'react-icons/si';

// The full skills inventory from the resume, grouped like its columns.
// `color` is the brand color: chips render grayscale and release it on hover,
// so forty logos stay calm until pointed at. Brands whose logo is white or
// near-white carry no color and inherit the text color, which works in both
// themes. No icon → the chip is just the name.
export type StackItem = { name: string; icon?: IconType; color?: string };

export const stack: { label: string; items: StackItem[] }[] = [
  {
    label: 'frontend',
    items: [
      { name: 'Next.js', icon: SiNextdotjs },
      { name: 'React', icon: SiReact, color: '#61DAFB' },
      { name: 'TypeScript', icon: SiTypescript, color: '#3178C6' },
      { name: 'JavaScript', icon: SiJavascript, color: '#F7DF1E' },
      { name: 'HTML', icon: SiHtml5, color: '#E34F26' },
      { name: 'CSS', icon: SiCss, color: '#663399' },
      { name: 'Vue.js', icon: SiVuedotjs, color: '#4FC08D' },
      { name: 'Redux Toolkit', icon: SiRedux, color: '#764ABC' },
      { name: 'Pinia' },
      { name: 'Tailwind CSS', icon: SiTailwindcss, color: '#06B6D4' },
      { name: 'Bootstrap', icon: SiBootstrap, color: '#7952B3' },
      { name: 'Element Plus' },
    ],
  },
  {
    label: 'backend',
    items: [
      { name: 'Node.js', icon: SiNodedotjs, color: '#5FA04E' },
      { name: 'Express', icon: SiExpress },
      { name: 'Java', icon: FaJava, color: '#F89820' },
      { name: 'Spring Boot', icon: SiSpringboot, color: '#6DB33F' },
      { name: 'Python', icon: SiPython, color: '#3776AB' },
      { name: 'FastAPI', icon: SiFastapi, color: '#009688' },
      { name: 'Fastify', icon: SiFastify },
      { name: 'Redis', icon: SiRedis, color: '#FF4438' },
      { name: 'Vertex AI', icon: SiGooglecloud, color: '#4285F4' },
      { name: 'Genkit', icon: SiFirebase, color: '#FFCA28' },
    ],
  },
  {
    label: 'databases',
    items: [
      { name: 'PostgreSQL', icon: SiPostgresql, color: '#4169E1' },
      { name: 'MongoDB', icon: SiMongodb, color: '#47A248' },
      { name: 'MySQL', icon: SiMysql, color: '#4479A1' },
      { name: 'Firebase Firestore', icon: SiFirebase, color: '#FFCA28' },
    ],
  },
  {
    label: 'devops & cloud',
    items: [
      { name: 'Docker', icon: SiDocker, color: '#2496ED' },
      { name: 'Kubernetes', icon: SiKubernetes, color: '#326CE5' },
      { name: 'Google Cloud', icon: SiGooglecloud, color: '#4285F4' },
      { name: 'Firebase', icon: SiFirebase, color: '#FFCA28' },
      { name: 'Git', icon: SiGit, color: '#F05032' },
      { name: 'GitHub', icon: SiGithub },
      { name: 'GitHub Actions', icon: SiGithubactions, color: '#2088FF' },
    ],
  },
  {
    label: 'other tools',
    items: [
      { name: 'Flutter', icon: SiFlutter, color: '#02569B' },
      { name: 'Claude Code', icon: SiAnthropic, color: '#D97757' },
      { name: 'Gemini', icon: SiGooglegemini, color: '#8E75B2' },
      { name: 'Postman', icon: SiPostman, color: '#FF6C37' },
      { name: 'Ollama' },
      { name: 'Codex' },
    ],
  },
];
