import { Outlet, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Splash from "../../components/Splash";
import { jwtDecode } from "jwt-decode";

export default function ContentDashboard() {
    const token = localStorage.getItem("token");
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (token) {
            try {
                const decoded = jwtDecode(token);
                const id = decoded.id;
                const role = decoded.role;

                if (!id || role !== "owner") {
                    navigate("/");
                }
            } catch (error) {
                console.error("خطأ في فك تشفير التوكين:", error);
                navigate("/");
            } finally {
                setLoading(false);
            }
        } else {
            navigate("/");
        }
    }, [token, navigate]);

    if (loading) {
        return <Splash />;
    }

    return (
        <div className="mt-10 w-[100%]">
            <Outlet />
        </div>
    );
}
