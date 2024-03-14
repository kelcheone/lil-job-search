import { useState, useEffect } from "react";
import getData from "../utils/getData";
const useFetchJson = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      // Simulating a delay to simulate loading state
      console.log("Fetching data...");
      // console.log("Data: ", getData.data);
      setTimeout(() => {
        setData(getData);
        setIsLoading(false);
      }, 500); // Simulate a 1-second delay
    } catch (error) {
      setError(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const refetch = () => {
    setIsLoading(true);
    fetchData();
  };

  return { data, isLoading, error, refetch };
};

export default useFetchJson;
