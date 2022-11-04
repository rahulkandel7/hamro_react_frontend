import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

function SecondHeader() {
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  useEffect(() => {
    if (search === "") {
      setSearchResults([]);
    } else {
      fetch("/api/v1/products").then((response) => {
        response.json().then((data) => {
          let results = data.data.filter((product) =>
            product.name.toLowerCase().includes(search.toLowerCase())
          );
          setSearchResults(results);
        });
      });
    }
  }, [search]);

  const navigate = useNavigate();

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
                    navigate(`/search/${search}`);
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
              <NavLink to="/cart">
                <button className=" text-gray-500 px-4 py-1 rounded-md flex items-center text-lg hover:text-black ">
                  <i className="ri-shopping-cart-2-line mx-1"></i> cart
                </button>
              </NavLink>

              <NavLink to="/wishlist">
                <button className=" text-gray-500 px-4 py-1 rounded-md flex items-center text-lg hover:text-black ">
                  <i className="ri-heart-3-line mx-1"></i> Wishlist
                </button>
              </NavLink>

              <NavLink to="/profile">
                <button className=" text-gray-500 px-4 py-1 rounded-md flex items-center text-lg hover:text-black ">
                  <i className="ri-user-3-line mx-1"></i> Profile
                </button>
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SecondHeader;
