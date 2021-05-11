import { AuthProvider } from '../lib/auth';
import '../styles/globals.css';

function App({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
}

export default App;
