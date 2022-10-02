import NavBar from "../components/Homepage/navbar/NavBar";
import SecondHeader from "../components/Homepage/SecondHeader";
import { string, object, number, ref, mixed } from "yup";
import { Formik } from "formik";
import { NavLink } from "react-router-dom";
import Footer from "../components/Footer";

function EditProfile() {
  const detailsSchema = object({
    email: string().email().required(),
    name: string().required(),
    mobile: number().required(),
    address: string().required(),
    profile_photo: mixed().required("Profile Photo is Required"),
  });

  const passwordSchema = object({
    current_password: string().required(),
    password: string().required(),
    confirm_password: string()
      .oneOf([ref("password"), null], "Confirm Password doesn't must match")
      .required("Confirm Password is Required"),
  });
  return (
    <>
      <SecondHeader />
      <NavBar />
      <div className="w-11/12 mx-auto">
        <h1 className="text-gray-700 text-2xl font-bold">Edit Profile</h1>
        <hr className="my-2" />
        <div className="grid grid-cols-2 gap-10">
          <div>
            <div className="border border-gray-200 rounded-md p-5">
              <Formik
                initialValues={{
                  email: "",
                  name: "",
                  mobile: "",
                  password: "",
                  address: "",
                  profile_photo: "",
                }}
                validationSchema={detailsSchema}
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

                      {/* <div className="my-5">
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
                      </div> */}

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
                        <p className="text-red-500 text-sm">{errors.mobile}</p>
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
                        <p className="text-red-500 text-sm">{errors.address}</p>
                      </div>

                      <button
                        type="submit"
                        className="w-full rounded-full bg-indigo-500 hover:bg-indigo-600 text-white py-2 my-5"
                      >
                        Update Details
                      </button>
                    </form>
                  );
                }}
              </Formik>
            </div>
          </div>
          <div>
            <div className="border border-gray-200 rounded-md p-5">
              <Formik
                initialValues={{
                  current_password: "",
                  password: "",
                  confirm_password: "",
                }}
                validationSchema={passwordSchema}
                validateOnChange={false}
              >
                {({ errors, handleChange, handleSubmit }) => {
                  return (
                    <form className="w-10/12" onSubmit={handleSubmit}>
                      <div className="my-5">
                        <label
                          htmlFor="current_password"
                          className="block text-gray-600 py-1 "
                        >
                          Current Password
                        </label>
                        <input
                          type="password"
                          id="current_password"
                          name="current_password"
                          onChange={handleChange}
                          className="outline-none rounded-full shadow-sm focus-visible:shadow-md px-4 py-2 border border-gray-400 focus-visible:border-gray-700 w-full"
                          placeholder="Enter Current password "
                        />
                        <p className="text-red-500 text-sm">
                          {errors.current_password}
                        </p>
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

                      <button
                        type="submit"
                        className="w-full rounded-full bg-indigo-500 hover:bg-indigo-600 text-white py-2 my-5"
                      >
                        Update Password
                      </button>
                    </form>
                  );
                }}
              </Formik>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default EditProfile;
