import { createMessage } from './messages';
import { sendContactEmail } from './email';

/**
 * Fluxo do formulário de contato:
 * 1. salva no banco (fonte da verdade, aparece no dashboard). Se falhar, o envio falha.
 * 2. envia o e-mail ao dono. Se falhar, a mensagem continua salva e o envio conta como sucesso.
 */
export async function sendContactMessage(values) {
  await createMessage(values);
  try {
    await sendContactEmail(values);
    return { emailSent: true };
  } catch (error) {
    console.warn('E-mail não enviado, mensagem salva no banco:', error);
    return { emailSent: false };
  }
}
