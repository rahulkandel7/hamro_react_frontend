import SecondHeader from "../components/Homepage/SecondHeader";
import TopHeader from "../components/Homepage/TopHeader";

function Order() {
  return (
    <>
      <div>
        <TopHeader />
        <SecondHeader />
        <NavBar />
        <div className="w-11/12 mx-auto my-5">
          <h1 className="text-4xl font-bold text-gray-600">My Order</h1>
          <hr className="my-2" />
          <div className="flex">
            <div>
              <button className="block my-3 w-full px-4 py-1 border border-amber-600 bg-amber-600 text-white rounded-md shadow-md">
                Active Order
              </button>

              <button className="block my-3 w-full px-4 py-1 border border-amber-600  rounded-md shadow-md">
                Completed Order
              </button>

              <button className="block my-3 w-full px-4 py-1 border border-amber-600  rounded-md shadow-md">
                Cancelled Order
              </button>
            </div>
            <div className="mx-5">
              <h1 className="text-xl font-bold text-gray-600">Active Order</h1>
              <hr className="my-2" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Order;
