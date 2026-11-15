import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import { store } from './store';
import { router } from './router';
import { ThemeSync } from './providers/ThemeSync';
import { SessionBootstrap } from './providers/SessionBootstrap';

export function App() {
  return (
    <Provider store={store}>
      <SessionBootstrap>
        <ThemeSync />
        <RouterProvider router={router} />
      </SessionBootstrap>
    </Provider>
  );
}
