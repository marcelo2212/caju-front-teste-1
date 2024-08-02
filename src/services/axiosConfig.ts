import axios from 'axios';
import { notifyError, notifySuccess } from '~/components/CustomToast';

const baseURL = import.meta.env.VITE_API_BASE_URL;
const setTimeOut = import.meta.env.VITE_APP_SET_TIMEOUT;

export const api = axios.create({
  baseURL: baseURL,
  timeout: setTimeOut,
});

export const setupInterceptors = (setLoading: (loading: boolean) => void) => {
  const requestInterceptor = api.interceptors.request.use(
    (config) => {
      setLoading(true);
      return config;
    },
    (error) => {
      setLoading(false);
      return Promise.reject(error);
    }
  );

  const responseInterceptor = api.interceptors.response.use(
    (response) => {
      setLoading(false);
      if(response?.config?.method === 'put'){
        notifySuccess('Registro atualizado com sucesso.');
      }

      if(response?.config?.method === 'post'){
        notifySuccess('Registro cadastrado com sucesso.');
      }

      if(response?.config?.method === 'delete'){
        notifySuccess('Registro deletado com sucesso.');
      }

      return response;
    },
    (error) => {
      setLoading(false);
      if (error.code === 'ECONNABORTED') {
        notifyError('Tempo de espera excedido. Por favor, entre em contato com o suporte.');
      } else {
        notifyError('Ocorreu um erro. Por favor, tente novamente mais tarde.');
      }
      return Promise.reject(error);
    }
  );

  return () => {
    api.interceptors.request.eject(requestInterceptor);
    api.interceptors.response.eject(responseInterceptor);
  };
};
