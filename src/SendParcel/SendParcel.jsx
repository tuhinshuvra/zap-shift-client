import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { useLoaderData } from "react-router";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { Check, X } from "lucide-react";
import useAuth from "../hooks/useAuth";
import Loader from "../shared/loader/Loader";
import useAxiosSecure from "../hooks/useAxiosSecure";

const MySwal = withReactContent(Swal);


const generateTrackingID = () => {
    // Prefix for your courier, e.g., ZS = Zap Shift
    const prefix = "ZS";

    // Current timestamp in YYYYMMDDHHMMSS format
    const now = new Date();
    const timestamp = now.getFullYear().toString() +
        String(now.getMonth() + 1).padStart(2, '0') +
        String(now.getDate()).padStart(2, '0') +
        String(now.getHours()).padStart(2, '0') +
        String(now.getMinutes()).padStart(2, '0') +
        String(now.getSeconds()).padStart(2, '0');

    // Random 4-character alphanumeric string
    const randomStr = Math.random().toString(36).substring(2, 7).toUpperCase();

    return `${prefix}-${timestamp}-${randomStr}`;
};

const SendParcel = () => {
    const { user, loading } = useAuth()
    const axiosSecure = useAxiosSecure();

    const { register, handleSubmit, watch, reset } = useForm();
    const serviceCenters = useLoaderData();
    const [parcelData, setParcelData] = useState(null);
    const [senderCenters, setSenderCenters] = useState([]);
    const [receiverCenters, setReceiverCenters] = useState([]);

    const senderRegion = watch("senderRegion");
    const receiverRegion = watch("receiverRegion");

    // Populate unique regions
    const regions = [...new Set(serviceCenters.map((item) => item.region))];

    // Update sender service centers when region changes
    useEffect(() => {
        if (senderRegion) {
            const filtered = serviceCenters
                .filter((sc) => sc.region === senderRegion)
                .map((sc) => sc.district);
            setSenderCenters(filtered);
        } else {
            setSenderCenters([]);
        }
    }, [senderRegion, serviceCenters]);

    // Update receiver service centers when region changes
    useEffect(() => {
        if (receiverRegion) {
            const filtered = serviceCenters
                .filter((sc) => sc.region === receiverRegion)
                .map((sc) => sc.district);
            setReceiverCenters(filtered);
        } else {
            setReceiverCenters([]);
        }
    }, [receiverRegion, serviceCenters]);

    const onSubmit = (data) => {
        console.log("onSubmit data : ", data);
        const weight = Number(data.parcelWeight) || 0;
        const isSameCity = data.senderServiceCenter === data.receiverServiceCenter;

        let baseCost = 0;
        let extraWeightCost = 0;
        let outsideCityExtra = 0;
        let totalCost = 0;

        // Calculate cost
        if (data.parcelType === "document") {
            baseCost = isSameCity ? 60 : 80;
            totalCost = baseCost;
        } else {
            if (weight <= 3) {
                baseCost = isSameCity ? 110 : 150;
                totalCost = baseCost;
            } else {
                baseCost = isSameCity ? 110 : 150;
                extraWeightCost = (weight - 3) * 40;
                outsideCityExtra = !isSameCity ? 40 : 0;
                totalCost = baseCost + extraWeightCost + outsideCityExtra;
            }
        }

        setParcelData(data);

        // Detailed SweetAlert2 modal
        MySwal.fire({
            title: 'Delivery Cost Breakdown',
            html: `
        <div style="text-align:left; line-height:1.5;">
            <p><strong>Parcel Type:</strong> ${data.parcelType}</p>
            <p><strong>Parcel Weight:</strong> ${weight} kg</p>
            <p><strong>Base Cost:</strong> ৳${baseCost} ${data.parcelType === 'document' ? '(Fixed)' : '(Cost for up to 3kg)'}</p>
            ${extraWeightCost > 0 ? `<p><strong>Extra Weight Cost:</strong> ৳${extraWeightCost} <span style="color:gray; font-size:0.9em;">(৳40 per kg above 3kg)</span></p>` : ''}
            ${outsideCityExtra > 0 ? `<p><strong>Outside City/District Extra:</strong> ৳${outsideCityExtra} <span style="color:gray; font-size:0.9em;">(Additional charge for sending outside the same city/district)</span></p>` : ''}
            <hr style="border-top:2px solid #ddd; margin:10px 0;" />
            <p style="font-size:1.2em; color:green; font-weight:bold;">Total Delivery Cost: ৳${totalCost}</p>
            <p>Do you want to confirm this booking?</p>
        </div>
    `,
            icon: 'info',
            showCancelButton: true,
            confirmButtonText: '<i class="fa fa-check"></i> Proceed to Payment',
            cancelButtonText: '<i class="fa fa-times"></i> Continue Editing',
            customClass: {
                popup: 'text-left'
            }
        }).then((result) => {
            if (result.isConfirmed) {
                confirmSave(totalCost);
            }
        });
    };


    if (loading) {
        <Loader></Loader>
    }

    const confirmSave = async (totalCost) => {
        const payload = {
            ...parcelData,
            cost: totalCost,
            payment_status: 'unpaid',
            delivery_status: 'not_collected',
            creation_date: new Date().toISOString(),
            trackingId: generateTrackingID(),
        };

        console.log("Payload : ", payload);

        try {
            // await axios.post("/api/parcels", payload);
            axiosSecure.post('/parcels', payload)
                .then(res => {
                    console.log("axiosSecure.post : ", res.data);
                    if (res.data.insertedId) {
                        // ToDo: here need to do redirect to the payment page.
                        MySwal.fire('Success', 'Parcel successfully added!', 'success');
                    }
                })
            reset();

        } catch (error) {
            console.error(error);
            MySwal.fire('Error', 'Failed to save parcel!', `${error}`);
        }
    };



    return (
        <div className="max-w-5xl mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6">Send A Parcel</h1>
            <p className="text-black font-bold text-md ">Enter Your Parcel Details</p>
            <hr className="border-gray-500 mb-6" />

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Parcel Info */}
                <div>
                    <label className="label">
                        <span className="label-text font-medium text-black font-bold">Parcel Type</span>
                    </label>

                    <div className="flex gap-6">
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input
                                type="radio"
                                value="document"
                                className="radio radio-primary"
                                {...register("parcelType", { required: true })}
                            />
                            <span>Document</span>
                        </label>

                        <label className="flex items-center gap-2 cursor-pointer">
                            <input
                                type="radio"
                                value="non-document"
                                className="radio radio-primary"
                                {...register("parcelType", { required: true })}
                            />
                            <span>Non Document</span>
                        </label>
                    </div>
                </div>

                <div className="md:flex w-full gap-4">
                    <div className="w-full md:w-1/2">
                        <label className="label text-black">Parcel Name</label>
                        <input
                            className="input input-bordered w-full"
                            {...register("parcelName", { required: true })}
                            placeholder="Parcel Name"
                        />
                    </div>

                    <div className="w-full md:w-1/2">
                        <label className="label text-black">Parcel Weight (KG)</label>
                        <input
                            type="number"
                            step="0.1" // allows decimals like 0.4
                            min="0"    // optional, prevents negative values
                            className="input input-bordered w-full"
                            {...register("parcelWeight")}
                            placeholder="Parcel Weight"
                        />
                    </div>
                </div>

                <div className="md:flex justify-between gap-2">
                    {/* Sender Info */}
                    <div className="card bg-base-100 shadow p-5 md:w-1/2">
                        <h2 className="font-semibold mb-4">Sender Details</h2>
                        <div className="grid md:grid-cols-2 gap-4">
                            <input
                                className="input input-bordered md:col-span-2 w-full"
                                defaultValue={user?.email}
                                {...register("sender", { required: true })}
                                readOnly
                            />
                            <input
                                className="input input-bordered md:col-span-2 w-full"
                                placeholder="Address"
                                {...register("senderAddress", { required: true })}
                            />
                            <input
                                className="input input-bordered w-full"
                                placeholder="Phone"
                                {...register("senderContact", { required: true })}
                            />
                            {/* Region */}
                            <select
                                className="select select-bordered w-full"
                                {...register("senderRegion", { required: true })}
                            >
                                <option value="">Select Region</option>
                                {regions.map((region) => (
                                    <option key={region} value={region}>
                                        {region}
                                    </option>
                                ))}
                            </select>
                            {/* Service Center */}
                            <select
                                className="select select-bordered md:col-span-2 w-full"
                                {...register("senderServiceCenter", { required: true })}
                            >
                                <option value="">Select Service Center</option>
                                {senderCenters.map((sc) => (
                                    <option key={sc} value={sc}>
                                        {sc}
                                    </option>
                                ))}
                            </select>

                            <input
                                className="input input-bordered md:col-span-2 w-full"
                                placeholder="Pick up Instruction"
                                {...register("pickupInstruction", { required: true })}
                            />
                        </div>
                    </div>

                    {/* Receiver Info */}
                    <div className="card bg-base-100 shadow p-5 md:w-1/2">
                        <h2 className="font-semibold mb-4">Receiver Details</h2>
                        <div className="grid md:grid-cols-2 gap-4">
                            <input
                                className="input input-bordered md:col-span-2 w-full"
                                placeholder="Receiver Name"
                                {...register("receiverName", { required: true })}
                            />
                            <input
                                className="input input-bordered md:col-span-2 w-full"
                                placeholder="Address"
                                {...register("receiverAddress", { required: true })}
                            />
                            <input
                                className="input input-bordered w-full"
                                placeholder="Phone"
                                {...register("receiverContact", { required: true })}
                            />
                            {/* Region */}
                            <select
                                className="select select-bordered w-full"
                                {...register("receiverRegion", { required: true })}
                            >
                                <option value="">Select Region</option>
                                {regions.map((region) => (
                                    <option key={region} value={region}>
                                        {region}
                                    </option>
                                ))}
                            </select>
                            {/* Service Center */}
                            <select
                                className="select select-bordered md:col-span-2 w-full"
                                {...register("receiverServiceCenter", { required: true })}
                            >
                                <option value="">Select Service Center</option>
                                {receiverCenters.map((sc) => (
                                    <option key={sc} value={sc}>
                                        {sc}
                                    </option>
                                ))}
                            </select>

                            <input
                                className="input input-bordered md:col-span-2 w-full"
                                placeholder="Delivery Instruction"
                                {...register("deliveryInstruction", { required: true })}
                            />
                        </div>
                    </div>
                </div>

                <div className="flex flex-wrap gap-4 items-center">
                    <p className="text-sm align-middle">* PickUp Time 4pm - 7pm Approx.</p>
                </div>

                <button type="submit" className="btn bg-[#33d022]">Proceed to Confirm Booking</button>
            </form>
        </div>
    );
};

export default SendParcel;