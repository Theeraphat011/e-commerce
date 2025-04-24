import useEcomstore from "../../Store/Store";
import { useEffect, useState } from "react";
import { createProduct, deleteProduct } from "../../api/product";
import { toast } from "react-toastify";
import Uploadfile from "./Uploadfile";
import { Link } from "react-router-dom";
import { Pencil,Trash2  } from 'lucide-react';

const initialState = {
   title: "",
   description: "",
   price: 0,
   quantity: 0,
   categoryId: 0,
   images: [],
};

const FormProduct = () => {
   const token = useEcomstore((state) => state.token);
   const getCategories = useEcomstore((state) => state.getCategory);
   const categories = useEcomstore((state) => state.categories);
   const getProduct = useEcomstore((state) => state.getProduct);
   const products = useEcomstore((state) => state.products);
   const [form, setForm] = useState({
      title: "",
      description: "",
      price: 0,
      quantity: 0,
      categoryId: 0,
      images: [],
   });

   useEffect(() => {
      getCategories();
      getProduct(100);
      // console.log(products);
   }, [getCategories, getProduct]);

   const handleOnChange = (e) => {
      setForm({
         ...form,
         [e.target.name]: e.target.value,
      });
   };

   const handleSubmit = async (e) => {
      e.preventDefault();

      if (form.categoryId === 0) {
         return toast.warning("Please select a category");
      }

      const price = parseInt(form.price, 10);
      const quantity = parseInt(form.quantity, 10);

      if (isNaN(price) || price <= 0) {
         return toast.warning("Price must be a positive integer");
      }

      if (isNaN(quantity) || quantity < 0) {
         return toast.warning("Quantity must be a non-negative integer");
      }

      try {
         const res = await createProduct(token, { ...form, price, quantity });
         setForm(initialState);
         getProduct(100);
         toast.success(`Product ${res.title} created`);
      } catch (err) {
         console.log(err);
      }
   };

   const handleDelete = async (id) => {
      if (window.confirm("Are you sure?")) {
         console.log(id);
         try {
            const res = await deleteProduct(token, id);
            getProduct(100);
            toast.success("DELETE SUCCESS!!");
            console.log(res);
         } catch (err) {
            console.log(err);
         }
      }
   };

   return (
      <>
         <div className="container py-8 pr-4 rounded-lg overflow-y-auto">
            <h1 className="text-3xl font-bold text-gray-700 mb-6">PRODUCTS</h1>
            <form
               onSubmit={handleSubmit}
               className="grid grid-cols-1 md:grid-cols-2 gap-6 uppercase text-gray-700 "
            >
               <div className="flex flex-col">
                  <label className="mb-2 font-semibold">Name</label>
                  <input
                     type="text"
                     className="border-0 p-2 focus:outline-none bg-white"
                     value={form.title}
                     onChange={handleOnChange}
                     placeholder="Name"
                     name="title"
                  />
               </div>
               <div className="flex flex-col">
                  <label className="mb-2 font-semibold">Description</label>
                  <input
                     type="text"
                     className="border-0 p-2 focus:outline-none bg-white"
                     value={form.description}
                     onChange={handleOnChange}
                     placeholder="Description"
                     name="description"
                  />
               </div>
               <div className="flex flex-col">
                  <label className="mb-2 font-semibold">Price</label>
                  <input
                     type="number"
                     className="border-0 p-2 focus:outline-none bg-white"
                     value={form.price}
                     onChange={handleOnChange}
                     placeholder="Price"
                     name="price"
                  />
               </div>
               <div className="flex flex-col">
                  <label className="mb-2 font-semibold">Quantity</label>
                  <input
                     type="number"
                     className="border-0 p-2 focus:outline-none bg-white"
                     value={form.quantity}
                     onChange={handleOnChange}
                     placeholder="Quantity"
                     name="quantity"
                  />
               </div>
               <div className="flex flex-col">
                  <label className="mb-2 font-semibold">Category</label>
                  <select
                     className="border-0 p-2 focus:outline-none bg-white appearance-none"
                     name="categoryId"
                     onChange={handleOnChange}
                     value={form.categoryId}
                     required
                  >
                     <option value={0}>Please Select</option>
                     {categories.map((item, index) => (
                        <option key={index} value={item.id}>
                           {item.name}
                        </option>
                     ))}
                  </select>
               </div>
               <div className="grid gap-1">
                  <label className="font-semibold text-gray-700">Images</label>
                  <Uploadfile form={form} setForm={setForm} />
               </div>
               <div className="col-span-1 md:col-span-2 flex justify-center md:justify-start">
                  <button className="p-2 px-8 rounded-xs bg-green-300 text-gray-700 font-bold hover:cursor-pointer hover:bg-green-400 transition-all">
                     CREATE
                  </button>
               </div>
            </form>

            <table className="table-auto mx-auto w-full border-collapse border border-gray-200 shadow-lg mt-10 text-gray-700">
               <thead>
                  <tr className="bg-gray-100 uppercase">
                     <th className="border border-gray-300 px-4 py-2">
                        Number
                     </th>
                     <th className="border border-gray-300 px-4 py-2">
                        Picture
                     </th>
                     <th className="border border-gray-300 px-4 py-2">Name</th>
                     <th className="border border-gray-300 px-4 py-2">
                        Description
                     </th>
                     <th className="border border-gray-300 px-4 py-2">Price</th>
                     <th className="border border-gray-300 px-4 py-2">
                        Quantity
                     </th>
                     <th className="border border-gray-300 px-4 py-2">Sold</th>
                     <th className="border border-gray-300 px-4 py-2">
                        Date Update
                     </th>
                     <th className="border border-gray-300 px-4 py-2">Edit</th>
                  </tr>
               </thead>
               <tbody>
                  {products.map((item, index) => (
                     <tr key={item.id} className="hover:bg-gray-50">
                        <td className="border border-gray-300 px-4 py-2 text-center">
                           {index + 1}
                        </td>
                        <td className="border border-gray-300 px-4 py-2 text-center">
                           {item.images.length > 0 ? (
                              <img
                                 src={item.images[0].url}
                                 className="w-24 h-24 shadow-md mx-auto rounded-xs"
                              />
                           ) : (
                              <div className="flex place-content-center">
                                 <p className="w-24 h-24 bg-gray-300 flex items-center justify-center rounded-xs">
                                    No Image!!
                                 </p>
                              </div>
                           )}
                        </td>
                        <td className="border border-gray-300 px-4 py-2 text-center">
                           {item.title}
                        </td>
                        <td className="border border-gray-300 px-4 py-2 text-center">
                           {item.description}
                        </td>
                        <td className="border border-gray-300 px-4 py-2 text-center">
                           {item.price}
                        </td>
                        <td className="border border-gray-300 px-4 py-2 text-center">
                           {item.quantity}
                        </td>
                        <td className="border border-gray-300 px-4 py-2 text-center">
                           {item.sold}
                        </td>
                        <td className="border border-gray-300 px-4 py-2 text-center">
                           {new Date(item.updatedAt).toLocaleDateString()}
                        </td>
                        <td className="border border-gray-300 px-4 py-2 text-center">
                           <div className="flex">
                              <Link
                                 to={`/admin/product/${item.id}`}
                                 className="bg-green-300 text-gray-800 px-3 py-2 rounded-xs hover:bg-green-400 transition-all cursor-pointer"
                              >
                                 <span className="flex items-center gap-2"><Pencil size={20}/> EDIT</span>
                              </Link>
                              <button
                                 className="bg-gray-400 text-white px-3 py-[7px] rounded-xs hover:bg-gray-500 transition-all ml-2 cursor-pointer"
                                 onClick={() => handleDelete(item.id)}
                              >
                                <span className="flex items-center gap-2"><Trash2 /> DELETE </span> 
                              </button>
                           </div>
                        </td>
                     </tr>
                  ))}
               </tbody>
            </table>
         </div>
      </>
   );
};

export default FormProduct;
