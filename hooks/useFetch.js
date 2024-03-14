import { useState, useEffect } from "react";
import axios from "axios";
import { RAPID_API_KEY } from "react-native-dotenv";
const rapidapiKey = RAPID_API_KEY;

// import from data.json

const useFetch = ({ endpoint, query }) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const abortController = new AbortController();

  const fetchData = async () => {
    setIsLoading(true);
    const options = {
      method: "GET",
      url: `https://jsearch.p.rapidapi.com/${endpoint}`,
      headers: {
        "X-RapidAPI-Key": rapidapiKey,
        "X-RapidAPI-Host": "jsearch.p.rapidapi.com",
      },
      params: { ...query },
      signal: abortController.signal,
    };

    try {
      const response = await axios.request(options);
      setData(response.data.data);
    } catch (error) {
      if (error.name !== "AbortError") {
        setError(error);
        alert(error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();

    return () => {
      abortController.abort();
    };
  }, []);

  const refetch = () => {
    setIsLoading(true);
    fetchData();
  };

  return { data, isLoading, error, refetch };
};

export default useFetch;
