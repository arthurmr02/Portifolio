import { useFeaturedNames, useToggleFeatured } from '../../hooks/useFeatured';
import { useRepos } from '../../hooks/useRepos';
import { formatRepoName } from '../../lib/formatRepoName';
import Button from '../ui/Button';
import Card from '../ui/Card';
import QueryState from '../ui/QueryState';
import Skeleton from '../ui/Skeleton';

function PickerSkeleton() {
  return (
    <div role="status" aria-label="Carregando projetos" className="space-y-3">
      {[0, 1, 2, 3].map((item) => (
        <Skeleton key={item} className="h-[4.5rem] w-full rounded-2xl" />
      ))}
    </div>
  );
}

/** Lista de repositórios com botão para destacar na home. */
export default function FeaturedPicker() {
  const repos = useRepos();
  const featured = useFeaturedNames();
  const toggle = useToggleFeatured();

  const selected = new Set((featured.data ?? []).map((name) => name.toLowerCase()));
  const updatingName = toggle.isPending ? toggle.variables?.repoName : null;

  return (
    <>
      <p className="text-muted mb-4 text-sm">
        Marque os projetos que aparecem na home. Sem nenhum marcado, a home mostra os 3
        mais recentes.
      </p>
      <QueryState
        isLoading={repos.isPending || featured.isPending}
        error={repos.error ?? featured.error}
        onRetry={() => {
          repos.refetch();
          featured.refetch();
        }}
        isEmpty={repos.data?.length === 0}
        skeleton={<PickerSkeleton />}
        emptyTitle="Nenhum repositório encontrado"
        emptyDescription="Publique um repositório público no GitHub para escolher destaques."
      >
        <ul className="space-y-3">
          {repos.data?.map((repo) => {
            const isFeatured = selected.has(repo.name.toLowerCase());
            return (
              <Card
                as="li"
                key={repo.id}
                className="flex items-center justify-between gap-4 py-4!"
              >
                <div className="min-w-0">
                  <p className="truncate font-medium capitalize">
                    {formatRepoName(repo.name)}
                  </p>
                  <p className="text-muted truncate text-sm">
                    {repo.description ?? 'Sem descrição'}
                  </p>
                </div>
                <Button
                  size="sm"
                  variant={isFeatured ? 'primary' : 'secondary'}
                  aria-pressed={isFeatured}
                  loading={updatingName === repo.name}
                  onClick={() =>
                    toggle.mutate({ repoName: repo.name, featured: !isFeatured })
                  }
                  className="shrink-0"
                >
                  {isFeatured ? 'Em destaque' : 'Destacar'}
                </Button>
              </Card>
            );
          })}
        </ul>
        {toggle.error && (
          <p role="alert" className="mt-3 text-sm text-red-500">
            Não foi possível salvar o destaque. Tente de novo.
          </p>
        )}
      </QueryState>
    </>
  );
}
