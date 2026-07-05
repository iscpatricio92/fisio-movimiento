import type { RouteRecord } from 'vite-react-ssg';
import Layout from './Layout';
import Index from '@/pages/Index';
import NotFound from '@/pages/NotFound';
import AvisoPrivacidad from '@/pages/AvisoPrivacidad';
import PoliticaCancelacion from '@/pages/PoliticaCancelacion';
import TerminosCondiciones from '@/pages/TerminosCondiciones';

// Route tree consumed by vite-react-ssg. Every static path below is
// prerendered to its own HTML file at build time and hydrated on the client.
export const routes: RouteRecord[] = [
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Index /> },
      { path: 'aviso-privacidad', element: <AvisoPrivacidad /> },
      { path: 'politica-cancelacion', element: <PoliticaCancelacion /> },
      { path: 'terminos-condiciones', element: <TerminosCondiciones /> },
      { path: '*', element: <NotFound /> },
    ],
  },
];
