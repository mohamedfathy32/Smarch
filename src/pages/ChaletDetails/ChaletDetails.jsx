import { useNavigate, useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { IoIosArrowBack, IoIosArrowDown } from "react-icons/io";
import { GrSwim } from "react-icons/gr";
import { RiHomeOfficeFill } from "react-icons/ri";
import { MdCancel, MdLocationOn } from "react-icons/md";
import { BsInfoCircle } from "react-icons/bs";
import axios from "axios";
import Splash from "../../components/Splash";
import Swal from "sweetalert2";
import { jwtDecode } from "jwt-decode";
import { FaFacebook } from "react-icons/fa";
import { FaSquareInstagram } from "react-icons/fa6";

export default function ChaletDetails() {
  const [chalet, setChalet] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isOwner, setIsOwner] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false); // State to control login modal visibility
  const [showSignUpModal, setShowSignUpModal] = useState(false); // State to control sign-up modal visibility
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchChalet = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_URL_BACKEND}chalet/${id}`);
        console.log("بيانات الشاليه:", response.data);
        const chaletData = response.data.data;
        setChalet(chaletData);
      } catch (error) {
        console.error("خطأ في استرجاع بيانات الشاليه:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchChalet();
  }, [id]);

  useEffect(() => {
    if (!loading && chalet && token) {
      const decoded = jwtDecode(token);
      const ownerid = decoded.id;
      console.log(chalet);
      if (ownerid === chalet.ownerID._id) {
        setIsOwner(true);
      }
    }
  }, [loading, chalet, token]);

  const [openSection, setOpenSection] = useState("المرافق");

  const toggleSection = (section) => {
    setOpenSection(openSection === section ? null : section);
  };

  const handleBooking = () => {
    if (!token) {
      setShowLoginModal(true); // Show the login modal instead of navigating
    } else {
      navigate(`/Datapicker/${id}`);
    }
  };

  const editChlet = () => {
    navigate('/ownerdashboard/editChlet', { state: { id } });
  };

  const handleLogin = async (email, password) => {
    const url = import.meta.env.VITE_URL_BACKEND;
    try {
      const response = await axios.post(`${url}user/login`, { email, password });
      if (response.status === 200) {
        const user = response.data;
        console.log("تم تسجيل الدخول بنجاح:", user);
        localStorage.setItem("isLoggedIn", true);
        localStorage.setItem("token", user.token);
        localStorage.setItem("user", JSON.stringify(user));
        Swal.fire({
          title: "تم تسجيل الدخول بنجاح!",
          text: "مرحباً بك! سيتم تحويلك إلى الصفحة الرئيسية.",
          icon: "success",
          confirmButtonText: "حسناً",
        }).then(() => {
          navigate(`/Datapicker/${id}`);
        });
      } else {
        Swal.fire({
          title: "خطأ",
          text: "بيانات تسجيل الدخول غير صحيحة",
          icon: "error",
          confirmButtonText: "حسناً",
        });
      }
    } catch (err) {
      console.error("خطأ في تسجيل الدخول:", err);
      Swal.fire({
        title: "خطأ في تسجيل الدخول",
        text: "البريد الإلكتروني أو كلمة المرور غير صحيحة. يرجى إعادة المحاولة.",
        icon: "error",
        confirmButtonText: "حسنًا",
      });
    }
  };

  const handleSignUp = async (event) => {
    event.preventDefault();
    // Validate input
    if (password !== confirmPassword) {
      Swal.fire({
        title: "خطأ",
        text: "كلمتا المرور غير متطابقتين.",
        icon: "error",
        confirmButtonText: "حسناً",
      });
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
        navigate(`/Datapicker/${id}`);
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
    <>
      {loading ? (
        <Splash />
      ) : (
        <div className="my-10 mx-4 sm:mx-8">
          {isOwner ? (
            <div dir="ltr" className="my-6 sm:my-8 px-4 sm:px-8 ">
              <button
                onClick={editChlet}
                className="flex items-center gap-5 bg-[#0061E0] text-white py-2 px-6 sm:px-16 rounded-lg text-sm sm:text-2xl font-semibold"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="24" viewBox="0 0 25 24" fill="none">
                  <path
                    d="M12.5 3H5.5C4.96957 3 4.46086 3.21071 4.08579 3.58579C3.71071 3.96086 3.5 4.46957 3.5 5V19C3.5 19.5304 3.71071 20.0391 4.08579 20.4142C4.46086 20.7893 4.96957 21 5.5 21H19.5C20.0304 21 20.5391 20.7893 20.9142 20.4142C21.2893 20.0391 21.5 19.5304 21.5 19V12"
                    stroke="#E9F3FF"
                    style={{ strokeWidth: 2 }}
                  />
                  <path
                    d="M18.8751 2.62498C19.2729 2.22716 19.8125 2.00366 20.3751 2.00366C20.9377 2.00366 21.4773 2.22716 21.8751 2.62498C22.2729 3.02281 22.4964 3.56237 22.4964 4.12498C22.4964 4.68759 22.2729 5.22716 21.8751 5.62498L12.8621 14.639C12.6246 14.8762 12.3313 15.0499 12.0091 15.144L9.13609 15.984C9.05005 16.0091 8.95883 16.0106 8.872 15.9883C8.78517 15.9661 8.70592 15.9209 8.64254 15.8575C8.57916 15.7942 8.53398 15.7149 8.51174 15.6281C8.48949 15.5412 8.491 15.45 8.51609 15.364L9.35609 12.491C9.45062 12.169 9.62463 11.876 9.86209 11.639L18.8751 2.62498Z"
                    stroke="#E9F3FF"
                    style={{ strokeWidth: 2 }}
                  />
                </svg>
                تعديل
              </button>
            </div>
          ) : ''}
          <div className="bg-blue-50 py-10 flex flex-col md:flex-row items-center justify-between space-y-8 md:space-y-0 md:space-x-8">
            <div className="w-full md:w-[60%] px-2 sm:px-4">
              <h1 className="text-3xl font-bold my-4 sm:my-6">{chalet.title}</h1>
              <p className="text-xl font-normal">{chalet.description}</p>
              <h1 className="text-2xl font-bold text-[#0061E0] my-6 sm:my-8">
                {chalet.price} / ليله
              </h1>
              <div className="w-full md:w-[80%] space-y-4 sm:space-y-6 pb-8">
                {/* المرافق */}
                <div className="p-4 rounded-lg shadow-md transition-all duration-300 bg-[#0061E0]">
                  <div
                    className="flex justify-between items-center cursor-pointer"
                    onClick={() => toggleSection("المرافق")}
                  >
                    <h2 className="text-lg sm:text-2xl text-white">المرافق والوصف</h2>
                    {openSection === "المرافق" ? (
                      <IoIosArrowBack className="w-5 sm:w-6 h-5 sm:h-6 text-white" />
                    ) : (
                      <IoIosArrowDown className="w-5 sm:w-6 h-5 sm:h-6 text-white" />
                    )}
                  </div>
                </div>
                {openSection === "المرافق" && (
                  <div className="mt-2 sm:mt-4 text-[#101828] bg-white p-4 sm:p-6 rounded-lg">
                    <div className="flex items-center mb-4">
                      <GrSwim className="text-blue-600 text-2xl sm:text-3xl me-2 sm:me-3" />
                      <p className="text-sm sm:text-xl">
                        مسبح خاص ونظيف، محاط بكراسي للتشمس وجلسات مريحة.
                      </p>
                    </div>
                    <div className="flex items-center">
                      <RiHomeOfficeFill className="text-blue-600 text-2xl sm:text-3xl me-2 sm:me-3" />
                      <p className="text-sm sm:text-xl">
                        حديقة خارجية خضراء تضم منطقة شواء مخصصة (BBQ)
                      </p>
                    </div>
                  </div>
                )}

                {/* الموقع */}
                <div className="p-4 rounded-lg shadow-md transition-all duration-300 bg-[#0061E0]">
                  <div
                    className="flex justify-between items-center cursor-pointer"
                    onClick={() => toggleSection("الموقع")}
                  >
                    <h2 className="text-lg sm:text-2xl text-white">الموقع</h2>
                    {openSection === "الموقع" ? (
                      <IoIosArrowBack className="w-5 sm:w-6 h-5 sm:h-6 text-white" />
                    ) : (
                      <IoIosArrowDown className="w-5 sm:w-6 h-5 sm:h-6 text-white" />
                    )}
                  </div>
                </div>
                {openSection === "الموقع" && (
                  <div className="mt-2 sm:mt-4 text-[#101828] bg-white p-4 sm:p-6 rounded-lg">
                    <div className="flex items-center">
                      <MdLocationOn className="text-blue-600 text-2xl sm:text-3xl me-2 sm:me-3" />
                      <p className="text-sm sm:text-xl">
                        يقع الشاليه في منطقة مميزة، على بعد 5 دقائق من الشاطئ ومناطق الترفيه.
                      </p>
                    </div>
                  </div>
                )}

                {/* شروط الحجز */}
                <div className="p-4 rounded-lg shadow-md transition-all duration-300 bg-[#0061E0]">
                  <div
                    className="flex justify-between items-center cursor-pointer"
                    onClick={() => toggleSection("شروط الحجز")}
                  >
                    <h2 className="text-lg sm:text-2xl text-white">شروط الحجز وسياسة الإلغاء</h2>
                    {openSection === "شروط الحجز" ? (
                      <IoIosArrowBack className="w-5 sm:w-6 h-5 sm:h-6 text-white" />
                    ) : (
                      <IoIosArrowDown className="w-5 sm:w-6 h-5 sm:h-6 text-white" />
                    )}
                  </div>
                </div>
                {openSection === "شروط الحجز" && (
                  <div className="text-[#101828] bg-white p-4 sm:p-6 rounded-lg">
                    <div className="flex items-center mb-4">
                      <BsInfoCircle className="text-blue-600 text-2xl sm:text-3xl me-2 sm:me-3" />
                      <p className="text-sm sm:text-xl">
                        الحجز غير قابل للإلغاء بعد 48 ساعة من تأكيده. يجب إظهار بطاقة الهوية عند الوصول.
                      </p>
                    </div>
                    <div className="flex items-center">
                      <MdCancel className="text-blue-600 text-2xl sm:text-3xl me-2 sm:me-3" />
                      <p className="text-sm sm:text-xl">
                        يمكن الإلغاء مجاناً حتى 7 أيام قبل موعد الحجز. بعد ذلك، يتم خصم 50% من الرسوم.
                      </p>
                    </div>
                  </div>
                )}
                {(chalet.facebook || chalet.instagram || chalet.tiktok || chalet.whatsapp) && (

                  <div className="p-4 rounded-lg shadow-md transition-all duration-300 bg-[#0061E0]">
                    <div
                      className="flex justify-between items-center cursor-pointer"
                      onClick={() => toggleSection("وسائل التواصل")}
                    >
                      <h2 className="text-lg sm:text-2xl text-white">وسائل التواصل</h2>
                      {openSection === "وسائل التواصل" ? (
                        <IoIosArrowBack className="w-5 sm:w-6 h-5 sm:h-6 text-white" />
                      ) : (
                        <IoIosArrowDown className="w-5 sm:w-6 h-5 sm:h-6 text-white" />
                      )}
                    </div>
                  </div>
                )}
                {openSection === "وسائل التواصل" && (
                  <div className="mt-2 sm:mt-4 text-[#101828] bg-white p-4 sm:p-6 rounded-lg">
                    <div className="flex items-center">

                      {chalet.facebook && (
                        <a href={chalet.facebook} target="_blank" className="me-4">
                          <FaFacebook className="text-3xl text-blue-800" />
                        </a>
                      )}

                      {chalet.instagram && (
                        <a href={chalet.instagram} target="_blank" className="me-4">
                          <FaSquareInstagram className="text-3xl text-pink-600" />
                        </a>
                      )}
                      {chalet.whatsapp && (
                        <a href={chalet.whatsapp} target="_blank" className="me-4">
                          <FaSquareInstagram className="text-3xl text-pink-600" />
                        </a>
                      )}

                      {chalet.tiktok && (
                        <a href={chalet.tiktok} target="_blank" className="me-4">
                          <FaSquareInstagram className="text-3xl text-pink-600" />
                        </a>
                      )}

                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="w-full md:w-[50%] my-6 sm:my-10 px-2 sm:px-4">
              <img
                src={chalet.img}
                alt={chalet.title}
                className="w-full h-[500px] sm:h-[500px] object-cover rounded-lg"
              />
              <div
                dir="ltr"
                className="flex flex-wrap gap-1 mt-6"
              >
                {chalet.gallery.map((img, index) => (
                  <img
                    key={index}
                    src={img}
                    alt={`Gallery ${index + 1}`}
                    className="w-[32%] h-[150px] sm:h-[250px] object-cover rounded-lg"
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="my-6 sm:my-8 px-4 sm:px-8 ">
            <button
              onClick={handleBooking}
              className="bg-gradient-to-l from-[#48BB78] to-[#1A71FF] text-white py-2 sm:py-3 px-6 sm:px-8 rounded-lg text-sm sm:text-lg hover:from-[#38a169] hover:to-[#1a5de8]"
            >
              احجز الآن واستمتع بتجربة فريدة
            </button>
          </div>
        </div>
      )}
      {showLoginModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6">
            <h1 className="text-4xl font-bold text-[#1E293B] mb-4">مرحبًا بعودتك!</h1>
            <p className="text-2xl text-[#718096] mb-6">
              سجّل دخولك للوصول إلى حسابك واستمتع بخدماتنا.
            </p>
            <form className="space-y-4" onSubmit={(e) => {
              e.preventDefault();
              const email = e.target.email.value;
              const password = e.target.password.value;
              handleLogin(email, password);
            }}>
              <div className="p-[1px] bg-gradient-to-r from-[#1a72ffd3] via-[#1A71FFCC] to-[#48BB78] rounded-lg">
                <input
                  type="email"
                  name="email"
                  placeholder="بريد إلكتروني"
                  className="w-full p-3 bg-white rounded-lg text-right focus:outline-[#0061E0]"
                  required
                />
              </div>

              <div className="p-[1px] bg-gradient-to-r from-[#1a72ffd3] via-[#1A71FFCC] to-[#48BB78] rounded-lg">
                <input
                  type="password"
                  name="password"
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
              >
                تسجيل الدخول
              </button>
            </form>
            <p className="text-center text-sm mt-4">
              ليس لديك حساب؟{" "}
              <button onClick={() => {
                setShowLoginModal(false); // Close login modal
                setShowSignUpModal(true); // Open sign-up modal
              }} className="text-[#0061E0] font-semibold hover:underline">
                إنشاء حساب جديد
              </button>
            </p>
            <button onClick={() => setShowLoginModal(false)} className="mt-4 text-red-500">إغلاق</button>
          </div>
        </div>
      )}
      {showSignUpModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white rounded-lg p-4 w-3/4 sm:w-1/4"> {/* Reduced padding and width further */}
          <h1 className="text-3xl font-bold text-[#1E293B] mb-4">إنشاء حساب جديد</h1>
          <form className="space-y-4" onSubmit={handleSignUp}>
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
              className="w-full bg-gradient-to-l from-[#48BB78] to-[#1A71FF] text-white py-2 rounded-lg" // Reduced button padding
            >
              إنشاء حساب
            </button>
         
            </form>
            <p className="text-center text-sm mt-4">
              لديك حساب بالفعل؟{" "}
              <button onClick={() => {
                setShowSignUpModal(false); // Close sign-up modal
                setShowLoginModal(true); // Open login modal
              }} className="text-[#0061E0] font-semibold hover:underline">
                سجل الدخول الآن
              </button>
            </p>
            <button onClick={() => setShowSignUpModal(false)} className="mt-4 text-red-500">إغلاق</button>
          </div>
        </div>
      )}
    </>
  );
}