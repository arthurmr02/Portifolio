import { Link } from 'react-router-dom';
import { formatRelativeDate } from '../../lib/formatDate';
import { formatRepoName } from '../../lib/formatRepoName';
import { getLanguageColor } from '../../lib/languageColors';
import Badge from '../ui/Badge';
import Card from '../ui/Card';

/** Altura mínima compartilhada com ProjectCardSkeleton para não haver salto de layout. */
export const PROJECT_CARD_HEIGHT = 'min-h-[13rem]';

export default function ProjectCard({ project }) {
  return (
    <Card
      as={Link}
      to={`/projetos/${encodeURIComponent(project.name)}`}
      interactive
      className={`flex flex-col gap-3 ${PROJECT_CARD_HEIGHT}`}
    >
      <h3 className="font-display text-xl capitalize">{formatRepoName(project.name)}</h3>
      <p className="text-muted line-clamp-3 flex-1 text-sm">
        {project.description ?? 'Sem descrição por enquanto.'}
      </p>
      {project.topics.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {project.topics.slice(0, 3).map((topic) => (
            <Badge key={topic}>{topic}</Badge>
          ))}
        </div>
      )}
      <div className="text-muted flex items-center justify-between text-xs">
        <span className="flex items-center gap-1.5">
          {project.language ? (
            <>
              <span
                aria-hidden="true"
                className="h-2.5 w-2.5 rounded-full"
                style={{ backgroundColor: getLanguageColor(project.language) }}
              />
              {project.language}
            </>
          ) : (
            'Sem linguagem'
          )}
        </span>
        <span>Atualizado {formatRelativeDate(project.pushedAt)}</span>
      </div>
    </Card>
  );
}
