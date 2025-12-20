import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import Loader from "../../../shared/loader/Loader";
import { useQuery } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router";
import Swal from "sweetalert2";

const MyParcels = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();

    const { data: parcels = [], isLoading, refetch } = useQuery({
        queryKey: ["my-parcels", user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/parcels?email=${user.email}`);
            return res.data;
        },
    });

    if (isLoading) return <Loader />;

    const handleDelete = async (id) => {
        const result = await Swal.fire({
            title: "Are you sure?",
            text: "This parcel will be permanently deleted!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, delete it!",
            cancelButtonText: "Cancel",
        });

        if (result.isConfirmed) {
            try {
                const response = await axiosSecure.delete(`/parcels/${id}`);

                if (response.data?.deletedCount > 0 || response.status === 200) {
                    Swal.fire({
                        title: "Deleted!",
                        text: "The parcel has been deleted successfully.",
                        icon: "success",
                    });
                }
                refetch()
            } catch (error) {
                Swal.fire({
                    title: "Failed!",
                    text:
                        error.response?.data?.message ||
                        "Something went wrong while deleting the parcel.",
                    icon: "error",
                });

                console.error("Delete error:", error);
            }
        }

    };

    const handlePay = (id) => {
        console.log("Redirect to payment for:", id);
        navigate(`/dashboard/payment/${id}`)
    };

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">
                My Parcels ({parcels.length})
            </h2>

            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    <thead className="bg-base-200">
                        <tr className=" font-bold italic text-black">
                            <th>SL</th>
                            <th>Title</th>
                            <th>Type</th>
                            <th>Created At</th>
                            <th>Total Cost</th>
                            <th>Payment Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {parcels.map((parcel, index) => (
                            <tr key={parcel._id}>
                                <td className=" font-bold">{index + 1}</td>
                                <td className=" font-bold truncate">{parcel.parcelName}</td>

                                <td>
                                    <span
                                        className={`font-bold ${parcel.parcelType === "document"
                                            ? "text-primary"
                                            : "text-warning"
                                            }`}
                                    >
                                        {parcel.parcelType === "document"
                                            ? "Document"
                                            : "Non-Document"}
                                    </span>
                                </td>

                                <td>
                                    {new Date(
                                        parcel.creation_date
                                    ).toLocaleDateString()}
                                </td>

                                <td className="font-semibold">
                                    ৳{parcel.cost}
                                </td>

                                <td>
                                    <span
                                        className={`badge ${parcel.payment_status === "paid"
                                            ? "badge-success"
                                            : "badge-error"
                                            }`}
                                    >
                                        {parcel.payment_status}
                                    </span>
                                </td>

                                <td className="space-x-2">
                                    <Link
                                        to={`/dashboard/parcels/${parcel._id}`}
                                        className="btn btn-xs btn-outline btn-info"
                                    >
                                        View
                                    </Link>

                                    {parcel.payment_status === "unpaid" && (
                                        <Link
                                            onClick={() =>
                                                handlePay(parcel._id)
                                            }
                                            className="btn btn-xs btn-success"
                                        >
                                            Pay
                                        </Link>
                                    )}

                                    <button
                                        onClick={() => handleDelete(parcel._id)}
                                        className="btn btn-xs btn-error"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}

                        {parcels.length === 0 && (
                            <tr>
                                <td
                                    colSpan="6"
                                    className="text-center py-10"
                                >
                                    No parcels found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyParcels;