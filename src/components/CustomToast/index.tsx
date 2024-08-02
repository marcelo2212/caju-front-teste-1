import { ToastContainer, ToastOptions, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { TypeMessageToastEnum } from '~/types/TypeMessageToastEnum';

const CustomToast = () => {
  return (
    <>
      <ToastContainer />
    </>
  );
};

const showToast = (type: TypeMessageToastEnum, message: string, options?: ToastOptions) => {

  if (type === TypeMessageToastEnum.SUCCESS) {
    toast.success(message, options);
  } else if (type === TypeMessageToastEnum.ERROR) {
    toast.error(message, options);
  } else if (type === TypeMessageToastEnum.WARN) {
    toast.warn(message, options);
  } else if (type === TypeMessageToastEnum.INFO) {
    toast.info(message, options);
  }
  
};

export const notifySuccess = (message: string) => {
  showToast(TypeMessageToastEnum.SUCCESS, message, { autoClose: 5000 });
};

export const notifyError = (message: string) => {
  showToast(TypeMessageToastEnum.ERROR, message, { autoClose: 5000 });
};

export const notifyWarn = (message: string) => {
    showToast(TypeMessageToastEnum.WARN, message, { autoClose: 5000 });
};

export const notifyInfo = (message: string) => {
    showToast(TypeMessageToastEnum.INFO, message, { autoClose: 5000 });
};

export default CustomToast;
