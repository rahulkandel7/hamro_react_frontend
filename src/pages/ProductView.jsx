import { useState, useRef } from "react";
import Rating from "../components/utils/Rating";
import { NavLink } from "react-router-dom";
import NavBar from "../components/Homepage/navbar/NavBar";
import Footer from "../components/Footer";
import SecondHeader from "../components/Homepage/SecondHeader";
import ReactPanzoom from "../components/utils/ReactPanZoom";
import ItemWrapper from "../components/Items/ItemWrapper";

function ProductView() {
  const product = {
    _id: "1",
    title: "LG AC",
    src: [
      "https://images.unsplash.com/photo-1436473849883-bb3464c23e93?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
      "https://images.unsplash.com/photo-1568634697393-0165d25e7acb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2096&q=80",
      "https://images.unsplash.com/photo-1615870123253-f3de8aa89e24?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1674&q=80",
    ],
    description: `Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quasi
      totam, voluptatem dicta adipisci rem placeat maxime quo inventore
      quod iure incidunt magnam maiores dolor sed provident molestias
      sint nam velit Lorem ipsum dolor sit amet consectetur adipisicing
      elit. Tempore architecto voluptatum provident quia, reiciendis ex
      non recusandae officiis id nesciunt iure repellat reprehenderit
      doloribus accusantium ut eius at illum veniam? Lorem, ipsum dolor
      sit amet consectetur adipisicing elit. Provident facilis veniam
      reprehenderit quo iste adipisci ipsum eius maxime asperiores unde,
      delectus doloribus odio sint officiis libero impedit fugiat
      recusandae tempora.`,
    price: 100,
    offerPrice: 50,
    count: 1,
    stock: 100,
    brand: "LG",
    category: "AC",
  };

  const imageRef = useRef();

  const [index, setIndex] = useState(0);

  function printIndex(id) {
    let images = imageRef.current.children;
    setIndex(id);
    for (let i = 0; i < images.length; i++) {
      images[i].className = images[i].className.replace(
        "border-indigo-500",
        ""
      );
    }
    images[id].className = "w-24 rounded-md p-2 border m-2 border-indigo-500";
  }
  return (
    <div>
      <SecondHeader />
      <NavBar />
      <div className="w-11/12 mx-auto">
        <h4 className="text-sm text-gray-600 py-1">
          <NavLink to="/">Homepage</NavLink> / Category /{" "}
          <span className="text-indigo-500 hover:text-indigo-600">
            {product.title}
          </span>
        </h4>
        <div className="grid grid-cols-2 my-5 gap-5">
          <div className="">
            <ReactPanzoom
              src={product.src[index]}
              alt="AC"
              className="w-full h-96"
            />

            <div className="flex" ref={imageRef}>
              {product.src.map((imge, index) => {
                return (
                  <img
                    src={imge}
                    alt={index}
                    key={index}
                    className="w-24 rounded-md p-2 border m-2"
                    onClick={() => printIndex(index)}
                  />
                );
              })}
              <div></div>
            </div>
          </div>
          <div className="px-6">
            <h1 className="text-2xl font-bold">{product.title}</h1>
            <p className="text-gray-400 py-2">
              Brand:{" "}
              <span className="text-gray-800 font-bold px-1">
                {product.brand}
              </span>
            </p>

            <p className="text-gray-400 py-2">
              Category:{" "}
              <span className="text-gray-800 font-bold px-1">
                {product.category}
              </span>
            </p>

            <p className="text-gray-400 py-2">
              Stock:{" "}
              <span className="text-gray-800 font-bold px-1">
                {product.stock}
              </span>
            </p>

            <p className="text-gray-400 py-2">
              Color: <span className="text-gray-800 font-bold px-1">Red</span>
            </p>

            <p className="text-gray-400 py-2">
              Size: <span className="text-gray-800 font-bold px-1">4GB</span>
            </p>

            <div className="mt-2">
              <p className="text-gray-800 font-bold text-xl">
                ${product.offerPrice}
              </p>
              <p className="text-gray-400 line-through font-bold text-sm">
                ${product.price}
              </p>
            </div>

            <div className="flex justify-end my-3">
              <button className="px-5 rounded-full bg-indigo-500 text-white hover:bg-indigo-700 text-xs ml-4 py-2">
                <i className="ri-add-line"></i> Add to Cart
              </button>
            </div>

            <div className="flex justify-between">
              <div className="flex items-center">
                <i className="ri-star-fill mx-.5 text-yellow-400 "></i>
                <i className="ri-star-fill mx-.5 text-yellow-400 "></i>
                <i className="ri-star-fill mx-.5 text-yellow-400 "></i>
                <i className="ri-star-fill mx-.5 text-yellow-400 "></i>
                <i className="ri-star-line mx-.5 text-yellow-400 "></i>

                <p className="text-gray-500 text-xs pl-2">18 Product Rating</p>
              </div>

              <button className="flex items-center border border-transparent hover:border-indigo-500 p-2 rounded-md">
                <i className="ri-heart-fill text-pink-600"></i>
                <p className="capitalize text-xs text-gray-500 pl-1">
                  Add to my wishlist
                </p>
              </button>
            </div>

            <h1 className="text-xl text-gray-700 font-semibold mt-3">
              Description
            </h1>
            <p className="text-sm text-gray-500 text-justify py-2">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quasi
              totam, voluptatem dicta adipisci rem placeat maxime quo inventore
              quod iure incidunt magnam maiores dolor sed provident molestias
              sint nam velit Lorem ipsum dolor sit amet consectetur adipisicing
              elit. Tempore architecto voluptatum provident quia, reiciendis ex
              non recusandae officiis id nesciunt iure repellat reprehenderit
              doloribus accusantium ut eius at illum veniam? Lorem, ipsum dolor
              sit amet consectetur adipisicing elit. Provident facilis veniam
              reprehenderit quo iste adipisci ipsum eius maxime asperiores unde,
              delectus doloribus odio sint officiis libero impedit fugiat
              recusandae tempora.
            </p>

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
          <h3 className="text-base text-gray-700">Product Name</h3>
          <div className="flex items-center">
            <div>
              <h1 className="text-4xl text-center font-bold mt-5 mb-3">4.0</h1>
              <p className="text-gray-500 text-xs">19 Ratings</p>
              <div>
                <div className="flex items-center text-lg ">
                  <Rating />
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
        />
      </div>
      <Footer />
    </div>
  );
}

export default ProductView;
