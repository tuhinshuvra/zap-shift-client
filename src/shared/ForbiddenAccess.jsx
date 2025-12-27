import { Link } from "react-router";
import { FaLock, FaHome } from "react-icons/fa";

const ForbiddenAccess = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 to-purple-100 px-4">
            <div className="bg-white shadow-xl rounded-2xl p-8 max-w-md text-center">

                {/* Icon */}
                <div className="flex justify-center mb-4">
                    <div className="w-20 h-20 flex items-center justify-center rounded-full bg-pink-100 text-pink-500">
                        <FaLock className="text-4xl" />
                    </div>
                </div>

                {/* Text */}
                <h1 className="text-3xl font-extrabold text-gray-800 mb-2">
                    Oops! Access Denied 🚫
                </h1>

                <p className="text-gray-600 mb-6">
                    You don’t have permission to view this page.
                    <br />
                    Don’t worry — it’s not your fault 💕
                </p>

                {/* Button */}
                <Link
                    to="/"
                    className="btn bg-green-700 text-white btn-wide flex items-center gap-2 mx-auto"
                >
                    <FaHome />
                    Go Back Home
                </Link>

                {/* Cute footer */}
                <p className="text-xs text-gray-400 mt-6">
                    Error 403 · Protected Area 🛡️
                </p>
            </div>
        </div>
    );
};

export default ForbiddenAccess;
