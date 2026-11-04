import About from './About';
import Contact from './Contact';
import Credentials from './Credentials';
import GitHubActivity from './GitHubActivity';
import Projects from './Projects';
import Skills from './Skills';
import YouTubeSection from './YouTubeSection';

/**
 * Everything below the hero is split into its own chunk so the first paint
 * only pays for the navigation and hero. The browser fetches this in parallel.
 */
export default function BelowFold() {
  return (
    <>
      <About />
      <Skills />
      <Credentials />
      <Projects />
      <GitHubActivity />
      <YouTubeSection />
      <Contact />
    </>
  );
}
