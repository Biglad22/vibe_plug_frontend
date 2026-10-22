import React from 'react';
import { createRoot } from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Provider } from 'react-redux';
import App from './App';
import { PageLoaderProvider } from './context';
import { store } from './store';
import { initializeUserSession } from './store/userSessionSlice';

const queryClient = new QueryClient();
store.dispatch(initializeUserSession());

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <PageLoaderProvider>
          <App />
        </PageLoaderProvider>
      </QueryClientProvider>
    </Provider>
  </React.StrictMode>
);