import logo from "../aseets/logo.svg";
import ClockNav from "./Clock";

export default function Header() {
    return (
        <header className="w-full bg-gray-50 sticky top-0">
            <div className="flex justify-start mx-auto py-3 items-center gap-3 w-5/6">
                <img src={logo} alt="آسمونی" className="w-12" />
                <span className="font-bold text-lg">آسمونی</span>
            </div>
            <ClockNav />
        </header>
    );
}
