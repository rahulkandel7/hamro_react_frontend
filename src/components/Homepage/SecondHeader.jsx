import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import useSWR from "swr";

function SecondHeader(props) {
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  useEffect(() => {
    if (search === "") {
      setSearchResults([]);
    } else {
      fetch("https://api.hamroelectronics.com.np/api/v1/products").then(
        (response) => {
          response.json().then((data) => {
            let results = data.data.filter((product) =>
              product.name.toLowerCase().includes(search.toLowerCase())
            );
            setSearchResults(results);
          });
        }
      );
    }
  }, [search]);

  const navigate = useNavigate();

  if (localStorage.getItem("token")) {
    const fetcher = (...args) =>
      fetch(...args, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }).then((res) => res.json());

    const { data, mutate, error } = useSWR(
      "https://api.hamroelectronics.com.np/api/v1/cart",
      fetcher
    );

    if (props.clength > 0) {
      mutate();
    }

    return (
      <>
        <div className="w-full bg-white shadow-md ">
          <div className="w-11/12 mx-auto">
            <div className="flex items-center justify-between py-1 md:py-0">
              <div>
                <NavLink to="/">
                  <img
                    src="/logo.png"
                    alt="Hamro Electronics Logo"
                    className="w-20 md:w-32"
                  />
                </NavLink>
              </div>
              <div className="relative w-full ml-5 md:ml-0 md:w-6/12">
                <input
                  type="text"
                  name="search"
                  id="search"
                  onKeyUp={(e) => {
                    if (e.key === "Enter") {
                      setShowSuggestions(false);

                      if (search.length > 0) {
                        navigate(`/search/${search}`);
                      }
                    }
                    if (e.key === "Escape") {
                      setSearch("");
                    }
                  }}
                  onChange={(e) => {
                    setSearch(e.target.value);
                    setShowSuggestions(true);
                  }}
                  placeholder="I'm looking for....."
                  className="w-full border-gray-400 focus-visible:border-amber-400 border rounded-md py-1 px-5 outline-none "
                />
                <div className="absolute top-[50%] -translate-y-[50%] right-2">
                  <i className="ri-search-2-line text-gray-500"></i>
                </div>
                <div>
                  {showSuggestions ? (
                    <div className="bg-gray-50  shadow-md w-full  h-fit max-h-28 overflow-scroll absolute">
                      {searchResults.map((product) => (
                        <NavLink
                          to={`/product/view/${product.id}`}
                          key={product.id}
                          onClick={() => setSearchResults("")}
                        >
                          <a className="px-5 py-2 text-gray-600 block">
                            {product.name}
                          </a>
                        </NavLink>
                      ))}
                    </div>
                  ) : null}
                </div>
              </div>
              <div className="hidden md:flex">
                <NavLink to="/cart" className="relative">
                  <button className=" text-gray-500 px-4 py-1 rounded-md flex items-center text-xl hover:text-black ">
                    <i className="ri-shopping-cart-2-line mx-1"></i>
                  </button>
                  {localStorage.getItem("token") ? (
                    <span className="bg-indigo-500 text-white text-[0.5rem] px-2 py-1 rounded-full absolute -top-1.5 right-[20%]">
                      {data?.data?.length}
                    </span>
                  ) : null}
                </NavLink>

                <NavLink to="/wishlist">
                  <button className=" text-gray-500 px-4 py-1 rounded-md flex items-center text-xl hover:text-black ">
                    <i className="ri-heart-3-line mx-1"></i>
                  </button>
                </NavLink>

                <NavLink to="/profile">
                  <button className=" text-gray-500 px-4 py-1 rounded-md flex items-center text-xl hover:text-black ">
                    <i className="ri-user-3-line mx-1"></i>
                  </button>
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  } else {
    return (
      <>
        <div className="w-full bg-white shadow-md ">
          <div className="w-11/12 mx-auto">
            <div className="flex items-center justify-between py-1 md:py-0">
              <div>
                <NavLink to="/">
                  <img
                    src="/logo.png"
                    alt="Hamro Electronics Logo"
                    className="w-20 md:w-32"
                  />
                </NavLink>
              </div>
              <div className="relative w-full ml-5 md:ml-0 md:w-6/12">
                <input
                  type="text"
                  name="search"
                  id="search"
                  onKeyUp={(e) => {
                    if (e.key === "Enter") {
                      setShowSuggestions(false);
                      if (search.length > 0) {
                        navigate(`/search/${search}`);
                      }
                    }
                    if (e.key === "Escape") {
                      setSearch("");
                    }
                  }}
                  onChange={(e) => {
                    setSearch(e.target.value);
                    setShowSuggestions(true);
                  }}
                  placeholder="I'm looking for....."
                  className="w-full border-gray-400 focus-visible:border-amber-400 border rounded-md py-1 px-5 outline-none "
                />
                <div className="absolute top-[50%] -translate-y-[50%] right-2">
                  <i className="ri-search-2-line text-gray-500"></i>
                </div>
                <div>
                  {showSuggestions ? (
                    <div className="bg-gray-50  shadow-md w-full  h-fit max-h-28 overflow-scroll absolute">
                      {searchResults.map((product) => (
                        <NavLink
                          to={`/product/view/${product.id}`}
                          key={product.id}
                          onClick={() => setSearchResults("")}
                        >
                          <a className="px-5 py-2 text-gray-600 block">
                            {product.name}
                          </a>
                        </NavLink>
                      ))}
                    </div>
                  ) : null}
                </div>
              </div>
              <div className="hidden md:flex">
                <NavLink to="/cart" className="relative">
                  <button className=" text-gray-500 px-4 py-1 rounded-md flex items-center text-xl hover:text-black ">
                    <i className="ri-shopping-cart-2-line mx-1"></i>
                  </button>
                </NavLink>

                <NavLink to="/wishlist">
                  <button className=" text-gray-500 px-4 py-1 rounded-md flex items-center text-xl hover:text-black ">
                    <i className="ri-heart-3-line mx-1"></i>
                  </button>
                </NavLink>

                <NavLink to="/profile">
                  <button className=" text-gray-500 px-4 py-1 rounded-md flex items-center text-xl hover:text-black ">
                    <i className="ri-user-3-line mx-1"></i>
                  </button>
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default SecondHeader;
