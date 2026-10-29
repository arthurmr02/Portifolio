import PageSpinner from '../components/ui/PageSpinner';
import HomePage from '../pages/HomePage';
import NotFoundPage from '../pages/NotFoundPage';
import RouteErrorPage from '../pages/RouteErrorPage';
import RootLayout from './RootLayout';

/**
 * Transforma `() => import('./Pagina')` em uma rota carregada sob demanda.
 * A página só é baixada quando o visitante navega até ela.
 */
const lazyPage = (loader) => async () => ({ Component: (await loader()).default });

/**
 * Mapa de rotas. A Home é carregada junto com o app (é a primeira tela);
 * todo o resto vira um chunk separado. O vercel.json reescreve qualquer
 * caminho para o index.html, então links diretos e F5 funcionam.
 */
export const routes = [
  {
    path: '/',
    Component: RootLayout,
    HydrateFallback: PageSpinner,
    children: [
      {
        // Rota sem caminho: serve só para o erro de carregamento não derrubar cabeçalho e rodapé.
        ErrorBoundary: RouteErrorPage,
        children: [
          { index: true, Component: HomePage },
          { path: 'projetos', lazy: lazyPage(() => import('../pages/ProjectsPage')) },
          {
            path: 'projetos/:name',
            lazy: lazyPage(() => import('../pages/ProjectDetailPage')),
          },
          { path: '*', Component: NotFoundPage },
        ],
      },
    ],
  },
];
