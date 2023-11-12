import { useEffect, useState } from "react";
import Clock from "../aseets/clock.svg";

export default function ClockNav() {
    const [date, setDate] = useState(new Date());
    useEffect(() => {
        const timer = setInterval(() => setDate(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="w-full flex justify-end bg-gray-200 py-3">
            <div className="w-5/6 mx-auto justify-end">
                <div className="flex w-full justify-end items-center gap-x-2">
                    <span className="font-bold ml-4 text-black">
                        {date?.toLocaleDateString("fa-ir")}
                    </span>
                    <span className="font-bold text-black">
                        {date?.toLocaleTimeString("fa-ir", {
                            timeStyle: "short",
                        })}
                    </span>
                    <img src={Clock} alt="time" />
                </div>
            </div>
        </div>
    );
}
