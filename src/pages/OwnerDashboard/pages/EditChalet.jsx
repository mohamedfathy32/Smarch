import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Splash from "../../../components/Splash";
import Swal from "sweetalert2";


export default function EditChalet() {
    const location = useLocation();
    const { id } = location.state || {};
    const [chalet, setChalet] = useState({
        name: '',
        title: '',
        location: {
            city: "",
            street: ""
        },
        description: '',
        rooms: "",
        price: "",
    });
    const token = localStorage.getItem('token');
    const [loading, setLoading] = useState(true);

    // جلب البيانات من API عند تحميل الصفحة
    useEffect(() => {
        const fetchChalet = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_URL_BACKEND}chalet/${id}`, {
                    headers: {
                        Authorization: token,
                    },
                });
                setChalet(response.data.data);
                setLoading(false);
            } catch (err) {
                console.log(err)
                setLoading(false);
            }
        };

        fetchChalet();
    }, [id]);

    // إرسال البيانات المعدلة
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(chalet);
        try {
            const response = await axios.patch(`${import.meta.env.VITE_URL_BACKEND}chalet/update/${id}`, chalet, {
                headers: {
                    Authorization: token,
                },
            });
            console.log('تم التعديل بنجاح', response.data);
            Swal.fire({
                title: `${response.data.message}`,
                icon: 'success',
                confirmButtonText: 'موافق',
            });
        } catch (err) {
            Swal.fire({
                title: `${err.response.data.message}`,
                icon: 'error',
                confirmButtonText: 'موافق',
            });
            console.log(err)
        }
    };

    if (loading) return <Splash />;

    return (
        <div className="flex flex-col md:flex-row justify-between mb-10 py-10  items-center rounded-lg shadow-lg overflow-hidden w-full">

            <div className="w-full md:w-1/3 ps-10">
                <h1 className="text-4xl font-bold text-[#1E293B] mb-4"
                >
                    تعديل بيانات الشاليه
                </h1>
                <p className="text-2xl text-[#718096] mb-6">
                    قم بتعديل بيانات الشاليه وابدأ في استقبال الحجوزات الآن.
                </p>
                <form onSubmit={handleSubmit} className="space-y-4" >
                    <div>
                        <label className="block text-black text-xl mb-2" htmlFor="name">اسم الشاليه:</label>
                        <input
                            type="text"
                            id="name"
                            value={chalet.name}
                            className="w-full p-2 bg-transparent border border-black rounded-lg focus:outline-[#124FB3]"
                            onChange={(e) => setChalet({ ...chalet, name: e.target.value })}
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-black text-xl mb-2" htmlFor="title"> وصف مختصر:</label>
                        <input
                            type="text"
                            id="title"
                            value={chalet.title}
                            className="w-full p-2 bg-transparent border border-black rounded-lg focus:outline-[#124FB3]"
                            onChange={(e) => setChalet({ ...chalet, title: e.target.value })}
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-black text-xl mb-2" htmlFor="city">المدينة:</label>
                        <input
                            type="text"
                            id="city"
                            value={chalet.location.city}
                            className="w-full p-2 bg-transparent border border-black rounded-lg focus:outline-[#124FB3]"
                            onChange={(e) => setChalet({
                                ...chalet,
                                location: {
                                    ...chalet.location,
                                    city: e.target.value
                                }
                            })}
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-black text-xl mb-2" htmlFor="street">الشارع:</label>
                        <input
                            type="text"
                            id="street"
                            value={chalet.location.street}
                            className="w-full p-2 bg-transparent border border-black rounded-lg focus:outline-[#124FB3]"
                            onChange={(e) => setChalet({
                                ...chalet,
                                location: {
                                    ...chalet.location,
                                    street: e.target.value
                                }
                            })}
                            required
                        />
                    </div>


                    <div>
                        <label className="block text-black text-xl mb-2" htmlFor="description">الوصف:</label>
                        <textarea
                            id="description"
                            value={chalet.description}
                            className="w-full p-2 bg-transparent border border-black rounded-lg focus:outline-[#124FB3]"
                            onChange={(e) => setChalet({ ...chalet, description: e.target.value })}
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-black text-xl mb-2" htmlFor="price">السعر:</label>
                        <input
                            type="number"
                            id="price"
                            value={chalet.price}
                            className="w-full p-2 bg-transparent border border-black rounded-lg focus:outline-[#124FB3]"
                            onChange={(e) => setChalet({ ...chalet, price: e.target.value })}
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-black text-xl mb-2" htmlFor="rooms">عدد الغرف:</label>
                        <input
                            type="number"
                            id="rooms"
                            value={chalet.rooms}
                            className="w-full p-2 bg-transparent border border-black rounded-lg focus:outline-[#124FB3]"
                            onChange={(e) => setChalet({ ...chalet, rooms: e.target.value })}
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-black text-xl mb-2" > صورة الشاليه الرئيسية </label>
                        <img src={chalet.img} alt="" className="h-80" />
                    </div>
                    <div>
                        <label className="block text-black text-xl mb-2" > صورة  المعرض </label>
                        <div className="flex gap-3">

                            {chalet.gallery.map((img, idx) => (
                                <img src={img} alt={`gallery-img-${idx}`} className="h-40 w-40 object-cover" key={idx} />
                            ))}
                        </div>

                    </div>
                    <button
                        type="submit"
                        className="w-full bg-gradient-to-l from-[#48BB78] to-[#1A71FF] text-white py-3 rounded-lg"
                    >
                        حفظ التعديلات
                    </button>
                </form>
            </div>
        </div>
    );
};

