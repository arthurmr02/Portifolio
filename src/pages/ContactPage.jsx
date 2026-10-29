import ContactForm from '../components/contact/ContactForm';
import Container from '../components/ui/Container';
import { siteConfig } from '../config/site';
import { usePageTitle } from '../hooks/usePageTitle';

export default function ContactPage() {
  usePageTitle('Contato');

  return (
    <Container className="grid gap-10 py-12 sm:py-16 md:grid-cols-[1fr_1.3fr]">
      <div>
        <h1 className="font-display text-4xl sm:text-5xl">Vamos conversar</h1>
        <p className="text-muted mt-4 max-w-md">
          Tem uma vaga, um projeto ou só uma dúvida? Escreva aqui. A mensagem chega no meu
          e-mail e eu respondo assim que puder.
        </p>
        {siteConfig.ownerEmail && (
          <p className="text-muted mt-6 text-sm">
            Prefere e-mail direto?{' '}
            <a
              className="text-accent hover:underline"
              href={`mailto:${siteConfig.ownerEmail}`}
            >
              {siteConfig.ownerEmail}
            </a>
          </p>
        )}
      </div>
      <ContactForm />
    </Container>
  );
}
