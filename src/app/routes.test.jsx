import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen } from '@testing-library/react';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import ThemeProvider from '../contexts/ThemeProvider';
import { routes } from './routes';

/** Renderiza o app de verdade (rotas, layout e chunks lazy) começando em `path`. */
function renderApp(path) {
  const router = createMemoryRouter(routes, { initialEntries: [path] });
  return render(
    <QueryClientProvider client={new QueryClient()}>
      <ThemeProvider>
        <RouterProvider router={router} />
      </ThemeProvider>
    </QueryClientProvider>,
  );
}

describe('rotas do app', () => {
  it('bloqueia /painel sem login e mostra a tela de entrada', async () => {
    renderApp('/painel');
    expect(
      await screen.findByRole('heading', { name: 'Área do dono' }),
    ).toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: 'Painel' })).not.toBeInTheDocument();
  });

  it('mostra a página 404 amigável para rota inexistente', async () => {
    renderApp('/essa-rota-nao-existe');
    expect(
      await screen.findByRole('heading', { name: 'Essa página não existe' }),
    ).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Voltar ao início' })).toHaveAttribute(
      'href',
      '/',
    );
  });

  it('abre direto a página de contato por link (deep link)', async () => {
    renderApp('/contato');
    expect(
      await screen.findByRole('heading', { name: 'Vamos conversar' }),
    ).toBeInTheDocument();
  });
});
