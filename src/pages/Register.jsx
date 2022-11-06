import Footer from "../components/Footer";
import SecondHeader from "../components/Homepage/SecondHeader";

import { string, object, number, ref, mixed } from "yup";
import { Formik } from "formik";
import { NavLink, useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  const registerScheme = object({
    email: string().email().required(),
    name: string().required(),
    mobile: number().required(),
    password: string().required(),
    confirm_password: string()
      .oneOf([ref("password"), null], "Confirm Password doesn't must match")
      .required("Confirm Password is Required"),
    address: string().required(),
    profile_photo: mixed().nullable("Profile Photo is Required"),
    gender: string().required(),
  });
  return (
    <>
      <SecondHeader />
      <div className="w-11/12 mx-auto">
        <div className="grid md:grid-cols-2 my-5 gap-10">
          <div className="hidden md:block">
            <img src="/signup.svg" alt="" />
          </div>
          <div>
            <div className="flex justify-center items-center h-full">
              <div className="w-full">
                <h1 className="text-4xl my-2 font-bold text-gray-700">
                  Register
                </h1>
                <Formik
                  initialValues={{
                    email: "",
                    password: "",
                    name: "",
                    mobile: "",
                    confirm_password: "",
                    address: "",
                    profile_photo: "",
                    gender: "",
                  }}
                  validationSchema={registerScheme}
                  validateOnChange={false}
                  onSubmit={async (values) => {
                    console.log(values);
                    const formData = new FormData();
                    formData.append("email", values.email);
                    formData.append("password", values.password);
                    formData.append(
                      "confirm_password",
                      values.confirm_password
                    );
                    formData.append("name", values.name);
                    formData.append("phone_number", values.mobile);
                    formData.append("address", values.address);
                    formData.append("profile_photo", values.profile_photo);
                    formData.append("gender", values.gender);

                    const response = await fetch(
                      "https://api.hamroelectronics.com.np/api/v1/register",
                      {
                        body: formData,
                        method: "POST",
                      }
                    );

                    response.json().then((data) => {
                      if (data.token) {
                        localStorage.setItem("token", data.token);
                        navigate("/");
                      }
                      if (data.details) {
                        const email = data.details["email"];
                        console.log(email);
                      }
                    });
                  }}
                >
                  {({
                    values,
                    errors,
                    handleChange,
                    handleSubmit,
                    setFieldValue,
                  }) => {
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

                        <div className="my-5">
                          <label
                            htmlFor="gender"
                            className="block text-gray-600 py-1 "
                          >
                            Select Gender
                          </label>
                          <select
                            name="gender"
                            id="gender"
                            onChange={handleChange}
                            className="outline-none rounded-full shadow-sm focus-visible:shadow-md px-4 py-2 border border-gray-400 focus-visible:border-gray-700 w-full"
                          >
                            <option disabled selected>
                              -- Select Gender --
                            </option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                          </select>

                          <p className="text-red-500 text-sm">
                            {errors.gender}
                          </p>
                        </div>

                        <div className="my-5">
                          <div className="mx-2">
                            <p className="my-2 text-gray-500 ">
                              Select Profile Picture
                            </p>
                            <label
                              htmlFor="profile_photo"
                              className="my-2 text-gray-500 "
                            >
                              <div className="w-[250px] h-[300px] border-2 border-dashed flex items-center justify-center ">
                                {values.profile_photo ? (
                                  <img
                                    src={URL.createObjectURL(
                                      values.profile_photo
                                    )}
                                    className="w-full h-full border border-gray-200 rounded-lg shadow-lg p-1 object-cover"
                                    alt=""
                                  />
                                ) : (
                                  <i className="text-6xl text-gray-300 ri-add-line "></i>
                                )}
                              </div>
                            </label>
                            <input
                              type="file"
                              hidden
                              name="profile_photo"
                              id="profile_photo"
                              onChange={(e) => {
                                setFieldValue(
                                  "profile_photo",
                                  e.currentTarget.files[0]
                                );
                              }}
                              className="file:border-none file:bg-red-400 file:text-white file:hover:bg-red-500 w-full file:shadow-gray-100 file:rounded-md file:shadow-md py-2 px-3 outline-none focus-visible:border-gray-600 my-2"
                            />
                            <p className="text-sm text-red-500 pb-3">
                              {errors.profile_photo}
                            </p>
                          </div>
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
