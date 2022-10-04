import { useState } from "react";
import MobileNav from "./MobileNav";
import NavLinks from "./NavLinks";

function NavBar() {
  const categories = [
    {
      id: 1,
      name: "AC",
      subCategory: [
        {
          id: 1,
          name: "LG",
        },
        {
          id: 2,
          name: "Samsung",
        },
        {
          id: 3,
          name: "MI",
        },
      ],
    },
    {
      id: 2,
      name: "Bulb",
      subCategory: [
        {
          id: 4,
          name: "Samung",
        },
        {
          id: 5,
          name: "LG",
        },
        {
          id: 6,
          name: "MI",
        },
      ],
    },
    {
      id: 3,
      name: "Washing Machine",
      subCategory: [
        {
          id: 7,
          name: "LG",
        },
        {
          id: 8,
          name: "LG",
        },
        {
          id: 9,
          name: "LG",
        },
      ],
    },
    {
      id: 4,
      name: "No Sub",
    },
  ];

  const [sideBar, setSideBar] = useState(false);

  const toogleSideBar = () => {
    if (sideBar) {
      setSideBar(false);
    } else {
      setSideBar(true);
    }
    console.log(sideBar);
  };

  return (
    <div>
      <div>
        <div className="w-fit mx-auto hidden md:block">
          <div className="capitalize text-lg  bg-indigo-500 text-white px-5 py-2 rounded-md flex">
            <div className="group relative">
              <button
                className="flex items-center hover:border hover:border-white hover:rounded-md mx-2 border border-transparent px-4"
                onClick={toogleSideBar}
              >
                <i className="ri-menu-2-line px-1"></i> Categories
              </button>
            </div>
            <button className="px-4 hover:border hover:border-white hover:rounded-md mx-2 border border-transparent">
              Top Picks
            </button>
            <button className="px-4 hover:border hover:border-white hover:rounded-md mx-2 border border-transparent">
              Offers
            </button>
            <button className="px-4 hover:border hover:border-white hover:rounded-md mx-2 border border-transparent">
              Sale
            </button>
          </div>
        </div>

        {sideBar ? (
          <div className="fixed top-0 bottom-0 right-0  left-0 z-50 bg-black backdrop-blur-sm bg-opacity-50 ">
            <div className="flex ">
              <div className="w-5/12  bg-gray-100 shadow-md overflow-y-scroll h-[100vh] scrollbar">
                <div className="px-10 ">
                  <h1 className="text-center text-black font-bold text-2xl pt-4 pb-3">
                    Shop By Categories
                  </h1>
                </div>
                <hr className="border border-gray-200 my-3" />

                <div>
                  {categories.map((category) => {
                    {
                      return (
                        <div key={category.id + category.name}>
                          <NavLinks title={category.name}>
                            {category.subCategory !== undefined &&
                              category.subCategory.map((sub) => {
                                return (
                                  <p
                                    className="py-1 text-sm text-gray-600 hover:text-gray-700 px-8"
                                    key={sub.id}
                                  >
                                    <a className="text-sm" key={sub.id}>
                                      {sub.name}
                                    </a>
                                  </p>
                                );
                              })}
                          </NavLinks>
                        </div>
                      );
                    }
                  })}
                </div>

                <div className="fixed top-1 text-4xl text-white left-[30%]">
                  <button onClick={toogleSideBar}>
                    <i className="ri-close-line"></i>
                  </button>
                </div>
              </div>
              <div className="w-screen h-screen" onClick={toogleSideBar}></div>
            </div>
          </div>
        ) : (
          <></>
        )}
      </div>

      <MobileNav />

      <style>{`
        .customgroup:hover .customgroup-content {
          display: block;
        }
      `}</style>
    </div>
  );
}

export default NavBar;
