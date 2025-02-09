import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { HiOutlineLocationMarker } from "react-icons/hi";
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Splash from '../../components/Splash';

const ChaletSlider = () => {

    const [chalets, setChalets] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {


        const fetchChalet = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_URL_BACKEND}chalet/users`);
                console.log("بيانات المستخدم:", response.data);
                const chaletData = response.data.data;
                setChalets(chaletData);
            } catch (error) {
                console.error("خطأ في استرجاع بيانات المستخدم:", error);
            } finally {

                setLoading(false)
            }
        };

        fetchChalet();
    }, []);


    const nav = useNavigate()
    const GoToChalet = (id) => {
        nav(`/partners/${id}`)
    }


    return (
        <div className='mx-10'>
            {loading ? (<Splash />) : (
                <Swiper
                    spaceBetween={20}
                    slidesPerView={1}
                    breakpoints={{
                        500: {
                            slidesPerView: 2,
                        },
                        768: {
                            slidesPerView: 3,
                        },
                        1024: {
                            slidesPerView: 4,
                        },
                    }}
                >
                    {chalets.map((chalet) => (
                        <SwiperSlide key={chalet._id}>
                            <div className="bg-white shadow-md rounded-lg border border-blue-500">
                                <img
                                    src={chalet.img}
                                    alt={chalet.name}
                                    className="w-full h-64 object-cover rounded-t-lg"
                                />
                                <div className='p-3'>
                                    <h1 className=" text-2xl font-medium text-[#363A3D]">{chalet.name}</h1>
                                    <div className='flex items-center mt-3'>
                                        <HiOutlineLocationMarker className='me-2' />
                                        <p className='text-[#101828]'>{chalet.location.city}, {chalet.location.street}</p>
                                    </div>
                                    <div className='flex justify-between mx-1 mt-3 items-center'>
                                        <button onClick={() => { GoToChalet(chalet._id) }} className='bg-gradient-to-l from-[#48BB78] to-[#1A71FF] text-white px-6 lg:px-16 py-2 rounded-lg font-semibold  '>
                                            المزيد
                                        </button>
                                        <h1 className='text-[#0061E0] text-2xl font-bold'>{chalet.price}</h1>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            )}
        </div>
    );
};

export default ChaletSlider;
