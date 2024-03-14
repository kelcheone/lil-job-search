import { useState, useEffect } from "react";
import getData from "../utils/getData";
const useFetchWithID = ({ id }) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      setTimeout(() => {
        const jobDetail = getData.find((job) => job.job_id === id);

        setData([jobDetail]);

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

export default useFetchWithID;
