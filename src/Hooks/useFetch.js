import { useState, useEffect } from "react";

const useFetch = (url) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const pageSize = 50;

  useEffect(() => {
    const abortCont = new AbortController();
    setLoading(true);
    fetch(`${url}?pageSize=${pageSize}`, { signal: abortCont.signal })
      .then((response) => {
        if (!response.ok) {
          if (response.status === 404) {
            window.location.href = "/";
          } else {
            throw new Error("Could not fetch!");
          }
        }
        return response.json();
      })
      .then((data) => {
        setData(data);
        setLoading(false);
        setError(null);
      })
      .catch((error) => {
        if (error.name === "AbortError") {
          console.log("Fetch aborted");
        } else {
          setError(error.message);
          setLoading(false);
        }
      });
    return () => abortCont.abort();
  }, [url]);

  return { data, loading, error };
};

export default useFetch;
