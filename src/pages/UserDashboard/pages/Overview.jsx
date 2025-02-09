import { useEffect, useState } from "react";
import axios from "axios";

export default function Overview() {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchBookings = async () => {
            const token = localStorage.getItem("token");

            try {
                const response = await axios.get(`${import.meta.env.VITE_URL_BACKEND}reservation/user`, {
                    headers: {
                        Authorization: token,
                    },
                });


                if (response.data.status === "success") {
                    setBookings(response.data.data);
                    console.log("response.data.data", response.data.data);

                } else {
                    setError("فشل في استرجاع البيانات.");
                }
            } catch (err) {
                console.error("Error fetching bookings:", err);
                setError("حدث خطأ أثناء استرجاع البيانات.");
            } finally {
                setLoading(false);
            }
        };

        fetchBookings();
    }, []);

    if (loading) {
        return <div>جاري تحميل البيانات...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="p-6 space-y-6">
            {/* الجدول */}
            <div className="bg-white p-4 rounded-lg shadow">
                <table className="w-full">
                    <thead>
                        <tr className="text-[#0061E0] p-2 text-xl">
                            <th>اسم الشاليه</th>
                            <th>المدينة</th>
                            <th>تاريخ الحجز</th>
                            <th>عدد المرات</th>
                            <th>حالة الحجز</th>
                            <th>تذكرة الدعم</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bookings.map((booking) => (
                            <tr key={booking._id}>
                                <td className="py-5 px-2 text-center text-lg">{booking.finalReservation.chaletID.name}</td>
                                <td className="py-5 px-2 text-center text-lg">
                                    {booking.finalReservation.chaletID.location.city || "غير محدد"}
                                </td>
                                <td className="py-5 px-2 text-center text-lg">{new Date(booking.finalReservation.checkInDate).toLocaleDateString()}</td>
                                <td className="py-5 px-2 text-center text-lg">{booking.numberOfReservations}</td>
                                <td className="py-5 px-2 text-center text-lg">
                                    <span className={`px-3 py-1 text-white ${booking.finalReservation.status === "pending" ? "bg-yellow-500" : "bg-green-500"} rounded-lg`}>
                                        {booking.finalReservation.status === "pending" ? "قيد الانتظار" : "مكتمل"}
                                    </span>
                                </td>
                                <td className="p-2 text-center">
                                    <button>
                                        {/* أيقونة الدعم */}
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none">
                                            <path d="M12 3H5C4.46957 3 3.96086 3.21071 3.58579 3.58579C3.21071 3.96086 3 4.46957 3 5V19C3 19.5304 3.21071 20.0391 3.58579 20.4142C3.96086 20.7893 4.46957 21 5 21H19C19.5304 21 20.0391 20.7893 20.4142 20.4142C20.7893 20.0391 21 19.5304 21 19V12" stroke="#0061E0" />
                                            <path d="M18.3751 2.62523C18.7729 2.2274 19.3125 2.00391 19.8751 2.00391C20.4377 2.00391 20.9773 2.2274 21.3751 2.62523C21.7729 3.02305 21.9964 3.56262 21.9964 4.12523C21.9964 4.68784 21.7729 5.2274 21.3751 5.62523L12.3621 14.6392C12.1246 14.8765 11.8313 15.0501 11.5091 15.1442L8.63609 15.9842C8.55005 16.0093 8.45883 16.0108 8.372 15.9886C8.28517 15.9663 8.20592 15.9212 8.14254 15.8578C8.07916 15.7944 8.03398 15.7151 8.01174 15.6283C7.98949 15.5415 7.991 15.4503 8.01609 15.3642L8.85609 12.4912C8.95062 12.1693 9.12463 11.8763 9.36209 11.6392L18.3751 2.62523Z" stroke="#0061E0" />
                                        </svg>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}