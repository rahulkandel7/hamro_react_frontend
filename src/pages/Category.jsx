import NavBar from "../components/Homepage/navbar/NavBar";
import SecondHeader from "../components/Homepage/SecondHeader";
import Items from "../components/Items/Items";

function Category() {
  const nubers = [1, 2, 3, 4, 5, 6, 7, 8, 1, 1, 1, 1, 1];
  return (
    <div>
      <SecondHeader />
      <NavBar />
      <div className="flex w-11/12 mx-auto my-3">
        <div className="hidden md:block w-64 shadow-md px-5 py-2">
          <h1 className="text-2xl text-gray-700 font-bold">Filter By</h1>
          <hr className="my-2" />
          <h3 className="text-gray-500 text-lg">Brands</h3>
          <ul>
            <li className="py-1">
              <input
                type="checkbox"
                name="brands"
                id="brands"
                className="checked:accent-red-400"
              />{" "}
              LG
            </li>

            <li className="py-1">
              <input
                type="checkbox"
                name="brands"
                id="brands"
                className="checked:accent-red-400"
              />{" "}
              CG
            </li>

            <li className="py-1">
              <input
                type="checkbox"
                name="brands"
                id="brands"
                className="checked:accent-red-400"
              />{" "}
              Samsung
            </li>

            <li className="py-1">
              <input
                type="checkbox"
                name="brands"
                id="brands"
                className="checked:accent-red-400"
              />{" "}
              MI
            </li>
          </ul>

          <hr className="my-2" />
          <h3 className="text-gray-500 text-lg">Price Filter</h3>
          <ul>
            <li className="py-1 text-sm text-gray-400 hover:text-gray-700">
              $20 - $50
            </li>

            <li className="py-1 text-sm text-gray-400 hover:text-gray-700">
              $50 - $80
            </li>

            <li className="py-1 text-sm text-gray-400 hover:text-gray-700">
              $80 - $90
            </li>

            <li className="py-1 text-sm text-gray-400 hover:text-gray-700">
              $200+
            </li>
          </ul>
        </div>
        <div className="">
          <h1 className="text-2xl text-gray-700 font-bold px-4 py-5">
            Smart Phone
          </h1>
          <div className="grid grid-cols-3 md:grid-cols-5 gap-10 px-5">
            {nubers.map((_) => {
              return <Items item_name="demo" price={100} key={_} />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Category;
