import { useNavigation } from 'react-router-dom';

/** Barra fina no topo enquanto o chunk da próxima rota baixa (carregamento sob demanda). */
export default function NavProgress() {
  const { state } = useNavigation();
  if (state === 'idle') return null;

  return (
    <div
      role="progressbar"
      aria-label="Carregando página"
      className="fixed inset-x-0 top-0 z-30 h-0.5 overflow-hidden"
    >
      <div className="bg-accent h-full w-1/3 animate-pulse rounded-full" />
    </div>
  );
}
