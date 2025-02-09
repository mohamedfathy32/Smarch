import { useState } from "react";
import { FaCheckSquare } from "react-icons/fa";

export default function NotificationPage() {
  const [selectedIndex, setSelectedIndex] = useState(null); // Track selected button index
  const [currentDate, setCurrentDate] = useState(""); // Track the current date
  const [currentTime, setCurrentTime] = useState(""); // Track the current time

  // Update date and time on button click
  const handleButtonClick = (index) => {
    setSelectedIndex(index === selectedIndex ? null : index);

    // Get current date and time
    const now = new Date();
    const date = now.toLocaleDateString("ar-EG", { year: "numeric", month: "long", day: "numeric" });
    const time = now.toLocaleTimeString("ar-EG", { hour: "numeric", minute: "numeric", hour12: true });

    setCurrentDate(date);
    setCurrentTime(time);
  };

  const buttons = ["اشعارات جديدة", "اشعارات مقروءة", "اشعارات ذات اهمية عالية"];

  return (
    <>
      <div className="flex flex-row gap-12 justify-center">
        {buttons.map((label, index) => (
          <div
            key={index}
            className={`${
              selectedIndex === index ? "bg-blue-500" : "bg-gray-700"
            } border rounded-lg w-[13vw] h-[6vh] text-center`}
          >
            <button
              className="font-normal text-white"
              style={{ fontSize: 18 }}
              onClick={() => handleButtonClick(index)}
            >
              {label}
            </button>
          </div>
        ))}
      </div>

      {/* Confirmation Section */}
      {selectedIndex !== null && (
        <div className="bg-blue-100 border rounded-xl h-[22vh]  w-[50vw] " style={{ marginTop: 80,marginRight:35 }}>
          <div className="flex flex-row">
            <FaCheckSquare className="text-green-400 pt-4" style={{ fontSize: 60 }} />
            <h2 className="font-normal pt-4 pr-1" style={{ fontSize: 24 }}>تم تأكيد الحجز بنجاح</h2>
            <div className="font-normal" style={{ fontSize: 18, paddingRight: 450 }}>
              <h3>{currentDate}</h3>
              <h3>{currentTime}</h3>
            </div>
          </div>
          <h3 className="font-normal pt-3 pr-4" style={{ fontSize: 22 }}>
            تم تأكيد حجز الشاليه رقم 101 للفترة من 1 إلى 5 يناير
          </h3>
        </div>
      )}
    </>
  );
}
