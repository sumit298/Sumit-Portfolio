import React, { useState } from 'react';
import { ExternalLink } from 'lucide-react';
import { FaGithub } from 'react-icons/fa6';
import { MdOutlineMail, MdKeyboardDoubleArrowDown, MdKeyboardDoubleArrowUp } from 'react-icons/md';
import AnimatedWrapper from './components/AnimatedWrapper';
import { personalInfo, socialLinks, contactInfo, skills, experience, projects, hireInfo } from './data/portfolioData';

const Portfolio = () => {
  const [showAllProjects, setShowAllProjects] = useState(false);
  const getBadgeClass = (badge) => {
    switch (badge) {
      case 'Main Project': return 'badge badge-main';
      case 'Running': return 'badge badge-running';
      case 'Development': return 'badge badge-development';
      default: return 'badge';
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-gray-200">
      <div className="max-w-4xl mx-auto px-8 py-18">
        
        {/* Header */}
        <AnimatedWrapper delay={0.1}>
        <header className="flex flex-col sm:flex-row items-start gap-6 mb-16">
          <img 
            src={personalInfo.image}
            alt={personalInfo.name}
            className="w-24 h-24 sm:w-32 sm:h-32 rounded-2xl object-cover"
          />
          <div className="flex-1 w-full">
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-2">
              <h1 className="text-2xl sm:text-3xl font-bold text-white">{personalInfo.name}</h1>
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/30 text-green-500 text-sm w-fit">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                Available
              </div>
            </div>
            <p className="text-gray-400 mb-4">{personalInfo.bio}</p>
            <div className="flex gap-3">
              {socialLinks.map((link) => (
                <a key={link.id} href={link.link} className="social-card" target="_blank" rel="noopener noreferrer">
                  <link.icon size={16} />
                </a>
              ))}
            </div>
          </div>
        </header>
        </AnimatedWrapper>

        {/* About Me */}
        <AnimatedWrapper delay={0.2}>
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-white mb-6">About Me.</h2>
          <div 
            className="text-gray-400 space-y-4 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: personalInfo.about }}
          />
        </section>
        </AnimatedWrapper>

        {/* Skills & Tools */}
        <AnimatedWrapper delay={0.3}>
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-white mb-6">Skills & Tools.</h2>
          <div className="flex flex-wrap gap-3">
            {skills.map((skill) => (
              <span key={skill.id} className="skills-card">
                <skill.icon size={16} />
                {skill.text}
              </span>
            ))}
          </div>
        </section>
        </AnimatedWrapper>

        {/* Experience */}
        <AnimatedWrapper delay={0.4}>
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-white mb-6">Experience.</h2>
          <div className="space-y-8">
            {experience.map((exp) => (
              <div key={exp.id} className="border-l-2 border-[#2a2a2a] pl-6 relative">
                <div className="absolute w-3 h-3 bg-blue-500 rounded-full -left-[7px] top-1"></div>
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-semibold text-white">{exp.title}</h3>
                  <span className="text-sm text-gray-400">{exp.date}</span>
                </div>
                <p className="text-gray-400 mb-3">{exp.company} • {exp.location}</p>
                <ul className="text-gray-400 text-sm space-y-1">
                  {exp.points.map((point, idx) => (
                    <li key={idx}>• {point}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
        </AnimatedWrapper>

        {/* Projects */}
        <AnimatedWrapper delay={0.5}>
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-white mb-6">Projects.</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {(showAllProjects ? projects : projects.slice(0, 4)).map((project) => {
              const handleClick = () => {
                const url = project.liveUrl || project.githubUrl;
                if (url) {
                  window.open(url, '_blank');
                }
              };
              
              return (
                <div 
                  key={project.id} 
                  className="project-card cursor-pointer" 
                  onClick={handleClick}
                >
                  {project.image ? (
                    <div className="h-48 overflow-hidden">
                      <img 
                        src={project.image} 
                        alt={`${project.title} preview`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ) : (
                    <div className={`h-48 bg-gradient-to-br ${project.gradient} flex items-center justify-center`}>
                      <div className="text-center text-white/80">
                        <div className="text-4xl mb-2">{project.emoji}</div>
                        <div className="text-sm">{project.title} Interface</div>
                      </div>
                    </div>
                  )}
                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <h3 className="text-xl font-semibold text-white">{project.title}</h3>
                      {project.badges.map((badge, idx) => (
                        <span key={idx} className={getBadgeClass(badge)}>
                          {badge}
                        </span>
                      ))}
                      <div className="ml-auto flex gap-2">
                        {project.liveUrl && (
                          <ExternalLink size={16} className="text-gray-400 hover:text-white" />
                        )}
                        <FaGithub size={16} className="text-gray-400 hover:text-white" />
                      </div>
                    </div>
                    <p className="text-gray-400 mb-4 text-sm leading-relaxed">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((tech) => (
                        <span key={tech} className="tech-tag">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          
          {projects.length > 4 && (
            <div className="text-center mt-8">
              <button 
                onClick={() => setShowAllProjects(!showAllProjects)}
                className="btn inline-flex items-center gap-2"
              >
                {showAllProjects ? (
                  <>
                    <MdKeyboardDoubleArrowUp size={16} />
                    Show Less
                  </>
                ) : (
                  <>
                    <MdKeyboardDoubleArrowDown size={16} />
                    Show More
                  </>
                )}
              </button>
            </div>
          )}
        </section>
        </AnimatedWrapper>

        {/* Reach out to me */}
        <AnimatedWrapper delay={0.6}>
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-white mb-6">Reach out to me.</h2>
          <p className="text-gray-400 mb-6">{contactInfo.text}</p>
          <div className="flex gap-4">
            {contactInfo.links.map((link) => (
              <a key={link.id} href={link.link} className="btn" target="_blank" rel="noopener noreferrer">
                <link.icon size={16} />
                {link.name}
              </a>
            ))}
          </div>
        </section>
        </AnimatedWrapper>

        {/* Hire Me */}
        <AnimatedWrapper delay={0.7}>
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-white mb-6">Hire Me.</h2>
          <p className="text-gray-400 mb-6">{hireInfo.text}</p>
          <a href={hireInfo.emailLink} className="btn btn-primary">
            <span>📄</span>
            Hire Me
          </a>
        </section>
        </AnimatedWrapper>

        {/* Footer */}
        <AnimatedWrapper delay={0.8}>
        <footer className="border-t border-[#2a2a2a] pt-8 text-center">
          <div className="flex justify-center gap-6 mb-4">
            {socialLinks.map((link) => (
              <a key={link.id} href={link.link} className="text-gray-400 hover:text-white flex items-center gap-2 text-sm" target="_blank" rel="noopener noreferrer">
                <link.icon size={16} />
                <span className="hidden md:block">{link.name}</span>
              </a>
            ))}
            <a href="mailto:sumitsinha1007@gmail.com" className="text-gray-400 hover:text-white flex items-center gap-2 text-sm">
              <MdOutlineMail size={16} />
              <span className="hidden md:block">Mail</span>
            </a>
          </div>
          <p className="text-gray-500 text-sm">© 2025 {personalInfo.name}. All rights reserved.</p>
        </footer>
        </AnimatedWrapper>

      </div>
    </div>
  );
};

export default Portfolio;