import useAuth from '../../../hooks/useAuth';
import { useLocation, useNavigate } from 'react-router';
import Loader from '../../../shared/loader/Loader';
import useAxios from '../../../hooks/useAxios';

const GoogleLogin = () => {
    const { signInWithGoogle, loading } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from || '/';
    const axisInstance = useAxios();

    const handleGoogleSignIn = () => {
        signInWithGoogle()
            .then(async (result) => {
                console.log("signInWithGoogle Result", result);
                const user = result.user;
                // update userinfo in the database
                const userInfo = {
                    email: user.email,
                    role: 'user',
                    created_at: new Date().toISOString(),
                    last_login: new Date().toISOString(),
                }
                const userRes = await axisInstance.post('/users', userInfo);
                console.log("userRes.user : ", userRes.data);

                navigate(from);
            })
            .catch(error => {
                console.error("signInWithGoogle Error", error);
            });
    };

    if (loading) {
        return <Loader />;
    }

    return (
        <div className="w-full mt-4">
            <div className="divider">OR</div>

            <button
                onClick={handleGoogleSignIn}
                className="
                    btn 
                    w-full 
                    bg-white 
                    text-black 
                    border 
                    border-gray-300 
                    flex 
                    items-center 
                    justify-center 
                    gap-3
                    hover:bg-gray-100
                    transition
                "
            >
                <svg
                    aria-label="Google logo"
                    width="20"
                    height="20"
                    viewBox="0 0 512 512"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341" />
                    <path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57" />
                    <path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73" />
                    <path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55" />
                </svg>

                <span className="font-semibold">
                    Continue with Google
                </span>
            </button>
        </div>
    );
};

export default GoogleLogin;