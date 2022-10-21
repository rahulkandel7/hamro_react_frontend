function WishlistItem(props) {
  return (
    <>
      <div className="w-full bg-gray-50 rounded-md shadow-md pb-4 hover:bg-white hover:shadow-xl hover:scale-105 transition duration-200 ease-in-out relative">
        <img src="/item1.jpeg" alt="Items" className="rounded-md 2" />
        <p className="text-sm text-gray-600 text-center py-2 px-2">
          {props.item_name}
        </p>

        {props.discount_price == null ? (
          <p className="text-sm md:text-lg text-black px-2 text-center">
            Rs {props.price}
          </p>
        ) : (
          <div className="flex justify-center items-center">
            <p className="line-through text-xs md:text-sm text-gray-600">
              Rs {props.discount_price}
            </p>
            <p className="text-sm md:text-lg text-black px-2">
              Rs {props.price}
            </p>
          </div>
        )}
        <div className="flex justify-between mx-4 mt-1">
          <button onClick={props.delete}>
            <i className="ri-heart-fill text-red-500 text-xl"></i>
          </button>

          <button className="px-2 mx-2 text-xs py-1 bg-amber-500 hover:bg-amber-700 text-white rounded-md shadow-lg">
            Buy Now
          </button>
        </div>

        {props.off > 0 ? (
          <div className="absolute top-2 right-2 text-xs ">
            <p className="bg-indigo-500 text-white rounded-md px-3 py-1">
              {props.off}% OFF
            </p>
          </div>
        ) : null}
      </div>
    </>
  );
}

export default WishlistItem;
