import { useState } from "react";
import { toast } from "react-toastify";
import useEcomstore from "../../Store/Store";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const actionLogin = useEcomstore((state) => state.actionLogin);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleOnchange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSumit = async (e) => {
    e.preventDefault();
    try {
      const res = await actionLogin(form);
      const role = res.data.payload.role;
      const data = res.data.message;
      roleRedirect(role);
      toast.success(data);
    } catch (err) {
      console.log(err);
      const errMsg = err.response.data.message;
      toast.error(errMsg);
    }
  };

  const roleRedirect = (role) => {
    if (role === "admin") {
      navigate("/admin");
      toast.success("Welcome Admin");
    } else {
      navigate("/user");
      toast.success("Welcome User");
    }
  };

  return (
    <div className="mt-30 max-w-2xl w-full uppercase text-gray-800">
        <h1 className="text-3xl font-bold text-center mb-9">Login</h1>
        <form onSubmit={handleSumit} className="space-y-10 font-semibold">
          <div>
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              className="w-full p-2 border border-gray-300 rounded-xs focus:outline-none focus:border-green-500 mt-2"
              value={form.email}
              onChange={handleOnchange}
              placeholder="Enter your email"
              name="email"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              className="w-full p-2 border border-gray-300 rounded-xs focus:outline-none focus:border-green-500 mt-2"
              value={form.password}
              onChange={handleOnchange}
              placeholder="Enter your password"
              name="password"
              required
            />
          </div>
          <button
            type="submit"
             className="flex justify-center w-1/2 p-2 bg-green-600 text-white rounded-sx hover:bg-green-700 transition-all mx-auto cursor-pointer"
          >
            Login
          </button>
        </form>
      </div>
  );
};

export default Login;
