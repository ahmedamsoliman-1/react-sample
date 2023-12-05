import React from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const handleButtonClick = () => {
    toast.success('Button clicked! Notification displayed.');
  };

  return (
    <div>
      <h1>React Toastify Example</h1>
      <button onClick={handleButtonClick}>Click me!</button>
      <ToastContainer />
    </div>
  );
};

export default App;
