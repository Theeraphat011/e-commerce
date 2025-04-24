import { useEffect } from "react";
import ProductCart from "../components/cart/ProductCart";
import useEcomstore from "../Store/Store";
import SearchCart from "../components/cart/SearchCart";
// import CartCard from "../components/cart/CartCard";

const Shop = () => {
   const getProduct = useEcomstore((state) => state.getProduct);
   const products = useEcomstore((state) => state.products) || [];

   useEffect(() => {
      getProduct();
   }, []);

   return (
      <>
         <div className="w-full h-full">
            <div className="w-1/2 sm:w-1/3 md:w-1/5 lg:w-1/6">
               <SearchCart />
            </div>
            <div className="flex justify-center lg:w-2/2 pt-5 ml-35 overflow-y-auto">
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {products.length > 0 ? (
                     products.map((item, index) => (
                        <ProductCart item={item} key={index} />
                     ))
                  ) : (
                     <span className="text-center col-span-3">Products not found 404</span>
                  )}
               </div>
            </div>
            {/* <CartCard /> */}
         </div>
      </>
   );
};
export default Shop;
