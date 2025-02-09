import { Link } from "react-router-dom";

const NotFound = () => {
    return (
        <div className="flex bg-[#eff6ff] justify-center">
            <div className="md:w-1/2 flex flex-col items-center justify-center h-screen text-gray-800">
                <h1 className="text-4xl font-bold text-blue-600 mb-6">الصفحة غير موجودة</h1>
                <p className="text-lg text-center mb-8 max-w-md">
                    لم نتمكن من العثور على الصفحة التي تبحث عنها، ولكن وجدنا شاليهات مميزة بأسعار تنافسية!
                </p>
                <Link
                    to="/partners"
                    className="bg-blue-600 text-white px-6 py-3 rounded-full text-lg font-semibold shadow-md hover:bg-blue-800 transition-all"
                >
                    استعرض الشاليهات
                </Link>
            </div>
            <div className="hidden md:block w-full md:w-[40%]">
                <img
                    src="/assets/images/login.png"
                    alt="Building"
                    className="w-full h-full object-contain"
                />
            </div>
        </div>
    );
};

export default NotFound;
