import { useState, useEffect } from "react";
import axios from "axios";

function useFetch(url) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const res = await axios.get(url);
        setData(res.data);
      } catch (err) {
        setError(err);
      }
      setLoading(false);
    }
    fetchData();
  }, []);

  async function reFetch() {
    try {
      setLoading(true);
      const res = await axios.get(url);
      setData(res.data);
    } catch (err) {
      setError(err);
    }
    setLoading(false);
  }

  return { data, loading, error, reFetch };
}

export default useFetch;
