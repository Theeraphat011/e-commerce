import axios from "axios";

export const createCategories = async (token, form) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const res = await axios.post(
    "http://localhost:5000/api/category",
    form,
    config
  );
  return res;
};

export const getCategories = async () => {
  const res = await axios.get("http://localhost:5000/api/category");
  return res;
};

export const deleteCategories = async (token, id) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const res = await axios.delete(
    `http://localhost:5000/api/category/${id}`,
    config
  );
  return res;
};
