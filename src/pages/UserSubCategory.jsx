import { NavLink, useParams } from "react-router-dom";
import useSWR from "swr";
import SecondHeader from "../components/Homepage/SecondHeader";
import Navbar from "../components/Homepage/navbar/Navbar";
import Items from "../components/Items/Items";

function UserSubCategory() {
  const fetcher = (...args) => fetch(...args).then((res) => res.json());
  const params = useParams();

  const { data, error } = useSWR(
    `/api/v1/subcategory/product/${params.id}`,
    fetcher
  );

  if (data) {
    return (
      <div>
        <SecondHeader />
        <Navbar />

        <div className="flex w-11/12 mx-auto my-3">
          <div className="hidden md:block w-64 shadow-md px-5 py-2">
            <h1 className="text-2xl text-gray-700 font-bold">Filter By</h1>
            <hr className="my-2" />
            <h3 className="text-gray-500 text-lg">Brands</h3>
            <ul>
              <li className="py-1">
                <input
                  type="checkbox"
                  name="brands"
                  id="brands"
                  className="checked:accent-red-400"
                />{" "}
                LG
              </li>

              <li className="py-1">
                <input
                  type="checkbox"
                  name="brands"
                  id="brands"
                  className="checked:accent-red-400"
                />{" "}
                CG
              </li>

              <li className="py-1">
                <input
                  type="checkbox"
                  name="brands"
                  id="brands"
                  className="checked:accent-red-400"
                />{" "}
                Samsung
              </li>

              <li className="py-1">
                <input
                  type="checkbox"
                  name="brands"
                  id="brands"
                  className="checked:accent-red-400"
                />{" "}
                MI
              </li>
            </ul>

            <hr className="my-2" />
            <h3 className="text-gray-500 text-lg">Price Filter</h3>
            <ul>
              <li className="py-1 text-sm text-gray-400 hover:text-gray-700">
                $20 - $50
              </li>

              <li className="py-1 text-sm text-gray-400 hover:text-gray-700">
                $50 - $80
              </li>

              <li className="py-1 text-sm text-gray-400 hover:text-gray-700">
                $80 - $90
              </li>

              <li className="py-1 text-sm text-gray-400 hover:text-gray-700">
                $200+
              </li>
            </ul>
          </div>
          <div className="">
            <h1 className="text-2xl text-gray-700 font-bold px-4 py-5">
              {data.sub.subcategory_name}
            </h1>
            <div className="grid grid-cols-3 md:grid-cols-5 gap-10 px-5">
              {data.data.map((product) => {
                return (
                  <NavLink to={`/product/view/${product.id}`}>
                    <Items
                      item_name={product.name}
                      price={product.price}
                      key={product.id}
                      image={product.photopath1}
                      discount_price={product.discountedprice}
                    />
                  </NavLink>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default UserSubCategory;
