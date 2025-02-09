
export default function ServiceSection() {
    const services = [
        {
            id: 1,
            description: "تقويم الحجوزات الذكي: عرض شامل للمواعيد المتاحة.",
            img: "/assets/images/Featured icon.png"
        },
        {
            id: 2,
            description: "مراجعات العملاء: شاهد تقيمات العملاء لتحسين تجربتك.",
            img: "/assets/images/Featured icon (1).png"
        },
        {
            id: 3,
            description: "إدارة الحجوزات بسهولة: تحكم كامل في جميع التفاصيل.",
            img: "/assets/images/Featured icon (2).png"
        },
        {
            id: 4,
            description: "رفع صور الشاليهات: أضف صوراً عالية الجودة لشاليهاتك بكل سهولة",
            img: "/assets/images/Featured icon (3).png"
        },


    ]
    return (
        <div className="my-10">
            <div className="flex flex-col items-center justify-center">
                <h1 className="text-[#101828] text-5xl">المزايا والخدمات</h1>
                <h3 className="text-[#4F5A69] text-2xl pt-4"> كل ما تحتاجه في مكان واحد!</h3>
            </div>
            <div className="flex flex-wrap gap-4 justify-center pt-5">
                {services.map(service => (
                    <div key={service.id} className="bg-blue-50 w-3/4 sm:w-1/2 md:w-1/3 lg:w-[20%] h-[250px] flex flex-col justify-center">
                        <div className="">
                            <img className="text-center mx-auto" src={service.img} alt="" />
                            <p className="text-center mt-6 px-3 text-[#101828]">{service.description}</p>
                        </div>
                    </div>
                ))}
            </div >
        </div>
    )
}
