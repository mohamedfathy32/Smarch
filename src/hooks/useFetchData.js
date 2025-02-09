// hooks/useFetchData.js
import { useState, useEffect } from "react";
import axios from "axios";

const useFetchData = (url) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true); // Start loading
        const response = await axios.get(`${url}`); // Make the GET request
        setData(response.data.data); // Store the fetched data
      } catch (err) {
        setError(err.message); // Capture the error if any
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchData(); // Call the fetchData function
  }, [url]); // Re-run if the URL changes

  return { data, loading, error }; // Return the state values
};

export default useFetchData;
