import Hero from '../components/home/Hero';
import { usePageTitle } from '../hooks/usePageTitle';

export default function HomePage() {
  usePageTitle();

  return <Hero />;
}
