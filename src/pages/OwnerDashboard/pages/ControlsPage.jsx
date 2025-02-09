import { useEffect, useState } from 'react';
import axios from 'axios';
import Splash from "../../../components/Splash";
import { useNavigate } from 'react-router-dom';
export default function ControlsPage() {
    const [packages, setPackages] = useState([]);
    const [loading, setLoading] = useState(true);
    const nav = useNavigate()
    const fetchPackages = async () => {
        const token = localStorage.getItem("token");
        try {
            const response = await axios.get(`${import.meta.env.VITE_URL_BACKEND}chalet/owner`, {
                headers: {
                    Authorization: token
                }
            });
            if (response.data.status === "success") {
                setPackages(response.data.data);
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

    const navToAddPackage = () => {
        nav('BalanceRecharge')
    };

    const navToSingleMang = (chaletId) => {
        nav('SingleChaletManagement', { state: { chaletId } })
    }

    if (loading) return <Splash />;

    return (
        <div className="px-4">
            <div className="flex mb-4">
                <button
                    onClick={navToAddPackage}
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
                >
                    اضافة باقة +
                </button>
            </div>
            <div className="space-y-4">
                {packages.map((pkg, index) => (
                    <div
                        key={pkg._id}
                        className="flex flex-col md:flex-row bg-blue-100 p-4 rounded-lg shadow-md items-center md:justify-between"
                    >
                        {/* رقم الباقة */}
                        <div className="text-center md:w-1/6">
                            <p className="text-gray-800 pb-5">رقم الباقة</p>
                            <p className="font-bold text-blue-600">{index + 1}</p>
                        </div>

                        {/* اسم الباقة */}
                        <div className="text-center md:w-1/6">
                            <p className="text-gray-800 pb-5">اسم الباقة</p>
                            <p className="font-bold text-blue-600">{pkg.name}</p>
                        </div>

                        {/* اسم الشاليه */}
                        <div className="text-center md:w-1/6">
                            <p className="text-gray-800 pb-5">اسم الشاليه</p>
                            <p className="font-bold text-blue-600">{pkg.title}</p>
                        </div>

                        {/* تاريخ البداية */}
                        <div className="text-center md:w-1/6">
                            <p className="text-gray-800 pb-5">تاريخ البداية</p>
                            <p className="font-bold text-blue-600">{new Date(pkg.subscriptionID.startDate).toLocaleDateString()}</p>
                        </div>

                        {/* تاريخ الانتهاء */}
                        <div className="text-center md:w-1/6">
                            <p className="text-gray-800 pb-5">تاريخ الانتهاء</p>
                            <p className="font-bold text-blue-600">{new Date(pkg.subscriptionID.endDate).toLocaleDateString()}</p>
                        </div>

                        {/* زر الإدارة والتحكم */}
                        <div className="text-center md:w-1/6">
                            <button
                                onClick={() => navToSingleMang(pkg._id)}
                                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                            >
                                الإدارة والتحكم
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}