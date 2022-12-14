// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper";

// Import Swiper styles
import "swiper/css";
import useSWR from "swr";

function Slideshow() {
  const fetcher = (...args) =>
    fetch(...args).then((response) => response.json());

  const { data, error } = useSWR(
    "https://api.hamroelectronics.com.np/api/v1/fetchbanner",
    fetcher
  );
  if (data) {
    const banner = [...data.data].sort((a, b) => a.priority - b.priority);
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
            {banner.map((banner) => {
              if (banner.available == 1) {
                return (
                  <SwiperSlide key={banner.id}>
                    <img
                      src={`https://api.hamroelectronics.com.np/public/${banner.photopath}`}
                      alt=""
                      className="rounded-md shadow-md"
                    />
                  </SwiperSlide>
                );
              }
            })}
          </Swiper>
        </div>
      </>
    );
  }
}

export default Slideshow;
