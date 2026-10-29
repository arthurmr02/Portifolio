import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import { AuthContext } from '../../contexts/authContext';
import ProtectedRoute from './ProtectedRoute';

function renderAt(status) {
  const value = {
    status,
    session: null,
    isConfigured: true,
    login: () => {},
    logout: () => {},
  };
  return render(
    <AuthContext.Provider value={value}>
      <MemoryRouter initialEntries={['/painel']}>
        <Routes>
          <Route path="/entrar" element={<p>Tela de login</p>} />
          <Route element={<ProtectedRoute />}>
            <Route path="/painel" element={<p>Conteúdo do painel</p>} />
          </Route>
        </Routes>
      </MemoryRouter>
    </AuthContext.Provider>,
  );
}

describe('ProtectedRoute', () => {
  it('redireciona para o login quando não há sessão', () => {
    renderAt('unauthenticated');
    expect(screen.getByText('Tela de login')).toBeInTheDocument();
    expect(screen.queryByText('Conteúdo do painel')).not.toBeInTheDocument();
  });

  it('mostra um spinner (e nenhum conteúdo) enquanto verifica a sessão', () => {
    renderAt('loading');
    expect(
      screen.getByRole('status', { name: 'Verificando sessão' }),
    ).toBeInTheDocument();
    expect(screen.queryByText('Conteúdo do painel')).not.toBeInTheDocument();
    expect(screen.queryByText('Tela de login')).not.toBeInTheDocument();
  });

  it('libera o conteúdo quando autenticado', () => {
    renderAt('authenticated');
    expect(screen.getByText('Conteúdo do painel')).toBeInTheDocument();
  });
});
