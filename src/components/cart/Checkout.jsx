function Checkout(props) {
  return (
    <>
      <div>
        <div className="fixed overflow-auto top-0 left-0 w-full h-full pb-20 bg-white bg-opacity-25 backdrop-blur-sm z-50">
          <div className="flex justify-center items-center">
            <div className="mt-8 shadow-xl bg-white rounded-lg py-1 px-6 md:w-5/12">
              <h1 className="text-4xl py-4 text-center font-semibold text-blue-900">
                {" "}
                Billing Info
              </h1>
              <h2 className="text-2xl text-semibold my-3">
                Total Price: <span id="totalpricemodal">10999</span>
              </h2>

              <form>
                <div className="mr-3">
                  <label
                    for="fullname"
                    className="block text-gray-600 text-sm uppercase"
                  >
                    Full Name<span className="text-red-500">*</span>{" "}
                  </label>
                  <input
                    type="text"
                    name="fullname"
                    placeholder="Full Name"
                    id="fullname"
                    className="border-gray-300 border py-1 px-4 w-full rounded-md mt-2 focus:border-indigo-300 focus:ring-indigo-300 text-gray-500 outline-none "
                  />
                </div>

                <div className="mt-3">
                  <label
                    for="shipping"
                    className="block text-gray-600 text-sm uppercase"
                  >
                    {" "}
                    Shipping Address<span className="text-red-500">*</span>{" "}
                  </label>
                  <input
                    type="text"
                    name="shipping"
                    id="shipping"
                    className="border-gray-300 w-full border py-1 px-4 rounded-md mt-2 focus:border-indigo-300 focus:ring-indigo-300 text-gray-500 outline-none "
                    placeholder="Ex:- Sahidchowk"
                  />
                </div>

                <div className="mt-3">
                  <label
                    for="phone"
                    className="block text-gray-600 text-sm uppercase"
                  >
                    Mobile Number <span className="text-red-500">*</span>{" "}
                  </label>
                  <div className="flex">
                    <input
                      type="text"
                      value="+977"
                      readonly=""
                      className="border-gray-300 w-16 border py-1 px-1 rounded-md mt-2 focus:border-indigo-300 focus:ring-indigo-300 text-gray-500 mr-2 "
                    />
                    <input
                      type="text"
                      name="phone"
                      id="phone"
                      className="border-gray-300 w-full border py-1 px-4 rounded-md mt-2 focus:border-indigo-300 focus:ring-indigo-300 text-gray-500 outline-none "
                    />
                  </div>
                </div>

                <div className="mt-3">
                  <label
                    for="payment"
                    className="block text-gray-600 text-sm uppercase"
                  >
                    {" "}
                    Payment Method<span className="text-red-500">*</span>{" "}
                  </label>

                  <div>
                    <input
                      type="checkbox"
                      name="payment"
                      id="payment"
                      value="COD"
                      className="border-gray-300 border py-1 px-4  rounded-md focus:border-indigo-300 focus:ring-indigo-300 text-gray-500 outline-none "
                      checked=""
                      disabled=""
                    />{" "}
                    <label className="text-gray-600"> Cash On Delivery</label>
                  </div>
                </div>

                <div className="my-3 flex justify-center">
                  <button
                    className="rounded-md shadow-md  bg-indigo-500 text-white  px-10 py-2 mt-3 cursor-pointer hover:bg-indigo-600"
                    onclick="return post()"
                  >
                    {" "}
                    Place Order{" "}
                  </button>
                  <button
                    className="rounded-md shadow-md bg-red-500 text-white w-40 py-2 mt-3 text-center cursor-pointer hover:bg-red-600 px-1 mx-2"
                    onClick={props.hide}
                  >
                    {" "}
                    Cancel{" "}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Checkout;
