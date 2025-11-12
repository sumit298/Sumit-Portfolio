import { FaGithub, FaLinkedinIn, FaTwitter } from "react-icons/fa6"
import { MdOutlineMail } from "react-icons/md"
import { RiReactjsLine, RiNextjsLine, RiTailwindCssFill, RiNodejsLine } from "react-icons/ri"
import { TbBrandTypescript,  } from "react-icons/tb"
import { SiExpress, SiPostgresql, SiRedis,  } from "react-icons/si"
import { FaGitAlt, FaDocker } from "react-icons/fa"
import { BsFiletypeSql } from "react-icons/bs"
import { VscTerminalLinux } from "react-icons/vsc"
import { DiJava, DiMongodb } from "react-icons/di"

export const personalInfo = {
  name: "Sumit Sinha",
  bio: "Full-stack developer specializing in real-time web applications and WebRTC streaming",
  image: "https://avatars.githubusercontent.com/u/44542669?s=400&u=484c786d7393e0010200ac5265a1b356fd635fa1&v=4",
  about: `
    <p>
      Hey! I'm Sumit Sinha, a full-stack developer with <span style="color: white; font-weight: 500;">2+ years of professional experience</span> building scalable web applications and real-time systems. I specialize in both frontend and backend development, from React applications to Spring Boot APIs.
    </p>
    <p>
      Currently working on <span style="color: white; font-weight: 500;">StreamHub</span> - a live streaming platform using WebRTC and MediaSoup. I've built everything from collaborative whiteboards handling 500+ concurrent users to AI-powered systems and REST APIs. My experience spans across modern JavaScript frameworks, Java backend development, and cloud technologies.
    </p>
    <p>
      I thrive on solving complex problems and turning ideas into production-ready applications. Whether it's optimizing React performance, building scalable APIs, or implementing real-time features, I focus on creating solutions that make a real impact.
    </p>
  `
}

export const socialLinks = [
  {
    id: 1,
    name: "Github",
    link: "https://github.com/sumit298",
    icon: FaGithub,
  },
  {
    id: 2,
    name: "Twitter",
    link: "https://twitter.com/sumit29810",
    icon: FaTwitter,
  },
  {
    id: 3,
    name: "LinkedIn",
    link: "https://www.linkedin.com/in/sumit-sinha-6936a1189/",
    icon: FaLinkedinIn,
  },
]

export const contactInfo = {
  text: "I'm also super active on X, so feel free to DM me there or reach out to me via email if you have any queries.",
  links: [
    {
      id: 1,
      name: "Twitter",
      link: "https://twitter.com/sumit29810",
      icon: FaTwitter,
    },
    {
      id: 2,
      name: "Email",
      link: "mailto:sumitsinha1007@gmail.com",
      icon: MdOutlineMail,
    },
  ]
}

export const skills = [
  { id: 1, icon: RiReactjsLine, text: "ReactJS" },
  { id: 2, icon: RiNextjsLine, text: "Next.js" },
  { id: 3, icon: RiNodejsLine, text: "Node.js" },
  { id: 4, icon: TbBrandTypescript, text: "TypeScript" },
  { id: 5, icon: RiTailwindCssFill, text: "Tailwind" },
  { id: 7, icon: SiExpress, text: "Express.JS" },
  { id: 8, icon: SiPostgresql, text: "PostgreSQL" },
  { id: 9, icon: SiRedis, text: "Redis" },
  { id: 11, icon: FaGitAlt, text: "Git" },
  { id: 12, icon: BsFiletypeSql, text: "SQL" },
  { id: 13, icon: FaDocker, text: "Docker" },
  { id: 14, icon: VscTerminalLinux, text: "Linux" },
  { id: 15, icon: DiMongodb, text: "MongoDB" },
  { id: 16, icon: DiJava, text: "Java" },

]

export const experience = [
  
  {
    id: 1,
    title: "Software Development Engineer",
    company: "Videosdk.live",
    location: "Surat",
    date: "Apr. 2024 – July 2025",
    points: [
      "Built collaborative whiteboard platform using WebRTC, WebSockets, and MediaSoup for 500+ concurrent participants",
      "Developed AI-powered workflow automation agents using React Flow, reducing meeting setup time by 40%",
      "Optimized React component rendering with Next.js code-splitting, improving page load time by 35%"
    ]
  },
  {
    id: 2,
    title: "Jr. Software Engineer",
    company: "Differenz System India",
    location: "Surat",
    date: "Sept. 2023 – Feb. 2024",
    points: [
      "Built reusable React.js admin dashboard component library with Redux state management",
      "Translated Figma designs into production-ready React components with pixel-perfect accuracy"
    ]
  },
  {
    id: 3,
    title: "Software Developer Intern",
    company: "Cactus Communications",
    location: "Mumbai",
    date: "Jan. 2023 – July 2023",
    points: [
      "Developed ML-powered chatbot interface using React.js and TypeScript, handling 1000+ daily queries",
      "Built Conference Finder platform using React.js and Elasticsearch with AI-powered matching algorithm"
    ]
  }
]

export const projects = [
  {
    id: 1,
    title: "StreamHub",
    badges: ["Main Project", "Running"],
    description: "A cutting-edge live streaming platform built with Next.js, Node.js, and MediaSoup (WebRTC SFU), designed with developer experience and user experience at its core. Currently my main focus, I'm continuously working to enhance its capabilities and make real-time communication as simple as traditional web development.",
    tech: ["Next.js", "Node.js", "WebRTC", "MediaSoup", "Socket.io", "MongoDB", "Redis", "RabbitMQ"],
    // liveUrl: "https://YOUR_LIVE_DEMO_URL",
    githubUrl: "https://github.com/sumit298/streamHub",
    gradient: "from-green-900 to-green-700",
    image: "/images/streamHub-preview.png",
    
  },
  {
    id: 2,
    title: "Multiplayer Whiteboard",
    badges: ["Running"],
    description: "Real-time collaborative whiteboard platform built using React, tldraw library, and Socket.IO. Enables 500+ concurrent participants to draw, sketch, and collaborate in real-time with low-latency synchronization.",
    tech: ["React.js", "TypeScript", "Socket.IO", "tldraw", "WebSockets"],
    liveUrl: "https://whiteboard-frontend-v1.netlify.app/",
    githubUrl: "https://github.com/sumit298/multiplayer-whiteboard",
    gradient: "from-blue-900 to-blue-700",
    image: "/images/whiteboard-preview.png"
  },
  {
    id: 3,
    title: "Realtime Chat Video App",
    badges: ["Running"],
    description: "Full-featured chat application with video calling capabilities built using React.js, Redux, and Firebase. Integrates WebRTC for peer-to-peer video communication with real-time messaging.",
    tech: ["React.js", "Redux", "Firebase", "WebRTC", "Firebase Auth", "Firestore", "CSS3"],
    liveUrl: "https://chat-app-0b0efd.netlify.app/login",
    githubUrl: "https://github.com/sumit298/realtime-chat-video-app",
    gradient: "from-teal-900 to-cyan-700",
    emoji: "💬",
    image: "/images/chat-preview.png"
  },
  {
    id: 4,
    title: "Smart Wardrobe",
    badges: ["Development"],
    description: "AI-powered outfit recommendation system featuring a Next.js frontend and Python ML pipeline using collaborative filtering. Architected microservices integration between Node.js backend and Python ML service.",
    tech: ["Next.js", "Python", "PyTorch", "MongoDB", "Redis", "Node.js"],
    githubUrl: "https://github.com/sumit298/smart-wardrobe",
    gradient: "from-purple-900 to-pink-800",
    emoji: "🤖"
  },
  {
    id: 5,
    title: "Leetcode Solutions",
    badges: ["Running"],
    description: "Collection of LeetCode problem solutions with explanations and multiple approaches. Built with Docusaurus for easy navigation.",
    tech: ["Docusaurus", "React.js", "JavaScript", "Algorithms", "Data Structures"],
    liveUrl: "https://dsa-solutions.netlify.app/",
    githubUrl: "https://github.com/sumit298/Leetcode-Solutions",
    gradient: "from-orange-900 to-red-700",
    image: "/images/leetcode-preview-light.png",
  },
  {
    id: 6,
    title: "Firebase Blog",
    badges: ["Running"],
    description: "Real-time React blog application exploring Firebase ecosystem. Features authentication, cloud storage, and Firestore database.",
    tech: ["React.js", "Firebase", "Firebase Auth", "Firebase Storage", "Cloud Functions", "Firestore", "Context API"],
    liveUrl: "https://firebase-blog-2758b3.netlify.app/",
    githubUrl: "https://github.com/sumit298/Firebase-Blog",
    gradient: "from-yellow-900 to-orange-700",
    emoji: "🔥"
  },
  
  {
    id: 7,
    title: "Story Surf Backend",
    badges: ["Development"],
    description: "REST API for a story sharing platform built with Spring Boot. Users can create, share, and interact with stories through likes, comments, and mood reactions.",
    tech: ["Java", "Spring Boot", "REST API", "JPA", "MySQL"],
    githubUrl: "https://github.com/sumit298/story-surf-backend",
    gradient: "from-indigo-900 to-blue-700",
    emoji: "📚"
  }
]

export const hireInfo = {
  text: "I'm currently available for full-time opportunities, and freelance projects. If you're looking for someone passionate, skilled, and ready to contribute, I'm here to help bring your ideas to life!",
  emailLink: "mailto:sumitsinha1007@gmail.com?subject=Interested%20in%20Hiring%20You"
}