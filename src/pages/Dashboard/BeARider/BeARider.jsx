import { useForm } from "react-hook-form";
import useAuth from "../../../hooks/useAuth";
import agent from "../../../assets/agent-pending.png";
import { useLoaderData } from "react-router";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const BeARider = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const serviceCenters = useLoaderData();

    const { register, handleSubmit, watch, reset, formState: { errors }, } = useForm({
        defaultValues: {
            name: user?.displayName || "",
            email: user?.email || "",
            status: "pending",
        },
    });

    const selectedRegion = watch("region");

    const regions = [...new Set(serviceCenters.map((c) => c.region))];
    const districts = serviceCenters
        .filter((c) => c.region === selectedRegion)
        .map((c) => c.district);

    const onSubmit = (riderData) => {
        console.log("Rider Application:", riderData);

        axiosSecure.post('/riders', riderData)
            .then(res => {
                if (res.data.insertedId) {
                    console.log(res);
                    Swal.fire({
                        icon: "success",
                        title: "Application Submitted",
                        text: "Your rider application is under review.",
                        confirmButtonColor: "#22c55e",
                    });
                }
            })
        reset();
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-4 py-10 bg-gray-50">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl w-full bg-white shadow-lg rounded-2xl p-6">

                {/* LEFT: FORM */}
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

                    {/* Headings */}
                    <div>
                        <h2 className="text-4xl font-bold my-2">Be a Rider</h2>
                        <p className="text-sm text-gray-500">
                            Enjoy fast, reliable parcel delivery with real-time tracking and zero hassle.
                            From personal packages to business shipments — we deliver on time, every time.
                        </p>

                        <h3 className="text-2xl font-semibold text-gray-700 my-4">
                            Tell us about yourself
                        </h3>
                    </div>

                    {/* Name */}
                    <div>
                        <label className="label text-black">Full Name</label>
                        <input
                            {...register("name")}
                            readOnly
                            className="input input-bordered w-full"
                        />
                    </div>

                    {/* Email & Age */}
                    <div className="w-full md:flex md:gap-4">
                        <div className="w-full">
                            <label className="label text-black">Email Address</label>
                            <input
                                {...register("email")}
                                readOnly
                                className="input input-bordered w-full"
                            />
                        </div>

                        <div className="w-full">
                            <label className="label text-black">Age</label>
                            <input
                                type="number"
                                {...register("age", { required: "Age is required" })}
                                className="input input-bordered w-full"
                            />
                            {errors.age && (
                                <p className="text-red-500 text-sm">{errors.age.message}</p>
                            )}
                        </div>
                    </div>

                    {/* Region & District */}
                    <div className="w-full md:flex md:gap-4">
                        <div className="w-full">
                            <label className="label text-black">Region</label>
                            <select
                                {...register("region", { required: true })}
                                className="select select-bordered w-full"
                            >
                                <option value="">Select Region</option>
                                {regions.map((r) => (
                                    <option key={r} value={r}>
                                        {r}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="w-full">
                            <label className="label text-black">District</label>
                            <select
                                {...register("district", { required: true })}
                                className="select select-bordered w-full"
                            >
                                <option value="">Select District</option>
                                {districts.map((d) => (
                                    <option key={d} value={d}>
                                        {d}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Phone & NID */}
                    <div className="w-full md:flex md:gap-4">
                        <div className="w-full">
                            <label className="label text-black">Phone Number</label>
                            <input
                                {...register("phone", { required: true })}
                                placeholder="01XXXXXXXXX"
                                className="input input-bordered w-full"
                            />
                        </div>

                        <div className="w-full">
                            <label className="label text-black">National ID Number</label>
                            <input
                                {...register("nid", { required: true })}
                                placeholder="NID Number"
                                className="input input-bordered w-full"
                            />
                        </div>
                    </div>

                    {/* Bike Info */}
                    <div className="w-full md:flex md:gap-4">
                        <div className="w-full">
                            <label className="label text-black">Bike Brand</label>
                            <input
                                {...register("bikeBrand", { required: true })}
                                className="input input-bordered w-full"
                            />
                        </div>

                        <div className="w-full">
                            <label className="label text-black">Bike Age (Years)</label>
                            <input
                                {...register("bikeAge", { required: true })}
                                className="input input-bordered w-full"
                            />
                        </div>
                    </div>

                    {/* Registration */}
                    <div className="w-full md:flex md:gap-4">
                        <div className="w-full">
                            <label className="label text-black">Bike Registration Number</label>
                            <input
                                {...register("bikeRegNo", { required: true })}
                                className="input input-bordered w-full"
                            />
                        </div>

                        <div className="w-full">
                            <label className="label text-black">Registration Renew Date</label>
                            <input
                                type="date"
                                {...register("bikeRegRenewDate", { required: true })}
                                className="input input-bordered w-full"
                            />
                        </div>
                    </div>

                    {/* Hidden status */}
                    <input type="hidden" {...register("status")} />

                    <button className="btn bg-green-400 w-full">
                        Apply as Rider
                    </button>
                </form>

                {/* RIGHT: IMAGE */}
                <div className="flex items-center justify-center">
                    <img src={agent} alt="Rider Pending" className="max-w-full h-auto" />
                </div>

            </div>
        </div>
    );
};

export default BeARider;
