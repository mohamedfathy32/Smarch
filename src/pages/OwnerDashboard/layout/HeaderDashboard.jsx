import { useEffect, useState } from 'react';
import { IoIosMenu } from "react-icons/io";
import SidebarDashboard from './SidebarDashboard';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';

export default function HeaderDashboard() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const nav = useNavigate();

    const [userName, setName] = useState("");

    const token = localStorage.getItem("token");
    // console.log("token", token);

    useEffect(() => {
        if (token) {
            // console.log("decodedToken");
            const decoded = jwtDecode(token);
            const id = decoded.id;

            // console.log("userID من الـ token:", id);

            const fetchUserData = async () => {
                try {
                    const response = await axios.get(`${import.meta.env.VITE_URL_BACKEND}user/${id}`, {

                    });
                    // console.log("بيانات المستخدم:", response.data);
                    const userData = response.data.data;

                    setName(userData.userName);


                } catch (error) {
                    console.error("خطأ في استرجاع بيانات المستخدم:", error);
                }
            };

            fetchUserData();
        }
    }, [token]);






    const toggleMenu = () => {

        setIsMenuOpen(!isMenuOpen);
    };


    return (
        <header className="bg-blue-50 shadow px-6 py-4 flex justify-between items-center">
            {/* Hamburger Icon only visible on small screens */}
            <div className='md:hidden'>
                {/* Hamburger Icon (positioned to the right) */}
                <IoIosMenu
                    onClick={toggleMenu}
                    className="text-4xl md:text-3xl transition-transform duration-300"
                />

            </div>
            <div className="flex items-center gap-4">
                <img
                    src="/assets/images/logo.png"
                    alt="Logo"
                    className="w-24"
                    onClick={() => { nav('/') }}
                />
            </div>

            {/* Show search input only on larger screens */}
            <input
                type="text"
                placeholder="بحث"
                className="hidden md:block w-[50%] border rounded-lg border-blue-300 px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <div className="flex items-center gap-2">
                <span className="hidden md:block">{userName}</span>
                <img
                    src="/assets/images/copy1.JPG"
                    alt="Profile"
                    className="rounded-full w-10 h-10 "
                />
            </div>

            {/* Sidebar (Aside) */}
            <div
                className={`fixed inset-0 bg-[#00000080] z-20 transition-opacity duration-300 ${isMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
                onClick={toggleMenu}
            >
                <SidebarDashboard isOpen={isMenuOpen} />
            </div>
        </header>
    );
}