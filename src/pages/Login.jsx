import Footer from "../components/Footer";
import SecondHeader from "../components/Homepage/SecondHeader";
import { string, object } from "yup";
import { Formik } from "formik";
import { NavLink, useNavigate } from "react-router-dom";

import { toast } from "react-toastify";

function Login() {
  const navigate = useNavigate();
  const loginScheme = object({
    email: string().email().required(),
    password: string().required(),
  });

  return (
    <>
      <SecondHeader />
      <div className="w-11/12 mx-auto">
        <div className="grid md:grid-cols-2 my-5 gap-10">
          <div className="hidden md:block">
            <img src="/login.svg" alt="" />
          </div>
          <div>
            <div className="flex justify-center items-center h-full">
              <div className="w-full">
                <h1 className="text-4xl my-2 font-bold text-gray-700">Login</h1>
                <Formik
                  initialValues={{ email: "", password: "" }}
                  validationSchema={loginScheme}
                  onSubmit={async (values) => {
                    const response = await fetch(
                      "http://api.hamroelectronics.com.np/api/v1/login",
                      {
                        method: "POST",
                        body: JSON.stringify(values),
                        headers: {
                          "Content-Type": "application/json",
                        },
                      }
                    );

                    response.json().then((data) => {
                      if (data.success === false) {
                        toast(data.message, {
                          type: "error",
                        });
                      }
                      if (data.success === true) {
                        toast(data.message, {
                          type: "success",
                        });

                        localStorage.setItem("token", data.token);
                        navigate("/");
                      }
                    });
                  }}
                >
                  {({ errors, handleChange, handleSubmit }) => {
                    return (
                      <form className="w-10/12" onSubmit={handleSubmit}>
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
                        <div className="flex justify-end">
                          <a
                            href=""
                            className="text-sm text-indigo-500 hover:text-indigo-700"
                          >
                            Forget Password ?
                          </a>
                        </div>
                        <button
                          type="submit"
                          className="w-full rounded-full bg-indigo-500 hover:bg-indigo-600 text-white py-2 my-5"
                        >
                          Login
                        </button>

                        <div className="flex justify-center items-center text-sm">
                          <span className="text-gray-400 mx-2">
                            Don't have a account yet?
                          </span>
                          <NavLink
                            to="/register"
                            className="text-sm text-gray-500 hover:text-gray-700"
                          >
                            Register
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

export default Login;
