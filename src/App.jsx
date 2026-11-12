import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import fptLogo from "./assets/fpt-education.png";
import parkmasterImage from "./assets/parkmaster-home.png";
import ivsImage from "./assets/ivs-requests.png";
import Cursor from "./components/Cursor";
import Playground from "./components/Playground";
import "./App.css";

const HeroScene = lazy(() => import("./components/HeroScene"));

const person = {
  name: "Pham Hoang Vi Dai",
  email: "phamhoangvidai2006@gmail.com",
  phone: "0842440406",
  github: "https://github.com/daniel-pham2006",
  facebook: "https://www.facebook.com/vi.ai.162729",
};

const navigation = [
  ["about", "About"],
  ["work", "Work"],
  ["skills", "Skills"],
  ["playground", "Lab"],
  ["contact", "Contact"],
];

const projects = [
  {
    number: "01",
    title: "ParkMaster",
    subtitle: "Parking building management system",
    category: "Live product · Parking operations",
    image: parkmasterImage,
    imageAlt: "ParkMaster live website showing its smart parking homepage",
    imageNote: "Screenshot from the live ParkMaster website",
    intro:
      "A connected parking experience for drivers and the people operating multi-level facilities. The product brings reservation, arrival, active sessions and checkout into one flow.",
    context:
      "Drivers need to know where space is available and complete a parking visit without unnecessary steps. Operators need a shared view of occupancy, reservations and payments.",
    features: [
      "Reserve a space and see live availability across buildings, floors and zones",
      "AI-assisted slot scoring and assignment based on vehicle fit, capacity and distance",
      "Track parking sessions, payments and monthly passes",
      "Give staff and managers operational views of arrivals and facility activity",
    ],
    engineering:
      "React connects to Node.js and Express APIs backed by PostgreSQL, with JWT-based authentication. The product also presents an AI allocation flow and operational dashboards.",
    stack: ["React", "Node.js", "Express", "PostgreSQL", "JWT"],
    links: [
      { label: "Visit ParkMaster", href: "https://parkmaster.vercel.app/" },
    ],
  },
  {
    number: "02",
    title: "IVS HR Systems",
    subtitle: "Internal workforce operations",
    category: "Team project · Internal platform",
    image: ivsImage,
    imageAlt: "IVS HR Systems resource request prototype with sample data",
    imageNote: "Resource request prototype · sample data",
    intro:
      "An internal workspace that connects employee records, projects, resource allocation and staffing requests. It is designed for HR teams and managers who need a reliable picture of workforce capacity.",
    context:
      "Workforce information is spread across employee profiles, contracts, assignments and project demand. The system gives teams one place to review those connected records and act on resource needs.",
    features: [
      "Employee profiles, contracts and related history",
      "Project allocation, planned and actual man-month views, and dashboard summaries",
      "Excel import with validation and review before confirmation",
      "Resource request, position and candidate workflows with CV or profile links",
    ],
    engineering:
      "The stack combines a React and TypeScript frontend with TanStack Query, a modular NestJS API, Prisma and PostgreSQL. Docker Compose and Nginx support the application.",
    contribution: [
      "Built and iterated the resource-request frontend and its API integration.",
      "Implemented candidate selection and management flows, CV preview, and related position and candidate APIs.",
      "Developed soft-plan and allocation views, external-candidate mapping flows, and supporting tests.",
    ],
    stack: ["React", "TypeScript", "NestJS", "Prisma", "PostgreSQL"],
    links: [],
  },
];

const skillGroups = [
  {
    title: "Backend & APIs",
    text: "Routes, authentication, data flow and API contracts.",
    items: ["Node.js", "Express.js", "NestJS", "REST APIs", "JWT", "Java"],
  },
  {
    title: "Data & integration",
    text: "Relational data and the handoff between systems.",
    items: ["PostgreSQL", "Prisma", "SQL", "Excel import", "API testing"],
  },
  {
    title: "Interfaces",
    text: "Frontend work that makes the underlying system usable.",
    items: ["React", "TypeScript", "JavaScript", "HTML", "CSS", "Vite"],
  },
  {
    title: "Workflow",
    text: "Tools used while building, testing and shipping.",
    items: ["Git", "GitHub", "Docker", "Debugging", "Manual testing"],
  },
];

const ease = [0.22, 1, 0.36, 1];

function Reveal({ children, className = "", delay = 0 }) {
  const reduceMotion = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduceMotion ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.7, delay, ease }}
    >
      {children}
    </motion.div>
  );
}

function SectionLabel({ number, children }) {
  return (
    <div className="section-label">
      <span>{number}</span>
      <span>{children}</span>
      <i aria-hidden="true" />
    </div>
  );
}

function Project({ project }) {
  const [open, setOpen] = useState(true);
  const visual = useRef(null);
  const reduceMotion = useReducedMotion();

  const move = (event) => {
    if (
      reduceMotion ||
      !visual.current ||
      !window.matchMedia("(pointer:fine)").matches
    )
      return;
    const bounds = visual.current.getBoundingClientRect();
    visual.current.style.setProperty(
      "--project-x",
      `${((event.clientX - bounds.left) / bounds.width - 0.5) * 5}deg`,
    );
    visual.current.style.setProperty(
      "--project-y",
      `${((event.clientY - bounds.top) / bounds.height - 0.5) * -5}deg`,
    );
  };

  const reset = () => {
    if (!visual.current) return;
    visual.current.style.setProperty("--project-x", "0deg");
    visual.current.style.setProperty("--project-y", "0deg");
  };

  return (
    <Reveal className="project">
      <div className="project-heading">
        <span>{project.number} / 02</span>
        <span>{project.category}</span>
      </div>
      <div
        className="project-visual-frame"
        ref={visual}
        onPointerMove={move}
        onPointerLeave={reset}
      >
        <img src={project.image} alt={project.imageAlt} loading="lazy" />
        <span className="project-image-note">{project.imageNote}</span>
      </div>
      <div className="project-summary">
        <div>
          <p className="project-subtitle">{project.subtitle}</p>
          <h3>{project.title}</h3>
          <p className="project-intro">{project.intro}</p>
        </div>
        <button
          className="project-toggle"
          type="button"
          aria-expanded={open}
          aria-controls={`project-${project.number}-details`}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? "Close case study" : "Explore case study"}
          <span aria-hidden="true">{open ? "−" : "↗"}</span>
        </button>
      </div>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={`project-${project.number}-details`}
            className="project-details"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.42, ease }}
          >
            <div className="project-details-inner">
              <div className="detail-block">
                <span className="detail-number">01 / CONTEXT</span>
                <p>{project.context}</p>
              </div>
              <div className="detail-block">
                <span className="detail-number">02 / PRODUCT</span>
                <ul>
                  {project.features.map((feature) => (
                    <li key={feature}>{feature}</li>
                  ))}
                </ul>
              </div>
              <div className="detail-block">
                <span className="detail-number">03 / ENGINEERING</span>
                <p>{project.engineering}</p>
                <div className="stack-tags">
                  {project.stack.map((item) => (
                    <span key={item}>{item}</span>
                  ))}
                </div>
              </div>
              {project.contribution && (
                <div className="detail-block contribution-block">
                  <span className="detail-number">04 / MY CONTRIBUTION</span>
                  <ul>
                    {project.contribution.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              )}
              {project.links.length > 0 && (
                <div className="project-actions">
                  {project.links.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {link.label} <span aria-hidden="true">↗</span>
                    </a>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Reveal>
  );
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState("top");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const current = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (current) setActive(current.target.id);
      },
      { rootMargin: "-28% 0px -48% 0px", threshold: [0, 0.25, 0.5] },
    );
    document.querySelectorAll("main > section[id]").forEach((section) => {
      observer.observe(section);
    });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.classList.toggle("menu-open", menuOpen);
    const onKeyDown = (event) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.classList.remove("menu-open");
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [menuOpen]);

  return (
    <>
      <Cursor />
      <header className="site-header">
        <a
          className="wordmark"
          href="#top"
          aria-label="Pham Hoang Vi Dai, back to top"
        >
          vd<span>.</span>
          <small>PHAM HOANG VI DAI</small>
        </a>
        <nav
          id="main-nav"
          className={`main-nav ${menuOpen ? "open" : ""}`}
          aria-label="Main navigation"
        >
          {navigation.map(([id, label]) => (
            <a
              href={`#${id}`}
              key={id}
              className={active === id ? "active" : ""}
              onClick={() => setMenuOpen(false)}
            >
              {label}
            </a>
          ))}
        </nav>
        <div className="header-end">
          <span className="availability">
            <i /> Open to backend internships
          </span>
          <button
            className={`menu-button ${menuOpen ? "open" : ""}`}
            type="button"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="main-nav"
            onClick={() => setMenuOpen((value) => !value)}
          >
            <span />
            <span />
          </button>
        </div>
      </header>

      <main>
        <section className="hero" id="top">
          <div className="hero-inner">
            <Reveal className="hero-content">
              <p className="hero-eyebrow">
                Pham Hoang Vi Dai <span>/</span> Software Engineering
              </p>
              <h1>
                Building systems that make everyday work <em>easier.</em>
              </h1>
              <p className="hero-description">
                I’m Đại, a third-year student at FPT University focused on
                backend development. My work spans parking operations, internal
                HR tools and the interfaces that connect people to those
                systems.
              </p>
              <div className="hero-actions">
                <a className="primary-link" href="#work">
                  See selected work <span>↗</span>
                </a>
                <a className="secondary-link" href={`mailto:${person.email}`}>
                  Get in touch <span>↗</span>
                </a>
              </div>
            </Reveal>
            <div
              className="hero-object"
              aria-label="Interactive abstract sculpture"
            >
              <Suspense
                fallback={
                  <div className="scene-fallback" aria-hidden="true">
                    <div className="fallback-ring" />
                  </div>
                }
              >
                <HeroScene />
              </Suspense>
              <span className="object-caption">
                An exploration in form and motion
              </span>
            </div>
          </div>
          <div className="hero-foot">
            <span>FPT University · Vietnam</span>
            <a href="#about">
              Scroll to explore <span>↓</span>
            </a>
          </div>
        </section>

        <section className="about-section section" id="about">
          <SectionLabel number="01">About & education</SectionLabel>
          <div className="about-layout">
            <Reveal>
              <h2 className="section-title">
                Curious about how things work. Careful about how they feel.
              </h2>
            </Reveal>
            <Reveal className="about-story" delay={0.1}>
              <p>
                I study Software Engineering at FPT University and am working
                toward a Backend / Node.js Developer internship. I enjoy turning
                complex workflows into clear APIs, dependable data structures
                and usable screens.
              </p>
              <p>
                ParkMaster and IVS HR Systems show the kind of problems I
                gravitate toward: connecting many steps of a real operation
                without losing sight of the people using it.
              </p>
              <div className="about-principles">
                <div>
                  <span>01</span>
                  <p>Readable code and predictable data flow</p>
                </div>
                <div>
                  <span>02</span>
                  <p>API contracts that make frontend integration practical</p>
                </div>
                <div>
                  <span>03</span>
                  <p>Learning through testing, review and team feedback</p>
                </div>
              </div>
            </Reveal>
          </div>
          <Reveal className="education-band">
            <div className="education-logo">
              <img
                src={fptLogo}
                alt="FPT Education — Trường Đại học FPT"
                loading="lazy"
              />
            </div>
            <div>
              <span className="mini-label">EDUCATION</span>
              <strong>FPT University</strong>
              <p>Third-year Software Engineering student</p>
            </div>
            <span className="education-index">/ 2026</span>
          </Reveal>
        </section>

        <section className="work-section section" id="work">
          <SectionLabel number="02">Selected work</SectionLabel>
          <Reveal className="work-heading">
            <h2 className="section-title">
              Projects with real workflows behind them.
            </h2>
            <p>
              Two systems built around daily operations: one for parking, one
              for workforce planning. Explore the product, the technical
              structure and the features each brings together.
            </p>
          </Reveal>
          <div className="project-list">
            {projects.map((project) => (
              <Project project={project} key={project.title} />
            ))}
          </div>
          <div className="other-work">
            <span>ALSO BUILT</span>
            <p>
              This portfolio — a React and Vite site for presenting my work and
              experimenting with interaction.
            </p>
            <a href={person.github} target="_blank" rel="noreferrer">
              More on GitHub ↗
            </a>
          </div>
        </section>

        <section className="skills-section section" id="skills">
          <SectionLabel number="03">Skills & tools</SectionLabel>
          <Reveal className="skills-heading">
            <h2 className="section-title">A toolkit shaped by building.</h2>
            <p>Technologies from my portfolio and the projects shown above.</p>
          </Reveal>
          <div className="skills-grid">
            {skillGroups.map((group, index) => (
              <Reveal
                className="skill-group"
                key={group.title}
                delay={index * 0.05}
              >
                <span className="skill-index">0{index + 1}</span>
                <h3>{group.title}</h3>
                <p>{group.text}</p>
                <div className="skill-tags">
                  {group.items.map((item) => (
                    <span key={item}>{item}</span>
                  ))}
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        <Playground />

        <section className="contact-section" id="contact">
          <div className="contact-inner">
            <SectionLabel number="05">Contact</SectionLabel>
            <Reveal>
              <p className="contact-prelude">
                Open to Backend / Node.js internship opportunities
              </p>
              <h2>
                Have a project in mind? <em>Let’s talk.</em>
              </h2>
              <a className="contact-email" href={`mailto:${person.email}`}>
                {person.email} <span>↗</span>
              </a>
            </Reveal>
            <footer>
              <div>
                <strong>Pham Hoang Vi Dai</strong>
                <span>Software Engineering · FPT University</span>
              </div>
              <div className="footer-links">
                <a href={`tel:${person.phone}`}>{person.phone}</a>
                <a href={person.github} target="_blank" rel="noreferrer">
                  GitHub ↗
                </a>
                <a href={person.facebook} target="_blank" rel="noreferrer">
                  Facebook ↗
                </a>
              </div>
              <a className="back-top" href="#top">
                Back to top ↑
              </a>
            </footer>
          </div>
        </section>
      </main>
    </>
  );
}

export default App;
