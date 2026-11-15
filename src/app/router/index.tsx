import { createBrowserRouter, Navigate } from 'react-router-dom';
import { LoginPage } from '@/pages/login';
import { RegisterPage } from '@/pages/register';
import { HomePage } from '@/pages/home';
import { ComingSoonPage } from '@/pages/coming-soon';
import { AppShell } from '@/widgets/app-shell';
import { GuestOnly, RequireAuth } from './guards';

export const router = createBrowserRouter([
  {
    element: <GuestOnly />,
    children: [
      { path: '/login', element: <LoginPage /> },
      { path: '/register', element: <RegisterPage /> },
    ],
  },
  {
    element: <RequireAuth />,
    children: [
      {
        element: <AppShell />,
        children: [
          { path: '/', element: <HomePage /> },
          { path: '/shopping', element: <ComingSoonPage /> },
          { path: '/recipes', element: <ComingSoonPage /> },
          { path: '/recipes/*', element: <ComingSoonPage /> },
          { path: '/community', element: <ComingSoonPage /> },
          { path: '/profile', element: <ComingSoonPage /> },
        ],
      },
    ],
  },
  { path: '*', element: <Navigate to="/" replace /> },
]);
