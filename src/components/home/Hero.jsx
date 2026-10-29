import { Link } from 'react-router-dom';
import { siteConfig } from '../../config/site';
import { siteContent } from '../../config/content';
import Button from '../ui/Button';
import Container from '../ui/Container';
import HeroPoster from './HeroPoster';

export default function Hero() {
  return (
    <section className="py-14 sm:py-20">
      <Container className="grid items-center gap-10 md:grid-cols-[1.2fr_1fr]">
        <div>
          <p className="text-accent mb-4 font-mono text-sm">{siteConfig.ownerRole}</p>
          <h1 className="font-display text-4xl leading-[1.08] tracking-tight sm:text-6xl">
            {siteContent.headline}
          </h1>
          <p className="text-muted mt-6 max-w-xl text-lg">{siteContent.intro}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button as={Link} to="/projetos" size="lg">
              Ver projetos
            </Button>
            <Button as={Link} to="/contato" size="lg" variant="secondary">
              Falar comigo
            </Button>
          </div>
        </div>
        {/* Altura reservada: o espaço existe antes de qualquer imagem ou cena carregar. */}
        <div className="relative mx-auto aspect-square w-full max-w-[320px] md:max-w-none">
          <HeroPoster />
        </div>
      </Container>
    </section>
  );
}
