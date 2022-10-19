function Items(props) {
  return (
    <>
      <div className="w-full bg-gray-50 rounded-md shadow-md pb-4 hover:bg-white hover:shadow-xl hover:scale-105 transition duration-200 ease-in-out relative">
        <img
          src={`http://192.168.1.92:8000/storage/${props.image}`}
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
              Rs {props.discount_price}
            </p>
            <p className="text-xs md:text-lg text-black px-2">
              Rs {props.price}
            </p>
          </div>
        )}

        <div className="absolute top-2 right-2 text-xs ">
          <p className="bg-indigo-500 text-white rounded-md px-3 py-1">
            20% OFF
          </p>
        </div>
      </div>
    </>
  );
}

export default Items;
