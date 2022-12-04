import { Formik } from "formik";
import { toast } from "react-toastify";
import useSWR from "swr";
import { number, object, string } from "yup";

function Checkout(props) {
  const fetcher = (...args) =>
    fetch(...args, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }).then((res) => res.json());
  const { data, error } = useSWR(
    "https://api.hamroelectronics.com.np/api/v1/user",
    fetcher
  );

  const checkoutSchema = object({
    fullname: string().required("Please Provide Your Name "),
    phone: number().required("Please Provide Your Phone Number"),
    shipping_address: string().required("Please Provide Your Shipping Address"),
  });
  if (data) {
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
                    fullname: data.user.name,
                    shipping_address: data.user.address,
                    phone: data.user.phone_number,
                  }}
                  validationSchema={checkoutSchema}
                  onSubmit={(values) => {
                    if (props.shippingArea == "") {
                      toast("Please Select Shipping Area", {
                        type: "error",
                      });
                      return;
                    } else {
                      let carts = [];

                      props.carts.map((cart) => {
                        carts.push(cart.id);
                      });

                      const formData = new FormData();

                      formData.append("cart_id", carts);
                      formData.append("shipping_id", props.shippingId);
                      formData.append("coupon_id", props.couponId);
                      formData.append("coupon_amount", props.couponDiscount);
                      formData.append("delivery_charge", props.shippingPrice);
                      formData.append(
                        "shipping_address",
                        values.shipping_address
                      );
                      formData.append("phone", values.phone);
                      formData.append("fullname", values.fullname);

                      fetch(
                        "https://api.hamroelectronics.com.np/api/v1/order/store",
                        {
                          method: "POST",
                          headers: {
                            Authorization: `Bearer ${localStorage.getItem(
                              "token"
                            )}`,
                          },
                          body: formData,
                        }
                      ).then((res) => {
                        res.json().then((data) => {
                          if (data.status) {
                            toast(data.message, {
                              type: "success",
                            });

                            props.carts.map((cart) => {
                              const formData = new FormData();
                              formData.append("ordered", 1);
                              fetch(
                                `https://api.hamroelectronics.com.np/api/v1/cart/update/ordered/${cart.id}`,
                                {
                                  method: "POST",
                                  headers: {
                                    Authorization: `Bearer ${localStorage.getItem(
                                      "token"
                                    )}`,
                                  },
                                  body: formData,
                                }
                              ).then((res) => {
                                props.hide();
                              });
                            });


                          }
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
                            value={values.fullname}
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
                            value={values.shipping_address}
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
                            Mobile Number{" "}
                            <span className="text-red-500">*</span>{" "}
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
                              value={values.phone}
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
                            Payment Method
                            <span className="text-red-500">*</span>{" "}
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
}

export default Checkout;
