import { NavLink, useNavigate, useParams } from "react-router-dom";
import useSWR from "swr";
import SecondHeader from "../components/Homepage/SecondHeader";
import Navbar from "../components/Homepage/navbar/Navbar";
import Items from "../components/Items/Items";
import ServerError from "../pages/500";
import TopHeader from "../components/Homepage/TopHeader";
import { useEffect, useState } from "react";
import Spinner from "../components/utils/Spinner";

function UserSubCategory() {
  const fetcher = (...args) => fetch(...args).then((res) => res.json());
  const params = useParams();

  const { data: brandData, error: brandError } = useSWR(
    `https://api.hamroelectronics.com.np/api/v1/fetchBrand`,
    fetcher
  );

  const [products, setProducts] = useState([]);
  const [filter, setFilter] = useState([]);
  const [loading, setLoading] = useState(true);
  const [subName, setSubName] = useState("");

  useEffect(() => {
    fetch(
      `https://api.hamroelectronics.com.np/api/v1/subcategory/product/${params.id}`
    ).then((res) => {
      res.json().then((data) => {
        setProducts(data.data);

        setSubName(data.sub.subcategory_name);
        setLoading(false);
      });
    });
  }, [params.id]);

  const [maxPrice, setMaxPrice] = useState(0);
  const [minPrice, setMinPrice] = useState(0);

  useEffect(() => {
    if (products?.length > 0) {
      let max = products[0].price;
      let min = products[0].price;
      products.forEach((product) => {
        if (product.price > max) {
          max = product.price;
        }
        if (product.price < min) {
          min = product.price;
        }
      });
      setMaxPrice(max);
      setMinPrice(min);
    }
  }, [products]);

  function changePrice() {
    let productData = products.map((product) => {
      if (product.price >= minPrice && product.price <= maxPrice) {
        return product;
      }
    });
    let priceData = productData.filter((product) => product !== undefined);

    setProducts(priceData);
  }

  if (loading) {
    return <Spinner />;
  }
  // if (error) {
  //   if (localStorage.getItem("token")) {
  //     return <ServerError />;
  //   } else {
  //     navigate("/login");
  //   }
  // }

  let dBrands = [];
  if (!loading && brandData) {
    {
      products.map((product) => {
        brandData.data.map((brand) => {
          if (product.brand_id == brand.id) {
            dBrands.push(brand);
          }
        });
      });
    }

    let dBrand = dBrands.filter((item, index) => {
      return dBrands.indexOf(item) === index;
    });

    return (
      <div>
        <TopHeader />
        <SecondHeader />
        <Navbar />

        <div className="flex w-11/12 mx-auto my-3">
          <div className="hidden md:block w-64 shadow-md px-5 py-2">
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
                        let filteredData = products.filter((product) => {
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
            {/* Price Filter Open */}
            <h3 className="text-gray-500 text-lg">Price Range</h3>
            <div className="flex my-3">
              <input
                type="text"
                name=""
                id=""
                className="border border-gray-50 rounded-md shadow w-20 px-4 py-1 text-sm hover:border-gray-400 focus-visible:border-gray-500 outline-none"
                onChange={(e) => {
                  setMinPrice(e.target.value);
                }}
                value={minPrice}
              />
              <span className="text-gray-500 font-bold px-2">-</span>
              <input
                type="text"
                name=""
                id=""
                className="border border-gray-50 rounded-md shadow w-20 px-4 py-1 text-sm hover:border-gray-400 focus-visible:border-gray-500 outline-none"
                onChange={(e) => {
                  setMaxPrice(e.target.value);
                }}
                value={maxPrice}
              />
            </div>
            <div className="flex justify-center">
              <button
                className="bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg shadow px-4 py-1 text-sm"
                onClick={() => changePrice()}
              >
                Set Price
              </button>
              <button
                className="bg-amber-500 hover:bg-amber-600 mx-2 text-white rounded-lg shadow px-4 py-1 text-sm"
                onClick={() => setReset(!reset)}
              >
                Reset
              </button>
            </div>
            {/* Price Filter Close */}
          </div>
          <div className="w-fit">
            <h1 className="text-2xl text-gray-700 font-bold px-4 py-5">
              {subName}
            </h1>
            {filter.length > 0 ? (
              <div>
                <div className="grid grid-cols-3 md:grid-cols-5 gap-10 px-5">
                  {filter.map((product) => {
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
                  })}
                </div>
              </div>
            ) : (
              <div>
                <div className="grid grid-cols-3 md:grid-cols-5 gap-10 px-5">
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
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default UserSubCategory;
