import ReactDOM from 'react-dom/client';
import { RecoilRoot } from 'recoil';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { GlobalStyle } from './styles/GlobalStyles';
import { Global, ThemeProvider } from '@emotion/react';
import { theme } from './styles/theme';
import { Routers } from '@/routes/index.tsx';
import { Layout } from '@/components/layout';
import { GlobalBottomSheet } from '@/components/common/BottomSheet/GlobalBottomSheet';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false
    }
  }
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryClient}>
    <RecoilRoot>
      <Global styles={GlobalStyle} />
      <ThemeProvider theme={theme}>
        <Layout>
          <Routers />
          <GlobalBottomSheet />
        </Layout>
      </ThemeProvider>
    </RecoilRoot>
    <ReactQueryDevtools />
  </QueryClientProvider>
);
