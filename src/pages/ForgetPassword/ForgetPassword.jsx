import { Link } from "react-router-dom";
import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

export default function ForgetPassword() {
    const [email, setEmail] = useState('');
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError(null);
        setSuccess(null);

        try {
            const response = await axios.post('http://localhost:8000/user/forgotPassword', {
                email,
            });

            setSuccess(response.data.message);
            Swal.fire({
                title: "تم إرسال البريد الإلكتروني بنجاح",
                text: "تحقق من بريدك الإلكتروني لاستعادة كلمة المرور.",
                icon: "success",
                confirmButtonText: "حسناً",
            });
        } catch (err) {
            setError(err.response?.data?.message || "حدث خطأ");
            Swal.fire({
                title: "خطأ",
                text: error,
                icon: "error",
                confirmButtonText: "حسناً",
            });
        }
    };

    return (
        <div className="flex flex-col md:flex-row justify-around py-10 items-center bg-blue-50 rounded-lg shadow-lg overflow-hidden w-full">
            {/* form section*/}
            <div className="w-full md:w-1/3 p-8">
                <h1 className="text-4xl font-bold text-[#1E293B] mb-4">
                    نسيت كلمة المرور؟
                </h1>
                <p className="text-2xl text-[#718096] mb-6">
                    لا تقلق! أدخل بريدك الإلكتروني لاستعادة كلمة المرور.
                </p>
                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div className="p-[1px] bg-gradient-to-r from-[#1a72ffd3] via-[#1A71FFCC] to-[#48BB78] rounded-lg">
                        <input
                            type="email"
                            placeholder="بريد إلكتروني"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full p-3 bg-white rounded-lg text-right focus:outline-[#0061E0]"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-gradient-to-l from-[#48BB78] to-[#1A71FF] text-white py-3 rounded-lg"
                    >
                        إرسال
                    </button>
                </form>
                <div className="text-center mt-2">
                    <Link to="/login" className="text-[#0061E0] text-2xl font-bold hover:underline">
                        العودة إلى تسجيل الدخول
                    </Link>
                </div>
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