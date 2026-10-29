import { z } from 'zod';

export const MESSAGE_MIN_LENGTH = 20;
export const MESSAGE_MAX_LENGTH = 1000;

export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, 'Informe seu nome')
    .min(2, 'O nome precisa ter no mínimo 2 caracteres')
    .max(80, 'O nome pode ter no máximo 80 caracteres'),
  email: z.string().trim().min(1, 'Informe seu e-mail').pipe(z.email('E-mail inválido')),
  message: z
    .string()
    .trim()
    .min(1, 'Escreva uma mensagem')
    .min(
      MESSAGE_MIN_LENGTH,
      `A mensagem precisa ter no mínimo ${MESSAGE_MIN_LENGTH} caracteres`,
    )
    .max(
      MESSAGE_MAX_LENGTH,
      `A mensagem pode ter no máximo ${MESSAGE_MAX_LENGTH} caracteres`,
    ),
  // Campo isca: pessoas não veem, robôs preenchem. Tratado em useSendContact.
  website: z.string().optional(),
});
