import { useState, useEffect } from 'react';

const useCopyToClipboard = (text, interval = 3000) => {
  const [isCopying, setIsCopying] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setIsCopying(true);
    } catch (error) {
      console.error('Unable to copy to clipboard:', error);
    }
  };

  useEffect(() => {
    let intervalId;

    if (isCopying) {
      intervalId = setInterval(() => {
        setIsCopying(false);
      }, interval);
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [isCopying, interval]);

  return { isCopying, handleCopy };
};

export default useCopyToClipboard;
