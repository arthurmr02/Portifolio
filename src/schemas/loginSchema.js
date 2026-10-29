import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().trim().min(1, 'Informe seu e-mail').pipe(z.email('E-mail inválido')),
  password: z
    .string()
    .min(1, 'Informe sua senha')
    .min(6, 'A senha precisa ter no mínimo 6 caracteres'),
});
