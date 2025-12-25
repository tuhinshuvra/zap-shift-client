import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { FaCheck, FaTrash, FaEye } from "react-icons/fa";
import { useState } from "react";

const PendingRiders = () => {
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();
    const [selectedRider, setSelectedRider] = useState(null);

    // GET pending riders
    const { data: riders = [], isLoading, refetch, isError, error } = useQuery({
        queryKey: ["pendingRiders"],
        queryFn: async () => {
            const res = await axiosSecure.get("/riders/pending");
            return res.data;
        },
    });

    // APPROVE
    const approveMutation = useMutation({
        mutationFn: async (id) =>
            axiosSecure.patch(`/riders/status/${id}`, {
                status: 'approved'
            }),
        onSuccess: () => {
            Swal.fire("Approved!", "Rider approved successfully.", "success");
            queryClient.invalidateQueries(["pendingRiders"]);
            refetch();
        },
    });

    // DELETE
    const deleteMutation = useMutation({
        mutationFn: async (id) =>
            axiosSecure.delete(`/riders/${id}`),
        onSuccess: () => {
            Swal.fire("Deleted!", "Rider deleted successfully.", "success");
            queryClient.invalidateQueries(["pendingRiders"]);
            refetch();
        },
    });

    const handleApprove = (id) => {
        Swal.fire({
            title: "Approve this rider?",
            icon: "question",
            showCancelButton: true,
            confirmButtonText: "Approve",
        }).then((result) => {
            if (result.isConfirmed) {
                approveMutation.mutate(id);
            }
        });
    };

    const handleDelete = (id) => {
        Swal.fire({
            title: "Delete this rider?",
            text: "This cannot be undone!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Delete",
        }).then((result) => {
            if (result.isConfirmed) {
                deleteMutation.mutate(id);
            }
        });
    };

    if (isLoading) {
        return (
            <div className="flex justify-center py-10">
                <span className="loading loading-spinner loading-lg"></span>
            </div>
        );
    }

    if (isError) {
        return <div className="text-center text-red-500">{error.message}</div>;
    }

    return (
        <div className="p-6">
            <h2 className="text-3xl font-bold mb-6">
                Pending Riders ({riders.length})
            </h2>

            <div className="overflow-x-auto bg-white rounded-xl shadow">
                <table className="table table-zebra w-full">
                    <thead className="bg-gray-100 text-black">
                        <tr>
                            <th>SL</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Region</th>
                            <th>Status</th>
                            <th className="text-center">Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {riders.map((rider, index) => (
                            <tr key={rider._id}>
                                <td>{index + 1}</td>
                                <td>{rider.name}</td>
                                <td>{rider.email}</td>
                                <td>{rider.phone}</td>
                                <td>{rider.region}</td>
                                <td>
                                    <span className="badge badge-warning">
                                        {rider.status}
                                    </span>
                                </td>
                                <td className="flex justify-center gap-2">
                                    {/* VIEW */}
                                    <button
                                        onClick={() => {
                                            setSelectedRider(rider);
                                            document.getElementById("riderModal").showModal();
                                        }}
                                        className="btn btn-xs btn-info"
                                    >
                                        <FaEye />
                                    </button>

                                    {/* APPROVE */}
                                    <button
                                        onClick={() => handleApprove(rider._id)}
                                        className="btn btn-xs btn-success"
                                    >
                                        <FaCheck />
                                    </button>

                                    {/* DELETE */}
                                    <button
                                        onClick={() => handleDelete(rider._id)}
                                        className="btn btn-xs btn-error"
                                    >
                                        <FaTrash />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* DETAILS MODAL */}
            <dialog id="riderModal" className="modal">
                <div className="modal-box max-w-xl">
                    <h3 className="font-bold text-xl mb-4">
                        Rider Details
                    </h3>

                    {selectedRider && (
                        <div className="space-y-2">
                            <p><b>Name:</b> {selectedRider.name}</p>
                            <p><b>Email:</b> {selectedRider.email}</p>
                            <p><b>Phone:</b> {selectedRider.phone}</p>
                            <p><b>Age:</b> {selectedRider.age}</p>
                            <p><b>Region:</b> {selectedRider.region}</p>
                            <p><b>District:</b> {selectedRider.district}</p>
                            <p><b>NID:</b> {selectedRider.nid}</p>
                            <p><b>Bike:</b> {selectedRider.bikeBrand}</p>
                            <p><b>Bike Age:</b> {selectedRider.bikeAge} years</p>
                            <p><b>Reg No:</b> {selectedRider.bikeRegNo}</p>
                            <p><b>Renew Date:</b> {selectedRider.bikeRegRenewDate}</p>
                        </div>
                    )}

                    <div className="modal-action">
                        <form method="dialog">
                            <button className="btn">Close</button>
                        </form>
                    </div>
                </div>
            </dialog>
        </div>
    );
};

export default PendingRiders;
