import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { renderWithQuery } from '../../test/renderWithProviders';
import ContactForm from './ContactForm';

vi.mock('../../services/contact', () => ({ sendContactMessage: vi.fn() }));
import { sendContactMessage } from '../../services/contact';

const MESSAGE = 'Olá! Gostaria de conversar sobre uma vaga de front-end.';

async function fillValid(user) {
  await user.type(screen.getByLabelText('Nome'), 'Arthur');
  await user.type(screen.getByLabelText('E-mail'), 'arthur@exemplo.com');
  await user.type(screen.getByLabelText('Mensagem'), MESSAGE);
}

const submitButton = () =>
  screen.getByRole('button', { name: /enviar mensagem|enviando/i });

describe('ContactForm', () => {
  beforeEach(() => {
    sendContactMessage.mockReset();
  });

  it('mostra uma mensagem específica em cada campo vazio e não envia', async () => {
    const user = userEvent.setup();
    renderWithQuery(<ContactForm />);

    await user.click(submitButton());

    expect(await screen.findByText('Informe seu nome')).toBeInTheDocument();
    expect(screen.getByText('Informe seu e-mail')).toBeInTheDocument();
    expect(screen.getByText('Escreva uma mensagem')).toBeInTheDocument();
    expect(sendContactMessage).not.toHaveBeenCalled();
  });

  it('valida e-mail inválido e mensagem curta', async () => {
    const user = userEvent.setup();
    renderWithQuery(<ContactForm />);

    await user.type(screen.getByLabelText('Nome'), 'Arthur');
    await user.type(screen.getByLabelText('E-mail'), 'errado');
    await user.type(screen.getByLabelText('Mensagem'), 'curta');
    await user.click(submitButton());

    expect(await screen.findByText('E-mail inválido')).toBeInTheDocument();
    expect(screen.getByText(/no mínimo 20 caracteres/)).toBeInTheDocument();
    expect(screen.getByLabelText('E-mail')).toHaveAttribute('aria-invalid', 'true');
    expect(sendContactMessage).not.toHaveBeenCalled();
  });

  it('bloqueia o botão durante o envio e envia uma única vez', async () => {
    const user = userEvent.setup();
    let finish;
    sendContactMessage.mockReturnValue(new Promise((resolve) => (finish = resolve)));
    renderWithQuery(<ContactForm />);

    await fillValid(user);
    await user.click(submitButton());

    const sending = await screen.findByRole('button', { name: /enviando/i });
    expect(sending).toBeDisabled();
    await user.click(sending);
    expect(sendContactMessage).toHaveBeenCalledTimes(1);

    finish({ emailSent: true });
    expect(await screen.findByText('Mensagem enviada!')).toBeInTheDocument();
  });

  it('envia os valores sem espaços sobrando e sem o campo isca', async () => {
    const user = userEvent.setup();
    sendContactMessage.mockResolvedValue({ emailSent: true });
    renderWithQuery(<ContactForm />);

    await fillValid(user);
    await user.click(submitButton());

    await waitFor(() => expect(sendContactMessage).toHaveBeenCalledTimes(1));
    expect(sendContactMessage).toHaveBeenCalledWith({
      name: 'Arthur',
      email: 'arthur@exemplo.com',
      message: MESSAGE,
    });
  });

  it('descarta o envio quando o campo isca está preenchido (robô)', async () => {
    const user = userEvent.setup();
    renderWithQuery(<ContactForm />);

    await fillValid(user);
    await user.type(document.querySelector('input[tabindex="-1"]'), 'http://spam.com');
    await user.click(submitButton());

    expect(await screen.findByText('Mensagem enviada!')).toBeInTheDocument();
    expect(sendContactMessage).not.toHaveBeenCalled();
  });

  it('mostra erro amigável quando o envio falha e libera o botão', async () => {
    const user = userEvent.setup();
    sendContactMessage.mockRejectedValue(new Error('boom'));
    renderWithQuery(<ContactForm />);

    await fillValid(user);
    await user.click(submitButton());

    expect(await screen.findByRole('alert')).toHaveTextContent(
      /Não foi possível enviar sua mensagem/,
    );
    expect(submitButton()).toBeEnabled();
    expect(screen.getByLabelText('Nome')).toHaveValue('Arthur');
  });
});
