import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Splash from "../../../components/Splash";

export default function ChaletManagement() {
    const nav = useNavigate();

    const [chalets, setChalets] = useState([]);
    const [loading, setLoading] = useState(true);
    const fetchPackages = async () => {
        const token = localStorage.getItem("token");
        try {
            const response = await axios.get(`${import.meta.env.VITE_URL_BACKEND}chalet/owner`, {
                headers: {
                    Authorization: token
                }
            });
            if (response.data.status === "success") {
                setChalets(response.data.data);
            }
        } catch (error) {
            console.error("Error fetching packages:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPackages();
    }, []);


    const GoToChalet = (id) => {
        nav(`/partners/${id}`)
    }

    const editChlet = (id) => {
        nav('/ownerdashboard/editChlet', { state: { id } })
    }


    if (loading) return <Splash />


    return (
        <div className="flex flex-col items-center gap-6">
            {/* عرض الشاليهات */}
            {console.log(chalets)}
            <div className="flex flex-wrap justify-center gap-4">
                {chalets.map((chalet) => (
                    <div
                        key={chalet._id}
                        className="w-96 border rounded-lg shadow-lg overflow-hidden"
                    >

                        <img
                            src={chalet.img}
                            alt={chalet.name}
                            className="w-full h-48 object-cover"
                        />

                        <div className="p-4 text-right">
                            <h2 className="text-xl font-bold mb-2 flex items-center gap-1">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="22" viewBox="0 0 24 22" fill="none">
                                    <path d="M4 17.4168V9.16683C4 8.87655 4.071 8.60155 4.213 8.34183C4.355 8.08211 4.55067 7.86822 4.8 7.70016L10.8 3.57516C11.15 3.33072 11.55 3.2085 12 3.2085C12.45 3.2085 12.85 3.33072 13.2 3.57516L19.2 7.70016C19.45 7.86822 19.646 8.08211 19.788 8.34183C19.93 8.60155 20.0007 8.87655 20 9.16683V17.4168C20 17.921 19.804 18.3527 19.412 18.7121C19.02 19.0714 18.5493 19.2508 18 19.2502H15C14.7167 19.2502 14.4793 19.1622 14.288 18.9862C14.0967 18.8102 14.0007 18.5926 14 18.3335V13.7502C14 13.4904 13.904 13.2729 13.712 13.0975C13.52 12.9221 13.2827 12.8341 13 12.8335H11C10.7167 12.8335 10.4793 12.9215 10.288 13.0975C10.0967 13.2735 10.0007 13.4911 10 13.7502V18.3335C10 18.5932 9.904 18.8111 9.712 18.9871C9.52 19.1631 9.28267 19.2508 9 19.2502H6C5.45 19.2502 4.97933 19.0708 4.588 18.7121C4.19667 18.3534 4.00067 17.9216 4 17.4168Z" fill="#0061E0" />
                                </svg>
                                {chalet.name}
                            </h2>
                            <p className="text-gray-600 flex items-center gap-1">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                    <path d="M12 2C14.3869 2 16.6761 2.94821 18.364 4.63604C20.0518 6.32387 21 8.61305 21 11C21 14.074 19.324 16.59 17.558 18.395C16.6757 19.2871 15.7129 20.0958 14.682 20.811L14.256 21.101L14.056 21.234L13.679 21.474L13.343 21.679L12.927 21.921C12.6446 22.0822 12.3251 22.1669 12 22.1669C11.6749 22.1669 11.3554 22.0822 11.073 21.921L10.657 21.679L10.137 21.359L9.945 21.234L9.535 20.961C8.42283 20.2085 7.3869 19.3491 6.442 18.395C4.676 16.589 3 14.074 3 11C3 8.61305 3.94821 6.32387 5.63604 4.63604C7.32387 2.94821 9.61305 2 12 2ZM12 8C11.606 8 11.2159 8.0776 10.8519 8.22836C10.488 8.37913 10.1573 8.6001 9.87868 8.87868C9.6001 9.15726 9.37913 9.48797 9.22836 9.85195C9.0776 10.2159 9 10.606 9 11C9 11.394 9.0776 11.7841 9.22836 12.1481C9.37913 12.512 9.6001 12.8427 9.87868 13.1213C10.1573 13.3999 10.488 13.6209 10.8519 13.7716C11.2159 13.9224 11.606 14 12 14C12.7956 14 13.5587 13.6839 14.1213 13.1213C14.6839 12.5587 15 11.7956 15 11C15 10.2044 14.6839 9.44129 14.1213 8.87868C13.5587 8.31607 12.7956 8 12 8Z" fill="#0061E0" />
                                </svg>
                                {chalet.location.city}
                            </p>
                            <p className="text-gray-600 flex items-center gap-1">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                    <path d="M9 18H4V10H9V18ZM15 18H10V6H15V18ZM21 18H16V2H21V18ZM22 22H3V20H22V22Z" fill="#0061E0" />
                                </svg>
                                عدد الحجوزات: {chalet.numOfReservation}
                            </p>
                            <p className="flex items-center gap-1 mt-2">
                                {chalet.status == 'active' ? (
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                        <g clipPath="url(#clip0_231_3480)">
                                            <path
                                                fillRule="evenodd"
                                                clipRule="evenodd"
                                                d="M24 12C24 15.1826 22.7357 18.2348 20.4853 20.4853C18.2348 22.7357 15.1826 24 12 24C8.8174 24 5.76515 22.7357 3.51472 20.4853C1.26428 18.2348 0 15.1826 0 12C0 8.8174 1.26428 5.76515 3.51472 3.51472C5.76515 1.26428 8.8174 0 12 0C15.1826 0 18.2348 1.26428 20.4853 3.51472C22.7357 5.76515 24 8.8174 24 12ZM10 6C10 5.46957 10.2107 4.96086 10.5858 4.58579C10.9609 4.21071 11.4696 4 12 4C12.5304 4 13.0391 4.21071 13.4142 4.58579C13.7893 4.96086 14 5.46957 14 6V12C14 12.5304 13.7893 13.0391 13.4142 13.4142C13.0391 13.7893 12.5304 14 12 14C11.4696 14 10.9609 13.7893 10.5858 13.4142C10.2107 13.0391 10 12.5304 10 12V6ZM12 16C11.4696 16 10.9609 16.2107 10.5858 16.5858C10.2107 16.9609 10 17.4696 10 18C10 18.5304 10.2107 19.0391 10.5858 19.4142C10.9609 19.7893 11.4696 20 12 20C12.5304 20 13.0391 19.7893 13.4142 19.4142C13.7893 19.0391 14 18.5304 14 18C14 17.4696 13.7893 16.9609 13.4142 16.5858C13.0391 16.2107 12.5304 16 12 16Z"
                                                fill="#48BB78"
                                            />
                                        </g>
                                        <defs>
                                            <clipPath id="clip0_231_3480">
                                                <rect width="24" height="24" fill="white" />
                                            </clipPath>
                                        </defs>
                                    </svg>
                                ) : (
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                        <g clipPath="url(#clip0_231_3501)">
                                            <path
                                                fillRule="evenodd"
                                                clipRule="evenodd"
                                                d="M24 12C24 15.1826 22.7357 18.2348 20.4853 20.4853C18.2348 22.7357 15.1826 24 12 24C8.8174 24 5.76515 22.7357 3.51472 20.4853C1.26428 18.2348 0 15.1826 0 12C0 8.8174 1.26428 5.76515 3.51472 3.51472C5.76515 1.26428 8.8174 0 12 0C15.1826 0 18.2348 1.26428 20.4853 3.51472C22.7357 5.76515 24 8.8174 24 12ZM10 6C10 5.46957 10.2107 4.96086 10.5858 4.58579C10.9609 4.21071 11.4696 4 12 4C12.5304 4 13.0391 4.21071 13.4142 4.58579C13.7893 4.96086 14 5.46957 14 6V12C14 12.5304 13.7893 13.0391 13.4142 13.4142C13.0391 13.7893 12.5304 14 12 14C11.4696 14 10.9609 13.7893 10.5858 13.4142C10.2107 13.0391 10 12.5304 10 12V6ZM12 16C11.4696 16 10.9609 16.2107 10.5858 16.5858C10.2107 16.9609 10 17.4696 10 18C10 18.5304 10.2107 19.0391 10.5858 19.4142C10.9609 19.7893 11.4696 20 12 20C12.5304 20 13.0391 19.7893 13.4142 19.4142C13.7893 19.0391 14 18.5304 14 18C14 17.4696 13.7893 16.9609 13.4142 16.5858C13.0391 16.2107 12.5304 16 12 16Z"
                                                fill="#FF0000"
                                            />
                                        </g>
                                        <defs>
                                            <clipPath id="clip0_231_3501">
                                                <rect width="24" height="24" fill="white" />
                                            </clipPath>
                                        </defs>
                                    </svg>
                                )}  
                                {chalet.status == 'active' ? "نشط" : "غير نشط"}
                            </p>

                            <div className="flex gap-2 mt-4">
                                <button
                                    onClick={() => { GoToChalet(chalet._id) }}
                                    className="flex-1 bg-gray-500 text-white py-2 rounded-lg"
                                >
                                    عرض الصفحة
                                </button>
                                <button
                                    onClick={() => { editChlet(chalet._id) }}
                                    className="flex-1 bg-blue-500 text-white py-2 rounded-lg"
                                >
                                    تعديل
                                </button>
                                <button
                                    className="flex-1 bg-red-500 text-white py-2 rounded-lg"
                                >
                                    حذف
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            {/* زر إضافة شاليه جديد */}
            <button
                className="w-72 flex flex-col items-center gap-2 bg-blue-50 text-blue-500 text-xl font-bold py-4 px-6 rounded-lg shadow-lg"
                onClick={() => nav('/ownerdashboard/subscription')}
            >

                <svg xmlns="http://www.w3.org/2000/svg" width="151" height="150" viewBox="0 0 151 150" fill="none">
                    <path d="M119.25 81.2373H81.75V118.737H69.25V81.2373H31.75V68.7373H69.25V31.2373H81.75V68.7373H119.25V81.2373Z" fill="#0061E0" />
                </svg>

                إضافة شاليه جديد

            </button>
        </div>
    )
}