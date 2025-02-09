import { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";

const AboutSection = () => {
    const [openSection, setOpenSection] = useState("about");

    const toggleSection = (section) => {
        setOpenSection(openSection === section ? null : section);
    };

    return (
        <section id="about" className="flex flex-col md:flex-row items-center justify-between p-6 md:p-12 bg-white rounded-lg shadow-lg">
            <div className="w-full md:w-1/2 space-y-6">
                {/*  about */}
                <div
                    
                    className={`p-6 md:py-12 rounded-lg shadow-md transition-all duration-300 ${openSection === "about"
                        ? "border-2 border-blue-500 bg-gradient-to-r from-blue-100 to-white"
                        : "bg-white"
                        }`}
                >
                    <div
                        className="flex justify-between items-center cursor-pointer"
                        onClick={() => toggleSection("about")}
                    >
                        <h2 className="text-2xl text-[#101828]">من نحن</h2>
                        <div className="w-8 h-8 flex items-center justify-center rounded-full bg-gradient-to-l from-[#48BB78] to-[#1A71FF] text-white">
                            {openSection === "about" ? (
                                <IoIosArrowBack className="w-6 h-6 text-white" />
                            ) : (
                                <IoIosArrowDown className="w-6 h-6 text-white" />
                            )}
                        </div>
                    </div>
                    {openSection === "about" && (
                        <div className="mt-4 text-gray-700">
                            <p>
                                نحن منصة مبتكرة تقدم حلولًا متكاملة لإدارة وحجز الشاليهات بمرونة
                                واحترافية. سواء كنت مالكًا تبحث عن تسويق شاليهك بفعالية أو
                                مستأجرًا ترغب في العثور على الخيار المثالي، فإننا نوفر لك تجربة
                                سلسة تعتمد على أحدث التقنيات لضمان راحتك ورفاهيتك.
                            </p>
                        </div>
                    )}
                </div>

                {/* goal*/}
                <div
                    className={`p-6 md:py-12 rounded-lg shadow-md transition-all duration-300 ${openSection === "goal"
                        ? "border-2 border-blue-500 bg-gradient-to-r from-blue-100 to-white"
                        : "bg-white"
                        }`}
                >
                    <div
                        className="flex justify-between items-center cursor-pointer"
                        onClick={() => toggleSection("goal")}
                    >
                        <h2 className="text-2xl text-[#101828]">هدفنا</h2>
                        <div className="w-8 h-8 flex items-center justify-center rounded-full bg-gradient-to-l from-[#48BB78] to-[#1A71FF] text-white">
                            {openSection === "goal" ? (
                                <IoIosArrowBack className="w-6 h-6 text-white" />
                            ) : (
                                <IoIosArrowDown className="w-6 h-6 text-white" />
                            )}
                        </div>
                    </div>
                    {openSection === "goal" && (
                        <div className="mt-4 text-gray-700">
                            <p>
                                هدفنا هو تقديم أفضل الحلول التقنية المبتكرة لضمان راحة عملائنا.
                            </p>
                        </div>
                    )}
                </div>

                {/* mission*/}
                <div
                    className={`p-6 md:py-12 rounded-lg shadow-md transition-all duration-300 ${openSection === "mission"
                        ? "border-2 border-blue-500 bg-gradient-to-r from-blue-100 to-white"
                        : "bg-white"
                        }`}
                >
                    <div
                        className="flex justify-between items-center cursor-pointer"
                        onClick={() => toggleSection("mission")}
                    >
                        <h2 className="text-2xl text-[#101828]">رسالتنا</h2>
                        <div className="w-8 h-8 flex items-center justify-center rounded-full bg-gradient-to-l from-[#48BB78] to-[#1A71FF] text-white">
                            {openSection === "mission" ? (
                                <IoIosArrowBack className="w-6 h-6 text-white" />
                            ) : (
                                <IoIosArrowDown className="w-6 h-6 text-white" />
                            )}
                        </div>
                    </div>
                    {openSection === "mission" && (
                        <div className="mt-4 text-gray-700">
                            <p>
                                رسالتنا هي تطوير تجربة المستخدم من خلال تقديم تقنيات حديثة
                                ومبتكرة.
                            </p>
                        </div>
                    )}
                </div>
            </div>

            {/* الجزء الخاص بالصورة */}
            <div className="w-full md:w-1/2 flex justify-center">
                <img
                    src="/assets/images/whoIm.png"
                    alt="Team Illustration"
                    className="w-3/4 md:w-full"
                />
            </div>
        </section>
    );
};

export default AboutSection;
