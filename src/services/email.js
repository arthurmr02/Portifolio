import { siteConfig } from '../config/site';
import { AppError, ERROR_CODES } from '../lib/errors';

/** Envia a mensagem por e-mail ao dono usando o Formspree. */
export async function sendContactEmail({ name, email, message }) {
  if (!siteConfig.formspreeFormId) {
    throw new AppError('Formspree não configurado', { code: ERROR_CODES.NOT_CONFIGURED });
  }
  let response;
  try {
    response = await fetch(`https://formspree.io/f/${siteConfig.formspreeFormId}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({ name, email, message }),
    });
  } catch (error) {
    throw new AppError('Falha de rede ao enviar e-mail', {
      code: ERROR_CODES.NETWORK,
      cause: error,
    });
  }
  if (!response.ok) {
    throw new AppError(`Formspree respondeu ${response.status}`, {
      status: response.status,
    });
  }
}
