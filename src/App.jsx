import fptLogo from './assets/fpt-education.png'
import './App.css'

const profile = {
  name: 'Pham Hoang Vi Dai',
  role: 'Frontend Developer Intern',
  phone: '0842440406',
  email: 'phamhoangvidai2006@gmail.com',
  facebook: 'https://www.facebook.com/vi.ai.162729',
  github: 'https://github.com/daniel-pham2006',
}

const skillGroups = [
  {
    label: 'Frontend',
    items: ['ReactJS', 'JavaScript ES6+', 'HTML5', 'CSS3', 'Responsive UI'],
  },
  {
    label: 'Engineering',
    items: ['Clean code', 'Git/GitHub', 'RESTful APIs', 'Component thinking'],
  },
  {
    label: 'Collaboration',
    items: ['UI/UX concepts', 'Backend teamwork', 'Feedback iteration'],
  },
]

const focusItems = [
  'Build maintainable React interfaces from clear requirements.',
  'Work smoothly with backend and cross-functional teammates.',
  'Improve UI quality through clean structure, responsive behavior, and user-focused details.',
]

const profileFacts = [
  ['University', 'FPT University'],
  ['Year', '3rd-year Software Engineering student'],
  ['Direction', 'Frontend Development'],
  ['Looking for', 'Frontend Developer Intern position'],
]

const workItems = [
  {
    title: 'Personal portfolio',
    desc: 'A focused portfolio site for internship applications, built with React and Vite, structured like an online CV.',
    stack: 'ReactJS / Vite / CSS3',
  },
  {
    title: 'Frontend practice repository',
    desc: 'A place to organize UI exercises, React components, and small web features while improving clean-coding habits.',
    stack: 'JavaScript ES6+ / HTML5 / CSS3',
  },
  {
    title: 'API integration learning',
    desc: 'Learning how frontend screens communicate with backend services through RESTful APIs and predictable data flows.',
    stack: 'RESTful APIs / React state / Fetch',
  },
]

function App() {
  return (
    <main>
      <nav className="site-nav" aria-label="Main navigation">
        <a className="brand-mark" href="#top" aria-label="Back to top">
          VD
        </a>
        <div className="nav-links">
          <a href="#profile">Profile</a>
          <a href="#skills">Skills</a>
          <a href="#work">Work</a>
          <a href="#contact">Contact</a>
        </div>
      </nav>

      <section className="hero-section" id="top">
        <div className="hero-copy">
          <p className="intro-line">Software Engineering Student</p>
          <h1>{profile.name}</h1>
          <p className="role-line">{profile.role}</p>
          <p className="lead">
            A 3rd-year Software Engineering student at FPT University
            specializing in Frontend Development, with solid foundations in
            ReactJS, JavaScript ES6+, HTML5/CSS3, and a basic understanding of
            Backend and RESTful APIs.
          </p>
          <div className="hero-actions">
            <a className="primary-action" href={`mailto:${profile.email}`}>
              Email me
            </a>
            <a
              className="secondary-action"
              href={profile.github}
              target="_blank"
              rel="noreferrer"
            >
              GitHub profile
            </a>
          </div>
        </div>

        <aside className="profile-panel" aria-label="Quick profile">
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

      <section className="section-grid" id="profile">
        <div className="section-heading">
          <p>Profile</p>
          <h2>Seeking to grow in a professional engineering environment.</h2>
        </div>
        <div className="summary-block">
          <p>
            I am eager to leverage strong UI/UX concepts and clean-coding
            practices in a Frontend Developer Intern position. My goal is to
            contribute to real-world web applications, collaborate effectively
            with backend and cross-functional teams, and rapidly improve through
            real product feedback.
          </p>
          <ul>
            {focusItems.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section-grid skill-section" id="skills">
        <div className="section-heading">
          <p>Skills</p>
          <h2>Technical foundation for frontend internship work.</h2>
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

      <section className="work-section" id="work">
        <div className="section-heading wide">
          <p>Work direction</p>
          <h2>Current portfolio areas, kept honest and easy to expand.</h2>
        </div>
        <div className="work-list">
          {workItems.map((item) => (
            <article className="work-card" key={item.title}>
              <span>{item.stack}</span>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="education-section">
        <div>
          <p className="section-label">Education</p>
          <h2>FPT University · Software Engineering</h2>
        </div>
        <p>
          Currently in the 3rd year, focusing on frontend fundamentals,
          reusable UI structure, API communication, and practical teamwork
          habits needed in a software engineering environment.
        </p>
      </section>

      <section className="contact-section" id="contact">
        <div>
          <p className="section-label">Contact</p>
          <h2>Available for Frontend Developer Intern opportunities.</h2>
        </div>
        <div className="contact-links">
          <a href={`mailto:${profile.email}`}>{profile.email}</a>
          <a href={`tel:${profile.phone}`}>{profile.phone}</a>
          <a href={profile.github} target="_blank" rel="noreferrer">
            GitHub
          </a>
          <a href={profile.facebook} target="_blank" rel="noreferrer">
            Facebook
          </a>
        </div>
      </section>
    </main>
  )
}

export default App
