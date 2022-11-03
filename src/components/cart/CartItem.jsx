import { useEffect, useState } from "react";

function CartItem(props) {
  const [quantity, setQuantity] = useState(props.quantity);
  const [subTotal, setSubTotal] = useState(props.price * quantity);

  useEffect(() => {
    setSubTotal(props.price * quantity);
    props.update(props.id, quantity);
  }, [quantity]);
  return (
    <>
      <div className="flex">
        <div>
          <img
            src={`http://192.168.1.92.92:8000/storage/${props.image}`}
            alt={props.name}
            className="w-20 md:w-40"
          />
        </div>
        <div className="px-4">
          <h1 className=" text-base md:text-xl font-semibold ">{props.name}</h1>
          <div className="flex  items-center  mt-1">
            <p className="text-gray-400 py-4 flex">Quantity: </p>
            <div className="flex items-center ml-4">
              <button
                className="p-2 w-7 h-7 items-center flex justify-center text-white rounded-full bg-indigo-500"
                onClick={() => {
                  quantity <= 1 ? setQuantity(1) : setQuantity(quantity - 1);
                }}
              >
                -
              </button>
              <input
                type="text"
                readOnly
                value={quantity}
                className="w-10 text-center text-gray-600 mx-2 border border-indigo-300 rounded shadow"
              />

              <button
                className="p-2 w-7 h-7 items-center flex justify-center text-white rounded-full bg-indigo-500"
                onClick={() => {
                  setQuantity(quantity + 1);
                }}
              >
                +
              </button>
            </div>
          </div>

          <div className="flex">
            <div className="flex  items-center  my-1">
              <p className="text-gray-400 flex">Price: </p>
              <h1 className="text-gray-700 mx-2">Rs {props.price}</h1>
            </div>
            {props.size ? (
              <div className="flex  items-center  my-1 mx-2">
                <p className="text-gray-400 flex">Size: </p>
                <h1 className="text-gray-700 mx-2">{props.size}</h1>
              </div>
            ) : null}

            {props.color ? (
              <div className="flex  items-center  my-1 mx-2">
                <p className="text-gray-400 flex">Color: </p>
                <h1 className="text-gray-700 mx-2"> {props.color}</h1>
              </div>
            ) : null}
          </div>
        </div>
      </div>
      <div className="flex justify-between items-center w-full">
        <div className="flex h-full items-center">
          <button
            onClick={() => {
              props.remove(props.id);
            }}
          >
            <i className="ri-delete-bin-7-line text-xl mx-1 hover:text-red-500 text-gray-500"></i>
          </button>
        </div>
        <h1 className="text-gray-600 ">
          Sub-Total: <span className="text-gray-800 mx-2">Rs {subTotal}</span>
        </h1>
      </div>
      <hr className="my-2" />
    </>
  );
}

export default CartItem;
