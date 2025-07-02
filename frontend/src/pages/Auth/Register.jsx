import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const Register = () => {
   const [form, setForm] = useState({
      email: "",
      password: "",
      confirmPassword: "",
   });

   const handleOnchange = (e) => {
      setForm({
         ...form,
         [e.target.name]: e.target.value,
      });
   };

   const handleSumit = async (e) => {
      e.preventDefault();

      if (form.password !== form.confirmPassword) {
         return alert("Password and Confirm Password do not match");
      }

      try {
         const res = await axios.post(
            "http://localhost:5000/api/register",
            form
         );
         toast.success(res.data);
      } catch (err) {
         const errMag = err.response?.data?.message;
         toast.error(errMag);
         console.log(err);
      }
   };

   return (
      <div className="max-w-2xl w-full uppercase text-gray-800">
         <h1 className="text-3xl font-bold text-center mb-9">Register</h1>
         <form onSubmit={handleSumit} className="space-y-10 font-semibold">
            <div>
               <label className="block">Email</label>
               <input
                  type="email"
                  className="w-full p-2 border border-gray-300  rounded-xs focus:outline-none focus:border-green-500 mt-2"
                  value={form.email}
                  onChange={handleOnchange}
                  placeholder="Enter your email"
                  name="email"
                  required
               />
            </div>
            <div>
               <label className="block">Password</label>
               <input
                  type="password"
                  className="w-full p-2 border border-gray-300  rounded-xs focus:outline-none focus:border-green-500 mt-2"
                  value={form.password}
                  onChange={handleOnchange}
                  placeholder="Enter your password"
                  name="password"
                  required
               />
            </div>
            <div>
               <label className="block">Confirm Password</label>
               <input
                  type="password"
                  className="w-full p-2 border border-gray-300 rounded-xs focus:outline-none focus:border-green-500 mt-2"
                  value={form.confirmPassword}
                  onChange={handleOnchange}
                  placeholder="Confirm your password"
                  name="confirmPassword"
                  required
               />
            </div>
            <button
               type="submit"
               className="flex justify-center w-1/2 p-2 bg-green-600 text-white rounded-sx hover:bg-green-700 transition-all mx-auto cursor-pointer"
            >
               Register
            </button>
         </form>
      </div>
   );
};

export default Register;
