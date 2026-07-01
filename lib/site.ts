// ---------------------------------------------------------------------------
// SITE IDENTITY — edit your name, tagline, and links here (one place).
// TODO for Joel: fill in the real social/profile URLs marked below.
// ---------------------------------------------------------------------------

export const site = {
  name: "Joel Castro",
  // The single most important line on the site — keep it one sentence.
  // (Research: users decide in ~10s; the tagline is the highest-leverage element.)
  tagline: "I build mobile apps and AI agents with Flutter.",
  // A slightly longer positioning line under the tagline (optional).
  subtitle:
    "Mobile app developer & indie builder. I make consensus tools, AI agents, and cross-platform apps — from first sketch to shipped product.",
  url: "https://joelcastro.life", // TODO: confirm which domain you'll use
  email: "joelc0193@gmail.com", // TODO: swap to a public-facing address if you prefer

  // A couple of human details (research: people follow humans, not resumes).
  about: [
    "I'm a mobile app developer focused on Flutter and FlutterFlow, with a soft spot for wiring AI into everyday apps.",
    "Lately I've been building OneMind — a platform for humans and AI agents to reach collective decisions — and a handful of LLM-powered experiments.",
    "I also freelance on Upwork, where I've shipped mobile apps and AI integrations for clients around the world.",
  ],

  links: {
    github: "https://github.com/", // TODO: your GitHub profile
    upwork: "https://www.upwork.com/freelancers/", // TODO: your public Upwork profile URL
    linkedin: "", // TODO (optional)
    x: "", // TODO (optional)
  },
} as const;

/** Social links that actually have a URL set, for rendering. */
export const socialLinks = Object.entries(site.links)
  .filter(([, url]) => url && url.length > 0)
  .map(([key, url]) => ({ key, url }));
