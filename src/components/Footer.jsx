import { FiPhone } from "react-icons/fi";
import { MdOutlineEmail } from "react-icons/md";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { FaFacebook } from "react-icons/fa";
import { BsWhatsapp } from "react-icons/bs";
import { FaFacebookMessenger } from "react-icons/fa";
import { FaTelegram } from "react-icons/fa";
import { FaSquareInstagram } from "react-icons/fa6";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <div className="bg-blue-50 ">
      <div className="flex flex-col md:flex-row justify-around py-10">

        {/* الجزء الأول */}
        <div className="w-full md:w-[35%]">
          <div>
            <img src="assets/images/logo.png" alt="" className="mx-auto md:mx-0" />
            <p className="text-[#101828] text-[20px] md:text-[25px] mt-4">
              أفضل منصة لحجز الشاليهات بسهولة وسرعة. استمتع بتجربة فريدة في اختيار شاليه أحلامك مع خدمة مميزة تناسب احتياجاتك
            </p>

            {/* بيانات التواصل */}
            <div className="flex items-center  mt-4 gap-4">
              <FiPhone className="text-3xl font-extrabold text-[#1A71FF]" />
              <p className="ml-2 text-[#101828] text-[20px]">789 456 123 +966</p>
            </div>
            <div className="flex items-center  mt-4 gap-4">
              <MdOutlineEmail className="text-3xl font-extrabold text-[#1A71FF]" />
              <p className="ml-2 text-[#101828] text-[20px]">support@chaletsbooking.com</p>
            </div>
            <div className="flex items-center  mt-4 gap-4">
              <HiOutlineLocationMarker className="text-3xl font-extrabold text-[#1A71FF]" />
              <p className="ml-2 text-[#101828] text-[20px]">المملكة العربية السعودية، الرياض</p>
            </div>

            {/* الأيقونات */}
            <div className="flex justify-center  mt-8 gap-6">
              <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
                <FaSquareInstagram className="text-3xl text-pink-600" />
              </a>
              <a href="https://t.me" target="_blank" rel="noopener noreferrer">
                <FaTelegram className="text-3xl text-blue-700" />
              </a>
              <a href="https://www.messenger.com" target="_blank" rel="noopener noreferrer">
                <FaFacebookMessenger className="text-3xl text-indigo-900" />
              </a>
              <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                <FaFacebook className="text-3xl text-blue-800" />
              </a>
              <a href="https://wa.me" target="_blank" rel="noopener noreferrer">
                <BsWhatsapp className="text-3xl text-green-500" />
              </a>
            </div>
          </div>
        </div>

        {/* الروابط السريعة */}
        <div className="mt-8 md:mt-16 w-full md:w-[15%] text-center md:text-start">
          <h1 className="text-2xl">الروابط السريعة</h1>
          <div className="mt-8 flex flex-col space-y-4">
            <Link to="/" className="text-[#101828] hover:text-blue-700">الرئيسية</Link>
            <Link to="/about" className="text-[#101828] hover:text-blue-700">من نحن</Link>
            <Link to="/" className="text-[#101828] hover:text-blue-700">المزايا و الخدمات</Link>
            <Link to="/partners" className="text-[#101828] hover:text-blue-700">شركاء النجاح</Link>
            <Link to="/ContactUs" className="text-[#101828] hover:text-blue-700">اتصل بنا</Link>
          </div>
        </div>

        {/* الروابط الأخرى */}
        <div className="mt-8 md:mt-16 w-full md:w-[15%] text-center md:text-start">
          <h1 className="text-2xl">روابط أخرى</h1>
          <div className="mt-8 flex flex-col space-y-4">
            <Link to="/" className="text-[#101828] hover:text-blue-700">سياسة الخصوصية</Link>
            <Link to="/" className="text-[#101828] hover:text-blue-700">الشروط والأحكام</Link>
            <Link to="/" className="text-[#101828] hover:text-blue-700">الأسئلة الشائعة</Link>
          </div>
        </div>

      </div>

      {/* حقوق الطبع */}
      <h1 className="pb-3 text-center text-[#101828] text-xl">
        © 2024 جميع الحقوق محفوظة لمنصة حجز الشاليهات.
      </h1>
    </div>
  );
}
