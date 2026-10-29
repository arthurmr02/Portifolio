import Spinner from './Spinner';

/** Spinner centralizado para telas inteiras (carregamento da sessão, de rota etc.). */
export default function PageSpinner({ label = 'Carregando' }) {
  return (
    <div className="text-muted flex min-h-[50vh] items-center justify-center">
      <Spinner label={label} />
    </div>
  );
}
