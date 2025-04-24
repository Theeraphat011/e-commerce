import useEcomstore from "../../Store/Store";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  readProduct,
  updateProduct,
} from "../../api/product";
import { toast } from "react-toastify";
import Uploadfile from "./Uploadfile";

const initialState = {
  title: "",
  description: "",
  price: 0,
  quantity: 0,
  categoryId: 0,
  images: [],
};

const FormEditProduct = () => {
  const { id } = useParams();
  const token = useEcomstore((state) => state.token);
  const getCategories = useEcomstore((state) => state.getCategory);
  const categories = useEcomstore((state) => state.categories);
  const [form, setForm] = useState(initialState);
  const navigate = useNavigate();

  useEffect(() => {
    getCategories();
    fetchProduct(token, id, form);
  }, []);

  const fetchProduct = async (token, id, form) => {
    try {
      const res = await readProduct(token, id, form);
      setForm(res);
    } catch (err) {
      console.log(`Error fetch data ${err}`);
    }
  };

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
    try {
      const res = await updateProduct(token, id, form);
      toast.success(`Edit ${res.title} Success!!`);
      navigate('/admin/product');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="container shadow-2xl rounded-lg">
        <h1 className="text-3xl font-bold text-gray-800 text-center mb-6">
          Edit Product
        </h1>
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <div className="flex flex-col">
            <label className="mb-2 font-semibold text-gray-700">Title</label>
            <input
              type="text"
              className="border p-2 rounded-md focus:outline-none focus:border-blue-500 focus:border-2"
              value={form.title}
              onChange={handleOnChange}
              placeholder="Title"
              name="title"
            />
          </div>
          <div className="flex flex-col">
            <label className="mb-2 font-semibold text-gray-700">Description</label>
            <input
              type="text"
              className="border p-2 rounded-md focus:outline-none focus:border-blue-500 focus:border-2"
              value={form.description}
              onChange={handleOnChange}
              placeholder="Description"
              name="description"
            />
          </div>
          <div className="flex flex-col">
            <label className="mb-2 font-semibold text-gray-700">Price</label>
            <input
              type="number"
              className="border p-2 rounded-md focus:outline-none focus:border-blue-500 focus:border-2"
              value={form.price}
              onChange={handleOnChange}
              placeholder="Price"
              name="price"
            />
          </div>
          <div className="flex flex-col">
            <label className="mb-2 font-semibold text-gray-700">Quantity</label>
            <input
              type="number"
              className="border p-2 rounded-md focus:outline-none focus:border-blue-500 focus:border-2"
              value={form.quantity}
              onChange={handleOnChange}
              placeholder="Quantity"
              name="quantity"
            />
          </div>
          <div className="flex flex-col">
            <label className="mb-2 font-semibold text-gray-700">Category</label>
            <select
              className="border p-2 rounded-md focus:outline-none focus:border-blue-500 focus:border-2"
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
          <div className="flex flex-col">
            <label className="mb-2 font-semibold text-gray-700">Images</label>
            <Uploadfile form={form} setForm={setForm} />
          </div>
          <div className="col-span-1 md:col-span-2 flex justify-center">
            <button className="p-2 px-8 rounded-md bg-blue-600 text-white hover:cursor-pointer hover:bg-blue-700 transition-all">
              Edit Product
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default FormEditProduct;
