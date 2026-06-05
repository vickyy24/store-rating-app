import { FaStore, FaUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <div className="h-18 border-b border-[#e5e7eb] bg-white px-8 flex items-center justify-between">

            <div className="flex items-center gap-3">

                <FaStore className="text-3xl text-[#ff7b5c]" />

                <div>

                    <div className="text-xl font-bold text-[#081534]">
                        Store Rating
                    </div>

                    <div className="text-xs text-[#64748b]">
                        Rate. Review. Discover.
                    </div>

                </div>

            </div>

            <Link to="/profile" className="flex items-center gap-2 px-3 py-2 rounded-full border border-[#e5e7eb] hover:bg-[#f8fafc] transition-all">
               <FaUserCircle className="text-lg text-[#081534]" />

                <span className="text-sm font-medium text-[#081534]">
                    My Profile
                </span>
            </Link>

        </div>
    );
};

export default Navbar;