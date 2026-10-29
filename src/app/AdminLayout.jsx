import { Outlet } from 'react-router-dom';
import AuthProvider from '../contexts/AuthProvider';

/**
 * Envolve só as rotas /entrar e /painel com a sessão do dono. Como o layout é carregado
 * sob demanda, visitantes comuns nunca baixam nem inicializam a autenticação.
 */
export default function AdminLayout() {
  return (
    <AuthProvider>
      <Outlet />
    </AuthProvider>
  );
}
