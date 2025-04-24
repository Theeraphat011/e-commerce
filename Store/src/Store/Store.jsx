import { create } from "zustand";
import axios from "axios";
import { persist, createJSONStorage } from "zustand/middleware";
import { getCategories } from "../api/category";
import { listProduct, searchFilters } from "../api/product";

const ecomStore = (set) => ({
   user: null,
   token: null,
   categories: [],
   products: [], 

   actionLogin: async (form) => {
      const res = await axios.post("http://localhost:5000/api/login", form);
      // console.log(res.data.token);
      set({
         user: res.data.payload,
         token: res.data.token,
      });
      return res;
   },

   // getData function
   getCategory: async () => {
      try {
         const res = await getCategories();
         set({
            categories: res.data,
         });
      } catch (err) {
         console.log(err);
      }
   },

   // getData function
   getProduct: async (count = 100) => {
      try {
         const res = await listProduct(count);
         set({
            products: res,
         });
      } catch (err) {
         console.log(err);
      }
   },

   actionSearchFilters: async (arg) => {
   
      try {
         const res = await searchFilters(arg);
         await set({
            products: res
         });

         console.log(res)
      } catch (err) {
         console.log(err);
      }
   },
});

const usePersite = {
   name: "ecom-store",
   store: createJSONStorage(() => localStorage),
};

const useEcomstore = create(persist(ecomStore, usePersite));

export default useEcomstore;
