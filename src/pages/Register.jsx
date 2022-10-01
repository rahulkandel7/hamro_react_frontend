import Footer from "../components/Footer";
import SecondHeader from "../components/Homepage/SecondHeader";

import { string, object, number, ref, mixed } from "yup";
import { Formik } from "formik";
import { NavLink } from "react-router-dom";

function Register() {
  const registerScheme = object({
    email: string().email().required(),
    name: string().required(),
    mobile: number().required(),
    password: string().required(),
    confirm_password: string()
      .oneOf([ref("password"), null], "Confirm Password doesn't must match")
      .required("Confirm Password is Required"),
    address: string().required(),
    profile_photo: mixed().required("Profile Photo is Required"),
  });
  return (
    <>
      <SecondHeader />
      <div className="w-11/12 mx-auto">
        <div className="grid grid-cols-2 my-5 gap-10">
          <div>
            <img src="/signup.svg" alt="" />
          </div>
          <div>
            <div className="flex justify-center items-center h-full">
              <div className="w-full">
                <h1 className="text-4xl my-2 font-bold text-gray-700">
                  Register
                </h1>
                <Formik
                  initialValues={{ email: "", password: "" }}
                  validationSchema={registerScheme}
                  validateOnChange={false}
                >
                  {({ errors, handleChange, handleSubmit }) => {
                    return (
                      <form className="w-10/12" onSubmit={handleSubmit}>
                        <div className="my-5">
                          <label
                            htmlFor="name"
                            className="block text-gray-600 py-1 "
                          >
                            User Name
                          </label>
                          <input
                            type="name"
                            id="name"
                            onChange={handleChange}
                            name="name"
                            className="outline-none rounded-full shadow-sm focus-visible:shadow-md px-4 py-2 border border-gray-400 focus-visible:border-gray-700 w-full"
                            placeholder="Enter name "
                          />
                          <p className="text-red-500 text-sm">{errors.name}</p>
                        </div>

                        <div className="my-5">
                          <label
                            htmlFor="email"
                            className="block text-gray-600 py-1 "
                          >
                            Email
                          </label>
                          <input
                            type="email"
                            id="email"
                            onChange={handleChange}
                            name="email"
                            className="outline-none rounded-full shadow-sm focus-visible:shadow-md px-4 py-2 border border-gray-400 focus-visible:border-gray-700 w-full"
                            placeholder="Enter Email Address"
                          />
                          <p className="text-red-500 text-sm">{errors.email}</p>
                        </div>

                        <div className="my-5">
                          <label
                            htmlFor="password"
                            className="block text-gray-600 py-1 "
                          >
                            Password
                          </label>
                          <input
                            type="password"
                            id="password"
                            name="password"
                            onChange={handleChange}
                            className="outline-none rounded-full shadow-sm focus-visible:shadow-md px-4 py-2 border border-gray-400 focus-visible:border-gray-700 w-full"
                            placeholder="Enter password "
                          />
                          <p className="text-red-500 text-sm">
                            {errors.password}
                          </p>
                        </div>

                        <div className="my-5">
                          <label
                            htmlFor="confirm_password"
                            className="block text-gray-600 py-1 "
                          >
                            Confirm Password
                          </label>
                          <input
                            type="password"
                            id="confirm_password"
                            name="confirm_password"
                            onChange={handleChange}
                            className="outline-none rounded-full shadow-sm focus-visible:shadow-md px-4 py-2 border border-gray-400 focus-visible:border-gray-700 w-full"
                            placeholder="Confirm password "
                          />
                          <p className="text-red-500 text-sm">
                            {errors.confirm_password}
                          </p>
                        </div>

                        <div className="my-5">
                          <label
                            htmlFor="mobile"
                            className="block text-gray-600 py-1 "
                          >
                            Phone Number
                          </label>
                          <input
                            type="text"
                            id="mobile"
                            name="mobile"
                            onChange={handleChange}
                            className="outline-none rounded-full shadow-sm focus-visible:shadow-md px-4 py-2 border border-gray-400 focus-visible:border-gray-700 w-full"
                            placeholder="Enter Phone Number "
                          />
                          <p className="text-red-500 text-sm">
                            {errors.mobile}
                          </p>
                        </div>

                        <div className="my-5">
                          <label
                            htmlFor="address"
                            className="block text-gray-600 py-1 "
                          >
                            Address
                          </label>
                          <input
                            type="text"
                            id="address"
                            name="address"
                            onChange={handleChange}
                            className="outline-none rounded-full shadow-sm focus-visible:shadow-md px-4 py-2 border border-gray-400 focus-visible:border-gray-700 w-full"
                            placeholder="Enter Address "
                          />
                          <p className="text-red-500 text-sm">
                            {errors.address}
                          </p>
                        </div>

                        <button
                          type="submit"
                          className="w-full rounded-full bg-indigo-500 hover:bg-indigo-600 text-white py-2 my-5"
                        >
                          Register
                        </button>

                        <div className="flex justify-center items-center text-sm">
                          <span className="text-gray-400 mx-2">
                            Already Have A Account
                          </span>
                          <NavLink
                            to="/login"
                            className="text-sm text-gray-500 hover:text-gray-700"
                          >
                            Login
                          </NavLink>
                        </div>
                      </form>
                    );
                  }}
                </Formik>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Register;
