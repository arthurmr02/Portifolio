import { Outlet, ScrollRestoration } from 'react-router-dom';
import Footer from '../components/layout/Footer';
import Header from '../components/layout/Header';
import NavProgress from '../components/layout/NavProgress';

/** Estrutura comum a todas as páginas: cabeçalho, conteúdo da rota e rodapé. */
export default function RootLayout() {
  return (
    <div className="flex min-h-screen flex-col">
      <a
        href="#conteudo"
        className="focus:bg-accent focus:text-accent-ink sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-40 focus:rounded-full focus:px-4 focus:py-2"
      >
        Ir para o conteúdo
      </a>
      <NavProgress />
      <Header />
      <main id="conteudo" className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <ScrollRestoration />
    </div>
  );
}
