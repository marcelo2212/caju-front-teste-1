/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_API_BASE_URL: string;
    readonly VITE_APP_URI_REGISTRATIONS: string;
    readonly VITE_APP_URI_REGISTRATIONS_FILTER_BY_CPF: string;
    readonly VITE_APP_SET_TIMEOUT:number;
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv
  }