import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

const Loading = () => {
  const [loading, setLoading] = useState(3);
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setLoading((loadingCount) => {
        if (loadingCount === 1) {
          clearInterval(interval);
          setRedirect(true);
        }
        return loadingCount - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  if (redirect) {
    return <Navigate to={'/'} />;
  }


  return (
    <>
        <div>No Permiss, Redirect in {loading}</div>
    </>
  )
};
export default Loading;
