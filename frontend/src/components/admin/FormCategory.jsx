import {
  createCategories,
  deleteCategories,
} from "../../api/category";
import { useEffect, useState } from "react";
import useEcomstore from "../../Store/Store";
import { toast } from "react-toastify";

const FormCategory = () => {
  const token = useEcomstore((state) => state.token);
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const categories = useEcomstore((state) => state.categories);
  const getCategory = useEcomstore((state) => state.getCategory);

  useEffect(() => {
    getCategory(token);
  }, [token, getCategory]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name) {
      return toast.warning("Please enter a category name", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }

    const isDuplicate = categories.some((category) => category.name.toLowerCase() === name.toLowerCase());
    if (isDuplicate) {
      return toast.error("Category already exists", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }

    setIsLoading(true);
    try {
      const res = await createCategories(token, { name });
      const data = res.data.name;
      getCategory(token);
      toast.success(`Category ${data} created`, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      setName("");
    } catch (err) {
      console.log(err);
      toast.error("Failed to create category", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteCategories(token, id);
      toast.success(`Deleted Successfully`, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      getCategory(token);
    } catch (err) {
      console.log(err);
      toast.error("Failed to delete category", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  };

  const sortedCategories = [...categories].sort((a, b) =>
    a.name.localeCompare(b.name)
  );

  return (
    <>
      <div className="container p-8 h-full text-gray-700 overflow-y-auto">
        <h1 className="text-3xl font-bold mb-6">
          CATEGORY
        </h1>
        <form
          onSubmit={handleSubmit}
          className="flex gap-4 items-center mb-6 overflow-y-auto"
        >
          <input
            type="text"
            className="p-2 w-64 bg-white border-0 focus:outline-none focus:border-blue-500 rounded-xs"
            value={name}
            placeholder="Name"
            onChange={(e) => setName(e.target.value)}
            disabled={isLoading}
          />
          <button
            className="bg-green-500 text-white rounded-xs p-2 hover:cursor-pointer hover:bg-green-700 transition-all"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? "Creating..." : "ADD"}
          </button>
        </form>

        <table className="table-auto mx-auto w-full border-collapse border border-gray-200 shadow-sm mt-10">
          <thead>
            <tr className="bg-gray-100 text-xl">
              <th className="border border-gray-300 px-4 py-2 w-1/10 text-center">NUMBER</th>
              <th className="border border-gray-300 px-4 py-2 w-1/2">NAME</th>
              <th className="border border-gray-300 px-4 py-2 w-1/10">ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {sortedCategories.map((item, index) => (
              <tr key={item.id} className="hover:bg-gray-50">
                <td className="border border-gray-300 px-4 py-2 text-center">{index + 1}</td>
                <td className="border border-gray-300 px-4 py-2 text-center">{item.name}</td>
                <td className="border border-gray-300 px-4 py-2 text-center">
                  <button
                    className="bg-gray-500 text-white px-3 py-1 rounded-xs hover:bg-gray-700 transition-all cursor-pointer"
                    onClick={() => handleDelete(item.id)}
                  >
                    DELETE
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default FormCategory;
