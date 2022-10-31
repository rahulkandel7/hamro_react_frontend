import { Formik } from "formik";
import { toast } from "react-toastify";
import { number, object, string } from "yup";

function Checkout(props) {
  const checkoutSchema = object({
    fullname: string().required("Please Provide Your Name "),
    phone: number().required("Please Provide Your Phone Number"),
    shipping_address: string().required("Please Provide Your Shipping Address"),
  });
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
                Total Price: <span>{props.total}</span>
              </h2>

              <Formik
                initialValues={{
                  fullname: "",
                  shipping_address: "",
                  phone: "",
                }}
                validationSchema={checkoutSchema}
                onSubmit={(values) => {
                  if (props.shippingArea == "") {
                    toast("Please Select Shipping Area", {
                      type: "error",
                    });
                    return;
                  } else {
                    props.carts.map((cart) => {
                      fetch("/api/v1/order/store", {
                        method: "POST",
                        headers: {
                          "Content-Type": "application/json",
                          Authorization: `Bearer ${localStorage.getItem(
                            "token"
                          )}`,
                        },
                        body: {
                          cart_id: cart.id,
                          shipping_id: props.shippingId,
                          shipping_address: values.shipping_address,
                          delivery_charge: props.shippingPrice,
                          fullname: values.fullname,
                          phone: values.phone,
                        },
                      }).then((res) => {
                        res.json().then((data) => {
                          if (data.status) {
                            toast(data.message, {
                              type: "success",
                            });
                          }
                        });
                      });
                    });
                  }
                }}
              >
                {({ values, errors, handleChange, handleSubmit }) => {
                  return (
                    <form onSubmit={handleSubmit}>
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
                          onChange={handleChange}
                          className="border-gray-300 border py-1 px-4 w-full rounded-md mt-2 focus:border-indigo-300 focus:ring-indigo-300 text-gray-500 outline-none "
                        />
                        <p className="text-sm text-red-500">
                          {errors.fullname}
                        </p>
                      </div>

                      <div className="mt-3">
                        <label
                          for="shipping_address"
                          className="block text-gray-600 text-sm uppercase"
                        >
                          {" "}
                          Shipping Address
                          <span className="text-red-500">*</span>{" "}
                        </label>
                        <input
                          type="text"
                          name="shipping_address"
                          id="shipping_address"
                          onChange={handleChange}
                          className="border-gray-300 w-full border py-1 px-4 rounded-md mt-2 focus:border-indigo-300 focus:ring-indigo-300 text-gray-500 outline-none "
                          placeholder="Ex:- Sahidchowk"
                        />
                        <p className="text-sm text-red-500">
                          {errors.shipping_address}
                        </p>
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
                            onChange={handleChange}
                            className="border-gray-300 w-full border py-1 px-4 rounded-md mt-2 focus:border-indigo-300 focus:ring-indigo-300 text-gray-500 outline-none "
                          />
                        </div>
                        <p className="text-sm text-red-500">{errors.phone}</p>
                      </div>

                      <div className="mt-3">
                        <label
                          for="payment"
                          className="block text-gray-600 text-sm uppercase"
                        >
                          {" "}
                          Payment Method<span className="text-red-500">
                            *
                          </span>{" "}
                        </label>

                        <div>
                          <input
                            type="checkbox"
                            name="payment"
                            id="payment"
                            value="COD"
                            className="border-gray-300 border py-1 px-4  rounded-md focus:border-indigo-300 focus:ring-indigo-300 text-gray-500 outline-none "
                            checked={true}
                            disabled=""
                          />{" "}
                          <label className="text-gray-600">
                            {" "}
                            Cash On Delivery
                          </label>
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
                  );
                }}
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Checkout;
