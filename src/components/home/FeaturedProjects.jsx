import { Link } from 'react-router-dom';
import { useHomeProjects } from '../../hooks/useFeatured';
import Container from '../ui/Container';
import ProjectGrid from '../projects/ProjectGrid';

/** Projetos em destaque: os escolhidos no painel ou, sem escolha, os mais recentes. */
export default function FeaturedProjects() {
  const { projects, isLoading, error, refetch } = useHomeProjects();

  return (
    <section className="py-12" aria-labelledby="destaques">
      <Container>
        <div className="mb-6 flex items-end justify-between gap-4">
          <h2 id="destaques" className="font-display text-3xl">
            Projetos em destaque
          </h2>
          <Link to="/projetos" className="text-accent text-sm hover:underline">
            Ver todos
          </Link>
        </div>
        <ProjectGrid
          projects={projects}
          isLoading={isLoading}
          error={error}
          onRetry={refetch}
        />
      </Container>
    </section>
  );
}
