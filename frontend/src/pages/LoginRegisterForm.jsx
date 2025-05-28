import { useState } from "react";
import InputField from "../components/Form/InputField";
import { BASE_URL } from "../utils";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import logo from "../assets/images/laporinlogo.png";

axios.defaults.withCredentials = true;

const LoginRegisterForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();
  const [toast, setToast] = useState({ show: false, message: "", type: "" });
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

  const showToast = (message, type = "success") => {
    setToast({ show: true, message, type });
    setTimeout(() => {
      setToast({ show: false, message: "", type: "" });
    }, 3000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isLogin) {
      if (!formData.username || !formData.password) {
        showToast("Please enter your username and password.", "error");
        return;
      }

      try {
        const res = await axios.post(
          `${BASE_URL}/admin/login`,
          {
            username: formData.username,
            password: formData.password,
          },
        );

        // Simpan accessToken ke localStorage
        localStorage.setItem("accessToken", res.data.accessToken);
        showToast("Login berhasil! Mengalihkan...", "success");

        // Redirect otomatis setelah 1.5 detik
        setTimeout(() => {
          navigate("/admin/dashboard");
        }, 1500);
      } catch (error) {
        console.error("Login Error:", error.response?.data || error.message);
        showToast(error.response?.data?.message || "Login failed.", "error");
      }
    } else {
      const { name, username, email, password, confirmPassword } = formData;
      if (!name || !username || !email || !password || !confirmPassword) {
        showToast("All fields are required.", "error");
        return;
      }
      if (password !== confirmPassword) {
        showToast("Passwords do not match!", "error");
        return;
      }

      try {
        await axios.post(`${BASE_URL}/admin/register`, {
          name,
          username,
          email,
          password,
        });
        showToast("Registrasi berhasil! Silakan login.", "success");

        // Otomatis switch ke login setelah 2 detik
        setTimeout(() => {
          setIsLogin(true);
          setFormData({
            name: "",
            username: "",
            email: "",
            password: "",
            confirmPassword: "",
          });
        }, 2000);
      } catch (error) {
        console.error("Register Error:", error.response?.data || error.message);
        showToast(error.response?.data?.message || "Registration failed.", "error");
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 to-green-300 flex items-center justify-center p-4">
      {/* Toast Notification */}
      {toast.show && (
        <div className="fixed top-4 right-4 z-50 animate-slide-in">
          <div className={`px-6 py-4 rounded-lg shadow-lg text-white ${toast.type === "success" ? "bg-green-500" : "bg-red-500"}`}>
            <div className="flex items-center gap-2">
              {toast.type === "success" && (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              )}
              {toast.type === "error" && (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              )}
              <span className="font-medium">{toast.message}</span>
            </div>
          </div>
        </div>
      )}

      {/* Main Container */}
      <div className="w-full max-w-6xl">
        <div className=" bg-white rounded-2xl shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-2">
          {/* Left Side - Form */}
          <div className="p-8 lg:p-12 flex flex-col min-h-[625px]">
            {/* Logo and Title */}
            <div className="mb-4">
              <div className="flex items-center mb-4">
                <img
                  src={logo}
                  alt="Lapor.In Logo"
                  className="w-8 h-8 mr-3"
                />
                <span className="text-xl font-bold text-green-600">Lapor.In</span>
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {isLogin ? "Admin Login" : "Admin Registration"}
              </h1>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-2">
              {!isLogin && (
                <>
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                      Nama Lengkap
                    </label>
                    <InputField
                      id="name"
                      name="name"
                      placeholder="Masukkan nama lengkap"
                      value={formData.name}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                      Email
                    </label>
                    <InputField
                      id="email"
                      name="email"
                      type="email"
                      placeholder="Masukkan email"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>
                </>
              )}

              <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                  Username
                </label>
                <InputField
                  id="username"
                  name="username"
                  placeholder="Masukkan username"
                  value={formData.username}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <InputField
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Masukkan password"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>

              {!isLogin && (
                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                    Konfirmasi Password
                  </label>
                  <InputField
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    placeholder="Konfirmasi password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                  />
                </div>
              )}

              <button
                type="submit"
                className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-4 rounded-lg shadow-md transition duration-300 transform hover:scale-[1.02]"
              >
                {isLogin ? "Masuk" : "Daftar"}
              </button>
            </form>

            {/* Toggle Form */}
            <div className="mt-6 text-center">
              <p className="text-gray-600">
                {isLogin ? "Belum punya akun?" : "Sudah punya akun?"}{" "}
                <button
                  type="button"
                  className="text-green-600 hover:text-green-700 font-medium hover:underline transition"
                  onClick={() => {
                    setIsLogin(!isLogin);
                    setFormData({
                      name: "",
                      username: "",
                      email: "",
                      password: "",
                      confirmPassword: "",
                    });
                  }}
                >
                  {isLogin ? "Daftar disini" : "Masuk disini"}
                </button>
              </p>
            </div>
          </div>

          {/* Right Side - Image */}
          <div className="hidden lg:block relative bg-gradient-to-br from-green-400 to-green-600">
            <div className="absolute inset-0 flex items-center justify-center p-12">
              <div className="text-center text-white">
                <div className="w-48 h-48 mx-auto mb-8 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                  <svg className="w-24 h-24 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
                  </svg>
                </div>
                <h2 className="text-3xl font-bold mb-4">Panel Admin</h2>
                <p className="text-lg text-green-100 leading-relaxed">
                  Kelola platform Lapor.In dengan mudah dan efisien. Pantau laporan, verifikasi data, dan pastikan pelayanan terbaik untuk masyarakat.
                </p>
                <div className="mt-8 grid grid-cols-2 gap-4 text-center">
                  <div className="bg-white/20 rounded-lg p-4 backdrop-blur-sm">
                    <div className="text-2xl font-bold">24/7</div>
                    <div className="text-sm text-green-100">Monitoring</div>
                  </div>
                  <div className="bg-white/20 rounded-lg p-4 backdrop-blur-sm">
                    <div className="text-2xl font-bold">100%</div>
                    <div className="text-sm text-green-100">Secure</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full transform translate-x-16 -translate-y-16"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full transform -translate-x-12 translate-y-12"></div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes slide-in {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        .animate-slide-in {
          animation: slide-in 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default LoginRegisterForm;
