import { useEffect } from "react";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import useSWR from "swr";
import CartItem from "../components/cart/CartItem";
import Checkout from "../components/cart/Checkout";
import Footer from "../components/Footer";
import Navbar from "../components/Homepage/navbar/NavBar";

import SecondHeader from "../components/Homepage/SecondHeader";
import TopHeader from "../components/Homepage/TopHeader";
import Spinner from "../components/utils/Spinner";
import ServerError from "./500";

function Cart() {
  //* Fetcher function
  const fetcher = (...args) =>
    fetch(...args, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }).then((res) => res.json());

  //* SWR hook to fetch user cart
  const { data, mutate, error } = useSWR(
    "https://api.hamroelectronics.com.np/api/v1/cart",
    fetcher,
    {
      refreshInterval: 1000,
    }
  );

  //* SWR hook to fetch shipping address
  const {
    data: shippingdata,
    mutate: shippingMutate,
    error: shippingError,
  } = useSWR("https://api.hamroelectronics.com.np/api/v1/shipping", fetcher);

  //* SWR hook to fetch coupon code
  const { data: couponData, error: couponErrors } = useSWR(
    "https://api.hamroelectronics.com.np/api/v1/coupon",
    fetcher
  );

  //* State to check if user pressed checkout
  const [checkout, setCheckout] = useState(false);

  //* State to store shipping id
  const [shipping, setShipping] = useState(0);

  //* State to store shippingPrice
  const [shippingPrice, setShippingPrice] = useState(0);

  //* State to store Shipping Area
  const [shippingArea, setShippingArea] = useState("");

  const [couponCode, setCouponCode] = useState("");
  const [couponDiscount, setCouponDiscount] = useState(0);
  const [couponError, setCouponError] = useState("");
  const [couponId, setCouponId] = useState("");

  function checkCoupon(totalPrice) {
    couponData.data.filter((coupon) => {
      if (coupon.name.toLowerCase() == couponCode.toLowerCase()) {
        setCouponError("");
        if (coupon.minAmount < totalPrice) {
          if (coupon.maxDisAmount > totalPrice) {
            if (coupon.isAvailable == 1) {
              if (coupon.isAmount == 1) {
                setCouponId(coupon.id);
                setCouponDiscount(coupon.offerAmount);
              }
              if (coupon.isPercent == 1) {
                setCouponId(coupon.id);
                setCouponDiscount((totalPrice * coupon.offerPercent) / 100);
              }
            } else {
              setCouponDiscount(0);
              setCouponId("");
              setCouponError("Coupon Just Expired");
            }
          } else {
            setCouponDiscount(0);
            setCouponId("");
            setCouponError(
              "Your Total Amount is too high to apply this coupon"
            );
          }
        } else {
          setCouponDiscount(0);
          setCouponId("");
          setCouponError("Minimum amount is not matched");
        }
      } else {
        setCouponDiscount(0);
        setCouponId("");
        setCouponError("The Coupon You Have Applied Is Invalid.");
      }
    });
  }

  //* Function to toggle checkout State
  const toggleCheckout = () => {
    if (checkout) {
      setCheckout(false);
    } else {
      setCheckout(true);
    }
  };

  //* function to Delete Cart Item
  const deleteCartItem = (id) => {
    fetch(`https://api.hamroelectronics.com.np/api/v1/cart/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }).then((res) => {
      res.json().then((data) => {
        if (data.status) {
          toast(data.message, { type: "success" });
        }
      });
    });
    mutate();
  };

  //* Update Cart quantity */
  const updateCartQuantity = (id, quantity) => {
    fetch(`https://api.hamroelectronics.com.np/api/v1/cart/update/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ quantity }),
    }).then((res) => {
      res.json().then((data) => {
        if (!data.status) {
          toast(data.message, { type: "error" });
        }
      });
    });
    mutate();
  };

  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    }
  }, []);

  //* It show error page while loading the data
  if (error) {
    if (localStorage.getItem("token")) {
      return <ServerError />;
    } else {
    }
  }

  if (!data) {
    return <Spinner />;
  }
  //* Show data when fetching finished
  if (data) {
    let totalPrice = 0;
    data.data.map((cart) => {
      return (totalPrice += cart.price * cart.quantity);
    });
    return (
      <>
        <TopHeader />
        <SecondHeader />
        <Navbar />
        <div className="w-11/12 mx-auto my-10">
          <div className="grid md:grid-cols-3 gap-10">
            <div className="col-span-2">
              <h1 className="text-xl md:text-2xl font-bold">Shopping Cart</h1>
              <hr className="my-2" />
              {data.data.length < 1 ? (
                <h1 className="text-4xl text-gray-500 font-bold my-3">
                  No Items in cart
                </h1>
              ) : (
                data.data.map((cart) => {
                  return (
                    <CartItem
                      key={cart.id}
                      image={cart.product.photopath1}
                      name={cart.product.name}
                      price={cart.price}
                      quantity={cart.quantity}
                      remove={deleteCartItem}
                      id={cart.id}
                      size={cart.size}
                      color={cart.color}
                      update={updateCartQuantity}
                    />
                  );
                })
              )}

              <div className="flex w-full justify-end mt-4">
                <NavLink to="/">
                  <button className="px-4 py-1 bg-indigo-500 hover:bg-indigo-700 rounded-md shadow-md text-white ">
                    Continue Shopping
                  </button>
                </NavLink>
              </div>
            </div>
            {data.data.length == 0 ? null : (
              <div>
                <h1 className="text-2xl text-gray-500 font-bold">
                  Order Summary
                </h1>
                <hr className="my-2" />
                <div className="flex justify-between w-full px-4 my-2 text-sm">
                  <p className="text-gray-800 font-bold">
                    Selected {data.data.length} item(s) Price
                  </p>
                  <p className="text-gray-500">Rs {totalPrice}</p>
                </div>

                <div className="flex justify-between w-full px-4 my-2 text-sm">
                  <p className="text-gray-800 font-bold">Shipping Area</p>

                  <select
                    name="shipping_area"
                    id="shipping_area"
                    onChange={(e) => {
                      shippingdata.data.map((area) => {
                        if (area.id == e.target.value) {
                          setShippingPrice(area.price);
                          setShippingArea(area.area_name);
                        }
                      });
                      setShipping(e.currentTarget.value);
                    }}
                  >
                    <option selected={true} disabled={true}>
                      -- Select Area Name --
                    </option>
                    {shippingdata
                      ? shippingdata.data.map((shipping) => {
                          return (
                            <option value={shipping.id} key={shipping.id}>
                              {shipping.area_name}
                            </option>
                          );
                        })
                      : null}
                  </select>
                </div>

                <div className="flex justify-between w-full px-4 my-2 text-sm">
                  <p className="text-gray-800 font-bold">Delivery Charge</p>

                  {shippingdata
                    ? shippingdata.data.map((area) => {
                        if (area.id == shipping) {
                          return (
                            <p className="text-gray-500" key={area.id}>
                              Rs {area.price}
                            </p>
                          );
                        }
                      })
                    : null}
                </div>
                <hr className="my-3" />
                <div className="flex justify-between w-full px-4 my-2">
                  <p className="text-gray-800 font-bold">Apply Coupon</p>
                </div>
                <div className="flex justify-between w-full px-4 my-2 text-sm relative">
                  <input
                    type="text"
                    placeholder="Enter Coupon Code"
                    onChange={(e) => {
                      setCouponCode(e.target.value);
                    }}
                    onKeyUp={(e) => {
                      if (e.key == "Enter") {
                        checkCoupon(totalPrice);
                      }
                    }}
                    className="border border-gray-400 focus-visible:border-gray-800 outline-none py-1 px-4 rounded-md shadow-md w-full"
                  />
                  <button
                    className="px-4 py-1 bg-indigo-500 hover:bg-indigo-700 text-white rounded-md shadow-md"
                    onClick={() => checkCoupon(totalPrice)}
                  >
                    Apply
                  </button>
                </div>
                <p className="text-red-500 text-sm px-4">{couponError}</p>

                <hr className="my-3" />

                {couponDiscount == 0 ? null : (
                  <div className="flex justify-between w-full px-4 my-2 ">
                    <p className="text-gray-800 font-bold">Coupon Discount</p>
                    <p className="text-gray-500">Rs {couponDiscount}</p>
                  </div>
                )}

                <div className="flex justify-between w-full px-4 my-2 text-lg">
                  <p className="text-gray-800 font-bold">Total Payable</p>
                  <p className="text-gray-500">
                    Rs{" "}
                    {totalPrice +
                      parseInt(shippingPrice) -
                      parseInt(couponDiscount)}
                  </p>
                </div>

                <button
                  className="w-full py-2 bg-indigo-500 hover:bg-indigo-800 text-white rounded-md shadow-md my-3"
                  onClick={toggleCheckout}
                >
                  {" "}
                  Procced To Checkout
                </button>
              </div>
            )}
          </div>
        </div>
        {checkout ? (
          <Checkout
            hide={toggleCheckout}
            total={totalPrice + shippingPrice - couponDiscount}
            shippingPrice={shippingPrice}
            shippingId={shipping}
            carts={data.data}
            couponId={couponId}
            couponDiscount={couponDiscount}
            shippingArea={shippingArea}
          />
        ) : (
          <></>
        )}
        <Footer />
      </>
    );
  }
}

export default Cart;
