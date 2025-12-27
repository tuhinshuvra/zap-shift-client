import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import Loader from "../../../shared/loader/Loader";
import { useState } from "react";

const ManageAdmins = () => {
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();
    const [searchText, setSearchText] = useState("");

    // 🔹 Fetch users
    const { data: users = [], isLoading, isError, error } = useQuery({
        queryKey: ["users"],
        queryFn: async () => {
            const res = await axiosSecure.get("/users");
            return res.data;
        },
    });

    // 🔹 Role toggle mutation
    const roleMutation = useMutation({
        mutationFn: async ({ id, role }) => {
            return axiosSecure.patch(`/users/admin/${id}`, { role });
        },
        onSuccess: (_, { role }) => {
            Swal.fire(
                "Success",
                `Admin role changed to ${role}`,
                "success"
            );
            queryClient.invalidateQueries(["users"]);
        },
    });

    const handleRoleChange = (user) => {
        const isAdmin = user.role === "admin";
        const newRole = isAdmin ? "user" : "admin";

        Swal.fire({
            title: `${isAdmin ? "Remove admin" : "Make admin"}?`,
            text: user.email,
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Confirm",
        }).then((result) => {
            if (result.isConfirmed) {
                roleMutation.mutate({
                    id: user._id,
                    role: newRole,
                });
            }
        });
    };

    if (isLoading) return <Loader />;

    if (isError)
        return <div className="text-center text-red-500">{error.message}</div>;


    // Filter user by search text
    const filteredUsers = users.filter((user) =>
        user.email.toLowerCase().includes(searchText.toLowerCase()) ||
        user.role.toLowerCase().includes(searchText.toLowerCase())
    );

    return (
        <div className="p-6">
            <h2 className="text-3xl font-bold mb-6">Manage Admins</h2>

            {/* Search input */}
            <div className="mb-4">
                <input
                    type="text"
                    placeholder="Search by email or role ..."
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    className="input input-bordered w-full md:w-1/3"
                />
            </div>

            <div className="overflow-x-auto bg-white shadow rounded-xl">
                <table className="table table-zebra w-full">
                    <thead className="bg-gray-100 text-black">
                        <tr>
                            <th>SL</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th className="text-center">Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {filteredUsers.map((user, index) => (
                            <tr key={user._id}>
                                <td>{index + 1}</td>
                                <td>{user.email}</td>
                                <td>
                                    <span
                                        className={`font-bold ${user.role === "admin"
                                            ? "text-green-800"
                                            : "text-gray-700"
                                            }`}
                                    >
                                        {user.role.toUpperCase()}
                                    </span>
                                </td>

                                <td className="text-center">
                                    <button
                                        onClick={() => handleRoleChange(user)}
                                        className={`btn btn-xs ${user.role === "admin"
                                            ? "bg-red-500 text-white"
                                            : "bg-green-700 text-white"
                                            }`}
                                    >
                                        {user.role === "admin"
                                            ? "Remove Admin"
                                            : "Make Admin"}
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageAdmins;