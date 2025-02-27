import axios from 'axios'

const baseUrl = axios.create({
    baseURL: "https://dev.brmjatech.uk/api/", 
    headers: {
      "Content-Type": "application/json",
    },
  });
export default baseUrl 
