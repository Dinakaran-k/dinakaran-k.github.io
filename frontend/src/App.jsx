import { useEffect, useMemo, useState } from "react";

const GA_ID = import.meta.env.VITE_GA_MEASUREMENT_ID;
const GITHUB_USERNAME = import.meta.env.VITE_GITHUB_USERNAME || "Dinakaran-k";

const profile = {
  name: "Dinakaran Kommunuri",
  headline: "Freelancer | Open to New Opportunities",
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
    description: "Re-engineered screens with Jetpack Compose and improved app maintainability and release stability.",
    technologies: ["Kotlin", "Jetpack Compose", "MVVM", "Hilt", "Retrofit", "Crashlytics"],
    playStoreUrl: "https://play.google.com/store/search?q=turito&c=apps"
  },
  {
    title: "Ascott Star Rewards App",
    description: "Worked on migration from Xamarin to native Android and implemented booking and loyalty modules.",
    technologies: ["Kotlin", "Jetpack Compose", "MVVM", "Hilt", "Room", "Retrofit"],
    playStoreUrl: "https://play.google.com/store/apps/details?id=com.ascottcoltd.ascottstarrewards"
  },
  {
    title: "American Tower Site Access",
    description: "Delivered cross-platform mobile features and build/deployment support via App Center.",
    technologies: ["React Native", "App Center"],
    playStoreUrl: "https://play.google.com/store/search?q=American%20Tower%20Site%20Access&c=apps"
  }
];

function Section({ id, title, children }) {
  return (
    <section id={id} className="py-5 border-bottom border-secondary-subtle">
      <div className="container">
        <h2 className="h3 fw-bold mb-4">{title}</h2>
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

export default function App() {
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem("theme") === "dark");
  const [githubProjects, setGithubProjects] = useState([]);
  const [githubError, setGithubError] = useState("");

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
    <div>
      <header className="hero-section text-white">
        <nav className="navbar navbar-expand-lg navbar-dark py-3">
          <div className="container">
            <a className="navbar-brand fw-bold" href="#top">{profile.name}</a>
            <button className="btn btn-outline-light" onClick={() => setDarkMode((v) => !v)}>
              {darkMode ? "Light Mode" : "Dark Mode"}
            </button>
          </div>
        </nav>

        <div className="container py-5" id="top">
          <p className="badge text-bg-warning text-dark mb-3">{profile.headline}</p>
          <h1 className="display-5 fw-bold">Android & Flutter Mobile Developer</h1>
          <p className="lead col-lg-8">
            Building stable, scalable, and high-performance mobile apps with Kotlin, Jetpack Compose, and Flutter.
          </p>
          <div className="d-flex flex-wrap gap-3 mt-4">
            <a className="btn btn-warning btn-lg" href="#contact">Hire Me</a>
            <a className="btn btn-outline-light btn-lg" href={resumeUrl} download>Download Resume</a>
            <a className="btn btn-outline-light btn-lg" href={`https://github.com/${profile.githubUsername}`} target="_blank" rel="noreferrer">GitHub</a>
          </div>
        </div>
      </header>

      <Section id="about" title="About Me">
        <p className="fs-5">{profile.summary}</p>
        <div className="row g-3 mt-1">
          <div className="col-md-4"><strong>Location:</strong> {profile.location}</div>
          <div className="col-md-4"><strong>Email:</strong> {profile.email}</div>
          <div className="col-md-4"><strong>Phone:</strong> {profile.phone}</div>
        </div>
      </Section>

      <Section id="education" title="Education">
        <div className="row g-4">
          {profile.education.map((edu) => (
            <div className="col-md-6" key={`${edu.institution}-${edu.degree}`}>
              <div className="card h-100 shadow-sm">
                <div className="card-body">
                  <h3 className="h5">{edu.degree}</h3>
                  <p className="mb-1">{edu.institution}</p>
                  <p className="text-body-secondary mb-0">{edu.startDate} - {edu.endDate}</p>
                  <small>{edu.score}</small>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section id="experience" title="Work Experience">
        <div className="vstack gap-4">
          {profile.experiences.map((exp) => (
            <article className="card shadow-sm" key={`${exp.company}-${exp.role}`}>
              <div className="card-body">
                <h3 className="h5 mb-1">{exp.role}</h3>
                <p className="mb-2"><strong>{exp.company}</strong> | {exp.startDate} - {exp.endDate}</p>
                <ul className="mb-0">
                  {exp.achievements.map((item) => <li key={item}>{item}</li>)}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </Section>

      <Section id="skills" title="Skills">
        <div className="row g-3">
          {groupedSkills.map(([group, skillList]) => (
            <div className="col-lg-4 col-md-6" key={group}>
              <div className="card h-100 shadow-sm">
                <div className="card-body">
                  <h3 className="h6 text-uppercase text-body-secondary">{group}</h3>
                  <p className="mb-0">{skillList.join(", ")}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section id="projects" title="Projects">
        <h3 className="h5 mb-3">Freelance & Client Projects</h3>
        <div className="row g-3 mb-5">
          {freelanceProjects.map((proj) => (
            <div className="col-lg-4 col-md-6" key={proj.title}>
              <div className="card h-100 shadow-sm">
                <div className="card-body">
                  <h4 className="h6">{proj.title}</h4>
                  <p>{proj.description}</p>
                  <small className="d-block mb-3">{proj.technologies.join(", ")}</small>
                  <a href={proj.playStoreUrl} target="_blank" rel="noreferrer">Play Store Link</a>
                </div>
              </div>
            </div>
          ))}
        </div>

        <h3 className="h5 mb-3">GitHub Repositories (Auto-updated)</h3>
        {githubError && <p className="text-danger">{githubError}</p>}
        <div className="row g-3">
          {githubProjects.map((repo) => (
            <div className="col-lg-4 col-md-6" key={repo.repoUrl}>
              <div className="card h-100 shadow-sm">
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-start mb-2 gap-2">
                    <h4 className="h6 mb-0">{repo.title}</h4>
                    {repo.isAndroid && <span className="badge text-bg-success">Android</span>}
                  </div>
                  <p>{repo.description}</p>
                  <small className="d-block mb-2">Language: {repo.language} | Stars: {repo.stars}</small>
                  <a href={repo.repoUrl} target="_blank" rel="noreferrer">View Repository</a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section id="contact" title="Contact">
        <form className="row g-3" onSubmit={handleContactSubmit}>
          <div className="col-md-6">
            <label className="form-label">Name</label>
            <input className="form-control" name="name" required />
          </div>
          <div className="col-md-6">
            <label className="form-label">Email</label>
            <input className="form-control" type="email" name="email" required />
          </div>
          <div className="col-12">
            <label className="form-label">Message</label>
            <textarea className="form-control" rows="5" name="message" required />
          </div>
          <div className="col-12 d-flex align-items-center gap-3">
            <button className="btn btn-primary" type="submit">Send Message</button>
            <a href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
          </div>
        </form>
      </Section>

      <footer className="py-4 text-center text-body-secondary">
        <div className="container">
          <a href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
          <span className="mx-2">|</span>
          <a href={`https://github.com/${profile.githubUsername}`} target="_blank" rel="noreferrer">GitHub</a>
        </div>
      </footer>
    </div>
  );
}
