import { Link } from 'react-router-dom';
import { siteConfig } from '../../config/site';
import Container from '../ui/Container';

export default function Footer() {
  return (
    <footer className="border-line text-muted mt-24 border-t py-8 text-sm">
      <Container className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {new Date().getFullYear()} {siteConfig.ownerName}. Feito com React e
          curiosidade.
        </p>
        <div className="flex items-center gap-5">
          <a
            href={`https://github.com/${siteConfig.githubUsername}`}
            target="_blank"
            rel="noreferrer"
            className="hover:text-ink"
          >
            GitHub
          </a>
          <Link to="/entrar" className="hover:text-ink">
            Área do dono
          </Link>
        </div>
      </Container>
    </footer>
  );
}
