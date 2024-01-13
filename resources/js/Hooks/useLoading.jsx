import Loading from '@/Pages/Backend/components/Loading/Loading';
import { useState } from 'react';
const useLoading = () => {
  const [loading, setLoading] = useState(false);

  // Wrap the Loading component with the loading state check
  const LoadingIndicator = loading ? <Loading /> : null;

  return { loading, setLoading, LoadingIndicator };
};

export default useLoading;


