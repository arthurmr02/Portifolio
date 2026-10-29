import { isRouteErrorResponse, Link, useRouteError } from 'react-router-dom';
import Button from '../components/ui/Button';
import Container from '../components/ui/Container';
import NotFoundPage from './NotFoundPage';

/** Rede de segurança: erro inesperado ou falha ao baixar o chunk de uma página. */
export default function RouteErrorPage() {
  const error = useRouteError();
  if (isRouteErrorResponse(error) && error.status === 404) return <NotFoundPage />;

  return (
    <Container className="flex min-h-[60vh] flex-col items-center justify-center gap-4 py-20 text-center">
      <h1 className="font-display text-3xl sm:text-4xl">Algo deu errado</h1>
      <p className="text-muted max-w-md">
        Não foi possível carregar esta página. Verifique sua conexão e tente de novo.
      </p>
      <div className="flex gap-3">
        <Button onClick={() => window.location.reload()}>Recarregar</Button>
        <Button as={Link} to="/" variant="secondary">
          Ir ao início
        </Button>
      </div>
    </Container>
  );
}
