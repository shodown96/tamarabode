import { useEffect, useState } from "react";

// Live Nigeria time (WAT = UTC+1)
export default function LivelocalTime({ timeZone = "Africa/Lagos" }) {
    const [time, setTime] = useState({ h: "00", m: "00", period: "AM" });

    useEffect(() => {
        function tick() {
            const now = new Date(
                new Date().toLocaleString("en-US", { timeZone })
            );
            let hours = now.getHours();
            const minutes = now.getMinutes().toString().padStart(2, "0");
            const period = hours >= 12 ? "PM" : "AM";
            hours = hours % 12 || 12;
            setTime({ h: hours.toString().padStart(2, "0"), m: minutes, period });
        }
        tick();
        const id = setInterval(tick, 1000);
        return () => clearInterval(id);
    }, []);

    return (
        <div className="flex items-baseline gap-3 leading-none">
            <span className="text-7xl font-bold text-white tracking-tight">
                {time.h}:{time.m}
            </span>
            <span className="text-7xl font-bold text-primary tracking-tight">
                {time.period}
            </span>
        </div>
    );
}