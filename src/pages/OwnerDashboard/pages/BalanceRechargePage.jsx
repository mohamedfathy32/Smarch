import { useEffect, useState } from "react";
// import { Plans } from "../../../api/data";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import Splash from "../../../components/Splash";
import Swal from "sweetalert2";

export default function BalanceRechargePage() {
    const [packages, setPackage] = useState(null);
    // const plans = Plans;
    const token = localStorage.getItem("token");

    useEffect(() => {

        console.log("decodedToken");
        const decoded = jwtDecode(token);
        const id = decoded.id;

        console.log("userID من الـ token:", id);

        const fetchUserData = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_URL_BACKEND}package`,{
                    headers: {
                        Authorization: token,
                    },
                });
                setPackage(response.data.data);
            } catch (error) {
                console.error("خطأ في استرجاع بيانات المستخدم:", error);
            }
        };

        fetchUserData();

    }, [token]);

    const subscribePackage = async (id) => {

        Swal.fire({
            title: "هل أنت متأكد؟",
            text: "سيتم الاشتراك في هذه الباقة. لا يمكن التراجع عن العملية.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "نعم، اشتراك",
            cancelButtonText: "إلغاء",
            reverseButtons: true,
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const response = await axios.post(
                        `${import.meta.env.VITE_URL_BACKEND}subscription`,
                        {
                            packageId: id,
                        },
                        {
                            headers: {
                                Authorization: token,
                            },
                        }
                    );
                    console.log(response);

                    // عرض رسالة النجاح
                    Swal.fire({
                        title: "تم الاشتراك بنجاح!",
                        text: "تم الاشتراك في الباقة بنجاح. يمكنك الآن الاستفادة من مزاياها.",
                        icon: "success",
                        confirmButtonText: "حسنًا",
                    });
                } catch (error) {
                    console.error("خطأ أثناء الاشتراك في الباقة:", error);

                    Swal.fire({
                        title: "حدث خطأ!",
                        text: "تعذر الاشتراك في الباقة. يرجى المحاولة لاحقًا.",
                        icon: "error",
                        confirmButtonText: "حسنًا",
                    });
                }
            }
        });
    };

    if (!packages) {
        return <Splash />;
    }
    return (
        <div className="flex flex-col md:flex-row justify-center items-center gap-6 p-6">
            {console.log(packages)}
            {
                packages.map((plan) => (
                    <div
                        key={plan._id}
                        className="border border-gray-300 rounded-lg shadow-md p-6 text-center w-[90%] md:w-[25%]"
                    >
                        <h3 className="text-3xl font-bold text-blue-700 mb-4">{plan.name}</h3>
                        <p className="text-2xl text-start font-semibold mb-4">{plan.price == 0 ? 'مجانيه' : `${plan.price} ريال / شهر  `}</p>
                        <ul className="text-sm text-gray-700 mb-6 space-y-2 min-h-40">
                            {plan.features.map((features, idx) => (
                                <li key={idx} className="flex items-center gap-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                        <path opacity="0.1" d="M10 0C4.47715 0 0 4.47715 0 10C0 15.5228 4.47715 20 10 20C15.5228 20 20 15.5228 20 10C19.9936 4.47982 15.5202 0.00642897 10 0Z" fill="#0061E0" />
                                        <path d="M15.7725 6.83313L10.0684 14.574C9.93234 14.7545 9.72948 14.8727 9.50539 14.9022C9.2813 14.9316 9.05478 14.8698 8.87671 14.7306L4.80338 11.474C4.44393 11.1863 4.38573 10.6617 4.67338 10.3023C4.96102 9.94285 5.4856 9.88465 5.84504 10.1723L9.24171 12.8898L14.4309 5.8473C14.601 5.59195 14.8978 5.45078 15.2032 5.47983C15.5087 5.50887 15.7735 5.70344 15.8925 5.98627C16.0115 6.26911 15.9654 6.59445 15.7725 6.83313Z" fill="#0061E0" />
                                    </svg>
                                    {features}
                                </li>
                            ))}
                        </ul>
                        <button
                            className="bg-blue-600 text-white py-2 px-8 rounded-lg hover:bg-blue-700 transition"
                            onClick={() => { subscribePackage(plan._id) }}
                        >
                            اختيار
                        </button>
                    </div>
                ))
            }
        </div>
    );
};