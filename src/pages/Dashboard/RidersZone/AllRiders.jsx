import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { FaCheck, FaTrash, FaEye } from "react-icons/fa";
import { useState } from "react";
import Loader from "../../../shared/loader/Loader";

const AllRiders = () => {
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();
    const [selectedRider, setSelectedRider] = useState(null);
    const [searchText, setSearchText] = useState("");

    // GET riders
    const { data: riders = [], isLoading, refetch, isError, error } = useQuery({
        queryKey: ["riders"],
        queryFn: async () => {
            const res = await axiosSecure.get("/riders");
            return res.data;
        },
    });

    // Deactivate rider
    const deActiveMutation = useMutation({
        mutationFn: async (id) =>
            axiosSecure.patch(`/riders/status/${id}`, {
                status: "deactivated",
            }),
        onSuccess: () => {
            Swal.fire("Deactivated!", "Rider Deactivated successfully.", "success");
            queryClient.invalidateQueries(["riders"]);
            refetch();
        },
    });

    const handleDeActive = (id) => {
        Swal.fire({
            title: "Deactivate this rider?",
            icon: "question",
            showCancelButton: true,
            confirmButtonText: "Deactivate",
        }).then((result) => {
            if (result.isConfirmed) {
                deActiveMutation.mutate(id);
            }
        });
    };

    // DELETE rider
    const deleteMutation = useMutation({
        mutationFn: async (id) => axiosSecure.delete(`/riders/${id}`),
        onSuccess: () => {
            Swal.fire("Deleted!", "Rider deleted successfully.", "success");
            queryClient.invalidateQueries(["riders"]);
            refetch();
        },
    });

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

    if (isLoading) return <Loader />;

    if (isError)
        return <div className="text-center text-red-500">{error.message}</div>;

    // Filter riders by search text
    const filteredRiders = riders.filter((rider) =>
        rider.name.toLowerCase().includes(searchText.toLowerCase()) ||
        rider.email.toLowerCase().includes(searchText.toLowerCase()) ||
        rider.phone.toLowerCase().includes(searchText.toLowerCase()) ||
        rider.status.toLowerCase().includes(searchText.toLowerCase()) ||
        rider.region.toLowerCase().includes(searchText.toLowerCase())
    );

    return (
        <div className="p-6">
            <h2 className="text-3xl font-bold mb-4">
                All Riders ({filteredRiders.length})
            </h2>

            {/* Search input */}
            <div className="mb-4">
                <input
                    type="text"
                    placeholder="Search by name, email or phone ..."
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    className="input input-bordered w-full md:w-1/3"
                />
            </div>

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
                        {filteredRiders.map((rider, index) => (
                            <tr key={rider._id}>
                                <td>{index + 1}</td>
                                <td>{rider.name}</td>
                                <td>{rider.email}</td>
                                <td>{rider.phone}</td>
                                <td>{rider.region}</td>
                                <td>
                                    <span
                                        className={`font-extrabold ${rider.status === "approved"
                                            ? "text-green-700"
                                            : rider.status === "active"
                                                ? "text-blue-600"
                                                : rider.status === "deactivated"
                                                    ? "text-red-600"
                                                    : "text-yellow-600"
                                            }`}
                                    >
                                        {rider.status.toUpperCase()}
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

                                    {/* Deactivate */}
                                    <button
                                        onClick={() => handleDeActive(rider._id)}
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
                    <h3 className="font-bold text-xl mb-4">Rider Details</h3>

                    {selectedRider && (
                        <div className="space-y-2">
                            <p>
                                <b>Name:</b> {selectedRider.name}
                            </p>
                            <p>
                                <b>Email:</b> {selectedRider.email}
                            </p>
                            <p>
                                <b>Phone:</b> {selectedRider.phone}
                            </p>
                            <p>
                                <b>Age:</b> {selectedRider.age}
                            </p>
                            <p>
                                <b>Region:</b> {selectedRider.region}
                            </p>
                            <p>
                                <b>District:</b> {selectedRider.district}
                            </p>
                            <p>
                                <b>NID:</b> {selectedRider.nid}
                            </p>
                            <p>
                                <b>Bike:</b> {selectedRider.bikeBrand}
                            </p>
                            <p>
                                <b>Bike Age:</b> {selectedRider.bikeAge} years
                            </p>
                            <p>
                                <b>Reg No:</b> {selectedRider.bikeRegNo}
                            </p>
                            <p>
                                <b>Renew Date:</b> {selectedRider.bikeRegRenewDate}
                            </p>
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

export default AllRiders;
