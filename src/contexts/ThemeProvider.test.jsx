import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it } from 'vitest';
import ThemeToggle from '../components/layout/ThemeToggle';
import { THEME_STORAGE_KEY } from '../lib/theme';
import ThemeProvider from './ThemeProvider';

const renderToggle = () =>
  render(
    <ThemeProvider>
      <ThemeToggle />
    </ThemeProvider>,
  );

describe('tema claro/escuro', () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.classList.remove('dark');
  });

  it('abre no escuro por padrão', () => {
    renderToggle();
    expect(document.documentElement).toHaveClass('dark');
  });

  it('salva a escolha e a restaura na próxima visita', async () => {
    const user = userEvent.setup();
    const first = renderToggle();

    await user.click(screen.getByRole('button', { name: 'Mudar para o tema claro' }));
    expect(localStorage.getItem(THEME_STORAGE_KEY)).toBe('light');
    expect(document.documentElement).not.toHaveClass('dark');

    first.unmount(); // visitante fecha o site
    renderToggle(); // e volta depois
    expect(document.documentElement).not.toHaveClass('dark');
    expect(
      screen.getByRole('button', { name: 'Mudar para o tema escuro' }),
    ).toBeInTheDocument();
  });
});
