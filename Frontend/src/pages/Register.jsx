import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = ({ setUser }) => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });

  const [errors, setErrors] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("/api/auth/register", form,
        {
          withCredentials:true
        }
      );

      console.log(res.data);

      // backend response { user:{ id, username, email } }
      setUser(res.data.username);

      navigate("/");
    } catch (err) {
      console.log(err);
      setErrors(err.response?.data?.message || "Registration Failed");
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center">
      <form className="bg-white p-6 rounded shadow-md" onSubmit={handleSubmit}>
        <h2 className="text-xl mb-4">Register</h2>

        {errors && <p className="text-red-500 mb-4">{errors}</p>}

        <input
          type="text"
          placeholder="Enter Your Name"
          className="border p-2 w-full mb-3"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

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
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;