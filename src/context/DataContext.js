import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const DataContext = createContext();

const DataContextProvider = ({ children }) => {
  const [mockData, setMockData] = useState("");

  const BASE_URL_DATA = `https://63ef8796271439b7fe70b81b.mockapi.io/api/v1/users`;

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const { data } = await axios(BASE_URL_DATA);
      setMockData(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const postData = async (info) => {
    try {
      const { data } = await axios.post(`${BASE_URL_DATA}`, info);
      setMockData(data);
      getData();
    } catch (error) {
      console.log(error);
    }
  };
  const putData = async (info) => {
    const { id } = info;
    try {
      const { data } = await axios.put(`${BASE_URL_DATA}/${id}`, info);
      console.log("Submit:", data);
      setMockData(data);
      getData();
    } catch (error) {
      console.log(error);
    }
  };

  const delData = async (info) => {
    const { id } = info;
    try {
      const { data } = await axios.delete(`${BASE_URL_DATA}/${id}`);
      setMockData(data);
      getData();
    } catch (error) {
      console.log(error);
    }
  };

  const values = {
    mockData,
    setMockData,
    postData,
    putData,
    delData,
    getData,
  };
  return <DataContext.Provider value={values}>{children}</DataContext.Provider>;
};
export default DataContextProvider;
