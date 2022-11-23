import { NavLink, useNavigate, useParams } from "react-router-dom";
import useSWR from "swr";
import SecondHeader from "../components/Homepage/SecondHeader";
import Navbar from "../components/Homepage/navbar/Navbar";
import Items from "../components/Items/Items";
import ServerError from "../pages/500";
import TopHeader from "../components/Homepage/TopHeader";

import Spinner from "../components/utils/Spinner";

function Categories() {
  const fetcher = (...args) => fetch(...args).then((res) => res.json());
  const { data, error } = useSWR(
    "https://api.hamroelectronics.com.np/api/v1/fetchCategory",
    fetcher
  );

  console.log(data);
  if (error) {
    return <ServerError />;
  }
  if (!data) {
    return <Spinner />;
  }

  if (data) {
    return (
      <div>
        <TopHeader />
        <SecondHeader />
        <Navbar />

        <div className=" w-11/12 mx-auto my-3">
          <h1 className="text-4xl text-gray-500 font-bold my-3 text-center">
            All Categories
          </h1>
          <div className="grid grid-cols-2 mt-6">
            {data.categories.map((category) => {
              return (
                <NavLink to={`/category/${category.id}`} key={category.id}>
                  <div>
                    <img
                      src={`https://api.hamroelectronics.com.np/public/${category.photopath}`}
                      alt={category.category_name}
                      className="w-28 h-28 mx-auto rounded-full overflow-hidden object-cover"
                    />

                    <p className="text-gray-700 py-3 text-center">
                      {category.category_name}
                    </p>
                  </div>
                </NavLink>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default Categories;
