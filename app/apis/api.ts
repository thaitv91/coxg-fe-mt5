import axiosClient from "./axiosClient";

const API = {
  getListAccount: (params: {}) => {
    const url = 'api/accounts';
    return axiosClient.get(url, {params})
  }
};
export default API;
