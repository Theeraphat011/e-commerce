const CartCard = () => {
   return (
      <div className="w-full lg:w-1/4 bg-gray-200 h-auto lg:h-screen p-4 overflow-y-auto">
         <p className="text-xl font-bold mb-4 text-gray-700">Cart</p>
         <button className="w-full p-2 bg-red-500 text-white rounded mt-4">
            Checkout
         </button>
      </div>
   );
};
export default CartCard;
