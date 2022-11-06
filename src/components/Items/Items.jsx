function Items(props) {
  return (
    <>
      <div className="w-full bg-gray-50 rounded-md shadow-md pb-4 hover:bg-white hover:shadow-xl hover:scale-105 transition duration-200 ease-in-out relative">
        <img
          src={`https://api.hamroelectronics.com.np/public/${props.image}`}
          alt="Items"
          className="rounded-md 2"
        />
        <p className="text-sm text-gray-600 text-center py-4 px-2">
          {props.item_name}
        </p>

        {props.discount_price == null ? (
          <p className="text-sm md:text-lg text-black px-2 text-center">
            Rs {props.price}
          </p>
        ) : (
          <div className="flex justify-center items-center">
            <p className="line-through text-xs md:text-sm text-gray-600">
              Rs {props.price}
            </p>
            <p className="text-xs md:text-lg text-black px-2">
              Rs {props.discount_price}
            </p>
          </div>
        )}

        {props.off < 100 ? (
          <div className="absolute top-2 right-2 text-xs ">
            <p className="bg-indigo-500 text-white rounded-md px-3 py-1">
              {props.off}% OFF
            </p>
          </div>
        ) : null}

        <div className="flex justify-center">
          <div className="flex items-center">
            {props.avg_rating == 1 ? (
              <div>
                <i className="ri-star-fill mx-.5 text-yellow-400 "></i>
                <i className="ri-star-line mx-.5 text-yellow-400 "></i>
                <i className="ri-star-line mx-.5 text-yellow-400 "></i>
                <i className="ri-star-line mx-.5 text-yellow-400 "></i>
                <i className="ri-star-line mx-.5 text-yellow-400 "></i>
              </div>
            ) : props.avg_rating == 2 ? (
              <div>
                <i className="ri-star-fill mx-.5 text-yellow-400 "></i>
                <i className="ri-star-fill mx-.5 text-yellow-400 "></i>
                <i className="ri-star-line mx-.5 text-yellow-400 "></i>
                <i className="ri-star-line mx-.5 text-yellow-400 "></i>
                <i className="ri-star-line mx-.5 text-yellow-400 "></i>
              </div>
            ) : props.avg_rating == 3 ? (
              <div>
                <i className="ri-star-fill mx-.5 text-yellow-400 "></i>
                <i className="ri-star-fill mx-.5 text-yellow-400 "></i>
                <i className="ri-star-fill mx-.5 text-yellow-400 "></i>
                <i className="ri-star-line mx-.5 text-yellow-400 "></i>
                <i className="ri-star-line mx-.5 text-yellow-400 "></i>
              </div>
            ) : props.avg_rating == 4 ? (
              <div>
                <i className="ri-star-fill mx-.5 text-yellow-400 "></i>
                <i className="ri-star-fill mx-.5 text-yellow-400 "></i>
                <i className="ri-star-fill mx-.5 text-yellow-400 "></i>
                <i className="ri-star-fill mx-.5 text-yellow-400 "></i>
                <i className="ri-star-line mx-.5 text-yellow-400 "></i>
              </div>
            ) : props.avg_rating == 5 ? (
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

            <p className="text-gray-500 text-xs pl-2">({props.rating})</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Items;
