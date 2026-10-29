import Card from '../ui/Card';
import Skeleton from '../ui/Skeleton';
import { PROJECT_CARD_HEIGHT } from './ProjectCard';

/** Mesma altura e estrutura do ProjectCard: trocar um pelo outro não move a página. */
export default function ProjectCardSkeleton() {
  return (
    <Card className={`flex flex-col gap-3 ${PROJECT_CARD_HEIGHT}`} aria-hidden="true">
      <Skeleton className="h-6 w-2/3" />
      <div className="flex-1 space-y-2">
        <Skeleton className="h-3.5 w-full" />
        <Skeleton className="h-3.5 w-5/6" />
      </div>
      <div className="flex justify-between">
        <Skeleton className="h-3 w-20" />
        <Skeleton className="h-3 w-28" />
      </div>
    </Card>
  );
}
