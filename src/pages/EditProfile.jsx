import SecondHeader from "../components/Homepage/SecondHeader";
import { string, object, number, ref, mixed } from "yup";
import { Formik } from "formik";
import { json, NavLink, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Homepage/navbar/NavBar";
import TopHeader from "../components/Homepage/TopHeader";
import useSWR from "swr";
import { toast } from "react-toastify";
import Spinner from "../components/utils/Spinner";

function EditProfile() {
  const fetcher = (...args) =>
    fetch(...args, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    }).then((res) => res.json());

  const { data, error } = useSWR(
    "http://api.hamroelectronics.com.np/api/v1/user",
    fetcher
  );

  const detailsSchema = object({
    email: string().email().required(),
    name: string().required(),
    phone_number: number().required(),
    address: string().required(),
    profile_photo: mixed().nullable("Profile Photo is Required"),
  });

  const passwordSchema = object({
    current_password: string().required(),
    new_password: string().required(),
    re_password: string()
      .oneOf([ref("new_password"), null], "Confirm Password doesn't must match")
      .required("Confirm Password is Required"),
  });

  const navigate = useNavigate();

  if (error) {
    if (localStorage.getItem("token")) {
      navigate("/500");
    } else {
      navigate("/login");
    }
  }

  if (!data) {
    return <Spinner />;
  }

  if (data) {
    return (
      <>
        <TopHeader />
        <SecondHeader />
        <Navbar />
        <div className="w-11/12 mx-auto">
          <h1 className="text-gray-700 text-xl md:text-2xl font-bold mt-7">
            Edit Profile
          </h1>
          <hr className="my-2" />
          <div className="grid md:grid-cols-2 gap-10">
            <div>
              <div className="border border-gray-200 rounded-md p-5">
                <Formik
                  initialValues={{
                    email: data.user.email,
                    name: data.user.name,
                    phone_number: data.user.phone_number,
                    address: data.user.address,
                    profile_photo: "",
                  }}
                  validationSchema={detailsSchema}
                  validateOnChange={false}
                  onSubmit={(values) => {
                    const formData = new FormData();
                    formData.append("email", values.email);
                    formData.append("name", values.name);
                    formData.append("phone_number", values.phone_number);
                    formData.append("address", values.address);
                    formData.append("profile_photo", values.profile_photo);

                    console.log(values);
                    fetch(
                      "http://api.hamroelectronics.com.np/api/v1/user/update",
                      {
                        method: "Post",
                        body: formData,
                        headers: {
                          Authorization: `Bearer ${localStorage.getItem(
                            "token"
                          )}`,
                        },
                      }
                    ).then((res) => {
                      res.json().then((data) => {
                        console.log(data);
                        if (data.status) {
                          toast(data.message, {
                            type: "success",
                          });
                        }
                      });
                    });
                  }}
                >
                  {({
                    errors,
                    handleChange,
                    handleSubmit,
                    setFieldValue,
                    values,
                  }) => {
                    return (
                      <form className="w-10/12" onSubmit={handleSubmit}>
                        <div className="my-5 relative">
                          <label htmlFor="profile_photo">
                            <img
                              src={
                                values.profile_photo == ""
                                  ? `http://api.hamroelectrics.com.np/storage/${data.user.profile_photo}`
                                  : URL.createObjectURL(values.profile_photo)
                              }
                              alt=""
                              className="w-32 h-32 rounded-full mx-auto"
                            />
                            <div className=" justify-center text-gray-600 flex items-center right-0 top">
                              <p>
                                <i class="ri-edit-box-line px-1 "></i>{" "}
                              </p>
                              <p>Change Profile</p>
                            </div>
                          </label>
                          <input
                            type="file"
                            name="profile_photo"
                            id="profile_photo"
                            className="hidden"
                            onChange={(e) => {
                              setFieldValue(
                                "profile_photo",
                                e.currentTarget.files[0]
                              );
                            }}
                          />
                        </div>
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
                            value={values.name}
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
                            value={values.email}
                            className="outline-none rounded-full shadow-sm focus-visible:shadow-md px-4 py-2 border border-gray-400 focus-visible:border-gray-700 w-full"
                            placeholder="Enter Email Address"
                          />
                          <p className="text-red-500 text-sm">{errors.email}</p>
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
                            id="phone_number"
                            name="phone_number"
                            value={values.phone_number}
                            onChange={handleChange}
                            className="outline-none rounded-full shadow-sm focus-visible:shadow-md px-4 py-2 border border-gray-400 focus-visible:border-gray-700 w-full"
                            placeholder="Enter Phone Number "
                          />
                          <p className="text-red-500 text-sm">
                            {errors.phone_number}
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
                            value={values.address}
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
                    new_password: "",
                    re_password: "",
                  }}
                  validationSchema={passwordSchema}
                  validateOnChange={false}
                  onSubmit={(values) => {
                    const formData = new FormData();
                    formData.append(
                      "current_password",
                      values.current_password
                    );
                    formData.append("new_password", values.new_password);
                    formData.append("re_password", values.re_password);
                    fetch(
                      "http://api.hamroelectronics.com.np/api/v1/user/changepass",
                      {
                        method: "Post",
                        body: formData,
                        headers: {
                          contentType: "application/json",
                          Authorization: `Bearer ${localStorage.getItem(
                            "token"
                          )}`,
                        },
                      }
                    ).then((res) => {
                      res.json().then((data) => {
                        console.log(data);
                        if (data.status) {
                          toast(data.message, {
                            type: "success",
                          });
                          localStorage.removeItem("token");
                          navigate("/login");
                        } else {
                          toast(data.message, {
                            type: "error",
                          });
                        }
                      });
                    });
                  }}
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
                            htmlFor="new_password"
                            className="block text-gray-600 py-1 "
                          >
                            New Password
                          </label>
                          <input
                            type="password"
                            id="new_password"
                            name="new_password"
                            onChange={handleChange}
                            className="outline-none rounded-full shadow-sm focus-visible:shadow-md px-4 py-2 border border-gray-400 focus-visible:border-gray-700 w-full"
                            placeholder="Enter password "
                          />
                          <p className="text-red-500 text-sm">
                            {errors.new_password}
                          </p>
                        </div>

                        <div className="my-5">
                          <label
                            htmlFor="re_password"
                            className="block text-gray-600 py-1 "
                          >
                            Confirm Password
                          </label>
                          <input
                            type="password"
                            id="re_password"
                            name="re_password"
                            onChange={handleChange}
                            className="outline-none rounded-full shadow-sm focus-visible:shadow-md px-4 py-2 border border-gray-400 focus-visible:border-gray-700 w-full"
                            placeholder="Confirm password "
                          />
                          <p className="text-red-500 text-sm">
                            {errors.re_password}
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
}

export default EditProfile;
