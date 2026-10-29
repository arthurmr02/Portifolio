import About from '../components/home/About';
import FeaturedProjects from '../components/home/FeaturedProjects';
import Hero from '../components/home/Hero';
import { usePageTitle } from '../hooks/usePageTitle';

export default function HomePage() {
  usePageTitle();

  return (
    <>
      <Hero />
      <FeaturedProjects />
      <About />
    </>
  );
}
