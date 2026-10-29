import { Navigate, Outlet, useLocation } from 'react-router-dom';
import PageSpinner from '../ui/PageSpinner';
import { useAuth } from '../../hooks/useAuth';

/**
 * Guarda das rotas do dono. Enquanto a sessão é verificada mostra um spinner (sem piscar
 * a tela de login); sem login, redireciona para /entrar e lembra de onde a pessoa veio.
 */
export default function ProtectedRoute() {
  const { status } = useAuth();
  const location = useLocation();

  if (status === 'loading') return <PageSpinner label="Verificando sessão" />;
  if (status === 'unauthenticated') {
    return <Navigate to="/entrar" replace state={{ from: location.pathname }} />;
  }
  return <Outlet />;
}
