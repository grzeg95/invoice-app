import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './index.scss'
import {App} from './App.tsx'
import {BreakpointsProvider} from './context/Breakpoints/BreakpointsProvider.tsx';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <BreakpointsProvider>
        <App/>
      </BreakpointsProvider>
    </QueryClientProvider>
  </StrictMode>
);
