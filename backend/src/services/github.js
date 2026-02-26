export async function fetchGithubRepos(username) {
  const res = await fetch(
    `https://api.github.com/users/${encodeURIComponent(username)}/repos?per_page=100&sort=updated`,
    {
      headers: {
        Accept: "application/vnd.github+json",
        ...(process.env.GITHUB_TOKEN ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` } : {})
      }
    }
  );

  if (!res.ok) {
    throw new Error(`GitHub API error: ${res.status}`);
  }

  const repos = await res.json();

  return repos
    .filter((repo) => !repo.fork)
    .map((repo) => ({
      title: repo.name,
      source: "github",
      description: repo.description || "No description provided.",
      technologies: repo.topics || [],
      liveUrl: repo.homepage || "",
      repoUrl: repo.html_url,
      featured: false,
      stars: repo.stargazers_count,
      updatedAt: repo.updated_at
    }));
}
