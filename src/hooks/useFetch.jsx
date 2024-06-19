import axios from "axios";
import { useEffect, useState } from "react";

function useFetch(url) {
  const [data, setData] = useState({});

  const fetchData = async () => {
    try {
      const response = await axios.get(url);
      setData(response.data);
    } catch (error) {
      console.log("Hata: veri gelmedi", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [url]);

  return { data };
}

export default useFetch;
