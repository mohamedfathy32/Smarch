import { useNavigate } from "react-router-dom";
import ChaletSlider from "./ChaletSlider";

export default function ChaletSection() {
    const nav = useNavigate()
    return (
        <>
            <div className="flex justify-between  mx-2 md:mx-10">
                <div className="w-[70%] md:w-auto">
                    <h1 className="font-bold md:text-4xl text-[#101828] text-2xl mb-3">
                        اكتشف افضل الشاليهات
                    </h1>
                    <h3 className="md:text-2xl text-[#101828] mb-4">
                        تصفّح أفضل الشاليهات المختارة خصيصًا لك بأفضل الأسعار
                    </h3>
                </div>
                <div className="w-[30%] md:w-auto">
                    <button onClick={() => { nav('/partners') }} className="border border-blue-500 rounded-md px-2 md:px-5 py-2">
                        عرض الكل
                    </button>
                </div>
            </div>
            <ChaletSlider />
        </>
    )
}
