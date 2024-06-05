import axios from "axios";

export const getIpAddress = () => {
  return axios.get('http://api.ipify.org/?format=json')
}
