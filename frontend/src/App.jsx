import { useEffect, useMemo, useState } from "react";

const GA_ID = import.meta.env.VITE_GA_MEASUREMENT_ID;
const GITHUB_USERNAME = import.meta.env.VITE_GITHUB_USERNAME || "Dinakaran-k";

const profile = {
  name: "Dinakaran Kommunuri",
  headline: "Freelancer | Open to New Opportunities",
  role: "Android & Flutter Mobile Developer",
  location: "Andhra Pradesh, India",
  email: "dinakarankommunuri@gmail.com",
  phone: "+91 80964 75183",
  linkedin: "https://linkedin.com/in/dinakarankommunuri",
  githubUsername: GITHUB_USERNAME,
  summary:
    "Android Engineer with 4+ years of experience building and maintaining production mobile apps using Kotlin and Flutter, focused on performance, stability, and scalable architecture.",
  education: [
    {
      institution: "Vel Tech Rangarajan Dr. Sagunthala R&D Institute of Science & Technology, Chennai",
      degree: "B.Tech in Electronics and Communication Engineering",
      score: "CGPA: 8.25",
      startDate: "July 2017",
      endDate: "June 2021"
    }
  ],
  experiences: [
    {
      role: "Android Engineer (Engineer - SE)",
      company: "Innominds Software Pvt Ltd",
      startDate: "May 2025",
      endDate: "Present",
      achievements: [
        "Leading Android feature development from design to production release.",
        "Owning production stability by analyzing crash reports and resolving client issues.",
        "Optimizing multimedia and video workflows for better playback and lower network usage."
      ]
    },
    {
      role: "Android Developer (Mobile App Engineer)",
      company: "Hexaware Technologies",
      startDate: "Aug 2021",
      endDate: "Nov 2024",
      achievements: [
        "Contributed to Xamarin-to-native Android migration with feature parity and performance improvements.",
        "Reduced crash rates by around 30% through memory leak fixes and error handling improvements.",
        "Improved API response efficiency by around 25% using caching and Retrofit optimization."
      ]
    }
  ],
  skills: {
    Languages: ["Kotlin", "Java", "Dart", "C#"],
    "Mobile Development": ["Native Android", "Flutter", "Jetpack Compose", "Material Design", "XML"],
    Architecture: ["MVVM", "Clean Architecture", "MVI", "MVP"],
    Networking: ["Retrofit", "OkHttp", "REST APIs", "GraphQL", "WebSockets", "Dio"],
    "Data Storage": ["Room", "SQLite", "DataStore", "Hive"],
    "Tools & Quality": ["Android Studio", "Git", "SonarQube", "New Relic", "Firebase Crashlytics"]
  }
};

const freelanceProjects = [
  {
    title: "Turito - Live Learning App",
    impact: "Compose-first revamp that reduced layout complexity and improved release stability.",
    description: "Re-engineered screens with Jetpack Compose and improved app maintainability and release stability.",
    technologies: ["Kotlin", "Jetpack Compose", "MVVM", "Hilt", "Retrofit", "Crashlytics"],
    playStoreUrl: "https://play.google.com/store/search?q=turito&c=apps"
  },
  {
    title: "Ascott Star Rewards App",
    impact: "Migration support from Xamarin to native Android with cleaner MVVM architecture.",
    description: "Worked on migration from Xamarin to native Android and implemented booking and loyalty modules.",
    technologies: ["Kotlin", "Jetpack Compose", "MVVM", "Hilt", "Room", "Retrofit"],
    playStoreUrl: "https://play.google.com/store/apps/details?id=com.ascottcoltd.ascottstarrewards"
  },
  {
    title: "American Tower Site Access",
    impact: "Cross-platform delivery and dependable deployment workflow via App Center.",
    description: "Delivered cross-platform mobile features and build/deployment support via App Center.",
    technologies: ["React Native", "App Center"],
    playStoreUrl: "https://play.google.com/store/search?q=American%20Tower%20Site%20Access&c=apps"
  }
];

function Section({ id, title, subtitle, children }) {
  return (
    <section id={id} className="section-shell py-5 reveal">
      <div className="container">
        <div className="mb-4">
          <h2 className="section-title">{title}</h2>
          {subtitle && <p className="section-subtitle mb-0">{subtitle}</p>}
        </div>
        {children}
      </div>
    </section>
  );
}

function isAndroidRepo(repo) {
  const text = [repo.name, repo.description, ...(repo.topics || [])].join(" ").toLowerCase();
  return (
    repo.language === "Kotlin" ||
    repo.language === "Java" ||
    text.includes("android") ||
    text.includes("flutter") ||
    text.includes("jetpack") ||
    text.includes("compose")
  );
}

function formatDate(value) {
  if (!value) return "";
  return new Date(value).toLocaleDateString(undefined, { year: "numeric", month: "short" });
}

export default function App() {
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem("theme") !== "light");
  const [githubProjects, setGithubProjects] = useState([]);
  const [githubError, setGithubError] = useState("");
  const [githubLoading, setGithubLoading] = useState(true);

  useEffect(() => {
    document.documentElement.setAttribute("data-bs-theme", darkMode ? "dark" : "light");
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  useEffect(() => {
    if (!GA_ID) return;

    const script = document.createElement("script");
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
    document.head.appendChild(script);

    window.dataLayer = window.dataLayer || [];
    window.gtag = function gtag() {
      window.dataLayer.push(arguments);
    };
    window.gtag("js", new Date());
    window.gtag("config", GA_ID);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("in-view");
        });
      },
      { threshold: 0.14 }
    );

    const elements = document.querySelectorAll(".reveal");
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    async function loadGithubProjects() {
      try {
        const response = await fetch(
          `https://api.github.com/users/${encodeURIComponent(profile.githubUsername)}/repos?per_page=100&sort=updated`
        );

        if (!response.ok) throw new Error(`GitHub API request failed (${response.status})`);

        const repos = await response.json();
        const mapped = repos
          .filter((repo) => !repo.fork)
          .map((repo) => ({
            title: repo.name,
            description: repo.description || "No description provided.",
            repoUrl: repo.html_url,
            language: repo.language || "Unknown",
            stars: repo.stargazers_count,
            updated: formatDate(repo.pushed_at),
            isAndroid: isAndroidRepo(repo),
            pushedAt: repo.pushed_at
          }))
          .sort((a, b) => {
            if (a.isAndroid !== b.isAndroid) return a.isAndroid ? -1 : 1;
            return new Date(b.pushedAt) - new Date(a.pushedAt);
          });

        setGithubProjects(mapped);
      } catch (error) {
        setGithubError(error.message);
      } finally {
        setGithubLoading(false);
      }
    }

    loadGithubProjects();
  }, []);

  const groupedSkills = useMemo(() => Object.entries(profile.skills), []);

  function handleContactSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const name = formData.get("name");
    const email = formData.get("email");
    const message = formData.get("message");

    const subject = encodeURIComponent(`Portfolio contact from ${name}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
  }

  const resumeUrl = `${import.meta.env.BASE_URL}resume.pdf`;

  return (
    <div className="portfolio-root">
      <div className="hero-bg-grid" />
      <div className="hero-glow hero-glow-a" />
      <div className="hero-glow hero-glow-b" />

      <header id="top" className="hero-wrap pb-5">
        <nav className="navbar navbar-expand-lg py-3 sticky-top nav-blur">
          <div className="container">
            <a className="navbar-brand fw-semibold brand-mark" href="#top">
              {profile.name}
            </a>
            <div className="d-flex align-items-center gap-2">
              <a className="btn btn-sm btn-outline-light nav-chip d-none d-md-inline" href="#projects">Projects</a>
              <a className="btn btn-sm btn-outline-light nav-chip d-none d-md-inline" href="#contact">Hire Me</a>
              <button className="btn btn-sm btn-outline-light nav-chip" onClick={() => setDarkMode((v) => !v)}>
                {darkMode ? "Light" : "Dark"}
              </button>
            </div>
          </div>
        </nav>

        <div className="container pt-4 pt-md-5 reveal in-view">
          <div className="hero-pill mb-3">{profile.headline}</div>
          <h1 className="hero-title mb-3">{profile.role}</h1>
          <p className="hero-copy mb-4">{profile.summary}</p>
          <div className="d-flex flex-wrap gap-3 mb-4">
            <a className="btn btn-lg btn-accent" href="#contact">Open To Work</a>
            <a className="btn btn-lg btn-outline-light" href={resumeUrl} download>Download Resume</a>
            <a className="btn btn-lg btn-outline-light" href={`https://github.com/${profile.githubUsername}`} target="_blank" rel="noreferrer">GitHub Profile</a>
          </div>
          <div className="stat-row">
            <div className="stat-card"><span>4+ Years</span><small>Mobile Dev Experience</small></div>
            <div className="stat-card"><span>40+</span><small>Critical Bugs Resolved</small></div>
            <div className="stat-card"><span>Android + Flutter</span><small>Production Delivery</small></div>
          </div>
        </div>
      </header>

      <Section id="about" title="About Me" subtitle="Focused on robust architecture, release quality, and user-first mobile experiences.">
        <div className="row g-4 align-items-stretch">
          <div className="col-lg-7">
            <div className="glass-card h-100">
              <p className="mb-4">I build Android apps that stay stable in production and scale with product needs. My work combines architecture discipline with practical delivery under release pressure.</p>
              <div className="row g-3 text-body-secondary">
                <div className="col-sm-4"><strong className="text-body">Location</strong><br />{profile.location}</div>
                <div className="col-sm-4"><strong className="text-body">Email</strong><br />{profile.email}</div>
                <div className="col-sm-4"><strong className="text-body">Phone</strong><br />{profile.phone}</div>
              </div>
            </div>
          </div>
          <div className="col-lg-5">
            <div className="glass-card h-100">
              <h3 className="h6 text-uppercase text-body-secondary mb-3">Education</h3>
              {profile.education.map((edu) => (
                <div key={edu.degree}>
                  <h4 className="h5 mb-1">{edu.degree}</h4>
                  <p className="mb-1">{edu.institution}</p>
                  <p className="mb-1 text-body-secondary">{edu.startDate} - {edu.endDate}</p>
                  <span className="badge text-bg-secondary">{edu.score}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      <Section id="experience" title="Work Experience" subtitle="Recent roles and measurable impact across enterprise mobile products.">
        <div className="timeline-wrap">
          {profile.experiences.map((exp) => (
            <article className="timeline-item" key={`${exp.company}-${exp.role}`}>
              <div className="timeline-dot" />
              <div className="glass-card">
                <p className="text-body-secondary mb-1">{exp.startDate} - {exp.endDate}</p>
                <h3 className="h5 mb-1">{exp.role}</h3>
                <p className="fw-semibold mb-3">{exp.company}</p>
                <ul className="mb-0">
                  {exp.achievements.map((item) => <li key={item}>{item}</li>)}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </Section>

      <Section id="skills" title="Skills" subtitle="Core stack grouped by how I architect and ship mobile applications.">
        <div className="row g-3">
          {groupedSkills.map(([group, skillList]) => (
            <div className="col-lg-4 col-md-6" key={group}>
              <div className="glass-card h-100 skill-card">
                <h3 className="h6 text-uppercase text-body-secondary mb-3">{group}</h3>
                <div className="d-flex flex-wrap gap-2">
                  {skillList.map((skill) => (
                    <span className="skill-pill" key={skill}>{skill}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section id="projects" title="Projects" subtitle="Freelance projects from your resume + live GitHub repositories fetched in real time.">
        <h3 className="h5 mb-3">Freelance & Client Work</h3>
        <div className="row g-3 mb-5">
          {freelanceProjects.map((proj) => (
            <div className="col-lg-4 col-md-6" key={proj.title}>
              <article className="project-card h-100">
                <p className="project-impact">{proj.impact}</p>
                <h4 className="h6 mb-2">{proj.title}</h4>
                <p className="mb-3">{proj.description}</p>
                <small className="d-block mb-3 text-body-secondary">{proj.technologies.join(" • ")}</small>
                <a href={proj.playStoreUrl} target="_blank" rel="noreferrer">Open Play Store</a>
              </article>
            </div>
          ))}
        </div>

        <div className="d-flex flex-wrap align-items-center justify-content-between gap-2 mb-3">
          <h3 className="h5 mb-0">GitHub Repositories (Auto-updated)</h3>
          <a href={`https://github.com/${profile.githubUsername}`} target="_blank" rel="noreferrer">View all on GitHub</a>
        </div>

        {githubLoading && <p className="text-body-secondary">Loading GitHub repositories...</p>}
        {githubError && <p className="text-danger">{githubError}</p>}

        {!githubLoading && !githubError && (
          <div className="row g-3">
            {githubProjects.map((repo) => (
              <div className="col-xl-3 col-lg-4 col-md-6" key={repo.repoUrl}>
                <article className="github-card h-100">
                  <div className="d-flex align-items-center justify-content-between mb-2 gap-2">
                    <h4 className="h6 mb-0 text-truncate">{repo.title}</h4>
                    {repo.isAndroid && <span className="badge text-bg-success">Android</span>}
                  </div>
                  <p className="small mb-3">{repo.description}</p>
                  <small className="d-block text-body-secondary mb-2">{repo.language} • {repo.stars} stars</small>
                  <small className="d-block text-body-secondary mb-3">Updated {repo.updated}</small>
                  <a href={repo.repoUrl} target="_blank" rel="noreferrer">Open Repository</a>
                </article>
              </div>
            ))}
          </div>
        )}
      </Section>

      <section className="py-5 reveal">
        <div className="container">
          <div className="cta-band">
            <div>
              <h3 className="mb-1">Available for Android freelance and full-time opportunities</h3>
              <p className="mb-0">Let us discuss product goals, architecture, and release timelines.</p>
            </div>
            <a className="btn btn-accent" href="#contact">Start Conversation</a>
          </div>
        </div>
      </section>

      <Section id="contact" title="Contact" subtitle="Send a direct message and it opens your mail client with pre-filled details.">
        <form className="row g-3" onSubmit={handleContactSubmit}>
          <div className="col-md-6">
            <label className="form-label">Name</label>
            <input className="form-control form-control-lg" name="name" required />
          </div>
          <div className="col-md-6">
            <label className="form-label">Email</label>
            <input className="form-control form-control-lg" type="email" name="email" required />
          </div>
          <div className="col-12">
            <label className="form-label">Message</label>
            <textarea className="form-control form-control-lg" rows="5" name="message" required />
          </div>
          <div className="col-12 d-flex flex-wrap align-items-center gap-3">
            <button className="btn btn-accent btn-lg" type="submit">Send Message</button>
            <a href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
            <a href={`https://github.com/${profile.githubUsername}`} target="_blank" rel="noreferrer">GitHub</a>
          </div>
        </form>
      </Section>

      <footer className="py-4 text-center text-body-secondary">
        <div className="container small">
          <p className="mb-1">{profile.name} • Android & Flutter Developer</p>
          <p className="mb-0">Freelancer | Open to New Opportunities</p>
        </div>
      </footer>
    </div>
  );
}
