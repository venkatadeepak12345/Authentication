import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = ({ setUser }) => {
  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const [errors, setErrors] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "/api/auth/login",
        form,
        {
          withCredentials:true
        }
      );

      setUser(res.data.user);
      navigate("/");
    } catch (err) {
      console.log(err);
      setErrors("Invalid email or password");
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center">
      <form className="bg-white p-6 rounded shadow-md" onSubmit={handleSubmit}>
        <h2 className="text-xl mb-4">Login</h2>

        {errors && <p className="text-red-500 mb-4">{errors}</p>}

        <input
          type="email"
          placeholder="Enter Your Email"
          className="border p-2 w-full mb-3"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <input
          type="password"
          placeholder="Enter Your Password"
          className="border p-2 w-full mb-3"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <button
          type="submit"
          className="bg-blue-500 text-white p-2 w-full"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;