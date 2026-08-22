import { FaGithub, FaLinkedinIn, FaXTwitter, FaJava, FaAws, FaDocker, FaGitAlt, FaNodeJs } from 'react-icons/fa6'
import { MdOutlineMail } from 'react-icons/md'
import { RiReactjsLine, RiNextjsLine, RiTailwindCssFill } from 'react-icons/ri'
import { TbBrandTypescript, TbBrandJavascript, TbBrandSocketIo } from 'react-icons/tb'
import {
  SiExpress,
  SiPostgresql,
  SiRedis,
  SiMongodb,
  SiPrisma,
  SiNestjs,
  SiRabbitmq,
  SiWebrtc,
  SiLinux,
} from 'react-icons/si'

export const ICONS = {
  github: FaGithub,
  linkedin: FaLinkedinIn,
  x: FaXTwitter,
  twitter: FaXTwitter,
  mail: MdOutlineMail,
  react: RiReactjsLine,
  nextjs: RiNextjsLine,
  tailwind: RiTailwindCssFill,
  typescript: TbBrandTypescript,
  javascript: TbBrandJavascript,
  java: FaJava,
  nodejs: FaNodeJs,
  nestjs: SiNestjs,
  express: SiExpress,
  socketio: TbBrandSocketIo,
  webrtc: SiWebrtc,
  rabbitmq: SiRabbitmq,
  postgresql: SiPostgresql,
  mongodb: SiMongodb,
  redis: SiRedis,
  prisma: SiPrisma,
  docker: FaDocker,
  aws: FaAws,
  git: FaGitAlt,
  linux: SiLinux,
}

export const ICON_KEYS = Object.keys(ICONS)
