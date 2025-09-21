import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {ReactQueryDevtools} from '@tanstack/react-query-devtools';
import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './index.scss'
import {App} from './App.tsx'
import {AuthProvider} from './context/Auth/AuthProvider';
import {BreakpointsProvider} from './context/Breakpoints/BreakpointsProvider.tsx';
import {ThemeProvider} from './context/Theme/ThemeProvider';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <BreakpointsProvider>
        <AuthProvider>
          <ThemeProvider>
            <App/>
          </ThemeProvider>
        </AuthProvider>
      </BreakpointsProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </StrictMode>
);
