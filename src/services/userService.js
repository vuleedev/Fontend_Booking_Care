import axios from "../axios";

export const handleLogin = (email, password) => {
  return axios.post("/api/login", { email, password });
};

export const getAllUsers = (id) => {
  return axios.get(`/api/get-all-user?id=${id}`, { id });
};

export const createNewUserService = (data) => {
  return axios.post("/api/create-new-user", data);
};

export const deleteUserService = (userId) => {
  return axios.delete("/api/delete-user", { data: { id: userId } });
};

export const editUserService = (inputData) => {
  return axios.put("/api/update-user", inputData);
};

export const getAllCodeService = (inputData) => {
  return axios.get(`/api/all-code?type=${inputData}`);
};
