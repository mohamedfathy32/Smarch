import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { IoIosMenu } from "react-icons/io";
import logo from "/assets/images/logo.png"
import { jwtDecode } from 'jwt-decode';
export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const nav = useNavigate();
  const token = localStorage.getItem("token");

  var username;
  var role;
  if (token) {
    const decoded = jwtDecode(token);

    username = decoded.username;
    role = decoded.role;
    console.log(`مرحبًا ${username}`);
    console.log(decoded);
  }
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const SiginUpButtonClick = () => {
    nav('/login');
  };
  const GoToHome = () => {
    nav('/');
  };
  const SiginOutButtonClick = () => {
    localStorage.removeItem("token");
    nav('/');
  }
  const GotoDashboard = () => {
    role == 'user' ? nav('/userdashboard') : nav('/ownerdashboard');
  }
  return (
    <header className="h-[108px] w-full bg-white flex items-center justify-between px-2 md:px-6 shadow-md">
      <div className="hidden md:flex items-center">
        <img src={logo} alt="Logo"
          className="h-[40px] w-auto"
          onClick={GoToHome}
        />
      </div>

      <nav className="hidden md:flex items-center ">
        <Link to="/" className="text-[#101828] text-lg ml-8 font-bold">الرئيسية</Link>
        <Link to="/partners" className="text-[#101828] text-lg ml-8">شركاء النجاح</Link>
        <Link to="/contactus" className="text-[#101828] text-lg ml-8">تواصل معنا</Link>
        <Link to="/blog" className="text-[#101828] text-lg">المدونة</Link>
      </nav>

      <div className="hidden md:flex items-center">
        {token ? <h1 onClick={GotoDashboard} className=' text-xl cursor-pointer hover:text-blue-600'> مرحبا {username} </h1> :

          <button onClick={SiginUpButtonClick} className="bg-gradient-to-l from-[#48BB78] to-[#1A71FF] text-white px-6 py-2 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300">
            تسجيل الدخول
          </button>
        }
      </div>

      {/* Mobile Header */}
      <div className="md:hidden flex justify-between w-full">
        {/* Hamburger Icon (positioned to the right) */}
        <div className="w-[20%]">
          <IoIosMenu
            onClick={toggleMenu}
            className="text-[#101828] text-3xl"
          />
        </div>

        {/* Logo in the Center for Mobile */}
        <img src={logo} alt="Logo"
          className="h-[40px] w-auto mx-auto"
          onClick={GoToHome}
        />

        {/* Mobile Login Button */}
        {token ? <h1 className='md:text-xl'> مرحبا {username} </h1> :
          <button onClick={SiginUpButtonClick} className="bg-gradient-to-l from-[#48BB78] to-[#1A71FF] text-white px-4 py-1 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 text-sm">
            تسجيل الدخول
          </button>
        }
      </div>

      {/* Mobile Menu Drawer */}
      <div
        className={`fixed inset-0 bg-[#00000080] z-20 transition-all duration-300 ${isMenuOpen ? "block" : "hidden"}`}
        onClick={toggleMenu}
      >
        <div className={`fixed right-0 top-0 bg-white w-[250px] h-full p-6 transform ${isMenuOpen ? "translate-x-0" : "translate-x-full"} transition-all duration-300`}>
          <div className='flex flex-col justify-between h-screen py-10'>
            <nav className="flex flex-col space-y-6">

              <Link to="/" className="text-[#101828] text-xl font-semibold">الرئيسية</Link>
              <Link to="/partners" className="text-[#101828] text-lg">شركاء النجاح</Link>
              <Link to="/contactus" className="text-[#101828] text-lg">تواصل معنا</Link>
              <Link to="/blog" className="text-[#101828] text-lg">المدونة</Link>
            </nav>
            {token ?

              <button onClick={SiginOutButtonClick} className="bg-gradient-to-l from-[#48BB78] to-[#1A71FF] text-white py-2 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 text-sm">
                تسجيل الخروج
              </button>
              :

              <button onClick={SiginUpButtonClick} className="bg-gradient-to-l from-[#48BB78] to-[#1A71FF] text-white px-6 py-2 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300">
                تسجيل الدخول
              </button>
            }
          </div>
        </div>
      </div>
    </header >
  );
}
