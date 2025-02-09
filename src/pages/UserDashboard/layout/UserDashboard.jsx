import { useState } from "react";
import ContentDashbiard from "../ContentDashbiard";
import HeaderDashboard from "./HeaderDashboard";
import SidebarDashboard from "./SidebarDashboard";

export default function OwnerDashboard() {
    const [selectedPage, setSelectedPage] = useState("");

    return (


        <div className="h-screen flex flex-col">
            {/* الهيدر */}
            <HeaderDashboard  />
            <div className="flex flex-1">
                {/* الشريط الجانبي */}
                <SidebarDashboard onSelect={setSelectedPage} />

                {/* المحتوى */}
                <ContentDashbiard page={selectedPage} />
            </div>
        </div>
    )
}

