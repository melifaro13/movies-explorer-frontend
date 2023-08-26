import { useState } from 'react';

export const useErrorMessageHandling = () => {
  const [errorCancelMessage, setErrorMessage] = useState(null);

  const showErrorMessage = (message) => {
    setErrorMessage(message);
    setTimeout(() => {
      setErrorMessage(null);
    }, 3000);
  };

  return [errorCancelMessage, showErrorMessage];
};
