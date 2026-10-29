import { getLanguageColor } from '../../lib/languageColors';
import { languageShare } from '../../lib/languageShare';
import Skeleton from '../ui/Skeleton';

/** Barra segmentada com a proporção de cada linguagem do repositório. */
export default function LanguageBar({ bytesByLanguage, isLoading }) {
  if (isLoading) return <Skeleton className="h-8 w-full" />;

  const shares = languageShare(bytesByLanguage);
  if (shares.length === 0) return null;

  return (
    <div className="min-h-8">
      <div className="bg-line flex h-2 overflow-hidden rounded-full" aria-hidden="true">
        {shares.map(({ language, percent }) => (
          <div
            key={language}
            style={{ width: `${percent}%`, backgroundColor: getLanguageColor(language) }}
          />
        ))}
      </div>
      <ul className="text-muted mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs">
        {shares.map(({ language, percent }) => (
          <li key={language} className="flex items-center gap-1.5">
            <span
              aria-hidden="true"
              className="h-2 w-2 rounded-full"
              style={{ backgroundColor: getLanguageColor(language) }}
            />
            {language} {percent.toFixed(1)}%
          </li>
        ))}
      </ul>
    </div>
  );
}
