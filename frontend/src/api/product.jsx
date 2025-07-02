import axios from "axios";

export const createProduct = async (token, product) => {
   const config = {
      headers: {
         Authorization: `Bearer ${token}`,
      },
   };

   const { data } = await axios.post(
      "http://localhost:5000/api/product",
      product,
      config
   );
   return data;
};

export const listProduct = async (count) => {
   const { data } = await axios.get(
      `http://localhost:5000/api/products/${count}`
   );
   return data;
};

export const readProduct = async (token, id) => {
   const config = {
      headers: {
         Authorization: `Bearer ${token}`,
      },
   };

   const { data } = await axios.get(
      `http://localhost:5000/api/product/${id}`,
      config
   );
   return data;
};

export const deleteProduct = async (token, id) => {
   const config = {
      headers: {
         Authorization: `Bearer ${token}`,
      },
   };

   const { data } = await axios.delete(
      `http://localhost:5000/api/product/${id}`,
      config
   );
   return data;
};

export const updateProduct = async (token, id, form) => {
   const config = {
      headers: {
         Authorization: `Bearer ${token}`,
      },
   };

   const { data } = await axios.put(
      `http://localhost:5000/api/product/${id}`,
      form,
      config
   );
   return data;
};

export const uploadFiles = async (token, form) => {
   const config = {
      headers: {
         Authorization: `Bearer ${token}`,
      },
   };

   const { data } = await axios.post(
      "http://localhost:5000/api/images",
      {
         images: form,
      },
      config
   );

   return data;
};

export const removeFiles = async (token, public_id) => {
   const config = {
      headers: {
         Authorization: `Bearer ${token}`,
      },
   };

   const { data } = await axios.post(
      "http://localhost:5000/api/removeimage",
      {
         public_id,
      },
      config
   );

   return data;
};

export const searchFilters = async (arg) => {
   const { data } = await axios.post(
      'http://localhost:5000/api/search/filters', arg
   );
   return data;
};
