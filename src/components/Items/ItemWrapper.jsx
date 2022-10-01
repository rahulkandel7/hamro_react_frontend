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
        <h1 className="text-gray-700 text-3xl text-center font-bold">
          {props.title}
        </h1>
        <h4 className="text-lg text-gray-500 text-center font-light py-3">
          {props.description}
        </h4>
        <Swiper
          slidesPerView={props.slide}
          spaceBetween={50}
          // autoplay={{
          //   delay: 2500,
          //   disableOnInteraction: false,
          // }}
          navigation={true}
          modules={[Autoplay, Navigation]}
        >
          <SwiperSlide>
            <NavLink to="/product/view/1">
              <Items item_name="demo" discount_price="1234" price="123" />
            </NavLink>
          </SwiperSlide>
          <SwiperSlide>
            <NavLink to="/product/view/1">
              <Items item_name="demo" discount_price="1234" price="123" />
            </NavLink>
          </SwiperSlide>
          <SwiperSlide>
            <NavLink to="/product/view/1">
              <Items item_name="demo" discount_price="1234" price="123" />
            </NavLink>
          </SwiperSlide>
          <SwiperSlide>
            <NavLink to="/product/view/1">
              <Items item_name="demo" discount_price="1234" price="123" />
            </NavLink>
          </SwiperSlide>

          <SwiperSlide>
            <NavLink to="/product/view/1">
              <Items item_name="demo" discount_price="1234" price="123" />
            </NavLink>
          </SwiperSlide>

          <SwiperSlide>
            <NavLink to="/product/view/1">
              <Items item_name="demo" discount_price="1234" price="123" />
            </NavLink>
          </SwiperSlide>
          <SwiperSlide>
            <NavLink to="/product/view/1">
              <Items item_name="demo" discount_price="1234" price="123" />
            </NavLink>
          </SwiperSlide>
        </Swiper>
      </div>
    </>
  );
}

export default ItemWrapper;
