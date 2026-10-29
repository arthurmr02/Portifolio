import { lazy, Suspense, useState } from 'react';
import { Link } from 'react-router-dom';
import { siteConfig } from '../../config/site';
import { siteContent } from '../../config/content';
import { useIdleReady } from '../../hooks/useIdleReady';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import Button from '../ui/Button';
import Container from '../ui/Container';
import HeroPoster from './HeroPoster';

// Import dinâmico: o three.js vira um chunk separado, fora do pacote inicial.
const HeroScene = lazy(() => import('./HeroScene'));

export default function Hero() {
  const [sceneReady, setSceneReady] = useState(false);
  const idle = useIdleReady();
  const isWide = useMediaQuery('(min-width: 768px)');
  const prefersReducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)');
  // 3D só em tela grande, com o navegador ocioso e sem preferência por menos movimento.
  // No celular o SVG basta: mantém a nota de performance e a bateria.
  const show3d = idle && isWide && !prefersReducedMotion;

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
          <div
            className={`transition-opacity duration-500 ${sceneReady ? 'opacity-0' : ''}`}
          >
            <HeroPoster />
          </div>
          {show3d && (
            <Suspense fallback={null}>
              <HeroScene onReady={() => setSceneReady(true)} />
            </Suspense>
          )}
        </div>
      </Container>
    </section>
  );
}
