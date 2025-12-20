import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loader from "../../../shared/loader/Loader";
import useAuth from "../../../hooks/useAuth";

const MyParcels = () => {
    const { user, loading } = useAuth();
    const axiosSecure = useAxiosSecure();

    console.log("MyParcels : ", user?.email);

    if (loading) {
        <Loader></Loader>
    }

    const { data: parcels } = useQuery({
        queryKey: ['my-parcels', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/parcels?email=${user?.email}`);
            return res.data;
        }
    })
    console.log("Parcels Data by email: ", parcels);

    return (
        <div>
            <h2>My Parcel comming here {parcels?.length}</h2>
        </div>
    );
};

export default MyParcels;