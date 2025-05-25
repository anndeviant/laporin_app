import { useState } from "react";
import axios from "axios";
import InputField from "../components/Form/InputField";
import { BASE_URL } from "../utils";

axios.defaults.withCredentials = true;

const LoginRegisterForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isLogin) {
      if (!formData.username || !formData.password) {
        alert("Please enter your username and password.");
        return;
      }

      try {
        const res = await axios.post(`${BASE_URL}/admin/login`, {
          username: formData.username,
          password: formData.password,
        });

        console.log("Login Success:", res.data);
        alert("Login successful!");
      } catch (error) {
        console.error("Login Error:", error.response?.data || error.message);
        alert(error.response?.data?.message || "Login failed.");
      }
    } else {
      const { name, username, email, password, confirmPassword } = formData;
      if (!name || !username || !email || !password || !confirmPassword) {
        alert("All fields are required.");
        return;
      }
      if (password !== confirmPassword) {
        alert("Passwords do not match!");
        return;
      }

      try {
        const res = await axios.post(`${BASE_URL}/admin/register`, {
          name,
          username,
          email,
          password,
        });

        console.log("Register Success:", res.data);
        alert("Registration successful. Please login.");
        setIsLogin(true);
      } catch (error) {
        console.error("Register Error:", error.response?.data || error.message);
        alert(error.response?.data?.message || "Registration failed.");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 to-green-300 px-4">
      <div className="w-full max-w-md bg-white shadow-xl rounded-xl p-8 border border-green-300">
        <h2 className="text-2xl font-semibold text-center text-green-700 mb-6">
          {isLogin ? "Admin Login" : "Admin Registration"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          {!isLogin && (
            <>
              <InputField
                id="name"
                name="name"
                placeholder="Full Name"
                onChange={handleChange}
              />
              <InputField
                id="username"
                name="username"
                placeholder="Username"
                onChange={handleChange}
              />
              <InputField
                id="email"
                name="email"
                type="email"
                placeholder="Email"
                onChange={handleChange}
              />
            </>
          )}
          {isLogin && (
            <InputField
              id="username"
              name="username"
              placeholder="Username"
              onChange={handleChange}
            />
          )}
          <InputField
            id="password"
            name="password"
            type="password"
            placeholder="Password"
            onChange={handleChange}
          />
          {!isLogin && (
            <InputField
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              placeholder="Confirm Password"
              onChange={handleChange}
            />
          )}
          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-md shadow-md transition duration-300"
          >
            {isLogin ? "Login" : "Register"}
          </button>
        </form>

        <div className="mt-4 text-center text-sm text-gray-600">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <button
            type="button"
            className="text-green-700 hover:underline font-medium"
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? "Register here" : "Login here"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginRegisterForm;
