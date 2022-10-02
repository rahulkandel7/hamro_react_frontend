import SecondHeader from "../components/Homepage/SecondHeader";
import Navbar from "../components/Homepage/navbar/NavBar";
import { NavLink } from "react-router-dom";
import Footer from "../components/Footer";

function Profile() {
  return (
    <div className="bg-gray-50 h-full">
      <SecondHeader />
      <Navbar />
      <div className="w-9/12 mx-auto bg-white shadow-md rounded-md  my-10 p-10 relative">
        <div>
          <div className="flex items-center">
            <img
              src="/item1.jpeg"
              alt=""
              className="w-28 h-28 object-cover rounded-full shadow-md"
            />
            <div className="px-5">
              <p className="text-xl font-bold text-gray-800">Demo Name</p>
              <p className="text-sm text-gray-600">Demo Address</p>
            </div>
          </div>

          <div className="my-5">
            <h1 className="text-xl font-bold">My Details</h1>
            <hr className="my-2" />
            <div>
              <table>
                <tbody>
                  <tr>
                    <td className="font-bold text-gray-600 px-2 py-2">Name:</td>
                    <td className="font-semibold text-gray-800 px-2 py-2">
                      Demo
                    </td>
                  </tr>

                  <tr>
                    <td className="font-bold text-gray-600 px-2 py-2">
                      Address:
                    </td>
                    <td className="font-semibold text-gray-800 px-2 py-2">
                      Demo Address
                    </td>
                  </tr>

                  <tr>
                    <td className="font-bold text-gray-600 px-2 py-2">
                      Email:
                    </td>
                    <td className="font-semibold text-gray-800 px-2 py-2">
                      demo@demo.com
                    </td>
                  </tr>

                  <tr>
                    <td className="font-bold text-gray-600 px-2 py-2">
                      Phone:
                    </td>
                    <td className="font-semibold text-gray-800 px-2 py-2">
                      9815209300
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="absolute top-5 right-2">
            <NavLink to="/profile/edit">
              <button className="px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-md shadow-md mx-3">
                Edit Profile
              </button>
            </NavLink>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Profile;
