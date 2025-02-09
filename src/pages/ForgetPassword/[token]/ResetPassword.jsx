"use client";

import { useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom"; 
import Swal from 'sweetalert2';

const ResetPassword = () => {
  const navigate = useNavigate();
  const { token } = useParams(); 
  console.log("toto",token)
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false); 

  const handleResetPassword = async () => {
    const axiosInstance = axios.create({
      baseURL: "http://localhost:8000",
    });

    setLoading(true); 
    try {
      const response = await axiosInstance.patch(
        `/user/resetPassword/${token}`, 
        {
          password: password,
          confirmPassword: confirmPassword,
        }
      );
      console.log("res",response)

      if (response.status === 200) {
        Swal.fire({
          title: "تم التحديث بنجاح",
          text: "تم حفظ بياناتك بنجاح.",
          icon: "success",
          confirmButtonText: "حسناً",
        });
        navigate("/login");
      }
    } catch (error) {
      console.error("حدث خطأ أثناء إعادة تعيين كلمة المرور:", error);
      setError("حدث خطأ أثناء إعادة تعيين كلمة المرور."); // رسالة خطأ بالعربية
    } finally {
      setLoading(false); // تعيين حالة التحميل إلى false بعد الطلب
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const passwordRegex =  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/

    if (!passwordRegex.test(password)) {
      setError(
        "كلمة المرور يجب ان تكون اكثر من 8 احرف وتحتوي على حرف واحد على الاقل",
      );
    } else if (password !== confirmPassword) {
      setError("كلمات المرور غير متطابقة."); // رسالة خطأ بالعربية
    } else {
      setError("");
      handleResetPassword();
    }
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">إعادة تعيين كلمة المرور</h2>
      {successMessage && <p className="text-green-500">{successMessage}</p>}
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            كلمة المرور الجديدة
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="أدخل كلمة المرور الجديدة"
            required
          />
        </div>
        <div>
          <label
            htmlFor="confirmPassword"
            className="block text-sm font-medium text-gray-700"
          >
            تأكيد كلمة المرور
          </label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="أكد كلمة المرور الجديدة"
            required
          />
        </div>
        <button
          type="submit"
          className={`w-full ${loading ? "bg-gray-400" : "bg-indigo-600"} text-white font-bold py-2 px-4 rounded-md hover:bg-indigo-700`}
          disabled={loading} // تعطيل الزر أثناء التحميل
        >
          {loading ? "جاري التحميل..." : "إعادة تعيين كلمة المرور"} {/* تغيير نص الزر أثناء التحميل */}
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;