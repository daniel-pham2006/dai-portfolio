import { useEffect, useMemo, useState } from 'react'
import fptLogo from './assets/fpt-education.png'
import heroArt from './assets/hero.png'
import './App.css'

const profile = {
  name: 'Pham Hoang Vi Dai',
  role: 'Backend / Node.js Developer Intern',
  phone: '0842440406',
  email: 'phamhoangvidai2006@gmail.com',
  facebook: 'https://www.facebook.com/vi.ai.162729',
  github: 'https://github.com/daniel-pham2006',
  linkedin: '',
}

const navItems = [
  { id: 'top', label: 'Home' },
  { id: 'profile', label: 'Profile' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'contact', label: 'Contact' },
]

const skillGroups = [
  {
    label: 'Backend',
    items: ['Node.js', 'Express.js', 'RESTful APIs', 'JWT', 'Java'],
  },
  {
    label: 'Database',
    items: ['PostgreSQL', 'SQL basics', 'Data modeling basics'],
  },
  {
    label: 'Frontend',
    items: ['ReactJS', 'JavaScript ES6+', 'HTML5', 'CSS3'],
  },
  {
    label: 'Testing',
    items: ['API testing', 'Manual testing', 'Debugging'],
  },
  {
    label: 'Tools',
    items: ['Git', 'GitHub', 'Docker basics', 'Vite', 'VS Code'],
  },
]

const focusItems = [
  'Build maintainable backend APIs with clear routes, predictable data flow, and readable code.',
  'Understand frontend integration needs so API contracts are practical for product screens.',
  'Learn quickly from code review, testing feedback, and real engineering workflows.',
]

const profileFacts = [
  ['University', 'FPT University'],
  ['Year', '3rd-year Software Engineering student'],
  ['Direction', 'Backend / Node.js Development'],
  ['Looking for', 'Backend Developer Intern position'],
]

const projects = [
  {
    title: 'ParkMaster',
    badge: 'Main project',
    desc: 'Parking building management system for facilities, vehicles, reservations, and payments.',
    stack: ['React', 'Node.js', 'Express', 'PostgreSQL', 'JWT'],
    live: 'https://parkmaster.vercel.app/',
    github: profile.github,
    featured: true,
  },
  {
    title: 'Personal Portfolio',
    desc: 'A focused portfolio site for internship applications, built with React and Vite as an online CV.',
    stack: ['React', 'Vite', 'CSS'],
    github: profile.github,
  },
  {
    title: 'API Integration Practice',
    desc: 'Small learning exercises for connecting frontend screens with REST APIs and predictable state.',
    stack: ['REST APIs', 'Fetch', 'React state'],
    github: profile.github,
  },
]

function getInitialTheme() {
  if (typeof window === 'undefined') return 'light'

  const storedTheme = window.localStorage.getItem('portfolio-theme')
  if (storedTheme === 'dark' || storedTheme === 'light') return storedTheme

  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light'
}

function App() {
  const [theme, setTheme] = useState(getInitialTheme)
  const [activeSection, setActiveSection] = useState('top')
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const themeLabel = theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'

  const socialLinks = useMemo(
    () => [
      { label: 'GitHub', href: profile.github },
      { label: 'LinkedIn', href: profile.linkedin },
      { label: 'Email', href: `mailto:${profile.email}` },
    ],
    [],
  )

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    window.localStorage.setItem('portfolio-theme', theme)
  }, [theme])

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 12)
    handleScroll()

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const sections = navItems
      .map((item) => document.getElementById(item.id))
      .filter(Boolean)

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]

        if (visible?.target?.id) {
          setActiveSection(visible.target.id)
        }
      },
      {
        rootMargin: '-22% 0px -58% 0px',
        threshold: [0.18, 0.35, 0.6],
      },
    )

    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  return (
    <main>
      <nav
        className={`site-nav ${isScrolled ? 'is-scrolled' : ''}`}
        aria-label="Main navigation"
      >
        <a className="brand-mark" href="#top" aria-label="Back to top">
          VD
        </a>

        <div
          className={`nav-links ${isMenuOpen ? 'is-open' : ''}`}
          id="mobile-navigation"
        >
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={activeSection === item.id ? 'is-active' : ''}
              aria-current={activeSection === item.id ? 'page' : undefined}
              onClick={() => setIsMenuOpen(false)}
            >
              {item.label}
            </a>
          ))}
        </div>

        <div className="nav-actions">
          <button
            className="theme-toggle"
            type="button"
            aria-label={themeLabel}
            aria-pressed={theme === 'dark'}
            onClick={() => setTheme((current) => (current === 'dark' ? 'light' : 'dark'))}
          >
            <span className="theme-toggle-track" aria-hidden="true">
              <span className="theme-toggle-thumb" />
            </span>
          </button>

          <button
            className="menu-toggle"
            type="button"
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-navigation"
            onClick={() => setIsMenuOpen((current) => !current)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </nav>

      <section className="hero-section" id="top">
        <div className="hero-copy page-load">
          <p className="intro-line">Software Engineering Student</p>
          <h1>{profile.name}</h1>
          <p className="role-line">{profile.role}</p>
          <p className="lead">
            I am a 3rd-year Software Engineering student at FPT University,
            focused on backend development with Node.js, Express, RESTful APIs,
            PostgreSQL, and clean teamwork habits for internship-ready projects.
          </p>

          <div className="hero-actions" aria-label="Primary actions">
            <a className="button button-primary" href="#projects">
              View projects
            </a>
            <a className="button button-secondary" href={profile.github} target="_blank" rel="noreferrer">
              GitHub
            </a>
            <a className="button button-ghost" href={`mailto:${profile.email}`}>
              Contact
            </a>
          </div>

          <div className="hero-socials" aria-label="Profile links">
            {socialLinks.map((link) =>
              link.href ? (
                <a key={link.label} href={link.href} target={link.href.startsWith('http') ? '_blank' : undefined} rel={link.href.startsWith('http') ? 'noreferrer' : undefined}>
                  {link.label}
                </a>
              ) : (
                <span key={link.label} className="link-placeholder" aria-label={`${link.label} link not added yet`}>
                  {link.label}
                </span>
              ),
            )}
          </div>
        </div>

        <aside className="profile-panel page-load" aria-label="Quick profile">
          <div className="hero-art-wrap">
            <img src={heroArt} alt="Layered backend architecture illustration" />
          </div>
          <div className="education-logo-wrap">
            <img src={fptLogo} alt="FPT Education logo" />
          </div>
          <dl className="profile-facts">
            {profileFacts.map(([label, value]) => (
              <div key={label}>
                <dt>{label}</dt>
                <dd>{value}</dd>
              </div>
            ))}
          </dl>
        </aside>
      </section>

      <section className="section-grid reveal" id="profile">
        <div className="section-heading">
          <p>Profile</p>
          <h2>Backend intern profile with practical product awareness.</h2>
        </div>
        <div className="summary-block">
          <p>
            My current goal is to grow in a professional engineering environment
            where I can contribute to backend services, understand real product
            constraints, and improve through code review and team feedback.
          </p>
          <ul>
            {focusItems.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section-grid skill-section reveal" id="skills">
        <div className="section-heading">
          <p>Skills</p>
          <h2>Core tools grouped around backend internship work.</h2>
        </div>
        <div className="skill-groups">
          {skillGroups.map((group) => (
            <section className="skill-group" key={group.label}>
              <h3>{group.label}</h3>
              <div className="skill-list" aria-label={`${group.label} skills`}>
                {group.items.map((skill) => (
                  <span key={skill}>{skill}</span>
                ))}
              </div>
            </section>
          ))}
        </div>
      </section>

      <section className="work-section reveal" id="projects">
        <div className="section-heading wide">
          <p>Projects</p>
          <h2>Selected work, led by the project most relevant to backend review.</h2>
        </div>
        <div className="work-list">
          {projects.map((item) => (
            <article
              className={`work-card ${item.featured ? 'is-featured' : ''}`}
              key={item.title}
            >
              <div className="card-topline">
                {item.badge ? <span className="project-badge">{item.badge}</span> : null}
                <span>{item.stack.join(' / ')}</span>
              </div>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
              <div className="project-stack" aria-label={`${item.title} tech stack`}>
                {item.stack.map((tech) => (
                  <span key={tech}>{tech}</span>
                ))}
              </div>
              <div className="project-links">
                <a href={item.github} target="_blank" rel="noreferrer">
                  GitHub
                </a>
                {item.live ? (
                  <a href={item.live} target="_blank" rel="noreferrer">
                    Live Demo
                  </a>
                ) : null}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="education-section reveal" id="education">
        <div>
          <p className="section-label">Education</p>
          <h2>FPT University · Software Engineering</h2>
        </div>
        <p>
          Currently in the 3rd year, focusing on backend fundamentals, API
          design, database usage, frontend integration, and practical teamwork
          habits needed in a software engineering environment.
        </p>
      </section>

      <section className="contact-section reveal" id="contact">
        <div>
          <p className="section-label">Contact</p>
          <h2>Available for Backend / Node.js internship opportunities.</h2>
        </div>
        <div className="contact-links">
          <a href={`mailto:${profile.email}`}>
            <span>Email</span>
            <strong>{profile.email}</strong>
          </a>
          <a href={`tel:${profile.phone}`}>
            <span>Phone</span>
            <strong>{profile.phone}</strong>
          </a>
          <a href={profile.github} target="_blank" rel="noreferrer">
            <span>GitHub</span>
            <strong>daniel-pham2006</strong>
          </a>
          <a href={profile.facebook} target="_blank" rel="noreferrer">
            <span>Facebook</span>
            <strong>vi.ai.162729</strong>
          </a>
        </div>
      </section>
    </main>
  )
}

export default App
