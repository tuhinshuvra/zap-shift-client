import { useState } from "react";
import { useQueryClient, useQuery } from "@tanstack/react-query";
import { } from "@tanstack/react-query";
import { FaUserPlus } from "react-icons/fa";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loader from "../../../shared/loader/Loader";
import Swal from "sweetalert2";

const AssignRider = () => {
    const axiosSecure = useAxiosSecure();
    const [selectedParcel, setSelectedParcel] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);

    const queryClient = useQueryClient();

    // Load parcels ready for assignment
    const { data: parcels = [], isLoading, isError, error } = useQuery({
        queryKey: ["assignableParcels"],
        queryFn: async () => {
            const res = await axiosSecure.get("/parcels/assignable");
            return res.data;
        },
    });

    // Load riders based on selected parcel's sender service center
    const { data: riders = [], refetch: refetchRiders, isLoading: ridersLoading } = useQuery({
        queryKey: ["ridersByDistrict", selectedParcel?.senderServiceCenter],
        enabled: !!selectedParcel, // only run when a parcel is selected
        queryFn: async () => {
            const res = await axiosSecure.get(`/riders/available?district=${selectedParcel.senderServiceCenter}`);
            return res.data.data;
        },
    });

    const handleOpenModal = (parcel) => {
        setSelectedParcel(parcel);
        setModalOpen(true);
        refetchRiders(); // fetch riders for this parcel
    };

    const handleAssignRider = async (rider) => {
        try {
            await axiosSecure.post("/parcels/assign-rider", {
                parcelId: selectedParcel._id,
                riderId: rider._id,
            });

            setModalOpen(false);
            setSelectedParcel(null);

            await queryClient.invalidateQueries(["assignableParcels"]);

            Swal.fire({
                icon: "success",
                title: "Assigned!",
                text: "Rider has been assigned successfully.",
                timer: 2000,
                showConfirmButton: false,
            });

        } catch (error) {
            console.error("handleAssignRider :", error);

            Swal.fire({
                icon: "error",
                title: "Assignment Failed",
                text: error?.response?.data?.message || "Something went wrong",
            });
        }
    };



    if (isLoading) return <Loader />;
    if (isError) return <div className="text-red-500 text-center">Failed to load parcels</div>;

    return (
        <div className="p-6">
            <h2 className="text-3xl font-bold mb-6">Assign Rider ({parcels.length})</h2>

            <div className="overflow-x-auto bg-white shadow rounded-xl">
                <table className="table table-zebra w-full">
                    <thead className="bg-gray-100 text-black">
                        <tr>
                            <th>SL</th>
                            {/* <th>Tracking ID</th> */}
                            <th>Parcel</th>
                            <th>Sender</th>
                            <th>Receiver</th>
                            <th>Cost</th>
                            <th>Status</th>
                            <th className="text-center">Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {parcels.map((parcel, index) => (
                            <tr key={parcel._id}>
                                <td>{index + 1}</td>
                                {/* <td className="font-mono text-sm">{parcel.trackingId}</td> */}
                                <td>
                                    <p className="font-semibold">{parcel.parcelName}</p>
                                    <p className="text-xs text-gray-500">{parcel.parcelType} • {parcel.parcelWeight}kg</p>
                                </td>
                                <td>
                                    <p className="font-semibold">{parcel.sender}</p>
                                    <p className="text-xs text-gray-500">{parcel.senderRegion}</p>
                                </td>
                                <td>
                                    <p className="font-semibold">{parcel.receiverName}</p>
                                    <p className="text-xs text-gray-500">{parcel.receiverRegion}</p>
                                </td>
                                <td className="font-bold text-green-600">৳ {parcel.cost}</td>
                                <td>
                                    <p className="text-sm font-semibold text-orange-600">Not Collected</p>
                                </td>
                                <td className="text-center">
                                    <button
                                        className="btn btn-xs btn-primary flex items-center gap-1"
                                        onClick={() => handleOpenModal(parcel)}
                                    >
                                        <FaUserPlus /> Assign
                                    </button>
                                </td>
                            </tr>
                        ))}

                        {parcels.length === 0 && (
                            <tr>
                                <td colSpan="8" className="text-center py-6 text-gray-500">
                                    No parcels available for rider assignment
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Modal */}
            {modalOpen && selectedParcel && (
                <dialog className="modal modal-open">
                    <div className="modal-box max-w-xl">
                        <h3 className="font-bold text-xl mb-4">
                            Assign Rider for Parcel: {selectedParcel.parcelName}
                        </h3>

                        {ridersLoading ? (
                            <Loader />
                        ) : riders.length > 0 ? (
                            <ul className="space-y-2 max-h-64 overflow-y-auto">
                                {riders.map((rider) => (
                                    <li key={rider._id} className="flex justify-between items-center border p-2 rounded">
                                        <div>
                                            <p className="font-semibold">{rider.name}</p>
                                            <p className="text-xs text-gray-500">{rider.district}</p>
                                        </div>
                                        <button
                                            className="btn btn-sm btn-success"
                                            onClick={() => handleAssignRider(rider)}
                                        >
                                            Assign
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-gray-500">No riders available in this district.</p>
                        )}

                        <div className="modal-action">
                            <button className="btn" onClick={() => setModalOpen(false)}>Close</button>
                        </div>
                    </div>
                </dialog>
            )}
        </div>
    );
};

export default AssignRider;