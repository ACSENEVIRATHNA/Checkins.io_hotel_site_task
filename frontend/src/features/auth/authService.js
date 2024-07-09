import axios from "axios";
import { base_url, config } from "../../utils/axiosConfig";

const register = async (userData) => {
  const response = await axios.post(`${base_url}user/register`, userData);
  if (response.data) {
    if (response.data) {
      localStorage.setItem("customer", JSON.stringify(response.data));
    }
    return response.data;
  }
};

const login = async (userData) => {
  const response = await axios.post(`${base_url}user/login`, userData);
  if (response.data) {
    return response.data;
  }
};

const createABooking = async (data) => {
  const response = await axios.post(
    `${base_url}user/create-booking`,
    data,
    config
  );
  if (response.data) {
    return response.data;
  }
};

const deleteABooking = async (id) => {
  const response = await axios.delete(
    `${base_url}user/delete-booking`,
    id,
    config
  );
  if (response.data) {
    return response.data;
  }
};

const updateABooking = async (data) => {
  const response = await axios.put(
    `${base_url}user/update-booking`,
    data,
    config
  );
  if (response.data) {
    return response.data;
  }
};

const delAllBookings = async () => {
  const response = await axios.delete(
    `${base_url}user/delete-all-bookings`,
    config
  );
  if (response.data) {
    return response.data;
  }
};

const getUser = async () => {
  const response = await axios.get(`${base_url}user/get-user`, config);
  if (response.data) {
    return response.data;
  }
};

const getUserBookings = async () => {
    const response = await axios.get(`${base_url}user/get-bookings`, config);
    if (response.data) {
      return response.data;
    }
  };

export const authService = {
  register,
  login,
  createABooking,
  deleteABooking,
  updateABooking,
  delAllBookings,
  getUser,
  getUserBookings
};
