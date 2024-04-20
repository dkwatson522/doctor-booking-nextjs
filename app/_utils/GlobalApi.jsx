const { default: axios } = require("axios");

const API_KEY = process.env.NEXT_PUBLIC_STRAPI_API_KEY;
const axiosClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_STRAPI_API_URL,
  headers: {
    Authorization: `Bearer ${API_KEY}`,
  },
});

const getCategory = async () => {
  try {
    const response = await axiosClient.get("/categories?populate=*");
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

const getDoctors = async () => {
  try {
    const response = await axiosClient.get("/doctors?populate=*");
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

const getDoctorsByCategory = async (category) => {
  try {
    const response = await axiosClient.get(
      "/doctors?filters[category][name][$in]=" + category + "&populate=*"
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

const getDoctorById = async (id) => {
  try {
    const response = await axiosClient.get("/doctors/" + id + "?populate=*");
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export default {
  getCategory,
  getDoctors,
  getDoctorsByCategory,
  getDoctorById,
};
