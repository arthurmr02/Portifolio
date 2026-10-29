import { Link, NavLink } from 'react-router-dom';
import { siteConfig } from '../../config/site';
import Container from '../ui/Container';
import ThemeToggle from './ThemeToggle';

const NAV_ITEMS = [
  { to: '/projetos', label: 'Projetos' },
  { to: '/contato', label: 'Contato' },
];

const navClass = ({ isActive }) =>
  `rounded-full px-3 py-1.5 text-sm transition-colors ${
    isActive ? 'bg-line/60 text-ink' : 'text-muted hover:text-ink'
  }`;

export default function Header() {
  return (
    <header className="border-line bg-bg/85 sticky top-0 z-20 border-b backdrop-blur">
      <Container className="flex h-16 items-center justify-between gap-4">
        <Link to="/" className="font-display text-lg font-semibold tracking-tight">
          {siteConfig.ownerName}
          <span className="text-accent">.</span>
        </Link>
        <nav aria-label="Principal" className="flex items-center gap-1">
          {NAV_ITEMS.map((item) => (
            <NavLink key={item.to} to={item.to} className={navClass}>
              {item.label}
            </NavLink>
          ))}
          <div className="ml-2">
            <ThemeToggle />
          </div>
        </nav>
      </Container>
    </header>
  );
}
