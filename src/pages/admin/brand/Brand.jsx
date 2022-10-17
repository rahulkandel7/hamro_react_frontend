import { useState } from "react";
import { NavLink } from "react-router-dom";
import useSWR from "swr";
import AdminLayout from "../../../components/admin/AdminLayout";
import ShowDelete from "../../../components/admin/utils/ShowDelete";
import AddButton from "../../../components/utils/AddButton";

function Category() {
  //* For Fetching Data
  const fetcher = (...args) =>
    fetch(...args, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    }).then((res) => res.json());
  const { data, mutate, error } = useSWR("/api/v1/brand", fetcher);

  //* For searching data
  const [search, setSearch] = useState("");

  //* For deleting data
  const [isDelete, setIsDelete] = useState(false);
  const [id, setId] = useState();

  const toggleIsDelete = () => {
    if (isDelete) {
      setIsDelete(false);
    } else {
      setIsDelete(true);
    }
  };

  //* For Deleteing Category

  async function deleteCategory(id) {
    const category = await fetch(`/api/v1/brand/${id}`, {
      method: "delete",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    console.log(category.json());
    mutate();
    toggleIsDelete();
  }

  //! Show Error
  if (error) {
    return (
      <div>
        <img src="/error.svg" alt="Error" className="w-screen h-screen" />
      </div>
    );
  }

  //*Show Loading
  if (!data && !error) {
    return <h1>Loading</h1>;
  }

  //? Show Data when loaded
  if (data) {
    return (
      <>
        <AdminLayout>
          {sessionStorage.getItem("message")}
          {isDelete ? (
            <ShowDelete
              delete={deleteCategory}
              hideDelete={toggleIsDelete}
              id={id}
            />
          ) : (
            <></>
          )}

          <div className="px-10 py-6 w-full">
            <div className="flex justify-between">
              <h1 className="text-4xl text-gray-700">Brands</h1>

              <NavLink to="create">
                <AddButton name="Add Brand" />
              </NavLink>
            </div>
            <hr className="my-2" />
            <div className="flex justify-end items-center my-3">
              <div className="relative">
                <input
                  type="text"
                  name="search"
                  id="search"
                  className="border border-gray-200 pl-2 outline-none focus-visible:border-gray-600 pr-6 text-gray-500 rounded-md shadow-md py-1"
                  placeholder="Search Brand..."
                  onChange={(e) => {
                    setSearch(e.target.value);
                  }}
                />
                <div className="absolute top-[50%] -translate-y-[50%] right-2 text-gray-500">
                  <i className="ri-search-2-line"></i>
                </div>
              </div>
            </div>
            <div>
              <table className="w-full border border-gray-200 rounded-md shadow-md px-5">
                <thead className="bg-gray-500 ">
                  <tr className="w-full border border-gray-100 text-white">
                    <td className="py-2 px-5 ">S.No</td>
                    <td className="py-2 px-5 ">Brand Name</td>
                    <td className="py-2 px-5 ">Action</td>
                  </tr>
                </thead>
                <tbody>
                  {search === ""
                    ? data.data.map((brand, index) => {
                        return (
                          <tr key={brand.id}>
                            <td className="py-2 px-5 text-gray-600">
                              {index + 1}
                            </td>
                            <td className="py-2 px-5 text-gray-600">
                              {brand.brand_name}
                            </td>

                            <td className="py-2 px-5 text-gray-600">
                              <NavLink to={`edit/${brand.id}`}>
                                <button className="px-6 py-1 rounded-md shadow-lg hover:shadow-xl bg-blue-500 hover:bg-blue-700 text-white mx-2">
                                  Update Brand
                                </button>
                              </NavLink>
                              <button
                                className="px-6 py-1 rounded-md shadow-lg hover:shadow-xl bg-red-500 hover:bg-red-700 text-white mx-2"
                                onClick={() => {
                                  toggleIsDelete();
                                  setId(brand.id);
                                }}
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        );
                      })
                    : data.data
                        .filter((brand) => {
                          if (search === "") {
                            return brand;
                          } else if (
                            brand.brand_name
                              .toLowerCase()
                              .includes(search.toLowerCase())
                          ) {
                            return brand;
                          }
                        })
                        .map((dat, index) => {
                          return (
                            <tr key={dat.id}>
                              <td className="py-2 px-5 text-gray-600">
                                {index + 1}
                              </td>
                              <td className="py-2 px-5 text-gray-600">
                                {dat.brand_name}
                              </td>

                              <td className="py-2 px-5 text-gray-600">
                                <NavLink to={`edit/${dat.id}`}>
                                  <button className="px-6 py-1 rounded-md shadow-lg hover:shadow-xl bg-blue-500 hover:bg-blue-700 text-white mx-2">
                                    Update Category
                                  </button>
                                </NavLink>
                                <button
                                  className="px-6 py-1 rounded-md shadow-lg hover:shadow-xl bg-red-500 hover:bg-red-700 text-white mx-2"
                                  onClick={() => {
                                    toggleIsDelete;
                                  }}
                                >
                                  Delete
                                </button>
                              </td>
                            </tr>
                          );
                        })}
                </tbody>
              </table>
            </div>
            <div></div>
          </div>
        </AdminLayout>
      </>
    );
  }
}

export default Category;
