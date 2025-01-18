import ReactDOM from 'react-dom/client';
import App from './App';

const enableMocking = async () => {
  if (process.env.NODE_ENV !== 'development') {
    return;
  }

  if (import.meta.env.VITE_APP_API_MOCKING === 'enabled') {
    const { worker } = await import('./mocks/browser');
    return worker.start();
  }
};

enableMocking().then(() =>
  ReactDOM.createRoot(document.getElementById('root')!).render(<App />)
);
