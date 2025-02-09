export default function ContactUs() {
    return (
        <div className="flex flex-col md:flex-row justify-between py-10 md:py-20 items-center rounded-lg shadow-lg overflow-hidden w-full px-2 md:px-8">
            {/* form section */}
            <div className="w-full lg:w-[43%] md:w-[50%] p-8">
                <h1 className="text-4xl font-bold text-[#1E293B] mb-4">
                    تواصل معنا
                </h1>
                <p className="text-lg text-[#1E293B] mb-6 leading-relaxed">
                    نحن هنا للإجابة على استفساراتك وتلقي ملاحظاتك. لا تتردد في التواصل معنا من خلال الطرق المتاحة أدناه
                </p>
                <form className="space-y-6">
                    {/* Name Input */}
                    <div className="p-[1px] border border-blue-400 rounded-lg">
                        <input
                            type="text"
                            placeholder="الإسم بالكامل"
                            className="w-full p-3  rounded-lg text-right focus:outline-none"
                        />
                    </div>

                    {/* Phone Input */}
                    <div className="p-[1px] border border-blue-400 rounded-lg">
                        <input
                            type="tel"
                            placeholder="رقم الهاتف"
                            className="w-full p-3 rounded-lg text-right focus:outline-none"
                        />
                    </div>

                    {/* Message Input */}
                    <div className="p-[1px] border border-blue-400 rounded-lg">
                        <textarea
                            placeholder="الرسالة"
                            rows="4"
                            className="w-full p-3  rounded-lg text-right focus:outline-none"
                        />
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full bg-gradient-to-l from-[#48BB78] to-[#1A71FF] text-white py-3 rounded-lg font-bold"
                    >
                        إرسال الرسالة
                    </button>
                </form>
            </div>

            {/* image section */}
            <div className="hidden md:block w-full md:w-[40%]">
                <img
                    src="/assets/images/contactus.png"
                    alt="Customer Support"
                    className="w-full h-full object-contain"
                />
            </div>
        </div>
    );
}
