function CartItem() {
  return (
    <>
      <div className="flex">
        <div>
          <img src="/item1.jpeg" alt="Name" className="w-40" />
        </div>
        <div className="px-4">
          <h1 className="text-xl font-semibold ">Product Name</h1>
          <div className="flex justify-between items-center  my-4">
            <p className="">Quantity:</p>
            <div className="mx-2">
              <button className="bg-gray-500 rounded-md px-2 text-white py-.5">
                +
              </button>
              <input
                type="text"
                value={1}
                className="w-16  shadow-md text-center h-full"
              />
              <button className="bg-gray-500 rounded-md px-2 text-white py-.5">
                -
              </button>
            </div>
          </div>

          <h1 className="text-gray-700 ">Rs 1234</h1>
        </div>
      </div>
      <div className="flex justify-between items-center w-full">
        <div className="flex h-full items-center">
          <i className="ri-heart-3-fill text-xl mx-1 text-indigo-500"></i>
          <i className="ri-delete-bin-7-line text-xl mx-1 hover:text-red-500 text-gray-500"></i>
        </div>
        <h1 className="text-gray-600 ">
          Sub-Total: <span className="text-gray-800 mx-2">Rs 12345</span>
        </h1>
      </div>
    </>
  );
}

export default CartItem;
