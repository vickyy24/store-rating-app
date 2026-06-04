const Footer = () => {
    return (
        <div className="h-16 border-t border-[#e5e7eb] bg-white px-8 flex items-center justify-between">

            <div className="text-sm text-[#64748b]">
                © 2026 Store Rating. All rights reserved.
            </div>

            <div className="flex items-center gap-8 text-sm text-[#64748b]">

                <div className="text-sm mr-90 text-[#64748b]">
                    Store Rating Platform
                </div>
                <div>
                    Terms of Service
                </div>
                <div>
                    Privacy Policy
                </div>

            </div>

        </div>
    );
};

export default Footer;