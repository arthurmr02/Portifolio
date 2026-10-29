import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';
import Container from '../components/ui/Container';
import { usePageTitle } from '../hooks/usePageTitle';

export default function NotFoundPage() {
  usePageTitle('Página não encontrada');

  return (
    <Container className="flex min-h-[60vh] flex-col items-center justify-center gap-4 py-20 text-center">
      <p className="text-accent font-mono text-sm">Erro 404</p>
      <h1 className="font-display text-4xl sm:text-5xl">Essa página não existe</h1>
      <p className="text-muted max-w-md">
        O endereço pode ter mudado ou ter sido digitado errado. Que tal voltar para o
        início?
      </p>
      <Button as={Link} to="/">
        Voltar ao início
      </Button>
    </Container>
  );
}
