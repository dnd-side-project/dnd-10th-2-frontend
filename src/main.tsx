import ReactDOM from 'react-dom/client';
import { Global, ThemeProvider } from '@emotion/react';
import { RecoilRoot } from 'recoil';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import { Routers } from '@routes/index.tsx';
import { Layout, GlobalBottomSheet, Modal, Toast } from '@shared/common/ui';
import { theme, GlobalStyle } from '@shared/common/styles';

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
          <Modal />
          <Toast />
        </Layout>
      </ThemeProvider>
    </RecoilRoot>
    <ReactQueryDevtools />
  </QueryClientProvider>
);
