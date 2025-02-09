import { useNavigate } from "react-router-dom";

export default function SignUp() {
  const nav = useNavigate()
  return (
    <div className="min-h-screen flex flex-col items-center mb-10 pt-10 md:pt-20 bg-blue-50 text-center px-4">
      <h1 className="text-2xl md:text-3xl font-bold mb-4">
        ابدأ رحلتك معنا! اختر نوع الحساب الذي يناسب احتياجاتك.
      </h1>
      <p className="text-lg md:text-2xl">
        نقدم خدمات مميزة لكل فئة من مستخدمينا.
      </p>
      <p className="text-lg md:text-2xl mb-10">
        اختر دورك للاستمرار.
      </p>
      <div className="flex flex-col md:flex-row gap-6 items-center">
        {/* زر "أريد الحجز كعميل" */}
        <div onClick={() => { nav('/signupuser') }} className="flex-1 bg-blue-600 text-white rounded-lg shadow-md p-6 transition-transform transform hover:scale-105 cursor-pointer w-64 h-64 md:w-80 md:h-80 flex flex-col justify-center">
          <h1 className="text-xl md:text-3xl font-bold mb-4">أريد الحجز كعميل</h1>
          <p className="text-sm md:text-xl text-center">
            تصفح الشاليهات واحجز بسهولة للاستمتاع بعطلتك المثالية.
          </p>
        </div>
        {/* زر "أريد إدارة شاليه" */}
        <div onClick={() => { nav('/signupowner') }} className="flex-1 bg-white border-2 border-blue-400 rounded-lg shadow-md p-6 transition-transform transform hover:scale-105 cursor-pointer w-64 h-64 md:w-80 md:h-80 flex flex-col justify-center">
          <h2 className="text-xl md:text-3xl font-bold mb-4 text-[#101828]">أريد إدارة شاليه</h2>
          <p className="text-sm md:text-xl text-center text-[#5A6678]">
            أضف شاليهك وابدأ استقبال الحجوزات من العملاء الآن.
          </p>
        </div>
      </div>
    </div>
  );
}
