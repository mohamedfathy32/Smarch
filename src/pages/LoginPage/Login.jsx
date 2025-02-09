import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import {jwtDecode} from "jwt-decode"; // تأكد من استيراد jwtDecode

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false); // حالة اللودر
  const navigate = useNavigate();
  const url = import.meta.env.VITE_URL_BACKEND;

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true); // تشغيل اللودر

    try {
      const response = await axios.post(`${url}user/login`, { email, password });

      if (response.status === 200) {
        const user = response.data;

        console.log("تم تسجيل الدخول بنجاح:", user);

        localStorage.setItem("isLoggedIn", true);
        localStorage.setItem("token", user.token);
        localStorage.setItem("user", JSON.stringify(user));

        
        const decoded = jwtDecode(user.token);
        const role = decoded.role; 
        console.log("role",role)

        // عرض SweetAlert للسؤال عن الصفحة التي يرغب في الانتقال إليها
        Swal.fire({
          title: "تم تسجيل الدخول بنجاح!",
          text: "أين تريد الذهاب؟",
          icon: "success",
          showCancelButton: true,
          confirmButtonText: "الذهاب إلى الداشبورد",
          cancelButtonText: "الذهاب إلى الصفحة الرئيسية",
        }).then((result) => {
          if (result.isConfirmed) {
            if (role === 'user') {
              navigate('/userdashboard'); 
            } else if (role === 'owner') {
              navigate('/OwnerDashboard'); 
            }
          } else {
            navigate("/"); 
          }
        });
      } else {
        setError("بيانات تسجيل الدخول غير صحيحة");
      }
    } catch (err) {
      Swal.fire({
        title: "خطأ في تسجيل الدخول",
        text: "البريد الإلكتروني أو كلمة المرور غير صحيحة. يرجى إعادة المحاولة.",
        icon: "error",
        confirmButtonText: "حسنًا",
      });

      setError(
        err.response?.data.message || "حدث خطأ غير متوقع، يرجى المحاولة لاحقًا"
      );
    } finally {
      setIsLoading(false); // إيقاف اللودر
    }
  };

  return (
    <div className="flex flex-col md:flex-row justify-around mb-10 py-10 items-center bg-blue-50 rounded-lg shadow-lg overflow-hidden w-full">
      {/* form section */}
      <div className="w-full md:w-1/3 p-8">
        <h1 className="text-4xl font-bold text-[#1E293B] mb-4">مرحبًا بعودتك!</h1>
        <p className="text-2xl text-[#718096] mb-6">
          سجّل دخولك للوصول إلى حسابك واستمتع بخدماتنا.
        </p>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="p-[1px] bg-gradient-to-r from-[#1a72ffd3] via-[#1A71FFCC] to-[#48BB78] rounded-lg">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="بريد إلكتروني"
              className="w-full p-3 bg-white rounded-lg text-right focus:outline-[#0061E0]"
              required
            />
          </div>

          <div className="p-[1px] bg-gradient-to-r from-[#1a72ffd3] via-[#1A71FFCC] to-[#48BB78] rounded-lg">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="كلمة مرور"
              className="w-full p-3 bg-white rounded-lg text-right focus:outline-[#0061E0]"
              required
            />
          </div>
          <div>
            <Link to="/ForgetPassword" className="text-[#0061E0] pb-4 hover:underline">
              نسيت كلمة المرور؟
            </Link>
          </div>
          <button
            type="submit"
            className="w-full bg-gradient-to-l from-[#48BB78] to-[#1A71FF] text-white py-3 rounded-lg flex items-center justify-center gap-2"
            disabled={isLoading} // تعطيل الزر أثناء التحميل
          >
            {isLoading ? (
              <>
                <p className="mx-5">
                  جاري المعالجة
                </p>
                <div className="w-5 h-5 border-4 border-t-transparent border-white rounded-full animate-spin"></div>
              </>
            ) : (
              "تسجيل الدخول"
            )}
          </button>
        </form>
        <p className="text-center text-sm mt-4">
          ليس لديك حساب؟{" "}
          <Link to="/signup" className="text-[#0061E0] font-semibold hover:underline">
            إنشاء حساب جديد
          </Link>
        </p>
      </div>

      {/* image section */}
      <div className="hidden md:block w-full md:w-[40%]">
        <img
          src="/assets/images/login.png"
          alt="Building"
          className="w-full h-full object-contain"
        />
      </div>
    </div>
  );
}