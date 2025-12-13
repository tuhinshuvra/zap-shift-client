import merchant from '../../../assets/merchant_customer/merchant_Vector.png';

const BeMerchant = () => {
    return (
        <div className="bg-[url('assets/be-a-merchant-bg.png')] bg-no-repeat  max-w-6xl mx-auto md:p-10 p-4 md:my-20 bg-[#03373D] rounded-3xl ">
            <div className="hero-content flex-col md:flex-row-reverse">
                <img
                    src={merchant}
                    className=" min-w-xsm sm:w-sm lg:w-md -ml-10"
                />
                <div className='col-span-6'>
                    <h1 className=" lg:text-4xl md:text-2xl sm:text-xl  font-bold text-white">Merchant and Customer Satisfaction is Our First Priority</h1>
                    <p className="py-6 text-gray-300">
                        We offer the lowest delivery charge with the highest value along with 100% safety of your product. Pathao courier delivers your parcels in every corner of Bangladesh right on time.
                    </p>

                    <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-5">
                        <button className="btn bg-[#CAEB66] text-black rounded-full border-0 hover:bg-white hover:text-green-900">
                            Become a Merchant
                        </button>

                        <button className="btn btn-outline text-[#CAEB66] border-[#CAEB66] rounded-full hover:bg-white hover:text-black">
                            Earn with ZapShift Courier
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BeMerchant;