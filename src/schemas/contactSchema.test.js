import { describe, expect, it } from 'vitest';
import { contactSchema, MESSAGE_MIN_LENGTH } from './contactSchema';

const valid = {
  name: 'Arthur',
  email: 'arthur@exemplo.com',
  message: 'Gostaria de conversar sobre uma vaga de front-end.',
};

/** Primeira mensagem de erro de cada campo (a mesma que o formulário mostra), ex.: { email: '...' }. */
function errorsOf(values) {
  const result = contactSchema.safeParse(values);
  if (result.success) return {};
  const errors = {};
  for (const issue of result.error.issues) errors[issue.path[0]] ??= issue.message;
  return errors;
}

describe('contactSchema', () => {
  it('aceita dados válidos', () => {
    expect(contactSchema.safeParse(valid).success).toBe(true);
  });

  it('pede o nome quando vazio e quando curto demais', () => {
    expect(errorsOf({ ...valid, name: '' }).name).toBe('Informe seu nome');
    expect(errorsOf({ ...valid, name: 'A' }).name).toMatch(/no mínimo 2 caracteres/);
  });

  it('rejeita e-mail inválido com mensagem específica', () => {
    expect(errorsOf({ ...valid, email: '' }).email).toBe('Informe seu e-mail');
    expect(errorsOf({ ...valid, email: 'sem-arroba' }).email).toBe('E-mail inválido');
  });

  it(`exige mensagem com no mínimo ${MESSAGE_MIN_LENGTH} caracteres`, () => {
    expect(errorsOf({ ...valid, message: '' }).message).toBe('Escreva uma mensagem');
    expect(errorsOf({ ...valid, message: 'curta demais' }).message).toBe(
      `A mensagem precisa ter no mínimo ${MESSAGE_MIN_LENGTH} caracteres`,
    );
  });

  it('limita o tamanho da mensagem', () => {
    expect(errorsOf({ ...valid, message: 'a'.repeat(1001) }).message).toMatch(
      /no máximo 1000/,
    );
  });

  it('ignora espaços nas pontas ao contar caracteres', () => {
    const padded = `   ${'a'.repeat(MESSAGE_MIN_LENGTH - 1)}   `;
    expect(errorsOf({ ...valid, message: padded }).message).toBeDefined();
  });
});
