import { useState, useRef, useEffect } from "react";
import Rating from "../components/utils/Rating";
import { NavLink, useParams } from "react-router-dom";

import Footer from "../components/Footer";
import SecondHeader from "../components/Homepage/SecondHeader";
import ReactPanzoom from "../components/utils/ReactPanZoom";
import ItemWrapper from "../components/Items/ItemWrapper";
import Navbar from "../components/Homepage/navbar/Navbar";
import TopHeader from "../components/Homepage/TopHeader";
import useSWR from "swr";
import { toast } from "react-toastify";

function ProductView() {
  const params = useParams();

  const fetcher = (...args) => fetch(...args).then((res) => res.json());

  //? Product View api loaded
  const { data: productData, error: productError } = useSWR(
    `/api/v1/product/view/${params.id}`,
    fetcher
  );

  //? All Products Loaded
  const { data: productsData, error: productsError } = useSWR(
    "/api/v1/products",
    fetcher
  );

  const imageRef = useRef();
  const colorRef = useRef();
  const sizeRef = useRef();

  const [index, setIndex] = useState(0);
  const [color, setColor] = useState("");
  const [size, setSize] = useState("");
  const [quantity, setQuantity] = useState(1);

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
    images[id].className = "w-32 rounded-md p-2 border m-2 border-indigo-500";
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
      fetch("/api/v1/wishlist", {
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
    fetch("/api/v1/cart", {
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
        }
      });
    });
  }

  //* For Product Rating
  const productRating = (id, rating) => {
    fetch("/api/v1/rating", {
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
        }
      });
    });
  };

  if (productData && productsData) {
    //* For Displaying Related Products
    const relatedProducts = productsData.data.filter((product) => {
      return product.category_id === productData.data.category_id;
    });

    //* Storing all images for showing
    const product = [
      `http://192.168.1.92:8000/storage/${productData.data.photopath1}`,
      productData.data.photopath2 !== null
        ? `http://192.168.1.92:8000/storage/${productData.data.photopath2}`
        : null,
      productData.data.photopath3 !== null
        ? `http://192.168.1.92:8000/storage/${productData.data.photopath3}`
        : null,
    ];

    //* For Total Ratings of Product
    let totalRating = 0;
    productData.ratings.map((rating) => {
      totalRating += parseInt(rating.rating);
    });

    //? For Color and SIze ----------------------------
    const color = productData.data.color.split(",");
    const size = productData.data.size.split(",");
    //? ----------------------------------------------

    return (
      <div>
        <TopHeader />
        <SecondHeader />
        <Navbar />
        <div className="w-11/12 mx-auto">
          <h4 className="text-sm text-gray-600 py-1">
            <NavLink to="/">Homepage</NavLink> /{" "}
            {productData.data.category_name} /{" "}
            <span className="text-indigo-500 hover:text-indigo-600">
              {productData.data.name}
            </span>
          </h4>
          <div className="grid md:grid-cols-2 my-5 gap-5">
            <div className="">
              <ReactPanzoom
                src={product[index]}
                alt="AC"
                className="w-full h-96"
              />

              <div className="flex" ref={imageRef}>
                {product.map((imge, index) => {
                  return imge !== null ? (
                    <img
                      src={imge}
                      alt={index}
                      key={index}
                      className="w-32 rounded-md p-2 border m-2"
                      onClick={() => printIndex(index)}
                    />
                  ) : (
                    <></>
                  );
                })}
                <div></div>
              </div>
            </div>
            <div className="px-6">
              <h1 className="text-2xl font-bold">{productData.data.name}</h1>
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
                      setQuantity(quantity + 1);
                    }}
                  >
                    +
                  </button>
                </div>
              </p>

              {productData.data.discountedprice !== null ? (
                <div className="mt-2">
                  <p className="text-gray-800 font-bold text-xl">
                    Rs. {productData.data.discountedprice}
                  </p>
                  <p className="text-gray-400 line-through font-bold text-sm">
                    Rs. {productData.data.price}
                  </p>
                </div>
              ) : (
                <p className="text-gray-800  font-bold text-xl">
                  Rs. {productData.data.price}
                </p>
              )}

              <div className="flex justify-end my-3">
                <button
                  className="px-5 rounded-full bg-indigo-500 text-white hover:bg-indigo-700 text-xs ml-4 py-2"
                  onClick={() =>
                    productData.data.discountedprice !== null
                      ? addToCart(
                          productData.data.id,
                          productData.data.discountedprice
                        )
                      : addToCart(productData.data.id, productData.data.price)
                  }
                >
                  <i className="ri-add-line"></i> Add to Cart
                </button>
              </div>

              <div className="flex flex-col md:flex-row justify-between">
                <div className="flex items-center">
                  {Math.floor(totalRating / 5) == 1 ? (
                    <div>
                      <i className="ri-star-fill mx-.5 text-yellow-400 "></i>
                      <i className="ri-star-line mx-.5 text-yellow-400 "></i>
                      <i className="ri-star-line mx-.5 text-yellow-400 "></i>
                      <i className="ri-star-line mx-.5 text-yellow-400 "></i>
                      <i className="ri-star-line mx-.5 text-yellow-400 "></i>
                    </div>
                  ) : Math.floor(totalRating / 5) == 2 ? (
                    <div>
                      <i className="ri-star-fill mx-.5 text-yellow-400 "></i>
                      <i className="ri-star-fill mx-.5 text-yellow-400 "></i>
                      <i className="ri-star-line mx-.5 text-yellow-400 "></i>
                      <i className="ri-star-line mx-.5 text-yellow-400 "></i>
                      <i className="ri-star-line mx-.5 text-yellow-400 "></i>
                    </div>
                  ) : Math.floor(totalRating / 5) == 3 ? (
                    <div>
                      <i className="ri-star-fill mx-.5 text-yellow-400 "></i>
                      <i className="ri-star-fill mx-.5 text-yellow-400 "></i>
                      <i className="ri-star-fill mx-.5 text-yellow-400 "></i>
                      <i className="ri-star-line mx-.5 text-yellow-400 "></i>
                      <i className="ri-star-line mx-.5 text-yellow-400 "></i>
                    </div>
                  ) : Math.floor(totalRating / 5) == 4 ? (
                    <div>
                      <i className="ri-star-fill mx-.5 text-yellow-400 "></i>
                      <i className="ri-star-fill mx-.5 text-yellow-400 "></i>
                      <i className="ri-star-fill mx-.5 text-yellow-400 "></i>
                      <i className="ri-star-fill mx-.5 text-yellow-400 "></i>
                      <i className="ri-star-line mx-.5 text-yellow-400 "></i>
                    </div>
                  ) : Math.floor(totalRating / 5) == 5 ? (
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

                <button
                  onClick={() => addToWishlist(productData.data.id)}
                  className="flex items-center border border-transparent hover:border-indigo-500 p-2 rounded-md"
                >
                  <i className="ri-heart-fill text-pink-600"></i>
                  <p className="capitalize text-xs text-gray-500 pl-1">
                    Add to my wishlist
                  </p>
                </button>
              </div>

              <h1 className="text-xl text-gray-700 font-semibold mt-3">
                Description
              </h1>
              <p
                className="text-sm text-gray-500 text-justify py-2"
                dangerouslySetInnerHTML={{
                  __html: productData.data.description,
                }}
              ></p>

              <h1 className="text-xl text-gray-700 font-semibold mt-8">
                Shipping Information
              </h1>
              <table>
                <tbody>
                  <tr>
                    <td className="py-2 text-gray-500 font-semibold w-32">
                      Shipping
                    </td>
                    <td className="px-1 text-gray-700 text-sm">Free</td>
                  </tr>
                  <tr>
                    <td className="py-2 text-gray-500 font-semibold w-32">
                      Delivery
                    </td>
                    <td className="px-1 text-gray-700 text-sm">Free</td>
                  </tr>
                  <tr>
                    <td className="py-2 text-gray-500 font-semibold w-32">
                      Payments
                    </td>
                    <td className="px-1 text-gray-700 text-sm">Free</td>
                  </tr>
                  <tr>
                    <td className="py-2 text-gray-500 font-semibold w-32">
                      Return
                    </td>
                    <td className="px-1 text-gray-700 text-sm">Free</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div>
            <h1 className="text-xl text-gray-700 font-semibold mt-8 mb-4">
              Rating and Reviews
            </h1>
            <h3 className="text-base text-gray-700 font-bold italic ">
              {productData.data.name}
            </h3>
            <div className="flex items-center">
              <div>
                <h1 className="text-4xl text-center font-bold mt-5 mb-3">
                  {Math.floor(totalRating / 5)}.0
                </h1>
                <p className="text-gray-500 text-xs">
                  {productData.ratings.length} Ratings
                </p>
                <div>
                  <div className="flex items-center text-lg ">
                    {localStorage.getItem("token") ? (
                      <Rating id={productData.data.id} rate={productRating} />
                    ) : null}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-11/12 mx-auto pb-6">
          <ItemWrapper
            title="Recommended Products"
            description="Look other Similar Products"
            slide={5}
            products={relatedProducts}
          />
        </div>
        <Footer />
      </div>
    );
  }
}

export default ProductView;
