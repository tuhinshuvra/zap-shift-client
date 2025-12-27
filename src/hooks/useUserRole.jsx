import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useUserRole = () => {
    const { user, loading } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data, isLoading } = useQuery({
        queryKey: ["userRole", user?.email],
        enabled: !!user?.email && !loading,
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/role/${user.email}`);
            return res.data;
        },
    });

    const role = data?.role || "user";

    return {
        role,
        isAdmin: role === "admin",
        // isRider: role === "rider",
        isUser: role === "user",
        isLoading,
    };
};

export default useUserRole;