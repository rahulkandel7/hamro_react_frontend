import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper";

import "swiper/css";
import "swiper/css/navigation";

import Items from "./Items";
import "../../css/Items.module.css";
import { NavLink } from "react-router-dom";

function ItemWrapper(props) {
  return (
    <>
      <div className="w-11/12 mx-auto my-10 ">
        <h1 className="text-gray-700 text-xl md:text-3xl text-center font-bold">
          {props.title}
        </h1>
        <h4 className="text-base md:text-lg text-gray-500 text-center font-light py-3">
          {props.description}
        </h4>
        <Swiper
          spaceBetween={50}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          navigation={true}
          modules={[Autoplay, Navigation]}
          breakpoints={{
            // when window width is >= 320px
            320: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            // when window width is >= 480px
            480: {
              slidesPerView: 3,
              spaceBetween: 30,
            },
            // when window width is >= 640px
            640: {
              slidesPerView: 4,
              spaceBetween: 40,
            },
            1024: {
              slidesPerView: props.slide,
              spaceBetween: 40,
            },
            1450: {
              slidesPerView: 6,
              spaceBetween: 40,
            },
            2400: {
              slidesPerView: 7,
              spaceBetween: 40,
            },
          }}
        >
          {props.products !== undefined ? (
            props.products.map((product) => {
              let off;

              if (product.discountedprice !== undefined) {
                off = (product.discountedprice / product.price) * 100;
              }
              return (
                <SwiperSlide key={product.id}>
                  <NavLink to={`/product/view/${product.id}`}>
                    <Items
                      item_name={product.name}
                      discount_price={product.discountedprice}
                      price={product.price}
                      image={product.photopath1}
                      off={Math.floor(off)}
                    />
                  </NavLink>
                </SwiperSlide>
              );
            })
          ) : (
            <></>
          )}
        </Swiper>
      </div>
    </>
  );
}

export default ItemWrapper;
