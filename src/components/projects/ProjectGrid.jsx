import QueryState from '../ui/QueryState';
import ProjectCard from './ProjectCard';
import ProjectCardSkeleton from './ProjectCardSkeleton';

function ProjectGridSkeleton({ count }) {
  return (
    <div role="status" aria-label="Carregando projetos" className={GRID}>
      {Array.from({ length: count }, (_, index) => (
        <ProjectCardSkeleton key={index} />
      ))}
    </div>
  );
}

const GRID = 'grid gap-4 sm:grid-cols-2 lg:grid-cols-3';

/** Grade de projetos com os três estados de dado remoto: carregando, erro e vazio. */
export default function ProjectGrid({
  projects,
  isLoading,
  error,
  onRetry,
  skeletonCount = 3,
  emptyDescription = 'Quando eu publicar um repositório público no GitHub, ele aparece aqui.',
}) {
  return (
    <QueryState
      isLoading={isLoading}
      error={error}
      isEmpty={projects.length === 0}
      onRetry={onRetry}
      skeleton={<ProjectGridSkeleton count={skeletonCount} />}
      emptyTitle="Nenhum projeto encontrado"
      emptyDescription={emptyDescription}
    >
      <ul className={GRID}>
        {projects.map((project) => (
          <li key={project.id} className="contents">
            <ProjectCard project={project} />
          </li>
        ))}
      </ul>
    </QueryState>
  );
}
