import { ViteReactSSG } from 'vite-react-ssg';
import { routes } from './routes';
import './styles.css';
import './premium.css';

export const createRoot = ViteReactSSG(
  { routes },
  ({ isClient }) => {
    if (isClient) {
      document.documentElement.classList.add('js');
    }
  }
);
