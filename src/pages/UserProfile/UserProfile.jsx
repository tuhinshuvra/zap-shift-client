import React from "react";
import useAuth from "../../hooks/useAuth";

const UserProfile = () => {
    // const { user } = useAuth();
    // console.log("User Profile: ", user);
    const user = {
        displayName: "Sada Annanda",
        role: "Shift Manager",
        email: "sadaannanda@gmail.com",
        phone: "+880 1915 087998",
        location: "Rampura, Dhaka",
        photoURL: "https://i.pravatar.cc/150?img=12",
        shiftsCompleted: 128,
        upcomingShifts: 5,
    };

    return (
        <div className="min-h-screen bg-base-200 p-6">
            <div className="max-w-4xl mx-auto">
                {/* Profile Card */}
                <div className="card bg-base-100 shadow-xl">
                    <div className="card-body">
                        <div className="flex flex-col md:flex-row gap-6 items-center">
                            {/* Avatar */}
                            <div className="avatar">
                                <div className="w-32 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                    <img src={user.photoURL} alt="Profile" />
                                </div>
                            </div>

                            {/* User Info */}
                            <div className="flex-1 text-center md:text-left">
                                <h2 className="text-2xl font-bold">{user.displayName}</h2>
                                <p className="text-primary font-medium">{user.role}</p>

                                <div className="mt-4 space-y-1 text-sm">
                                    <p>📧 {user.email}</p>
                                    <p>📞 {user.phone}</p>
                                    <p>📍 {user.location}</p>
                                </div>
                            </div>

                            {/* Actions */}
                            <div>
                                <button className="btn btn-primary btn-outline">
                                    Edit Profile
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                    <div className="stat bg-base-100 shadow rounded-box">
                        <div className="stat-title">Shifts Completed</div>
                        <div className="stat-value text-primary">
                            {user.shiftsCompleted}
                        </div>
                        <div className="stat-desc">All-time</div>
                    </div>

                    <div className="stat bg-base-100 shadow rounded-box">
                        <div className="stat-title">Upcoming Shifts</div>
                        <div className="stat-value text-secondary">
                            {user.upcomingShifts}
                        </div>
                        <div className="stat-desc">Next 7 days</div>
                    </div>
                </div>

                {/* Activity Section */}
                <div className="card bg-base-100 shadow-xl mt-6">
                    <div className="card-body">
                        <h3 className="card-title">Recent Activity</h3>
                        <ul className="timeline timeline-vertical">
                            <li>
                                <div className="timeline-start text-sm">
                                    Shift completed at Store A
                                </div>
                                <div className="timeline-end text-xs opacity-60">
                                    2 days ago
                                </div>
                            </li>
                            <li>
                                <div className="timeline-start text-sm">
                                    Shift assigned at Store B
                                </div>
                                <div className="timeline-end text-xs opacity-60">
                                    5 days ago
                                </div>
                            </li>
                            <li>
                                <div className="timeline-start text-sm">
                                    Profile updated
                                </div>
                                <div className="timeline-end text-xs opacity-60">
                                    1 week ago
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserProfile;
