import { useMemo, useState } from 'react';
import Button from '../components/ui/Button';
import Container from '../components/ui/Container';
import ProjectGrid from '../components/projects/ProjectGrid';
import { usePageTitle } from '../hooks/usePageTitle';
import { useRepos } from '../hooks/useRepos';

export default function ProjectsPage() {
  usePageTitle('Projetos');
  const { data, isPending, error, refetch } = useRepos();
  const [language, setLanguage] = useState(null);

  const languages = useMemo(
    () => [...new Set((data ?? []).map((repo) => repo.language).filter(Boolean))].sort(),
    [data],
  );
  const visible = useMemo(
    () => (data ?? []).filter((repo) => !language || repo.language === language),
    [data, language],
  );

  return (
    <Container className="py-12 sm:py-16">
      <h1 className="font-display text-4xl sm:text-5xl">Projetos</h1>
      <p className="text-muted mt-3 max-w-xl">
        Lidos direto do meu GitHub. Cada card leva para uma página com os detalhes do
        repositório.
      </p>

      {languages.length > 1 && (
        <div
          className="mt-6 flex flex-wrap gap-2"
          role="group"
          aria-label="Filtrar por linguagem"
        >
          <Button
            size="sm"
            variant={language === null ? 'primary' : 'secondary'}
            aria-pressed={language === null}
            onClick={() => setLanguage(null)}
          >
            Todos
          </Button>
          {languages.map((item) => (
            <Button
              key={item}
              size="sm"
              variant={language === item ? 'primary' : 'secondary'}
              aria-pressed={language === item}
              onClick={() => setLanguage(item)}
            >
              {item}
            </Button>
          ))}
        </div>
      )}

      <div className="mt-8">
        <ProjectGrid
          projects={visible}
          isLoading={isPending}
          error={error}
          onRetry={refetch}
          skeletonCount={6}
        />
      </div>
    </Container>
  );
}
