import { useEffect, useState } from 'react';
import useMessageStore from '../store/useMessageStore';

function Snackbar() {
  const { message, messageType, clearMessage } = useMessageStore();

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        clearMessage();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  return (
    <div className={`fixed bottom-4 left-1/2 transform -translate-x-1/2 ${messageType === 'success' ? 'bg-green-700' : 'bg-white'} bg-opacity-70 p-4 rounded text-white`}>
      {message && <p>{message}</p>}
    </div>
  );
}

export default Snackbar;