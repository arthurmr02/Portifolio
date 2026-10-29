import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import LanguageBar from '../components/projects/LanguageBar';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import Container from '../components/ui/Container';
import QueryState from '../components/ui/QueryState';
import Skeleton from '../components/ui/Skeleton';
import { siteConfig } from '../config/site';
import { usePageTitle } from '../hooks/usePageTitle';
import { useRepo, useRepoLanguages } from '../hooks/useRepos';
import { formatDate, formatRelativeDate } from '../lib/formatDate';
import { formatRepoName } from '../lib/formatRepoName';
import NotFoundPage from './NotFoundPage';

function DetailSkeleton() {
  return (
    <div role="status" aria-label="Carregando projeto" className="space-y-4">
      <Skeleton className="h-10 w-1/2" />
      <Skeleton className="h-5 w-3/4" />
      <Skeleton className="aspect-[2/1] w-full max-w-3xl" />
    </div>
  );
}

function Preview({ name }) {
  const [failed, setFailed] = useState(false);
  if (failed) return null;

  return (
    // Prévia gerada pelo GitHub. Proporção fixa (2:1) evita salto de layout.
    <img
      src={`https://opengraph.githubassets.com/1/${siteConfig.githubUsername}/${name}`}
      width="1200"
      height="600"
      loading="lazy"
      decoding="async"
      alt={`Prévia do repositório ${name}`}
      onError={() => setFailed(true)}
      className="border-line mt-8 aspect-[2/1] w-full max-w-3xl rounded-2xl border object-cover"
    />
  );
}

export default function ProjectDetailPage() {
  const { name } = useParams();
  const { data: project, isPending, error, refetch } = useRepo(name);
  const languages = useRepoLanguages(project?.name);
  usePageTitle(project ? formatRepoName(project.name) : 'Projeto');

  // Carregou sem erro e o repositório não existe: é um endereço inválido.
  if (!isPending && !error && project === null) return <NotFoundPage />;

  return (
    <Container className="py-12 sm:py-16">
      <Link to="/projetos" className="text-muted hover:text-ink text-sm">
        ← Todos os projetos
      </Link>

      <div className="mt-6">
        <QueryState
          isLoading={isPending}
          error={error}
          onRetry={refetch}
          skeleton={<DetailSkeleton />}
        >
          {project && (
            <article>
              <h1 className="font-display text-4xl capitalize sm:text-5xl">
                {formatRepoName(project.name)}
              </h1>
              <p className="text-muted mt-4 max-w-2xl text-lg">
                {project.description ?? 'Este repositório ainda não tem descrição.'}
              </p>

              <dl className="mt-6 flex flex-wrap gap-x-8 gap-y-2 text-sm">
                <div>
                  <dt className="text-muted">Criado em</dt>
                  <dd>{formatDate(project.createdAt)}</dd>
                </div>
                <div>
                  <dt className="text-muted">Última atualização</dt>
                  <dd>{formatRelativeDate(project.pushedAt)}</dd>
                </div>
                <div>
                  <dt className="text-muted">Estrelas</dt>
                  <dd>{project.stars}</dd>
                </div>
              </dl>

              {project.topics.length > 0 && (
                <div className="mt-5 flex flex-wrap gap-1.5">
                  {project.topics.map((topic) => (
                    <Badge key={topic}>{topic}</Badge>
                  ))}
                </div>
              )}

              <div className="mt-8 max-w-3xl">
                <LanguageBar
                  bytesByLanguage={languages.data}
                  isLoading={languages.isPending}
                />
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <Button as="a" href={project.url} target="_blank" rel="noreferrer">
                  Ver código no GitHub
                </Button>
                {project.homepage && (
                  <Button
                    as="a"
                    href={project.homepage}
                    target="_blank"
                    rel="noreferrer"
                    variant="secondary"
                  >
                    Abrir projeto publicado
                  </Button>
                )}
              </div>

              <Preview name={project.name} />
            </article>
          )}
        </QueryState>
      </div>
    </Container>
  );
}
