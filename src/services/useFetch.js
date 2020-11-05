import { useState, useEffect, useRef } from "react";

const baseUrl = process.env.REACT_APP_API_BASE_URL;

export default function useFetch(url) {
  const isMounted = useRef(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    isMounted.current = true;
    const init = async () => {
      try {
        const reponse = await fetch(baseUrl + url);
        if (reponse.ok) {
          const json = await reponse.json();
          if (isMounted.current) setData(json);
        } else {
          throw reponse;
        }
      } catch (e) {
        if (isMounted.current) setError(e);
      } finally {
        if (isMounted.current) setLoading(false);
      }
    };
    init();

    return () => {
      // function returned from useEffect will be executed when unmounted
      isMounted.current = false;
    };
  }, [url]);

  return { data, error, loading };
}
