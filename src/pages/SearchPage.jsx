import { NavLink, useNavigate, useParams } from "react-router-dom";
import useSWR from "swr";
import SecondHeader from "../components/Homepage/SecondHeader";
import Navbar from "../components/Homepage/navbar/Navbar";
import Items from "../components/Items/Items";
import ServerError from "../pages/500";
import TopHeader from "../components/Homepage/TopHeader";
import { useEffect, useState } from "react";

function SearchPage() {
  const fetcher = (...args) => fetch(...args).then((res) => res.json());
  const params = useParams();

  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("https://api.hamroelectronics.com.np/api/v1/products").then((res) => {
      res.json().then((data) => {
        let results = data.data.filter((product) =>
          product.name.toLowerCase().includes(params.query.toLowerCase())
        );
        setProducts(results);
      });
    });
  }, [params.query]);

  const { data, error } = useSWR(
    `https://api.hamroelectronics.com.np/api/v1/products`,
    fetcher
  );

  const navigate = useNavigate();

  console.log(error);
  if (error) {
    if (localStorage.getItem("token")) {
      return <ServerError />;
    } else {
      navigate("/login");
    }
  }

  if (data) {
    return (
      <div>
        <TopHeader />
        <SecondHeader />
        <Navbar />

        <div className=" w-11/12 mx-auto my-3">
          {/* <div className="hidden md:block w-64 shadow-md px-5 py-2">
            <h1 className="text-2xl text-gray-700 font-bold">Filter By</h1>
            <hr className="my-2" />
            <h3 className="text-gray-500 text-lg">Brands</h3>
            <ul>
              {dBrand.map((brand) => {
                return (
                  <li className="py-1" key={brand.id}>
                    <input
                      type="checkbox"
                      name="brands"
                      value={brand.id}
                      id="brands"
                      className="checked:accent-red-400"
                      onChange={(e) => {
                        //filter data
                        let checked = e.target.checked;
                        let value = e.target.value;
                        let filteredData = products.data.filter((product) => {
                          if (checked) {
                            return product.brand_id == value;
                          } else {
                            return product;
                          }
                        });

                        if (!checked) {
                          setFilter([]);
                        }

                        setFilter(filteredData);
                      }}
                    />{" "}
                    {brand.brand_name}
                  </li>
                );
              })}
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
          </div> */}
          <div className="w-fit">
            <h1 className="text-2xl text-gray-700 font-bold px-4 py-5">
              You have searched for {params.query}
            </h1>

            <div>
              <div className="grid grid-cols-3 xl:grid-cols-5 md:grid-cols-4 gap-10 px-5">
                {products.length < 1 ? (
                  <div className="col-span-3 md:col-span-5">
                    <h1 className="text-center text-4xl font-bold text-gray-600">
                      No Products Yet! Comming Soon New Products
                    </h1>
                  </div>
                ) : (
                  products.map((product) => {
                    let off;
                    if (product.discountedprice !== undefined) {
                      off =
                        ((product.price - product.discountedprice) /
                          product.price) *
                        100;
                    }
                    return (
                      <NavLink
                        to={`/product/view/${product.id}`}
                        key={product.id}
                      >
                        <Items
                          item_name={product.name}
                          price={product.price}
                          key={product.id}
                          image={product.photopath1}
                          discount_price={product.discountedprice}
                          off={Math.floor(off)}
                          avg_rating={Math.floor(product.rating)}
                          rating={Math.floor(product.rating_number)}
                        />
                      </NavLink>
                    );
                  })
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SearchPage;
