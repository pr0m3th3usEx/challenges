import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { Provider } from '@/components/ui/provider.tsx';
import { SWRConfig } from 'swr';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider>
      <SWRConfig
        value={{
          revalidateOnFocus: false,
          errorRetryCount: 5,
        }}
      >
        <App />
      </SWRConfig>
    </Provider>
  </StrictMode>,
);
