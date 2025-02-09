import { IoIosPeople } from "react-icons/io";
import { MdOutlineHome } from "react-icons/md";
import { SlCalender } from "react-icons/sl";
import { TbStars } from "react-icons/tb";

export default function QuickStats() {
    const statsData = [
        { icon: MdOutlineHome, value: "+100", label: "شاليه" },
        { icon: SlCalender, value: "+300", label: "تقيم" },
        { icon: IoIosPeople, value: "+1500", label: "عميل" },
        { icon: TbStars, value: "+2000", label: "حجز" },
    ];
    return (
        <div className="mx-auto lg:w-[80%] w-[90%] bg-blue-50 py-4 rounded-3xl">
            <div className="flex justify-evenly items-center flex-wrap md:flex-nowrap">
                {statsData.map(({ icon: Icon, value, label }) => (
                    <div key={label} className="flex flex-col items-center w-[22%] md:w-auto">
                        <Icon className="mb-2 text-[#0061E0] text-3xl md:text-6xl" />
                        <h1 className="mb-2 text-[#0D263B] text-lg md:text-3xl font-bold">{value}</h1>
                        <p className="mb-2 text-[#0061E0] text-sm md:text-3xl">{label}</p>
                    </div>
                ))}
            </div>
        </div>

    )
}
