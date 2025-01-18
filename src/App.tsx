import { Global, ThemeProvider } from '@emotion/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { CookiesProvider } from 'react-cookie';

import { Routers } from '@routes/index.tsx';

import { Layout, Modal, Toast, BottomSheet } from '@shared/common/ui';
import { theme, GlobalStyle } from '@shared/common/styles';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false
    }
  }
});

const App = () => (
  <CookiesProvider>
    <QueryClientProvider client={queryClient}>
      <Global styles={GlobalStyle} />
      <ThemeProvider theme={theme}>
        <Layout>
          <Routers />
          <BottomSheet />
          <Modal />
          <Toast />
        </Layout>
      </ThemeProvider>
      <ReactQueryDevtools />
    </QueryClientProvider>
  </CookiesProvider>
);

export default App;
