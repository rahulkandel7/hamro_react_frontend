// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper";

// Import Swiper styles
import "swiper/css";

function Slideshow() {
  return (
    <>
      <div className="w-[98%] mx-auto my-2 rounded-md shadow-md">
        <Swiper
          spaceBetween={10}
          slidesPerView={1}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          modules={[Autoplay, Pagination]}
        >
          <SwiperSlide>
            <img src="/slide1.jpeg" alt="" className="rounded-md shadow-md" />
          </SwiperSlide>

          <SwiperSlide>
            <img src="/slide2.jpeg" alt="" className="rounded-md shadow-md" />
          </SwiperSlide>

          <SwiperSlide>
            <img src="/slide3.jpeg" alt="" className="rounded-md shadow-md" />
          </SwiperSlide>
        </Swiper>
      </div>
    </>
  );
}

export default Slideshow;
