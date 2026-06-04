import { FaStore } from "react-icons/fa";

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

            <div className="text-sm text-[#64748b]">
                Store Rating Platform
            </div>

        </div>
    );
};

export default Navbar;