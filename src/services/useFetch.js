import { useState, useEffect } from "react";

const baseUrl = process.env.REACT_APP_API_BASE_URL;

export default function useFetch(url) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const init = async () => {
      try {
        const reponse = await fetch(baseUrl + url);
        if (reponse.ok) {
          const json = await reponse.json();
          setData(json);
        } else {
          throw reponse;
        }
      } catch (e) {
        setError(e);
      } finally {
        setLoading(false);
      }
    };
    init();
  }, [url]);

  return { data, error, loading };
}
