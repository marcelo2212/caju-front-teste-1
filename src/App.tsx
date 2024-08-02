import { useEffect } from 'react';
import { setupInterceptors } from './services/axiosConfig';
import { useLoading } from './hooks/useLoading';
import Router from './router';
import { Header } from './components/Header';
import { RegistrationProvider } from './contexts/RegistrationContext';
import LoadingModal from './components/Loading/index';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [loading, setLoading] = useLoading(false);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 2000));
      setupInterceptors(setLoading);
      setLoading(false);
    };
    loadData();
  }, [setLoading]);

  return (
    <>
      
      <LoadingModal isLoading={loading} />
      <ToastContainer />
      <RegistrationProvider>
        <Header>
          <h1>Caju Front Teste</h1>
        </Header>
        <Router />
      </RegistrationProvider>
    </>
  );
}

export default App;
