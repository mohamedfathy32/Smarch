import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

export default function SignUpUser() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const nav = useNavigate();
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&])[A-Za-z\d!@#$%^&]{8,}$/;

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError(null);
        setSuccess(null);

        // التحقق من صحة البيانات
        if (!emailRegex.test(email)) {
            setError("البريد الإلكتروني غير صالح.");
            return;
        }
        if (!passwordRegex.test(password)) {
            setError(
                "كلمة المرور يجب أن تحتوي على حرف كبير، حرف صغير، رقم، ورمز خاص (!@#$%^&) وأن تكون مكونة من 8 أحرف على الأقل."
            );
            return;
        }
        if (password !== confirmPassword) {
            setError("كلمتا المرور غير متطابقتين.");
            return;
        }

        try {
            const response = await axios.post(`${import.meta.env.VITE_URL_BACKEND}user`, {
                userName: username,
                email,
                password,
                role: "user",
            });
            console.log("Response:", response.data);
            localStorage.setItem("isLoggedIn", true);
            localStorage.setItem("token", response.data.token);
            Swal.fire({
                title: "تم التسجيل بنجاح!",
                text: "تم إنشاء حسابك بنجاح. سيتم تحويلك إلى الصفحة الرئيسية.",
                icon: "success",
                confirmButtonText: "حسناً",
            }).then(() => {
                nav("/");
            });
        } catch (error) {
            console.error("Error:", error.response ? error.response.data : error.message);
            Swal.fire({
                title: "خطأ",
                text: "حدث خطأ أثناء إنشاء الحساب. يرجى المحاولة مرة أخرى.",
                icon: "error",
                confirmButtonText: "حسناً",
            });
        }

    };

    return (
        <div className="flex flex-col md:flex-row justify-around mb-10 items-center py-10 bg-blue-50 rounded-lg shadow-lg overflow-hidden w-full">
            {/* form section */}
            <div className="w-full md:w-1/3 p-8">
                <h1 className="text-4xl font-bold text-[#1E293B] mb-4">
                    تريد الاستمتاع بإجازتك؟
                </h1>
                <p className="text-2xl text-[#718096] mb-6">
                    سجّل حسابك لتصفح الشاليهات وحجز عطلتك المثالية بسهولة.
                </p>
                {error && <p className="text-red-500 mb-4">{error}</p>}
                {success && <p className="text-green-500 mb-4">{success}</p>}
                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div className="p-[1px] bg-gradient-to-r from-[#1a72ffd3] via-[#1A71FFCC] to-[#48BB78] rounded-lg">
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="اسم المستخدم"
                            className="w-full p-3 bg-white rounded-lg text-right focus:outline-[#0061E0]"
                            required
                        />
                    </div>
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
                    <div className="p-[1px] bg-gradient-to-r from-[#1a72ffd3] via-[#1A71FFCC] to-[#48BB78] rounded-lg">
                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder="تأكيد كلمة المرور"
                            className="w-full p-3 bg-white rounded-lg text-right focus:outline-[#0061E0]"
                            required
                        />
                    </div>
                    <label className="flex items-center text-sm">
                        <input type="checkbox" className="ml-2" required />
                        أوافق على اتفاقية المستخدم
                    </label>
                    <button
                        type="submit"
                        className="w-full bg-gradient-to-l from-[#48BB78] to-[#1A71FF] text-white py-3 rounded-lg"
                    >
                        إنشاء حساب
                    </button>
                </form>
                <p className="text-center text-sm mt-4">
                    لديك حساب بالفعل؟{" "}
                    <Link to="/login" className="text-[#0061E0] font-semibold hover:underline">
                        سجل الدخول الآن
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
