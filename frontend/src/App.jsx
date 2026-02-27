import { useEffect, useMemo, useState } from "react";
import {
  FaAndroid,
  FaArrowRight,
  FaBookOpen,
  FaArrowUpRightFromSquare,
  FaBolt,
  FaBriefcase,
  FaCodeBranch,
  FaEnvelope,
  FaFire,
  FaGithub,
  FaGooglePlay,
  FaGraduationCap,
  FaLinkedin,
  FaLocationDot,
  FaMedal,
  FaPhone,
  FaRocket,
  FaMoon,
  FaRegStar,
  FaSun,
  FaTerminal,
  FaUserTie,
  FaWandMagicSparkles
} from "react-icons/fa6";

const GA_ID = import.meta.env.VITE_GA_MEASUREMENT_ID;
const GITHUB_USERNAME = import.meta.env.VITE_GITHUB_USERNAME || "Dinakaran-k";

const profile = {
  name: "Dinakaran Kommunuri",
  headline: "Freelancer | Open to New Opportunities",
  role: "Android Engineer | Kotlin & Flutter",
  location: "Andhra Pradesh, India",
  email: "dinakarankommunuri@gmail.com",
  phone: "+91 8096475183",
  linkedin: "https://www.linkedin.com/in/dinakarankommunuri/",
  githubUsername: GITHUB_USERNAME,
  heroIntro:
    "Android Engineer with 4 years of hands-on experience delivering production-grade apps using Kotlin and Flutter, with strong ownership in Jetpack Compose, MVVM, Clean Architecture, and release stability.",
  summary:
    "Android Engineer with 4 years of hands-on experience building and maintaining production-grade mobile applications using Kotlin and Flutter. Strong expertise in native Android development with a growing focus on cross-platform solutions using Flutter and Dart. Proven track record in performance optimization, application stability, and scalable architecture using Jetpack Compose, MVVM, and Clean Architecture. Experienced in delivering enterprise-scale applications, resolving production issues, supporting releases, and collaborating closely with cross-functional teams throughout the software development lifecycle in Agile environments.",
  education: {
    institution: "Vel Tech Rangarajan Dr. Sagunthala R & D Institute of Science & Technology, Chennai",
    degree: "B.Tech in Electronics and Communication Engineering",
    score: "CGPA: 8.25",
    startDate: "July 2017",
    endDate: "June 2021"
  }
};

const experience = [
  {
    role: "Android Engineer (Engineer - SE)",
    company: "Innominds Software PVT LTD",
    startDate: "May 2025",
    endDate: "Jan 2026",
    achievements: [
      "Leading development and enhancement of Android application features from design through production release.",
      "Building modern, responsive user interfaces using Jetpack Compose and XML for multiple device types.",
      "Owning production stability by analyzing crash reports and resolving issues from clients and monitoring tools.",
      "Optimized multimedia processing and video workflows, improving playback performance and reducing network usage.",
      "Supporting Play Store releases, hotfix validations, and post-release issue monitoring."
    ]
  },
  {
    role: "Android Developer (Mobile App Engineer)",
    company: "Hexaware Technologies",
    startDate: "Aug 2021",
    endDate: "Nov 2024",
    achievements: [
      "Developed and maintained large-scale native Android applications using Kotlin.",
      "Migrated features from Xamarin (C#) to native Android with feature parity and performance improvements.",
      "Reduced crash rates by approximately 30% through memory leak fixes and stronger error handling.",
      "Improved API performance with caching and Retrofit optimization, reducing latency by around 25%.",
      "Collaborated with design, QA, and backend teams in Agile sprints for stable production releases."
    ]
  }
];

const skills = {
  Languages: ["Kotlin", "Java", "Dart", "C#"],
  "Mobile Development": ["Native Android", "Flutter", "Android SDK", "Jetpack", "Jetpack Compose", "Material Design", "XML", "JSON"],
  "Architecture & Patterns": ["MVVM", "Clean Architecture", "MVI", "MVP"],
  "Android Components": ["ViewModel", "Navigation Component", "LiveData", "WorkManager", "Fragments", "Activities", "Broadcast Receivers", "Services", "Content Providers"],
  "Asynchronous Programming": ["Kotlin Coroutines", "Flow", "LiveData", "Dart async/await"],
  Networking: ["Retrofit", "OkHttp", "RESTful APIs", "GraphQL", "WebSockets", "Dio"],
  "Dependency Injection": ["Hilt", "Dagger", "Koin"],
  "Data Storage": ["Room", "SQLite", "SharedPreferences", "DataStore", "Hive"],
  Libraries: ["Glide", "Coil", "Picasso", "Gson", "Moshi", "Lottie"],
  "Development Tools & Quality": ["Android Studio", "VS Code", "Git", "SonarQube", "App Center"],
  "Performance & Monitoring": ["New Relic", "Firebase Crashlytics", "Android Profiler", "BrowserStack"]
};

const notableAchievements = [
  "Resolved 40+ critical production bugs within short timelines, significantly improving application stability.",
  "Identified and fixed memory leaks that contributed to a substantial reduction in crash rates.",
  "Performed comprehensive manual QA across edge cases and devices, ensuring regression-free releases.",
  "Played a key role in migrating enterprise applications from Xamarin to native Android using Kotlin.",
  "Recognized for writing clean, well-documented code that helped onboard new developers efficiently."
];

const clientProjects = [
  {
    title: "Turito - Live Learning App (Yupp TV Client)",
    duration: "May 2025 - Jan 2026",
    impact: "Re-engineered legacy screens with Jetpack Compose, reducing layout complexity by about 40%.",
    technologies: ["Kotlin", "Jetpack Compose", "MVVM", "XML", "Hilt", "Retrofit", "Firebase Crashlytics", "SonarQube"],
    playStoreUrl: "https://play.google.com/store/apps/details?id=com.yuppmaster"
  },
  {
    title: "Ascott Star Rewards App (Capitaland Client)",
    duration: "Nov 2022 - Nov 2024",
    impact: "Supported Xamarin-to-native migration and improved architecture with MVVM + Hilt.",
    technologies: ["Kotlin", "Jetpack Compose", "MVVM", "Hilt", "Retrofit", "Room", "SonarQube", "New Relic"],
    playStoreUrl: "https://play.google.com/store/apps/details?id=com.theascott.asr&hl=en_US"
  },
  {
    title: "Discover ASR (Capitaland Client)",
    duration: "June 2022 - Nov 2022",
    impact: "Improved Xamarin app stability with crash fixes, memory optimizations, and regression test support.",
    technologies: ["Xamarin", "App Center", "BrowserStack"],
    playStoreUrl: "https://play.google.com/store/apps/details?id=com.theascott.asr&hl=en_US"
  },
  {
    title: "AMT Site Access Mobile Application (American Towers Client)",
    duration: "Feb 2022 - May 2022",
    impact: "Delivered cross-platform React Native features and managed builds/deployments through App Center.",
    technologies: ["React Native", "App Center"],
    playStoreUrl: "https://play.google.com/store/apps/details?id=com.americantower&hl=en"
  }
];

const skillTicker = [
  "Kotlin",
  "Jetpack Compose",
  "Flutter",
  "MVVM",
  "Clean Architecture",
  "Crashlytics",
  "Retrofit",
  "Hilt",
  "Room",
  "GraphQL",
  "New Relic",
  "Play Store Release"
];

const clientValuePoints = [
  {
    icon: <FaRocket />,
    title: "Outcome-First Delivery",
    text: "Build features that ship on time and map cleanly to product goals."
  },
  {
    icon: <FaFire />,
    title: "Production Stability",
    text: "Crash-focused debugging and performance tuning for dependable releases."
  },
  {
    icon: <FaBriefcase />,
    title: "Enterprise Collaboration",
    text: "Strong sync with QA, backend, and design in Agile delivery cycles."
  }
];

const educationStrengths = [
  "Systems thinking",
  "Analytical debugging",
  "Structured problem solving",
  "Documentation discipline"
];

function Section({ id, title, icon, subtitle, children }) {
  return (
    <section id={id} className="section-shell py-5 reveal">
      <div className="container">
        <div className="mb-4 d-flex align-items-start gap-3">
          <span className="section-icon">{icon}</span>
          <div>
            <h2 className="section-title">{title}</h2>
            {subtitle && <p className="section-subtitle mb-0">{subtitle}</p>}
          </div>
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

    return () => document.head.removeChild(script);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("in-view");
        });
      },
      { threshold: 0.05, rootMargin: "0px 0px -8% 0px" }
    );

    const elements = document.querySelectorAll(".reveal");
    elements.forEach((el) => {
      if (el.getBoundingClientRect().top < window.innerHeight * 0.92) {
        el.classList.add("in-view");
      }
      observer.observe(el);
    });
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

  useEffect(() => {
    if (!window.matchMedia("(hover: hover)").matches) return;

    const cards = document.querySelectorAll(".project-card, .github-card, .glass-card");
    const handlers = [];

    cards.forEach((card) => {
      const move = (event) => {
        const rect = card.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        card.style.setProperty("--mx", `${x}px`);
        card.style.setProperty("--my", `${y}px`);
      };
      const leave = () => {
        card.style.setProperty("--mx", "50%");
        card.style.setProperty("--my", "50%");
      };
      card.addEventListener("pointermove", move);
      card.addEventListener("pointerleave", leave);
      handlers.push({ card, move, leave });
    });

    return () => {
      handlers.forEach(({ card, move, leave }) => {
        card.removeEventListener("pointermove", move);
        card.removeEventListener("pointerleave", leave);
      });
    };
  }, []);

  const groupedSkills = useMemo(() => Object.entries(skills), []);

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
      <div className="hero-glow hero-glow-c" />

      <header id="top" className="hero-wrap pb-5">
        <nav className="navbar navbar-expand-lg py-3 sticky-top nav-blur">
          <div className="container">
            <a className="navbar-brand fw-semibold brand-mark d-flex align-items-center gap-2" href="#top" aria-label="Go to top">
              <span className="brand-glyph"><FaAndroid /></span>
              <span className="brand-name">{profile.name}</span>
              <span className="brand-dot" />
            </a>
            <div className="d-flex align-items-center gap-2">
              <a className="btn btn-sm btn-outline-light nav-chip d-none d-md-inline" href="#projects" aria-label="Projects" title="Projects"><FaCodeBranch /></a>
              <a className="btn btn-sm btn-outline-light nav-chip d-none d-md-inline" href="#contact" aria-label="Hire Me" title="Hire Me"><FaUserTie /></a>
              <button className="btn btn-sm btn-outline-light nav-chip" onClick={() => setDarkMode((v) => !v)} aria-label={darkMode ? "Switch to light theme" : "Switch to dark theme"} title={darkMode ? "Light theme" : "Dark theme"}>
                {darkMode ? <FaSun /> : <FaMoon />}
              </button>
            </div>
          </div>
        </nav>

        <div className="container pt-4 pt-md-5 reveal in-view hero-stage">
          <div className="row g-4 align-items-center">
            <div className="col-lg-6">
              <div className="hero-pill mb-3"><FaFire /> {profile.headline}</div>
              <h1 className="hero-title mb-3">{profile.role}</h1>
              <p className="hero-copy mb-4">{profile.heroIntro}</p>
              <div className="d-flex flex-wrap gap-3 mb-4">
                <a className="btn btn-lg btn-accent icon-only-cta" href="#contact" aria-label="Open to work" title="Open to work"><FaWandMagicSparkles /></a>
                <a className="btn btn-lg btn-ghost icon-only-cta" href={resumeUrl} download aria-label="Download resume" title="Download resume"><FaBookOpen /></a>
                <a className="btn btn-lg btn-ghost icon-only-cta" href={`https://github.com/${profile.githubUsername}`} target="_blank" rel="noreferrer" aria-label="GitHub profile" title="GitHub profile"><FaGithub /></a>
              </div>
              <div className="stat-row">
                <div className="stat-card"><span>4 Years</span><small>Mobile App Engineering</small></div>
                <div className="stat-card"><span>40+</span><small>Critical Bugs Resolved</small></div>
                <div className="stat-card"><span>30%</span><small>Crash-rate Reduction</small></div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="orbit-panel">
                <div className="orbit-core">
                  <FaAndroid />
                  <span>Mobile Stack</span>
                </div>
                <div className="orbit-ring ring-one" />
                <div className="orbit-ring ring-two" />
                <div className="orbit-node n1"><FaAndroid /> Kotlin</div>
                <div className="orbit-node n2"><FaBolt /> Jetpack Compose</div>
                <div className="orbit-node n3"><FaTerminal /> MVVM</div>
                <div className="orbit-node n4"><FaFire /> Clean Architecture</div>
              </div>
            </div>
          </div>

          <div className="ticker-wrap mt-4">
            <div className="ticker-track">
              {[...skillTicker, ...skillTicker].map((item, idx) => (
                <span key={`${item}-${idx}`} className="ticker-item"><FaTerminal /> {item}</span>
              ))}
            </div>
          </div>
          <span className="hero-deco deco-a" />
          <span className="hero-deco deco-b" />
          <span className="hero-deco deco-c" />
        </div>
      </header>

      <Section id="about" title="About Me" icon={<FaUserTie />} subtitle="Profile details updated from your latest resume.">
        <div className="row g-4 align-items-stretch">
          <div className="col-lg-8">
            <div className="glass-card h-100 about-hero-panel">
              <div className="d-flex flex-wrap gap-2 mb-3">
                <span className="mini-badge">Open to Client Engagements</span>
                <span className="mini-badge">Android + Flutter Engineering</span>
                <span className="mini-badge">Release Ownership</span>
              </div>

              <p className="mb-4 about-summary">{profile.summary}</p>

              <div className="row g-3 mb-3">
                {clientValuePoints.map((item) => (
                  <div className="col-md-4" key={item.title}>
                    <article className="about-highlight-card">
                      <span className="about-highlight-icon">{item.icon}</span>
                      <h3 className="h6 mb-1">{item.title}</h3>
                      <p className="mb-0 section-minor small">{item.text}</p>
                    </article>
                  </div>
                ))}
              </div>

              <div className="row g-3 meta-grid">
                <div className="col-sm-6">
                  <strong><FaLocationDot /> Location</strong>
                  <div className="meta-value">{profile.location}</div>
                </div>
                <div className="col-sm-6">
                  <strong><FaEnvelope /> Email</strong><br />
                  <div className="meta-action-row">
                    <span className="meta-value meta-ellipsis" title={profile.email}>{profile.email}</span>
                    <a className="contact-link icon-only-link" href={`mailto:${profile.email}`} aria-label="Send email" title="Send email"><FaEnvelope /></a>
                  </div>
                </div>
                <div className="col-sm-6">
                  <strong><FaPhone /> Mobile</strong><br />
                  <div className="meta-action-row">
                    <span className="meta-value">{profile.phone}</span>
                    <a className="contact-link icon-only-link" href={`tel:${profile.phone.replace(/\s+/g, "")}`} aria-label="Call mobile number" title="Call"><FaPhone /></a>
                  </div>
                </div>
                <div className="col-sm-6">
                  <strong><FaLinkedin /> LinkedIn</strong>
                  <div className="meta-action-row">
                    <span className="meta-value meta-ellipsis" title="dinakarankommunuri">dinakarankommunuri</span>
                    <a className="contact-link icon-only-link" href={profile.linkedin} target="_blank" rel="noreferrer" aria-label="Open LinkedIn profile" title="LinkedIn"><FaArrowUpRightFromSquare /></a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-4">
            <div className="glass-card h-100 education-card">
              <h3 className="h6 text-uppercase section-minor mb-3"><FaGraduationCap /> Education</h3>
              <p className="section-minor mb-2">Academic Foundation</p>
              <h4 className="h5 mb-1">{profile.education.degree}</h4>
              <p className="mb-1">{profile.education.institution}</p>
              <p className="mb-2 section-minor">{profile.education.startDate} - {profile.education.endDate}</p>
              <span className="badge text-bg-secondary mb-3"><FaMedal /> {profile.education.score}</span>

              <div className="edu-divider my-3" />
              <p className="section-minor mb-2">Strengths that support client work</p>
              <div className="d-flex flex-wrap gap-2">
                {educationStrengths.map((item) => (
                  <span key={item} className="skill-pill">{item}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Section>

      <Section id="experience" title="Experience" icon={<FaBriefcase />} subtitle="Enterprise Android delivery across product, migration, and release phases.">
        <div className="timeline-wrap">
          {experience.map((exp) => (
            <article className="timeline-item" key={`${exp.company}-${exp.role}`}>
              <div className="timeline-dot" />
              <div className="glass-card">
                <p className="section-minor mb-1">{exp.startDate} - {exp.endDate}</p>
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

      <Section id="skills" title="Technical Skills" icon={<FaBolt />} subtitle="Organized by engineering capability from your resume.">
        <div className="row g-3">
          {groupedSkills.map(([group, skillList]) => (
            <div className="col-lg-4 col-md-6" key={group}>
              <div className="glass-card h-100 skill-card">
                <h3 className="h6 text-uppercase section-minor mb-3">{group}</h3>
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

      <Section id="projects" title="Projects" icon={<FaCodeBranch />} subtitle="Client projects from resume plus live GitHub repositories.">
        <h3 className="h5 mb-3">Client Projects</h3>
        <div className="row g-3 mb-5">
          {clientProjects.map((proj) => (
            <div className="col-lg-6" key={proj.title}>
              <article className="project-card h-100">
                <p className="section-minor mb-2">{proj.duration}</p>
                <h4 className="h6 mb-2">{proj.title}</h4>
                <p className="project-impact"><FaFire /> {proj.impact}</p>
                <small className="d-block mb-3 section-minor">{proj.technologies.join(", ")}</small>
                <a className="icon-only-link" href={proj.playStoreUrl} target="_blank" rel="noreferrer" aria-label={`Open ${proj.title} on Play Store`} title="Play Store"><FaGooglePlay /></a>
              </article>
            </div>
          ))}
        </div>

        <div className="d-flex flex-wrap align-items-center justify-content-between gap-2 mb-3">
          <h3 className="h5 mb-0">GitHub Repositories (Auto-updated)</h3>
          <a className="icon-only-link" href={`https://github.com/${profile.githubUsername}`} target="_blank" rel="noreferrer" aria-label="View all repositories on GitHub" title="All GitHub repositories"><FaGithub /></a>
        </div>

        {githubLoading && <p className="section-minor">Loading GitHub repositories...</p>}
        {githubError && <p className="text-danger">{githubError}</p>}

        {!githubLoading && !githubError && (
          <div className="row g-3">
            {githubProjects.map((repo) => (
              <div className="col-xl-3 col-lg-4 col-md-6" key={repo.repoUrl}>
                <article className="github-card h-100">
                  <div className="d-flex align-items-center justify-content-between mb-2 gap-2">
                    <h4 className="h6 mb-0 text-truncate">{repo.title}</h4>
                    {repo.isAndroid && <span className="badge text-bg-success"><FaAndroid /> Android</span>}
                  </div>
                  <p className="small mb-3 repo-desc">{repo.description}</p>
                  <small className="d-block section-minor mb-2">{repo.language} | <FaRegStar /> {repo.stars}</small>
                  <small className="d-block section-minor mb-3">Updated {repo.updated}</small>
                  <a className="icon-only-link" href={repo.repoUrl} target="_blank" rel="noreferrer" aria-label={`Open repository ${repo.title}`} title="Open repository"><FaGithub /></a>
                </article>
              </div>
            ))}
          </div>
        )}
      </Section>

      <Section id="achievements" title="Notable Technical Achievements" icon={<FaWandMagicSparkles />} subtitle="Highlights from your latest resume.">
        <div className="glass-card">
          <ul className="mb-0">
            {notableAchievements.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </Section>

      <section className="py-5 reveal">
        <div className="container">
          <div className="cta-band">
            <div>
              <h3 className="mb-1">Available for Android & Flutter freelance and full-time opportunities</h3>
              <p className="mb-0 section-minor">Let us discuss product goals, architecture, and release timelines.</p>
            </div>
            <a className="btn btn-accent icon-only-cta" href="#contact" aria-label="Start conversation" title="Start conversation"><FaArrowRight /></a>
          </div>
        </div>
      </section>

      <Section id="contact" title="Contact" icon={<FaEnvelope />} subtitle="Send a direct message and it opens your mail client with pre-filled details.">
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
            <button className="btn btn-accent btn-lg" type="submit"><FaEnvelope /> Send Message</button>
            <a className="icon-only-link" href={profile.linkedin} target="_blank" rel="noreferrer" aria-label="Open LinkedIn profile" title="LinkedIn"><FaLinkedin /></a>
          </div>
        </form>
      </Section>

      <footer className="py-4 text-center section-minor">
        <div className="container small">
          <p className="mb-1">{profile.name} | Android & Flutter Engineer</p>
          <p className="mb-0">Freelancer | Open to New Opportunities</p>
        </div>
      </footer>
    </div>
  );
}


