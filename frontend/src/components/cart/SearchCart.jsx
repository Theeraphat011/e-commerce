import { useState, useEffect } from "react";
import useEcomstore from "../../Store/Store";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

const SearchCart = () => {
   const [text, setText] = useState("");
   const [categorySelected, setCategorySelected] = useState([]);
   const [price, setPrice] = useState([0, 3000]);
   const [ok, setOk] = useState(false);

   const actionSearchFilters = useEcomstore(
      (state) => state.actionSearchFilters
   );
   const getProduct = useEcomstore((state) => state.getProduct);
   const products = useEcomstore((state) => state.products) || [];

   const getCategory = useEcomstore((state) => state.getCategory);
   const categories = useEcomstore((state) => state.categories);

   // Query
   useEffect(() => {
      const delay = setTimeout(() => {
         if (text) {
            actionSearchFilters({ query: text });
         } else {
            getProduct();
         }
      }, 300);

      return () => clearTimeout(delay);
   }, [text]);

   // Category
   useEffect(() => {
      getCategory();
   }, []);

   const handleCheck = (e) => {
      const inCheck = e.target.value;
      const inState = [...categorySelected];
      const findCheck = inState.indexOf(inCheck);
      console.log(inCheck)

      if (findCheck === -1) {
         inState.push(inCheck);
      } else {
         inState.splice(findCheck, 1);
      }
      setCategorySelected(inState);

      if (inState.length > 0) {
         actionSearchFilters({ category: inState });
      } else {
         getProduct();
      }
   };

   //Rrice
   useEffect(() => {
      actionSearchFilters({ price });
   }, [ok]);

   const handlePrice = (value) => {
      setPrice(value);
      setTimeout(() => {
         setOk(!ok);
      }, 300);
   };

   return (
      <div className="fixed lg:h-screen p-4 border-r-1 border-gray-200 text-gray-700 px-10">
         <h1 className="text-lg font-bold mb-2">SEARCH</h1>
         <input
            onChange={(e) => setText(e.target.value)}
            type="text"
            placeholder="Search"
            className="w-full p-1 border border-gray-300 rounded-xs mb-4 focus:outline-0"
         />
         <div className="mt-4">
            <h1 className="text-lg font-bold mb-5">CATEGORY</h1>
            <div className="border-l-1 border-gray-300 ">
               {categories.map((item, index) => (
                  <div className="flex gap-3 pl-5 mb-2" key={index}>
                     <input
                        type="checkbox"
                        value={item.id}
                        onChange={handleCheck}
                        className="w-4 cursor-pointer"
                     />
                     <label>{item.name}</label>
                  </div>
               ))}
            </div>
         </div>
         <div className="mt-12"> 
            <h1>Price Search</h1>
            <div>
               <div className="flex justify-between">
                  <span>min : {price[0]}</span>
                  <span>max : {price[1]}</span>
               </div>

               <Slider
                  onChange={handlePrice}
                  range
                  min={0}
                  max={200000}
                  defaultValue={[0, 30000]}
               />
            </div>
         </div>
      </div>
   );
};
export default SearchCart;
