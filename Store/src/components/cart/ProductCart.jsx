import { ShoppingBasket } from "lucide-react";

const ProductCart = ({ item }) => {
   return (
      <div className="grid shadow-sm p-3 sm:w-85 sm:h-110 bg-white hover:shadow-lg transition-shadow duration-300 mx-auto">
         <div>
            {item.images && item.images.length > 0 ? (
               <img
                  src={item.images[0].url}
                  className="w-full h-60 object-cover"
               />
            ) : (
               <div className="h-40 bg-gray-200 flex items-center justify-center">
                  No image
               </div>
            )}
         </div>

         <div className="py-4">
            <p className="text-base font-bold text-blue-700">{item.title}</p>
            <p className="text-sm text-gray-400 mt-1">{item.description}</p>
         </div>
         <div className="flex items-center justify-between gap-2 mt-1">
            <span className="text-lg font-bold text-green-500">
               ฿ {item.price.toLocaleString()}
            </span>
            <button className="bg-gray-800 rounded-md text-white p-2 hover:bg-gray-600 transition-colors duration-300 cursor-pointer">
               <ShoppingBasket />
            </button>
         </div>
      </div>
   );
};
export default ProductCart;
