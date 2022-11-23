import { useState, useRef, useEffect } from "react";
import Rating from "../components/utils/Rating";
import { NavLink, useNavigate, useParams } from "react-router-dom";

import Footer from "../components/Footer";
import SecondHeader from "../components/Homepage/SecondHeader";
import ReactPanzoom from "../components/utils/ReactPanZoom";
import ItemWrapper from "../components/Items/ItemWrapper";
import Navbar from "../components/Homepage/navbar/Navbar";
import TopHeader from "../components/Homepage/TopHeader";
import useSWR from "swr";
import { toast } from "react-toastify";
import Comment from "../components/utils/Comment";
import WriteComment from "../components/utils/WriteComment";
import ServerError from "./500";
import Spinner from "../components/utils/Spinner";
import Items from "../components/Items/Items";

function ProductView() {
  //* Parameter for getting the product id
  const params = useParams();

  //* Fetching the product data
  const fetcher = (...args) => fetch(...args).then((res) => res.json());

  //? Product View api loaded
  const {
    data: productData,
    error: productError,
    mutate: productMutate,
  } = useSWR(
    `https://api.hamroelectronics.com.np/api/v1/product/view/${params.id}`,
    fetcher
  );

  //? All Products Loaded
  const { data: productsData, error: productsError } = useSWR(
    "https://api.hamroelectronics.com.np/api/v1/products",
    fetcher
  );

  // ? All Ads Loaded
  const { data: adsData, error: adsError } = useSWR(
    "https://api.hamroelectronics.com.np/api/v1/ads/list",
    fetcher
  );

  //? Fetch user info
  const [userId, setUserId] = useState(null);
  useEffect(() => {
    fetch("https://api.hamroelectronics.com.np/api/v1/user", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }).then((res) => {
      if (res.status === 200) {
        res.json().then((data) => {
          setUserId(data.user.id);
        });
      }
    });
  }, []);

  //* References
  const imageRef = useRef();
  const colorRef = useRef();
  const sizeRef = useRef();

  //* States for image, color, size and quantity
  const [index, setIndex] = useState(0);
  const [color, setColor] = useState("");
  const [size, setSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [number, setNumber] = useState(0);

  //* For Displaying images
  function printIndex(id) {
    let images = imageRef.current.children;
    setIndex(id);
    for (let i = 0; i < images.length; i++) {
      images[i].className = images[i].className.replace(
        "border-indigo-500",
        ""
      );
    }
    images[id].className = "w-16 rounded-md p-2 border m-2 border-indigo-500";
  }

  //* For Selecting Color
  function selectColor(id) {
    let colors = colorRef.current.children;

    for (let i = 0; i < colors.length; i++) {
      colors[i].className = colors[i].className.replace(
        "border border-indigo-500",
        ""
      );
    }
    colors[id].className =
      "mx-1 text-gray-800 font-bold  py-2 px-4 cursor-pointer rounded border border-indigo-500";
    setColor(colors[id].textContent);
  }

  //* For Selecting Size
  function selectSize(id) {
    let sizes = sizeRef.current.children;
    for (let i = 0; i < sizes.length; i++) {
      sizes[i].className = sizes[i].className.replace(
        "border border-indigo-500",
        ""
      );
    }
    sizes[id].className =
      "mx-1 text-gray-800 font-bold  py-2 px-4 cursor-pointer rounded border border-indigo-500";
    setSize(sizes[id].textContent);
  }

  //* For Adding to Wishlist
  function addToWishlist(id) {
    if (localStorage.getItem("token")) {
      fetch("https://api.hamroelectronics.com.np/api/v1/wishlist", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          product_id: id,
        }),
      }).then((res) => {
        res.json().then((data) => {
          if (data.status) {
            toast(data.message, {
              type: "success",
            });
          }
        });
      });
    } else {
      toast("Please Login First", {
        type: "error",
      });
    }
  }

  //* For Adding to Cart
  function addToCart(id, price) {
    fetch("https://api.hamroelectronics.com.np/api/v1/cart", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        product_id: id,
        color: color,
        size: size,
        price: price,
        quantity: quantity,
        ordered: false,
      }),
    }).then((res) => {
      res.json().then((data) => {
        if (data.status) {
          toast(data.message, {
            type: "success",
          });
          setNumber(number + 1);
        }
        if (data.details) {
          if (data.details.color) {
            toast(data.details.color[0], {
              type: "error",
            });
          }
          if (data.details.size) {
            toast(data.details.size[0], {
              type: "error",
            });
          }
        }
      });
    });
  }

  //* For Product Rating
  const productRating = (id, rating) => {
    fetch("https://api.hamroelectronics.com.np/api/v1/rating", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        product_id: id,
        rating: rating,
      }),
    }).then((res) => {
      res.json().then((data) => {
        if (data.status) {
          toast(data.message, {
            type: "success",
          });
          productMutate();
        }
      });
    });
  };

  const navigate = useNavigate();
  if (productError) {
    if (localStorage.getItem("token")) {
      return <ServerError />;
    } else {
      navigate("/login");
    }
  }

  if (!productData) {
    return <Spinner />;
  }

  if (productData && productsData) {
    //* For Displaying Related Products
    const relatedProducts = productsData.data.filter((product) => {
      if (
        product.category_id === productData.data.category_id &&
        product.id !== productData.data.id
      ) {
        return product;
      }
    });

    //* For displaying comments

    const comments = productData.comments.filter((comment) => {
      return comment.user_id != userId;
    });
    //* Storing all images for showing
    const product = [
      `https://api.hamroelectronics.com.np/public/${productData.data.photopath1}`,
      productData.data.photopath2 !== null
        ? `https://api.hamroelectronics.com.np/public/${productData.data.photopath2}`
        : null,
      productData.data.photopath3 !== null
        ? `https://api.hamroelectronics.com.np/public/${productData.data.photopath3}`
        : null,
    ];

    //? For Color and SIze ----------------------------
    const color = productData.data.color.split(",");
    const size = productData.data.size.split(",");
    //? ----------------------------------------------

    return (
      <div>
        <TopHeader />
        <SecondHeader clength={number} />
        <Navbar />
        <div className="w-11/12 mx-auto">
          {/* //* For Showing Product Details */}
          <h4 className="text-sm text-gray-600 py-1">
            <NavLink to="/">Homepage</NavLink> /{" "}
            {productData.data.category_name} /{" "}
            <span className="text-indigo-500 hover:text-indigo-600">
              {productData.data.name}
            </span>
          </h4>
          <div className="grid md:grid-cols-4 my-5 gap-10">
            <div className="">
              <ReactPanzoom src={product[index]} alt="AC" className=" h-96" />

              <div className="flex" ref={imageRef}>
                {product.map((imge, index) => {
                  return imge !== null ? (
                    <img
                      src={imge}
                      alt={index}
                      key={index}
                      className="w-16 rounded-md p-2 border m-2"
                      onClick={() => printIndex(index)}
                    />
                  ) : (
                    <></>
                  );
                })}
                <div></div>
              </div>
            </div>
            <div className="px-6 md:col-span-2 border-r border-l">
              <h1 className="text-3xl">{productData.data.name}</h1>
              <div className="flex items-center">
                {Math.floor(productData.data.rating) == 1 ? (
                  <div>
                    <i className="ri-star-fill mx-.5 text-yellow-400 "></i>
                    <i className="ri-star-line mx-.5 text-yellow-400 "></i>
                    <i className="ri-star-line mx-.5 text-yellow-400 "></i>
                    <i className="ri-star-line mx-.5 text-yellow-400 "></i>
                    <i className="ri-star-line mx-.5 text-yellow-400 "></i>
                  </div>
                ) : Math.floor(productData.data.rating) == 2 ? (
                  <div>
                    <i className="ri-star-fill mx-.5 text-yellow-400 "></i>
                    <i className="ri-star-fill mx-.5 text-yellow-400 "></i>
                    <i className="ri-star-line mx-.5 text-yellow-400 "></i>
                    <i className="ri-star-line mx-.5 text-yellow-400 "></i>
                    <i className="ri-star-line mx-.5 text-yellow-400 "></i>
                  </div>
                ) : Math.floor(productData.data.rating) == 3 ? (
                  <div>
                    <i className="ri-star-fill mx-.5 text-yellow-400 "></i>
                    <i className="ri-star-fill mx-.5 text-yellow-400 "></i>
                    <i className="ri-star-fill mx-.5 text-yellow-400 "></i>
                    <i className="ri-star-line mx-.5 text-yellow-400 "></i>
                    <i className="ri-star-line mx-.5 text-yellow-400 "></i>
                  </div>
                ) : Math.floor(productData.data.rating) == 4 ? (
                  <div>
                    <i className="ri-star-fill mx-.5 text-yellow-400 "></i>
                    <i className="ri-star-fill mx-.5 text-yellow-400 "></i>
                    <i className="ri-star-fill mx-.5 text-yellow-400 "></i>
                    <i className="ri-star-fill mx-.5 text-yellow-400 "></i>
                    <i className="ri-star-line mx-.5 text-yellow-400 "></i>
                  </div>
                ) : Math.floor(productData.data.rating) == 5 ? (
                  <div>
                    <i className="ri-star-fill mx-.5 text-yellow-400 "></i>
                    <i className="ri-star-fill mx-.5 text-yellow-400 "></i>
                    <i className="ri-star-fill mx-.5 text-yellow-400 "></i>
                    <i className="ri-star-fill mx-.5 text-yellow-400 "></i>
                    <i className="ri-star-fill mx-.5 text-yellow-400 "></i>
                  </div>
                ) : (
                  <div>
                    <i className="ri-star-line mx-.5 text-yellow-400 "></i>
                    <i className="ri-star-line mx-.5 text-yellow-400 "></i>
                    <i className="ri-star-line mx-.5 text-yellow-400 "></i>
                    <i className="ri-star-line mx-.5 text-yellow-400 "></i>
                    <i className="ri-star-line mx-.5 text-yellow-400 "></i>
                  </div>
                )}

                <p className="text-gray-500 text-xs pl-2">
                  ({productData.ratings.length}) Product Rating
                </p>
              </div>

              <div className="flex items-center ">
                {productData.data.discountedprice !== null ? (
                  <div className="mt-2">
                    <p className="text-red-400 line-through font-bold text-xl">
                      Rs. {productData.data.price} /-
                    </p>
                    <p className="text-red-800 font-bold text-2xl">
                      Rs. {productData.data.discountedprice} /-
                    </p>
                  </div>
                ) : (
                  <p className="text-red-800  font-bold text-2xl">
                    Rs. {productData.data.price} /-
                  </p>
                )}
                <div className="h-12 mt-[8%] ml-4">
                  <div className="bg-indigo-500 rounded-md text-xs py-1 w-18 px-2 text-white">
                    - 30% off
                  </div>
                </div>
              </div>
              <p className="text-gray-400 py-2">
                Brand:{" "}
                <span className="text-gray-800 font-bold px-1">
                  {productData.data.brand_name}
                </span>
              </p>

              <p className="text-gray-400 py-2">
                Category:{" "}
                <span className="text-gray-800 font-bold px-1">
                  {productData.data.category_name}
                </span>
              </p>

              <p className="text-gray-400 py-2">
                Stock:{" "}
                <span className="text-gray-800 font-bold px-1">
                  {productData.data.stock}
                </span>
              </p>

              <p className="text-gray-400 py-2 " ref={colorRef}>
                Color:{" "}
                {color.map((color, index) => {
                  return (
                    <span
                      className=" mx-1 text-gray-800 font-bold  py-2 px-4 cursor-pointer rounded"
                      key={index}
                      onClick={() => selectColor(index)}
                    >
                      {color}
                    </span>
                  );
                })}
              </p>

              <p className="text-gray-400 py-2 " ref={sizeRef}>
                Size:{" "}
                {size.map((size, index) => {
                  return (
                    <span
                      className=" mx-1 text-gray-800 font-bold  py-2 px-4 cursor-pointer rounded"
                      key={index}
                      onClick={() => selectSize(index)}
                    >
                      {size}
                    </span>
                  );
                })}
              </p>

              <p className="text-gray-400 py-4 flex">
                Quantity:{" "}
                <div className="flex items-center ml-4">
                  <button
                    className="p-2 w-7 h-7 items-center flex justify-center text-white rounded-full bg-indigo-500"
                    onClick={() => {
                      quantity <= 1 ? 1 : setQuantity(quantity - 1);
                    }}
                  >
                    -
                  </button>
                  <input
                    type="text"
                    readOnly
                    value={quantity}
                    className="w-10 text-center text-gray-600 mx-2 border border-indigo-300 rounded shadow"
                  />

                  <button
                    className="p-2 w-7 h-7 items-center flex justify-center text-white rounded-full bg-indigo-500"
                    onClick={() => {
                      if (quantity < productData.data.stock) {
                        setQuantity(quantity + 1);
                      }
                    }}
                  >
                    +
                  </button>
                </div>
              </p>

              <div className="grid grid-cols-2 gap-5">
                <button
                  onClick={() =>
                    productData.data.discountedprice !== null
                      ? addToCart(
                          productData.data.id,
                          productData.data.discountedprice
                        )
                      : addToCart(productData.data.id, productData.data.price)
                  }
                  className="bg-indigo-500 hover:bg-indigo-700 text-white rounded-md py-2"
                >
                  Add to Cart
                </button>
                <button
                  onClick={() => addToWishlist(productData.data.id)}
                  className="bg-red-500 hover:bg-red-700 text-white rounded-md py-2 "
                >
                  Add to Wishlist
                </button>
              </div>
            </div>
            <div>
              <h1 className="text-xl text-gray-700 font-semibold mb-4">
                Shipping Information
              </h1>

              <p className="py-2 text-gray-500 font-semibold ">
                <i class="ri-truck-fill"></i>{" "}
                <span className="px-1 text-gray-700 text-sm">
                  Home Delivery (1-2 Days)
                </span>
              </p>

              <p className="py-2 text-gray-500 font-semibold ">
                <i class="ri-money-dollar-box-fill"></i>
                <span className="px-1 text-gray-700 text-sm">
                  Cash On Delivery
                </span>
              </p>

              <p className="py-2 text-gray-500 font-semibold ">
                <i class="ri-shield-star-fill"></i>
                <span className="px-1 text-gray-700 text-sm">Available</span>
              </p>

              <p className="py-2 text-gray-500 font-semibold ">
                <i class="ri-time-fill"></i>
                <span className="px-1 text-gray-700 text-sm">
                  5 Days Return{" "}
                  <span className="text-xs text-gray-400">
                    (Change of mind is not applicable)
                  </span>
                </span>
              </p>

              <div>
                <h1 className="text-2xl text-gray-700 font-semibold mt-8 mb-4">
                  Rating
                </h1>

                <h3 className="text-base text-gray-700 font-bold  ">
                  Average Rating
                </h3>

                <div className="flex items-center">
                  <div>
                    <h1 className="text-6xl text-center font-bold mt-5 mb-3">
                      {Math.floor(productData.data.rating)}.0
                    </h1>

                    <div>
                      {localStorage.getItem("token") ? (
                        <h3 className="text-base text-gray-700 font-bold  ">
                          My Rating
                        </h3>
                      ) : null}

                      <div className="flex items-center text-lg ">
                        {localStorage.getItem("token") ? (
                          <Rating
                            id={productData.data.id}
                            rate={productRating}
                          />
                        ) : null}
                      </div>
                    </div>
                  </div>
                </div>
                {/* //* Rating End Here */}
              </div>
            </div>
          </div>
          {/* //* Product Details End */}

          {/* //* Product Rating and Reviews Started */}
          <div className="grid grid-cols-4 gap-5">
            <div className="col-span-3">
              <div className="bg-gray-100 p-2 rounded-md max-h-72 scroll-auto">
                <h1 className="text-xl text-gray-700 font-semibold mt-3">
                  Description
                </h1>
                <p
                  className="text-sm text-gray-500 text-justify py-2"
                  dangerouslySetInnerHTML={{
                    __html: productData.data.description,
                  }}
                ></p>
              </div>
              <div className="col-span-2 bg-gray-100 p-2 rounded-md mt-5">
                {/* //* Reviews Startes */}
                <h1 className="text-2xl text-gray-700 font-semibold mt-8 mb-4">
                  Reviews
                </h1>

                {localStorage.getItem("token") ? (
                  <div>
                    <hr />
                    <div>
                      <h1 className=" text-gray-600 font-semibold mt-2 ">
                        Your Review
                      </h1>
                      <WriteComment
                        id={productData.data.id}
                        mutate={() => productMutate()}
                      />
                    </div>
                  </div>
                ) : (
                  <h2 className="capitalize text-xl text-gray-400 text-center">
                    This Product has no review yet
                  </h2>
                )}
                <hr className="my-2" />
                <div className="max-h-44 overflow-scroll">
                  {comments.map((comment) => {
                    return (
                      <Comment
                        author={comment.user_name}
                        comment={comment.comment}
                      />
                    );
                  })}
                </div>

                {/* //* Reviews End here */}
              </div>
            </div>
            <div className="bg-gray-0">
              {adsData.data.map((ad) => {
                if (ad.ad_code == "P1") {
                  return (
                    <div className="w-11/12 mx-auto">
                      <img
                        src={`https://api.hamroelectronics.com.np/public/${ad.photopath}`}
                        alt="ads"
                        className="rounded-md shadow-md"
                      />
                    </div>
                  );
                }
              })}
            </div>
          </div>
          <div className="w-12/12 mx-auto pb-6 mt-5">
            <ItemWrapper
              title="Recommended Products"
              description="Look other Similar Products"
              slide={4}
              products={relatedProducts}
            />
          </div>
        </div>

        <Footer />
      </div>
    );
  }
}

export default ProductView;
